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
        `http://localhost:5000/users/${accountId}`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setUsers(null);
    }
  };

  return (
    <body>
        <section id="about" className="about">
          {data_diri ? (
            <div className="container">
              <div className="section-title d-flex justify-content-between align-items-center">
                <h2>Get To Know Me!</h2>
              </div>
              <div className="section-title">
                <p>{data_diri.deskripsi}</p>
              </div>
              <div className="row">
                <div className="col-lg-4" data-aos="fade-right">
                  <img src={data_diri.url} className="img-fluid" alt="" />
                </div>
                <div className="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">
                  <h3>Personal Data</h3>
                  <div className="row">
                    <div className="col-lg-8">
                      <ul>
                        <li>
                          <strong>Name :</strong> <span>{data_diri.nama}</span>
                        </li>
                        <li>
                          <strong>Place and Date of Birth :</strong>{" "}
                          <span>
                            {data_diri.tempat_lahir}, {data_diri.tanggal_lahir}
                          </span>
                        </li>
                        <li>
                          <strong>Address :</strong> <span>{data_diri.alamat}</span>
                        </li>
                        <li>
                          <strong>Profession :</strong> <span>{data_diri.status}</span>
                        </li>
                        <li>
                          <strong>Phone Number :</strong> <span>{data_diri.telp}</span>
                        </li>
                        <li>
                          <strong>Email :</strong> <span>{data_diri.email}</span>
                        </li>
                        <li>
                          <strong>Social Media :</strong>{" "}
                          <span>{data_diri.sosial_media}</span>
                        </li>
                        <li>
                          <strong>LinkedIn :</strong> <span>{data_diri.linkedin}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="container">
              <div className="title d-flex justify-content-center align-items-center text-center mt-5">
                <h3>Personal Data Has Not Been Added</h3>
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
