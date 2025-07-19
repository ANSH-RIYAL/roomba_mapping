
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/sidebar.css';

const Sidebar = ({ userType = 'customer', onLogout, onChatClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/');
  };

  const handleChatBotClick = (e) => {
    e.preventDefault();
    if (onChatClick) {
      onChatClick();
    }
  };

  return (
    <nav className="sidebar">
      <Link to="/" className="logo">
        <i className="fas fa-store"></i>
        <span>Grocer-ease</span>
      </Link>
      <div className="nav-links">
        <a href="#" className="nav-btn" onClick={handleChatBotClick}>
          <i className="fas fa-robot"></i>
          <span>Chat Bot</span>
        </a>
        <Link to="/" className="nav-btn">
          <i className="fas fa-user"></i>
          <span>Login</span>
        </Link>
        <Link to="/" className="nav-btn">
          <i className="fas fa-search-location"></i>
          <span>All Stores</span>
        </Link>
        <Link to="/floorplan" className="nav-btn">
          <i className="fas fa-map"></i>
          <span>Floorplan</span>
        </Link>
        {(userType === 'staff' || userType === 'owner') && (
          <>
            <Link to="/staff" className="nav-btn">
              <i className="fas fa-database"></i>
              <span>Upload Inventory</span>
            </Link>
            <Link to="/staff" className="nav-btn">
              <i className="fas fa-edit"></i>
              <span>Update Floorplan</span>
            </Link>
            <Link to="/staff" className="nav-btn">
              <i className="fas fa-upload"></i>
              <span>Upload Roomba</span>
            </Link>
          </>
        )}
      </div>
      {userType !== 'customer' && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
          <button className="btn btn-customer" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Log Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
