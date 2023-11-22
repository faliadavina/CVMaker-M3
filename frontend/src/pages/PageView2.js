import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";

const PageView2 = () => {
  const dispatch = useDispatch();
  const { id_akun } = useParams();

    // Fungsi dekripsi ID akun
    const decryptIdAkun = (encodedId) => {
      return atob(encodedId); // Menggunakan atob untuk Base64 decoding
    };
  
    const decryptedIdAkun = decryptIdAkun(id_akun);

  // Data Diri
  const [data_diri, setUsers] = useState(null);

  useEffect(() => {
    getUsers();
  }, [decryptedIdAkun]);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users/${decryptedIdAkun}`
      );
      setUsers(response.data);
    } catch (error) {
      // Handle error jika data diri tidak ditemukan
      console.error("Error fetching data:", error);
      setUsers(null); // Set user menjadi null untuk menandakan data diri tidak ditemukan
    }
  };

  console.log(id_akun);

  // Data Skill
  const [softSkills, setSoftSkills] = useState([]);
  const [hardSkills, setHardSkills] = useState([]);
  const [data_skill, setSkill] = useState(null);

  useEffect(() => {
    getSkills();
  }, [decryptedIdAkun]);

  const getSkills = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/skills/akun/${decryptedIdAkun}`
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
    const fetchOrganisasi = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/organisasi/akun/${decryptedIdAkun}`
        );

        console.log("Raw response:", response);

        if (response.status === 404) {
          console.error("Endpoint not found:", response);
        } else {
          setOrganisasi(response.data.organisasi); // Pastikan sesuai dengan struktur respons
          console.log("Organisasi:", response.data.organisasi);
        }
      } catch (error) {
        console.error("Error fetching organizational data:", error);
      }
    };

    if (id_akun) {
      fetchOrganisasi();
    }
  }, [decryptedIdAkun]);

  // Portopolio
  const [portofolios, setPorto] = useState([]);

  useEffect(() => {
    getPorto();
  }, [decryptedIdAkun]);

  const getPorto = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/porto/${decryptedIdAkun}`
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
          `http://localhost:5000/pendidikan/akun/${decryptedIdAkun}`
        );

        // Pastikan respons dari API berupa array atau ubah sesuai kebutuhan
        setPendidikan(response.data.pendidikan);
        console.log("Pendidikan:", response.data.pendidikan);
      } catch (error) {
        console.error("Error fetching education data:", error);
      }
    };
    fetchData();
  }, [decryptedIdAkun]);

  const PendidikanDetail = pendidikan
    ? pendidikan.map((pendidikan, index) => (
        <Col
          key={pendidikan.id_pend}
          xs={12}
          md={6}
          lg={6}
          xl={6}
          className="mb-3"
        >
          <Card className="custom-card" data-aos="fade-up">
            <Card.Body>
              <div className="pendidikan-details">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <Card.Title
                      style={{ fontSize: "20px", marginBottom: "8px" }}
                    >
                      {pendidikan.jenjang}
                    </Card.Title>
                    <Card.Subtitle
                      style={{ fontSize: "17px", marginBottom: "8px" }}
                    >
                      {pendidikan.nama_sekolah}
                    </Card.Subtitle>
                    <Card.Text
                      style={{ fontSize: "14px", marginBottom: "8px" }}
                    >
                      JURUSAN {pendidikan.jurusan}
                    </Card.Text>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ color: "gray", fontSize: "12px" }}>
                      {pendidikan.tahun_masuk} - {pendidikan.tahun_lulus}
                    </span>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))
    : null;

  const OrganisasiDetail = organisasi
    ? organisasi.map((org) => (
        <Col key={org.id_org} xs={12} md={6} lg={6} xl={6} className="mb-3">
          <Card className="custom-card " data-aos="fade-up">
            <Card.Body>
              <div className="organisasi-details">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <Card.Title
                      style={{ fontSize: "20px", marginBottom: "8px" }}
                    >
                      {org.nama_organisasi.toUpperCase()}
                    </Card.Title>
                    <Card.Subtitle
                      style={{ fontSize: "17px", marginBottom: "8px" }}
                    >
                      {org.jabatan.charAt(0).toUpperCase() +
                        org.jabatan.slice(1)}
                    </Card.Subtitle>
                    <Card.Text
                      style={{ fontSize: "14px", marginBottom: "8px" }}
                    >
                      {org.deskripsi_jabatan.charAt(0).toUpperCase() +
                        org.deskripsi_jabatan.slice(1)}
                    </Card.Text>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ color: "gray", fontSize: "12px" }}>
                      {org.periode_awal} - {org.periode_akhir}
                    </span>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))
    : null;

  return (
    <body style={{ backgroundColor: "rgba(212, 224, 241,0.6)" }}>
         <Header />
      {/* ======= Data Diri Section ======= */}
      <section
        id="about"
        className="about ml-3 ml-md-4 ml-lg-5 mr-md-4 mr-lg-5"
      >
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
                        <br />
                        <span>{data_diri.nama}</span>
                      </li>
                      <li>
                        <i className="bi bi-person-gear mr-3"></i>{" "}
                        {/* <strong> Name </strong>  */}
                        <br />
                        <span>{data_diri.profesi}</span>
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
                        <i class=""></i> <span></span>
                      </li>
                      <li>
                        <i class=""></i> <span></span>
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
                        <span>
                          <a href={data_diri.link_sosmed}>
                            @{data_diri.sosial_media}
                          </a>
                        </span>
                      </li>
                      <li>
                        <i class="bi bi-twitter mr-3"></i>{" "}
                        <span>
                          <a href={data_diri.link_twitter}>
                            @{data_diri.twitter}
                          </a>
                        </span>
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
              <div
                className="text-center"
                style={{
                  marginBottom: "20px",
                  color: "grey",
                  fontSize: "16px",
                }}
              >
                Personal data Hasn't Been Added
              </div>
            </div>
          </div>
        )}
      </section>

      <hr className="section-divider" />

      <section
        id="pendidikan"
        className="pendidikan ml-3 ml-md-4 ml-lg-5 mr-md-4 mr-lg-5"
      >
        {pendidikan !== null ? (
          <div className="container">
            <div
              className="section-title"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="title-container">
                <h2>Pendidikan</h2>
              </div>
            </div>
            <Row>{PendidikanDetail}</Row>
          </div>
        ) : (
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ marginTop: "20%" }}
          >
            <div
              className="text-center"
              style={{
                marginBottom: "20px",
                color: "grey",
                fontSize: "14px",
              }}
            >
              Pendidikan Hasn't Been Added
            </div>
          </div>
        )}
      </section>

      <hr className="section-divider" />

      <section
        id="resume"
        className="resume ml-3 ml-md-4 ml-lg-5 mr-md-4 mr-lg-5"
      >
        <div className="container">
          {organisasi.length > 0 ? (
            <>
              <div className="section-title">
                <h2>Organizational Experience</h2>
              </div>
              <div className="row">{OrganisasiDetail}</div>
            </>
          ) : (
            <>
              <div className="section-title">
                <h2>Organizational Experience</h2>
              </div>
              <div className="title d-flex justify-content-center align-items-center text-center mt-5">
                <div
                  className="text-center"
                  style={{
                    marginBottom: "20px",
                    color: "grey",
                    fontSize: "16px",
                  }}
                >
                  Organizational Experience Data Has Not Been Added
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      {/* End Organisasi Section */}

      <hr className="section-divider" />

      {/* ======= Portfolio Section ======= */}
      <section
        id="Porto"
        className="portfolio ml-3 ml-md-4 ml-lg-5 mr-md-4 mr-lg-5"
        data-aos="fade-up"
      >
        <div className="container">
          <div className="section-title">
            <h2>Portfolio</h2>
          </div>

          <div className="container">
            {portofolios === null || portofolios.length === 0 ? (
              <div class="title d-flex justify-content-center align-items-center text-center mt-5">
                <div
                  className="text-center"
                  style={{
                    marginBottom: "20px",
                    color: "grey",
                    fontSize: "16px",
                  }}
                >
                  Portofolios Hasn't Been Added
                </div>
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

      <hr className="section-divider" />

      <section
        id="skills"
        className="skills ml-3 ml-md-4 ml-lg-5 mr-md-4 mr-lg-5"
      >
        {data_skill ? (
          <div className="container">
            <div className="section-title">
              <h2>Skills</h2>
            </div>
            <div className="row skills-content">
              <div className="col-lg-6">
                <div className="section-subtitle">
                  <h5>Soft Skills</h5>
                </div>
                {softSkills.map((skill, index) => (
                  <div
                    className="progress-container mr-4 card mb-4 skill-card"
                    key={skill.id_skill}
                    data-aos="fade-up"
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span
                            className="skill mb-4"
                            style={{
                              fontWeight: "bold",
                              color: "#001F3F",
                              fontSize: "14px",
                            }}
                          >
                            {skill.nama_skill.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="progress mt-3">
                        <div
                          className="progress-bar progress-bar-striped progress-bar-animated"
                          role="progressbar"
                          style={{ width: `${skill.level * 10}%` }}
                        ></div>
                        <div className="progress-percent text-right mt-3">
                          <medium>{skill.level * 10}%</medium>
                        </div>
                      </div>
                      <div className="description" style={{ fontSize: "14px" }}>
                        <b>Deskripsi:</b>{" "}
                        {skill.deskripsi ? <p>{skill.deskripsi}</p> : <p>-</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-lg-6">
                <div className="section-subtitle">
                  <h5>Hard Skills</h5>
                </div>
                {hardSkills.map((skill, index) => (
                  <div
                    className="progress-container mr-4 card mb-4 skill-card"
                    key={skill.id_skill}
                    data-aos="fade-up"
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span
                            className="skill mb-4"
                            style={{
                              fontWeight: "bold",
                              color: "#001F3F",
                              fontSize: "14px",
                            }}
                          >
                            {skill.nama_skill.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="progress mt-3">
                        <div
                          className="progress-bar progress-bar-striped progress-bar-animated"
                          role="progressbar"
                          style={{ width: `${skill.level * 10}%` }}
                        ></div>
                        <div className="progress-percent text-right mt-3">
                          <medium>{skill.level * 10}%</medium>
                        </div>
                      </div>
                      <div className="description" style={{ fontSize: "14px" }}>
                        <b>Deskripsi:</b>{" "}
                        {skill.deskripsi ? <p>{skill.deskripsi}</p> : <p>-</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div class="container">
            <div class="section-title">
              <h2>Skills</h2>
            </div>
            <div class="title d-flex justify-content-center align-items-center text-center mt-5">
              <div
                className="text-center"
                style={{
                  marginBottom: "20px",
                  color: "grey",
                  fontSize: "16px",
                }}
              >
                Skills data Hasn't Been Added
              </div>
            </div>
          </div>
        )}
      </section>

      <a
        href="#about"
        class="back-to-top d-flex align-items-center justify-content-center"
      >
        <i class="bi bi-arrow-up-short"></i>
      </a>
    </body>
  );
};

export default PageView2;
