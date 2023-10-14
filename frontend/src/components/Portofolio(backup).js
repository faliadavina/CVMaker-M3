import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from './layout/navbar';
import Footer from './layout/footer';

const Portfolio = () => {
    const [portofolios, setPorto] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const { id_porto } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getPorto()
    }, []);

    useEffect(() => {
        getPortoById()
    }, []);

    const getPortoById = async () => {
        const response = await axios.get(`http://localhost:5000/porto/${id_porto}`);
        setTitle(response.data.deskripsi);
        setFile(response.data.portofolio);
    }

    const handleShowModal = (portoID) => {
        setShowUpdateModal(true);
        getPortoById(portoID);
    };

    const handleCloseModal = () => {
        setShowUpdateModal(false);
    };

    const getPorto = async () => {
        try {
            const response = await axios.get("http://localhost:5000/porto");
            setPorto(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const renderPortofolioContent = (url) => {
        const fileExtension = url.split('.').pop().toLowerCase();
        const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension);
        const isPDF = fileExtension === 'pdf';
        const isAudio = ['mp3', 'wav'].includes(fileExtension);
        const isVideo = ['mp4', 'webm'].includes(fileExtension);

        if (isImage) {
            return <img src={url} alt="Portofolio" />;
        } else if (isPDF) {
            return <embed src={url} type="application/pdf" className="pdf-embed" />;
        } else if (isAudio) {
            return <audio controls src={url} />;
        } else if (isVideo) {
            return <video controls src={url} />;
        } else {
            return <p>Unsupported file format</p>;
        }
    };

    // ============= CODE FOR ADD DATA =============
    const loadFile = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    const savePorto = async (e) => {
        e.preventDefault();
        console.log("Save button clicked");
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        try {
            await axios.post("http://localhost:5000/porto", formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            });
            navigate("/portofolio");
        } catch (error) {
            console.log(error);
        }
    };

    const updatePorto = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        try {
            await axios.patch(`http://localhost:5000/porto/${id_porto}`, formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            });
            navigate("/portofolio");
        } catch (error) {
            console.log(error);
        }
        handleCloseModal();
    };

    const deletePorto = async (portoID) => {
        try {
            await axios.delete(`http://localhost:5000/porto/${portoID}`);
            getPorto();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <body>
            <Navbar />
            <main id="main">
                <section id="uploadPorto" className="portfolio section-bg">
                    <div className="container">

                        <div className="section-title">
                            <h2>Add Portfolio</h2>
                            <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                        </div>

                        <div className="container">
                            <div className="section-title">
                                <h2>Portfolio</h2>
                            </div>
                            {portofolios === null || portofolios.length === 0 ? (
                                <div className="container text-center contStyle">
                                    <h3>No Data Portofolio Available, Please Add Data First</h3>
                                    <button className="btn btn-primary btn-lg" style={{ backgroundColor: '#000000', fontWeight: '800' }} onClick={() => setShowAddModal(true)}>
                                        + ADD PORTOFOLIO
                                    </button>
                                </div>
                            ) : (
                                portofolios.map((portofolio) => (
                                    <div className="card" key={portofolio.id_porto}>
                                        {renderPortofolioContent(portofolio.url)}
                                        <div className="deskripsi">
                                            <p>{portofolio.deskripsi}</p>
                                            <div className="buttons">
                                                <button onClick={() => deletePorto(portofolio.id_porto)} className="btn btn-danger">Delete</button>
                                                <button onClick={() => handleShowModal(portofolio.id_porto)} className="btn btn-primary">Update</button>
                                                {/* <Link to={`edit_portofolio/${portofolio.id_porto}`} className="btn btn-primary">Update</Link> */}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Modal untuk tambah data */}
                    <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Portfolio</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={savePorto}>
                                <Form.Group controlId="deskripsi">
                                    <Form.Label>Deskripsi</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Masukkan deskripsi portofolio Anda"
                                    />
                                </Form.Group>
                                <Form.Group controlId="file">
                                    <Form.Label>Pilih File</Form.Label>
                                    <Form.Control
                                        type="file"
                                        onChange={loadFile}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                                Close
                            </Button>
                            <Button type="submit" variant="primary">
                                Add Data
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Modal untuk update data */}
                    <Modal show={showUpdateModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Data</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={updatePorto}>
                                <Form.Group controlId="title">
                                    <Form.Label>Deskripsi</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Deskripsi"
                                    />
                                </Form.Group>

                                <Form.Group controlId="file">
                                    <Form.Label>File</Form.Label>
                                    <div className="custom-file">
                                        <input
                                            type="file"
                                            className="custom-file-input"
                                            id="customFile"
                                            onChange={loadFile}
                                        />
                                        <label className="custom-file-label" htmlFor="customFile">
                                            Choose a file...
                                        </label>
                                    </div>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                            <Button variant="success" onClick={updatePorto}>
                                Update
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    {/* <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Update Portfolio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={updatePorto}>
                <Form.Group controlId="title">
                  <Form.Label>Deskripsi</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Deskripsi"
                  />
                </Form.Group>
                <Form.Group controlId="file">
                  <Form.Label>File</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={loadFile}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                Close
              </Button>
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal> */}
                </section>
            </main>
            <Footer />
            <a href="#about" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
        </body>
    )
}

export default Portfolio;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from './layout/navbar';
// import Footer from './layout/footer';
// import { useParams, useNavigate } from "react-router-dom";
// import { Form, Button } from 'react-bootstrap';

// const EditPorto = () => {
//     const [title, setTitle] = useState("");
//     const [file, setFile] = useState("");
//     const [fileType, setFileType] = useState("");
//     const { id_porto } = useParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         getPortoById()
//     }, []);

//     const getPortoById = async () => {
//         const response = await axios.get(`http://localhost:5000/porto/${id_porto}`);
//         setTitle(response.data.deskripsi);
//         setFile(response.data.portofolio);
//         setFile(response.data.url);
//     }

//     const loadFile = (e) => {
//         const selectedFile = e.target.files[0];
//         if (selectedFile) {
//             setFile(selectedFile);
//             setFileType(selectedFile.type);
//         }
//     };

//     const renderFilePreview = () => {
//         if (fileType.startsWith("image/")) {
//             return <img src={URL.createObjectURL(file)} alt="Preview" />;
//         } else if (fileType === "application/pdf") {
//             return <embed src={URL.createObjectURL(file)} type="application/pdf" className="pdf-embed" height="300" />;
//         } else if (fileType.startsWith("video/")) {
//             return <video controls src={URL.createObjectURL(file)} />;
//         } else if (fileType.startsWith("audio/")) {
//             return <audio controls src={URL.createObjectURL(file)} />;
//         } else {
//             return <p>Unsupported file format</p>;
//         }
//     };

//     const updatePorto = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("title", title);
//         try {
//             await axios.patch(`http://localhost:5000/porto/${id_porto}`, formData, {
//                 headers: {
//                     "Content-type": "multipart/form-data",
//                 },
//             });
//             navigate("/portofolio");
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <body>
//             <Navbar />
//             <main id="main">
//                 <section className="portfolio section-bg">
//                     <div className="container">

//                         <div className="section-title">
//                             <h2>Update Portfolio</h2>
//                         </div>
//                         <div className="row justify-content-center">
//                             <div className="col-md-6">
//                                 <Form onSubmit={updatePorto}>
//                                     <Form.Group controlId="title">
//                                         <Form.Label>Deskripsi</Form.Label>
//                                         <Form.Control
//                                             as="textarea"
//                                             rows={3}
//                                             value={title}
//                                             onChange={(e) => setTitle(e.target.value)}
//                                             placeholder="Deskripsi"
//                                         />
//                                     </Form.Group>

//                                     <Form.Group controlId="file">
//                                         <Form.Label>Pilih File</Form.Label>
//                                         <Form.Control
//                                             type="file"
//                                             onChange={loadFile}
//                                         />
//                                     </Form.Group>

//                                     {file && (
//                                         <div className="Container" style={{ marginTop: '15px', marginLeft: '25px' }}>
//                                             <div className="card add">
//                                                 {renderFilePreview()}
//                                             </div>
//                                         </div>
//                                     )}

//                                     <div className="form-group">
//                                         <Button type="submit" variant="success">
//                                             Update
//                                         </Button>
//                                     </div>
//                                 </Form>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </main>
//             <Footer />
//             <a href="#about" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
//         </body>
//     );
// };

// export default EditPorto;