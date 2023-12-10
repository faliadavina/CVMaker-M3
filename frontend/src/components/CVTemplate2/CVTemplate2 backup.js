import React, { useEffect, useState } from 'react';
import "./cv2.css"
import axios from 'axios';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPhone, faLocationDot, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, NavLink } from 'react-router-dom';
import {
    FaDownload,
    FaArrowUp,
} from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";


const CVTemplate2 = () => {
    const [data_diri, setUsers] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { user } = useSelector((state) => state.auth);
    const id_akun = user && user.user && user.user.id_akun;
    const handleClose = () => setShow(false);
    const [show, setShow] = useState(true);
    const handleShow = () => setShow(true);

    const handleReopenModal = () => {
        setShow(true);
    };

    // ========================== Button Print ==========================
    const handleDownloadPDF = () => {
        const printContent = document.querySelector(".page-cv2");

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


    // ========================== Button Back ==========================
    const navigate = useNavigate();
    const handleBackButtonClick = () => {
        // Mengarahkan pengguna ke halaman sebelumnya
        navigate(-1);
    };

    useEffect(() => {
        getUsers();
    }, [id_akun]);

    const getUsers = async () => {
        try {
            const response = await axios.get(
                `https://localhost:5000/users/${id_akun}`
            );
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            setUsers(null);
        }
    };

    // ========================== Data Pendidikan ==========================
    const [pendidikan, setPendidikan] = useState(null);
    const id = user && user.user && user.user.id_akun;
    console.log("id:", id);

    useEffect(() => {
        getPendidikan();
    }, [id]);

    const getPendidikan = async () => {
        try {
            const response = await axios.get(
                `https://localhost:5000/pendidikan/akun/${id}`
            );
            setPendidikan(response.data.pendidikan);
            console.log("pendidikan:", response.data.pendidikan);
            setErrorMessage(""); // Reset error message on successful fetch
        } catch (error) {
            setPendidikan(null);
            console.error("Error fetching :", error);
            setPendidikan(null);
        }
    };

    // ========================== Data Skill ==========================
    const [hardSkills, setHardSkills] = useState([]);
    const [softSkills, setSoftSkills] = useState([]);
    const [data_skill, setSkill] = useState(null);

    //   const id = user && user.user && user.user.id_akun;

    useEffect(() => {
        getSkills();
    }, [id]);

    const getSkills = async () => {
        try {
            const response = await axios.get(
                `https://localhost:5000/skills/akun/${id_akun}`
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

    // ========================== Data Organisasi ==========================
    const [organisasi, setOrganisasi] = useState([]);

    useEffect(() => {
        const fetchOrganisasi = async () => {
            try {
                const response = await axios.get(`https://localhost:5000/organisasi/akun/${id_akun}`);

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

    // ========================== Data Portofolio ==========================
    const [portofolios, setPorto] = useState([]);
    useEffect(() => {
        getPorto();
    }, [id]);

    const getPorto = async () => {
        try {
            const response = await axios.get(`https://localhost:5000/porto/${id}`);
            setPorto(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // ========================== Select Data on Modal ==========================
    const [selectedEducation, setSelectedEducation] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedOrganizations, setSelectedOrganizations] = useState([]);
    const [selectedPortfolios, setSelectedPortfolios] = useState([]);
    const [selectedHardSkills, setSelectedHardSkills] = useState([]);
    const [selectedSoftSkills, setSelectedSoftSkills] = useState([]);

    const toggleSelection = (pendID) => {
        if (selectedEducation.includes(pendID)) {
            setSelectedEducation(selectedEducation.filter((id) => id !== pendID));
        } else {
            setSelectedEducation([...selectedEducation, pendID]);
        }
    };

    const toggleSelectionSkills = (skillID, isHardSkill) => {
        if (isHardSkill) {
            if (selectedHardSkills.includes(skillID)) {
                setSelectedHardSkills(selectedHardSkills.filter((id) => id !== skillID));
            } else {
                if (selectedHardSkills.length < 3) {
                    setSelectedHardSkills([...selectedHardSkills, skillID]);
                }
            }
        } else {
            if (selectedSoftSkills.includes(skillID)) {
                setSelectedSoftSkills(selectedSoftSkills.filter((id) => id !== skillID));
            } else {
                if (selectedSoftSkills.length < 2) {
                    setSelectedSoftSkills([...selectedSoftSkills, skillID]);
                }
            }
        }
    };

    const toggleSelectionOrganization = (orgID) => {
        if (selectedOrganizations.includes(orgID)) {
            setSelectedOrganizations(selectedOrganizations.filter((id) => id !== orgID));
        } else {
            setSelectedOrganizations([...selectedOrganizations, orgID]);
        }
    };

    const toggleSelectionPorto = (portoID) => {
        if (selectedPortfolios.includes(portoID)) {
            setSelectedPortfolios(selectedPortfolios.filter((id) => id !== portoID));
        } else {
            setSelectedPortfolios([...selectedPortfolios, portoID]);
        }
    };




    return (
        <div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <strong>only 2 educational data will be displayed, select 2 below:</strong>
                    <ul style={{ listStyle: 'none', lineHeight: '0px', marginTop: '10px' }}>
                        {pendidikan &&
                            pendidikan.map((pendidikanItem) => (
                                <li key={pendidikanItem.id_pend}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox-input-cv2"
                                            checked={selectedEducation.includes(pendidikanItem.id_pend)}
                                            onChange={() => toggleSelection(pendidikanItem.id_pend)}
                                            disabled={selectedEducation.length >= 2 && !selectedEducation.includes(pendidikanItem.id_pend)}
                                        />
                                        {pendidikanItem.nama_sekolah}
                                    </label>
                                </li>
                            ))}
                    </ul>
                    <strong>only 3 hardskills and 2 softskill data will be displayed, select below:</strong><br />
                    <strong style={{ color: 'black' }}>Hard Skill</strong>
                    <ul style={{ listStyle: 'none', lineHeight: '0px', marginTop: '10px' }}>
                        {hardSkills &&
                            hardSkills.map((skill) => (
                                <li key={skill.id_skill}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox-input-cv2"
                                            checked={selectedHardSkills.includes(skill.id_skill)}
                                            onChange={() => toggleSelectionSkills(skill.id_skill, true)}
                                            disabled={selectedHardSkills.length >= 3 && !selectedHardSkills.includes(skill.id_skill)}
                                        />
                                        {skill.nama_skill}
                                    </label>
                                </li>
                            ))}
                    </ul>
                    <strong style={{ color: 'black' }}>Soft Skill</strong>
                    <ul style={{ listStyle: 'none', lineHeight: '0px', marginTop: '10px' }}>
                        {softSkills &&
                            softSkills.map((skill) => (
                                <li key={skill.id_skill}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox-input-cv2"
                                            checked={selectedSoftSkills.includes(skill.id_skill)}
                                            onChange={() => toggleSelectionSkills(skill.id_skill, false)}
                                            disabled={selectedSoftSkills.length >= 2 && !selectedSoftSkills.includes(skill.id_skill)}
                                        />
                                        {skill.nama_skill}
                                    </label>
                                </li>
                            ))}
                    </ul>
                    <strong>only 2 organizational data will be displayed, select 2 below:</strong>
                    <ul style={{ listStyle: 'none', lineHeight: '0px', marginTop: '10px' }}>
                        {organisasi &&
                            organisasi.map((org) => (
                                <li key={org.id_org}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox-input-cv2"
                                            checked={selectedOrganizations.includes(org.id_org)}
                                            onChange={() => toggleSelectionOrganization(org.id_org)}
                                            disabled={selectedOrganizations.length >= 2 && !selectedOrganizations.includes(org.id_org)}
                                        />
                                        {org.nama_organisasi}
                                    </label>
                                </li>
                            ))}
                    </ul>
                    <strong>only 2 portfolio data will be displayed, select 2 below:</strong>
                    <ul style={{ listStyle: 'none', lineHeight: '0px', marginTop: '10px' }}>
                        {portofolios &&
                            portofolios.map((portfolio) => (
                                <li key={portfolio.id_porto}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox-input-cv2"
                                            checked={selectedPortfolios.includes(portfolio.id_porto)}
                                            onChange={() => toggleSelectionPorto(portfolio.id_porto)}
                                            disabled={selectedPortfolios.length >= 2 && !selectedPortfolios.includes(portfolio.id_porto)}
                                        />
                                        {portfolio.judul}
                                    </label>
                                </li>
                            ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="d-flex align-items-center">
                <button
                    className="custom-button-cv1 purple-button-cv1 mr-4 margin-around-button"
                    onClick={handleDownloadPDF}
                >
                    <FaDownload className="download-icon" />
                    <p className="mr-1">Download CV as PDF</p>
                </button>

                <Button variant="primary" onClick={handleShow}>
                    Select Data For CV
                </Button>
            </div>
            <div className="page-cv2">
                <header>
                    <div className="header-container-cv2">
                        <div className='side-container-cv2'>
                            {data_diri?.url && (
                                <img src={data_diri.url} alt="Your Name" className="profile_img-cv2" />
                            )}
                            {data_diri?.nama && (
                                <h3 style={{ fontFamily: 'Poppins', color: 'white' }}><strong>{data_diri.nama}</strong></h3>
                            )}
                            <div className='container-deskripsi-cv2'>
                                {data_diri?.deskripsi && (
                                    <p style={{ fontFamily: 'Poppins', color: 'white', fontSize: '14px', fontWeight: 'lighter' }}>
                                        {data_diri.deskripsi}
                                    </p>
                                )}

                            </div>
                            <div className='skill-container-cv2'>
                                <h3 style={{ fontFamily: 'Poppins', color: 'white', marginTop: '40px' }}><strong>S K I L L</strong></h3>
                                <hr style={{ borderTop: '3px solid #FFFFFF', margin: '5px 0', opacity: 1.0 }} />
                                <strong style={{ color: 'white' }}>Hard Skill</strong>
                                {hardSkills && (
                                    <table>
                                        <tbody>
                                            {hardSkills.filter((skill) => selectedHardSkills.includes(skill.id_skill)).slice(0, 3).map((skill) => (
                                                // {hardSkills.slice(0, 3).map((skill) => (
                                                <tr key={skill.id_skill} style={{ height: '30px', color: 'white', fontWeight: '500', fontSize: '14px' }}>
                                                    <td>{skill.nama_skill}</td>
                                                    <td>
                                                        {Array.from({ length: skill.level }, (_, index) => (
                                                            <FontAwesomeIcon key={index} icon={faStar} style={{ color: 'gold' }} />
                                                        ))}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                                {softSkills && (
                                    <table style={{ marginTop: '10px' }}>
                                        <thead>
                                            <strong style={{ color: 'white' }}>Soft Skill</strong>
                                            <tbody>
                                                {/* {softSkills.slice(0, 2).map((skill) => ( */}
                                                {softSkills.filter((skill) => selectedSoftSkills.includes(skill.id_skill)).slice(0, 2).map((skill) => (

                                                    <tr key={skill.id_skill} style={{ height: '35px', color: 'white', fontWeight: '500', fontSize: '14px' }}>
                                                        <td>{skill.nama_skill}</td>
                                                        <td>
                                                            {Array.from({ length: skill.level }, (_, index) => (
                                                                <FontAwesomeIcon key={index} icon={faStar} style={{ color: 'gold' }} />
                                                            ))}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </thead>
                                    </table>
                                )}

                            </div>
                            <div className='contact-container-cv2'>
                                <h3 style={{ fontFamily: 'Poppins', color: 'white', marginTop: '40px' }}><strong>C O N T A C T</strong></h3>
                                <hr style={{ borderTop: '3px solid #FFFFFF', margin: '5px 0', opacity: 1.0 }} />
                                <table>
                                    <tbody>
                                        {data_diri?.telp && (
                                            <tr style={{ height: '28px', color: 'white', fontWeight: '600', fontSize: '14px' }}>
                                                <td style={{ paddingRight: '5px' }}>
                                                    <FontAwesomeIcon icon={faPhone} style={{ color: 'white' }} />
                                                </td>
                                                <td>{data_diri.telp}</td>
                                            </tr>
                                        )}
                                        {data_diri?.alamat && (
                                            <tr style={{ height: '28px', color: 'white', fontWeight: '600', fontSize: '14px' }}>
                                                <td style={{ paddingRight: '5px' }}>
                                                    <FontAwesomeIcon icon={faLocationDot} style={{ color: 'white' }} />
                                                </td>
                                                <td>{data_diri.alamat}</td>
                                            </tr>
                                        )}
                                        {data_diri?.linkedin && (
                                            <tr style={{ height: '28px', color: 'white', fontSize: '15px' }}>
                                                <td style={{ paddingRight: '5px' }}>
                                                    <FontAwesomeIcon icon={faGlobe} style={{ color: 'white' }} />
                                                </td>
                                                <td>
                                                    <strong style={{ fontWeight: '500' }}>linkedin.com/in/{data_diri.linkedin}</strong>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='side-container-cv2-2'>
                            <div className='personal-data-container-cv2' style={{ fontFamily: 'Poppins', fontSize: '14px', color: 'white', textAlign: 'left', lineHeight: '10px' }}>
                                <h3 style={{ marginTop: '5px', color: 'white' }}><strong>PERSONAL DATA</strong></h3>
                                <hr style={{ borderTop: '3px solid #FF7F09', margin: '5px 0', opacity: 1.0 }} />
                                <ul style={{ marginTop: '10px' }}>
                                    {data_diri?.tempat_lahir && data_diri?.tanggal_lahir && (
                                        <li>
                                            <strong>Place and Date of Birth :</strong>{" "}
                                            <span>
                                                {data_diri.tempat_lahir}, {data_diri.tanggal_lahir}
                                            </span>
                                        </li>
                                    )}
                                    {data_diri?.alamat && (
                                        <li>
                                            <strong>Address :</strong>{" "}
                                            <span>{data_diri.alamat}</span>
                                        </li>
                                    )}
                                    {data_diri?.telp && (
                                        <li>
                                            <strong>Phone Number :</strong>{" "}
                                            <span>{data_diri.telp}</span>
                                        </li>
                                    )}
                                    {data_diri?.email && (
                                        <li>
                                            <strong>Email :</strong>{" "}
                                            <span>{data_diri.email}</span>
                                        </li>
                                    )}
                                    {data_diri?.linkedin && (
                                        <li>
                                            <strong>LinkedIn :</strong>{" "}
                                            <span>{data_diri.linkedin}</span>
                                        </li>
                                    )}
                                    {data_diri?.sosial_media && (
                                        <li>
                                            <strong>Instagram</strong>{" "}
                                            <span>{data_diri.sosial_media}</span>
                                        </li>
                                    )}
                                    {data_diri?.twitter && (
                                        <li>
                                            <strong>Twitter :</strong>{" "}
                                            <span>{data_diri.twitter}</span>
                                        </li>
                                    )}
                                    {data_diri?.status && (
                                        <li>
                                            <strong>Mariage Status :</strong>{" "}
                                            <span>{data_diri.status}</span>
                                        </li>
                                    )}
                                </ul>
                                <h3 style={{ marginTop: '30px', color: 'white' }}><strong>EDUCATION</strong></h3>
                                <hr style={{ borderTop: '3px solid #FF7F09', margin: '5px 0', opacity: 1.0 }} />
                                <ul style={{ lineHeight: '20px' }}>
                                    {pendidikan &&
                                        pendidikan.filter((pendidikanItem) => selectedEducation.includes(pendidikanItem.id_pend)).slice(0, 2).map((pendidikanItem) => (
                                            <li key={pendidikanItem.id_pend}>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <b style={{ textAlign: "left", marginBottom: '1px' }}>
                                                        {pendidikanItem.nama_sekolah}
                                                    </b>
                                                    <b style={{ textAlign: "right", marginRight: "10px" }}>
                                                        {pendidikanItem.tahun_masuk} - {pendidikanItem.tahun_lulus}
                                                    </b>
                                                </div>
                                                <p style={{ marginBottom: '1px' }}>{pendidikanItem.jurusan}</p>
                                            </li>
                                        ))}
                                </ul>
                                <div className='org-container-cv2'>
                                    <h3 style={{ marginTop: '30px', color: 'white' }}><strong>ORGANIZATION</strong></h3>
                                    <hr style={{ borderTop: '3px solid #FF7F09', margin: '5px 0', opacity: 1.0 }} />
                                    <ul style={{ marginTop: '10px', marginBottom: '20px', lineHeight: '20px' }}>
                                        {organisasi &&
                                            // organisasi.slice(0, 2).map((org) => (
                                            organisasi.filter((org) => selectedOrganizations.includes(org.id_org)).slice(0, 2).map((org) => (
                                                <li key={org.id_org} style={{ marginBottom: '15px' }}>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <b style={{ textAlign: "left" }}>
                                                            {org.nama_organisasi}
                                                        </b>
                                                        <b style={{ textAlign: "right", marginRight: "10px" }}>
                                                            {org.periode_awal} - {org.periode_akhir}
                                                        </b>
                                                    </div>
                                                    <p>{org.jabatan}</p>
                                                    <p style={{ marginTop: '-7px' }}>{org.deskripsi_jabatan}</p>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                                <div className='porto-container-cv2'>
                                    <h3 style={{ marginTop: '30px', color: 'white' }}><strong>PORTOFOLIO</strong></h3>
                                    <hr style={{ borderTop: '3px solid #FF7F09', margin: '5px 0', opacity: 1.0 }} />
                                    <ul>
                                        {portofolios &&
                                            portofolios.filter((portfolio) => selectedPortfolios.includes(portfolio.id_porto)).slice(0, 2).map((portfolio) => (
                                                <li key={portfolio.id_porto}>
                                                    <strong><p style={{ marginBottom: '5px', marginTop: '10px' }}>{portfolio.judul}</p></strong>
                                                    <p style={{ marginBottom: '2px' }}>{portfolio.deskripsi}</p>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
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
}

export default CVTemplate2;