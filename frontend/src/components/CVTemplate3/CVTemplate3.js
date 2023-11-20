import React, { useEffect, useState } from 'react';
import "./cv.css"
import axios from 'axios';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  FaDownload,
  FaArrowUp,
} from "react-icons/fa";

const Template3 = () => {
  const [data_diri, setUsers] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const id_akun = user && user.user && user.user.id_akun;

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
      console.error("Error fetching data:", error);
      setUsers(null);
    }
  };

  console.log("data diri :", data_diri);

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
      const response = await axios.get(
        `http://localhost:5000/porto/${id_akun}`
      );
      setPorto(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDownloadPDF = () => {
    const printContent = document.querySelector(".page-cv-3");

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
    <div>
      <button
        className="custom-button-cv1 purple-button-cv1 mr-4 margin-around-button"
        onClick={handleDownloadPDF}
      >
        <FaDownload className="download-icon" />
        <p className="mr-1">Download CV as PDF</p>
      </button>
    <div className="page-cv-3">
      <header>
        <div className="header-container-cv-3">
        </div>
      </header>

      <div className="left-top-content-cv-3">
        {data_diri?.url && (
          <img src={data_diri.url} alt="Your Name" className="profile-img-cv-3" />
        )}
      </div>

      <div className="left-content-cv-3">
        <div className="title-2-cv-3">BIO & CONTACT</div>
        <div className="cv-content-bio-cv-3">
          {data_diri?.tempat_lahir && data_diri?.tanggal_lahir && (
            <div className="profile-cv-3">
              <i class="bi bi-cake mr-2"></i>{" "}

                {data_diri.tempat_lahir},{" "}
                {new Date(data_diri.tanggal_lahir).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}

            </div>
          )}
          {data_diri?.alamat && (
            <div className="profile-cv-3">                        
              <i class="bi bi-house-door mr-2"></i>{" "}
              <span>{data_diri.alamat}</span>
            </div>
          )}   
          {data_diri?.telp && (
            <div className="profile-cv-3">                        
              <i class="bi bi-telephone mr-2"></i>{" "}
              {data_diri.telp}
            </div>
          )}  
          {data_diri?.email && (
            <div className="profile-cv-3">                        
              <i class="bi bi-envelope mr-2"></i>{" "}
              {data_diri.email}
            </div>
          )}  
          {data_diri?.linkedin && (
            <div className="profile-cv-3">                        
              <i class="bi bi-linkedin mr-2"></i>{" "}
              {data_diri.linkedin}
            </div>
          )}  
          {data_diri?.link_sosmed && data_diri?.sosial_media && (
            <div className="profile-cv-3">                        
              <i class="bi bi-instagram mr-2"></i>{" "}
              <a href={data_diri.link_sosmed}>@{data_diri.sosial_media}</a>
            </div>
          )}  
          {data_diri?.link_twitter && data_diri?.twitter && (
            <div className="profile-cv-3">                        
              <i class="bi bi-twitter mr-2"></i>{" "}
              <a href={data_diri.link_twitter}>@{data_diri.twitter}</a>
            </div>
          )}  
        </div>  

        <div className="title-2-cv-3">EDUCATIONAL</div> 
        <div className="cv-content-edu-cv-3">

          <section id="pendidikan" class="section-edu-cv-3">
          <div class="container">
            <ul class="education-list">
              {pendidikan.map((item, index) => (
                <li key={index} class="">
                  <strong><div class="font-edu-cv-3">{item.jenjang}</div></strong>
                  <div class="font-edu-cv-3">{item.nama_sekolah}</div>
                  <div class="font-edu-cv-3">{item.jurusan}</div>
                  <div class="font-edu-cv-3">
                    {item.tahun_masuk} - {item.tahun_lulus}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          </section>

        </div>

        <div className="title-2-cv-3">PORTOFOLIOS</div> 
        <div className="cv-content-porto-cv-3">

        <section id="pendidikan" class="section-porto-cv-3">
          <div class="container">
            <ul class="education-list">
              {portofolios.map((portofolio, index) => (
                <li key={index} class="">
                  <div class="font-porto-cv-3"><i class="bi bi-file-pdf mr-2"></i>{" "}{portofolio.deskripsi}</div>
                </li>
              ))}
            </ul>
          </div>
          </section>

        </div>

      </div>

      <div className="left-bottom-content-cv-3">
      {/* {data_diri?.url && (
            <img src={data_diri.url} alt="Your Name" className="my-image-cv-3" />
          )} */}
      </div>

      <div className="right-top-content-cv-3">
        {data_diri?.nama && (
          <div className="h1-cv-3">{data_diri.nama}</div>
        )}
        {data_diri?.profesi && (
          <div className="h2-cv-3">- {data_diri.profesi} -</div>
        )}
      </div>

      <div className="right-content-cv-3">
        <div className="title-1-cv-3">PROFILE</div>
        <div className="cv-content-profile-cv-3">
          {data_diri?.deskripsi && (
            <div>{data_diri.deskripsi}</div>
          )}
        </div>

        <div className="title-1-cv-3">Organizational Experience</div>
        <div className="cv-content-experience-cv-3">
          <ul className="organisasi-list">
            {organisasi.map((item, index) => (
                <li key={index} className="">
                  <strong><div className="font-org-cv-3">{item.nama_organisasi}</div></strong>
                  <div className="font-org-cv-3">- {item.jabatan} -</div>
                  <div className="font-org-cv-3">{item.periode_awal} - {item.periode_akhir || "Sekarang"}</div>
                  <i><div className="font-org-cv-3">{item.deskripsi_jabatan}</div></i>
                </li>
            ))}
          </ul>
        </div>

        <div className="title-1-cv-3">Skills</div>
        <div className="cv-content-skill-cv-3">
          <section id="skills" className="skills section-cv-3">

            <div className="container">

              <div className="row skills-content">
                <div className="col-lg-6">
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
                          className="progress-bar progress-bar-animated mt-4"
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
                          className="progress-bar progress-bar-animated mt-4"
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
          </section>
        </div>

      </div>
      

      {/* Isi CV Anda di sini */}
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
}

export default Template3;