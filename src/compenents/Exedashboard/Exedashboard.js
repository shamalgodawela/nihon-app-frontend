import React, { useEffect } from 'react';
import HeaderExe from '../headerexe/HeaderExe';
import HeaderE from '../header/HeaderE';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/features/product/productSlicaExe';
import { selectIsLoggedIn, selectName, selectInvoices, SET_INVOICES } from '../../redux/features/auth/authSliceExe'; // Import the selector and action
import ProductListExe from '../product/productList/ProductListExe';

const Exedashboard = () => {
  const name = useSelector(selectName);
  const dispatch = useDispatch();
  const isLoggedin = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector((state) => state.product);
  const invoices = useSelector(selectInvoices); // Access invoices from Redux state

  useEffect(() => {
    if (isLoggedin) {
      dispatch(getProducts());
    }

    if (isError) {
      console.log(message);
    }

    // Example of setting invoices, you can replace this with actual invoice data
    const fetchedInvoices = [
      { customer: 'Customer A', code: 'A123', address: 'Address A', contact: '1234567890', invoiceDate: '2024-12-01' },
      { customer: 'Customer B', code: 'B456', address: 'Address B', contact: '0987654321', invoiceDate: '2024-12-02' },
    ];
    
    dispatch(SET_INVOICES(fetchedInvoices)); // Dispatch action to set invoices
  }, [isLoggedin, isError, message, dispatch]);

  return (
    <div>
      <HeaderExe />
      <HeaderE />
      <h2>Welcome, {name}</h2>
      <ProductListExe products={products} />
      <div>
        <h3>Invoices</h3>
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
        )}
      </div>
    </div>
  );
};

export default Exedashboard;
