import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css'

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await fetch(`https://nihon-inventory.onrender.com/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Successful login
        toast.success('Login successful');
        navigate("/Adminallorder");
         // Display success toast
      } else {
        // Error handling
        if (response.status === 404) {
          toast.error('User not found. Please check your email.');
        } else if (response.status === 401) {
          toast.error('Incorrect email or password. Please try again.');
        } else {
          toast.error('An error occurred. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div><br/><br/><br/><br/><br/><br/>
    <div className="login-form-container">
    <h2>Admin Login</h2>
    <form onSubmit={handleLogin} className="login-form">
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
    <ToastContainer /> {/* Toast container */}
  </div>
  </div>
  );
};

export default LoginForm;
