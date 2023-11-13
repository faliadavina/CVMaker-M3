import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMe, LogOut, reset } from "../features/authSlice";
import Footer from "../components/Footer";

const SidebarAdmin = () => {
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
        const response = await axios.get(`http://localhost:5000/akun/${id_akun}`);
        const { username } = response.data.akunById;
        setUserData({ username });
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
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
              }
              alt=""
              className="img-fluid rounded-circle"
            />
            <h1 className="text-light m-4">
              <a href="index.html">{userData.username || ""}</a>
            </h1>
          </div>

          <nav id="navbar" className="nav-menu navbar mt-5">
            <ul>
              <li>
                <NavLink
                  to="/manage_user"
                  className={`nav-link ${
                    activeMenuItem === "Manage User" ? "scrollto active" : "scrollto"
                  }`}
                  onClick={() => handleMenuItemClick("Manage User")}
                >
                  <i className="bx bx-user"></i> <span>Manage User</span>
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
        <Footer />
      </header>
      {/* End Header */}
    </div>
  );
};

export default SidebarAdmin;
