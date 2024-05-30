import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const SalesByExePieChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://nihon-inventory.onrender.com/api/salesbyExe');
        setSalesData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sales by executive:', error);
        setError('Failed to fetch sales data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div style={{ width: '600px', height: '600px' }}>
        <Pie
        
          data={{
            labels: salesData.map(item => item._id),
            datasets: [
              {
                data: salesData.map(item => item.totalSales),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.8)', // Red
                  'rgba(54, 162, 235, 0.8)', // Blue
                  'rgba(255, 206, 86, 0.8)', // Yellow
                  'rgba(75, 192, 192, 0.8)', // Teal
                  'rgba(153, 102, 255, 0.8)', // Purple
                  'rgba(255, 159, 64, 0.8)' // Orange
                ]
              }
            ]
          }}
          options={{
            legend: {
              display: true,
              
            }
            
          }}
        />
        </div>
      )}
    </div>
  );
};

export default SalesByExePieChart;
