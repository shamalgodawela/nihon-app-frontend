import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateCustomerForm = ({ customerId }) => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    companyName: '',
    contact: '',
    address: '',
    city: '',
    phone: '',
    email: '',
    fax: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`https://nihon-inventory.onrender.com/api/customersn/${customerId}`);
        setCustomer(response.data);
        setFormData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch customer details', error.message);
        setError('Failed to fetch customer details');
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [customerId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://nihon-inventory.onrender.com/api/customersup/${customerId}`, formData);
      alert('Customer details updated successfully');
    } catch (error) {
      console.error('Failed to update customer details', error.message);
      alert('Failed to update customer details');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label>Code:</label>
        <input type="text" name="code" value={formData.code} onChange={handleChange} />
      </div>
      <div>
        <label>Company Name:</label>
        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
      </div>
      <div>
        <label>Contact:</label>
        <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
      </div>
      <div>
        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
      </div>
      <div>
        <label>City:</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} />
      </div>
      <div>
        <label>Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label>Fax:</label>
        <input type="text" name="fax" value={formData.fax} onChange={handleChange} />
      </div>
      <button type="submit">Update Customer</button>
    </form>
  );
};

export default UpdateCustomerForm;
