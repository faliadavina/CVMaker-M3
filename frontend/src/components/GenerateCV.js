import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const GenerateCV= () => {
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
      {/* ======= Data Diri Section ======= */}
      <section id="about" class="about" style={{marginTop : "-100px"}}>
        {data_diri ? (
          <div class="container">
            <div class="d-flex justify-content-center align-items-center text-center mt-5">
              <h2 className="display-5">{data_diri.nama}</h2>
            </div>
            <div class="row d-flex justify-content-center align-items-center text-center">
                <p>{data_diri.email} | {data_diri.telp} | {data_diri.alamat}</p>
            </div>
            <div class="row">
                <p>{data_diri.deskripsi}</p>
            </div>
          </div>
        ) : (
          <div class="container">
            <div class="title d-flex justify-content-center align-items-center text-center mt-5">
              <h4>Personal Data Has Not Been Added</h4>
            </div>
          </div>
        )}
      </section>
      <section id="" class="pendidikan" style={{marginTop: "-100px"}}>
        <div class="container">
          <div class="">
            <b style={{fontSize : "25px"}}>Riwayat Pendidikan</b>
          </div>
          <ul class="" style={{borderTop: "2px solid #ccc" }}>
            {pendidikan.map((item, index) => (
              <li key={index} class=""
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
              >
                <p class="jenjang" style={{ textAlign: "left", fontSize : "20px"}}>
                  {item.jenjang} {item.jurusan}, {item.nama_sekolah}</p>
                <p
                  style={{
                    textAlign: "right",
                    marginRight: "10px",
                    fontSize : "20px"
                  }}
                >
                  {item.tahun_masuk} - {item.tahun_lulus}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Organisasi Section */}
      <section id="resume" className="resume" style={{marginTop : "-100px"}}>
        <div className="container">
          {organisasi.length > 0 ? (
            <>
              <div className="">
                <b style={{fontSize : "25px"}}>Organisasi</b>
              </div>
              <ul style={{borderTop: "2px solid #ccc" }}>
              {organisasi.map((org) => (
                  <li key={org.id_org}>
                  <h4
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p style={{ textAlign: "left" }}>
                      {org.jabatan}, {org.nama_organisasi}
                    </p>
                    <p
                      style={{
                        textAlign: "right",
                        marginRight: "10px",
                      }}
                    >
                      {org.periode}
                    </p>
                  </h4>
                  <p>{org.deskripsi_jabatan}</p>
                </li>
              ))}
              </ul>
            </>
          ) : (
            <div>
              <h4>Organization data has not been found</h4>
            </div>
          )}
        </div>
      </section>
      {/* End Organisasi Section */}

     
      <section id="skills" className="skills" style={{marginTop : "-100px"}}>
        {data_skill ? (
          <div className="container">
            <div
              className=""
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="title-container">
                <b style={{fontSize : "25px"}}>Skill</b>
              </div>
              {}
              <div className="btn-container">{}</div>
            </div>

            <div className="row skills-content" style={{borderTop: "2px solid #ccc" }}>
              <div className="col-lg-6">
                <div className="section-subtitle">
                  <h4>Soft Skills</h4>
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
                  <h4>Hard Skills</h4>
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
      <a
        href="#about"
        class="back-to-top d-flex align-items-center justify-content-center"
      >
        <i class="bi bi-arrow-up-short"></i>
      </a>
    </body>
  );
};

export default GenerateCV;