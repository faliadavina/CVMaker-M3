import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSkillId } from "../features/skillSlice";
import { Button, Modal } from "react-bootstrap";

const SkillList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  const [softSkills, setSoftSkills] = useState([]);
  const [hardSkills, setHardSkills] = useState([]);
  const [data_skill, setSkill] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedSoftSkills, setSelectedSoftSkills] = useState([]);
  const [selectedHardSkills, setSelectedHardSkills] = useState([]);

  const id = user && user.user && user.user.id_akun;

  useEffect(() => {
    getSkills();
  }, [id]);

  const getSkills = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/skills/akun/${id}`
      );
      setSkill(response.data);

      const softSkills = response.data.skills.filter(
        (skill) => skill.kategori_skill === "softskill"
      );
      const hardSkills = response.data.skills.filter(
        (skill) => skill.kategori_skill === "hardskill"
      );

      setSoftSkills(softSkills);
      setHardSkills(hardSkills);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching skills:", error);
      setSkill(null);
    }
  };

  const showDeleteConfirmationModal = () => {
    setShowDeleteConfirmation(true);
  };

  const hideDeleteConfirmationModal = () => {
    setShowDeleteConfirmation(false);
  };

  const handleEditClick = (skillId) => {
    console.log(skillId);
    dispatch(setSkillId(skillId));
  };

  const deleteSkill = async (skillId) => {
    try {
      hideDeleteConfirmationModal(); // Hide the modal after successful deletion
      await axios.delete(`http://localhost:5000/skills/${skillId}`);
      getSkills();
      setSuccessMessage("Skill deleted successfully!");
      setErrorMessage("");
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (error) {
      console.error("Error deleting skill:", error);
      setErrorMessage("Error deleting skill.");
      setSuccessMessage("");
      hideDeleteConfirmationModal(); // Hide the modal after successful deletion
      setTimeout(() => setErrorMessage(""), 2000);
    }
  };

  const toggleSkillSelection = (skillId, kategoriSkill) => {
    if (kategoriSkill === "softskill") {
      setSelectedSoftSkills((prevSkills) =>
        prevSkills.includes(skillId)
          ? prevSkills.filter((id) => id !== skillId)
          : [...prevSkills, skillId]
      );
    } else if (kategoriSkill === "hardskill") {
      setSelectedHardSkills((prevSkills) =>
        prevSkills.includes(skillId)
          ? prevSkills.filter((id) => id !== skillId)
          : [...prevSkills, skillId]
      );
    }
  };

  const deleteSelectedSkills = async () => {
    try {
      for (const skillId of selectedSoftSkills) {
        await axios.delete(`http://localhost:5000/skills/${skillId}`);
      }

      for (const skillId of selectedHardSkills) {
        await axios.delete(`http://localhost:5000/skills/${skillId}`);
      }

      getSkills();
      setSelectedSoftSkills([]);
      setSelectedHardSkills([]);
      hideDeleteConfirmationModal();
      setSuccessMessage("Skills deleted successfully!");
      setErrorMessage("");
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (error) {
      console.error("Error deleting skills:", error);
      hideDeleteConfirmationModal();
      setErrorMessage("Error deleting skills.");
      setSuccessMessage("");
      setTimeout(() => setErrorMessage(""), 2000);
    }
  };

  const selectAllSoftSkills = () => {
    if (selectedSoftSkills.length === softSkills.length) {
      setSelectedSoftSkills([]);
    } else {
      const softSkillIds = softSkills.map((skill) => skill.id_skill);
      setSelectedSoftSkills(softSkillIds);
    }
  };

  const selectAllHardSkills = () => {
    if (selectedHardSkills.length === hardSkills.length) {
      setSelectedHardSkills([]);
    } else {
      const hardSkillIds = hardSkills.map((skill) => skill.id_skill);
      setSelectedHardSkills(hardSkillIds);
    }
  };

  const SkillCard = ({ skill, onEditClick, isChecked, onCheckboxChange }) => (
    <div className="progress-container mr-4 card mb-4 skill-card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span
              className="skill mb-4"
              style={{ fontWeight: "bold", color: "#001F3F", fontSize: "14px" }}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={onCheckboxChange}
                className="mr-2"
              />
              {skill.nama_skill.toUpperCase()}
            </span>
          </div>
          <div className="ml-auto">
            <Link
              to={`/edit_skill`}
              onClick={() => onEditClick(skill.id_skill)}
              className="btn btn-sm edit-button"
            >
              <FaEdit />
            </Link>
          </div>
        </div>
        <div className="progress mt-3">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            style={{ width: `${skill.level * 10}%` }}
          ></div>
          {/* Move the percentage to the right */}
          <div className="progress-percent text-right mt-3">
            <medium>{skill.level * 10}%</medium>
          </div>
        </div>
        <div className="description" style={{ fontSize: "14px" }}>
          <b>Deskripsi:</b>{" "}
          {skill.deskripsi ? <p>{skill.deskripsi}</p> : <p>-</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <section id="skills" className="skills" style={{ minHeight: "100vh" }}>
        {data_skill ? (
          <div className="container">
            <div
              className="section-title"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="title-container">
                <h2>Skills</h2>
              </div>
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div
                  className="alert alert-success"
                  id="success-message"
                  role="alert"
                >
                  {successMessage}
                </div>
              )}
              <div className="btn-container">
                {(selectedSoftSkills.length > 0 ||
                  selectedHardSkills.length > 0) && (
                  <Button
                    variant="danger"
                    onClick={showDeleteConfirmationModal}
                    style={{
                      borderRadius: "50px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                  >
                    Delete
                  </Button>
                )}
                <NavLink to="/add_skill">
                  <button
                    className="btn btn-dark"
                    id="add-button-skill"
                    style={{
                      borderRadius: "50px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginRight: "30px",
                    }}
                  >
                    <FaPlus style={{ marginRight: "10px" }} /> Add Data
                  </button>
                </NavLink>
              </div>
            </div>

            <div className="row skills-content">
              <div className="col-lg-6">
                <div className="section-subtitle">
                  <h5 style={{ fontSize: "18px" }}>Soft Skills</h5>
                  <div
                    className="checkbox-container"
                    style={{ marginTop: "10px" }}
                  >
                    {softSkills.length > 0 && (
                      <label>
                        <input
                          type="checkbox"
                          onChange={selectAllSoftSkills}
                          checked={
                            selectedSoftSkills.length === softSkills.length
                          }
                          className="softskill mr-2 text-start"
                        />
                        <i>
                          <span style={{ fontSize: "14px" }}>Select All</span>
                        </i>
                      </label>
                    )}
                  </div>
                </div>

                {softSkills.map((skill) => (
                  <SkillCard
                    key={skill.id_skill}
                    skill={skill}
                    onEditClick={handleEditClick}
                    onDeleteClick={deleteSkill}
                    isChecked={selectedSoftSkills.includes(skill.id_skill)}
                    onCheckboxChange={() =>
                      toggleSkillSelection(skill.id_skill, "softskill")
                    }
                  />
                ))}
              </div>

              <div className="col-lg-6">
                <div className="section-subtitle">
                  <h5 style={{ fontSize: "18px" }}>Hard Skills</h5>
                  <div
                    className="checkbox-container"
                    style={{ marginTop: "10px" }}
                  >
                    {hardSkills.length > 0 && (
                      <label>
                        <input
                          type="checkbox"
                          onChange={selectAllHardSkills}
                          checked={
                            selectedHardSkills.length === hardSkills.length
                          }
                          className="hardskill mr-2 text-start"
                        />
                        <i>
                          <span style={{ fontSize: "14px" }}>Select All</span>
                        </i>
                      </label>
                    )}
                  </div>
                </div>

                {hardSkills.map((skill) => (
                  <SkillCard
                    key={skill.id_skill}
                    skill={skill}
                    onEditClick={handleEditClick}
                    onDeleteClick={deleteSkill}
                    isChecked={selectedHardSkills.includes(skill.id_skill)}
                    onCheckboxChange={() =>
                      toggleSkillSelection(skill.id_skill, "hardskill")
                    }
                  />
                ))}
              </div>
            </div>
            <Modal
              show={showDeleteConfirmation}
              onHide={hideDeleteConfirmationModal}
            >
              <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete the selected skill?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={deleteSelectedSkills}>
                  Delete
                </Button>
                <Button
                  variant="secondary"
                  onClick={hideDeleteConfirmationModal}
                >
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        ) : (
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ marginTop: "20%" }}
          >
            <div
              className="text-center"
              style={{
                marginBottom: "20px",
                color: "grey",
                fontSize: "14px",
              }}
            >
              Skill Hasn't Been Added
            </div>
            <NavLink to="/add_skill">
              <button
                className="btn btn-dark"
                id="add-button-skill"
                style={{
                  borderRadius: "50px",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                <FaPlus style={{ marginRight: "10px" }} /> Add Data
              </button>
            </NavLink>
          </div>
        )}
      </section>
    </div>
  );
};

export default SkillList;
