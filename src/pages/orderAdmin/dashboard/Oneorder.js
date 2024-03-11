import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './oneorder.css'
import Menu from '../../../compenents/Menu/Menu';
import Footer from '../../../compenents/footer/Footer';

const Oneorder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [updatedOrder, setUpdatedOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`https://nihon-inventory.onrender.com/api/orders/${id}`);
        const orderData = response.data;
        // Initialize updatedOrder with the fetched order data, ensuring nested objects are properly initialized
        const updatedOrderData = {
          ...orderData,
          products: orderData.products.map(product => ({
            ...product,
            // Ensure that each nested object within products is properly initialized
            productCode: product.productCode || '',
            productName: product.productName || '',
            labelPrice: product.labelPrice || '',
            quantity: product.quantity || '',
            discount: product.discount || '',
            unitPrice: product.unitPrice || '',
            invoiceTotal: product.invoiceTotal || '',
          }))
        };
        setOrder(orderData);
        setUpdatedOrder(updatedOrderData);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };
  
    fetchOrderDetails();
  }, [id]);
  

  // Handle form input changes
  // Handle form input changes
const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedData;
  
    // If the changed field is discount or quantity, recalculate unit price and invoice total for all products
    if (name === 'discount' || name === 'quantity') {
      updatedData = {
        ...updatedOrder,
        [name]: value,
        products: updatedOrder.products.map(product => {
          const labelPrice = parseFloat(product.labelPrice);
          const discount = parseFloat(product.discount);
          const quantity = parseFloat(product.quantity);
          const unitPrice = labelPrice * (1 - discount / 100); // Calculate unit price
          const invoiceTotal = unitPrice * quantity; // Calculate invoice total
          return {
            ...product,
            unitPrice: isNaN(unitPrice) ? '' : unitPrice.toFixed(2),
            invoiceTotal: isNaN(invoiceTotal) ? '' : invoiceTotal.toFixed(2)
          };
        })
      };
    } else {
      updatedData = {
        ...updatedOrder,
        [name]: value
      };
    }
  
    setUpdatedOrder(updatedData);
  };
  

  // Handle form submission to update order details
  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://nihon-inventory.onrender.com/api/orders/${id}`, updatedOrder);
      // Assuming successful update, setOrder to updatedOrder to reflect changes
      setOrder(updatedOrder);
      toast.success('Order details updated successfully')
      console.log('Order details updated successfully');
    } catch (error) {
      console.error('Error updating order details:', error);
    }
  };
  // Handle form input changes for product details
// Handle form input changes for product details
const handleProductInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedProducts = [...updatedOrder.products];
    updatedProducts[index] = { ...updatedProducts[index], [name]: value };
  
    // Recalculate unitPrice and invoiceTotal if quantity or discount is changed
    if (name === 'quantity' || name === 'discount') {
      const labelPrice = parseFloat(updatedProducts[index].labelPrice);
      const discount = parseFloat(updatedProducts[index].discount);
      const quantity = parseFloat(updatedProducts[index].quantity);
      const unitPrice = labelPrice * (1 - discount / 100);
      const invoiceTotal = unitPrice * quantity;
  
      updatedProducts[index].unitPrice = isNaN(unitPrice) ? '' : unitPrice.toFixed(2);
      updatedProducts[index].invoiceTotal = isNaN(invoiceTotal) ? '' : invoiceTotal.toFixed(2);
    }
  
    setUpdatedOrder({
      ...updatedOrder,
      products: updatedProducts,
    });
  };
  
  

  return (
    <div>
      <Menu/>
    <div className="container">
      <div className="order-details-container">
        <h2 className="order-details-header">Order Details</h2>
        {order ? (
          <div>
            <form onSubmit={handleUpdateOrder}>
              <div className="form-group">
                <label className="order-details-label">Order Number:</label>
                <input
                  type="text"
                  name="orderNumber"
                  value={updatedOrder.orderNumber}
                  onChange={handleInputChange}
                />
              </div>
              {/* <div className="form-group">
                <label className="order-details-label">Invoice Number:</label>
                <input
                  type="text"
                  name="invoiceNumber"
                  value={updatedOrder.invoiceNumber}
                  onChange={handleInputChange}
                />
              </div> */}
              <div className="form-group">
                <label className="order-details-label">Customer:</label>
                <input
                  type="text"
                  name="customer"
                  value={updatedOrder.customer}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="order-details-label">Code:</label>
                <input
                  type="text"
                  name="code"
                  value={updatedOrder.code}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="order-details-label">Address:</label>
                <input
                  type="text"
                  name="address"
                  value={updatedOrder.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="order-details-label">Contact:</label>
                <input
                  type="text"
                  name="contact"
                  value={updatedOrder.contact}
                  onChange={handleInputChange}
                />
              </div>
              {/* <div className="form-group">
                <label className="order-details-label">Invoice Date:</label>
                <input
                  type="date"
                  name="invoiceDate"
                  value={updatedOrder.invoiceDate}
                  onChange={handleInputChange}
                />
              </div> */}
              <div className="form-group">
                <label className="order-details-label">Order Date:</label>
                <input
                  type="date"
                  name="orderDate"
                  value={updatedOrder.orderDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="order-details-label">Exe:</label>
                <input
                  type="text"
                  name="exe"
                  value={updatedOrder.exe}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="order-details-label">Status:</label>
                <select
                  name="status"
                  value={updatedOrder.status}
                  onChange={handleInputChange}
                >
                  <option value="">Select Approved or Cancel</option>
                  <option value="Approved">Approved</option>
                  <option value="Cancel">Cancel</option>
                </select>
              </div>
              <h3 className="order-details-product-header">Products</h3>
              <table className="order-details-product-table">
                <thead>
                  <tr>
                    <th>Product Code</th>
                    <th>Product Name</th>
                    <th>Label Price</th>
                    <th>Quantity</th>
                    <th>Discount</th>
                    <th>Unit Price</th>
                    <th>Invoice Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product, index) => (
                    <tr key={index} className="order-details-product-item">
                      <td>
                        <input
                          type="text"
                          name="productCode"
                          value={updatedOrder.products[index].productCode}
                          onChange={(e) => handleProductInputChange(e, index)}
                          readOnly // Pass index to handleProductInputChange
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="productName"
                          value={updatedOrder.products[index].productName}
                          onChange={(e) => handleProductInputChange(e, index)}
                          readOnly // Pass index to handleProductInputChange
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="labelPrice"
                          value={updatedOrder.products[index].labelPrice}
                          onChange={(e) => handleProductInputChange(e, index)} 
                          readOnly// Pass index to handleProductInputChange
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="quantity"
                          value={updatedOrder.products[index].quantity}
                          onChange={(e) => handleProductInputChange(e, index)} // Pass index to handleProductInputChange
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="discount"
                          value={updatedOrder.products[index].discount}
                          onChange={(e) => handleProductInputChange(e, index)} // Pass index to handleProductInputChange
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="unitPrice"
                          value={updatedOrder.products[index].unitPrice}
                          readOnly // Disable editing for unit price since it's auto-calculated
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="invoiceTotal"
                          value={updatedOrder.products[index].invoiceTotal}
                          readOnly // Disable editing for invoice total since it's auto-calculated
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button type="submit">Update Order</button>
            </form>
          </div>
        ) : (
          <p>Loading order details...</p>
        )}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Oneorder;
