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

if (displayedName) {
  const nameArray = displayedName.split(' '); // Memisahkan nama menjadi array berdasarkan spasi
  displayedName = nameArray.slice(0, 2).join(' '); // Mengambil dua suku kata pertama dan menggabungkannya kembali
}

let displayedProfesi = data_diri?.profesi;
let fontSize = "16px"; // Ukuran font default

if (displayedProfesi && displayedProfesi.length > 10) {
  fontSize = "12px"; // Jika panjang string lebih dari 20 karakter, gunakan ukuran font yang lebih kecil
}


  // Pendidikan
  const [pendidikan, setPendidikan] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api-cvmaster.agilearn.id/pendidikan/akun/${id_akun}`
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
          `https://api-cvmaster.agilearn.id/organisasi/akun/${id_akun}`
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

  const handlePortoDescriptionClick = (id_porto) => {
    setClickedDescriptions({
      ...clickedDescriptions,
      [`portoDescription${id_porto}`]:
        !clickedDescriptions[`portoDescription${id_porto}`],
    });
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
        <img className="porto-cv1-img"
          src={url}
          alt="Portofolio"
          height="75"
          width="75"
          style={{ border: "3px solid #8d6ec3" }}
        />
      );
    } else if (isPDF) {
      return <FaFilePdf size={75} style={{ color: "#8d6ec3" }} />;
    } else if (isAudio) {
      return <FaFileAudio size={75} style={{ color: "#8d6ec3" }} />;
    } else if (isVideo) {
      return <FaVideo size={75} style={{ color: "#8d6ec3" }} />;
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
              Only 2 Hardskills and 1 Softskill data will be displayed, Select
              below:
            </strong>
            <br />
            <br />
            <strong style={{ color: "grey",fontSize:"16px"}}>Hard Skill</strong>
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
            <strong style={{ color: "grey",fontSize:"16px"}}>Soft Skill</strong>
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
              only 2 portfolio data will be displayed, Select  below:
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

  const handleOrgDescriptionClick = (id_org) => {
    setClickedDescriptions({
      ...clickedDescriptions,
      [`orgDescription${id_org}`]:
        !clickedDescriptions[`orgDescription${id_org}`],
    });
  };

  return (
    <div className="body-cv1">
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
                  <p className="profesi-text-cv1" style={{ fontSize: fontSize }}>{displayedProfesi}</p>
                  {/* Informasi tambahan */}
                  <div className="additional-info-cv1">
                    <p className="info-cv1">
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
              {/* <p
                className="description-cv1"
                style={{ fontSize: "15px", cursor: "pointer" }}
                // onClick={() => setIsDescriptionClicked(!isDescriptionClicked)}
              >
                {isDescriptionClicked || data_diri.deskripsi.length <= 150
                  ? data_diri.deskripsi
                  : `${data_diri.deskripsi.substring(0, 150)}...`}
              </p> */}
              <p className="description-cv1" style={{ fontSize: "15px", marginBottom:"0px" }}>
                {data_diri?.deskripsi}
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
                {/* {pendidikan.slice(0, 3).map((edu, index) => ( */}
                {pendidikan &&
                  pendidikan
                    .filter((edu) =>
                      selectedData.educational.includes(edu.id_pend)
                    )
                    .slice(0, 3)
                    .map((edu, index) => (
                      <div key={index} className="education-item-cv1">
                        <div className="education-left-cv1">
                          <p
                            className="education-degree-cv1"
                            style={{ fontSize: "17px" }}
                          >
                            {edu.jenjang}
                          </p>
                          <p
                            className="education-school-cv1"
                            style={{ fontSize: "16px", fontStyle: "normal" }}
                          >
                            {edu.nama_sekolah}
                          </p>
                          <p
                            className="education-major-cv1"
                            style={{ fontSize: "13px", marginBottom:"8px" }}
                          >
                            {edu.jurusan}
                          </p>
                        </div>
                        <div className="education-right-cv1">
                          <p
                            className="education-year-cv1"
                            style={{ fontSize: "13px" }}
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
                {/* {portofolios.slice(0, 2).map((portofolio) => ( */}
                {portofolios &&
                  portofolios
                    .filter((portofolio) =>
                      selectedData.portfolios.includes(portofolio.id_porto)
                    )
                    .slice(0, 2)
                    .map((portofolio) => (
                      <div className="porto-card-cv1" key={portofolio.id_porto}>
                 
                       
                            <p className="porto-judul-cv1"
                            style={{ fontSize: "17px", height:"55px", overflow:"hidden" }}>
                          
                            {portofolio.judul}
                           </p>
                          
                        
                        <div className="porto-card-inner-cv1">
                          {renderPortofolioContent(portofolio.url)}
                          
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
                {/* {organisasi.slice(0, 2).map((org, index) => ( */}
                {organisasi &&
                  // organisasi.slice(0, 2).map((org) => (
                  organisasi
                    .filter((org) =>
                      selectedData.organizations.includes(org.id_org)
                    )
                    .slice(0, 3)
                    .map((org, index) => (
                      <div key={index} className="organization-item-cv1">
                        <div className="organization-left-cv1">
                          <p
                            className="organization-name-cv1"
                            style={{ fontSize: "17px" }}
                          >
                            {org.nama_organisasi.toUpperCase()}
                          </p>
                          <p
                            className="organization-position-cv1"
                            style={{ fontSize: "16px" }}
                          >
                            {org.jabatan}
                          </p>

                          <p
                            className="organization-desc-cv1"
                            style={{ fontSize: "12px" }}
                          >
                            {org.deskripsi_jabatan}
                          </p>
                        </div>
                        <div className="organization-right-cv1">
                          <p
                            className="organization-year-cv1"
                            style={{ fontSize: "13px" }}
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
            {hardSkills.length > 0 ? (
              <div className="hard-skills-cv1">
                <p className="category-skill-cv1" style={{ fontSize: "17px" }}>
                  HARD SKILLS
                </p>
                {/* {hardSkills.slice(0, 3).map((skill, index) => ( */}
                {hardSkills
                  .filter((skill) =>
                    selectedData.hardSkills.includes(skill.id_skill)
                  )
                  .slice(0, 2)
                  .map((skill, index) => (
                    <div key={index} className="skill-item-cv1">
                      <p
                        className="name-skill-cv1 mb-1 mt-2"
                        style={{ fontSize: "13px" }}
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
                     
                    </div>
                  ))}
              </div>
            ) : (
              <p></p>
            )}
            {softSkills.length > 0 ? (
              <div className="soft-skills-cv1">
                <p className="category-skill-cv1" style={{ fontSize: "18px" }}>
                  SOFT SKILLS
                </p>
                {/* {softSkills.slice(0, 1).map((skill, index) => ( */}
                {/* {softSkills.slice(0, 2).map((skill) => ( */}
                {softSkills
                  .filter((skill) =>
                    selectedData.softSkills.includes(skill.id_skill)
                  )
                  .slice(0, 1)
                  .map((skill, index) => (
                    <div key={index} className="skill-item-cv1">
                      <p
                        className="name-skill-cv1 mb-1 mt-2"
                        style={{ fontSize: "13px" }}
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

export default Template1;
