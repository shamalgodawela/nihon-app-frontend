import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import MenuOperation from '../../../compenents/Menu/MenuOperation';
import Footer from '../../../compenents/footer/Footer';
import debounce from 'lodash.debounce';
import './Operations.css'

const Opertionoutstanding = () => {
    const [invoices, setInvoices] = useState([]);
    const [filteredInvoices, setFilteredInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedExe, setSelectedExe] = useState('');

    // Fetch all invoices initially
    useEffect(() => {
        const fetchAllInvoices = async () => {
            try {
                const response = await axios.get('https://nihon-inventory.onrender.com/api/get-lastoutstanding-invoicedetails');
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

    // Debounced function to filter invoices
    const debounceFilter = useCallback(
        debounce((exe) => {
            if (exe) {
                const filtered = invoices.filter(invoice => invoice.exe === exe);
                setFilteredInvoices(filtered);
            } else {
                setFilteredInvoices(invoices);
            }
        }, 300), [invoices]
    );

    useEffect(() => {
        debounceFilter(selectedExe);
    }, [selectedExe, debounceFilter]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const formatNumbers = (x) => {
        // Ensure x is a number before formatting
        if (typeof x === 'number') {
            return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return x; // Return the original value if it's not a number
    };

    const calculateTotal = (invoice) => {
        if (invoice && invoice.products) {
            // Calculate the total by reducing the products array
            return invoice.products.reduce((acc, product) => {
                const productTotal = product.labelPrice * (1 - product.discount / 100) * product.quantity;
                return acc + productTotal;
            }, 0);
        }
        return 0; // Return 0 if there are no products
    };

    return (
        <div>
            <MenuOperation />

            <div className='invoice-body'>
                <select value={selectedExe} onChange={(e) => setSelectedExe(e.target.value)}>
                    <option value="">All</option>
                    <option value="Mr.Ahamed">Mr.Ahamed</option>
                    <option value="Mr.Dasun">Mr.Dasun</option>
                    <option value="Mr.Chameera">Mr.Chameera</option>
                    <option value="Mr.Sanjeewa">Mr.Sanjeewa</option>
                    <option value="Mr.Navaneedan">Mr.Navaneedan</option>
                    <option value="Mr.Nayum">Mr.Nayum</option>
                </select>
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
                                <th className='th-invoice'>Action</th>
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
            <td className={`td-invoice ${invoice.lastOutstanding === "Not Paid" ? 'not-paid' : ''}`}>
                {formatNumbers(invoice.lastOutstanding)}
            </td>
            <td className='td-invoice'>{formatNumbers(calculateTotal(invoice))}</td>

            <td className='td-invoice'>
                <Link to={`/view-single-operation/${invoice._id}`}>
                    <AiOutlineEye size={20} color={"purple"} />
                </Link>
            </td>
        </tr>
    ))}
</tbody>

                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Opertionoutstanding;





