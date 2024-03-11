import React from 'react';
import { Link } from 'react-router-dom';
import './menu.css'
import { LuRefreshCw } from 'react-icons/lu';

const Menu = () => {
  const RefreshButton = () => {
    const handleRefresh = () => {
      window.location.reload();
    };

    return (
      <button onClick={handleRefresh} className="refresh-button"><LuRefreshCw /></button>
    );
  };
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
    <RefreshButton />
    
  </nav>
  );
};

export default Menu;
