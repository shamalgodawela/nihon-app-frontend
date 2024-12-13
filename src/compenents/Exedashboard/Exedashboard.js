import React, { useEffect, useState } from 'react';
import HeaderExe from '../headerexe/HeaderExe';
import HeaderE from '../header/HeaderE';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/features/product/productSlicaExe';
import { selectIsLoggedIn, selectName, selectUserData } from '../../redux/features/auth/authSliceExe';
import ProductListExe from '../product/productList/ProductListExe';

const Exedashboard = () => {
  const name = useSelector(selectName);
  const dispatch = useDispatch();
  const isLoggedin = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector((state) => state.product);
  
  // Getting invoices from the Redux store (this will come from your login response)
  const invoices = useSelector(selectUserData)?.invoices || [];
  const [invoiceLoading, setInvoiceLoading] = useState(false);

  useEffect(() => {
    if (isLoggedin) {
      dispatch(getProducts());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedin, isError, message, dispatch]);

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
