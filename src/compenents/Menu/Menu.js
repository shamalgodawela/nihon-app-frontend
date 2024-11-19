import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuRefreshCw } from 'react-icons/lu';
import { IoMdArrowRoundBack } from 'react-icons/io';
import './menu.css';

const Menu = () => {
  const navigate = useNavigate();

  const RefreshButton = () => {
    const handleRefresh = () => {
      window.location.reload();
    };
    return (
      <button onClick={handleRefresh} className="refresh-button"><LuRefreshCw /></button>
    );
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <nav className="navbar2">
        <ul className="nav-menu2">
          <li className="nav-item2">
            <Link to="/AllOutstanding" className="nav-link2">
              <i className="fas fa-tachometer-alt"></i>Payment Details
            </Link>
          </li>
          <li className="nav-item2">
            <Link to="/Adminallorder" className="nav-link2">
              <i className="fas fa-boxes"></i> Order Details
            </Link>
          </li>
          <li className="nav-item2">
            <Link to="/view-Delaer-history/:code" className="nav-link2">
              <i className="fas fa-history"></i> Dealer History
            </Link>
          </li>
          <li className="nav-item2">
            <Link to="/Add-Cheque" className="nav-link2">
              <i className="fas fa-history"></i> Add Cheque
            </Link>
          </li>
          <li className="nav-item2">
            <Link to="/" className="nav-link2">
              <i className="fas fa-sign-out-alt"></i> Logout
            </Link>
          </li>
        </ul>
      </nav>
      <Link to="#" onClick={goBack} className="Back-Icon">
        <IoMdArrowRoundBack size={23} />
      </Link>
      &nbsp;&nbsp;
      <RefreshButton />
    </div>
  );
};

export default Menu;
