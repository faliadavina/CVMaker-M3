import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { FaDownload, FaArrowUp } from "react-icons/fa";
import "./ATSTemplate2.css";

const GenerateCV = () => {
  const { templateId } = useParams();
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
      const response = await axios.get(`http://194.233.93.124:8000/users/${id_akun}`);
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
      const response = await axios.get(`http://194.233.93.124:8000/skills/akun/${id_akun}`);
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
        const response = await axios.get(`http://194.233.93.124:8000/organisasi/akun/${id_akun}`);

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
      const response = await axios.get(`http://194.233.93.124:8000/porto/${id_akun}`);
      setPorto(response.data);
      console.log("Portfolios:", response.data); // Tambahkan ini untuk memeriksa nilai portofolios
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
        const response = await axios.get(`http://194.233.93.124:8000/pendidikan/akun/${id_akun}`);

        // Pastikan respons dari API berupa array atau ubah sesuai kebutuhan
        setPendidikan(response.data.pendidikan);
        console.log("Pendidikan:", response.data.pendidikan);
      } catch (error) {
        console.error("Error fetching education data:", error);
      }
    };
    fetchData();
  }, [id_akun]);

  const handleDownloadPDF = () => {
    const printContent = document.querySelector(".page-ats-2");

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

  const sortedPendidikan = pendidikan.sort((a, b) => {
    const jenjangOrder = {
      SD: 0,
      SMP: 1,
      SMA: 2,
      SMK: 2,
      D3: 3,
      S1: 3,
      D4: 3,
      S2: 4,
    };

    return jenjangOrder[a.jenjang] - jenjangOrder[b.jenjang];
  });

  return (
    <div className="body-cv-ats-2">
      <button className="custom-button-cv1 purple-button-cv1 mr-4 margin-around-button" onClick={handleDownloadPDF}>
        <FaDownload className="download-icon" />
        <p className="mr-1">Download CV as PDF</p>
      </button>
      <div className="page-ats-2">
        {data_diri ? (
          <>
            <h1 className="name" id="name-ats-2">
              {data_diri && data_diri.nama ? data_diri.nama : "No Data"}
            </h1>
            <p className="detail">
              <span className="text">{data_diri.alamat ? data_diri.alamat : "No Data"}</span> | {data_diri.email} | {data_diri.telp} <br />
              <a className="text-sosial-media" href={`https://www.linkedin.com/in/${data_diri.linkedin}`}>
                LinkedIn: {data_diri.linkedin} |
              </a>{" "}
              <a className="text-sosial-media" href={`https://www.instagram.com/in/${data_diri.sosial_media}`}>
                Instagram: {data_diri.sosial_media}
              </a>{" "}
              <a className="text-sosial-media" id="ats-1" href={`https://www.twitter.com/${data_diri.twitter}`}>
                | Twitter:@{data_diri.twitter}
              </a>
            </p>
          </>
        ) : (
          <h3 className="text">Personal Data Has Not Been Added</h3>
        )}
        <br />
        <br />
        <section className="section">{data_diri && data_diri.deskripsi ? data_diri.deskripsi : "Description not available."}</section>

        <section className="section">
          <strong className="title">SKILLS</strong>
          {softSkills.length === 0 && hardSkills.length === 0 ? (
            <p>Skills Data Has Not Been Added</p>
          ) : (
            <div className="row">
              <div className="col-sm-6">
                <ul className="Skill">
                  {softSkills.length > 0 &&
                    softSkills.map((softSkill, index) => (
                      <li key={index} className="skill-name">
                        {softSkill.nama_skill}
                      </li>
                    ))}
                  {hardSkills.length > 0 &&
                    hardSkills.map((hardSkill, index) => (
                      <li key={index} className="skill-name">
                        {hardSkill.nama_skill}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
        </section>

        <section className="section">
          <strong className="title">PORTOFOLIO</strong>
          {portofolios.length === 0 ? (
            <p>Portofolio Has Not Been Added</p>
          ) : (
            <ul className="Portofolio">
              {portofolios.map((portofolio, index) => (
                <li key={index}>
                  <div className="row">
                    <div className="col-sm-9">{portofolio.deskripsi}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="section">
          <strong className="title">PENGALAMAN ORGANISASI</strong>
          {organisasi.length === 0 ? (
            <p>Pengalaman Organisasi Has Not Been Added</p>
          ) : (
            <ul className="Organisasi">
              {organisasi.map((organisasi, index) => (
                <li key={index}>
                  <div className="row">
                    <div className="col-sm-10">
                      <strong>
                        {organisasi.nama_organisasi} | {organisasi.jabatan}
                      </strong>
                      <br />
                      {organisasi.deskripsi_jabatan}
                    </div>
                    <div className="col-sm-2">{organisasi.periode}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="section">
          <strong className="title">PENDIDIKAN</strong>
          {sortedPendidikan.length === 0 ? (
            <p>Pendidikan Has Not Been Added</p>
          ) : (
            <ul className="Pendidikan">
              {sortedPendidikan.map((pendidikan, index) => (
                <li key={index}>
                  <div className="row">
                    <div className="col-sm-9">
                      <strong>{pendidikan.nama_sekolah}</strong>
                      <br />
                      {pendidikan.jenjang === "SMA" || pendidikan.jenjang === "SMK" ? (
                        <>JURUSAN {pendidikan.jurusan}</>
                      ) : pendidikan.jenjang === "D3" || pendidikan.jenjang === "S1" || pendidikan.jenjang === "D4" || pendidikan.jenjang === "S2" ? (
                        <>
                          {pendidikan.jenjang} - {pendidikan.jurusan}
                        </>
                      ) : null}
                    </div>
                    <div className="col-sm-3">
                      {pendidikan.tahun_masuk} - {pendidikan.tahun_lulus}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      <button onClick={() => window.scrollTo(0, 0)} className="back-button-cv1" style={{ marginLeft: "50px" }}>
        <FaArrowUp />
      </button>
      <div style={{ textAlign: "center" }}>
        <NavLink to="/menu_cv">
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

export default GenerateCV;
