import React, { useEffect } from 'react';
import HeaderExe from '../headerexe/HeaderExe';
import HeaderE from '../header/HeaderE';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/features/product/productSlicaExe';
import { selectIsLoggedIn, selectName, selectInvoices } from '../../redux/features/auth/authSliceExe'; // Import the selector to get invoices
import ProductListExe from '../product/productList/ProductListExe';

const Exedashboard = () => {
  const name = useSelector(selectName);
  const dispatch = useDispatch();
  const isLoggedin = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector((state) => state.product);

  // Access invoices directly from the Redux store
  const invoices = useSelector(selectInvoices);

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
        {/* Check if invoices are available */}
        {invoices.length === 0 ? (
          <p>No invoices available.</p>
        ) : (
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
                <tr key={invoice._id}>
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
        )}
      </div>
    </div>
  );
};

export default Exedashboard;
