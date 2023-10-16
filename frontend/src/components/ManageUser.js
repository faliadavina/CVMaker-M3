import React,{useState, useEffect} from 'react';
import axios from "axios";
import Sidebar from "../pages/Sidebar";

const ManageUser = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(()=>{
        getUsers();
    },[]);
    
    const getUsers = async() =>{
        const response = await axios.get("http://localhost:5000/akun");
        setUsers(response.data);
    }

    return (
        <body>
        <Sidebar />
      
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