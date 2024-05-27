import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../../compenents/sidebar/NavBar';
import Footer from '../../compenents/footer/Footer';
import './sales.css';

const Sales = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        const response = await axios.get('https://nihon-inventory.onrender.com/api/invoi/sum');
        setTotalSales(response.data.sum);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch total sales', error);
        setError('Failed to fetch total sales');
        setLoading(false);
      }
    };

    fetchTotalSales();
  }, []);

  return (
    <div>
      <NavBar />
      <div className='sales-Heading'>
        <h3>Hi, Welcome back!</h3>
        <h4>Finance Performance and Monitoring Sales Performance</h4>
      </div>
      <div className="card">
        <div className="card-header">
          <h2>Total Sales</h2>
        </div>
        <div className="card-body">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <p>RS/= {totalSales.toLocaleString()}</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sales;
