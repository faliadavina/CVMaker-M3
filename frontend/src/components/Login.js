import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  BsPersonFill,
  BsLockFill,
  BsEyeFill,
  BsEyeSlashFill,
} from "react-icons/bs"; // Import the eye icons

import { LoginUser, reset } from "../features/authSlice";
import backgroundImage from "../img/bg.jpg";
import NavbarLogin from "../pages/NavbarLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user || isSuccess) {
      if (user && user.user && user.user.role === 1) {
        navigate("/manage_user");
      } else {
        navigate("/My");
      }
    } else {
      dispatch(reset());
    }
  }, [user, isSuccess, dispatch, navigate]);

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    setUsernameError(null);
    if (!user || !isSuccess) {
      dispatch(reset());
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(null);
    if (!user || !isSuccess) {
      dispatch(reset());
    }
  };

  const Auth = (e) => {
    e.preventDefault();
    setUsernameError(username ? null : "Username is required");
    setPasswordError(password ? null : "Password is required");
    console.log(usernameError);
    if (username && password) {
      if (usernameError || passwordError) {
        setUsername("");
        setPassword("");
        setUsernameError(null); // Menghapus pesan kesalahan jika field sudah diisi
        setPasswordError(null); // Menghapus pesan kesalahan jika field sudah diisi
      }
      dispatch(LoginUser({ username, password }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <section
        className="vh-100 image-container fade-in"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <NavbarLogin />
        <div className="container h-100 d-flex justify-content-center align-items-center">
        <form onSubmit={Auth} className="card p-4" style={{ width: "80%", maxWidth: "400px", marginTop:"-100px" }}>
            <h3 className="mb-4 text-center">Sign In</h3>
            {isError && message && <p className="error-message">{message}</p>}
            <div className="mb-3">
              <div className="input-container">
                <BsPersonFill
                  className={`username-icon ${usernameError ? "error" : ""}`}
                />
                <input
                  type="text"
                  className={`form-control ${
                    usernameError ? "is-invalid" : ""
                  }`}
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Username"
                  style={{ backgroundColor: "#f5f5f5" }}
                />
                {usernameError && (
                  <div className="invalid-feedback">{usernameError}</div>
                )}
              </div>
            </div>
            <div className="mb-3">
              <div className="input-container">
                <BsLockFill
                  className={`password-icon ${passwordError ? "error" : ""}`}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${
                    passwordError ? "is-invalid" : ""
                  }`}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  style={{ backgroundColor: "#f0f0f0" }}
                />
                <div
                  className={`password-toggle ${passwordError ? "error" : ""}`}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                </div>
                {passwordError && (
                  <div className="invalid-feedback">{passwordError}</div>
                )}
              </div>
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="btn btn-dark w-100 m-0"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>
            <div className="register-link">
              <span style={{ marginRight: "8px" }}>
                Don't Have an Account Yet?   <>&nbsp;</>
                <Link to="/register" className="sign-up">
                   Sign Up Here
                </Link>
              </span>
            </div>
            <div className="forgot-password">
              <Link to ="/forgot-password" className="forgot-pw"><span>Forgot Password?</span></Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
