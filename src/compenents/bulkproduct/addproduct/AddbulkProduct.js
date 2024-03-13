import React, { useState } from 'react';
import axios from 'axios';
import './addbulk.css';
import { toast } from 'react-toastify';

const AddbulkProduct = () => {
  const [productData, setProductData] = useState({
    bulkCode: '',
    quantity: '',
    weight: '',
    products: [{ productCode: '', productName: '' }]
  });
  const [showProductFields, setShowProductFields] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...productData.products];
    updatedProducts[index] = { ...updatedProducts[index], [name]: value };
    setProductData({
      ...productData,
      products: updatedProducts
    });
  };

  const handleAddProduct = () => {
    setProductData({
      ...productData,
      products: [...productData.products, { productCode: '', productName: '' }]
    });
    setShowProductFields(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend to add the product
      await axios.post('https://nihon-inventory.onrender.com/api/addbulkproduct', productData);
      toast.success('Product added successfully!');
      // Clear the form fields after successful submission
      setProductData({
        bulkCode: '',
        quantity: '',
        weight: '',
        products: [{ productCode: '', productName: '' }]
      });
      setShowProductFields(false);
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    }
  };

  return (
    <div className="add-product-form">
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
        {showProductFields && (
          <>
            {productData.products.map((product, index) => (
              <div key={index}>
                <label>
                  Product Code:
                  <input
                    type="text"
                    name="productCode"
                    value={product.productCode}
                    onChange={(e) => handleProductChange(index, e)}
                    required
                  />
                </label>
                <label>
                  Product Name:
                  <input
                    type="text"
                    name="productName"
                    value={product.productName}
                    onChange={(e) => handleProductChange(index, e)}
                    required
                  />
                </label>
              </div>
            ))}
            <button type="button" onClick={handleAddProduct}>Add More Product</button>
          </>
        )}
        {!showProductFields && (
          <button type="button" onClick={() => setShowProductFields(true)}>Add More Product</button>
        )}
        <button type="submit">Add Products</button>
      </form>
    </div>
  );
};

export default AddbulkProduct;
