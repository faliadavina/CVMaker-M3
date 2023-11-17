import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditOrganisasi = () => {
  const { id_org } = useParams();
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

  const { user } = useSelector((state) => state.auth);
  const id_akun = user && user.user && user.user.id_akun;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/organisasi/akun/${id_akun}/organisasi/${id_org}`
        );
        const organisasiData = response.data.organisasi;

        setNamaOrganisasi(organisasiData.nama_organisasi);
        setJabatan(organisasiData.jabatan);
        setPeriodeAwal(organisasiData.periode_awal);
        setPeriodeAkhir(organisasiData.periode_akhir || "Sekarang");
        setDeskripsiJabatan(organisasiData.deskripsi_jabatan);

        console.log("organisasi di edit:", response.data.organisasi);
      } catch (error) {
        console.error("Error fetching organization data:", error);
      }
    };
    fetchData();
  }, [id_akun, id_org]);

  const handleNamaOrganisasiChange = (value) => {
    setNamaOrganisasi(value);
    clearErrorMessage();
  };

  const handleJabatanChange = (value) => {
    setJabatan(value);
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

  const updateOrganisasi = async (e) => {
    e.preventDefault();

    // Reset error messages
    setErrorMsg("");
    setSuccessMessage("");

    // Check if all fields are filled
    if (!namaOrganisasi || !jabatan || !periodeAwal || !deskripsiJabatan) {
      setErrorMsg("Please fill in all required fields.");

      if (!namaOrganisasi) {
        setErrorMsg("Nama Organisasi cannot be empty.");
      } else if (!/^[a-zA-Z0-9\s]+$/.test(namaOrganisasi)) {
        setErrorMsg("Nama Organisasi cannot contain symbols.");
      }

      if (!jabatan) {
        setErrorMsg("Jabatan cannot be empty.");
      } else if (!/^[a-zA-Z0-9\s]+$/.test(jabatan)) {
        setErrorMsg("Jabatan cannot contain symbols.");
      }

      if (!periodeAwal) {
        setErrorMsg("Periode Awal cannot be empty.");
      }

      if (!deskripsiJabatan) {
        setErrorMsg("Deskripsi Jabatan cannot be empty.");
      }

      return;
    }

    setIsSubmitting(true);

    try {
      await axios.put(`http://localhost:5000/organisasi/${id_org}`, {
        id_akun: id_akun,
        nama_organisasi: namaOrganisasi,
        jabatan: jabatan,
        periode_awal: periodeAwal,
        periode_akhir: periodeAkhir,
        deskripsi_jabatan: deskripsiJabatan,
      });

      setSuccessMessage("Organization updated successfully!");

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

  const tahunOptions = [];
  for (let tahun = 1977; tahun <= 2023; tahun++) {
    tahunOptions.push(tahun);
  }

  return (
    <div>
      <section id="editOrganisasi" className="editOrganisasi">
        <div className="container">
          <div className="section-title">
            <h2>Edit Organization</h2>
          </div>
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          <div className="card-content">
            <div className="content">
              <form onSubmit={updateOrganisasi}>
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

                {errorMsg && (
                  <p className="text-center text-danger">{errorMsg}</p>
                )}

                <div className="text-center">
                  <button
                    className="btn btn-secondary mt-3 me-3"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary mt-3"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update Data"}
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

export default EditOrganisasi;
