import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../pages/Sidebar";
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getMe } from "../features/authSlice";

const AddPorto = () => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const [fileType, setFileType] = useState("");
    const [errors, setErrors] = useState("");
    const id_akun = 3;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isError } = useSelector((state) => state.auth);

    const loadFile = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileType(selectedFile.type);
        }
    };

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/login");
        }
    }, [isError, navigate]);


    const { user } = useSelector((state) => state.auth);
    const id = user && user.user && user.user.id_akun;
    console.log(id);

    const savePorto = async (e) => {
        e.preventDefault();
        let hasErrors = false; // Menambahkan variabel untuk melacak kesalahan

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
        console.log("Save button clicked");
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        try {
            await axios.post(`http://localhost:5000/porto/${id}`, formData, {
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
            <Sidebar />
            <main id="main">
                <section className="portfolio section-bg">
                    <div className="container">

                        <div className="section-title">
                            <h2>Add Portfolio</h2>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-7">
                                <Form onSubmit={savePorto}>
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
                                            Add Data
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </body>
    )
}

export default AddPorto;