import React, { useState, useEffect } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Footer from '../../../compenents/footer/Footer';
import { SpinnerImg } from '../../../compenents/loader/Loader';
import Menu from '../../../compenents/Menu/Menu';
 // Import Loader component

const ViewallOrder = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedExe, setSelectedExe] = useState('');

  useEffect(() => {
    // Fetch order details from backend API
    fetchOrders();
  }, [selectedPeriod, selectedStatus, selectedExe]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true); // Set loading to true when fetching starts

      // Construct query parameters
      const queryParams = new URLSearchParams();
      if (selectedPeriod) queryParams.append('period', selectedPeriod);
      if (selectedStatus) queryParams.append('status', selectedStatus);
      if (selectedExe) queryParams.append('exe', selectedExe);

      const response = await fetch(`https://nihon-inventory.onrender.com/api/allor?${queryParams}`); // Update the URL with your backend endpoint
      const data = await response.json();
      setOrders(data);
      setIsLoading(false); // Set loading to false when fetching completes
    } catch (error) {
      console.error('Error fetching orders:', error);
      setIsLoading(false); // Set loading to false in case of error
    }
  };

  const dateRanges = [
    { label: 'Today', value: 'today' },
    { label: 'This Week', value: 'thisWeek' },
    { label: 'This Month', value: 'thisMonth' },
    { label: 'Last 7 Days', value: 'last7Days' },
    { label: 'Last 30 Days', value: 'last30Days' },
  ];

  return (
    <div>
      <Menu/>
    <div>
      <h3 className="h3order">All Order Details</h3>
      
      {/* Search form */}
      <div className="search-form">
        <label>Time Period:</label>
        <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
          <option value="">All</option>
          {dateRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
        <label>Status:</label>
        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value="">All</option>
          <option value="Approved">Approved</option>
          <option value="Canceled">Canceled</option>
          <option value="pending">pending</option>
        </select>
        <label>Exe:</label>
        <select value={selectedExe} onChange={(e) => setSelectedExe(e.target.value)}>
          <option value="">All</option>
          <option value="Mr.Ahamed">Mr.Ahamed</option> 
          <option value="Mr.Dasun">Mr.Dasun</option> 
          <option value="Mr.Chameera">Mr.Chameera</option> 
          <option value="Mr.Sanjeewa">Mr.Sanjeewa</option> 
          <option value="Mr.Navaneedan">Mr.Navaneedan</option>
          <option value="Mr.Nayum">Mr.Nayum</option>
        </select>
      </div>
      
      {isLoading ? (
  <SpinnerImg />
) : (
  <table className='tordert'>
    <thead>
      <tr>
        <th className='thorder'>Order Number</th>
        <th className='thorder'>Customer</th>
        <th className='thorder'>Customer Code</th>
        <th className='thorder'>Order Date</th>
        <th className='thorder'>Exe</th>
        <th className='thorder'>Status</th>
        <th className='thorder'>Action</th>
        {/* Add more table headers as needed */}
      </tr>
    </thead>
    <tbody>
      {Array.isArray(orders) && orders.map((order) => (
        <tr key={order._id}>
          <td className='tdorder'>{order.orderNumber}</td>
          <td className='tdorder'>{order.customer}</td>
          <td className='tdorder'>{order.code}</td>
          {/* Add more table cells for other order details */}
          <td className='tdorder'>{order.orderDate}</td>
          <td className='tdorder'>{order.exe}</td>
          <td className='tdorder'>{order.status}</td>
          <td className='tdorder'>
          <Link to={`/adminorder/${order.orderNumber}`}>
           <AiOutlineEye size={20} color={"purple"} />
          </Link>
          </td>
          {/* Add more table cells as needed */}
        </tr>
      ))}
    </tbody>
  </table>
)}

    </div>
    <Footer/>
    </div>
  );
};

export default ViewallOrder;
