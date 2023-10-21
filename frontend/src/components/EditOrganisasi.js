import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";

const EditDataOrganisasi = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const id = user && user.user && user.user.id_akun;

  const [organisasi, setOrganisasi] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  const [nama_organisasi, setNamaOrganisasi] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [periode, setPeriode] = useState("");
  const [deskripsi_jabatan, setDeskripsiJabatan] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchDataOrganisasi = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/organisasi-by-id-akun/${id}`
        );
        setOrganisasi(response.data);
      } catch (error) {
        console.error("Error fetching organisasi data:", error);
      }
    };

    fetchDataOrganisasi();
  }, [id]);

  const handleSelectOrganization = (organisasi) => {
    if (
      selectedOrganization &&
      selectedOrganization.id_org === organisasi.id_org
    ) {
      // Jika organisasi yang sama dipilih kembali, maka kita akan "Unselect" (sembunyikan tombol "Update" dan "Delete")
      setSelectedOrganization(null);
      setIsEditing(false);
    } else {
      // Jika organisasi berbeda dipilih, maka kita akan menetapkan organisasi yang baru dan tetapkan "isEditing" ke true
      setSelectedOrganization(organisasi);
      setNamaOrganisasi(organisasi.nama_organisasi);
      setJabatan(organisasi.jabatan);
      setPeriode(organisasi.periode);
      setDeskripsiJabatan(organisasi.deskripsi_jabatan);
      setIsEditing(false);
    }
  };

  const handleUpdateClick = async () => {
    if (!selectedOrganization) {
      console.error("Pilih organisasi sebelum menyimpan perubahan.");
      return;
    }
    setIsEditing(true);
    try {
      await axios.patch(
        `http://localhost:5000/organisasi/${selectedOrganization.id_org}`,
        {
          nama_organisasi: nama_organisasi,
          jabatan: jabatan,
          periode: periode,
          deskripsi_jabatan: deskripsi_jabatan,
        }
      );

      setUpdateSuccess(true);

      navigate("/edit_organisasi");
    } catch (error) {
      console.error("Error saving organisasi data:", error);
    }
  };

  const handleDeleteClick = async () => {
    if (selectedOrganization && selectedOrganization.id_org !== undefined) {
      const confirmation = window.confirm(
        `Apakah Anda yakin akan menghapus data organisasi ${selectedOrganization.nama_organisasi}?`
      );

      if (confirmation) {
        try {
          await axios.delete(
            `http://localhost:5000/organisasi/${selectedOrganization.id_org}`
          );
          const updatedOrgData = organisasi.filter(
            (org) => org.id_org !== selectedOrganization.id_org
          );
          setOrganisasi(updatedOrgData);

          setSelectedOrganization(null);
          setIsEditing(false);
          navigate("/edit_organisasi");
        } catch (error) {
          console.error("Error deleting organisasi data:", error);
        }
      }
    } else {
      console.error("Pilih organisasi yang akan dihapus.");
    }
  };

  const handleOrganisasiChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "nama_organisasi":
        setNamaOrganisasi(value);
        break;
      case "jabatan":
        setJabatan(value);
        break;
      case "periode":
        setPeriode(value);
        break;
      case "deskripsi_jabatan":
        setDeskripsiJabatan(value);
        break;
      default:
        break;
    }
  };

  const handleCancelClick = () => {
    navigate("/edit_organisasi");
  };

  return (
    <section id="editOrganisasi" className="editOrganisasi">
      <div className="container">
        {organisasi.length > 0 ? (
          <>
            <div className="section-title">
              <h2>Edit Data Organisasi</h2>
            </div>
            <div className="card-content">
              <div className="content">
                <div>
                  <Link
                    to="/add_organisasi"
                    className="btn btn-dark"
                    style={{
                      borderRadius: "50px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      textAlign: "center",
                      position: "absolute",
                      top: "100px",
                      right: "50px",
                    }}
                  >
                    + Add Organisasi
                  </Link>
                  <div>
                    <ol>
                      {organisasi.map((org) => (
                        <li key={org.id_org}>
                          <h4
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <b style={{ textAlign: "left" }}>
                              {org.nama_organisasi}
                            </b>
                            <b
                              style={{
                                textAlign: "right",
                                marginRight: "10px",
                              }}
                            >
                              {org.periode}
                            </b>
                          </h4>

                          <pree> {org.jabatan} </pree>
                          <p>{org.deskripsi_jabatan}</p>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleSelectOrganization(org)}
                            style={{
                              backgroundColor: "lightblue",
                              color: "black",
                              marginBottom: "30px",
                            }}
                          >
                            {selectedOrganization &&
                            org.id_org === selectedOrganization.id_org
                              ? "Unselect"
                              : "Select"}
                          </button>
                          {selectedOrganization &&
                            org.id_org === selectedOrganization.id_org && (
                              <button
                                className="btn btn-primary"
                                onClick={handleUpdateClick}
                                style={{
                                  backgroundColor: "green",
                                  color: "white",
                                  marginBottom: "30px",
                                }}
                              >
                                Update
                              </button>
                            )}
                          {selectedOrganization &&
                            org.id_org === selectedOrganization.id_org && (
                              <button
                                className="btn btn-primary"
                                onClick={handleDeleteClick}
                                style={{
                                  backgroundColor: "red",
                                  color: "white",
                                  marginBottom: "30px",
                                }}
                              >
                                Delete
                              </button>
                            )}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <div
              className="text-center"
              style={{
                marginBottom: "20px",
                color: "grey",
                fontSize: "14px",
              }}
            >
              Organization Hasn't Been Added
            </div>
            <NavLink to="/add_organisasi">
              <button
                className="btn btn-dark"
                style={{
                  borderRadius: "50px",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                <FaPlus style={{ marginRight: "10px" }} /> Add Data
              </button>
            </NavLink>
          </div>
        )}

        {selectedOrganization && isEditing && (
          <div>
            <h3>Edit Organisasi:</h3>
            <form>
              <div className="form-group">
                <label htmlFor="nama_organisasi">Nama Organisasi</label>
                <input
                  type="text"
                  className="form-control"
                  id="nama_organisasi"
                  name="nama_organisasi"
                  value={nama_organisasi}
                  onChange={handleOrganisasiChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="jabatan">Jabatan</label>
                <input
                  type="text"
                  className="form-control"
                  id="jabatan"
                  name="jabatan"
                  value={jabatan}
                  onChange={handleOrganisasiChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="periode">Periode</label>
                <input
                  type="text"
                  className="form-control"
                  id="periode"
                  name="periode"
                  value={periode}
                  onChange={handleOrganisasiChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="deskripsi_jabatan">Deskripsi Jabatan</label>
                <textarea
                  className="form-control"
                  id="deskripsi_jabatan"
                  name="deskripsi_jabatan"
                  value={deskripsi_jabatan}
                  onChange={handleOrganisasiChange}
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  className="btn btn-secondary"
                  onClick={handleCancelClick}
                >
                  Batal
                </button>
                <button className="btn btn-primary" onClick={handleUpdateClick}>
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default EditDataOrganisasi;
