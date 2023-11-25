import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import backgroundImage from "../img/bg.jpg";
import NavbarLogin from "../pages/NavbarLogin";
import {
  BsPersonFill,
  BsLockFill,
  BsEnvelopeFill,
  BsEyeFill,
  BsEyeSlashFill,
} from "react-icons/bs";

const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isUsernameValid = (username) => {
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
  return usernameRegex.test(username);
};

const isPasswordValid = (password) => {
  const passwordRegex = /^(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [touchedFields, setTouchedFields] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    username: false,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleFieldBlur = (field) => {
    setTouchedFields((prevTouchedFields) => ({
      ...prevTouchedFields,
      [field]: true,
    }));
  };

  const onChange = (e) => {
    setIsSignUpClicked(true);
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
    } else if (name === "password") {
      const passwordIsValid = isPasswordValid(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordIsValid
          ? ""
          : "Password must have at least 1 letter, 1 number, and be at least 8 characters long",
      }));
    } else if (name === "confirmPassword") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: value === values.password ? "" : "Passwords do not match",
      }));
    } else if (name === "username") {
      const usernameIsValid = isUsernameValid(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: usernameIsValid
          ? ""
          : "Username must start with a letter and only contain letters and numbers",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
        password: "",
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
    if (!values.password) {
      validationErrors.password = "Password is required";
    } else if (!isPasswordValid(values.password)) {
      validationErrors.password =
        "Password must have at least 1 letter, 1 number, and be at least 8 characters long";
    }
    if (!values.confirmPassword) {
      validationErrors.confirmPassword = "Please confirm your password";
    } else if (values.confirmPassword !== values.password) {
      validationErrors.confirmPassword = "Passwords do not match";
    }
    if (!values.username) {
      validationErrors.username = "Username is required";
    } else if (!isUsernameValid(values.username)) {
      validationErrors.username =
        "Username must start with a letter and only contain letters and numbers";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post("http://localhost:5000/akun", {
          username: values.username,
          email: values.email,
          password: values.password,
          role: "2",
        });

        console.log("Registration successful:", response.data.akun);

        setSuccessMessage("Registration successful!");

        setTimeout(() => {
          setSuccessMessage("");
          navigate("/login");
        }, 3000);
      } catch (error) {
        console.error("Registration error:", error.response.data);

        if (error.response.data.errors) {
          const serverErrors = error.response.data.errors;
          setErrors({
            email: serverErrors.email || "",
            password: serverErrors.password || "",
            confirmPassword: serverErrors.confirmPassword || "",
            username: serverErrors.username || "",
          });
        } else {
          setError(error.response.data.msg);
        }
      }
    }

    setIsLoading(false);
  };

  const shouldDisplayRequired = (field) => {
    return isSignUpClicked && touchedFields[field] && !values[field];
  };

  return (
    <>
      <section
        className="vh-100 image-container fade-in regist-container"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <NavbarLogin />
        <div className="container h-100 d-flex justify-content-center align-items-center">
          <form
            onSubmit={(e) => onSubmit(e)}
            className="card p-4"
            style={{ width: "80%", maxWidth: "500px", marginTop:"-100px" }}
          >
            <h4 className="mb-2 text-center">Sign Up</h4>
            {successMessage && (
              <div className="alert alert-success" id="success-message">
                {successMessage}
              </div>
            )}
            {error && (
              <div className="alert alert-danger" id="error-message">
                {error}
              </div>
            )}
            <div className="mb-2 register">
              <label htmlFor="username" className="form-label register-form">
                <BsPersonFill className="icon" /> Username
              </label>
              <input
                type="text"
                className={`form-control ${
                  (shouldDisplayRequired("username") || errors.username) &&
                  "is-invalid"
                }`}
                id="username"
                name="username"
                value={values.username}
                onChange={(e) => onChange(e)}
                onBlur={() => handleFieldBlur("username")}
                required
              />
              {(shouldDisplayRequired("username") || errors.username) && (
                <div className="invalid-feedback">
                  {shouldDisplayRequired("username")
                    ? "Username is required"
                    : errors.username}
                </div>
              )}
            </div>
            <div className="mb-2 register">
              <label htmlFor="email" className="form-label register-form">
                <BsEnvelopeFill className="icon" /> Email address
              </label>
              <input
                type="email"
                className={`form-control ${
                  (shouldDisplayRequired("email") || errors.email) && "is-invalid"
                }`}
                id="email"
                name="email"
                value={values.email}
                onChange={(e) => onChange(e)}
                onBlur={() => handleFieldBlur("email")}
                required
              />
              {(shouldDisplayRequired("email") || errors.email) && (
                <div className="invalid-feedback">
                  {shouldDisplayRequired("email")
                    ? "Email is required"
                    : errors.email}
                </div>
              )}
            </div>
            <div className="mb-2 register">
              <label htmlFor="password" className="form-label register-form">
                <BsLockFill className="icon" /> Password
              </label>
              <div className="input-group register">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${
                    (shouldDisplayRequired("password") || errors.password) &&
                    "is-invalid"
                  }`}
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={(e) => onChange(e)}
                  onBlur={() => handleFieldBlur("password")}
                  required
                />
                <button
                  className="btn btn-outline-secondary register-form"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                </button>
                {(shouldDisplayRequired("password") || errors.password) && (
                  <div className="invalid-feedback">
                    {shouldDisplayRequired("password")
                      ? "Password is required"
                      : errors.password}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-2 register">
              <label
                htmlFor="confirmPassword"
                className="form-label register-form"
              >
                <BsLockFill className="icon" /> Confirm Password
              </label>
              <div className="input-group register">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`form-control ${
                    (shouldDisplayRequired("confirmPassword") ||
                      errors.confirmPassword) &&
                    "is-invalid"
                  }`}
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
                {(shouldDisplayRequired("confirmPassword") ||
                  errors.confirmPassword) && (
                  <div className="invalid-feedback">
                    {shouldDisplayRequired("confirmPassword")
                      ? "Confirm Password is required"
                      : errors.confirmPassword}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-3 mt-3">
              <button
                type="submit"
                className="btn btn-dark w-100 m-0"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign Up"}
              </button>
            </div>
            <div className="register-link">
              <span style={{ marginRight: "8px" }}>Have an Account?  <>&nbsp;</>
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

export default Register;
