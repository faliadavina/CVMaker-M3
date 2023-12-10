import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaEnvelope, FaHome, FaUserCircle } from 'react-icons/fa'; // Import icons from react-icons
import Logo from '../img/logo.png';

const NavbarMainLanding = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent mt-0">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center w-100"> {/* Gunakan d-flex */}
                    {/* Elemen di kiri */}
                    <div className="navbar-brand img-logo">
                        <img className = "img-logo" src={Logo} style={{ width: '100px', height: 'auto' }} alt="logo" />
                    </div>

                  
                    {/* Elemen di kanan */}
                    <div className="ml-auto">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">
                                    <div className="nav-icon"><FaUser /></div>
                                    <div className="nav-text">Login</div>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarMainLanding;
