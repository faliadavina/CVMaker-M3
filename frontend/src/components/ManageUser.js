import React, { useState, useEffect } from 'react';
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
    </body>
  )
}


export default ManageUser;