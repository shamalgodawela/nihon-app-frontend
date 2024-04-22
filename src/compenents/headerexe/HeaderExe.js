import React from 'react'
import { useState } from 'react';
import './headerexe.css'

const HeaderExe = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
    
  return (
    <div>
        
      <span className={`toggle-button ${isMenuOpen ? 'button-open' : ''}`} onClick={toggleMenu}>
        <div className="menu-bar menu-bar-top"></div>
        <div className="menu-bar menu-bar-middle"></div>
        <div className="menu-bar menu-bar-bottom"></div>
      </span>
      <div className={`menu-wrap ${isMenuOpen ? 'menu-show' : ''}`}>
        <ul className="menu">
        <li className='liexe'><a  className='aexe' href="#">Dashboard</a></li>
          <li className='liexe'><a className='aexe' href="#">Add Order</a></li>
          <li className='liexe'><a  className='aexe' href="#">List of Order</a></li>
          <li className='liexe'><a  className='aexe' href="#"></a></li>
        </ul>
      </div>
    
      
    </div>
  )
}

export default HeaderExe;