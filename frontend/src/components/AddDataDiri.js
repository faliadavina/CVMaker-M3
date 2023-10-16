import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../features/authSlice";
import Sidebar from "../pages/Sidebar";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const AddDataDiri = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.auth);

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
          `http://localhost:5000/akun/${id_akun}`
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
    tempat_lahir: "",
    tanggal_lahir: "",
    alamat: "",
    status: "",
    telp: "",
    sosial_media: "",
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

  const loadImage = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
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
        `http://localhost:5000/akun/${id_akun}`,
        { email: email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await axios.post(
        `http://localhost:5000/users/${id_akun}`,
        formDataObject,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      //toast.success("Your personal data added successfully !");
      alert("Your personal data added successfully !");
      navigate("/data_diri");
    } catch (error) {
      console.log(error);
      //toast.error("Cannot add your input, please try again");
      alert("Cannot add your input, please try again");
    }
  };

  // Tombol Cancel
  const handleCancelClick = () => {
    navigate("/data_diri");
  };

  return (
    <body>
      <Sidebar />

      <main id="main">
        <section class="inner-page">
          <div class="container">
            <div class="section-title d-flex justify-content-between align-items-center">
              <h2>Add Your Personal Data</h2>
            </div>
            <form onSubmit={saveDataDiri} class="php-email-form">
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="name">Name</label>
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
                  <label className="label">Profile Picture</label>
                  <div className="control">
                    <div className="file">
                      <label className="file-label">
                        <input
                          type="file"
                          className="file-input"
                          onChange={loadImage}
                        />
                      </label>
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
                    <label className="label">Preview</label>
                    <figure className="image is-128x128">
                      <img src={preview} alt="" />
                    </figure>
                  </div>
                )}
                <div class="form-group">
                  <label for="name">Self Introduction</label>
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
                  <label for="name">Birth Place</label>
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
                  <label for="name">Birth Date</label>
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
                  <label for="name">Address</label>
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
                <div class="form-group col-md-6">
                  <label for="name">Marriage Status</label>
                  <input
                    type="text"
                    className="form-control"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    placeholder="Enter your marriage status"
                    required
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="name">Email</label>
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
                  <label for="name">Phone Number</label>
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
                  {telpError && (
                    <span style={{ color: "red" }}>{telpError}</span>
                  )}
                </div>
                <div class="form-group col-md-6">
                  <label for="name">Social Media</label>
                  <input
                    type="text"
                    className="form-control"
                    id="sosial_media"
                    name="sosial_media"
                    value={formData.sosial_media}
                    onChange={handleChange}
                    placeholder="Enter your social media (instagram/twitter/facebook)"
                    required
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="name">Linked In</label>
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
              </div>
              <div class="text-center">
                <button
                  className="btn btn-secondary mt-5 me-3"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
                <button class="btn btn-primary mt-5" type="submit">
                  Save Changes
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
      </main>
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
