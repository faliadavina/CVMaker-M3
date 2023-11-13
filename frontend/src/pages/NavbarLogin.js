import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaEnvelope } from 'react-icons/fa'; // Import icons from react-icons
import Logo from '../img/logo.png';


const NavbarLogin = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          <img src={Logo} style={{ width: '100px', height: 'auto' }} alt="logo" />
        </NavLink>

        <ul className="navbar-nav ml-auto flex-row"> {/* Use flex-row to keep items in the same row */}
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              <div className="nav-icon"><FaUser /></div>
              <div className="nav-text">Biography</div>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contact">
              <div className="nav-icon"><FaEnvelope /></div>
              <div className="nav-text">Contact Us</div>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarLogin;
