import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { Modal, Button } from 'react-bootstrap';

const Portfolio = () => {
  const [portofolios, setPorto] = useState([]);
  const [selectedPortofolios, setSelectedPortofolios] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);



  const { user } = useSelector((state) => state.auth);
  const id = user && user.user && user.user.id_akun;
  console.log(id);

  useEffect(() => {
    getPorto();
  }, [id]);

  const getPorto = async () => {
    try {
      const response = await axios.get(`https://api-cvmaster.agilearn.id/porto/${id}`);
      setPorto(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderPortofolioContent = (url) => {
    const fileExtension = url.split(".").pop().toLowerCase();
    const isImage = ["jpg", "jpeg", "png", "gif"].includes(fileExtension);
    const isPDF = fileExtension === "pdf";
    const isAudio = ["mp3", "wav"].includes(fileExtension);
    const isVideo = ["mp4", "webm"].includes(fileExtension);

    if (isImage) {
      return <img src={url} alt="Portofolio" height="300" />;
    } else if (isPDF) {
      return (
        <embed
          src={url}
          type="application/pdf"
          className="pdf-embed"
          height="300"
        />
      );
    } else if (isAudio) {
      return <audio controls src={url} height="300" />;
    } else if (isVideo) {
      return <video controls src={url} height="300" />;
    } else {
      return <p>Unsupported file format</p>;
    }
  };

  // ============= CODE FOR DELETE DATA =============
  const toggleSelection = (portoID) => {
    if (selectedPortofolios.includes(portoID)) {
      setSelectedPortofolios(selectedPortofolios.filter((id) => id !== portoID));
    } else {
      setSelectedPortofolios([...selectedPortofolios, portoID]);
    }
  };

  const deleteSelectedPortofolios = async () => {
    try {
      // Tampilkan modal konfirmasi
      handleShowConfirmationModal();
    } catch (error) {
      console.error("Error deleting portofolios:", error);
      setErrorMessage("Error deleting portofolios.");
      setSuccessMessage("");
      // Clear error message after 2 seconds
      setTimeout(() => setErrorMessage(""), 2000);
    }
  };

  const handleDeleteConfirmed = async () => {
    try {
      // Menghapus portofolio yang dipilih satu per satu
      for (const portoId of selectedPortofolios) {
        await axios.delete(`https://api-cvmaster.agilearn.id/porto/${portoId}`);
      }
      getPorto(); // Ambil data portofolio setelah menghapus
      setSelectedPortofolios([]); // Kosongkan daftar yang dipilih
      setSuccessMessage("Portofolios deleted successfully!");
      setErrorMessage("");
      // Clear success message after 2 seconds
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (error) {
      console.error("Error deleting portofolios:", error);
      setErrorMessage("Error deleting portofolios.");
      setSuccessMessage("");
      // Clear error message after 2 seconds
      setTimeout(() => setErrorMessage(""), 2000);
    }
  };

  const handleShowConfirmationModal = () => setShowConfirmationModal(true);
  const handleCloseConfirmationModal = () => setShowConfirmationModal(false);


  return (
    <body>
      <section id="uploadPorto" className="portfolio">
        <div className="container">
          <div className="container">
            {portofolios === null || portofolios.length === 0 ? (
              <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
                <div
                  className="text-center"
                  style={{
                    marginBottom: "20px",
                    color: "grey",
                    fontSize: "14px",
                  }}
                >
                  Portofolio Hasn't Been Added
                </div>
                <NavLink to="/add_portofolio">
                  <button
                    className="btn btn-dark"
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
            ) : (
              <>
                <div class="section-title d-flex justify-content-between align-items-center">
                  <h2>Portofolio</h2>
                  <div>
                    {/* <button onClick={deleteSelectedPortofolios} className="btn btn-danger" style={{ fontWeight: "bold" }}>
                      Delete Selected
                    </button> */}
                    {selectedPortofolios.length > 0 && (
                      <button
                        onClick={deleteSelectedPortofolios}
                        className="btn btn-danger"
                        style={{ fontWeight: "bold" }}
                      >
                        Delete Selected
                      </button>
                    )}
                    <NavLink to="/add_portofolio">
                      <button
                        className="btn btn-dark"
                        style={{
                          borderRadius: "50px",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        <FaPlus style={{ marginRight: "10px" }} /> Add Portfolio
                      </button>
                    </NavLink>
                  </div>
                </div>

                <div className="container">
                  <div className="row">
                    {portofolios.map((portofolio) => (
                      <div
                        className="col-md-6 mx-auto"
                        key={portofolio.id_porto}
                      >
                        <div className="row">
                          <div className="col-md-1">
                            <input
                              type="checkbox"
                              className="checkbox-input"
                              checked={selectedPortofolios.includes(portofolio.id_porto)}
                              onChange={() => toggleSelection(portofolio.id_porto)}
                            />
                          </div>
                          <div className="col-md-11">
                            <div className="card porto" style={{ marginBottom: "15px" }}>
                              {renderPortofolioContent(portofolio.url)}
                              <div className="deskripsi">
                                <p>{portofolio.deskripsi}</p>
                                <div className="buttons">
                                  <NavLink
                                    to={`edit_portofolio/${portofolio.id_porto}`}
                                    className="btn btn-primary"
                                  >
                                    Update
                                  </NavLink>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {/* Modal Konfirmasi */}
        <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the selected portfolios?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseConfirmationModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => {
              handleCloseConfirmationModal();
              handleDeleteConfirmed();
            }}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </body>
  );
};

export default Portfolio;