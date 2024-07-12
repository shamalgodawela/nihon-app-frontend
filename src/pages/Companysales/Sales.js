import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../../compenents/footer/Footer';
import './sales.css';
import MonthlySalesChart from './Barchartsales/MonthlySalesChart';
import SalesByExePieChart from './piechartsales/SalesByExePieChart';
import Tabelexesales from './tabelsales/Tabelexesales';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

const NAVIGATE_BACK = 'NAVIGATE_BACK';

const Sales = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [totalcollection, settotalcollection]=useState(0);
  const [outstanding, setoutstanding]= useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate=useNavigate();
 
 

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
  const goBack = () => {
    // Use navigate(-1) to navigate back
    navigate(-1);
  };

  return (
    <div>
      <Link to="#" onClick={goBack}><IoMdArrowRoundBack size={23}/></Link>&nbsp;&nbsp;
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
<Link to="/Executive-by-collection">
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
</Link>

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
      <div>
        <h2 className="pie-container">Executive Monthly sales</h2>
        <Tabelexesales/>
      </div>
     
      <Footer />
    </div>
  );
};

export default Sales;
