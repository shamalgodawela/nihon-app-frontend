import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './allInvoice.css';
import { AiOutlineEye } from 'react-icons/ai';
import Footer from '../../compenents/footer/Footer';
import NavBar from '../../compenents/sidebar/NavBar';


const AllInvoice = () => {
  const [invoices, setInvoices] = useState([]);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`https://nihon-inventory.onrender.com/api/get-all-invoices`);
      setInvoices(response.data);
    } catch (error) {
      console.error('Failed to fetch invoices', error.message);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // AllInvoice.js
// AllInvoice.js

  
  

  return (
    <body className='invoice-body'>
      
    <div>
      <NavBar/><br/><br/>
      <button type="button" class="btn btn-outline-primary" disabled><a href="/add-invoice" >Add Invoice</a></button>
      
   
      <div className="all-invoice">
        <h2 className='h2-invoice'>All Invoices</h2>
        <table>
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Customer</th>
              <th>Customer Code</th>
              <th>Customer Address</th>
              <th>Invoice Date</th>
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
                <td>
                  <Link to={`/invoice-temp/${invoice._id}`}>
                  <AiOutlineEye size={20} color={"purple"} />
                  </Link>
                  
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Footer/>
    </div>
    </body>
  );
};

export default AllInvoice;
