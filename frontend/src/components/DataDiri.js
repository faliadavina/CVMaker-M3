import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";

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

  return (
    <body>
      {/* ======= About Section ======= */}
      <section id="about" class="about">
        {data_diri ? (
          <div class="container">
          <div class="section-title d-flex justify-content-between align-items-center">
            <h2>Get To Know Me!</h2>
            <button
                className="btn btn-dark"
                onClick={() => handleEditClick()}
                style={{
                  borderRadius: "50px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginRight: "30px",
                }}
              >
                <i class="bx bxs-edit mr-2"></i> Edit Personal Data
              </button>
          </div>

          <div class="section-title">
            <p>{data_diri.deskripsi}</p>
          </div>

          <div class="row">
            <div class="col-lg-4" data-aos="fade-right">
              <img src={data_diri.url} class="profile_img" alt="" />
            </div>
            <div class="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">
              <h3 class="mb-4">Personal Data</h3>
              <div class="row">
                <div class="col-lg-6">
                  <ul>
                    <li>
                      <i className="bi bi-person-vcard mr-3"></i>{" "}
                      {/* <strong> Name </strong>  */}
                      <br/><span>{data_diri.nama}</span>
                    </li>
                    <li>
                      <i className="bi bi-person-gear mr-3"></i>{" "}
                      {/* <strong> Name </strong>  */}
                      <br/><span>{data_diri.profesi}</span>
                    </li>
                    <li>
                      <i class="bi bi-cake mr-3"></i>{" "}
                      {/* <strong> Place, Date of Birth :</strong>{" "} */}
                      <span>
                        {data_diri.tempat_lahir}, {data_diri.tanggal_lahir}
                      </span>
                    </li>
                    <li>
                      <i class="bi bi-house-door mr-3"></i>{" "}
                      {/* <strong> Address :</strong>{" "} */}
                      <span>{data_diri.alamat}</span>
                    </li>
                    <li>
                      <i className="bi bi-people mr-3"></i>{" "}
                      {/* <strong> Marriage Status :</strong>{" "} */}
                      <span>{data_diri.status}</span>
                    </li>
                    <li>
                      <i class="bi bi-telephone mr-3"></i>{" "}
                      {/* <strong> Phone Number :</strong>{" "} */}
                      <span>{data_diri.telp}</span>
                    </li>
                  </ul>
                </div>

                <div class="col-lg-6">
                  <ul>
                    <li>
                      <i class=""></i>{" "}
                      <span></span>
                    </li>
                    <li>
                      <i class=""></i>{" "}
                      <span></span>
                    </li>
                    <li>
                      <i class="bi bi-envelope mr-3"></i>{" "}
                      {/* <strong> Email :</strong>  */}
                      <span>{data_diri.email}</span>
                    </li>
                    <li>
                      <i class="bi bi-linkedin mr-3"></i>{" "}
                      {/* <strong> LinkedIn :</strong>{" "} */}
                      <span>{data_diri.linkedin}</span>
                    </li>
                    <li>
                      <i class="bi bi-instagram mr-3"></i>{" "}
                      {/* <strong> Social Media :</strong>{" "} */}
                      <span><a href={data_diri.link_sosmed}>@{data_diri.sosial_media}</a></span>
                    </li>
                    <li>
                      <i class="bi bi-twitter mr-3"></i>{" "}
                      <span><a href={data_diri.link_twitter}>@{data_diri.twitter}</a></span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
        ) : (
          <div className="container d-flex flex-column justify-content-center align-items-center" style={{ marginTop: "20%" }}>
            <div
              className="text-center"
              style={{
                marginBottom: "20px",
                color: "grey",
                fontSize: "14px",
              }}
            >
              Personal data Hasn't Been Added
            </div>
            <NavLink to="/add_data_diri">
              <button
                className="btn btn-dark"
                style={{
                  borderRadius: "50px",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                <FaPlus style={{ marginRight: "10px" }} /> Add Data
              </button>
            </NavLink>
          </div>
        )}
      </section>
      {/* End About Section */}
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
