import React, { useEffect, useState } from "react";
import "./cv4.css";
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

import { FaFilePdf, FaFileAudio, FaVideo } from "react-icons/fa";

const Template4 = () => {
  const [data_diri, setUsers] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const id_akun = user?.user?.id_akun;
  const [isDescriptionClicked, setIsDescriptionClicked] = useState(false);
  const [clickedDescriptions, setClickedDescriptions] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id_akun) {
          const response = await axios.get(
            `http://localhost:5000/users/${id_akun}`
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
          `http://localhost:5000/pendidikan/akun/${id_akun}`
        );

        // Ensure API response is an array or adjust as needed
        setPendidikan(response.data.pendidikan || []); // Null check added
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
          `http://localhost:5000/organisasi/akun/${id_akun}`
        );

        console.log("Raw response:", response);

        if (response.status === 404) {
          console.error("Endpoint not found:", response);
        } else {
          setOrganisasi(response.data.organisasi || []); // Null check added
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
      return (
        <img
          src={url}
          alt="Portofolio"
          height="150"
          width="150"
          style={{ border: "3px solid brown" }}
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
    const printContent = document.querySelector(".latar");

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
    <div className="body">
      <button
        className="customButton mr-4 margin-around-button"
        onClick={handleDownloadPDF}
      >
        <FaDownload className="download-icon" />
        <p className="mr-1">Download CV as PDF</p>
      </button>
      <div className="latar">

        <div className="batas">
          
        <div className="aside">
          {data_diri && data_diri.url && (
            <>
              <img
                src={data_diri.url}
                alt="Photo"
                className="photo"
              />
              <p className="name">{data_diri.nama && data_diri.nama.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}</p>
              {pendidikan && pendidikan.length > 0 && (
                <>
                  <p className="intro">{pendidikan[pendidikan.length - 1].jurusan}</p>
                
                  <p className="intro2">{pendidikan[pendidikan.length - 1].nama_sekolah}</p>
                </>
              )}

            </>

          )}
</div>
        <div className="konten">
          <h2 className="mt-3">Profile</h2>
          {data_diri ? (
            <div className="info-section">
              <p
                className="description"
                style={{ fontSize: "15px", minWidth: "200px", cursor: "pointer" }}
                onClick={() => setIsDescriptionClicked(!isDescriptionClicked)}
              >
                {isDescriptionClicked || !data_diri?.deskripsi || data_diri.deskripsi.length <= 150
                  ? (data_diri?.deskripsi) || "No description available"
                  : `${data_diri.deskripsi.substring(0, 500)}`}
              </p>


            </div>
          ) : (
            <p></p>
          )}

          <h2 className="mt-3">Kontak</h2>
          {data_diri ? (

            <div className="medsos">
              <div className="icons-section">
                {data_diri.telp && (
                  <>
                    <FaPhone style={{ color: "#604D42" }} />
                    <span>{data_diri.telp}</span>
                  </>
                )}
              </div>
              <div className="icons-section">
                {data_diri.email && (
                  <>
                    <FaEnvelope style={{ color: "#604D42" }} />
                    <span>{data_diri.email}</span>
                  </>
                )}
              </div>
              <div className="icons-section">
                {data_diri.linkedin && (
                  <>
                    <FaLinkedin style={{ color: "#604D42" }} />
                    <span>{data_diri.linkedin}</span>
                  </>
                )}
              </div>
              <div className="icons-section">
                {data_diri.link_sosmed && (
                  <>
                    <FaInstagram style={{ color: "#604D42" }} />
                    <span>
                      <a href={data_diri.link_sosmed}>{data_diri.sosial_media}</a>
                    </span>
                  </>
                )}
              </div>


              <div className="icons-section">
                {data_diri.link_twitter && (
                  <>
                    <FaTwitter style={{ color: "#604D42" }} />
                    <span>
                      <a href={data_diri.link_twitter}>{data_diri.twitter}</a>
                    </span>
                  </>
                )}
              </div>

              <div className="icons-section">
                {data_diri.alamat && (
                  <>
                    <FaMapMarkerAlt style={{ color: "#604D42" }} />
                    <span>{data_diri.alamat}</span>
                  </>
                )}
              </div>
            </div>
          ) : (
            <p></p>
          )}
        </div>
        </div>
        <div className="sidePanel">
          <div className="data">
            <h2>Educations</h2>
            {pendidikan && pendidikan.length > 0 ? (
              <div className="education-isi">
                {pendidikan.slice(0, 3).map((edu, index) => (
                  <div key={index} className="educationItem">
                    <div className="dataNama">
                      <p
                        className="instansi"
                        style={{ fontSize: "18px" }}
                      >
                        {edu.jenjang}   {edu.jurusan}
                      </p>
                      <p
                        className="detail"
                        style={{ fontSize: "18px", fontStyle: "normal" }}
                      >
                        {edu.nama_sekolah}
                      </p>
                    </div>
                    <div className="periode">
                      <p style={{ fontSize: "15px" }}>
                        {edu.tahun_masuk} - {edu.tahun_lulus}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No education data available</p>
            )}
          </div>

          <div className="data">
            <h2>Organizations</h2>
            {organisasi.length > 0 ? (
              <div className="isi">
                {organisasi.slice(0, 3).map((org, index) => (
                  <div key={index} className="organizationItem">
                    <div className="dataNama">
                      <p
                        className="instansi"
                        style={{ fontSize: "18px" }}
                      >
                        {org.nama_organisasi.toUpperCase()}
                      </p>
                      <p
                        className="detail"
                        style={{ fontSize: "18px" }}
                      >
                        {org.jabatan}
                      </p>

                    </div>
                    <div className="periode">
                      <p
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
          <div className="data">
            <h2>Skills</h2>
            {organisasi.length > 0 ? (
              <div className="isi">
                <p className="skillCategory" style={{ fontSize: "18px" }}>
                  HARD SKILLS
                </p>
                {hardSkills.slice(0, 3).map((skill, index) => (
                  <div key={index}>
                    <p
                      className="mb-1 skillList"
                      style={{ fontSize: "14px" }}
                    >
                      {" "}
                      {skill.nama_skill.toUpperCase()}
                    </p>


                  </div>
                ))}
              </div>
            ) : (
              <p></p>
            )}
            {organisasi.length > 0 ? (
              <div className="sSkill">
                <p className="skillCategory" style={{ fontSize: "18px" }}>
                  SOFT SKILLS
                </p>
                {softSkills.slice(0, 3).map((skill, index) => (
                  <div key={index}>
                    <p
                      className="mb-1 skillList"
                      style={{ fontSize: "14px" }}
                    >
                      {skill.nama_skill.toUpperCase()}
                    </p>

                  </div>
                ))}
              </div>
            ) : (
              <p></p>
            )}
          </div>
          <div className="data">
            <h2>Portfolio</h2>
            <div className="portfolio-isi">
              {portofolios.length > 0 && (
                <div className="portfolioDetail">
                  {portofolios.slice(0, 2).map((portofolio) => (
                    <div className="portfolioCard" key={portofolio.id_porto}>

                      {renderPortofolioContent(portofolio.url)}

                      <p
                        className="portfolioName"
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
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => window.scrollTo(0, 0)}
        className="backButton"
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


export default Template4;
