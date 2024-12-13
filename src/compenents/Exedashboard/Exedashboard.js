import React, { useEffect, useState } from 'react';
import HeaderExe from '../headerexe/HeaderExe';
import HeaderE from '../header/HeaderE';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/features/product/productSlicaExe';
import { selectIsLoggedIn, selectName } from '../../redux/features/auth/authSliceExe';
import ProductListExe from '../product/productList/ProductListExe';
import axios from 'axios';

const Exedashboard = () => {
  const name = useSelector(selectName);
  const dispatch = useDispatch();
  const isLoggedin = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector((state) => state.product);

  const [invoices, setInvoices] = useState([]);
  const [invoiceLoading, setInvoiceLoading] = useState(true);

  useEffect(() => {
    if (isLoggedin) {
      dispatch(getProducts());
      fetchInvoices();
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedin, isError, message, dispatch]);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('https://nihon-inventory.onrender.com/api/get-all-invoices', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });
      setInvoices(response.data.invoices || []);
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
        ) : invoices.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Code</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Invoice Date</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{invoice.customer}</td>
                  <td>{invoice.code}</td>
                  <td>{invoice.address}</td>
                  <td>{invoice.contact}</td>
                  <td>{new Date(invoice.invoiceDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No invoices available.</p>
        )}
      </div>
    </div>
  );
};

export default Exedashboard;
