import React, { useEffect, useState } from "react";
import "./cv.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";

import {
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaTwitter,
  FaPhone,
  FaMapMarkerAlt,
  FaDownload,
  FaArrowUp,
} from "react-icons/fa";

import { FaFilePdf, FaFileImage, FaFileAudio, FaVideo } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";

const Template1 = () => {
  const [data_diri, setUsers] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const id_akun = user?.user?.id_akun;
  const [isDescriptionClicked, setIsDescriptionClicked] = useState(false);
  const [clickedDescriptions, setClickedDescriptions] = useState({});
  const navigate = useNavigate();

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id_akun) {
          const response = await axios.get(
            `http://194.233.93.124:8000/users/${id_akun}`
          );
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setUsers(null);
      }
    };

    fetchData();
  }, [id_akun]);

  let displayedName = data_diri?.nama;
  let displayedProfesi = data_diri?.profesi;

  // Pendidikan
  const [pendidikan, setPendidikan] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://194.233.93.124:8000/pendidikan/akun/${id_akun}`
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

  // Data Organisasi
  const [organisasi, setOrganisasi] = useState([]);

  useEffect(() => {
    const fetchOrganisasi = async () => {
      try {
        const response = await axios.get(
          `http://194.233.93.124:8000/organisasi/akun/${id_akun}`
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
  }, [id_akun]);

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
        `http://194.233.93.124:8000/skills/akun/${id_akun}`
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

  // Portopolio
  const [portofolios, setPorto] = useState([]);

  useEffect(() => {
    getPorto();
  }, [id_akun]);

  const getPorto = async () => {
    try {
      const response = await axios.get(
        `http://194.233.93.124:8000/porto/${id_akun}`
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
      return (
        <img
          src={url}
          alt="Portofolio"
          height="150"
          width="150"
          style={{ border: "3px solid #8d6ec3" }}
        />
      );
    } else if (isPDF) {
      return <FaFilePdf size={150} style={{ color: "#8d6ec3" }} />;
    } else if (isAudio) {
      return <FaFileAudio size={150} style={{ color: "#8d6ec3" }} />;
    } else if (isVideo) {
      return <FaVideo size={150} style={{ color: "#8d6ec3" }} />;
    } else {
      return <p>Unsupported file format</p>;
    }
  };

  const handleDownloadPDF = () => {
    const printContent = document.querySelector(".page-cv1");

    if (printContent) {
      const originalDisplayStyle = printContent.style.display;
      printContent.style.display = "block";

      window.print();

      printContent.style.display = originalDisplayStyle;
      console.error("CV content found");
    } else {
      console.error("CV content not found");
    }
  };



  return (
    <div className="body-cv1">
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>
              only the first 3 educational data will be displayed
            </li>
            <li>
              only the first 3 organization data will be displayed
            </li>
            <li>
              only the first 2 hardskill data will be displayed
            </li>
            <li>
              only the first 1 softskill data will be displayed
            </li>

          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <button
        className="custom-button-cv1 purple-button-cv1 mr-4 margin-around-button"
        onClick={handleDownloadPDF}
      >
        <FaDownload className="download-icon" />
        <p className="mr-1">Download CV as PDF</p>
      </button>
      <div className="page-cv1">
        <header>
          <div className="header-container-cv1">
            <div className="image-container-cv1">
              {data_diri && data_diri.url && (
                <>
                  <img
                    src={data_diri.url}
                    alt="Your Name"
                    className="my-image-cv1"
                  />
                  <p className="name-text-cv1">{displayedName}</p>
                  <p className="profesi-text-cv1">{displayedProfesi}</p>
                  {/* Informasi tambahan */}
                  <div className="additional-info-cv1">
                    <p>
                      <span>
                        {data_diri.tempat_lahir}, {data_diri.tanggal_lahir}
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="contact-info-cv1">
              <h2>Contact</h2>
              {data_diri ? (
                <div className="social-icons-cv1">
                  <div className="icons-group-cv1">
                    {/* Two sections on top */}
                    <div className="icons-section-cv1">
                      {data_diri.link_sosmed && (
                        <>
                          <FaInstagram style={{ color: "#4A148C" }} />
                          <span>
                            <a href={data_diri.link_sosmed}>
                              {data_diri.sosial_media}
                            </a>
                          </span>
                        </>
                      )}
                    </div>
                    <div className="icons-section-cv1">
                      {data_diri.linkedin && (
                        <>
                          <FaLinkedin style={{ color: "#4A148C" }} />
                          <span>{data_diri.linkedin}</span>
                        </>
                      )}
                    </div>
                    {/* Three sections at the bottom */}
                    <div className="icons-section-cv1">
                      {data_diri.email && (
                        <>
                          <FaEnvelope style={{ color: "#4A148C" }} />
                          <span>{data_diri.email}</span>
                        </>
                      )}
                    </div>
                    <div className="icons-section-cv1">
                      {data_diri.link_twitter && (
                        <>
                          <FaTwitter style={{ color: "#4A148C" }} />
                          <span>
                            <a href={data_diri.link_twitter}>
                              {data_diri.twitter}
                            </a>
                          </span>
                        </>
                      )}
                    </div>
                    <div className="icons-section-cv1">
                      {data_diri.telp && (
                        <>
                          <FaPhone style={{ color: "#4A148C" }} />
                          <span>{data_diri.telp}</span>
                        </>
                      )}
                    </div>
                    <div className="icons-section-cv1">
                      {data_diri.alamat && (
                        <>
                          <FaMapMarkerAlt style={{ color: "#4A148C" }} />
                          <span>{data_diri.alamat}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </header>
        <div className="gradient-background-cv1"></div>
        <div className="side-panel-cv1">
          <h2 className="mt-3">About Me</h2>
          <div className="section-divider-cv1"></div>
          {data_diri ? (
            <div className="info-section">
              <p
                className="description-cv1"
                style={{ fontSize: "15px", cursor: "pointer" }}
                onClick={() => setIsDescriptionClicked(!isDescriptionClicked)}
              >
                {isDescriptionClicked || data_diri.deskripsi.length <= 150
                  ? data_diri.deskripsi
                  : `${data_diri.deskripsi.substring(0, 150)}...`}
              </p>
            </div>
          ) : (
            <p></p>
          )}
          <div className="education-section-cv1">
            <h2>Educations</h2>
            <div className="section-divider-cv1"></div>
            {pendidikan.length > 0 ? (
              <div className="education-info-cv1">
                {pendidikan.slice(0, 3).map((edu, index) => (
                  <div key={index} className="education-item-cv1">
                    <div className="education-left-cv1">
                      <p
                        className="education-degree-cv1"
                        style={{ fontSize: "20px" }}
                      >
                        {edu.jenjang}
                      </p>
                      <p
                        className="education-school-cv1"
                        style={{ fontSize: "20px", fontStyle: "normal" }}
                      >
                        {edu.nama_sekolah}
                      </p>
                      <p
                        className="education-major-cv1"
                        style={{ fontSize: "17px" }}
                      >
                        {edu.jurusan}
                      </p>
                    </div>
                    <div className="education-right-cv1">
                      <p
                        className="education-year-cv1"
                        style={{ fontSize: "15px" }}
                      >
                        {edu.tahun_masuk} - {edu.tahun_lulus}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p></p>
            )}
          </div>
          <h2>Portfolio</h2>
          <div className="section-divider-cv1"></div>
          <div className="portfolio-items-cv1">
            {portofolios.length > 0 && (
              <div className="portfolio-grid-cv1">
                {portofolios.slice(0, 2).map((portofolio) => (
                  <div className="porto-card-cv1" key={portofolio.id_porto}>
                    <div className="porto-card-inner-cv1">
                      {renderPortofolioContent(portofolio.url)}
                      <div className="deskripsi-cv1">
                        <p
                          className="portfolio-description-cv1"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            setIsDescriptionClicked(!isDescriptionClicked)
                          }
                        >
                          {isDescriptionClicked ||
                            portofolio.deskripsi.length <= 20
                            ? portofolio.deskripsi
                            : `${portofolio.deskripsi.substring(0, 20)}...`}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="side-panel-left-cv1">
          <div className="organization-info-cv1">
            <h2>Organizations</h2>
            <div className="section-divider-cv1"></div>
            {organisasi.length > 0 ? (
              <div className="organization-info-cv1">
                {organisasi.slice(0, 2).map((org, index) => (
                  <div key={index} className="organization-item-cv1">
                    <div className="organization-left-cv1">
                      <p
                        className="organization-name-cv1"
                        style={{ fontSize: "20px" }}
                      >
                        {org.nama_organisasi.toUpperCase()}
                      </p>
                      <p
                        className="organization-position-cv1"
                        style={{ fontSize: "20px" }}
                      >
                        {org.jabatan}
                      </p>
                      <p
                        className="organization-desc-cv1"
                        style={{ fontSize: "15px", cursor: "pointer" }}
                        onClick={() =>
                          setIsDescriptionClicked(!isDescriptionClicked)
                        }
                      >
                        {isDescriptionClicked ||
                          org.deskripsi_jabatan.length <= 40
                          ? org.deskripsi_jabatan
                          : `${org.deskripsi_jabatan.substring(0, 40)}...`}
                      </p>
                    </div>
                    <div className="organization-right-cv1">
                      <p
                        className="organization-year-cv1"
                        style={{ fontSize: "15px" }}
                      >
                        {org.periode_awal} - {org.periode_akhir}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p></p>
            )}
          </div>
          <div className="skill-info-cv1">
            <h2>Skills</h2>
            <div className="section-divider-cv1"></div>
            {organisasi.length > 0 ? (
              <div className="hard-skills-cv1">
                <p className="category-skill-cv1" style={{ fontSize: "20px" }}>
                  HARD SKILLS
                </p>
                {hardSkills.slice(0, 3).map((skill, index) => (
                  <div key={index} className="skill-item-cv1">
                    <p
                      className="name-skill-cv1 mb-1"
                      style={{ fontSize: "14px" }}
                    >
                      {" "}
                      {skill.nama_skill.toUpperCase()}
                    </p>
                    <div className="progress-cv1">
                      <div
                        className="progress-bar-cv1"
                        role="progressbar"
                        style={{ width: `${skill.level * 10}%` }}
                        aria-valuenow={skill.level * 10}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                      <p
                        className="skill-level"
                        style={{ fontSize: "12px", color: "#4A148C" }}
                      >
                        {skill.level * 10}%
                      </p>
                    </div>
                    <p
                      className="skill-description-cv1 mt-2"
                      style={{ fontSize: "14px", cursor: "pointer" }}
                      onClick={() =>
                        setClickedDescriptions({
                          ...clickedDescriptions,
                          [`hardSkill${index}`]:
                            !clickedDescriptions[`hardSkill${index}`],
                        })
                      }
                    >
                      {clickedDescriptions[`hardSkill${index}`] ||
                        skill.deskripsi.length <= 40
                        ? skill.deskripsi
                        : `${skill.deskripsi.substring(0, 40)}...`}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p></p>
            )}
            {organisasi.length > 0 ? (
              <div className="soft-skills-cv1">
                <p className="category-skill-cv1" style={{ fontSize: "20px" }}>
                  SOFT SKILLS
                </p>
                {softSkills.slice(0, 1).map((skill, index) => (
                  <div key={index} className="skill-item-cv1">
                    <p
                      className="name-skill-cv1 mb-1"
                      style={{ fontSize: "14px" }}
                    >
                      {skill.nama_skill.toUpperCase()}
                    </p>
                    <div className="progress-cv1">
                      <div
                        className="progress-bar-cv1"
                        role="progressbar"
                        style={{ width: `${skill.level * 10}%` }}
                        aria-valuenow={skill.level * 10}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                      <p
                        className="skill-level"
                        style={{ fontSize: "12px", color: "#4A148C" }}
                      >
                        {skill.level * 10}%
                      </p>
                    </div>
                    <p
                      className="skill-description-cv1 mt-2"
                      style={{
                        fontSize: "14px",
                        cursor: "pointer",
                        wordWrap: "break-word",
                      }}
                      onClick={() =>
                        setClickedDescriptions({
                          ...clickedDescriptions,
                          [`softSkill${index}`]:
                            !clickedDescriptions[`softSkill${index}`],
                        })
                      }
                    >
                      {clickedDescriptions[`softSkill${index}`] ||
                        skill.deskripsi.length <= 40
                        ? skill.deskripsi
                        : `${skill.deskripsi.substring(0, 40)}...`}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => window.scrollTo(0, 0)}
        className="back-button-cv1"
        style={{ marginLeft: "50px" }}
      >
        <FaArrowUp />
      </button>
      <div style={{ textAlign: "center" }}>
        <NavLink to="/My">
          <button
            className="btn btn-dark"
            id="add-button-skill"
            style={{
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: "bold",
              marginRight: "30px",
            }}
          >
            Back
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Template1;