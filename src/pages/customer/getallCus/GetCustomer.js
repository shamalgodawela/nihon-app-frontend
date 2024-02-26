import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome icons
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import required icons
import './getcustomer.css';
import NavBar from '../../../compenents/sidebar/NavBar';
import Footer from '../../../compenents/footer/Footer';
import { Link } from 'react-router-dom';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://nihon-inventory.onrender.com/api/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
        toast.error('Failed to fetch customers');
      }
    };

    fetchCustomers();
  }, []);

  // Filter customers based on search query
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search query change
  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className='bd2'>
      <NavBar/>
      
      
      <section>
        <h2 className='h2getcus'>Customer Database</h2>
        {/* Search input field */}
        <button type="button" class="btn btn-outline-primary" disabled><a href="/customerReg" >Customer Registration</a></button><br/><br/>
        <input
          type="text"
          placeholder="Search by name or code"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}

        />
        <div className="tbl-header">
          <table cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Company Name</th>
                <th>Contact</th>
                <th>Address</th>
                <th>City</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Fax</th>
                <th>Action</th> {/* Add Action column */}
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table cellPadding="0" cellSpacing="0">
            <tbody>
              {filteredCustomers.map(customer => (
                <tr key={customer._id}>
                  <td>{customer.name}</td>
                  <td>{customer.code}</td>
                  <td>{customer.companyName}</td>
                  <td>{customer.contact}</td>
                  <td>{customer.address}</td>
                  <td>{customer.city}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.email}</td>
                  <td>{customer.fax}</td>
                  <td>
                    {/* Action icons */}
                    <Link to={`/customer/${customer.code}`}><FontAwesomeIcon icon={faEye} className="action-icon" /></Link>
                    <FontAwesomeIcon icon={faEdit} className="action-icon" />
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </section>
     
    </div>
  );
}

export default CustomerList;
