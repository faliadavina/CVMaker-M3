import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from '../pages/Sidebar';
import Footer from "../pages/Footer";
import Hero from "../pages/Hero";
import { FaPlus } from "react-icons/fa";
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

    return (
        <body>
            <Sidebar />
            <Hero />

            <main id="main">
                <button
                    className="btn btn-dark"
                      style={{
                        marginTop: "20px",
                        borderRadius: "50px",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                      onClick={() => window.print()}
                    >
                      <FaPlus style={{ marginRight: "10px" }} /> Print CV
                </button>

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

                {/* ======= Resume Section ======= */}
                <section id="resume" class="resume">
                    <div class="container">

                        <div class="section-title">
                            <h2>Resume</h2>
                            <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                        </div>

                        <div class="row">
                            <div class="col-lg-6" data-aos="fade-up">
                                <h3 class="resume-title">Sumary</h3>
                                <div class="resume-item pb-0">
                                    <h4>Alex Smith</h4>
                                    <p><em>Innovative and deadline-driven Graphic Designer with 3+ years of experience designing and developing user-centered digital/print marketing material from initial concept to final, polished deliverable.</em></p>
                                    <ul>
                                        <li>Portland par 127,Orlando, FL</li>
                                        <li>(123) 456-7891</li>
                                        <li>alice.barkley@example.com</li>
                                    </ul>
                                </div>

                                <h3 class="resume-title">Education</h3>
                                <div class="resume-item">
                                    <h4>Master of Fine Arts &amp; Graphic Design</h4>
                                    <h5>2015 - 2016</h5>
                                    <p><em>Rochester Institute of Technology, Rochester, NY</em></p>
                                    <p>Qui deserunt veniam. Et sed aliquam labore tempore sed quisquam iusto autem sit. Ea vero voluptatum qui ut dignissimos deleniti nerada porti sand markend</p>
                                </div>
                                <div class="resume-item">
                                    <h4>Bachelor of Fine Arts &amp; Graphic Design</h4>
                                    <h5>2010 - 2014</h5>
                                    <p><em>Rochester Institute of Technology, Rochester, NY</em></p>
                                    <p>Quia nobis sequi est occaecati aut. Repudiandae et iusto quae reiciendis et quis Eius vel ratione eius unde vitae rerum voluptates asperiores voluptatem Earum molestiae consequatur neque etlon sader mart dila</p>
                                </div>
                            </div>
                            <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                                <h3 class="resume-title">Professional Experience</h3>
                                <div class="resume-item">
                                    <h4>Senior graphic design specialist</h4>
                                    <h5>2019 - Present</h5>
                                    <p><em>Experion, New York, NY </em></p>
                                    <ul>
                                        <li>Lead in the design, development, and implementation of the graphic, layout, and production communication materials</li>
                                        <li>Delegate tasks to the 7 members of the design team and provide counsel on all aspects of the project. </li>
                                        <li>Supervise the assessment of all graphic materials in order to ensure quality and accuracy of the design</li>
                                        <li>Oversee the efficient use of production project budgets ranging from $2,000 - $25,000</li>
                                    </ul>
                                </div>
                                <div class="resume-item">
                                    <h4>Graphic design specialist</h4>
                                    <h5>2017 - 2018</h5>
                                    <p><em>Stepping Stone Advertising, New York, NY</em></p>
                                    <ul>
                                        <li>Developed numerous marketing programs (logos, brochures,infographics, presentations, and advertisements).</li>
                                        <li>Managed up to 5 projects or tasks at a given time while under pressure</li>
                                        <li>Recommended and consulted with clients on the most appropriate graphic design</li>
                                        <li>Created 4+ design presentations and proposals a month for clients and account managers</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>{/* End Resume Section */}

                {/* ======= Portfolio Section ======= */}
                <section id="portfolio" class="portfolio section-bg">
                    <div class="container">

                        <div class="section-title">
                            <h2>Portfolio</h2>
                            <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                        </div>

                        <div class="row" data-aos="fade-up">
                            <div class="col-lg-12 d-flex justify-content-center">
                                <ul id="portfolio-flters">
                                    <li data-filter="*" class="filter-active">All</li>
                                    <li data-filter=".filter-app">App</li>
                                    <li data-filter=".filter-card">Card</li>
                                    <li data-filter=".filter-web">Web</li>
                                </ul>
                            </div>
                        </div>

                        <div class="row portfolio-container" data-aos="fade-up" data-aos-delay="100">

                            <div class="col-lg-4 col-md-6 portfolio-item filter-app">
                                <div class="portfolio-wrap">
                                    <img src="img/portfolio/portfolio-1.jpg" class="img-fluid" alt="" />
                                    <div class="portfolio-links">
                                        <a href="img/portfolio/portfolio-1.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox" title="App 1"><i class="bx bx-plus"></i></a>
                                        <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4 col-md-6 portfolio-item filter-web">
                                <div class="portfolio-wrap">
                                    <img src="img/portfolio/portfolio-2.jpg" class="img-fluid" alt="" />
                                    <div class="portfolio-links">
                                        <a href="img/portfolio/portfolio-2.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox" title="Web 3"><i class="bx bx-plus"></i></a>
                                        <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4 col-md-6 portfolio-item filter-app">
                                <div class="portfolio-wrap">
                                    <img src="img/portfolio/portfolio-3.jpg" class="img-fluid" alt="" />
                                    <div class="portfolio-links">
                                        <a href="img/portfolio/portfolio-3.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox" title="App 2"><i class="bx bx-plus"></i></a>
                                        <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4 col-md-6 portfolio-item filter-card">
                                <div class="portfolio-wrap">
                                    <img src="img/portfolio/portfolio-4.jpg" class="img-fluid" alt="" />
                                    <div class="portfolio-links">
                                        <a href="img/portfolio/portfolio-4.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox" title="Card 2"><i class="bx bx-plus"></i></a>
                                        <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4 col-md-6 portfolio-item filter-web">
                                <div class="portfolio-wrap">
                                    <img src="img/portfolio/portfolio-5.jpg" class="img-fluid" alt="" />
                                    <div class="portfolio-links">
                                        <a href="img/portfolio/portfolio-5.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox" title="Web 2"><i class="bx bx-plus"></i></a>
                                        <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4 col-md-6 portfolio-item filter-app">
                                <div class="portfolio-wrap">
                                    <img src="img/portfolio/portfolio-6.jpg" class="img-fluid" alt="" />
                                    <div class="portfolio-links">
                                        <a href="img/portfolio/portfolio-6.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox" title="App 3"><i class="bx bx-plus"></i></a>
                                        <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4 col-md-6 portfolio-item filter-card">
                                <div class="portfolio-wrap">
                                    <img src="img/portfolio/portfolio-7.jpg" class="img-fluid" alt="" />
                                    <div class="portfolio-links">
                                        <a href="img/portfolio/portfolio-7.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox" title="Card 1"><i class="bx bx-plus"></i></a>
                                        <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4 col-md-6 portfolio-item filter-card">
                                <div class="portfolio-wrap">
                                    <img src="img/portfolio/portfolio-8.jpg" class="img-fluid" alt="" />
                                    <div class="portfolio-links">
                                        <a href="img/portfolio/portfolio-8.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox" title="Card 3"><i class="bx bx-plus"></i></a>
                                        <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4 col-md-6 portfolio-item filter-web">
                                <div class="portfolio-wrap">
                                    <img src="img/portfolio/portfolio-9.jpg" class="img-fluid" alt="" />
                                    <div class="portfolio-links">
                                        <a href="img/portfolio/portfolio-9.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox" title="Web 3"><i class="bx bx-plus"></i></a>
                                        <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>{/* End Portfolio Section */}

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
                            {/* {errorMessage && (
                            <div className="alert alert-danger" role="alert">
                                {errorMessage}
                            </div>
                            )}

                            {successMessage && (
                            <div className="alert alert-success" role="alert">
                                {successMessage}
                            </div>
                            )} */}
                            <div className="btn-container">
                            {/* <NavLink to="/add_skill">
                                <button
                                className="btn btn-dark"
                                style={{
                                    borderRadius: "50px",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                }}
                                >
                                <FaPlus style={{ marginRight: "10px" }} /> Add Data
                                </button>
                            </NavLink> */}
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
                                    {/* <Link
                                    to={`/edit_skill`}
                                    onClick={() => handleEditClick(skill.id_skill)}
                                    className="btn btn-primary btn-sm"
                                    >
                                    Edit
                                    </Link>
                                    <button
                                    onClick={() => deleteSkill(skill.id_skill)}
                                    className="btn btn-danger btn-sm"
                                    >
                                    Delete
                                    </button> */}
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
                                    {/* <Link
                                    to={`/edit_skill`}
                                    onClick={() => handleEditClick(skill.id_skill)}
                                    className="btn btn-primary btn-sm"
                                    >
                                    Edit
                                    </Link>
                                    <button
                                    onClick={() => deleteSkill(skill.id_skill)}
                                    className="btn btn-danger btn-sm"
                                    >
                                    Delete
                                    </button> */}
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
                        {/* <NavLink to="/add_skill">
                            <button
                            className="btn btn-dark"
                            style={{
                                borderRadius: "50px",
                                fontSize: "18px",
                                fontWeight: "bold",
                            }}
                            >
                            <FaPlus style={{ marginRight: "10px" }} /> Add Data
                            </button>
                        </NavLink> */}
                        </div>
                    )}
                </section>

                {/* ======= Testimonials Section ======= */}
                <section id="testimonials" class="testimonials section-bg">
                    <div class="container">

                        <div class="section-title">
                            <h2>Testimonials</h2>
                            <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                        </div>

                        <div class="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
                            <div class="swiper-wrapper">

                                <div class="swiper-slide">
                                    <div class="testimonial-item" data-aos="fade-up">
                                        <p>
                                            <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                                            Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.
                                            <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                                        </p>
                                        <img src="img/testimonials/testimonials-1.jpg" class="testimonial-img" alt="" />
                                        <h3>Saul Goodman</h3>
                                        <h4>Ceo &amp; Founder</h4>
                                    </div>
                                </div>{/* End testimonial item */}

                                <div class="swiper-slide">
                                    <div class="testimonial-item" data-aos="fade-up" data-aos-delay="100">
                                        <p>
                                            <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                                            Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.
                                            <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                                        </p>
                                        <img src="img/testimonials/testimonials-2.jpg" class="testimonial-img" alt="" />
                                        <h3>Sara Wilsson</h3>
                                        <h4>Designer</h4>
                                    </div>
                                </div>{/* End testimonial item */}

                                <div class="swiper-slide">
                                    <div class="testimonial-item" data-aos="fade-up" data-aos-delay="200">
                                        <p>
                                            <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                                            Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.
                                            <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                                        </p>
                                        <img src="img/testimonials/testimonials-3.jpg" class="testimonial-img" alt="" />
                                        <h3>Jena Karlis</h3>
                                        <h4>Store Owner</h4>
                                    </div>
                                </div>{/* End testimonial item */}

                                <div class="swiper-slide">
                                    <div class="testimonial-item" data-aos="fade-up" data-aos-delay="300">
                                        <p>
                                            <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                                            Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.
                                            <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                                        </p>
                                        <img src="img/testimonials/testimonials-4.jpg" class="testimonial-img" alt="" />
                                        <h3>Matt Brandon</h3>
                                        <h4>Freelancer</h4>
                                    </div>
                                </div>{/* End testimonial item */}

                                <div class="swiper-slide">
                                    <div class="testimonial-item" data-aos="fade-up" data-aos-delay="400">
                                        <p>
                                            <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                                            Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.
                                            <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                                        </p>
                                        <img src="img/testimonials/testimonials-5.jpg" class="testimonial-img" alt="" />
                                        <h3>John Larson</h3>
                                        <h4>Entrepreneur</h4>
                                    </div>
                                </div>{/* End testimonial item */}

                            </div>
                            <div class="swiper-pagination"></div>
                        </div>

                    </div>
                </section>{/* End Testimonials Section */}

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