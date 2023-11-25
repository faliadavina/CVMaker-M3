import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddSkill = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [categoryFilled, setCategoryFilled] = useState(false);
  const [nameFilled, setNameFilled] = useState(false);
  const [levelFilled, setLevelFilled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const maxDeskripsiLength = 255;

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

  const handleDescriptionChange = (value) => {
    setDescription(value);
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
      setMsg(
        "Please enter a valid name (letters only, maximum 200 characters)."
      );
      setNameFilled(false);
      return;
    }

    if (description.length > 255) {
      setMsg(
        "Description Maximun 255 characters"
      );
      return;
    }

    // Check if all required fields are filled
    if (!categoryFilled || !nameFilled || !levelFilled) {
      setMsg("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`http://localhost:5000/skills/${id}`, {
        nama_skill: name,
        kategori_skill: category,
        level: level,
        deskripsi: description,
      });
      setSuccessMessage("Skill added successfully!");
      // Show success message for 2 seconds before navigating
      setTimeout(() => {
        navigate("/skills");
      }, 2000);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    } finally {
      setIsSubmitting(false); // Indicates that the request has completed
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
      <section id="addSkill" className="addSkill">
        <div className="container">
          <div className="section-title">
            <h2>Add Skill</h2>
          </div>
          {successMessage && (
            <div className="alert alert-success"  style={{ marginRight:"50px" }} id="success-message" role="alert">
              {successMessage}
            </div>
          )}
          <div className="card-content">
            <div className="content">
              <form onSubmit={saveSkill}>
              <p className="text-center text-danger">{msg}</p>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="category" className="form-label">
                        <h5>Skill Category {renderAsterisk("category")}</h5>
                        {/* <i>Select One of the Categories Below</i> */}
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
                        className={`form-control ${
                          formSubmitted && !nameFilled ? "error-field" : ""
                        }`}
                        id="name"
                        value={name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        placeholder="Skill Name"
                        style={{ width: "80%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 pr-4">
                    
                  <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        <h5>Skill Description</h5>
                        {/* <i>Describe your skill (optional)</i> */}
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => handleDescriptionChange(e.target.value)}
                        placeholder="Skill Description"
                        rows="2"
                        style={{ width: "80%" }}
                      />
                      <p style={{fontSize:"10px"}}>
                        {description.length} / {maxDeskripsiLength}
                      </p>
                    </div>


                    <label className="custom-label mt-2 mb-3">
                      <h5>Level {renderAsterisk("level")}</h5>
                      {/* <p>
                        <i>Select One of the Levels Below</i>
                      </p> */}
                      <div className="button-group">
                        {[...Array(10).keys()].map((index) => (
                          <button
                            type="button"
                            key={index + 1}
                            className={`level-button mt-2 ${
                              level === index + 1 ? "selected" : ""
                            }`}
                            onClick={() => handleLevelChange(index + 1)}
                          >
                            {index + 1}
                          </button>
                        ))}
                      </div>
                    </label>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    className="btn btn-secondary mt-4 me-3"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary mt-4"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Adding..." : "Add Data"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddSkill;
