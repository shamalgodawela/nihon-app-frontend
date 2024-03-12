import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const PAGE_SIZE = 10;

const OutStandingTable = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useState({
        exe: '', // Only search by exe
        status: '', // Search by status (Paid or Unpaid)
    });

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
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
            const response = await axios.get(`https://nihon-inventory.onrender.com/api/search-outstanding`, { params: searchParams });
            setInvoices(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to perform search', error.message);
            setError('Failed to perform search');
            setLoading(false);
        }
    };

    const handleChangeSearchParams = (key, value) => {
        setSearchParams(prevSearchParams => ({
            ...prevSearchParams,
            [key]: value
        }));
    };
    

    // Fetch and update statuses based on the search result
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

    // Fetch statuses for given invoice numbers
    const fetchOutstandingStatuses = async (invoiceNumbers) => {
        const statuses = {};
        for (const invoiceNumber of invoiceNumbers) {
            try {
                const response = await axios.get(`https://nihon-inventory.onrender.com/api/get-last-outstanding/${invoiceNumber}`);
                const lastOutstanding = response.data.outstanding;
                statuses[invoiceNumber] = lastOutstanding === 0 ? 'Paid' : 'Unpaid';
            } catch (error) {
                statuses[invoiceNumber] = 'Unpaid'; // Set status to Unpaid in case of error
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
                <input
                    type="text"
                    placeholder="Search by Exe"
                    value={searchParams.exe}
                    onChange={(e) => handleChangeSearchParams('exe', e.target.value)}
                />
                <select
                    value={searchParams.status}
                    onChange={(e) => handleChangeSearchParams('status', e.target.value)}
                >
                    <option value="">All</option>
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                </select>
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="all-invoice">
                <h2 className='h2-invoice'>Outstanding Details</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Invoice Number</th>
                            <th>Customer</th>
                            <th>Customer Code</th>
                            <th>Customer Address</th>
                            <th>Invoice Date</th>
                            <th>Exe</th>
                            <th>Action</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice) => (
                            <tr key={invoice._id}>
                                <td>{invoice.invoiceNumber}</td>
                                <td>{invoice.customer}</td>
                                <td>{invoice.code}</td>
                                <td>{invoice.address}</td>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OutStandingTable;
