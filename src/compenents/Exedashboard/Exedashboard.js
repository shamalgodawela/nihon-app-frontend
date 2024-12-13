import React, { useEffect } from 'react';
import HeaderExe from '../headerexe/HeaderExe';
import HeaderE from '../header/HeaderE';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/features/product/productSlicaExe';
import { selectIsLoggedIn, selectName } from '../../redux/features/auth/authSliceExe';
import ProductListExe from '../product/productList/ProductListExe';
import axios from 'axios'; // For fetching invoices
import { useState } from 'react';

const Exedashboard = () => {
  const name = useSelector(selectName);

  const dispatch = useDispatch();
  const isLoggedin = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector((state) => state.product);

  const [invoices, setInvoices] = useState([]);
  const [invoiceLoading, setInvoiceLoading] = useState(true);

  useEffect(() => {
    if (isLoggedin === true) {
      dispatch(getProducts());
      fetchInvoices(); // Fetch invoices when logged in
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedin, isError, message, dispatch]);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/get-all-invoices', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust token handling as per your app
        },
      });
      setInvoices(response.data.invoices);
      setInvoiceLoading(false);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      setInvoiceLoading(false);
    }
  };

  return (
    <div>
      <HeaderExe />
      <HeaderE />
      <h2>Welcome, {name}</h2>
      <ProductListExe products={products} />
      <div>
        <h3>Invoices</h3>
        {invoiceLoading ? (
          <p>Loading invoices...</p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Invoice ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr key={invoice._id}>
                  <td>{index + 1}</td>
                  <td>{invoice.invoiceId}</td>
                  <td>{new Date(invoice.date).toLocaleDateString()}</td>
                  <td>{invoice.amount}</td>
                  <td>{invoice.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Exedashboard;
