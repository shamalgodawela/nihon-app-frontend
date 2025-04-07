import React, { useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SalesByExePieChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchData = async () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get('//nihon-inventory.onrender.com/api/salesbyExe', {
        params: {
          startDate,
          endDate,
        },
      });
      setSalesData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching sales by executive:', err);
      setError('Failed to fetch sales data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Sales by Executive (Pie Chart)</h2>

      {/* Date Filters */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={fetchData}>Search</button>
      </div>

      {/* Pie Chart or Loading/Error */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : salesData.length === 0 ? (
          <p>No data found for the selected period</p>
        ) : (
          <div style={{ width: '600px', height: '600px' }}>
            <Pie
              data={{
                labels: salesData.map((item) => item._id || 'Unknown'),
                datasets: [
                  {
                    data: salesData.map((item) => item.totalSales),
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.8)',
                      'rgba(54, 162, 235, 0.8)',
                      'rgba(255, 206, 86, 0.8)',
                      'rgba(0, 255, 0, 1)',
                      'rgba(153, 102, 255, 0.8)',
                      'rgba(255, 159, 64, 0.8)',
                      'rgba(255, 192, 203, 1)',
                    ],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: true,
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesByExePieChart;
