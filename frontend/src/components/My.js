import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Hero from "./Hero";
import { Modal, Button } from "react-bootstrap";

const My = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shareLink, setShareLink] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Data Diri
  const [data_diri, setUsers] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const id_akun = user && user.user && user.user.id_akun;


  let encodedIdAkun = btoa(id_akun);

  useEffect(() => {
    getUsers();
    if (id_akun) {
      setShareLink(`http://localhost:3000/${encodedIdAkun}`);
    }
  }, [id_akun]);

  const getUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id_akun}`);
      setUsers(response.data);
    } catch (error) {
      // Handle error jika data diri tidak ditemukan
      console.error("Error fetching data:", error);
      setUsers(null); // Set user menjadi null untuk menandakan data diri tidak ditemukan
    }
  };

  const copyShareLink = () => {
    const el = document.createElement("textarea");
    el.value = shareLink;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setShowModal(false); // Hide modal after link is copied
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
      const response = await axios.get(`http://localhost:5000/skills/akun/${id_akun}`);
      setSkill(response.data);

      // Pisahkan skills berdasarkan kategori_skill
      const softSkills = response.data.skills.filter((skill) => skill.kategori_skill === "softskill");
      const hardSkills = response.data.skills.filter((skill) => skill.kategori_skill === "hardskill");

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
        const response = await axios.get(`http://localhost:5000/organisasi/akun/${id_akun}`);

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
  }, [id_akun]);

  // Portopolio
  const [portofolios, setPorto] = useState([]);

  useEffect(() => {
    getPorto();
  }, [id_akun]);

  const getPorto = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/porto/${id_akun}`);
      setPorto(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const SkillCard = ({ skill, onEditClick, isChecked, onCheckboxChange }) => (
    <div className="progress-container mr-4 card mb-4 skill-card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="skill mb-4" style={{ fontWeight: "bold", color: "#001F3F", fontSize: "14px" }}>
              <input type="checkbox" checked={isChecked} onChange={onCheckboxChange} className="mr-2" />
              {skill.nama_skill.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="progress mt-3">
          <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${skill.level * 10}%` }}></div>
          {/* Move the percentage to the right */}
          <div className="progress-percent text-right mt-3">
            <medium>{skill.level * 10}%</medium>
          </div>
        </div>
        <div className="description" style={{ fontSize: "14px" }}>
          <b>Deskripsi:</b> {skill.deskripsi ? <p>{skill.deskripsi}</p> : <p>-</p>}
        </div>
      </div>
    </div>
  );

  const renderPortofolioContent = (url) => {
    const fileExtension = url.split(".").pop().toLowerCase();
    const isImage = ["jpg", "jpeg", "png", "gif"].includes(fileExtension);
    const isPDF = fileExtension === "pdf";
    const isAudio = ["mp3", "wav"].includes(fileExtension);
    const isVideo = ["mp4", "webm"].includes(fileExtension);

    if (isImage) {
      return <img src={url} alt="Portofolio" height="600" width="400" />;
    } else if (isPDF) {
      return <embed src={url} type="application/pdf" className="pdf-embed" height="600" />;
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
        const response = await axios.get(`http://localhost:5000/pendidikan/akun/${id_akun}`);

        // Pastikan respons dari API berupa array atau ubah sesuai kebutuhan
        setPendidikan(response.data.pendidikan);
        console.log("Pendidikan:", response.data.pendidikan);
      } catch (error) {
        console.error("Error fetching education data:", error);
      }
    };
    fetchData();
  }, [id_akun]);

  const handleMenuCV = () => {
    navigate("/menu_cv");
  };

  return (
    <body>
      <Hero />

      <button
        className="btn btn-primary"
        style={{
          marginTop: "20px",
          borderRadius: "50px",
          fontSize: "14px",
          fontWeight: "bold",
        }}
        onClick={handleMenuCV}
      >
        <i className="bi bi-printer-fill mr-3"></i>{" "}
        Select Template CV
      </button>
      <Button
        variant="primary"
        onClick={() => setShowModal(true)}
        style={{
          marginTop: "20px",
          borderRadius: "50px",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        <i className="bi bi-share-fill mr-3"></i>
        Share
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Share Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Copy the link below:</p>
          <textarea
            defaultValue={shareLink} // menggunakan defaultValue
            readOnly
            style={{ width: "100%", height: "100px" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={copyShareLink}>
            Copy Link
          </Button>
        </Modal.Footer>
      </Modal>

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
                        <i className="bi bi-person-vcard mr-3"></i> {/* <strong> Name </strong>  */}
                        <br />
                        <span>{data_diri.nama}</span>
                      </li>
                      <li>
                        <i className="bi bi-person-gear mr-3"></i> {/* <strong> Name </strong>  */}
                        <br />
                        <span>{data_diri.profesi}</span>
                      </li>
                      <li>
                        <i class="bi bi-cake mr-3"></i> {/* <strong> Place, Date of Birth :</strong>{" "} */}
                        <span>
                          {data_diri.tempat_lahir}, {data_diri.tanggal_lahir}
                        </span>
                      </li>
                      <li>
                        <i class="bi bi-house-door mr-3"></i> {/* <strong> Address :</strong>{" "} */}
                        <span>{data_diri.alamat}</span>
                      </li>
                      <li>
                        <i className="bi bi-people mr-3"></i> {/* <strong> Marriage Status :</strong>{" "} */}
                        <span>{data_diri.status}</span>
                      </li>
                      <li>
                        <i class="bi bi-telephone mr-3"></i> {/* <strong> Phone Number :</strong>{" "} */}
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
                        <i class="bi bi-envelope mr-3"></i> {/* <strong> Email :</strong>  */}
                        <span>{data_diri.email}</span>
                      </li>
                      <li>
                        <i class="bi bi-linkedin mr-3"></i> {/* <strong> LinkedIn :</strong>{" "} */}
                        <span>{data_diri.linkedin}</span>
                      </li>
                      <li>
                        <i class="bi bi-instagram mr-3"></i> {/* <strong> Social Media :</strong>{" "} */}
                        <span>
                          <a href={data_diri.link_sosmed}>@{data_diri.sosial_media}</a>
                        </span>
                      </li>
                      <li>
                        <i class="bi bi-twitter mr-3"></i>{" "}
                        <span>
                          <a href={data_diri.link_twitter}>@{data_diri.twitter}</a>
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
      <section id="pendidikan" class="pendidikan">
        <div class="container">
          <div class="section-title">
            <h2>Education</h2>
          </div>

          {pendidikan.length > 0 ? (
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
          ) : (
            <div class="title d-flex justify-content-center align-items-center text-center mt-5">
              <div
                className="text-center"
                style={{
                  marginBottom: "20px",
                  color: "grey",
                  fontSize: "16px",
                }}
              >
                Educational data Hasn't Been Added
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Organisasi Section */}
      <section id="organisasi" className="organisasi">
        <div className="container">
          <div className="section-title">
            <h2>Organizational Experience</h2>
          </div>

          {Array.isArray(organisasi) && organisasi.length > 0 ? (
            <ul className="organisasi-list">
              {organisasi.map((item, index) => (
                <li key={index} className="organisasi-item">
                  <h3 className="organisasi-name">{item.nama_organisasi}</h3>
                  <div className="organisasi-info">
                    <p className="organisasi-tahun">
                      {item.periode_awal} - {item.periode_akhir || "Sekarang"}
                    </p>
                    <p className="organisasi-jabatan">{item.jabatan}</p>
                  </div>
                  <p className="organisasi-deskripsi">{item.deskripsi_jabatan}</p>
                </li>
              ))}
            </ul>
          ) : (<div class="title d-flex justify-content-center align-items-center text-center mt-5">
          <div
            className="text-center"
            style={{
              marginBottom: "20px",
              color: "grey",
              fontSize: "16px",
            }}
          >
            Organization data Hasn't Been Added
          </div>
        </div>
          )}
        </div>
      </section>

      {/* End Organisasi Section */}

      {/* ======= Portfolio Section ======= */}
      <section id="Porto" className="portfolio">
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
      <section id="skills" className="skills">
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
                  <div className="progress-container mr-4 card mb-4 skill-card" key={skill.id_skill} data-aos="fade-up">
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
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${skill.level * 10}%` }}></div>
                        <div className="progress-percent text-right mt-3">
                          <medium>{skill.level * 10}%</medium>
                        </div>
                      </div>
                      <div className="description" style={{ fontSize: "14px" }}>
                        <b>Deskripsi:</b> {skill.deskripsi ? <p>{skill.deskripsi}</p> : <p>-</p>}
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
                  <div className="progress-container mr-4 card mb-4 skill-card" key={skill.id_skill} data-aos="fade-up">
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
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${skill.level * 10}%` }}></div>
                        <div className="progress-percent text-right mt-3">
                          <medium>{skill.level * 10}%</medium>
                        </div>
                      </div>
                      <div className="description" style={{ fontSize: "14px" }}>
                        <b>Deskripsi:</b> {skill.deskripsi ? <p>{skill.deskripsi}</p> : <p>-</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="section-title">
              <h2>Skills</h2>
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
                Skills data Hasn't Been Added
              </div>
            </div>
          </div>
        )}
      </section>
      <a href="#about" class="back-to-top d-flex align-items-center justify-content-center">
        <i class="bi bi-arrow-up-short"></i>
      </a>
    </body>
  );
};

export default My;
