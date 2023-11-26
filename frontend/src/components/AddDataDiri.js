import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../features/authSlice";

const AddDataDiri = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  const { user } = useSelector((state) => state.auth);
  const id_akun = user && user.user && user.user.id_akun;

  console.log(id_akun);

  // Mengambil email dari data akun
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://194.233.93.124:8000/akun/${id_akun}`
        );

        // Mengatur email sebagai nilai awal dari data akun
        setEmail(response.data.akunById.email);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id_akun]);

  const [emailError, setEmailError] = useState("");

  // Menangani perubahan nilai input email
  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError("Invalid email format!");
    } else {
      setEmailError("");
    }
  };

  // Menambah Data Diri
  const [formData, setFormData] = useState({
    nama: "",
    profesi: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    alamat: "",
    status: "",
    telp: "",
    sosial_media: "",
    twitter: "",
    linkedin: "",
    deskripsi: "",
  });

  const maxDeskripsiLength = 500;
  const [telpError, setTelpError] = useState("");

  // Menyimpan Perubahan
  const handleChange = (e) => {
    const { name, value } = e.target;

    //Formatting huruf kapital
    const shouldConvertToUpperCase = [
      "nama",
      "profesi",
      "tempat_lahir",
      "alamat",
      "status",
      "linkedin",
    ].includes(name);
    const formattedValue = shouldConvertToUpperCase
      ? value.toUpperCase()
      : value;
    const truncatedValue =
      name === "deskripsi"
        ? formattedValue.substring(0, maxDeskripsiLength)
        : formattedValue;
    setFormData((prevData) => ({
      ...prevData,
      [name]: truncatedValue,
    }));

    // Validasi nomor telepon
    if (name === "telp") {
      if (
        !/^[0-9]{10,12}$/.test(value) ||
        value.length < 10 ||
        value.length > 12 ||
        !/^08/.test(value)
      ) {
        setTelpError(
          "Phone number must consist of 10-12 digits and start with 08!"
        );
      } else {
        setTelpError("");
      }
    }
  };

  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");

  const [fileError, setFileError] = useState('');
  const loadImage = (e) => {
    const selectedFile = e.target.files[0];

    // Validasi tipe file
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const fileType = selectedFile ? selectedFile.type : '';

    // Validasi ukuran file
    const maxSize = 5 * 1024 * 1024; // 5 MB
    const fileSize = selectedFile ? selectedFile.size : 0;

    let error = '';

    if (!allowedTypes.includes(fileType.toLowerCase())) {
      error = 'Invalid file type. Please upload an image (png, jpg, jpeg).';
    } else if (fileSize > maxSize) {
      error = 'File size must be less than 5 MB.';
    }

    // Set file dan preview jika valid
    if (!error) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }

    // Set pesan error jika tidak valid
    setFileError(error);
  };

  const [status, setStatus] = useState("");
  const handleStatusChange = (e) => {
    // Update nilai status sesuai dengan opsi yang dipilih
    setStatus(e.target.value);
  };

  const saveDataDiri = async (e) => {
    e.preventDefault();
    if (telpError) {
      console.log(
        "Phone number must consist of 10-12 digits and start with 08!"
      );
      return;
    }

    if (emailError) {
      console.log("Invalid email format!");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataObject = new FormData();

      // Memasukkan data ke dalam FormData
      for (const key in formData) {
        formDataObject.append(key, formData[key]);
      }

      // Menambahkan file foto profil ke FormData
      formDataObject.append("file", file);

      // Log isi formDataObject sebelum mengirimnya ke server
      for (var pair of formDataObject.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      await axios.patch(
        `http://194.233.93.124:8000/akun/${id_akun}`,
        { email: email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await axios.post(
        `http://194.233.93.124:8000/users/${id_akun}`,
        formDataObject,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(id_akun);

      setSuccessMessage("Your Personal Data added successfully!");
      // Show success message for 2 seconds before navigating
      setTimeout(() => {
        navigate("/data_diri");
      }, 2000);
    } catch (error) {
      console.log(error);
      setErrorMessage("Cannot Add Your Personal Data Input, Please Try Again");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    } finally {
      setIsSubmitting(false); // Menandakan bahwa permintaan telah selesai
    }
  };

  // Tombol Cancel
  const handleCancelClick = () => {
    navigate("/data_diri");
  };

  return (
    <body>
      <section class="about">
        <div class="container">
          <div class="section-title d-flex justify-content-between align-items-center">
            <h2>Add Your Personal Data</h2>
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
          <form onSubmit={saveDataDiri} class="php-email-form">
            <p className="text-center text-danger">{msg}</p>
            <div class="row">
              <div class="form-group col-md-6">
                <label for="name">
                  <h5>Name</h5>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label className="label">
                  <h5>Profile Picture</h5>
                </label>
                <div className="control">
                  <div className="file">
                    <label className="file-label">
                      <input
                        type="file"
                        className="file-input"
                        onChange={loadImage}
                      />
                    </label>
                    <br/>
                    {fileError && <span style={{ color: 'red' }}>{fileError}</span>}
                  </div>
                </div>
              </div>

              <div className="form-group col-md-6">
                <label className="label"></label>
                <div className="control">
                  <div className="file">
                    <label className="file-label"></label>
                  </div>
                </div>
              </div>

              {preview && (
                <div className="form-group col-md-6">
                  <label className="label">
                    <h5>Preview</h5>
                  </label>
                  <figure className="image is-128x128">
                    <img src={preview} alt="" />
                  </figure>
                </div>
              )}
              <div class="form-group">
                <label for="name">
                  <h5>Self Introduction</h5>
                </label>
                <textarea
                  className="form-control"
                  id="deskripsi"
                  name="deskripsi"
                  rows="8"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  placeholder="Write your brief self introduction here ..."
                  required
                />
                <p>
                  {" "}
                  {formData.deskripsi.length} / {maxDeskripsiLength}{" "}
                </p>
              </div>
              <div class="form-group col-md-6">
                <label for="name">
                  <h5>Birth Place</h5>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tempat_lahir"
                  name="tempat_lahir"
                  value={formData.tempat_lahir}
                  onChange={handleChange}
                  placeholder="Enter your birth place"
                  required
                />
              </div>
              <div class="form-group col-md-6">
                <label for="profesi">
                  <h5>Profesi</h5>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="profesi"
                  name="profesi"
                  value={formData.profesi}
                  onChange={handleChange}
                  placeholder="Enter your current profession"
                  required
                />
              </div>              
              <div class="form-group col-md-6">
                <label for="name">
                  <h5>Birth Date</h5>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="tanggal_lahir"
                  name="tanggal_lahir"
                  value={formData.tanggal_lahir}
                  onChange={handleChange}
                  placeholder="Enter your birth date"
                  required
                />
              </div>
              <div class="form-group col-md-6">
                <label for="name">
                  <h5>Address</h5>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="alamat"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label for="name">
                  <h5>Marriage Status</h5>
                </label>
                <select
                  className="form-control"
                  id="status"
                  name="status"
                  value={status}
                  onChange={handleStatusChange}
                  required
                >
                  <option value="">Select Marriage Status</option>
                  <option value="Menikah">MENIKAH</option>
                  <option value="Belum Menikah">BELUM MENIKAH</option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label for="name">
                  <h5>Email</h5>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  required
                />
                {emailError && (
                  <span style={{ color: "red" }}>{emailError}</span>
                )}
              </div>
              <div class="form-group col-md-6">
                <label for="name">
                  <h5>Phone Number</h5>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="telp"
                  name="telp"
                  value={formData.telp}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
                {telpError && <span style={{ color: "red" }}>{telpError}</span>}
              </div>
              <div class="form-group col-md-6">
                <label for="instagram">
                  <h5>Instagram</h5>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sosial_media"
                  name="sosial_media"
                  value={formData.sosial_media}
                  onChange={handleChange}
                  placeholder="Enter your instagram username"
                  required
                />
              </div>
              <div class="form-group col-md-6">
                <label for="name">
                  <h5>Linked In</h5>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="Enter your linkedin username"
                  required
                />
              </div>
              <div class="form-group col-md-6">
                <label for="twitter">
                  <h5>Twitter</h5>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="Enter your twitter username"
                  required
                />
              </div>
            </div>
            <div className="text-center">
              <button
                className="btn btn-secondary mt-3 me-3"
                onClick={handleCancelClick}
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
          </form>
          {/* {data_akun && (
                    <ul>
                        <li><i class="bi bi-chevron-right"></i> <strong>Nama:</strong> <span>{data_akun.akunById.email}</span></li>
			        </ul>
                )} */}
        </div>
      </section>
      {/* End #main */}

      <a
        href="#about"
        class="back-to-top d-flex align-items-center justify-content-center"
      >
        <i class="bi bi-arrow-up-short"></i>
      </a>
    </body>
  );
};

export default AddDataDiri;
