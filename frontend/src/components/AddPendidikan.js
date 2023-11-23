import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddPendidikan = () => {
  const [jenjang, setJenjang] = useState("");
  const [nama_sekolah, setNamaSekolah] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [tahun_masuk, setTahunMasuk] = useState("Pilih Tahun");
  const [tahun_lulus, setTahunLulus] = useState("Pilih Tahun");

  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [jenjangLainnya, setJenjangLainnya] = useState(""); // Untuk input "Lainnya"

  const [jenjangFilled, setJenjangFilled] = useState(false);
  const [namaSekolahFilled, setNamaSekolahFilled] = useState(false);
  const [jurusanFilled, setJurusanFilled] = useState(false);
  const [tahunMasukFilled, setTahunMasukFilled] = useState(false);
  const [tahunLulusFilled, setTahunLulusFilled] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearErrorMessage = () => {
    setMsg("");
  };

  const handleJenjangChange = (value) => {
    if (value === "Lainnya") {
      setJenjang("Lainnya"); // Reset nilai dropdown
    } else {
      setJenjang(value); // Tetapkan nilai dropdown
      setJenjangFilled(!!value);
    }
    clearErrorMessage();
  };

  const handleNamaSekolahChange = (value) => {
    setNamaSekolah(value);
    clearErrorMessage();
    setNamaSekolahFilled(!!value);
  };

  const handleJurusanChange = (value) => {
    setJurusan(value);
    clearErrorMessage();
    setJurusanFilled(!!value);
  };

  const handleTahunMasukChange = (year) => {
    if (year > tahun_lulus) {
      setErrorMsg(
        "Tahun masuk harus lebih kecil atau sama dengan tahun lulus."
      );
    } else {
      setTahunMasuk(year); // Menggunakan integer untuk tahun masuk
      clearErrorMessage();
      setTahunMasukFilled(!!year);
    }
  };

  const handleTahunLulusChange = (year) => {
    if (year < tahun_masuk) {
      setErrorMsg(
        "Tahun lulus harus lebih besar atau sama dengan tahun masuk."
      );
    } else {
      setTahunLulus(year); // Menggunakan integer untuk tahun lulus
      setErrorMsg("");
      setTahunLulusFilled(!!year);
    }
  };

  function generateYearOptions() {
    const startYear = 1970; // Tahun awal
    const currentYear = new Date().getFullYear(); // Tahun saat ini
    const years = [];
    for (let year = startYear; year <= currentYear; year++) {
      years.push(year);
    }
    return years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  }

  const { user } = useSelector((state) => state.auth);
  const id = user && user.user && user.user.id_akun;

  const savePendidikan = async (e) => {
    e.preventDefault();

    // Reset error message
    setMsg("");

    // Check if all fields are filled
    if (
      !jenjangFilled ||
      !namaSekolahFilled ||
      !jurusanFilled ||
      !tahunMasukFilled ||
      !tahunLulusFilled
    ) {
      setMsg("Please fill in all required fields.");
      return;
    }

    const yearRegex = /^\d{4}$/;

    // Contoh penggunaan dalam validasi tahun_masuk dan tahun_lulus
    if (!yearRegex.test(tahun_masuk) || !yearRegex.test(tahun_lulus)) {
      setMsg("Tahun masuk dan tahun lulus harus berupa 4 digit angka.");
      if (!yearRegex.test(tahun_masuk)) {
        setTahunMasukFilled(false);
      } else {
        setTahunLulusFilled(false);
      }
      return;
    }
    setIsSubmitting(true);

    try {
      await axios.post(`http://localhost:5000/pendidikan/${id}`, {
        jenjang: jenjang,
        nama_sekolah: nama_sekolah,
        jurusan: jurusan,
        tahun_masuk: tahun_masuk, // Menggunakan integer untuk tahun masuk
        tahun_lulus: tahun_lulus, // Menggunakan integer untuk tahun lulus
      });
      setSuccessMessage("Education added successfully!"); // Show success message for 2 seconds before navigating
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
      <section id="addPendidikan" className="pendidikan">
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
                    <select
                      value={jenjang}
                      onChange={(e) => handleJenjangChange(e.target.value)}
                      className="form-select"
                    >
                      <option value="">Pilih Jenjang</option>
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
                        onChange={(e) => setJenjangLainnya(e.target.value)}
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
                      <option value="">Pilih Tahun</option>
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
                      <option value="">Pilih Tahun</option>
                      {generateYearOptions()}
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
                    {isSubmitting ? "Adding..." : "Add Data"}
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

export default AddPendidikan;
