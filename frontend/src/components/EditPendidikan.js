import React,{useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

const EditPendidikan = () => {
  const {id_pend} = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const id_akun = user && user.user && user.user.id_akun;

  const [jenjang, setJenjang] = useState('');
  const [nama_sekolah, setNamaSekolah] = useState('');
  const [jurusan, setJurusan] = useState('');
  const [tahun_masuk, setTahunMasuk] = useState('');
  const [tahun_lulus, setTahunLulus] = useState('');

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [msg, setMsg] = useState("");

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
        setTahunLulus(dataPendidikan.tahun_lulus)

        console.log('pendidikan di edit:', response.data.pendidikan);
      } catch (error) {
        console.error('Error fetching education data:', error);
      }
    }
    fetchData();
  }, [id_akun, id_pend]);

  const handleJenjangChange = (value) => {
    setJenjang(value);
  }

  const handleNamaSekolahChange = (value) => {
    setNamaSekolah(value);
  }

  const handleJurusanChange = (value) => {
    setJurusan(value);
  }

  const handleTahunMasukChange = (value) => {
    setTahunMasuk(value);
    setMsg("");
  }

  const handleTahunLulusChange = (value) => {
    setTahunLulus(value);
    setMsg("");
  }

  const updatePendidikan = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`http://localhost:5000/pendidikan/${id_pend}`, {
        jenjang: jenjang,
        nama_sekolah: nama_sekolah,
        jurusan: jurusan,
        tahun_masuk: tahun_masuk,
        tahun_lulus: tahun_lulus,
      });
      setSuccessMessage("Education updated successfully!"); // Set success message

      // Show success message for 2 seconds before navigating
      setTimeout(() => {
        navigate("/pendidikan");
      }, 3000);
      setErrorMessage("");
    } catch (error) {
      console.error('Error saving education data:', error);
    }
  }

  const handleCancel = () => {
    navigate('/pendidikan');
  };

  return (
    <div>
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
                <form onSubmit={updatePendidikan}>
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
    </div>
  );
};

export default EditPendidikan;


