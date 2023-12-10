import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlus, FaEdit } from "react-icons/fa";
import {
  Card,
  Button,
  Alert,
  Modal,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useSelector } from "react-redux";

const PendidikanList = () => {
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  const [pendidikan, setPendidikan] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const id = user && user.user && user.user.id_akun;

  useEffect(() => {
    getPendidikan();
  }, [id]);

  const getPendidikan = async () => {
    try {
      const response = await axios.get(
        `https://api-cvmaster.agilearn.id/pendidikan/akun/${id}`
      );
      setPendidikan(response.data.pendidikan);
      setErrorMessage("");
    } catch (error) {
      setPendidikan(null);
      console.error("Error fetching:", error);
      setPendidikan(null);
    }
  };

  const handleEditClick = (id_pend) => {
    navigate(`/edit_pendidikan/${id_pend}`);
  };

  const toggleSelect = (id_pend) => {
    if (selectAll) {
      setSelectedItems([]);
      setSelectAll(false);
    } else {
      if (selectedItems.includes(id_pend)) {
        setSelectedItems(selectedItems.filter((item) => item !== id_pend));
      } else {
        setSelectedItems([...selectedItems, id_pend]);
      }
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allIds = pendidikan.map((item) => item.id_pend);
      setSelectedItems(allIds);
    } else {
      setSelectedItems([]);
    }
  };

  const showDeleteConfirmationModal = () => {
    setShowDeleteConfirmation(true);
  };

  const hideDeleteConfirmationModal = () => {
    setShowDeleteConfirmation(false);
  };

  const deleteSelectedPendidikan = async () => {
    try {
      for (const id_pend of selectedItems) {
        await axios.delete(`https://api-cvmaster.agilearn.id/pendidikan/${id_pend}`);
      }
      getPendidikan();
      setSelectedItems([]);
      setSuccessMessage("Selected education deleted successfully!");
      setErrorMessage("");
      hideDeleteConfirmationModal(); // Hide the modal after successful deletion
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (error) {
      console.error("Error deleting selected education:", error);
      setErrorMessage("Error deleting selected education.");
      setSuccessMessage("");
      hideDeleteConfirmationModal(); // Hide the modal after deletion error
      setTimeout(() => setErrorMessage(""), 2000);
    }
  };

  const PendidikanDetail = pendidikan
    ? pendidikan.map((pendidikan, index) => (
        <Col
          key={pendidikan.id_pend}
          xs={12}
          md={6}
          lg={6}
          xl={6}
          className="mb-3"
        >
          <Card
            className={`custom-card ${
              selectedItems.includes(pendidikan.id_pend) ? "selected" : ""
            }`}
          >
            <Card.Body>
              <Row>
                <Col xs="auto" className="d-flex align-items-start pr-0">
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(pendidikan.id_pend)}
                      onChange={() => toggleSelect(pendidikan.id_pend)}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="pendidikan-details">
                    <Card.Title style={{ fontSize: "17px" }}>
                      {pendidikan.jenjang.toUpperCase()}
                    </Card.Title>
                    <Card.Subtitle style={{ fontSize: "15px" }}>
                      {pendidikan.nama_sekolah.toUpperCase()}
                    </Card.Subtitle>
                    <Card.Text style={{ fontSize: "12px" }}>
                      JURUSAN {pendidikan.jurusan}
                      <br />
                      <span style={{ color: "gray" }}>
                        {pendidikan.tahun_masuk} - {pendidikan.tahun_lulus}
                      </span>
                    </Card.Text>
                  </div>
                </Col>
              </Row>
              <div className="card-action">
                <Button
                  onClick={() => handleEditClick(pendidikan.id_pend)}
                  className="btn btn-sm edit-button"
                >
                  <FaEdit />
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))
    : null;

  return (
    <div>
      <section id="pendidikan" className="pendidikan">
        {pendidikan !== null ? (
          <div className="container">
            <div
              className="section-title"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="title-container">
                <h2>Education</h2>
                <div className="checkbox-container">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                    <i>
                      <span style={{ fontSize: "14px", marginLeft: "10px" }}>
                        Select All
                      </span>
                    </i>
                  </label>
                </div>
              </div>
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              {successMessage && (
                <Alert
                  variant="success"
                  className="alert alert-success"
                  id="success-message"
                  style={{ marginLeft: "70px" }}
                >
                  {successMessage}
                </Alert>
              )}
              <div className="btn-container" style={{ marginLeft: "auto" }}>
                {selectedItems.length > 0 && (
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
                <NavLink to="/add_pendidikan">
                  <Button
                    variant="dark"
                    style={{
                      borderRadius: "50px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginRight: "20px",
                    }}
                  >
                    <FaPlus style={{ marginRight: "10px" }} /> Add Data
                  </Button>
                </NavLink>
              </div>
            </div>
            <Row>{PendidikanDetail}</Row>
            <Modal
              show={showDeleteConfirmation}
              onHide={hideDeleteConfirmationModal}
            >
              <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete the selected education?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={deleteSelectedPendidikan}>
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
              Pendidikan Hasn't Been Added
            </div>
            <NavLink to="/add_pendidikan">
              <Button
                variant="dark"
                style={{
                  borderRadius: "50px",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                <FaPlus style={{ marginRight: "10px" }} /> Add Data
              </Button>
            </NavLink>
          </div>
        )}
      </section>
    </div>
  );
};

export default PendidikanList;
