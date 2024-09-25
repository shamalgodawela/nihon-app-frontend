import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './menu.css'
import { LuRefreshCw } from 'react-icons/lu';
import { IoMdArrowRoundBack } from 'react-icons/io';

const Menu = () => {
  const navigate=useNavigate();

  const RefreshButton = () => {
    const handleRefresh = () => {
      window.location.reload();
    };
    

    return (
      <button onClick={handleRefresh} className="refresh-button"><LuRefreshCw /></button>
    );
  };
  const goBack = () => {
    // Use navigate(-1) to navigate back
    navigate(-1);
   };
  return (
    <div>
    <nav className="navbar2">
    <ul className="nav-menu2">
      <li className="nav-item2">
        <Link to="/AllOutstanding" className="nav-link2">Dashboard</Link>
      </li>
      <li className="nav-item2">
        <Link to="/Adminallorder" className="nav-link2">Oder details</Link>
      </li>
      <li className="nav-item2">
        <Link to="/view-Delaer-history/:code" className="nav-link2">Check Dealer History</Link>
      </li>
      <li className="nav-item2">
        <Link to="/" className="nav-link2">Logout</Link>
      </li>
      
    </ul>
    
    
  </nav>
  <Link to="#" onClick={goBack} className='Back-Icon'><IoMdArrowRoundBack size={23}/></Link>&nbsp;&nbsp;
  <RefreshButton />
  </div>
  );
};

export default Menu;
