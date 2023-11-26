import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const DataView = () => {
  const [data_diri, setUsers] = useState(null);
  const accountId = useSelector((state) => state.account.accountId);
  console.log(accountId)

  useEffect(() => {
    getUsers();
  }, [accountId]);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `http://194.233.93.124:8000/users/${accountId}`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setUsers(null);
    }
  };

  return (
    <body>

      {/* ======= Data Diri Section ======= */}
      <section id="about" class="about">
        {data_diri ? (
          <div class="container">
          <div class="section-title d-flex justify-content-between align-items-center">
            <h2>Get To Know Me!</h2>
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
          <div class="container">
            <div class="section-title">
              <h2>Personal Data</h2>
            </div>
            <div class="title d-flex justify-content-center align-items-center text-center mt-5">
              <h5></h5>
            </div>
          </div>
        )}
      </section>

      <a
        href="#about"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </body>
  );
};

export default DataView;
