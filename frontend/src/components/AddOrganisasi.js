import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddOrganisasi = () => {
  const [namaOrganisasi, setNamaOrganisasi] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [periodeAwal, setPeriodeAwal] = useState("");
  const [periodeAkhir, setPeriodeAkhir] = useState("Sekarang");
  const [deskripsiJabatan, setDeskripsiJabatan] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const clearErrorMessage = () => {
    setErrorMsg("");
  };

  const handleNamaOrganisasiChange = (value) => {
    setNamaOrganisasi(value.toUpperCase());
    clearErrorMessage();
  };

  const handleJabatanChange = (value) => {
    setJabatan(value.toUpperCase());
    clearErrorMessage();
  };

  const handlePeriodeAwalChange = (value) => {
    setPeriodeAwal(value);
    clearErrorMessage();
  };

  const handlePeriodeAkhirChange = (value) => {
    setPeriodeAkhir(value);
    clearErrorMessage();
  };

  const handleDeskripsiJabatanChange = (value) => {
    setDeskripsiJabatan(value);
    clearErrorMessage();
  };

  const { user } = useSelector((state) => state.auth);
  const id = user && user.user && user.user.id_akun;

  const saveOrganisasi = async (e) => {
    e.preventDefault();

    // Reset pesan
    setErrorMsg("");
    setSuccessMessage("");

    const pesanKesalahan = [];

    // Periksa apakah semua kolom diisi
    if (!namaOrganisasi) {
      pesanKesalahan.push("Nama Organisasi tidak boleh kosong.");
    } else if (!/^[a-zA-Z0-9\s]+$/.test(namaOrganisasi)) {
      pesanKesalahan.push("Nama Organisasi tidak boleh mengandung simbol.");
    }

    if (!jabatan) {
      pesanKesalahan.push("Jabatan tidak boleh kosong.");
    } else if (!/^[a-zA-Z0-9\s]+$/.test(jabatan)) {
      pesanKesalahan.push("Jabatan tidak boleh mengandung simbol.");
    }

    if (!periodeAwal) {
      pesanKesalahan.push("Periode Awal tidak boleh kosong.");
    }

    if (parseInt(periodeAwal) > parseInt(periodeAkhir)) {
      pesanKesalahan.push("Periode Awal atau Periode Akhir tidak sesuai.");
    }

    if (!deskripsiJabatan) {
      pesanKesalahan.push("Deskripsi Jabatan tidak boleh kosong.");
    }

    if (pesanKesalahan.length > 0) {
      setErrorMsg(pesanKesalahan.join(" "));
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`http://localhost:5000/organisasi/${id}`, {
        id_akun: id,
        nama_organisasi: namaOrganisasi,
        jabatan: jabatan,
        periode_awal: periodeAwal,
        periode_akhir: periodeAkhir,
        deskripsi_jabatan: deskripsiJabatan,
      });

      setSuccessMessage("Organisasi berhasil ditambahkan!");

      // Tampilkan pesan keberhasilan selama 2 detik sebelum navigasi
      setTimeout(() => {
        navigate("/organisasi");
      }, 2000);
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/organisasi");
  };

  // Membuat array tahun dari 1977 sampai 2023
  const tahunOptions = [];
  for (let tahun = 1977; tahun <= 2023; tahun++) {
    tahunOptions.push(tahun);
  }

  return (
    <div>
      <section id="addOrganisasi" className="organisasi">
        <div className="container">
          <div className="section-title">
            <h2>Tambah Organisasi</h2>
          </div>
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          <div className="card-content">
            <div className="content">
              <form onSubmit={saveOrganisasi}>
                <p className="text-center text-danger">{errorMsg}</p>

                <div className="mb-3">
                  <label htmlFor="nama_organisasi" className="form-label">
                    <h5>Nama Organisasi</h5>
                    <input
                      value={namaOrganisasi}
                      onChange={(e) =>
                        handleNamaOrganisasiChange(e.target.value)
                      }
                      type="text"
                      className="form-control"
                      placeholder="Nama Organisasi"
                    />
                  </label>
                </div>

                <div className="mb-3">
                  <label htmlFor="jabatan" className="form-label">
                    <h5>Jabatan</h5>
                    <input
                      value={jabatan}
                      onChange={(e) => handleJabatanChange(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Jabatan"
                    />
                  </label>
                </div>

                <div className="mb-3">
                  <label htmlFor="periode_awal" className="form-label">
                    <h5>Periode Awal</h5>
                    <select
                      value={periodeAwal}
                      onChange={(e) => handlePeriodeAwalChange(e.target.value)}
                      className="form-select"
                    >
                      <option value="" disabled>
                        Pilih Tahun
                      </option>
                      {tahunOptions.map((tahun) => (
                        <option key={tahun} value={tahun}>
                          {tahun}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="mb-3">
                  <label htmlFor="periode_akhir" className="form-label">
                    <h5>Periode Akhir</h5>
                    <select
                      value={periodeAkhir}
                      onChange={(e) => handlePeriodeAkhirChange(e.target.value)}
                      className="form-select"
                    >
                      <option value="Sekarang">Sekarang</option>
                      {tahunOptions.map((tahun) => (
                        <option key={tahun} value={tahun}>
                          {tahun}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="mb-3">
                  <label htmlFor="deskripsi_jabatan" className="form-label">
                    <h5>Deskripsi Jabatan</h5>
                    <textarea
                      value={deskripsiJabatan}
                      onChange={(e) =>
                        handleDeskripsiJabatanChange(e.target.value)
                      }
                      className="form-control"
                      rows="4"
                      placeholder="Deskripsi Jabatan"
                    ></textarea>
                  </label>
                </div>


                <div className="text-center">
                  <button
                    className="btn btn-secondary mt-3 me-3"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    Batal
                  </button>
                  <button
                    className="btn btn-primary mt-3"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Menambahkan..." : "Tambah Data"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddOrganisasi;
