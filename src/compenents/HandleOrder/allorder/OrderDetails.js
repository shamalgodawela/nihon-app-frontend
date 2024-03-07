import React, { useState, useEffect } from 'react';
import './orderdetails.css';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch order details from backend API
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`https://nihon-inventory.onrender.com/api/allorders`); // Update the URL with your backend endpoint
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div>
      <h3 className="h3order">All Order Details</h3>
      <table>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Customer</th>
            <th>Customer Code</th>
            <th>Invoice Number</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Action</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.orderNumber}</td>
              <td>{order.customer}</td>
              <td>{order.code}</td>
              <td>{order.invoiceNumber}</td>
              {/* Add more table cells for other order details */}
              <td>{order.orderDate}</td>
              <td>{order.status}</td>
              <td>
              <Link to={`/orders/${order.orderNumber}`}>
  <AiOutlineEye size={20} color={"purple"} />
</Link>

              </td>
              {/* Add more table cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetails;
