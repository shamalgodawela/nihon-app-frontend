import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetExeInvoice = () => {
  const [exeInvoices, setCancelInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchexeInvoices = async () => {
      try {
        const response = await axios.get('https://nihon-inventory.onrender.com/api/exe-getinvoice');
        setCancelInvoices(response.data);
        console.log(response.data)
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch cancel invoices:', error.message);
        setIsLoading(false);
      }
    };

    fetchexeInvoices();
  }, []);

  return (
    <div>
      <h2 className='h2-cancel-invoice'>Invoices</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>INVOICE NUMBER</th>
              <th>CUSTOMER</th>
              <th>CUSTOMER CODE</th>
              <th>CUSTOMER ADDRESS</th>
              <th>INVOICE DATE</th>
              <th>EXE</th>
              
            </tr>
          </thead>
          <tbody>
  {exeInvoices && exeInvoices.length > 0 ? (
    exeInvoices.map((invoice) => (
      <tr key={invoice._id}>
        <td>{invoice.invoiceNumber}</td>
        <td>{invoice.customer}</td>
        <td>{invoice.code}</td>
        <td>{invoice.address}</td>
        <td>{invoice.invoiceDate}</td>
        <td>{invoice.exe}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6">No invoices found</td>
    </tr>
  )}
</tbody>
        </table>
      )}
    </div>
  );
};

export default GetExeInvoice;
