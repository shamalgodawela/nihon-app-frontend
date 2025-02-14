import React, { useState } from 'react';
import './exeLogin.css'; 
import { GrLogin } from "react-icons/gr";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, validateEmail } from '../../services/authServiceExe';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSliceExe';
import { toast } from 'react-toastify';
import Loader from '../../compenents/loader/Loader';

const initialState = {
  email: "",
  password: "",
};

const ExeLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [fromData, setFromData] = useState(initialState);
  const { email, password } = fromData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFromData({ ...fromData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    // Validate email and password
    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    // Prepare the data to send to the backend
    const userData = { email, password };
    setIsLoading(true);

    try {
      const data = await loginUser(userData); // loginUser sends the data to the backend
      console.log(data);

      // On successful login, store user data in Redux
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));

      // Navigate to the dashboard page
      navigate("/Exedahsboard");
    } catch (error) {
      setIsLoading(false);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <body className="body2">
      {isLoading && <Loader />}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
      />
      <h1 className="h1-login">Nihon &nbsp; Inventory &nbsp; System</h1>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div id="login-form">
        <form onSubmit={login}>
          <div className="icon-login">
            <GrLogin size={35} />
          </div>
          <h2 className="h2-login">Login</h2>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" id="login-btn">
            Login Here
          </button>
          <br />
        </form>

        <a href="forgot" className="a-login">
          Forgot Password
        </a>
        <br />
        <a href="/" className="a-login">
          Home
        </a>
        <br />
      </div>
    </body>
  );
};

export default ExeLogin;
