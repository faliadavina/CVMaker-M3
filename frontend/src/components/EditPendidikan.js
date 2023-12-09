import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditPendidikan = () => {
  const { id_pend } = useParams();
  const [jenjang, setJenjang] = useState("");
  const [nama_sekolah, setNamaSekolah] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [tahun_masuk, setTahunMasuk] = useState(new Date().getFullYear()); // Menggunakan integer untuk tahun
  const [tahun_lulus, setTahunLulus] = useState(""); // Menggunakan integer untuk tahun
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [jenjangLainnya, setJenjangLainnya] = useState(""); // Untuk input "Lainnya"

  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const id_akun = user && user.user && user.user.id_akun;

  const clearErrorMessage = () => {
    setMsg("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/pendidikan/akun/${id_akun}/pendidikan/${id_pend}`
        );
        const dataPendidikan = response.data.pendidikan;
        setJenjang(dataPendidikan.jenjang);
        setNamaSekolah(dataPendidikan.nama_sekolah);
        setJurusan(dataPendidikan.jurusan);
        setTahunMasuk(dataPendidikan.tahun_masuk);
        setTahunLulus(dataPendidikan.tahun_lulus);
        // Check if the retrieved 'tahun_lulus' is 'Sekarang'
        if (dataPendidikan.tahun_lulus === "Sekarang") {
          setTahunLulus("Sekarang"); // Set the state to "Sekarang" for dropdown
        }

        console.log("pendidikan di edit:", response.data.pendidikan);
      } catch (error) {
        console.error("Error fetching education data:", error);
      }
    };
    fetchData();
  }, [id_akun, id_pend]);

  const handleJenjangChange = (value) => {
    if (value === "Lainnya") {
      setJenjang("Lainnya"); // Reset nilai dropdown
    } else {
      setJenjang(value); // Tetapkan nilai dropdown
    }
    clearErrorMessage();
  };

  const handleNamaSekolahChange = (value) => {
    setNamaSekolah(value);
    clearErrorMessage();
  };

  const handleJurusanChange = (value) => {
    setJurusan(value);
    clearErrorMessage();
  };

  const handleTahunMasukChange = (year) => {
    if (year > tahun_lulus) {
      setErrorMsg(
        "Tahun masuk harus lebih kecil atau sama dengan tahun lulus."
      );
    } else {
      setTahunMasuk(year); // Menggunakan integer untuk tahun masuk
      clearErrorMessage();
    }
  };

  const handleTahunLulusChange = (year) => {
    if (year === "Sekarang") {
      setTahunLulus("Sekarang");
      setErrorMsg("");
    } else {
      if (year < tahun_masuk) {
        setErrorMsg(
          "Tahun lulus harus lebih besar atau sama dengan tahun masuk."
        );
      } else {
        setTahunLulus(year.toString()); // Mengubah ke tipe string sebelum disimpan
        setErrorMsg("");
      }
    }
  };

  function generateYearOptions(includeNowOption = false) {
    const startYear = 1970;
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = startYear; year <= currentYear; year++) {
      years.push(year);
    }
    if (includeNowOption) {
      years.push("Sekarang");
    }

    return years.map((year) => (
      <option key={year} value={year}>
        {year === "Sekarang" ? "Sekarang" : year}
      </option>
    ));
  }

  const savePendidikan = async (e) => {
    e.preventDefault();

    // Reset error message
    setMsg("");

    setIsSubmitting(true);

    try {
      let jenjangToSend = jenjang;
      if (jenjang === "Lainnya" && jenjangLainnya.trim() !== "") {
        jenjangToSend = jenjangLainnya;
      }

      let tahunLulusToSend = tahun_lulus;
      if (tahun_lulus === "Sekarang") {
        tahunLulusToSend = "Sekarang"; // Kirim string "Sekarang" ke basis data
      }

      await axios.patch(`http://localhost:5000/pendidikan/${id_pend}`, {
        jenjang: jenjangToSend,
        nama_sekolah: nama_sekolah,
        jurusan: jurusan,
        tahun_masuk: tahun_masuk, // Menggunakan integer untuk tahun masuk
        tahun_lulus: tahunLulusToSend, // Menggunakan integer untuk tahun lulus
      });
      setSuccessMessage("Educational data updated successfully!");
      // Show success message for 2 seconds before navigating
      setTimeout(() => {
        navigate("/pendidikan");
      }, 2000);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    } finally {
      setIsSubmitting(false); // Menandakan bahwa permintaan telah selesai
    }
  };

  const handleCancel = () => {
    navigate("/pendidikan");
  };

  return (
    <div>
      <section id="editPendidikan" className="pendidikan">
        <div className="container">
          <div className="section-title">
            <h2>Edit Education</h2>
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
                    <select
                      value={jenjang}
                      onChange={(e) => handleJenjangChange(e.target.value)}
                      className="form-select"
                    >
                      <option value="" disabled>
                        Pilih Jenjang
                      </option>
                      <option value="SMA">SMA</option>
                      <option value="SMK">SMK</option>
                      <option value="D3">D3</option>
                      <option value="S1">S1</option>
                      <option value="D4">D4</option>
                      <option value="S2">S2</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </label>
                </div>

                {jenjang === "Lainnya" ? (
                  <div className="mb-3">
                    <label htmlFor="jenjang_lainnya" className="form-label">
                      <h5>Jenjang Pendidikan (Lainnya)</h5>
                      <input
                        value={jenjangLainnya}
                        onChange={(e) => setJenjangLainnya(e.target.value.toUpperCase)}
                        type="text"
                        className="form-control"
                        placeholder="Jenjang Lainnya"
                      />
                    </label>
                  </div>
                ) : null}

                <div className="mb-3">
                  <label htmlFor="nama_sekolah" className="form-label">
                    <h5>Nama Instansi Pendidikan</h5>
                    <input
                      value={nama_sekolah}
                      onChange={(e) =>
                        handleNamaSekolahChange(e.target.value.toUpperCase())
                      }
                      type="text"
                      className="form-control"
                      placeholder="Nama Instansi Pendidikan"
                    />
                  </label>
                </div>

                <div className="mb-3">
                  <label htmlFor="jurusan" className="form-label">
                    <h5>Jurusan</h5>
                    <input
                      value={jurusan}
                      onChange={(e) =>
                        handleJurusanChange(e.target.value.toUpperCase())
                      }
                      type="text"
                      className="form-control"
                      placeholder="Jurusan"
                    />
                  </label>
                </div>

                <div className="mb-3">
                  <label htmlFor="tahun_masuk" className="form-label">
                    <h5>Tahun Masuk</h5>
                    <select
                      value={tahun_masuk}
                      onChange={(e) =>
                        handleTahunMasukChange(parseInt(e.target.value))
                      }
                      className="form-select"
                    >
                      <option value="" disabled>
                        Pilih Tahun
                      </option>
                      {generateYearOptions()}
                    </select>
                  </label>
                </div>

                <div className="mb-3">
                  <label htmlFor="tahun_lulus" className="form-label">
                    <h5>Tahun Lulus</h5>
                    <select
                      value={tahun_lulus}
                      onChange={(e) =>
                        handleTahunLulusChange(parseInt(e.target.value))
                      }
                      className="form-select"
                    >
                      <option value="" disabled>
                        Pilih Tahun
                      </option>
                      {generateYearOptions(true)}
                    </select>
                  </label>
                </div>

                {errorMsg && <p className="text-danger">{errorMsg}</p>}

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
                    {isSubmitting ? "Adding..." : "Update Data"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* End #main */}
    </div>
  );
};

export default EditPendidikan;
