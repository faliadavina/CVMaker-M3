import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../pages/Sidebar";

const AddOrganisasi = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [position, setPosition] = useState("");
  const [period, setPeriod] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [organizationNameFilled, setOrganizationNameFilled] = useState(false);
  const [positionFilled, setPositionFilled] = useState(false);
  const [periodFilled, setPeriodFilled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const clearErrorMessage = () => {
    setMsg("");
  };

  const handleOrganizationNameChange = (value) => {
    setOrganizationName(value);
    setOrganizationNameFilled(!!value);
    clearErrorMessage();
  };

  const handlePositionChange = (value) => {
    setPosition(value);
    setPositionFilled(!!value);
    clearErrorMessage();
  };

  const handlePeriodChange = (value) => {
    setPeriod(value);
    setPeriodFilled(!!value);
    clearErrorMessage();
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
    clearErrorMessage();
  };

  const { user } = useSelector((state) => state.auth);
  const id = user && user.user && user.user.id_akun;
  console.log(id);

  const saveOrganisasi = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Reset error message
    setMsg("");

    // Check if all required fields are filled
    if (!organizationNameFilled || !positionFilled || !periodFilled) {
      setMsg("Please fill in all required fields.");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/organisasi/`, {
        id_akun: id,  
        nama_organisasi: organizationName,
        jabatan: position,
        periode: period,
        deskripsi_jabatan: description,
      });
      setSuccessMessage("Organization added successfully!");
      // Show success message for 2 seconds before navigating
      setTimeout(() => {
        navigate("/edit_organisasi");
      }, 2000);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
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
    navigate("/edit_organisasi");
  };

  return (
    <div>
      <Sidebar />
      <main id="main">
        <section id="addOrganisasi" className="addOrganisasi">
          <div className="container">
            <div className="section-title">
              <h2>Add Organization</h2>
            </div>
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
            <div className="card-content">
              <div className="content">
                <form onSubmit={saveOrganisasi}>
                  <p className="text-center text-danger">{msg}</p>

                  <div className="mb-3">
                    <label htmlFor="organizationName" className="form-label">
                      <h5>Organization Name {renderAsterisk("organizationName")}</h5>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        formSubmitted && !organizationNameFilled ? "error-field" : ""
                      }`}
                      id="organizationName"
                      value={organizationName}
                      onChange={(e) => handleOrganizationNameChange(e.target.value)}
                      placeholder="Organization Name"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="position" className="form-label">
                      <h5>Position {renderAsterisk("position")}</h5>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        formSubmitted && !positionFilled ? "error-field" : ""
                      }`}
                      id="position"
                      value={position}
                      onChange={(e) => handlePositionChange(e.target.value)}
                      placeholder="Position"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="period" className="form-label">
                      <h5>Period {renderAsterisk("period")}</h5>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        formSubmitted && !periodFilled ? "error-field" : ""
                      }`}
                      id="period"
                      value={period}
                      onChange={(e) => handlePeriodChange(e.target.value)}
                      placeholder="Period"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      <h5>Description</h5>
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      value={description}
                      onChange={(e) => handleDescriptionChange(e.target.value)}
                      placeholder="Description"
                    />
                  </div>

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
          </div>
        </section>
      </main>
    </div>
  );
};

export default AddOrganisasi;
