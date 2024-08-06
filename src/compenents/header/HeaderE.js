import React, { useEffect, useState } from 'react';
import styles from './header.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/authServiceExe';
import { SET_LOGIN, selectName } from '../../redux/features/auth/authSliceExe';

const HeaderE = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const [fontSize, setFontSize] = useState('1.5rem');

  const updateFontSize = () => {
    if (window.innerWidth <= 480) {
      setFontSize('1rem'); // Mobile view
    } else if (window.innerWidth <= 768) {
      setFontSize('1.25rem'); // Tablet view
    } else {
      setFontSize('1.5rem'); // Default view
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateFontSize);
    updateFontSize(); // Initial check

    return () => window.removeEventListener('resize', updateFontSize);
  }, []);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate('/ExeLogin');
  };

  const headingStyles = {
    fontWeight: 300, // equivalent to --fw-thin
    fontSize: fontSize
  };

  return (
    <div className='--pad header'>
      <div className='--flex-between'>
        <h3 style={headingStyles}>
          <span id='wel'>{name}</span>
        </h3>
        <button onClick={logout} className='--btn --btn-danger'>Logout</button>
      </div>
      <hr />
    </div>
  );
};

export default HeaderE;
