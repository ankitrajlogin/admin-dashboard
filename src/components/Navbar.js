// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="logo">Admin Dashboard</Link>
        </div>
        <div className={`menu-icon ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/user-management" className="nav-link">User Management</Link></li>
          <li><Link to="/role-management" className="nav-link">Role Management</Link></li>
          <li><Link to="/permission-management" className="nav-link">Permission Management</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
