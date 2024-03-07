import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddOfficeInventory = () => {
  const [formData, setFormData] = useState({
    code: '',
    model: '',
    type: '',
    dateOfPurchase: '',
    value: '',
    warrantyPeriod: '',
    usedBy: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send formData to backend API to add Office Inventory details
      const response = await fetch(`https://nihon-inventory.onrender.com/api/addoffice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Show success toast upon successful addition
        toast.success('Office Inventory details added successfully', {
          position: toast.POSITION.TOP_CENTER
        });

        // Clear form data
        setFormData({
          code: '',
          model: '',
          type: '',
          dateOfPurchase: '',
          value: '',
          warrantyPeriod: '',
          usedBy: ''
        });
      } else {
        toast.error('Failed to add Office Inventory details');
      }
    } catch (error) {
      console.error('Error adding Office Inventory details:', error);
      toast.error('Failed to add Office Inventory details');
    }
  };

  return (
    <div>
    <h2>Add Office Inventory</h2>
    <form onSubmit={handleSubmit}>
      <label>
        Code:
        <input type="text" name="code" value={formData.code} onChange={handleChange} />
      </label>
      <label>
        Model:
        <input type="text" name="model" value={formData.model} onChange={handleChange} />
      </label>
      <label>
        Type:
        <input type="text" name="type" value={formData.type} onChange={handleChange} />
      </label>
      <label>
        Date of Purchase:
        <input type="date" name="dateOfPurchase" value={formData.dateOfPurchase} onChange={handleChange} />
      </label>
      <label>
        Value:
        <input type="number" name="value" value={formData.value} onChange={handleChange} />
      </label>
      <label>
        Warranty Period:
        <input type="text" name="warrantyPeriod" value={formData.warrantyPeriod} onChange={handleChange} />
      </label>
      <label>
        Used By:
        <input type="text" name="usedBy" value={formData.usedBy} onChange={handleChange} />
      </label>
      <button type="submit">Add Inventory</button>
    </form>
    <ToastContainer />
  </div>
  );
};

export default AddOfficeInventory;
