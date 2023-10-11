import React,{useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DataDiri = () => {
    const [user, setUsers] = useState(null);
    const navigate = useNavigate()
    
    useEffect(()=>{
        getUsers();
    },[]);
    
    const getUsers = async() =>{
        const id_akun = 1;
        try {
          const response = await axios.get(`http://localhost:5000/users/${id_akun}`);
          setUsers(response.data);
        } catch (error) {
          // Handle error jika data diri tidak ditemukan
          console.error('Error fetching data:', error);
          setUsers(null); // Set user menjadi null untuk menandakan data diri tidak ditemukan
        }
    }

    const handleEditClick = () => {
      // Menggunakan navigate untuk mengarahkan pengguna ke halaman pengeditan
      navigate('/edit_data_diri');
    };

    const handleAddClick = () => {
      // Menggunakan navigate untuk mengarahkan pengguna ke halaman pengeditan
      navigate('/add_data_diri');
    };

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
                <li><a href="#hero" class="nav-link scrollto"><i class="bx bx-home"></i> <span>My CV</span></a></li>
                <li><a href="#about" class="nav-link scrollto active"><i class="bx bx-user"></i> <span>Edit Personal Data</span></a></li>
                <li><a href="#resume" class="nav-link scrollto"><i class="bx bx-file-blank"></i> <span>Edit Educational Data</span></a></li>
                <li><a href="#portfolio" class="nav-link scrollto"><i class="bx bx-book-content"></i> <span>Edit Orginizational Experience</span></a></li>
                <li><a href="#services" class="nav-link scrollto"><i class="bx bx-server"></i> <span>Edit Skills</span></a></li>
                <li><a href="#contact" class="nav-link scrollto"><i class="bx bx-envelope"></i> <span>Edit Portofolio</span></a></li>
              </ul>
            </nav>{/* .nav-menu */}
          </div>
        </header>{/* End Header */}
      
        <main id="main">
      
            {/* ======= About Section ======= */}
            <section id="about" class="about">
            {user ? (
              <div class="container">

                <div class="section-title d-flex justify-content-between align-items-center">
                    <h2>Get To Know Me!</h2>
                    <button className="btn btn-primary" onClick={() => handleEditClick()}> <i class="bx bxs-edit mr-2"></i> Edit Personal Data</button>
                </div>


                <div class="section-title">
                  <p>{user.deskripsi}</p>
                </div>

                <div class="row">
                  <div class="col-lg-4" data-aos="fade-right">
                      <img src={user.url} class="img-fluid" alt=""/>
                  </div>
                  <div class="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">
                      <h3>Personal Data</h3>
                      <div class="row">
                          <div class="col-lg-8">
                            
                              <ul>
                                <li><i class="bi bi-chevron-right"></i> <strong>Name :</strong> <span>{user.nama}</span></li>
                                <li><i class="bi bi-chevron-right"></i> <strong>Place and Date of Birth :</strong> <span>{user.tempat_lahir}, {user.tanggal_lahir}</span></li>
                                <li><i class="bi bi-chevron-right"></i> <strong>Address :</strong> <span>{user.alamat}</span></li>
                                <li><i class="bi bi-chevron-right"></i> <strong>Profession :</strong> <span>{user.status}</span></li>
                                <li><i class="bi bi-chevron-right"></i> <strong>Phone Number :</strong> <span>{user.telp}</span></li>
                                <li><i class="bi bi-chevron-right"></i> <strong>Email :</strong> <span>{user.email}</span></li>
                                <li><i class="bi bi-chevron-right"></i> <strong>Social Media :</strong> <span>{user.sosial_media}</span></li>
                                <li><i class="bi bi-chevron-right"></i> <strong>LinkedIn :</strong> <span>{user.linkedin}</span></li>
                              </ul>
                            
                          </div>
                      </div>
                  </div>
                  
                </div>

              </div>
              ) : (
                    <div class="container">
                      <div class="title d-flex justify-content-center align-items-center text-center mt-5">
                        <h3>Personal Data Has Not Been Added</h3>
                      </div>
                      <div class="text-center mt-3">
                        <button className="btn btn-dark mt-5" onClick={() => handleAddClick()}> <i class="bx bx-plus"></i> Add Personal Data</button>
                      </div>
                    </div>
              )}
            </section>{/* End About Section */}
      
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


export default DataDiri;