import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { AiOutlineEye } from 'react-icons/ai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import debounce from 'lodash.debounce';
import { Link } from 'react-router-dom';

const OutStandingTable = () => {
    const [invoices, setInvoices] = useState([]);
    const [filteredInvoices, setFilteredInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedExe, setSelectedExe] = useState('');
    const [selectedCode, setSelectedCode] = useState(''); // State for customer code
    const [searchCode, setSearchCode] = useState('');

    useEffect(() => {
        const fetchAllInvoices = async () => {
            try {
                const response = await axios.get('https://nihon-inventory.onrender.com/api/get-invoicedetails-admin-outstanding');
                setInvoices(response.data);
                setFilteredInvoices(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch invoices', error.message);
                setError('Failed to fetch invoices');
                setLoading(false);
            }
        };

        fetchAllInvoices();
    }, []);

    const debounceFilter = useCallback(
        debounce(() => {
            let filtered = invoices;
            if (selectedExe) {
                filtered = filtered.filter(invoice => invoice.exe === selectedExe);
            }
            if (selectedCode) {
                filtered = filtered.filter(invoice => invoice.code === selectedCode);
            }
            setFilteredInvoices(filtered);
        }, 300), [invoices, selectedExe, selectedCode]
    );

    useEffect(() => {
        debounceFilter();
    }, [selectedExe, selectedCode, debounceFilter]);

    const handleSearch = async () => {
        setLoading(true);
        try {
            let response;
            // You can handle search by code in the API call if necessary
            if (searchCode) {
                response = await axios.get(`https://nihon-inventory.onrender.com/api/search-invoice-by-customer-code/${searchCode}`);
            } else {
                response = await axios.get('https://nihon-inventory.onrender.com/api/get-invoicedetails-admin-outstanding');
            }
            setInvoices(response.data);
            setFilteredInvoices(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch invoices', error.message);
            setError('Failed to fetch invoices');
            setLoading(false);
        }
    };

    const formatNumbers = (x) => {
        if (typeof x === 'number') {
            return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return x;
    };

    const calculateTotal = (invoice) => {
        if (invoice && invoice.products) {
            return invoice.products.reduce((acc, product) => {
                const productTotal = product.labelPrice * (1 - product.discount / 100) * product.quantity;
                return acc + productTotal;
            }, 0);
        }
        return 0;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className='invoice-body'>
                {/* Exec dropdown */}
                <select value={selectedExe} onChange={(e) => setSelectedExe(e.target.value)}>
                    <option value="">All Executives</option>
                    <option value="Mr.Ahamed">Mr.Ahamed</option>
                    <option value="Mr.Dasun">Mr.Dasun</option>
                    <option value="Mr.Chameera">Mr.Chameera</option>
                    <option value="Mr.Sanjeewa">Mr.Sanjeewa</option>
                    <option value="Mr.Navaneedan">Mr.Navaneedan</option>
                    <option value="Mr.Nayum">Mr.Nayum</option>
                </select>

                {/* Customer code dropdown */}
                <input type='text' value={selectedCode} onChange={(e) => setSelectedCode(e.target.value)}/>

                {/* Search button */}
                {/* <input
                    type="text"
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    placeholder="Search by Customer Code"
                />
                <button onClick={handleSearch}>Search</button> */}

                <div className="all-invoice">
                    <h2 className='h2-invoice'>Outstanding Details</h2>
                    <table>
                        <thead>
                            <tr>
                                <th className='th-invoice'>Invoice Number</th>
                                <th className='th-invoice'>Customer</th>
                                <th className='th-invoice'>Customer Code</th>
                                <th className='th-invoice'>Printed or Canceled</th>
                                <th className='th-invoice'>Invoice Date</th>
                                <th className='th-invoice'>Due Date</th>
                                <th className='th-invoice'>Exe</th>
                                <th className='th-invoice'>Outstanding</th>
                                <th className='th-invoice'>Invoice Total</th>
                                <th className='th-invoice'>Cheque Details</th>
                                <th className='th-invoice'>Action</th>
                                <th className='th-invoice'>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInvoices.map((invoice) => (
                                <tr key={invoice._id} className={invoice.GatePassNo === 'Canceled' ? 'canceled-row' : ''}>
                                    <td className='td-invoice'>{invoice.invoiceNumber}</td>
                                    <td className='td-invoice'>{invoice.customer}</td>
                                    <td className='td-invoice'>{invoice.code}</td>
                                    <td className='td-invoice'>{invoice.GatePassNo}</td>
                                    <td className='td-invoice'>{invoice.invoiceDate}</td>
                                    <td className='td-invoice'>{invoice.Duedate}</td>
                                    <td className='td-invoice'>{invoice.exe}</td>
                                    <td className={`td-invoice ${invoice.lastOutstanding === "Not Paid" ? 'not-paid' : invoice.lastOutstanding === "Paid" ? 'paid' : ''}`}>
                                        {formatNumbers(invoice.lastOutstanding)}
                                    </td>
                                    <td className='td-invoice'>{formatNumbers(calculateTotal(invoice))}</td>
                                    <td className='td-invoice'>
                                        {Array.isArray(invoice.chequeValues) && invoice.chequeValues.length > 0 ? (
                                            invoice.chequeValues.map((cheque, index) => (
                                                <div key={index}>{formatNumbers(cheque)}</div>
                                            ))
                                        ) : (
                                            "No cheque value"
                                        )}
                                    </td>

                                    <td className='td-invoice'>
                                        <Link to={`/view-admin-outstanding/${invoice._id}`}>
                                            <AiOutlineEye size={20} color={"purple"} />
                                        </Link>
                                    </td>
                                    <td className='td-invoice'>
                                        <Link to={`/invoice/${invoice.invoiceNumber}`}>
                                            <FontAwesomeIcon icon={faEye} className="action-icon" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OutStandingTable;
