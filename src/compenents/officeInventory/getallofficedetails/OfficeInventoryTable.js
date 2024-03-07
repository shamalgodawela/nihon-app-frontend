import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './OfficeInventory.css';

const OfficeInventoryTable = () => {
  const [inventoryList, setInventoryList] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('https://nihon-inventory.onrender.com/api/alloffice');
        setInventoryList(response.data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div className="office-inventory-container">
      <Link to="/additems">
        <button>Add Inventory</button>
      </Link>
      <h2 className='h2office'>Office Inventory List</h2>
      <table>
        <thead>
          <tr>
            <th>Code Number</th>
            <th>Model</th>
            <th>Type</th>
            <th>Date of Purchase</th>
            <th>Value</th>
            <th>Warranty Period</th>
            <th>Used By</th>
          </tr>
        </thead>
        <tbody>
          {inventoryList.map((item) => (
            <tr key={item._id}>
              <td>{item.codeNumber}</td>
              <td>{item.model}</td>
              <td>{item.type}</td>
              <td>{item.dateOfPurchase}</td>
              <td>{item.value}</td>
              <td>{item.warrantyPeriod}</td>
              <td>{item.usedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OfficeInventoryTable;
