import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSkillId } from "../features/skillSlice";

const EditSkill = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [msg, setMsg] = useState("");
  const skillId = useSelector(selectSkillId);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get the user ID from Redux
  const { user } = useSelector((state) => state.auth);
  const id_akun = user && user.user && user.user.id_akun;

  useEffect(() => {
    const getSkillById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/skills/akun/${id_akun}/skill/${skillId}`
        );
        const skillData = response.data.skill[0];
        setName(skillData.nama_skill);
        setCategory(skillData.kategori_skill);
        setLevel(skillData.level);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getSkillById();
  }, [id_akun, skillId]);

  const handleNameChange = (value) => {
    setName(value);
    setMsg("");
  };

  const updateSkill = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log("Name:", name);
    console.log("Name:", name.length);
    console.log("Is valid name:", /^[A-Za-z\s]+$/.test("dea salma"));
    setIsSubmitting(true);
    if (name.length > 200 || !/^[A-Za-z\s]+$/.test(name)) {
      setMsg(
        "Please enter a valid name (letters only, maximum 200 characters)."
      );

      // Clear the error message after 2 seconds
      setTimeout(() => {
        setMsg("");
      }, 2000);

      setIsSubmitting(false);

      return;
    }

    try {
      await axios.patch(`http://localhost:5000/skills/${skillId}`, {
        nama_skill: name,
        kategori_skill: category,
        level: level,
      });
      setSuccessMessage("Skill updated successfully!"); // Set success message

      // Show success message for 2 seconds before navigating
      setTimeout(() => {
        navigate("/skills");
      }, 3000);
      setErrorMessage(""); // Clear any previous error messages
    } catch (error) {
      console.error("Error updating skill:", error);
      setMsg(error.response.data.message);
      setSuccessMessage(""); // Clear any previous success messages
    } finally {
      setIsSubmitting(false); // Menandakan bahwa permintaan telah selesai
    }
  };

  const handleCancel = () => {
    navigate("/skills");
  };

  return (
    <div>
        <section id="addSkill" className="addSkill">
          <div className="container">
            <div className="section-title">
              <h2>Edit Skill</h2>
            </div>
            {successMessage && (
              <div className="alert alert-success" id="success-message" role="alert">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            <div className="card-content">
              <div className="content">
                <form onSubmit={updateSkill}>
                  <p className="text-center text-danger">{msg}</p>

                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      <h5>Skill Category</h5>
                      <p>
                        <i>Select One of the Categories Below</i>
                      </p>
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="softskill"
                        value="softskill"
                        checked={category === "softskill"}
                        onChange={() => setCategory("softskill")}
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
                        onChange={() => setCategory("hardskill")}
                      />
                      <label className="form-check-label" htmlFor="hardskill">
                        <p>Hard Skill</p>
                      </label>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      <h5>Skill Name</h5>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="Skill Name"
                      style={{ width: "45%" }}
                    />
                  </div>

                  <label className="custom-label mb-2">
                    <h5>Level</h5>
                    <p>
                      <i>Select One of the Levels Below</i>
                    </p>
                    <div className="button-group">
                      {[...Array(10).keys()].map((index) => (
                        <button
                          type="button"
                          key={index + 1}
                          className={`level-button ${
                            level === index + 1 ? "selected" : ""
                          }`}
                          onClick={() => setLevel(index + 1)}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                  </label>

                  <div className="d-flex justify-content-center align-items-center mt-3 mb-3">
                  <button
                    className="btn btn-secondary mt-3 ms-2"
                    onClick={handleCancel}
                    disabled={isSubmitting} // Menonaktifkan tombol saat sedang mengirimkan permintaan
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary mt-3"
                    type="submit"
                    disabled={isSubmitting} // Menonaktifkan tombol saat sedang mengirimkan permintaan
                  >
                    {isSubmitting ? "Saving..." : "Save"} 
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

export default EditSkill;
