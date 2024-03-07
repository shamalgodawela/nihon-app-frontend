import React, { useState, useEffect } from 'react';
import './orderdetails.css';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [approvedOrders, setApprovedOrders] = useState([]);
  const [canceledOrders, setCanceledOrders] = useState([]);

  useEffect(() => {
    // Fetch order details from backend API
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://nihon-inventory.onrender.com/api/allorders'); // Update the URL with your backend endpoint
      const data = await response.json();
      setOrders(data);
      // Filter orders based on status
      const pending = data.filter(order => order.status === 'pending');
      const approved = data.filter(order => order.status === 'approved');
      const canceled = data.filter(order => order.status === 'canceled');
      setPendingOrders(pending);
      setApprovedOrders(approved);
      setCanceledOrders(canceled);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const renderTable = (orderList) => (
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
        </tr>
      </thead>
      <tbody>
        {orderList.map((order) => (
          <tr key={order._id}>
            <td>{order.orderNumber}</td>
            <td>{order.customer}</td>
            <td>{order.code}</td>
            <td>{order.invoiceNumber}</td>
            <td>{order.orderDate}</td>
            <td>{order.status}</td>
            <td>
              <Link to={`/orders/${order.orderNumber}`}>
                <AiOutlineEye size={20} color={"purple"} />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <h3 className="h3order">All Order Details</h3>
      {pendingOrders.length > 0 && (
        <div>
          <h4>Pending Orders</h4>
          {renderTable(pendingOrders)}
        </div>
      )}
      {approvedOrders.length > 0 && (
        <div>
          <h4>Approved Orders</h4>
          {renderTable(approvedOrders)}
        </div>
      )}
      {canceledOrders.length > 0 && (
        <div>
          <h4>Canceled Orders</h4>
          {renderTable(canceledOrders)}
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
