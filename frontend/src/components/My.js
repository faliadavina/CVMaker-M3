import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Hero from "./Hero";

const My = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Data Diri
  const [data_diri, setUsers] = useState(null);

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

  // Data Skill
  const [softSkills, setSoftSkills] = useState([]);
  const [hardSkills, setHardSkills] = useState([]);
  const [data_skill, setSkill] = useState(null);

  useEffect(() => {
    getSkills();
  }, [id_akun]);

  const getSkills = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/skills/akun/${id_akun}`
      );
      setSkill(response.data);

      // Pisahkan skills berdasarkan kategori_skill
      const softSkills = response.data.skills.filter(
        (skill) => skill.kategori_skill === "softskill"
      );
      const hardSkills = response.data.skills.filter(
        (skill) => skill.kategori_skill === "hardskill"
      );

      setSoftSkills(softSkills);
      setHardSkills(hardSkills);
      //setErrorMessage(""); // Reset error message on successful fetch
    } catch (error) {
      console.error("Error fetching skills:", error);
      setSkill(null);
    }
  };

  // Data Organisasi
  const [organisasi, setOrganisasi] = useState([]);

  useEffect(() => {
    const fetchDataOrganisasi = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/organisasi-by-id-akun/${id_akun}`
        );
        setOrganisasi(response.data);
      } catch (error) {
        console.error("Error fetching organisasi data:", error);
      }
    };

    fetchDataOrganisasi();
  }, [id_akun]);

  // Portopolio
  const [portofolios, setPorto] = useState([]);

  useEffect(() => {
    getPorto();
  }, [id_akun]);

  const getPorto = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/porto/${id_akun}`
      );
      setPorto(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderPortofolioContent = (url) => {
    const fileExtension = url.split(".").pop().toLowerCase();
    const isImage = ["jpg", "jpeg", "png", "gif"].includes(fileExtension);
    const isPDF = fileExtension === "pdf";
    const isAudio = ["mp3", "wav"].includes(fileExtension);
    const isVideo = ["mp4", "webm"].includes(fileExtension);

    if (isImage) {
      return <img src={url} alt="Portofolio" height="600" width="400" />;
    } else if (isPDF) {
      return (
        <embed
          src={url}
          type="application/pdf"
          className="pdf-embed"
          height="600"
        />
      );
    } else if (isAudio) {
      return <audio controls src={url} />;
    } else if (isVideo) {
      return <video controls src={url} />;
    } else {
      return <p>Unsupported file format</p>;
    }
  };

  // Pendidikan
  const [pendidikan, setPendidikan] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/pendidikan/akun/${id_akun}`
        );

        // Pastikan respons dari API berupa array atau ubah sesuai kebutuhan
        setPendidikan(response.data.pendidikan);
        console.log("Pendidikan:", response.data.pendidikan);
      } catch (error) {
        console.error("Error fetching education data:", error);
      }
    };
    fetchData();
  }, [id_akun]);

  return (
    <body>
      <Hero />
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
                        <strong>Email :</strong> <span>{data_diri.email}</span>
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
          </div>
        )}
      </section>
      <section id="pendidikan" class="pendidikan">
        <div class="container">
          <div class="section-title">
            <h2>Riwayat Pendidikan</h2>
          </div>

          <ul class="education-list">
            {pendidikan.map((item, index) => (
              <li key={index} class="education-item">
                <h3 class="jenjang">{item.jenjang}</h3>
                <div class="school-info">
                  <p class="nama-sekolah">{item.nama_sekolah}</p>
                  <p class="jurusan">{item.jurusan}</p>
                </div>
                <p class="tahun">
                  {item.tahun_masuk} - {item.tahun_lulus}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Organisasi Section */}
      <section id="resume" className="resume">
        <div className="container">
          {organisasi.length > 0 ? (
            <>
              <div className="section-title">
                <h2>Organisasi</h2>
              </div>
              <div className="card-content">
                <div className="content">
                  <div>
                    <ol>
                      {organisasi.map((org) => (
                        <li key={org.id_org}>
                          <h4
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <b style={{ textAlign: "left" }}>
                              {org.nama_organisasi}
                            </b>
                            <b
                              style={{
                                textAlign: "right",
                                marginRight: "10px",
                              }}
                            >
                              {org.periode}
                            </b>
                          </h4>
                          <p>{org.jabatan}</p>
                          <p>{org.deskripsi_jabatan}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>
              <h3>Organization data has not been found</h3>
            </div>
          )}
        </div>
      </section>
      {/* End Organisasi Section */}

      {/* ======= Portfolio Section ======= */}
      <section id="Porto" className="portfolio">
        <div className="container">
          <div className="section-title">
            <h2>Portfolio Section</h2>
          </div>

          <div className="container">
            {portofolios === null || portofolios.length === 0 ? (
              <div className="container text-center contStyle">
                <h3>No Data Portofolio Available, Please Add Data First</h3>
              </div>
            ) : (
              <div className="container">
                <div className="row">
                  {portofolios.map((portofolio) => (
                    <div className="col-md-6 mx-auto" key={portofolio.id_porto}>
                      <div
                        className="card porto"
                        style={{
                          marginBottom: "15px",
                          height: "300px",
                          width: "300px",
                          marginRight: "50px",
                        }}
                      >
                        {renderPortofolioContent(portofolio.url)}
                        <div className="deskripsi">
                          <p>{portofolio.deskripsi}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="skills" className="skills">
        {data_skill ? (
          <div className="container">
            <div
              className="section-title"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="title-container">
                <h2>Skills</h2>
              </div>
              {}
              <div className="btn-container">{}</div>
            </div>

            <div className="row skills-content">
              <div className="col-lg-6">
                <div className="section-subtitle">
                  <h5>Soft Skills</h5>
                </div>
                {softSkills.map((skill, index) => (
                  <div
                    className="progress-container"
                    key={skill.id_skill}
                    data-aos="fade-up"
                  >
                    <div className="progress">
                      <span className="skill mb-4">
                        {skill.nama_skill}{" "}
                        <i className="val">{skill.level * 10}%</i>
                      </span>
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated mt-4"
                        role="progressbar"
                        aria-valuenow={skill.level * 10}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: `${skill.level * 10}%` }}
                      ></div>
                    </div>
                    <div className="progress-buttons">{}</div>
                  </div>
                ))}
              </div>
              <div className="col-lg-6">
                <div className="section-subtitle">
                  <h5>Hard Skills</h5>
                </div>
                {hardSkills.map((skill, index) => (
                  <div
                    className="progress-container"
                    key={skill.id_skill}
                    data-aos="fade-up"
                  >
                    <div className="progress">
                      <span className="skill mb-4">
                        {skill.nama_skill}{" "}
                        <i className="val">{skill.level * 10}%</i>
                      </span>
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated mt-4"
                        role="progressbar"
                        aria-valuenow={skill.level * 10}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: `${skill.level * 10}%` }}
                      ></div>
                    </div>
                    <div className="progress-buttons">{}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <div
              className="text-center"
              style={{
                marginBottom: "20px",
                color: "grey",
                fontSize: "14px",
              }}
            >
              Skill Hasn't Been Added
            </div>
            {}
          </div>
        )}
      </section>

      <button
        className="btn btn-primary"
        style={{
          marginTop: "20px",
          borderRadius: "50px",
          fontSize: "14px",
          fontWeight: "bold",
        }}
        onClick={() => window.print()}
      >
        {" "}
        Print CV
      </button>

      <a
        href="#about"
        class="back-to-top d-flex align-items-center justify-content-center"
      >
        <i class="bi bi-arrow-up-short"></i>
      </a>
    </body>
  );
};

export default My;
