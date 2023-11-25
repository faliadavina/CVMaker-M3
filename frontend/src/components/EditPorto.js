import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';

const EditPorto = () => {
    const [judul, setJudul] = useState("");
    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const [fileType, setFileType] = useState("");
    const [errors, setErrors] = useState("");
    const { id_porto } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/porto/${id_porto}`);
                if (response.data) {
                    setJudul(response.data.judul || "");
                    setTitle(response.data.deskripsi || "");
                    setFile(response.data.portofolio || "");
                } else {
                    console.error('Data not found');
                    // Atur nilai default jika data tidak ditemukan
                    setJudul("");
                    setTitle("");
                    setFile("");
                }
            } catch (error) {
                console.error('Error Fetching Data:', error);
                // Atur nilai default jika terjadi kesalahan
                setJudul("");
                setTitle("");
                setFile("");
            }
        }

        fetchData();
    }, [id_porto]);


    const loadFile = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileType(selectedFile.type);
        }
    };

    const updatePorto = async (e) => {
        e.preventDefault();
        let hasErrors = false;

        if (!judul) {
            setErrors((prevErrors) => ({ ...prevErrors, judul: "Judul harus diisi." }));
            hasErrors = true;
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, judul: "" }));
        }

        if (!title) {
            setErrors((prevErrors) => ({ ...prevErrors, title: "Deskripsi harus diisi." }));
            hasErrors = true;
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, title: "" }));
        }

        if (!file) {
            setErrors((prevErrors) => ({ ...prevErrors, file: "File harus diisi." }));
            hasErrors = true;
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, file: "" }));
        }

        if (hasErrors) {
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("judul", judul);
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
    };

    const renderFilePreview = () => {
        if (fileType.startsWith("image/")) {
            return <img src={URL.createObjectURL(file)} alt="Preview" />;
        } else if (fileType === "application/pdf") {
            return <embed src={URL.createObjectURL(file)} type="application/pdf" className="pdf-embed" height="300" />;
        } else if (fileType.startsWith("video/")) {
            return <video controls src={URL.createObjectURL(file)} />;
        } else if (fileType.startsWith("audio/")) {
            return <audio controls src={URL.createObjectURL(file)} />;
        } else {
            return <p>Unsupported file format</p>;
        }
    };


    return (
        <body>
            <section className="portfolio section-bg">
                <div className="container">

                    <div className="section-title">
                        <h2>Update Portfolio</h2>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-7">
                            <Form onSubmit={updatePorto}>
                                <Form.Group controlId="judul">
                                    <Form.Label style={{ fontWeight: '700' }}>Judul</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={judul}
                                        onChange={(e) => {
                                            setJudul(e.target.value);
                                            setErrors((prevErrors) => ({ ...prevErrors, judul: "" })); // Menghapus pesan kesalahan saat mengubah nilai
                                        }}
                                        placeholder="Masukkan judul portofolio Anda"
                                        className={errors.judul ? "is-invalid" : ""}
                                    />
                                    {errors.judul && <div className="invalid-feedback">{errors.judul}</div>} {/* Menampilkan pesan kesalahan */}
                                </Form.Group>
                                <Form.Group controlId="deskripsi">
                                    <Form.Label style={{ fontWeight: '700' }}>Deskripsi</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={title}
                                        onChange={(e) => {
                                            setTitle(e.target.value);
                                            setErrors((prevErrors) => ({ ...prevErrors, title: "" })); // Menghapus pesan kesalahan saat mengubah nilai
                                        }}
                                        placeholder="Masukkan deskripsi portofolio Anda"
                                        className={errors.title ? "is-invalid" : ""}
                                    />
                                    {errors.title && <div className="invalid-feedback">{errors.title}</div>} {/* Menampilkan pesan kesalahan */}
                                </Form.Group>
                                <Form.Group controlId="file">
                                    <Form.Label style={{ fontWeight: '700', marginTop: '15px' }}>Pilih File</Form.Label>
                                    <Form.Control
                                        type="file"
                                        onChange={loadFile}
                                        className={errors.file ? "is-invalid" : ""}
                                    />
                                    {errors.file && <div className="invalid-feedback">{errors.file}</div>} {/* Menampilkan pesan kesalahan */}
                                </Form.Group>

                                {file && (
                                    <div className="Container" style={{ marginTop: '15px', marginLeft: '25px' }}>
                                        <div className="card add porto">
                                            {renderFilePreview()}
                                        </div>
                                    </div>
                                )}

                                <div className="form-group" style={{ marginTop: '15px' }}>
                                    <Button type="submit" variant="success" style={{ fontWeight: '700' }}>
                                        Update Data
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
        </body>
    )
}

export default EditPorto;