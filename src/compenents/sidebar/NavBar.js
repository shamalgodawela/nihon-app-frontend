import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { logoutUser } from '../../services/authService'
import { SET_LOGIN, selectName } from '../../redux/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function NavBar() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const name=useSelector(selectName)

  const logout=async()=>{
   
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login")

  }

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      
       
        
    
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className='navbar'>
      
        
        <Link to='#' className='menu-bars'>
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
      </div>
      <nav className={`nav-menu ${sidebar ? 'nav-menu-open' : 'nav-menu-closed'}`}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className='navbar-toggle'>
            <Link to='#' className='menu-bars'>
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        
      </nav>
      
      <button id='btnnav' onClick={logout} className='--btn --btn-danger' >Logout</button>
      
    </IconContext.Provider>
    
    
    </div>
  );
}

export default NavBar;
