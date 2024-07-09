import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './allInvoice.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Footer from '../footer/Footer';

const PAGE_SIZE = 10;

const getSearchParamsFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    return {
        exe: params.get('exe') || '',
        code: params.get('code') || '',
    };
};

const updateURLSearchParams = (params) => {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
        if (params[key]) {
            searchParams.set(key, params[key]);
        }
    });
    const newURL = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({ path: newURL }, '', newURL);
};

const OutStandingTable = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useState(getSearchParamsFromURL());

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const initialSearchParams = getSearchParamsFromURL();
                setSearchParams(initialSearchParams);
                const response = await axios.get(`https://nihon-inventory.onrender.com/api/get-all-invoices`);
                setInvoices(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch invoices', error.message);
                setError('Failed to fetch invoices');
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    const handleSearch = async () => {
        try {
            setLoading(true);
            updateURLSearchParams(searchParams);
            const response = await axios.get(`https://nihon-inventory.onrender.com/api/search-outstanding`, { params: searchParams });
            setInvoices(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to perform search', error.message);
            setError('Failed to perform search');
            setLoading(false);
        }
    };

    const handleSearchByCode = async () => {
        try {
            setLoading(true);
            updateURLSearchParams(searchParams);
            const response = await axios.get(`https://nihon-inventory.onrender.com/api/search-outstandingbycus`, { params: searchParams });
            setInvoices(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to perform search by code', error.message);
            setError('Failed to perform search by code');
            setLoading(false);
        }
    };

    const handleChangeSearchParams = (key, value) => {
        setSearchParams({ ...searchParams, [key]: value });
    };

    const fetchAndUpdateStatuses = async (invoices) => {
        try {
            const invoiceNumbers = invoices.map((invoice) => invoice.invoiceNumber);
            const statuses = await fetchOutstandingStatuses(invoiceNumbers);
            const updatedInvoices = invoices.map((invoice) => {
                const status = statuses[invoice.invoiceNumber] || 'Unpaid';
                return { ...invoice, status };
            });
            setInvoices(updatedInvoices);
        } catch (error) {
            console.error('Failed to fetch outstanding statuses', error.message);
        }
    };

    const fetchOutstandingStatuses = async (invoiceNumbers) => {
        const statuses = {};
        for (const invoiceNumber of invoiceNumbers) {
            try {
                const response = await axios.get(`https://nihon-inventory.onrender.com/api/get-last-outstanding/${invoiceNumber}`);
                const lastOutstanding = response.data.outstanding;
                statuses[invoiceNumber] = lastOutstanding === 0 ? 'Paid' : 'Unpaid';
            } catch (error) {
                statuses[invoiceNumber] = 'Unpaid';
            }
        }
        return statuses;
    };

    useEffect(() => {
        if (!loading && !error) {
            fetchAndUpdateStatuses(invoices);
        }
    }, [invoices, loading, error]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='invoice-body'>
            <div className="search-container">
                <select
                    className="beautiful-select"
                    value={searchParams.exe}
                    onChange={(e) => handleChangeSearchParams('exe', e.target.value)}
                >
                    <option value="">Select Exe</option>
                    <option value="Mr.Ahamed">Mr.Ahamed</option>
                    <option value="Mr.Dasun">Mr.Dasun</option>
                    <option value="Mr.Chameera">Mr.Chameera</option>
                    <option value="Mr.Sanjeewa">Mr.Sanjeewa</option>
                    <option value="Mr.Nayum">Mr.Nayum</option>
                    <option value="Mr.Navaneedan">Mr.Navaneedan</option>
                </select>
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by code"
                    value={searchParams.code}
                    onChange={(e) => handleChangeSearchParams('code', e.target.value)}
                />
                <button onClick={handleSearchByCode}>Search by Code</button>
            </div>
            <div className="all-invoice">
                <h2 className='h2-invoice'>Outstanding Details</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Invoice Number</th>
                            <th>Customer</th>
                            <th>Customer Code</th>
                            <th>Printed or Canceled</th>
                            <th>Invoice Date</th>
                            <th>Exe</th>
                            <th>Action</th>
                            <th>Status</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice) => {
                            return (
                                <tr key={invoice._id} className={invoice.GatePassNo === 'Canceled' ? 'canceled' : ''}>
                                    <td>{invoice.invoiceNumber}</td>
                                    <td>{invoice.customer}</td>
                                    <td>{invoice.code}</td>
                                    <td>{invoice.GatePassNo}</td>
                                    <td>{invoice.invoiceDate}</td>
                                    <td>{invoice.exe}</td>
                                    <td>
                                        <Link to={`/caloutStanding/${invoice._id}`}>
                                            <AiOutlineEye size={20} color={"purple"} />
                                        </Link>
                                    </td>
                                    <td style={{ color: invoice.status === 'Paid' ? 'green' : 'red' }}>
                                        {invoice.status !== undefined ? invoice.status : "Loading..."}
                                    </td>
                                    <td>
                                        <Link to={`/invoice/${invoice.invoiceNumber}`}>
                                            <FontAwesomeIcon icon={faEye} className="action-icon" />
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default OutStandingTable;