import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllProducts.css';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://nihon-inventory.onrender.com/api/getallbulk');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
    <h2 className='bulkh'>Bulk Products</h2>
    {isLoading ? (
      <p>Loading...</p>
    ) : (
      <table className="product-table"> 
        <thead>
          <tr>
            <th>Bulk Code</th>
            <th>Bulk Name</th>
            <th>Quantity</th>
            <th>Weight/volum</th>
            
            
            
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.bulkCode}</td>
              <td>{product.name}</td>
              <td>{parseFloat(product.quantity).toFixed(2)}</td>
              <td>{product.weightsh}</td>
             
           
             
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
  );
};

export default AllProducts;
