import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/features/product/productSlicaExe';
import { selectIsLoggedIn, selectName, selectInvoices } from '../../redux/features/auth/authSliceExe';
import ProductListExe from '../product/productList/ProductListExe';

const Exedashboard = () => {
  const name = useSelector(selectName);
  const dispatch = useDispatch();
  const isLoggedin = useSelector(selectIsLoggedIn);
  const invoices = useSelector(selectInvoices); // Access invoices from Redux state
  const { products, isLoading, isError, message } = useSelector((state) => state.product);

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
      <h2>Welcome, {name}</h2>
      <ProductListExe products={products} />
      <div>
        <h3>Invoices</h3>
        {invoices.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Code</th>
                <th>Address</th>
                <th>Contact</th>
            
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
