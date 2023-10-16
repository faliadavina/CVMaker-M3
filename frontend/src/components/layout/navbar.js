import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    useEffect(() => {
        const navLinks = document.querySelectorAll('.nav-menu .nav-link');

        navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (location.pathname === href) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }, [location]);
    return (
        <header id="header">
            <div className="d-flex flex-column">

                <div className="profile">
                    <img src="img/profile-img.jpg" alt="" className="img-fluid rounded-circle" />
                    <h1 className="text-light"><a href="index.html">Alex Smith</a></h1>
                    <div className="social-links mt-3 text-center">
                        <a href="/manage_user" className="twitter"><i className="bx bxl-twitter"></i></a>
                        <a href="#about" className="facebook"><i className="bx bxl-facebook"></i></a>
                        <a href="#about" className="instagram"><i className="bx bxl-instagram"></i></a>
                        <a href="#about" className="google-plus"><i className="bx bxl-skype"></i></a>
                        <a href="#about" className="linkedin"><i className="bx bxl-linkedin"></i></a>
                    </div>
                </div>

                <nav id="navbar" className="nav-menu navbar">
                    <ul>
                        <li><a href="/manage_user" className="nav-link scrollto"><i className="bx bx-home"></i> <span>Home</span></a></li>
                        <li><a href="#about" className="nav-link scrollto"><i className="bx bx-user"></i> <span>About</span></a></li>
                        <li><a href="#resume" className="nav-link scrollto"><i className="bx bx-file-blank"></i> <span>Resume</span></a></li>
                        <li><a href="#portfolio" className="nav-link scrollto"><i className="bx bx-book-content"></i> <span>Portfolio</span></a></li>
                        <li><a href="#services" className="nav-link scrollto"><i className="bx bx-server"></i> <span>Services</span></a></li>
                        <li><a href="#contact" className="nav-link scrollto"><i className="bx bx-envelope"></i> <span>Contact</span></a></li>
                        <li><a href="/portofolio" className="nav-link scrollto"><i className="bx bx-envelope"></i> <span>Upload Portofolio</span></a></li>
                    </ul>
                </nav>{/* .nav-menu */}
            </div>
        </header>
    )
}

export default Navbar;