import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Exedahsboard = () => {
  const navigate = useNavigate();
  
  // Accessing Redux state
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const name = useSelector((state) => state.auth.name);
  const token = useSelector((state) => state.auth.token); // assuming token is stored in Redux

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  // If the user is not logged in, redirect to login page
  if (!isLoggedIn) {
    navigate("/exeLogin");
  }

  useEffect(() => {
    // Fetching the invoices after login
    if (isLoggedIn && token) {
      axios
        .get('http://localhost:5000/api/get-all-invoices', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setInvoices(response.data.invoices); // Assuming invoices are part of the response
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching invoices:', error);
          setLoading(false);
        });
    }
  }, [isLoggedIn, token]);

  return (
    <div>
      <h1>Welcome to the Exe Dashboard, {name}</h1>

      {loading ? (
        <p>Loading invoices...</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={invoice._id}>
                <td>{index + 1}</td>
                <td>{invoice.exe}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Exedahsboard;
