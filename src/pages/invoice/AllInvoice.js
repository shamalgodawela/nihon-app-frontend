import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './allInvoice.css';
import { AiOutlineEye } from 'react-icons/ai';
import Footer from '../../compenents/footer/Footer';
import Loader from '../../compenents/loader/Loader';
import Navbar2 from '../../compenents/sidebar/Navbar2';

const AllInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [exe, setExe] = useState('');
  const {id}=useParams();
  const [sinvoice, setsinvoice]=useState(null);

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
      const formattedStartDate = startDate ? new Date(startDate).toISOString().split('T')[0] : '';
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
    const fetchSinvoice = async ()=>{
      try{
        const response= await axios.get(`https://nihon-inventory.onrender.com/api/get-invoice/${id}`);
        setsinvoice(response.data);
      }catch(error){
        console.log('error feching data', error);
      }
    };
    fetchInvoices();
    fetchSinvoice();
  }, []);

  const formatNumbers = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculateTotal = (invoice) => {
    let total = 0;
    if (invoice && invoice.products) {
      total = invoice.products.reduce((acc, product) => {
        const productTotal = product.labelPrice * (1 - product.discount / 100) * product.quantity;
        return acc + productTotal;
      }, 0);
    }
    return total.toFixed(2); // Return the total with 2 decimal places
  };

  return (
    <body className='invoice-body'>
      <div>
        <Navbar2/><br/><br/>
        <div className="search-container" style={{ display: 'flex', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by Invoice Number or Customer"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <select
            value={exe}
            onChange={(e) => setExe(e.target.value)}
            style={{ marginRight: '10px', padding: '5px' }}
          >
            <option value="">Select Exe</option>
            <option value="Mr.Ahamed">Mr.Ahamed</option>
            <option value="Mr.Dasun">Mr.Dasun</option>
            <option value="Mr.Chameera">Mr.Chameera</option>
            <option value="Mr.Sanjeewa">Mr.Sanjeewa</option>
            <option value="Mr.Nayum">Mr.Nayum</option>
            <option value="Mr.Navaneedan">Mr.Navaneedan</option>
          </select>
          <button
            onClick={searchInvoices}
            style={{
              padding: '5px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Search
          </button>
        </div>

        <button type="button" className="btn btn-outline-primary" disabled><a href="/add-invoice" >Add Invoice</a></button>
        <div className="all-invoice">
          {isLoading ? <Loader /> : (
            <>
              <h2 className='h2-invoice'>All Invoices</h2>
              <table>
                <thead>
                  <tr>
                    <th>Invoice Number</th>
                    <th>Printed or Canceled</th>
                    <th>Customer</th>
                    <th>Customer Code</th>
                    <th>Invoice Date</th>
                    <th>Due date</th>
                    <th>Exe</th>
                    <th>Invoice Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice._id}>
                      <td>{invoice.invoiceNumber}</td>
                      <td>{invoice.GatePassNo}</td>
                      <td>{invoice.customer}</td>
                      <td>{invoice.code}</td>
                      <td>{invoice.invoiceDate}</td>
                      <td>{invoice.Duedate}</td>
                      <td>{invoice.exe}</td>
                      <td>{formatNumbers(calculateTotal(invoice))}</td>
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
