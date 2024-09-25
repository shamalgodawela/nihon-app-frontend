import React, { useState } from 'react';
import axios from 'axios';

const SalesByExe = () => {
  const [exe, setExe] = useState('');
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!exe) {
      alert('Please select a sales executive');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(`https://nihon-inventory.onrender.com/api/get-executives-sales-eachProduct/${exe}`);
      setSalesData(response.data);
    } catch (error) {
      console.error('Error fetching sales data:', error.message);
      alert('Failed to fetch sales data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Product-Wise Sales by Executive</h2>
      <select
        className="form-input"
        name="exe"
        value={exe}
        onChange={(e) => setExe(e.target.value)} // Update the exe state on change
        style={{ marginRight: '10px', padding: '5px' }}
      >
        <option value="">Select EXE:</option>
        <option value="Mr.Ahamed">Mr.Ahamed</option>
        <option value="Mr.Dasun">Mr.Dasun</option>
        <option value="Mr.Chameera">Mr.Chameera</option>
        <option value="Mr.Sanjeewa">Mr.Sanjeewa</option>
        <option value="Mr.Navaneedan">Mr.Navaneedan</option>
        <option value="Mr.Nayum">Mr.Nayum</option>
      </select>
      <button
        onClick={handleSearch}
        style={{
          padding: '5px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Get Sales Data
      </button>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        salesData.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Total Sales</th>
                <th>Total Quantity</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((data, index) => (
                <tr key={index}>
                  <td>{data.productName}</td>
                  <td>{data.totalSales}</td>
                  <td>{data.totalQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
};

export default SalesByExe;
