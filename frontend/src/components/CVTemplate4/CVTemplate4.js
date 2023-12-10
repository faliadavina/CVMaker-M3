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
import { Modal, Button } from "react-bootstrap";

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
            `https://api-cvmaster.agilearn.id/users/${id_akun}`
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
          `https://api-cvmaster.agilearn.id/pendidikan/akun/${id_akun}`
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
          `https://api-cvmaster.agilearn.id/organisasi/akun/${id_akun}`
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
        `https://api-cvmaster.agilearn.id/skills/akun/${id_akun}`
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
        `https://api-cvmaster.agilearn.id/porto/${id_akun}`
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

  // ========================== Select Data on Modal ==========================
  const [currentModal, setCurrentModal] = useState(1);
  const [selectedData, setSelectedData] = useState({
    educational: [],
    hardSkills: [],
    softSkills: [],
    organizations: [],
    portfolios: [],
  });

  const handleShow = (modalNumber) => {
    setCurrentModal(modalNumber);
  };

  const handleNext = () => {
    // Handle logic for moving to the next modal
    // You can add data processing logic here if needed
    setCurrentModal(currentModal + 1);
  };

  const handleBack = () => {
    // Handle logic for going back to the previous modal
    setCurrentModal(currentModal - 1);
  };

  const handleFinish = () => {
    // Handle logic for finishing the modal sequence
    console.log("Selected Data:", selectedData);
    // Hide the modal without resetting state
    setCurrentModal(null);
  };

  const toggleSelection = (id, category) => {
    const newData = { ...selectedData };
    newData[category] = newData[category].includes(id)
      ? newData[category].filter((selectedId) => selectedId !== id)
      : [...newData[category], id];

    setSelectedData(newData);
  };

  const renderModalContent = () => {
    switch (currentModal) {
      case 1:
        return (
          <div>
            {/* Modal Content for Step 1 */}
            <strong>
              Only 3 educational data will be displayed, Select below:
            </strong>
            <ul
              style={{
                listStyle: "none",
                lineHeight: "0px",
                marginTop: "10px",
              }}
            >
              {pendidikan &&
                pendidikan.map((pendidikanItem) => (
                  <li key={pendidikanItem.id_pend}>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox-input-cv2 mr-2"
                        checked={selectedData.educational.includes(
                          pendidikanItem.id_pend
                        )}
                        onChange={() =>
                          toggleSelection(pendidikanItem.id_pend, "educational")
                        }
                        disabled={
                          selectedData.educational.length >= 3 &&
                          !selectedData.educational.includes(
                            pendidikanItem.id_pend
                          )
                        }
                      />
                      {pendidikanItem.nama_sekolah}
                    </label>
                  </li>
                ))}
            </ul>
          </div>
        );
      case 2:
        return (
          <div>
            {/* Modal Content for Step 2 */}
            <strong>
              Only 3 Hardskills and 3 Softskill data will be displayed, Select
              below:
            </strong>
            <br />
            <br />
            <strong style={{ color: "grey", fontSize: "16px" }}>
              Hard Skill
            </strong>
            <ul
              style={{
                listStyle: "none",
                lineHeight: "0px",
                marginTop: "10px",
              }}
            >
              {hardSkills &&
                hardSkills.map((skill) => (
                  <li key={skill.id_skill}>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox-input-cv2 mr-2"
                        checked={selectedData.hardSkills.includes(
                          skill.id_skill
                        )}
                        onChange={() =>
                          toggleSelection(skill.id_skill, "hardSkills")
                        }
                        disabled={
                          selectedData.hardSkills.length >= 2 &&
                          !selectedData.hardSkills.includes(skill.id_skill)
                        }
                      />
                      {skill.nama_skill}
                    </label>
                  </li>
                ))}
            </ul>
            <strong style={{ color: "grey", fontSize: "16px" }}>
              Soft Skill
            </strong>
            <ul
              style={{
                listStyle: "none",
                lineHeight: "0px",
                marginTop: "10px",
              }}
            >
              {softSkills &&
                softSkills.map((skill) => (
                  <li key={skill.id_skill}>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox-input-cv2 mr-2"
                        checked={selectedData.softSkills.includes(
                          skill.id_skill
                        )}
                        onChange={() =>
                          toggleSelection(skill.id_skill, "softSkills")
                        }
                        disabled={
                          selectedData.softSkills.length >= 1 &&
                          !selectedData.softSkills.includes(skill.id_skill)
                        }
                      />
                      {skill.nama_skill}
                    </label>
                  </li>
                ))}
            </ul>
          </div>
        );

      case 3:
        return (
          <div>
            {/* Modal Content for Step 3 */}
            <strong>
              only 3 organizational data will be displayed, Select below:
            </strong>
            <ul
              style={{
                listStyle: "none",
                lineHeight: "0px",
                marginTop: "10px",
              }}
            >
              {organisasi &&
                organisasi.map((org) => (
                  <li key={org.id_org}>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox-input-cv2 mr-2"
                        checked={selectedData.organizations.includes(
                          org.id_org
                        )}
                        onChange={() =>
                          toggleSelection(org.id_org, "organizations")
                        }
                        disabled={
                          selectedData.organizations.length >= 3 &&
                          !selectedData.organizations.includes(org.id_org)
                        }
                        // disabled={selectedData.softSkills.length >= 2 && !selectedData.softSkills.includes(skill.id_skill)}
                      />
                      {org.nama_organisasi}
                    </label>
                  </li>
                ))}
            </ul>
          </div>
        );

      case 4:
        return (
          <div>
            {/* Modal Content for Step 4 */}
            <strong>
              only 2 portfolio data will be displayed, Select below:
            </strong>
            <ul
              style={{
                listStyle: "none",
                lineHeight: "0px",
                marginTop: "10px",
              }}
            >
              {portofolios &&
                portofolios.map((portfolio) => (
                  <li key={portfolio.id_porto}>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox-input-cv2 mr-2"
                        checked={selectedData.portfolios.includes(
                          portfolio.id_porto
                        )}
                        onChange={() =>
                          toggleSelection(portfolio.id_porto, "portfolios")
                        }
                        disabled={
                          selectedData.portfolios.length >= 2 &&
                          !selectedData.portfolios.includes(portfolio.id_porto)
                        }
                      />
                      {portfolio.judul}
                    </label>
                  </li>
                ))}
            </ul>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="body">
      <Modal
        show={currentModal !== null}
        onHide={() => setCurrentModal(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderModalContent()}</Modal.Body>
        <Modal.Footer>
          {currentModal !== 1 && (
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
          )}
          {currentModal < 4 && (
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          )}
          {currentModal === 4 && (
            <Button variant="success" onClick={handleFinish}>
              Finish
            </Button>
          )}
        </Modal.Footer>
      </Modal>
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
                <img src={data_diri.url} alt="Photo" className="photo" />
                <p className="name">
                  {data_diri.nama &&
                    data_diri.nama
                      .toLowerCase()
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                </p>
                {pendidikan && pendidikan.length > 0 && (
                  <>
                    <p className="intro">
                      {pendidikan[pendidikan.length - 1].jurusan}
                    </p>

                    <p className="intro2">
                      {pendidikan[pendidikan.length - 1].nama_sekolah}
                    </p>
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
                  style={{
                    fontSize: "15px",
                    minWidth: "200px",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsDescriptionClicked(!isDescriptionClicked)}
                >
                  {isDescriptionClicked ||
                  !data_diri?.deskripsi ||
                  data_diri.deskripsi.length <= 150
                    ? data_diri?.deskripsi || "No description available"
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
                        <a href={data_diri.link_sosmed}>
                          {data_diri.sosial_media}
                        </a>
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
                {pendidikan &&
                  pendidikan
                    .filter((edu) =>
                      selectedData.educational.includes(edu.id_pend)
                    )
                    .slice(0, 3)
                    .map((edu, index) => (
                      <div key={index} className="educationItem">
                        <div className="dataNama">
                          <p className="instansi" style={{ fontSize: "18px" }}>
                            {edu.jenjang} {edu.jurusan}
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
                {organisasi &&
                  // organisasi.slice(0, 2).map((org) => (
                  organisasi
                    .filter((org) =>
                      selectedData.organizations.includes(org.id_org)
                    )
                    .slice(0, 3)
                    .map((org, index) => (
                      <div key={index} className="organizationItem">
                        <div className="dataNama">
                          <p className="instansi" style={{ fontSize: "18px" }}>
                            {org.nama_organisasi.toUpperCase()}
                          </p>
                          <p className="detail" style={{ fontSize: "18px" }}>
                            {org.jabatan}
                          </p>
                        </div>
                        <div className="periode">
                          <p style={{ fontSize: "15px" }}>
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
            {hardSkills.length > 0 ? (
              <div className="isi">
                <p className="skillCategory" style={{ fontSize: "18px" }}>
                  HARD SKILLS
                </p>
                {/* {hardSkills.slice(0, 3).map((skill, index) => ( */}
                {hardSkills
                  .filter((skill) =>
                    selectedData.hardSkills.includes(skill.id_skill)
                  )
                  .slice(0, 3)
                  .map((skill, index) => (
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
            {softSkills.length > 0 ? (
              <div className="sSkill">
                <p className="skillCategory" style={{ fontSize: "18px" }}>
                  SOFT SKILLS
                </p>
                {softSkills
                  .filter((skill) =>
                    selectedData.softSkills.includes(skill.id_skill)
                  )
                  .slice(0, 3)
                  .map((skill, index) => (
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
                  {portofolios &&
                    portofolios
                      .filter((portofolio) =>
                        selectedData.portfolios.includes(portofolio.id_porto)
                      )
                      .slice(0, 2)
                      .map((portofolio) => (
                        <div
                          className="portfolioCard"
                          key={portofolio.id_porto}
                        >
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

export default Template4;
