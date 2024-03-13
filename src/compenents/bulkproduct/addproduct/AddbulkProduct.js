import React, { useState } from 'react';
import axios from 'axios';

const AddbulkProduct = () => {
  const [productData, setProductData] = useState({
    bulkCode: '',
    quantity: '',
    weight: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend to add the product
      await axios.post('https://your-backend-url/api/products', productData);
      alert('Product added successfully!');
      // Clear the form fields after successful submission
      setProductData({
        bulkCode: '',
        quantity: '',
        weight: ''
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Bulk Code:
          <input
            type="text"
            name="bulkCode"
            value={productData.bulkCode}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={productData.quantity}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Weight:
          <input
            type="number"
            name="weight"
            value={productData.weight}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddbulkProduct;
