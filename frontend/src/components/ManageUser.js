import React,{useState, useEffect} from 'react';
import axios from "axios";

const ManageUser = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(()=>{
        getUsers();
    },[]);
    
    const getUsers = async() =>{
        const response = await axios.get("http://localhost:5000/users");
        setUsers(response.data);
    }

    return (
        <body>
        {/* ======= Mobile nav toggle button ======= */}
        <i class="bi bi-list mobile-nav-toggle d-xl-none"></i>
      
        {/* ======= Header ======= */}
        <header id="header">
          <div class="d-flex flex-column">
      
            <div class="profile">
              <img src="img/profile-img.jpg" alt="" class="img-fluid rounded-circle"/>
              <h1 class="text-light"><a href="index.html">Alex Smith</a></h1>
              <div class="social-links mt-3 text-center">
                <a href="#about" class="twitter"><i class="bx bxl-twitter"></i></a>
                <a href="#about" class="facebook"><i class="bx bxl-facebook"></i></a>
                <a href="#about" class="instagram"><i class="bx bxl-instagram"></i></a>
                <a href="#about" class="google-plus"><i class="bx bxl-skype"></i></a>
                <a href="#about" class="linkedin"><i class="bx bxl-linkedin"></i></a>
              </div>
            </div>
      
            <nav id="navbar" class="nav-menu navbar">
              <ul>
                <li><a href="#hero" class="nav-link scrollto active"><i class="bx bx-home"></i> <span>Home</span></a></li>
                <li><a href="#about" class="nav-link scrollto"><i class="bx bx-user"></i> <span>About</span></a></li>
                <li><a href="#resume" class="nav-link scrollto"><i class="bx bx-file-blank"></i> <span>Resume</span></a></li>
                <li><a href="#portfolio" class="nav-link scrollto"><i class="bx bx-book-content"></i> <span>Portfolio</span></a></li>
                <li><a href="#services" class="nav-link scrollto"><i class="bx bx-server"></i> <span>Services</span></a></li>
                <li><a href="#contact" class="nav-link scrollto"><i class="bx bx-envelope"></i> <span>Contact</span></a></li>
              </ul>
            </nav>{/* .nav-menu */}
          </div>
        </header>{/* End Header */}
      
        <main id="main">
      
          {/* ======= Breadcrumbs ======= */}
          <section class="breadcrumbs">
            <div class="container">
      
              <div class="d-flex justify-content-between align-items-center">
                <h2>Inner Page</h2>
                <ol>
                  <li><a href="index.html">Home</a></li>
                  <li>Inner Page</li>
                </ol>
              </div>
      
            </div>
          </section>{/* End Breadcrumbs */}
      
          <section class="inner-page">
            <div class="container">
                {users.map((user)=>
                    <p>
                        {user.nama}
                    </p>
                )}
            </div>
          </section>
      
        </main>{/* End #main */}
      
        {/* ======= Footer ======= */}
        <footer id="footer">
          <div class="container">
            <div class="copyright">
              &copy; Copyright <strong><span>iPortfolio</span></strong>
            </div>
            <div class="credits">
              {/* All the links in the footer should remain intact. */}
              {/* You can delete the links only if you purchased the pro version. */}
              {/* Licensing information: https://bootstrapmade.com/license/ */}
              {/* Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/ */}
              Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </div>
          </div>
        </footer>{/* End  Footer */}
      
        <a href="#about" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
        </body>
    )
}


export default ManageUser;