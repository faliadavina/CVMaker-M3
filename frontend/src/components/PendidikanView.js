import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const PendidikanView = () => {
  const [pendidikan, setPendidikan] = useState([]);
  const accountId = useSelector((state) => state.account.accountId);

  useEffect(() => {
    getPendidikan();
  }, [accountId]);

  const getPendidikan = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/pendidikan/akun/${accountId}`
      );
      setPendidikan(response.data.pendidikan);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const PendidikanDetail = pendidikan.map((pendidikan, index) => (
    <div key={pendidikan.id_pend}>
      <p style={{ fontSize: '16px' }}>
        <strong>Jenjang:</strong> {pendidikan.jenjang}
      </p>
      <p style={{ fontSize: '16px' }}>
        <strong>Instansi Pendidikan:</strong> {pendidikan.nama_sekolah}
      </p>
      <p style={{ fontSize: '16px' }}>
        <strong>Jurusan:</strong> {pendidikan.jurusan}
      </p>
      <p style={{ fontSize: '16px' }}>
        <strong>Tahun Masuk:</strong> {pendidikan.tahun_masuk}
      </p>
      <p style={{ fontSize: '16px' }}>
        <strong>Tahun Lulus:</strong> {pendidikan.tahun_lulus}
      </p>
      <hr /> {/* Add a horizontal line between education entries */}
    </div>
  ));

  return (
    <div>
      <section id="pendidikan" className="pendidikan">
        <div className="container">
          {pendidikan.length > 0 ? (
            <div className="section-title">
              <h2>Pendidikan</h2>
            </div>
          ) : (
            <div className="section-title">
              <h3>No Education Data Available</h3>
            </div>
          )}
          <div className="container">
            {PendidikanDetail}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PendidikanView;
