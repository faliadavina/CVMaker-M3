import React, { useState, useEffect } from "react";
import { NavLink} from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const MySidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const id_akun = user && user.user && user.user.id_akun;
  console.log(id_akun)
  const [skillExists, setSkillExists] = useState(false);

  useEffect(() => {
    const getSkills = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/skills/akun/${id_akun}`
        );
        // Check if the skills were found
        if (response.data && response.data.length > 0) {
          setSkillExists(true);
        } else {
          setSkillExists(false);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
        setSkillExists(false); // Assume skill not found in case of an error
      }
    };

    getSkills();
  }, [id_akun]);


  return (
    <div>
      {/* ======= Mobile nav toggle button ======= */}
      <i className="mobile-nav-toggle bi bi-list d-xl-none"></i>

      {/* ======= Header ======= */}
      <header id="header">
        <div className="d-flex flex-column">
          <div className="profile">
            <img
              src="img/profile-img.jpg"
              alt=""
              className="img-fluid rounded-circle"
            />
            <h1 className="text-light">
              <a href="index.html">Alex Smith</a>
            </h1>
            <div className="social-links mt-3 mb-4 text-center">
              <a href="/manage_user" className="twitter">
                <i className="bx bxl-twitter"></i>
              </a>
              <a href="#about" className="facebook">
                <i className="bx bxl-facebook"></i>
              </a>
              <a href="#about" className="instagram">
                <i className="bx bxl-instagram"></i>
              </a>
              <a href="#about" className="google-plus">
                <i className="bx bxl-skype"></i>
              </a>
              <a href="#about" className="linkedin">
                <i className="bx bxl-linkedin"></i>
              </a>
            </div>
          </div>

          <nav id="navbar" className="nav-menu navbar">
            <ul>
              <li>
                <a href="#hero" className="nav-link scrollto active">
                  <i className="bx bx-home"></i> <span>Edit Personal Data</span>
                </a>
              </li>
              <li>
                <a href="#about" className="nav-link scrollto">
                  <i className="bx bx-user"></i> <span>Edit Education</span>
                </a>
              </li>
              <li>
                <a href="#resume" className="nav-link scrollto">
                  <i className="bx bx-file-blank"></i>{" "}
                  <span>Edit Organization</span>
                </a>
              </li>
              <li>
                {skillExists ? (
                  <NavLink to="/empty-skill" />
                ) : (
                  <NavLink to="/skills" className="nav-link scrollto">
                    <i className="bx bx-book-content"></i> <span>Add Skill</span>
                  </NavLink>
                )}
              </li>
              <li>
                <a href="skills" className="nav-link scrollto">
                  <i className="bx bx-book-content"></i>{" "}
                  <span>Edit Portfolio</span>
                </a>
              </li>
            </ul>
          </nav>
          {/* .nav-menu */}
        </div>
      </header>
      {/* End Header */}
    </div>
  );
};

export default MySidebar;
