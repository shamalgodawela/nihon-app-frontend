import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import Menu from '../../compenents/Menu/Menu';
import Footer from '../../compenents/footer/Footer';
import './Delaerh.css'

const DealerPastHistory = () => {
  const [productMovement, setProductMovement] = useState({});
  const [totalInvoiceAmount, setTotalInvoiceAmount] = useState(0);
  const [totalCollectionAmount, setTotalCollectionAmount] = useState(0);
  const [dealerCode, setDealerCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from backend based on dealer code
  const fetchData = async () => {
    if (!dealerCode) {
      setError('Please enter a dealer code');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://nihon-inventory.onrender.com/api/get-total-salesby-dealer/${dealerCode}`);
      const { productMovement, totalInvoiceAmount, totalCollectionAmount } = response.data;

      setProductMovement(productMovement);
      setTotalInvoiceAmount(totalInvoiceAmount);
      setTotalCollectionAmount(totalCollectionAmount);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dealer sales data:', error.message);
      setError('Failed to fetch dealer sales data');
      setLoading(false);
    }
  };

  // Data for Bar Chart
  const chartData = {
    labels: Object.keys(productMovement), // Product names
    datasets: [
      {
        label: 'Product Movement (Quantity)',
        data: Object.values(productMovement), // Quantities
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  const formatNumbers = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

  return (
    <div>
      <Menu/>
      <h2 className='h2-dealer-history'>Dealer History Information</h2>
      <input
        type="text"
        placeholder="Enter Dealer Code"
        value={dealerCode}
        onChange={(e) => setDealerCode(e.target.value)}
      />
      <button onClick={fetchData}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <div>
          <p className='dealer-history-p'>Total Invoice Amount: Rs/={formatNumbers(totalInvoiceAmount)}</p>
          <p className='dealer-history-p'>Total Collection Amount: Rs/={formatNumbers(totalCollectionAmount)}</p>
          <p className='dealer-history-p'>Total Outstanding Amount: Rs/={formatNumbers((totalInvoiceAmount)-(totalCollectionAmount))}</p>

          <h3 className='h2-dealer-history'>Product Movement</h3>
          {Object.keys(productMovement).length === 0 ? (
            <p>No product movement data available</p>
          ) : (
            <Bar
              data={chartData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          )}
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default DealerPastHistory;
