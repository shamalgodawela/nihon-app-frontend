import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../../../compenents/sidebar/NavBar';
import './getallreturn.css'

const GetAllReturnDetails = () => {
    const [returnDetails, setReturnDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReturnDetails = async () => {
            try {
                const response = await axios.get('https://nihon-inventory.onrender.com/api/getreturnd');
                setReturnDetails(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching return details:', error);
            }
        };

        fetchReturnDetails();
    }, []);

    return (
        <div>
            <NavBar/>
            <div className="return-details-container">
    <div>
        <h2 className="return-details-heading">Return Details</h2>
        {loading ? (
            <p className="return-details-loading">Loading...</p>
        ) : (
            <table className="return-details-table">
                <thead>
                    <tr>
                        <th>Invoice Number</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {returnDetails.map((detail, index) => (
                        <tr key={index}>
                            <td>{detail.invoiceNumber}</td>
                            <td>{detail.customer}</td>
                            <td>{detail.date}</td>
                            <td>{detail.remarks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
</div>


        </div>
    );
};

export default GetAllReturnDetails;
