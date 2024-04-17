import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Executivel = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [geolocationAvailable, setGeolocationAvailable] = useState(true);

    const handleLogin = () => {
        if (!geolocationAvailable) {
            toast.error('Geolocation is not supported by this browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                sendLoginRequest(email, password, latitude, longitude);
            },
            (error) => {
                console.error('Geolocation error:', error.message);
                toast.error('Failed to get location. Please try again.');
            }
        );
    };

    const sendLoginRequest = (email, password, latitude, longitude) => {
        fetch('http://localhost:5000/api/login/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                latitude: latitude,
                longitude: longitude,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the response data received from the server
            if (data.token) {
                // If successful, show success toast message
                toast.success('Login successful!');
                // You can also save the token to local storage for further use
                localStorage.setItem('token', data.token);
                // Send location to server after successful login
                sendLocationToServer(latitude, longitude);
            } else {
                // If login fails, log the error message received from the server
                console.error('Login failed:', data.msg);
                // Show error toast message
                toast.error('Login failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Show error toast message if request fails
            toast.error('Error occurred. Please try again.');
        });
    };

    const sendLocationToServer = (latitude, longitude) => {
        fetch('http://localhost:5000/api/location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ latitude, longitude }),
        })
        .then(response => {
            // Handle response from server if needed
            toast.success('Location sent successfully');
        })
        .catch(error => {
            console.error('Error sending location data to server:', error);
            toast.error('Failed to send location');
        });
    };
    
    return (
        <div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Executivel;
