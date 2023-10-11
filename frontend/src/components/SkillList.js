import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSkillId, selectSkillId } from "../features/skillSlice"; // Sesuaikan dengan path ke slice skill
import MySidebar from "../pages/MySidebar";

const SkillList = () => {
  const dispatch = useDispatch();
  const skillId = useSelector(selectSkillId);
  const [softSkills, setSoftSkills] = useState([]);
  const [hardSkills, setHardSkills] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const id = user && user.user && user.user.id_akun;
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getSkills();
  }, [skillId]);

  const getSkills = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/skills/akun/${id}`
      );

      // Pisahkan skills berdasarkan kategori_skill
      const softSkills = response.data.skills.filter(
        (skill) => skill.kategori_skill === "softskill"
      );
      const hardSkills = response.data.skills.filter(
        (skill) => skill.kategori_skill === "hardskill"
      );

      setSoftSkills(softSkills);
      setHardSkills(hardSkills);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const handleEditClick = (skillId) => {
    console.log(skillId)
    dispatch(setSkillId(skillId));
  };

  const deleteSkill = async (skillId) => {
    try {
      await axios.delete(`http://localhost:5000/skills/${skillId}`);
      getSkills();
      setSuccessMessage("Skill deleted successfully!");
      setErrorMessage("");
      // Clear success message after 2 seconds
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (error) {
      console.error("Error deleting skill:", error);
      setErrorMessage("Error deleting skill.");
      setSuccessMessage("");
      // Clear error message after 2 seconds
      setTimeout(() => setErrorMessage(""), 2000);
    }
  };

  return (
    <div>
      <MySidebar />
      <main id="main">
        <section id="skills" className="skills section-bg">
          <div className="container" style={{ minHeight: `400px` }}>
            <div className="section-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="title-container">
                <h2>Skills</h2>
                <p>Magnam dolores commodi suscipit...</p>
              </div>
              <div className="btn-container">
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
                      <span className="skill">
                        {skill.nama_skill}{" "}
                        <i className="val">{skill.level * 10}%</i>
                      </span>
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        aria-valuenow={skill.level * 10}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: `${skill.level * 10}%` }}
                      ></div>
                    </div>
                    <div className="progress-buttons">
                      <Link
                        to={`/edit-skill`}
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
                      </button>
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
                      <span className="skill">
                        {skill.nama_skill}{" "}
                        <i className="val">{skill.level * 10}%</i>
                      </span>
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        aria-valuenow={skill.level * 10}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: `${skill.level * 10}%` }}
                      ></div>
                    </div>
                    <div className="progress-buttons">
                      <Link
                        to={`/edit-skill`}
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
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
          </div>
        </section>
      </main>
    </div >
  );
};

export default SkillList;
