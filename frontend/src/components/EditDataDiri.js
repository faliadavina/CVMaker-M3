import React,{useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
// import path from "path";

const EditDataDiri = () => {

    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { user } = useSelector((state) => state.auth);
    const id_akun = user && user.user && user.user.id_akun;

    console.log(id_akun);

    // Mengambil email dari data akun
    const [email, setEmail] = useState('');
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/akun/${id_akun}`);

            // Mengatur email sebagai nilai awal dari data akun
            setEmail(response.data.akunById.email);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [id_akun]);

    const [emailError, setEmailError] = useState('');
    
    // Menangani perubahan nilai input email
    const handleEmailChange = (e) => {
      const emailValue = e.target.value;
      setEmail(emailValue);

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailValue)) {
          setEmailError('Invalid email format!');
      } else {
          setEmailError('');
      }
    };


    // Mengambil semua data dari data diri
    const [nama, setNama] = useState('');
    const [tempat_lahir, setTempatLahir] = useState('');
    const [tanggal_lahir, setTanggalLahir] = useState('');
    const [alamat, setAlamat] = useState('');
    const [status, setStatus] = useState('');
    const [telp, setTelp] = useState('');
    const [sosial_media, setSosialMedia] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [file, setFile] = useState('');
    const [preview, setPreview] = useState('');
    const [profesi, setProfesi] = useState('');
    const [twitter, setTwitter] = useState('');

    const maxDeskripsiLength = 500;

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/users/${id_akun}`);
            console.log(response.data);

            // Mengatur data-data pada data diri sebagai nilai awal
            setNama(response.data.nama);
            setTempatLahir(response.data.tempat_lahir);
            setTanggalLahir(response.data.tanggal_lahir);
            setAlamat(response.data.alamat);
            setStatus(response.data.status);
            setTelp(response.data.telp);
            setSosialMedia(response.data.sosial_media);
            setLinkedin(response.data.linkedin);
            setDeskripsi(response.data.deskripsi);
            setFile(response.data.profile_pict);
            setPreview(response.data.url);
            setTwitter(response.data.twitter);
            setProfesi(response.data.profesi);

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
    }, [id_akun]);

    const [telpError, setTelpError] = useState('');
    
    // Menangani perubahan nilai input
    const handleDataDiriChange = (e) => {
        const { name, value } = e.target;

        // Validasi input telepon menggunakan ekspresi reguler
        if (name === 'telp') {
          if (!/^[0-9]{10,12}$/.test(value) || value.length < 10 || value.length > 12 || !/^08/.test(value)) {
              // Set pesan kesalahan jika format nomor telepon tidak valid
              setTelpError('Phone number must consist of 10-12 digits and start with 08!');
          } else {
              // Bersihkan pesan kesalahan jika valid
              setTelpError('');
          }
        }

        //Formatting huruf kapital
        const shouldConvertToUpperCase = ["nama", "tempat_lahir", "alamat", "status", "linkedin", "profesi"].includes(name);
        const formattedValue = shouldConvertToUpperCase ? value.toUpperCase() : value;
      
        // Menggunakan switch case untuk menentukan variabel mana yang akan diubah
        switch (name) {
            case 'nama':
                setNama(formattedValue);
                break;
            case 'profesi':
                  setProfesi(formattedValue);
                break;
            case 'tempat_lahir':
                setTempatLahir(formattedValue);
                break;
            case 'tanggal_lahir':
                setTanggalLahir(value);
                break;
            case 'alamat':
                setAlamat(formattedValue);
                break;
            case 'status':
                setStatus(formattedValue);
                break;
            case 'telp':
                setTelp(value);
                break;
            case 'sosial_media':
                setSosialMedia(value);
                break;
            case 'twitter':
                  setTwitter(value);
                break;
            case 'linkedin':
                setLinkedin(formattedValue);
                break;
            // case 'deskripsi':
            //     setDeskripsi(value);
            //     break;
            default:
                break;
        }
      };

      // Menangani input deskripsi (Membatasi 1000 karakter)
      const handleDeskripsiChange = (e) => {
        const inputText = e.target.value;
        // Memastikan jumlah karakter tidak melebihi batas maksimal
        if (inputText.length <= maxDeskripsiLength) {
          setDeskripsi(inputText);
        }
      };
      
      const [fileError, setFileError] = useState('');
      const loadImage = (e) => {
        const selectedFile = e.target.files[0];

        // Validasi tipe file
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        const fileType = selectedFile ? selectedFile.type : '';
      
        if (!allowedTypes.includes(fileType.toLowerCase())) {
          setFileError('Invalid file type. Please upload an image (png, jpg, jpeg).');
        } else {
          setFileError('');
        }
      
        // Validasi ukuran file
        const maxSize = 5 * 1024 * 1024; // 5 MB
        const fileSize = selectedFile ? selectedFile.size : 0;
      
        if (fileSize > maxSize) {
          setFileError('File size must be less than 5 MB.');
        } else {
          setFileError('');
        }
      
        // Set file dan preview jika valid
        if (!fileError) {
          setFile(selectedFile);
          setPreview(URL.createObjectURL(selectedFile));
        }
      };

      const handleStatusChange = (e) => {
          // Update nilai status sesuai dengan opsi yang dipilih
          setStatus(e.target.value);
      };

    // Menyimpan Perubahan
    const saveDataDiri = async (e) => {
      e.preventDefault();

      // Validasi nomor telepon
      if (telpError) {
        // Tampilkan pesan kesalahan jika format nomor telepon tidak valid
        console.log('Phone number must consist of 10-12 digits and start with 08!');
        return;
      }

      if (emailError) {
        console.log('Invalid email format!');
        return;
      }

        try {

          const formDataObject = new FormData();

          // Memasukkan data ke dalam FormData
          formDataObject.append('nama', nama);
          formDataObject.append('profesi', profesi);
          formDataObject.append('tempat_lahir', tempat_lahir);
          formDataObject.append('tanggal_lahir', tanggal_lahir);
          formDataObject.append('alamat', alamat);
          formDataObject.append('status', status);
          formDataObject.append('telp', telp);
          formDataObject.append('email', email);
          formDataObject.append('sosial_media', sosial_media);
          formDataObject.append('twitter', twitter);
          formDataObject.append('linkedin', linkedin);
          formDataObject.append('deskripsi', deskripsi);
          formDataObject.append('file', file);

          await axios.patch(`http://localhost:5000/akun/${id_akun}`,{ email: email },{
            headers: {
              'Content-Type': 'application/json',
              },
            }
          );

          await axios.patch(`http://localhost:5000/users/${id_akun}`, formDataObject , {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
          });

          setSuccessMessage("Your Personal Data Updated Successfully!");
          // Show success message for 2 seconds before navigating
          setTimeout(() => {
            navigate("/data_diri");
          }, 2000);

        } catch (error) {
            console.log(error);
            setErrorMessage("Cannot Update Your Personal Data Input, Please Try Again");
            setTimeout(() => {
              setErrorMessage("");
            }, 4000);
        } 
    };

  // Tombol Cancel
  const handleCancelClick = () => {
    navigate('/data_diri');
  };

    return (
        <body>
          <section class="inner-page">
            <div class="container">
              <div class="section-title d-flex justify-content-between align-items-center">
                <h2>Edit Your Personal Data</h2>
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
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label for="name"><h5>Name</h5></label>
                            <input
                                type="text"
                                className="form-control"
                                id="nama"
                                name="nama"
                                value={nama}
                                onChange={handleDataDiriChange}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                        <div className="form-group col-md-6">
                          <label className="label"><h5>Profile Picture</h5></label>
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
                                    <label className="file-label">
                                    </label>
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
                            <label for="name"><h5>Self Introduction</h5></label>
                            <textarea
                                className="form-control"
                                id="deskripsi"
                                name="deskripsi"
                                rows="8"
                                value={deskripsi}
                                onChange={handleDeskripsiChange}
                                placeholder="Write your brief self introduction here ..."
                                required
                            />
                            <p> {deskripsi.length} / {maxDeskripsiLength} </p>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="name"><h5>Birth Place</h5></label>
                            <input
                                type="text"
                                className="form-control"
                                id="tempat_lahir"
                                name="tempat_lahir"
                                value={tempat_lahir}
                                onChange={handleDataDiriChange}
                                placeholder="Enter your birth place"
                                required
                            />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="name"><h5>Profession</h5></label>
                            <input
                                type="text"
                                className="form-control"
                                id="profesi"
                                name="profesi"
                                value={profesi}
                                onChange={handleDataDiriChange}
                                placeholder="Enter your current profession"
                                required
                            />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="name"><h5>Birth Date</h5></label>
                            <input
                                type="date"
                                className="form-control"
                                id="tanggal_lahir"
                                name="tanggal_lahir"
                                value={tanggal_lahir}
                                onChange={handleDataDiriChange}
                                placeholder="Enter your birth date"
                                required
                            />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="name"><h5>Address</h5></label>
                            <input
                                type="text"
                                className="form-control"
                                id="alamat"
                                name="alamat"
                                value={alamat}
                                onChange={handleDataDiriChange}
                                placeholder="Enter your address"
                                required
                            />
                        </div>
                        <div className="form-group col-md-6">
                          <label for="name"><h5>Marriage Status</h5></label>
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
                            <label for="name"><h5>Email</h5></label>
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
                            {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
                        </div>
                        <div class="form-group col-md-6">
                            <label for="name"><h5>Phone Number</h5></label>
                            <input
                                type="text"
                                className="form-control"
                                id="telp"
                                name="telp"
                                value={telp}
                                onChange={handleDataDiriChange}
                                placeholder="Enter your phone number"
                                required
                            />
                            {telpError && <span style={{ color: 'red' }}>{telpError}</span>}
                        </div>
                        <div class="form-group col-md-6">
                            <label for="name"><h5>Instagram</h5></label>
                            <input
                                type="text"
                                className="form-control"
                                id="sosial_media"
                                name="sosial_media"
                                value={sosial_media}
                                onChange={handleDataDiriChange}
                                placeholder="Enter your instagram username"
                                required
                            />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="name"><h5>Linked In</h5></label>
                            <input
                                type="text"
                                className="form-control"
                                id="linkedin"
                                name="linkedin"
                                value={linkedin}
                                onChange={handleDataDiriChange}
                                placeholder="Enter your linkedin username"
                                required
                            />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="name"><h5>Twitter</h5></label>
                            <input
                                type="text"
                                className="form-control"
                                id="twitter"
                                name="twitter"
                                value={twitter}
                                onChange={handleDataDiriChange}
                                placeholder="Enter your twitter username"
                                required
                            />
                        </div>
                    </div>
                    <div class="text-center">
                      <button className="btn btn-secondary mt-5 me-3" onClick={handleCancelClick}>Cancel</button>
                      <button class="btn btn-primary mt-5" type="submit">Save Change</button>
                    </div>
                </form>
            </div>
          </section>
      
     
      
        <a href="#about" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
        </body> 
    )
}


export default EditDataDiri;