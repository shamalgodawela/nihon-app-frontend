import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './allInvoice.css';
import { AiOutlineEye } from 'react-icons/ai';
import Footer from '../../compenents/footer/Footer';
import NavBar from '../../compenents/sidebar/NavBar';
import Loader from '../../compenents/loader/Loader';

const AllInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [exe, setExe] = useState('');

  const fetchInvoices = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://nihon-inventory.onrender.com/api/get-all-invoices`);
      const sortedInvoices = response.data.sort((a, b) => new Date(b.invoiceDate) - new Date(a.invoiceDate));
      setInvoices(sortedInvoices);
    } catch (error) {
      console.error('Failed to fetch invoices', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const searchInvoices = async () => {
    setIsLoading(true);
    try {
      // Format start date as 'YYYY-MM-DD'
      const formattedStartDate = startDate ? new Date(startDate).toISOString().split('T')[0] : '';
      // Format end date as 'YYYY-MM-DD'
      const formattedEndDate = endDate ? new Date(endDate).toISOString().split('T')[0] : '';
  
      const response = await axios.get(`https://nihon-inventory.onrender.com/api/search-invoices`, {
        params: {
          searchQuery,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          exe
        }
      });
      setInvoices(response.data);
    } catch (error) {
      console.error('Failed to search invoices', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <body className='invoice-body'>
      <div>
        <NavBar/><br/><br/>
        <div className="search-container" style={{ display: 'flex', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by Invoice Number or Customer"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginRight: '10px', padding: '5px' }}
          />
         
          <input
            type="text"
            placeholder="Search by Exe"
            value={exe}
            onChange={(e) => setExe(e.target.value)}
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <button onClick={searchInvoices} style={{ padding: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>Search</button>
        </div>

        <button type="button" class="btn btn-outline-primary" disabled><a href="/add-invoice" >Add Invoice</a></button>
        <div className="all-invoice">
          {isLoading ? <Loader /> : (
            <>
              <h2 className='h2-invoice'>All Invoices</h2>
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
                        <Link to={`/invoice-temp/${invoice._id}`}>
                          <AiOutlineEye size={20} color={"purple"} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
        <Footer/>
      </div>
    </body>
  );
};

export default AllInvoice;
