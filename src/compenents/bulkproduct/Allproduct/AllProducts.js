import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      <h2>All Products</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Bulk Code</th>
              <th>Quantity</th>
              <th>Weight</th>
              <th>Total Weight</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product.bulkCode}</td>
                <td>{product.quantity}</td>
                <td>{product.weight}</td>
                <td>{product.totweight}</td>
                {/* Add more table cells if needed */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProducts;
