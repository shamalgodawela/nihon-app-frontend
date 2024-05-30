import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../../compenents/sidebar/NavBar';
import Footer from '../../compenents/footer/Footer';
import './sales.css';
import MonthlySalesChart from './Barchartsales/MonthlySalesChart';
import SalesByExePieChart from './piechartsales/SalesByExePieChart';

const Sales = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [totalcollection, settotalcollection]=useState(0);
  const [outstanding, setoutstanding]= useState(0);
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

    const fetchTotalcollection= async ()=>{
      try{
        const response= await axios.get(`https://nihon-inventory.onrender.com/api/sumofcollection`);
        settotalcollection(response.data.sum);
        setLoading(false);

      }
      catch(error){
        console.error('failed to fetch total collection',error);
        setError('failed to fetch total collection')
        setLoading(false);

      }

    };

    fetchTotalSales();
    fetchTotalcollection();
  }, []);

  useEffect(()=>{
    setoutstanding(totalSales-totalcollection);
  },[totalSales,totalcollection]);

  

  const formatNumbers = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <NavBar />
      <div className='sales-Heading'>
        <h3>Hi, Welcome back!</h3>
        <h4>Finance Performance and Monitoring Sales Performance</h4>
        <h4 className='h4-season-update-heading'>Updated details of 2024 april to present(yala season)</h4>
      </div>
      <div className="cards-container">
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
              <p>RS/= {formatNumbers(totalSales.toFixed(2))}</p>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Total Collection</h2>
          </div>
          <div className="card-body">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <p>RS/= {formatNumbers((totalcollection.toFixed(2)))}</p>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Total Outstanding</h2>
          </div>
          <div className="card-body">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <p>RS/= {formatNumbers(outstanding.toFixed(2))}</p>
            )}
          </div>
        </div>
      </div>
      <div className="chart-container">
        <h2>Monthly Sales</h2>
        <MonthlySalesChart/>
      </div>
      <div>
        <h2  className="pie-container">Executive wise Sales(2024 april to present)</h2>
        <SalesByExePieChart/>
      </div>
     
      <Footer />
    </div>
  );
};

export default Sales;
