import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LiveMap from './LiveMap';

const ViewLiveLocation = () => {
    const [liveLocations, setLiveLocations] = useState([]);

    useEffect(() => {
        const fetchLiveLocations = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/live-locations');
                if (response.ok) {
                    const data = await response.json();
                    setLiveLocations(data.locations);
                } else {
                    throw new Error('Failed to fetch live locations');
                }
            } catch (error) {
                console.error('Error fetching live locations:', error.message);
                toast.error('Failed to fetch live locations');
            }
        };

        // Fetch live locations when the component mounts
        fetchLiveLocations();

        // Set up interval to fetch live locations periodically (e.g., every 30 seconds)
        const intervalId = setInterval(fetchLiveLocations, 30000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <h2>Live User Locations</h2>
            <ul>
                {liveLocations.map((location, index) => (
                    <li key={index}>
                        Latitude: {location.latitude}, Longitude: {location.longitude}
                    </li>
                ))}
            </ul>
            <LiveMap/>
        </div>
    );
};

export default ViewLiveLocation;
