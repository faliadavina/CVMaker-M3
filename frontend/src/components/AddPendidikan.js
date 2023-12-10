import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddPendidikan = () => {
  const [jenjang, setJenjang] = useState("");
  const [nama_sekolah, setNamaSekolah] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [tahun_masuk, setTahunMasuk] = useState("");
  const [tahun_lulus, setTahunLulus] = useState("Sekarang");

  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [jenjangLainnya, setJenjangLainnya] = useState("");

  const [namaSekolahFilled, setNamaSekolahFilled] = useState(false);
  const [jurusanFilled, setJurusanFilled] = useState(false);
  const [tahunMasukFilled, setTahunMasukFilled] = useState(false);
  const [tahunLulusFilled, setTahunLulusFilled] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearErrorMessage = () => {
    setMsg("");
  };

  const handleJenjangChange = (value) => {
    if (value === "Lainnya") {
      setJenjang("Lainnya");
    } else {
      setJenjang(value);
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
      setTahunMasuk(year);
      clearErrorMessage();
      setTahunMasukFilled(!!year);
    }
  };

  const handleTahunLulusChange = (year) => {
    if (year === "Sekarang") {
      setTahunLulus("Sekarang");
      setErrorMsg("");
      setTahunLulusFilled(true);
    } else {
      if (year < tahun_masuk) {
        setErrorMsg(
          "Tahun lulus harus lebih besar atau sama dengan tahun masuk."
        );
      } else {
        setTahunLulus(year.toString()); // Mengubah ke tipe string sebelum disimpan
        setErrorMsg("");
        setTahunLulusFilled(!!year);
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

  const { user } = useSelector((state) => state.auth);
  const id = user && user.user && user.user.id_akun;

  const savePendidikan = async (e) => {
    e.preventDefault();
    setMsg("");

    if (
      !namaSekolahFilled ||
      !jurusanFilled ||
      !tahunMasukFilled ||
      !tahunLulusFilled
    ) {
      setMsg("Please fill in all required fields.");
      return;
    }

    const yearRegex = /^\d{4}$/;

    if (
      !yearRegex.test(tahun_masuk) ||
      (tahun_lulus !== "Sekarang" && !yearRegex.test(tahun_lulus))
    ) {
      setMsg("Tahun masuk dan tahun lulus harus berupa 4 digit angka.");
      return;
    }

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

      await axios.post(`https://api-cvmaster.agilearn.id/pendidikan/${id}`, {
        jenjang: jenjangToSend,
        nama_sekolah: nama_sekolah,
        jurusan: jurusan,
        tahun_masuk: tahun_masuk,
        tahun_lulus: tahunLulusToSend,
      });

      setSuccessMessage("Education added successfully!");
      setTimeout(() => {
        navigate("/pendidikan");
      }, 2000);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    } finally {
      setIsSubmitting(false);
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
                        onChange={(e) => setJenjangLainnya(e.target.value.toUpperCase())}
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
                        handleTahunLulusChange(
                          e.target.value === "Sekarang"
                            ? "Sekarang"
                            : parseInt(e.target.value)
                        )
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
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary mt-3"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Adding..." : "Add Data"}
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

export default AddPendidikan;
