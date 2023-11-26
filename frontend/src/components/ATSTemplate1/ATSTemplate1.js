import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { FaDownload, FaArrowUp } from "react-icons/fa";
import "./ATSTemplate1.css";

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

  const handleDownloadPDFATS = async () => {
    const printContent = document.querySelector(".page-ats-1");

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
    <div className="body-cv-ats-1">
      <button className="custom-button-cv1 purple-button-cv1 mr-4 margin-around-button" onClick={handleDownloadPDFATS}>
        <FaDownload className="download-icon" />
        <p className="mr-1">Download CV as PDF</p>
      </button>
      <div className="page-ats-1">
        <header>
          <div className="header-container">
            {/* Check if data_diri is not null before accessing its properties */}
            {data_diri ? (
              <>
                <img src={data_diri.url} alt="Your Name" className="img-cv" />
                <h1 className="text" id="title-name">
                  {data_diri.nama ? data_diri.nama : "No Data"}
                </h1>
                <p className="detail-ats-1">
                  Alamat :{" "}
                  <span className="text" id="ats-1">
                    {data_diri.alamat}
                  </span>{" "}
                  | Email: {data_diri.email} | Phone: {data_diri.telp} <br /> LinkedIn:{" "}
                  <a className="text-sosial-media" id="ats-1" href={`https://www.linkedin.com/in/${data_diri.linkedin}`}>
                    @{data_diri.linkedin}
                  </a>{" "}
                  | Instagram:{" "}
                  <a className="text-sosial-media" id="ats-1" href={`https://www.instagram.com/${data_diri.sosial_media}`}>
                    @{data_diri.sosial_media}
                  </a>{" "}
                  | Twitter:{" "}
                  <a className="text-sosial-media" id="ats-1" href={`https://www.twitter.com/${data_diri.twitter}`}>
                    @{data_diri.twitter}
                  </a>
                </p>
              </>
            ) : (
              <h3 className="text">Personal Data Has Not Been Added</h3>
            )}
          </div>
        </header>
        <br />
        <br />
        <section className="section" id="text-content">
          <h3>TENTANG SAYA</h3>
          {data_diri && data_diri.deskripsi ? data_diri.deskripsi : "Description not available."}
        </section>

        <section className="section" id="space">
          <h3>PENDIDIKAN</h3>
          {sortedPendidikan.length === 0 ? (
            <p>Pendidikan Data Has Not Been Added</p>
          ) : (
            <ul className="Pendidikan">
              {sortedPendidikan.map((pendidikan, index) => (
                <li key={index}>
                  <div className="row">
                    <div className="col-sm-9" id="text-content">
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

        <section className="section" id="space">
          <h3>PENGALAMAN ORGANISASI</h3>
          {organisasi.length === 0 ? (
            <p>Pengalaman Organisasi Has Not Been Added</p>
          ) : (
            <ul className="Organisasi">
              {organisasi.map((organisasi, index) => (
                <li key={index}>
                  <div className="row">
                    <div className="col-sm-9" id="text-content">
                      <strong>{organisasi.nama_organisasi}</strong>
                      <br />
                      {organisasi.jabatan}
                      <br />
                      {organisasi.deskripsi_jabatan}
                    </div>
                    <div className="col-sm-3">{organisasi.periode}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="section" id="space">
          <h3>SKILL</h3>
          {softSkills.length === 0 && hardSkills.length === 0 ? (
            <p>Skill Data Has Not Been Added</p>
          ) : (
            <div className="row">
              <div className="col-sm-6">
                <strong>Soft Skill</strong>
                <br />
                {softSkills.length > 0 ? (
                  <ul className="Skill">
                    {softSkills.map((softSkill, index) => (
                      <li key={index} className="skill-name" id="text-content">
                        {softSkill.nama_skill}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No Soft Skills</p>
                )}
              </div>

              <div className="col-sm-6">
                <strong>Hard Skill</strong>
                <br />
                {hardSkills.length > 0 ? (
                  <ul className="Skill">
                    {hardSkills.map((hardSkill, index) => (
                      <li key={index} className="skill-name" id="text-content">
                        {hardSkill.nama_skill}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No Hard Skills</p>
                )}
              </div>
            </div>
          )}
        </section>

        <section className="section" id="space">
          <h3>PORTOFOLIO</h3>
          {portofolios.length === 0 ? (
            <p>Portfolio Data Has Not Been Added</p>
          ) : (
            <ul className="Portofolio">
              {portofolios.map((portofolio, index) => (
                <li key={index}>
                  <div className="row">
                    <div className="col-sm-9" id="text-content">
                      {portofolio.deskripsi}
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
