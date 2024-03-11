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
      const response = await fetch('https://nihon-inventory.onrender.com/api/allorders'); // Update the URL with your backend endpoint
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div>
      <h3 className="h3order">All Order Details</h3>
      <table className='tordert'>
        <thead>
          <tr>
            <th className='thorder'>Order Number</th>
            <th className='thorder'>Customer</th>
            <th className='thorder'>Customer Code</th>
            <th className='thorder'>Order Date</th>
            <th className='thorder'>Status</th>
            <th className='thorder'>Action</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className='tdorder'>{order.orderNumber}</td>
              <td className='tdorder'>{order.customer}</td>
              <td className='tdorder'>{order.code}</td>
              {/* Add more table cells for other order details */}
              <td className='tdorder'>{order.orderDate}</td>
              <td className='tdorder'>{order.status}</td>
              <td className='tdorder'>
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
