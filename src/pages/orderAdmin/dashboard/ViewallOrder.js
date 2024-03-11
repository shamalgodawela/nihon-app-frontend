import React, { useState, useEffect } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Menu from '../../../compenents/Menu/Menu';
import Footer from '../../../compenents/footer/Footer';
import Loader from '../../../compenents/loader/Loader'; // Import Loader component

const ViewallOrder = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  useEffect(() => {
    // Fetch order details from backend API
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true); // Set loading to true when fetching orders
    try {
      const response = await fetch('https://nihon-inventory.onrender.com/api/allorders'); // Update the URL with your backend endpoint
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false); // Set loading to false when fetching completes (either success or error)
    }
  };

  return (
    <div>
      <Menu/>
      <h3 className="h3order">All Order Details</h3>
      {isLoading ? (
        <Loader /> // Show loader if isLoading is true
      ) : (
        <table className='tordert'>
          <thead>
            <tr>
              <th className='thorder'>Order Number</th>
              <th className='thorder'>Customer</th>
              <th className='thorder'>Customer Code</th>
              <th className='thorder'>Order Date</th>
              <th className='thorder'>Status</th>
              <th className='thorder'>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className='tdorder'>{order.orderNumber}</td>
                <td className='tdorder'>{order.customer}</td>
                <td className='tdorder'>{order.code}</td>
                <td className='tdorder'>{order.orderDate}</td>
                <td className='tdorder'>{order.status}</td>
                <td className='tdorder'>
                  <Link to={`/adminorder/${order.orderNumber}`}>
                    <AiOutlineEye size={20} color={"purple"} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Footer/>
    </div>
  );
};

export default ViewallOrder;
