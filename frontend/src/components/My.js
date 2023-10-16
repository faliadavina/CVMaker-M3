import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from '../pages/Sidebar';
import Footer from "../pages/Footer";
import Hero from "../pages/Hero";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const My = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/login");
        }
    }, [isError, navigate]);


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
                const response = await axios.get(`http://localhost:5000/organisasi-by-id-akun/${id_akun}`);
                setOrganisasi(response.data);
            } catch (error) {
                console.error('Error fetching organisasi data:', error);
            }
        };

        fetchDataOrganisasi();
    }, [id_akun]);


    // Portopolio
    const [portofolio, setPortofolio] = useState([]);
    useEffect(() => {
        // Fetch data portofolio pengguna
        fetchDataPortofolio();
    }, []);

    const fetchDataPortofolio = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/portofolio-by-user/${id_akun}`);
            setPortofolio(response.data);
        } catch (error) {
            console.error('Error fetching portofolio data:', error);
        }
    };

    // Pendidikan
    const [pendidikan, setPendidikan] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/pendidikan/akun/${id_akun}`);
  
          // Pastikan respons dari API berupa array atau ubah sesuai kebutuhan
          setPendidikan(response.data.pendidikan);
          console.log('Pendidikan:', response.data.pendidikan);
        } catch (error) {
          console.error('Error fetching education data:', error);
        }
      };
      fetchData();
    }, [id_akun]);
    
    





    return (
        <body>
            <Sidebar />
            <Hero />

            <main id="main">

                {/* ======= Data Diri Section ======= */}
                <section id="about" class="about">
                    {data_diri ? (
                        <div class="container ml-3">
                            <div class="section-title d-flex justify-content-between align-items-center">
                                <h2>Get To Know Me!</h2>
                            </div>

                            <div class="section-title">
                                <p>{data_diri.deskripsi}</p>
                            </div>

                            <div class="row">
                                <div class="col-lg-4" data-aos="fade-right">
                                    <img src={data_diri.url} class="img-fluid" alt="" />
                                </div>
                                <div class="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">
                                    <h3>Personal Data</h3>
                                    <div class="row">
                                        <div class="col-lg-8">
                                            <ul>
                                                <li>
                                                    <i class="bi bi-chevron-right"></i>{" "}
                                                    <strong>Name :</strong> <span>{data_diri.nama}</span>
                                                </li>
                                                <li>
                                                    <i class="bi bi-chevron-right"></i>{" "}
                                                    <strong>Place and Date of Birth :</strong>{" "}
                                                    <span>
                                                        {data_diri.tempat_lahir}, {data_diri.tanggal_lahir}
                                                    </span>
                                                </li>
                                                <li>
                                                    <i class="bi bi-chevron-right"></i>{" "}
                                                    <strong>Address :</strong>{" "}
                                                    <span>{data_diri.alamat}</span>
                                                </li>
                                                <li>
                                                    <i class="bi bi-chevron-right"></i>{" "}
                                                    <strong>Marriage Status :</strong>{" "}
                                                    <span>{data_diri.status}</span>
                                                </li>
                                                <li>
                                                    <i class="bi bi-chevron-right"></i>{" "}
                                                    <strong>Phone Number :</strong>{" "}
                                                    <span>{data_diri.telp}</span>
                                                </li>
                                                <li>
                                                    <i class="bi bi-chevron-right"></i>{" "}
                                                    <strong>Email :</strong>{" "}
                                                    <span>{data_diri.email}</span>
                                                </li>
                                                <li>
                                                    <i class="bi bi-chevron-right"></i>{" "}
                                                    <strong>Social Media :</strong>{" "}
                                                    <span>{data_diri.sosial_media}</span>
                                                </li>
                                                <li>
                                                    <i class="bi bi-chevron-right"></i>{" "}
                                                    <strong>LinkedIn :</strong>{" "}
                                                    <span>{data_diri.linkedin}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div class="container">
                            <div class="title d-flex justify-content-center align-items-center text-center mt-5">
                                <h3>Personal Data Has Not Been Added</h3>
                            </div>
                        </div>
                    )}
                </section>
                <section id="pendidikan" className="pendidikan">
          <div className="container">
            <div className="section-title">
              <h2>Pendidikan</h2>
            </div>

            {pendidikan.map((item, index) => (
              <div key={index} className="card">
                <h3>{item.jenjang}</h3>
                <p>{item.nama_sekolah}</p>
                <p>{item.jurusan}</p>
                <p>{item.tahun_masuk} - {item.tahun_lulus}</p>
              </div>
            ))}
          </div>
        </section>


                {/* Organisasi Section */}
                <section id="resume" className="resume">
                    <div className="container">
                        {organisasi.length > 0 ? (
                            <>
                                <div className="section-title">
                                    <h2>Organisasi</h2>
                                </div>
                                <div className="card-content">
                                    <div className="content">
                                        <div>
                                            <ol>
                                                {organisasi.map((org) => (
                                                    <li key={org.id_org}>
                                                        <h4 style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <b style={{ textAlign: 'left' }}>{org.nama_organisasi}</b>
                                                            <b style={{ textAlign: 'right', marginRight: '10px' }}>{org.periode}</b>
                                                        </h4>
                                                        <p>{org.jabatan}</p>
                                                        <p>{org.deskripsi_jabatan}</p>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div>
                                <h3>Organization data has not been found</h3>
                            </div>
                        )}
                    </div>
                </section>
                {/* End Organisasi Section */}


                {/* ======= Portfolio Section ======= */}
                <section id="portofolio" className="portfolio section-bg">
                <div className="container">
                    <div className="section-title">
                        <h2>Portofolio</h2>
                    </div>
                    <div className="row">
                        {portofolio.map((item) => (
                            <div className="col-lg-4" key={item.id_porto}>
                                {/* Menampilkan portofolio pengguna */}
                                <div className="card add porto">
                                    { /* Tampilkan deskripsi atau data portofolio yang sesuai */ }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
                <section id="skills" className="skills">
                    {data_skill ? (
                        <div className="container">
                            <div
                                className="section-title"
                                style={{ display: "flex", justifyContent: "space-between" }}
                            >
                                <div className="title-container">
                                    <h2>Skills</h2>
                                </div>
                                {

                                }
                                <div className="btn-container">
                                    {

                                    }
                                </div>
                            </div>

                            <div className="row skills-content">
                                <div className="col-lg-6">
                                    <div className="section-subtitle">
                                        <h5>Soft Skills</h5>
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
                                            <div className="progress-buttons">
                                                {

                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="col-lg-6">
                                    <div className="section-subtitle">
                                        <h5>Hard Skills</h5>
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
                                            <div className="progress-buttons">
                                                {
                                                }
                                            </div>
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
                            {
                            }
                        </div>
                    )}
                </section>

                {/* ======= Contact Section ======= */}
                <section id="contact" class="contact">
                    <div class="container">

                        <div class="section-title">
                            <h2>Contact</h2>
                            <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                        </div>

                        <div class="row" data-aos="fade-in">

                            <div class="col-lg-5 d-flex align-items-stretch">
                                <div class="info">
                                    <div class="address">
                                        <i class="bi bi-geo-alt"></i>
                                        <h4>Location:</h4>
                                        <p>A108 Adam Street, New York, NY 535022</p>
                                    </div>

                                    <div class="email">
                                        <i class="bi bi-envelope"></i>
                                        <h4>Email:</h4>
                                        <p>info@example.com</p>
                                    </div>

                                    <div class="phone">
                                        <i class="bi bi-phone"></i>
                                        <h4>Call:</h4>
                                        <p>+1 5589 55488 55s</p>
                                    </div>

                                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621" frameborder="0" style="border:0; width: 100%; height: 290px;" allowfullscreen></iframe> */}
                                </div>

                            </div>

                            <div class="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
                                <form action="forms/contact.php" method="post" class="php-email-form">
                                    <div class="row">
                                        <div class="form-group col-md-6">
                                            <label for="name">Your Name</label>
                                            <input type="text" name="name" class="form-control" id="name" required />
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="name">Your Email</label>
                                            <input type="email" class="form-control" name="email" id="email" required />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="name">Subject</label>
                                        <input type="text" class="form-control" name="subject" id="subject" required />
                                    </div>
                                    <div class="form-group">
                                        <label for="name">Message</label>
                                        <textarea class="form-control" name="message" rows="10" required></textarea>
                                    </div>
                                    <div class="my-3">
                                        <div class="loading">Loading</div>
                                        <div class="error-message"></div>
                                        <div class="sent-message">Your message has been sent. Thank you!</div>
                                    </div>
                                    <div class="text-center"><button type="submit">Send Message</button></div>
                                </form>
                            </div>

                        </div>

                    </div>
                </section>{/* End Contact Section */}

            </main>{/* End #main */}

            <Footer />

            <a href="#about" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

        </body>
    )
}


export default My;