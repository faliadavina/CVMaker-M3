import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../pages/Sidebar";


const DataDiri = () => {
  const [data_diri, setUsers] = useState(null);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const id_akun = user && user.user && user.user.id_akun;

  console.log(id_akun);

  useEffect(() => {
    getUsers();
  }, [id_akun]);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users/${id_akun}`
      );
      setUsers(response.data);
    } catch (error) {
      // Handle error jika data diri tidak ditemukan
      console.error("Error fetching data:", error);
      setUsers(null); // Set user menjadi null untuk menandakan data diri tidak ditemukan
    }
  };

  const handleEditClick = () => {
    // Menggunakan navigate untuk mengarahkan pengguna ke halaman pengeditan
    navigate("/edit_data_diri");
  };

  const handleAddClick = () => {
    // Menggunakan navigate untuk mengarahkan pengguna ke halaman pengeditan
    navigate("/add_data_diri");
  };

  return (
    <body>
      <Sidebar />

      <main id="main">
        {/* ======= About Section ======= */}
        <section id="about" class="about">
          {data_diri ? (
            <div class="container">
              <div class="section-title d-flex justify-content-between align-items-center">
                <h2>Get To Know Me!</h2>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEditClick()}
                >
                  {" "}
                  <i class="bx bxs-edit mr-2"></i> Edit Personal Data
                </button>
              </div>

              <div class="section-title">
                <p>{data_diri.deskripsi}</p>
              </div>

              <div class="row">
                <div class="col-lg-4" data-aos="fade-right">
                  <img src={data_diri.url} class="img-fluid" alt="" />
                </div>
                <div class="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">
                  <h3>Personal Data</h3>
                  <div class="row">
                    <div class="col-lg-8">
                      <ul>
                        <li>
                          <i class="bi bi-chevron-right"></i>{" "}
                          <strong>Name :</strong> <span>{data_diri.nama}</span>
                        </li>
                        <li>
                          <i class="bi bi-chevron-right"></i>{" "}
                          <strong>Place and Date of Birth :</strong>{" "}
                          <span>
                            {data_diri.tempat_lahir}, {data_diri.tanggal_lahir}
                          </span>
                        </li>
                        <li>
                          <i class="bi bi-chevron-right"></i>{" "}
                          <strong>Address :</strong>{" "}
                          <span>{data_diri.alamat}</span>
                        </li>
                        <li>
                          <i class="bi bi-chevron-right"></i>{" "}
                          <strong>Marriage Status :</strong>{" "}
                          <span>{data_diri.status}</span>
                        </li>
                        <li>
                          <i class="bi bi-chevron-right"></i>{" "}
                          <strong>Phone Number :</strong>{" "}
                          <span>{data_diri.telp}</span>
                        </li>
                        <li>
                          <i class="bi bi-chevron-right"></i>{" "}
                          <strong>Email :</strong>{" "}
                          <span>{data_diri.email}</span>
                        </li>
                        <li>
                          <i class="bi bi-chevron-right"></i>{" "}
                          <strong>Social Media :</strong>{" "}
                          <span>{data_diri.sosial_media}</span>
                        </li>
                        <li>
                          <i class="bi bi-chevron-right"></i>{" "}
                          <strong>LinkedIn :</strong>{" "}
                          <span>{data_diri.linkedin}</span>
                        </li>
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
                <button
                  className="btn btn-dark mt-5"
                  onClick={() => handleAddClick()}
                >
                  {" "}
                  <i class="bx bx-plus"></i> Add Personal Data
                </button>
              </div>
            </div>
          )}
        </section>
        {/* End About Section */}
      </main>
      {/* End #main */}


      <a
        href="#about"
        class="back-to-top d-flex align-items-center justify-content-center"
      >
        <i class="bi bi-arrow-up-short"></i>
      </a>
    </body>
  );
};

export default DataDiri;
