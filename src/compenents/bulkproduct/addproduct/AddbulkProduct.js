import React, { useState } from 'react';
import axios from 'axios';
import './addbulk.css';
import { toast } from 'react-toastify';

const AddbulkProduct = () => {
  const [products, setProducts] = useState([
    {
      productCode: '',
      productName: '',
      quantity: '',
      weight: ''
    }
  ]);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [name]: value };
    setProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { productCode: '', productName: '', quantity: '', weight: '' }]);
    setShowAdditionalFields(false); // Hide additional fields after adding a product
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend to add the product
      await axios.post('https://nihon-inventory.onrender.com/api/addbulkproduct', { products });
      toast.success('Products added successfully!');
      // Clear the form fields after successful submission
      setProducts([{ productCode: '', productName: '', quantity: '', weight: '' }]);
    } catch (error) {
      console.error('Error adding products:', error);
      toast.error('Failed to add products');
    }
  };

  return (
    <div className="add-product-form">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        {products.map((product, index) => (
          <div key={index}>
            <label>
              Product Code:
              <input
                type="text"
                name="productCode"
                value={product.productCode}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </label>
            <label>
              Product Name:
              <input
                type="text"
                name="productName"
                value={product.productName}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </label>
            {showAdditionalFields && (
              <>
                <label>
                  Quantity:
                  <input
                    type="number"
                    name="quantity"
                    value={product.quantity}
                    onChange={(e) => handleChange(index, e)}
                    required
                  />
                </label>
                <label>
                  Weight:
                  <input
                    type="number"
                    name="weight"
                    value={product.weight}
                    onChange={(e) => handleChange(index, e)}
                    required
                  />
                </label>
              </>
            )}
          </div>
        ))}
        {!showAdditionalFields && (
          <button type="button" onClick={() => setShowAdditionalFields(true)}>Add More Product</button>
        )}
        <button type="submit">Add Products</button>
      </form>
    </div>
  );
};

export default AddbulkProduct;
