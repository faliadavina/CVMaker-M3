import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import { getMe } from "../features/authSlice";
// import Footer from "./Footer";

const Sidebar = () => {
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

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/login");
  };

  const [activeMenuItem, setActiveMenuItem] = useState("My CV");
  const [userData, setUserData] = useState({
    username: "",
    profileImage: "",
  });

  const { user } = useSelector((state) => state.auth);
  const id_akun = user && user.user && user.user.id_akun;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id_akun}`);
        console.log(response.data);
        const username = response.data.nama;
        const profileImage = response.data.url;
        console.log(username, profileImage);
        setUserData({ username, profileImage });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id_akun]);

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  const mobileNavToggleHandler = () => {
    document.body.classList.toggle("mobile-nav-active");
    document.getElementById("navbar").classList.toggle("active");
  };

  return (
    <div>
      {/* Mobile nav toggle button */}
      <i
        className="bi bi-list mobile-nav-toggle d-xl-none"
        onClick={mobileNavToggleHandler} // Handle klik pada ikon hamburger
      ></i>

      {/* ======= Header ======= */}
      <header id="header">
        <div className="d-flex flex-column">
          <div className="profile">
            <img src={userData.profileImage || "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"} alt="" />
            <h1 className="text-light m-6 mb-4">
              <a href="index.html">{userData.username || ""}</a>
            </h1>
          </div>

          <nav id="navbar" className="nav-menu navbar" style={{ marginTop: "30px" }}>
            <ul>
              <li>
                <NavLink to="/My" className={`nav-link ${activeMenuItem === "My CV" ? "scrollto" : "scrollto"}`} onClick={() => handleMenuItemClick("My CV")}>
                  <i className="bx bx-home"></i> <span>My CV</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/data_diri" className={`nav-link ${activeMenuItem === "Edit Personal Data" ? "scrollto active" : "scrollto"}`} onClick={() => handleMenuItemClick("Edit Personal Data")}>
                  <i className="bx bx-user"></i> <span>Personal Data</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/pendidikan" className={`nav-link ${activeMenuItem === "Edit Educational Data" ? "scrollto active" : "scrollto"}`} onClick={() => handleMenuItemClick("Edit Educational")}>
                  <i className="bx bx-server"></i> <span>Educational Data</span>
                </NavLink>
              </li>
              <li>
                <a href="/organisasi" className={`nav-link ${activeMenuItem === "Edit Organizational Experience" ? "scrollto active" : "scrollto"}`} onClick={() => handleMenuItemClick("Edit Organizational Experience")}>
                  <i className="bx bx-book-content"></i> <span>Organizational Experience</span>
                </a>
              </li>
              <li>
                <NavLink to="/skills" className={`nav-link ${activeMenuItem === "Edit Skills" ? "scrollto active" : "scrollto"}`} onClick={() => handleMenuItemClick("Edit Skills")}>
                  <i className="bx bx-server"></i> <span>Skills</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/portofolio" className={`nav-link ${activeMenuItem === "Edit Portfolio" ? "scrollto active" : "scrollto"}`} onClick={() => handleMenuItemClick("Edit Portfolio")}>
                  <i className="bx bx-envelope"></i> <span>Portfolio</span>
                </NavLink>
              </li>

              <li>
                <a href="/login" className="nav-link scrollto" onClick={logout}>
                  <i className="bx bx-log-in"></i> <span>Logout</span>
                </a>
              </li>
            </ul>
          </nav>
          {/* .nav-menu */}
        </div>
        {/* <Footer /> */}
      </header>
      {/* End Header */}
    </div>
  );
};

export default Sidebar;
