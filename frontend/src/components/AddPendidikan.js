import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../pages/Sidebar";


const AddPendidikan = () => {
  const [jenjang, setJenjang] = useState("");
  const [nama_sekolah, setNamaSekolah] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [tahun_masuk, setTahunMasuk] = useState("");
  const [tahun_lulus, setTahunLulus] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  
  const [jenjangFilled, setJenjangFilled] = useState(false);
  const [namaSekolahFilled, setNamaSekolahFilled] = useState(false);
  const [jurusanFilled, setJurusanFilled] = useState(false);
  const [tahunMasukFilled, setTahunMasukFilled] = useState(false);
  const [tahunLulusFilled, setTahunLulusFilled] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const clearErrorMessage = () => {
    setMsg("");
  };

  const handleJenjangChange = (value) => {
    setJenjang(value);
    clearErrorMessage();
    setJenjangFilled(!!value);
  }

  const handleNamaSekolahChange = (value) => {
    setNamaSekolah(value);
    clearErrorMessage();
    setNamaSekolahFilled(!!value);
  }

  const handleJurusanChange = (value) => {
    setJurusan(value);
    clearErrorMessage();
    setJurusanFilled(!!value);
  }

  const handleTahunMasukChange = (value) => {
    setTahunMasuk(value);
    clearErrorMessage();
    setTahunMasukFilled(!!value);
  }

  const handleTahunLulusChange = (value) => {
    setTahunLulus(value);
    clearErrorMessage();
    setTahunLulusFilled(!!value);
  }

  const { user } = useSelector((state) => state.auth);
  const id = user && user.user && user.user.id_akun;

  const savePendidikan = async (e) => {
    e.preventDefault();

    // Reset error message
    setMsg("");

    // Check if all fields are filled
    if (!jenjangFilled || !namaSekolahFilled || !jurusanFilled || !tahunMasukFilled || !tahunLulusFilled) {
      setMsg("Please fill in all required fields.");
      return;
    }

    const yearRegex = /^\d{4}$/;

    // Contoh penggunaan dalam validasi tahun_masuk dan tahun_lulus
    if (!yearRegex.test(tahun_masuk) || !yearRegex.test(tahun_lulus)) {
      setMsg("Tahun masuk dan tahun lulus harus berupa 4 digit angka.");
      if(!yearRegex.test(tahun_masuk)) {
        setTahunMasukFilled(false);
      } else {
        setTahunLulusFilled(false);
      }
      return;
    }

    try {
      await axios.post(`http://localhost:5000/pendidikan/${id}`, {
        jenjang : jenjang,
        nama_sekolah : nama_sekolah,
        jurusan : jurusan,
        tahun_masuk : tahun_masuk,
        tahun_lulus : tahun_lulus,
      });
      setSuccessMessage("Education added successfully!");      // Show success message for 2 seconds before navigating
      setTimeout(() => {
        navigate("/pendidikan");
      }, 2000);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  };


  const handleCancel = () => {
    navigate("/pendidikan");
  };

  return (
    <div>
      <Sidebar />
      <main id="main">
        <section id="addPendidikan" className="addPendidikan">
          <div className="container">
            <div className="section-title">
              <h2>Add Education</h2>
            </div>
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
            <div className="card-content">
              <div className="content">
                <form onSubmit={savePendidikan}>
                  <p className="text-center text-danger">{msg}</p>

                  <div className="mb-3">
                    <label htmlFor="jenjang" className="form-label">
                      <h5>Jenjang Pendidikan</h5>
                      <input 
                        value={jenjang}
                        onChange={(e) => handleJenjangChange(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Jenjang"/>
                    </label>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="nama_sekolah" className="form-label">
                      <h5>Nama Instansi Pendidikan</h5>
                      <input 
                        value={nama_sekolah}
                        onChange={(e) => handleNamaSekolahChange(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Nama Instansi Pendidikan"/>
                    </label>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="jurusan" className="form-label">
                      <h5>Jurusan</h5>
                      <input 
                        value={jurusan}
                        onChange={(e) => handleJurusanChange(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Jurusan"/>
                    </label>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="tahun_masuk" className="form-label">
                      <h5>Tahun Masuk</h5>
                      <input 
                        value={tahun_masuk}
                        onChange={(e) => handleTahunMasukChange(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Tahun Masuk"/>
                    </label>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="tahun_lulus" className="form-label">
                      <h5>Tahun Lulus</h5>
                      <input 
                        value={tahun_lulus}
                        onChange={(e) => handleTahunLulusChange(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Tahun Lulus"/>
                    </label>
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
      {/* End #main */}
    </div>
  );
};

export default AddPendidikan;
