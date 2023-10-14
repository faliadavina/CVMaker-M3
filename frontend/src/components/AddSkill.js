import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../pages/Sidebar";
import Footer from "../pages/Footer";

const AddSkill = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [categoryFilled, setCategoryFilled] = useState(false);
  const [nameFilled, setNameFilled] = useState(false);
  const [levelFilled, setLevelFilled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const clearErrorMessage = () => {
    setMsg("");
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setCategoryFilled(!!value);
    clearErrorMessage();
  };

  const handleNameChange = (value) => {
    setName(value);
    setNameFilled(!!value);
    clearErrorMessage();
  };

  const handleLevelChange = (value) => {
    setLevel(value);
    setLevelFilled(!!value);
    clearErrorMessage();
  };

  const { user } = useSelector((state) => state.auth);
  const id = user && user.user && user.user.id_akun;

  const saveSkill = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Reset error message
    setMsg("");

    // Check if the name is filled and meets the validation criteria
    if (name.length > 200 || !/^[A-Za-z\s]+$/.test(name)) {
      setMsg("Please enter a valid name (letters only, maximum 200 characters).");
      setNameFilled(false);
      return;
    }

    // Check if all required fields are filled
    if (!categoryFilled || !nameFilled || !levelFilled) {
      setMsg("Please fill in all required fields.");
      return;
    }



    try {
      await axios.post(`http://localhost:5000/skills/${id}`, {
        nama_skill: name,
        kategori_skill: category,
        level: level,
      });
      setSuccessMessage("Skill added successfully!");
      // Show success message for 2 seconds before navigating
      setTimeout(() => {
        navigate("/skills");
      }, 3000);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const renderAsterisk = (field) => {
    if (field !== "deskripsi") {
      return <span className="required">*</span>;
    }
    return null;
  };

  const handleCancel = () => {
    navigate("/skills");
  };

  return (
    <div>
      <Sidebar />
      <main id="main">
        <section id="addSkill" className="addSkill">
          <div className="container">
            <div className="section-title">
              <h2>Add Skill</h2>
            </div>
            <div className="card-content">
              <div className="content">
                <form onSubmit={saveSkill}>
                  <p className="text-center text-danger">{msg}</p>

                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      <h5>Skill Category {renderAsterisk("category")}</h5>
                      <p><i>Pilih Salah Satu Kategori di Bawah</i></p>
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="softskill"
                        value="softskill"
                        checked={category === "softskill"}
                        onChange={() => handleCategoryChange("softskill")}
                      />
                      <label className="form-check-label" htmlFor="softskill">
                        <p>Soft Skill</p>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="hardskill"
                        value="hardskill"
                        checked={category === "hardskill"}
                        onChange={() => handleCategoryChange("hardskill")}
                      />
                      <label className="form-check-label" htmlFor="hardskill">
                        <p>Hard Skill</p>
                      </label>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      <h5>Skill Name {renderAsterisk("name")}</h5>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${formSubmitted && !nameFilled ? "error-field" : ""
                        }`}
                      id="name"
                      value={name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="Skill Name"
                    />
                  </div>

                  <label className="custom-label mb-3">
                    <h5>Level {renderAsterisk("level")}</h5>
                    <p><i>Pilih Salah Satu Level di Bawah</i></p>
                    <div className="button-group">
                      {[...Array(10).keys()].map((index) => (
                        <button
                          type="button"
                          key={index + 1}
                          className={`level-button ${level === index + 1 ? "selected" : ""
                            }`}
                          onClick={() => handleLevelChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                  </label>

                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <button
                      type="button"
                      className="btn btn-secondary ms-2"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}

          </div>
        </section>
      </main>
      {/* End #main */}
      <Footer />
    </div>
  );
};

export default AddSkill;
