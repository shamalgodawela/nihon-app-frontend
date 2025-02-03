import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import './getcustomer.css';
import { Link } from 'react-router-dom';
import { SpinnerImg } from '../../../compenents/loader/Loader';
import Navbar3 from '../../../compenents/sidebar/Navbar3';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://nihon-inventory.onrender.com/api/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
        toast.error('Failed to fetch customers');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  // Filter customers based on search query
  const filteredCustomers = customers.filter(customer =>
    customer.code && customer.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='bd2'>
      <Navbar3 />
      <section>
        <h2 className='h2getcus'>Customer Database</h2>

        <input
          type="text"
          placeholder="Search by code"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        {isLoading ? (
          <SpinnerImg />
        ) : (
          <table className="customer-table">
            <thead>
              <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Code</th>
                <th>Company Name</th>
                <th>Contact</th>
                <th>Address</th>
                <th>District</th>
                <th>City</th>
                <th>Phone</th>
                <th>Fax</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => (
                <tr key={customer._id}>
                  <td>{index + 1}</td>
                  <td>{customer.name}</td>
                  <td>{customer.code}</td>
                  <td>{customer.companyName}</td>
                  <td>{customer.contact}</td>
                  <td>{customer.address}</td>
                  <td>{customer.district}</td>
                  <td>{customer.city}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.fax}</td>
                  <td>
                    <Link to={`/customer/${customer.code}`}><FontAwesomeIcon icon={faEye} className="action-icon" /></Link>
                    <Link to={`/customer/update/${customer._id}`}><FontAwesomeIcon icon={faEdit} className="action-icon" /></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <ToastContainer />
      </section>
    </div>
  );
}

export default CustomerList;
