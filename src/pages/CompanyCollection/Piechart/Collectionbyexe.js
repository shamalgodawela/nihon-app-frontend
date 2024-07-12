import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './Collectionbyexe.css'; // Import the CSS file
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';

const Collectionbyexe = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate=useNavigate();

    useEffect(() => {
    
        const fetchData = async () => {
            try {
                const response = await axios.get('https://nihon-inventory.onrender.com/api/collection-exe');
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch executive collections', error.message);
                setError('Failed to fetch executive collections');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const chartData = {
        labels: data.map(item => item.exe),
        datasets: [
            {
                data: data.map(item => item.totalCollection),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                ],
            },
        ],
    };
    const goBack = () => {
        // Use navigate(-1) to navigate back
        navigate(-1);
      };
    

    return (

        <div>
            <Link to="#" onClick={goBack}><IoMdArrowRoundBack size={23}/></Link>&nbsp;&nbsp;
            <h1 className='h1-exe-colelction'>Executives Collection (updated details of 2024 april to present)</h1>
       
        <div className="chart-container">
            <Pie data={chartData} />
        </div>
        </div>
    );
};

export default Collectionbyexe;
