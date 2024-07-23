import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for the toast notifications
import NavBar from '../../compenents/sidebar/NavBar';
import Footer from '../../compenents/footer/Footer';
import './NandRprodcut.css'

const ViewallRAndn = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://nihon-inventory.onrender.com/api/get-alldetail-return');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <NavBar/>

        <h1 className='h1-return'>Return and new inserted Product details</h1>
      <ToastContainer /> 
      <div className='view-all-product-table'>
        <table>
          <thead>
            <tr>
              <th className='td-return'>Invoice Number/index No</th>
              <th className='td-return'>Invoice Date/ Product in date</th>
              <th className='td-return'>Customer</th>
              <th className='td-return'>Product Code</th>
              <th className='td-return'>Product Name</th>
              <th className='td-return'>Quantity</th>
              <th className='td-return'>Value</th>
              <th className='td-return'>Reason</th>
            </tr>
          </thead>
          <tbody>
            {products.map((pd, index) => (
              <tr key={index}>
                <td className='td-return'>{pd.invoiceNo}</td>
                <td className='td-return'>{pd.InvoiceDte}</td>
                <td className='td-return'>{pd.Customer}</td>
                <td className='td-return'>{pd.ProductCode}</td>
                <td className='td-return'>{pd.productName}</td>
                <td className='td-return'>{pd.quanity}</td>
                <td className='td-return'>{pd.value}</td>
                <td className='td-return'>{pd.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer/>
    </div>
  );
}

export default ViewallRAndn;
