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
                `http://localhost:5000/users/${id_akun}`
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
                `http://localhost:5000/pendidikan/akun/${id}`
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

    // ========================== Data Organisasi ==========================
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

    // ========================== Data Portofolio ==========================
    const [portofolios, setPorto] = useState([]);
    useEffect(() => {
        getPorto();
    }, [id]);

    const getPorto = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/porto/${id}`);
            setPorto(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>
                            only the first 2 educational data will be displayed
                        </li>
                        <li>
                            only the first organization data will be displayed
                        </li>
                        <li>
                            only the first 3 hardskill data will be displayed
                        </li>
                        <li>
                            only the first 2 softskill data will be displayed
                        </li>
                        <li>
                            only the first 2 portofolio data will be displayed
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
                            <div className='container-deskripsi'>
                                {data_diri?.deskripsi && (
                                    <p style={{ fontFamily: 'Poppins', color: 'white', fontSize: '14.5px', fontWeight: 'lighter' }}>
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
                                            {hardSkills.slice(0, 3).map((skill) => (
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
                                                {softSkills.slice(0, 2).map((skill) => (
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
                                <h3 style={{ fontFamily: 'Poppins', color: 'white', marginTop: '60px' }}><strong>C O N T A C T</strong></h3>
                                <hr style={{ borderTop: '3px solid #FFFFFF', margin: '5px 0', opacity: 1.0 }} />
                                <table>
                                    <tbody>
                                        {data_diri?.telp && (
                                            <tr style={{ height: '40px', color: 'white', fontWeight: '600', fontSize: '14px' }}>
                                                <td style={{ paddingRight: '5px' }}>
                                                    <FontAwesomeIcon icon={faPhone} style={{ color: 'white' }} />
                                                </td>
                                                <td>{data_diri.telp}</td>
                                            </tr>
                                        )}
                                        {data_diri?.alamat && (
                                            <tr style={{ height: '40px', color: 'white', fontWeight: '600', fontSize: '14px' }}>
                                                <td style={{ paddingRight: '5px' }}>
                                                    <FontAwesomeIcon icon={faLocationDot} style={{ color: 'white' }} />
                                                </td>
                                                <td>{data_diri.alamat}</td>
                                            </tr>
                                        )}
                                        {data_diri?.linkedin && (
                                            <tr style={{ height: '40px', color: 'white', fontSize: '15px' }}>
                                                <td style={{ paddingRight: '5px' }}>
                                                    <FontAwesomeIcon icon={faGlobe} style={{ color: 'white' }} />
                                                </td>
                                                <td>
                                                    <strong>linkedin.com/in/{data_diri.linkedin}</strong>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='side-container-cv2-2'>
                            <div className='personal-data-container-cv2' style={{ fontFamily: 'Poppins', fontSize: '14px', color: 'white', textAlign: 'left', lineHeight: '10px' }}>
                                <h3 style={{ marginTop: '20px', color: 'white' }}><strong>PERSONAL DATA</strong></h3>
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
                                        pendidikan.slice(0, 2).map((pendidikanItem) => (
                                            <li key={pendidikanItem.id_pend}>
                                                {/* <strong>{pendidikanItem.jenjang}</strong> */}
                                                <strong><p style={{ marginBottom: '1px' }}>{pendidikanItem.nama_sekolah}</p></strong>
                                                <p style={{ marginBottom: '1px' }}>{pendidikanItem.jurusan}</p>
                                                <p>{pendidikanItem.tahun_masuk} - {pendidikanItem.tahun_lulus}</p>
                                            </li>
                                        ))}
                                </ul>
                                <div className='org-container-cv2'>
                                    <h3 style={{ marginTop: '30px', color: 'white' }}><strong>ORGANIZATION</strong></h3>
                                    <hr style={{ borderTop: '3px solid #FF7F09', margin: '5px 0', opacity: 1.0 }} />
                                    <ul style={{ marginTop: '10px', marginBottom: '20px', lineHeight: '20px' }}>
                                        {organisasi &&
                                            organisasi.slice(0, 1).map((org) => (
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
                                                    <p>{org.deskripsi_jabatan}</p>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                                <div className='porto-container-cv2'>
                                    <h3 style={{ marginTop: '30px', color: 'white' }}><strong>PORTOFOLIO</strong></h3>
                                    <hr style={{ borderTop: '3px solid #FF7F09', margin: '5px 0', opacity: 1.0 }} />
                                    <ul>
                                        {portofolios &&
                                            portofolios.slice(0, 2).map((portfolio) => (
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