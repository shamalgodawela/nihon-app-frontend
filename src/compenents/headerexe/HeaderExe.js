import React from 'react'
import { useState } from 'react';
import './headerexe.css'
import { Link } from 'react-router-dom';

const HeaderExe = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
    
  return (
    <div>

  <nav className="navbar2">
    <ul className="nav-menu2">
      <li className="nav-item2">
        <Link to="/Exedahsboard" className="nav-link2">Dashboard</Link>
      </li>
      <li className="nav-item2">
        <Link to="/addorder" className="nav-link2">Add Order</Link>
      </li>
      <li className="nav-item2">
        <Link to="/allorder" className="nav-link2">List of Order</Link>
      </li>
      <li className="nav-item2">
        <Link to="/" className="nav-link2">Logout</Link>
      </li>
      
    </ul>
    
    
  </nav>
          
    
    
      
    </div>
  )
}

export default HeaderExe;