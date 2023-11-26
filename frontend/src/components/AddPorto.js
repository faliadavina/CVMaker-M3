import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../features/authSlice";

const AddPorto = () => {
  const [judul, setJudul] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileType(selectedFile.type);
      setFileSize(selectedFile.size);
      const fileType = selectedFile.type.toLowerCase();

      const allowedTypes = {
        'image/jpg': { maxSize: 5 * 1024 * 1024 },  // Gambar <= 5MB
        'image/png': { maxSize: 5 * 1024 * 1024 },  // Gambar <= 5MB
        'image/jpeg': { maxSize: 5 * 1024 * 1024 }, // Gambar <= 5MB
        'image/gif': { maxSize: 5 * 1024 * 1024 },  // Gambar <= 5MB
        'application/pdf': { maxSize: 10 * 1024 * 1024 }, // PDF <= 10MB
        'video/mp4': { maxSize: 100 * 1024 * 1024 }, // Video <= 100MB
        'video/webm': { maxSize: 100 * 1024 * 1024 }, // Video <= 100MB
        'audio/mp3': { maxSize: 100 * 1024 * 1024 }, // Audio <= 100MB
        'audio/wav': { maxSize: 100 * 1024 * 1024 }  // Audio <= 100MB
      };


      console.log('fileType:', fileType);
      console.log('selectedFile.size:', selectedFile.size);
      if (!allowedTypes[fileType]) {
        setErrors({ file: "Invalid file type" });
      } else if (selectedFile.size > allowedTypes[fileType].maxSize) {
        setErrors({ file: `File must be less than ${allowedTypes[fileType].maxSize / (1024 * 1024)}MB` });
      } else {
        setErrors({ file: "" });
      }
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

    if (!judul) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: "Judul harus diisi.",
      }));
      hasErrors = true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, judul: "" }));
    }

    if (!title) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: "Deskripsi harus diisi.",
      }));
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
    formData.append("judul", judul);
    formData.append("title", title);

    setIsSubmitting(true);

    try {
      await axios.post(`http://194.233.93.124:8000/porto/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/portofolio");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false); // Menandakan bahwa permintaan telah selesai
    }
  };

  const renderFilePreview = () => {
    if (fileType.startsWith("image/")) {
      return <img src={URL.createObjectURL(file)} alt="Preview" />;
    } else if (fileType === "application/pdf") {
      return (
        <embed
          src={URL.createObjectURL(file)}
          type="application/pdf"
          className="pdf-embed"
          height="300"
        />
      );
    } else if (fileType.startsWith("video/")) {
      return <video controls src={URL.createObjectURL(file)} />;
    } else if (fileType.startsWith("audio/")) {
      return <audio controls src={URL.createObjectURL(file)} />;
    } else {
      return <p>Unsupported file format</p>;
    }
  };

  const handleCancel = () => {
    navigate("/portofolio");
  };

  return (
    <body>
      <section className="portfolio">
        <div className="container">
          <div className="section-title">
            <h2>Add Portfolio</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-7">
              <Form onSubmit={savePorto}>
                <Form.Group controlId="judul">
                  <Form.Label>
                    <h5>Judul</h5>
                  </Form.Label>
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
                  {errors.judul && (
                    <div className="invalid-feedback">{errors.judul}</div>
                  )}{" "}
                  {/* Menampilkan pesan kesalahan */}
                </Form.Group>
                <Form.Group controlId="deskripsi">
                  <Form.Label>
                    <h5>Deskripsi</h5>
                  </Form.Label>
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
                  {errors.title && (
                    <div className="invalid-feedback">{errors.title}</div>
                  )}{" "}
                  {/* Menampilkan pesan kesalahan */}
                </Form.Group>
                <Form.Group controlId="file">
                  <Form.Label style={{ marginTop: "15px" }}>
                    <h5>Pilih File</h5>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    onChange={loadFile}
                    className={errors.file ? "is-invalid" : ""}
                  />
                  {errors.file && (
                    <div className="invalid-feedback">{errors.file}</div>
                  )}{" "}
                  {/* Menampilkan pesan kesalahan */}
                </Form.Group>

                {file && (
                  <div
                    className="Container"
                    style={{ marginTop: "15px", marginLeft: "25px" }}
                  >
                    <div className="card add porto">{renderFilePreview()}</div>
                  </div>
                )}

                <div className="text-center">
                  <button
                    className="btn btn-secondary mt-3 me-3"
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
                    {isSubmitting ? "Adding..." : "Add Data"}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </body>
  );
};

export default AddPorto;