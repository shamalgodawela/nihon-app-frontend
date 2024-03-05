import React from 'react';
import { Link } from 'react-router-dom';
import './menu.css'

const Menu = () => {
  return (
    <nav className="navbar2">
    <ul className="nav-menu2">
      <li className="nav-item2">
        <Link to="/Adminallorder" className="nav-link2">Home</Link>
      </li>
      <li className="nav-item2">
        <Link to="/AllOutstanding" className="nav-link2">Manage Outstanding</Link>
      </li>
      <li className="nav-item2">
        <Link to="/" className="nav-link2">Logout</Link>
      </li>
      
    </ul>
    
  </nav>
  );
};

export default Menu;
