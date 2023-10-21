import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import Sidebar from "../pages/Sidebar";

const PendidikanList = () => {
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  const [pendidikan, setPendidikan] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const id = user && user.user && user.user.id_akun;
  console.log("id:", id);

  useEffect(() => {
    getPendidikan();
  }, [id]);

  const getPendidikan = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/pendidikan/akun/${id}`
      );
      setPendidikan(response.data.pendidikan);
      console.log("pendidikan:", response.data.pendidikan);
      setErrorMessage(""); // Reset error message on successful fetch
    } catch (error) {
      setPendidikan(null);
      console.error("Error fetching :", error);
    }
  }

  const handleEditClick = (id_pend) => {
    navigate(`/edit_pendidikan/${id_pend}`);
    console.log("id_pend:", id_pend);
  };

  const deletePendidikan = async (id_pend) => {
    try {
      await axios.delete(`http://localhost:5000/pendidikan/${id_pend}`);
      getPendidikan();
      setSuccessMessage("Education deleted successfully!");
      setErrorMessage("");
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (error) {
      console.error("Error deleting :", error);
      setErrorMessage("Error deleting .");
      setSuccessMessage("");
    }
  }

  const PendidikanDetail = pendidikan.map((pendidikan) => {
    return (
      <tr key={pendidikan.id_pend}>
        <td>{pendidikan.jenjang}</td>
        <td>{pendidikan.jurusan}</td>
        <td>{pendidikan.tahun_masuk}</td>
        <td>{pendidikan.tahun_lulus}</td>
        <td>
          <Link
            to={`/edit_pendidikan/${pendidikan.id_pend}`}
            className="btn btn-primary"
            onClick={() => handleEditClick(pendidikan.id_pend)}
          >
            Edit
          </Link>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deletePendidikan(pendidikan.id_pend)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <Sidebar />
      <main id="main">
        <section id="pendidikan" className="pendidikan">
          {pendidikan ? (
            <div className="container">
              <div className="section-title" style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="title-container">
                  <h2>Pendidikan</h2>
                </div>
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}

                {successMessage && (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>
                )}
                <div className="btn-container">
                  <NavLink to="/add_pendidikan">
                    <button
                      className="btn btn-dark"
                      style={{
                        borderRadius: "50px",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      <FaPlus style={{ marginRight: "10px" }} /> Add Data
                    </button>
                  </NavLink>
                </div>
              </div>

              <div className="list-group">
                <div className="table table-hover">
                  <thead>
                    <tr className="bg-primary">
                      <th scope="col">Jenjang</th>
                      <th scope="col">Instansi Pendidikan</th>
                      <th scope="col">Jurusan</th>
                      <th scope="col">Tahun Masuk</th>
                      <th scope="col">Tahun Lulus</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PendidikanDetail}
                  </tbody>
                </div>
              </div>
            </div>
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
                Education Hasn't Been Added
              </div>
              <NavLink to="/add_pendidikan">
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
        </section>
      </main>
    </div>
  );
};

export default PendidikanList;
