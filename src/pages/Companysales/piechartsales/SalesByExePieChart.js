import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const SalesByExePieChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Fetch data whenever startDate or endDate changes
  useEffect(() => {
    const fetchData = async () => {
      if (!startDate || !endDate) {
        setError("Please select both start and end dates");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('https://nihon-inventory.onrender.com/api/salesbyExe', {
          params: {
            startDate,
            endDate
          }
        });

        setSalesData(response.data);
      } catch (error) {
        console.error('Error fetching sales by executive:', error);
        setError('Failed to fetch sales data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]); // Dependency array ensures that it runs whenever these values change

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {/* Date Filters */}
      <div style={{ marginBottom: '20px' }}>
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
        <button onClick={() => {}}>Search</button>
      </div>

      {/* Loading/Error or Pie Chart */}
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
              labels: salesData.map(item => item._id),
              datasets: [
                {
                  data: salesData.map(item => item.totalSales),
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.8)', // Red
                    'rgba(54, 162, 235, 0.8)', // Blue
                    'rgba(255, 206, 86, 0.8)', // Yellow
                    'rgba(0, 255, 0, 1)', // Green
                    'rgba(153, 102, 255, 0.8)', // Purple
                    'rgba(255, 159, 64, 0.8)', // Orange
                    'rgba(255, 192, 203, 1)' // Pink
                  ]
                }
              ]
            }}
            options={{
              plugins: {
                legend: {
                  display: true,
                  position: 'bottom'
                }
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SalesByExePieChart;
