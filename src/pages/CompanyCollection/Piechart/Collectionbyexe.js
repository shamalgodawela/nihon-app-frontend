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
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Set loading state to true before the request
                const queryParams = startDate && endDate ? `?startDate=${startDate}&endDate=${endDate}` : '';
                const response = await axios.get(`http://localhost:5000/api/collection-exe${queryParams}`);
                setData(response.data);
                setLoading(false); // Set loading state to false after data is fetched
            } catch (error) {
                console.error('Failed to fetch executive collections', error.message);
                setError('Failed to fetch executive collections');
                setLoading(false); // Set loading state to false in case of error
            }
        };

        fetchData();
    }, [startDate, endDate]); // Dependency array to refetch when startDate or endDate change

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
        navigate(-1);
    };

    return (
        <div>
            <Link to="#" onClick={goBack}><IoMdArrowRoundBack size={23} /></Link>&nbsp;&nbsp;
            <h1 className='h1-exe-colelction'>Executives Collection (updated details of 2024 April to present)</h1>
            
            <div className="search-container">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="Start Date"
                />
                &nbsp; to &nbsp;
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="End Date"
                />
            </div>

            <div className="chart-container">
                <Pie data={chartData} />
            </div>
        </div>
    );
};

export default Collectionbyexe;
