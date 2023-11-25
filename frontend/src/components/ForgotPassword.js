import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BsEnvelopeFill, BsLockFill, BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import backgroundImage from "../img/bg.jpg";
import NavbarLogin from "../pages/NavbarLogin";

const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isPasswordValid = (password) => {
  const passwordRegex = /^(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleFieldBlur = (field) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: values[field] ? "" : `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
    }));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    if (name === "email") {
      const emailIsValid = isEmailValid(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: emailIsValid ? "" : "Invalid email format",
      }));
    } else if (name === "newPassword") {
      const passwordIsValid = isPasswordValid(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        newPassword: passwordIsValid ? "" : "Password must have at least 1 letter, 1 number, and be at least 8 characters long",
      }));
    } else if (name === "confirmPassword") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: value === values.newPassword ? "" : "Passwords do not match",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
        newPassword: "",
        confirmPassword: "",
      }));
    }

    setError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const validationErrors = {};
    if (!values.email) {
      validationErrors.email = "Email is required";
    } else if (!isEmailValid(values.email)) {
      validationErrors.email = "Invalid email format";
    }
    if (!values.newPassword) {
      validationErrors.newPassword = "Password is required";
    } else if (!isPasswordValid(values.newPassword)) {
      validationErrors.newPassword = "Password must have at least 1 letter, 1 number, and be at least 8 characters long";
    }
    if (!values.confirmPassword) {
      validationErrors.confirmPassword = "Please confirm your password";
    } else if (values.confirmPassword !== values.newPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
        try {
            const response = await axios.post("http://localhost:5000/forgot-password", {
              email: values.email,
              newPassword: values.newPassword,
            });
          
            setSuccessMessage(response.data.msg);
          
            setTimeout(() => {
              setSuccessMessage("");
              navigate("/login");
            }, 3000);
          } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
              setError(error.response.data.msg);
              setErrors({}); // Clear any previous errors
              setIsLoading(false);
            } else {
              setError("An error occurred");
              setErrors({}); // Clear any previous errors
              setIsLoading(false);
            }
          }
      }

    setIsLoading(false);
  };

  const shouldDisplayRequired = (field) => {
    return !values[field] && errors[field];
  };

  return (
    <>
      <section className="vh-100 image-container fade-in" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <NavbarLogin />
        <div className="container h-100 d-flex justify-content-center align-items-center">
          <form onSubmit={(e) => onSubmit(e)} className="card p-4" style={{ width: "80%", maxWidth: "500px", marginTop: "-100px" }}>
            <h4 className="mb-2 text-center">Forgot Password</h4>
            {successMessage && <div className="alert alert-success" id="success-message">{successMessage}</div>}
            {error && <div className="alert alert-danger" id="error-message">{error}</div>}
            
            <div className="mb-2 register">
              <label htmlFor="email" className="form-label register-form">
                <BsEnvelopeFill className="icon" /> Email address
              </label>
              <input
                type="email"
                className={`form-control ${(shouldDisplayRequired("email") || errors.email) && "is-invalid"}`}
                id="email"
                name="email"
                value={values.email}
                onChange={(e) => onChange(e)}
                onBlur={() => handleFieldBlur("email")}
                required
              />
              {(shouldDisplayRequired("email") || errors.email) && (
                <div className="invalid-feedback">
                  {shouldDisplayRequired("email") ? "Email is required" : errors.email}
                </div>
              )}
            </div>
            <div className="mb-2 register">
              <label htmlFor="newPassword" className="form-label register-form">
                <BsLockFill className="icon" /> New Password
              </label>
              <div className="input-group register">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${(shouldDisplayRequired("newPassword") || errors.newPassword) && "is-invalid"}`}
                  id="newPassword"
                  name="newPassword"
                  value={values.newPassword}
                  onChange={(e) => onChange(e)}
                  onBlur={() => handleFieldBlur("newPassword")}
                  required
                />
                <button
                  className="btn btn-outline-secondary register-form"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                </button>
                {(shouldDisplayRequired("newPassword") || errors.newPassword) && (
                  <div className="invalid-feedback">
                    {shouldDisplayRequired("newPassword") ? "New Password is required" : errors.newPassword}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-2 register">
              <label htmlFor="confirmPassword" className="form-label register-form">
                <BsLockFill className="icon" /> Confirm Password
              </label>
              <div className="input-group register">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`form-control ${(shouldDisplayRequired("confirmPassword") || errors.confirmPassword) && "is-invalid"}`}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={(e) => onChange(e)}
                  onBlur={() => handleFieldBlur("confirmPassword")}
                  required
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                </button>
                {(shouldDisplayRequired("confirmPassword") || errors.confirmPassword) && (
                  <div className="invalid-feedback">
                    {shouldDisplayRequired("confirmPassword") ? "Confirm Password is required" : errors.confirmPassword}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-3 mt-3">
              <button type="submit" className="btn btn-dark w-100 m-0" disabled={isLoading}>
                {isLoading ? "Loading..." : "Reset Password"}
              </button>
            </div>
            <div className="register-link">
              <span style={{ marginRight: "8px" }}>Remembered your password?&nbsp;
                <Link to="/login" className="sign-up">
                  Sign In Here
                </Link>
              </span>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
