import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const OrganisasiView = () => {
  const [organisasi, setOrganisasi] = useState([]);
  const accountId = useSelector((state) => state.account.accountId);

  useEffect(() => {
    getOrganisasi();
  }, [accountId]);

  const getOrganisasi = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/organisasi/akun/${accountId}`
      );
      setOrganisasi(response.data.organisasi);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const OrganisasiDetail = organisasi.map((organisasi, index) => (
    <div key={organisasi.id_org}>
      <p style={{ fontSize: '16px' }}>
        <strong>Nama Organisasi:</strong> {organisasi.nama_organisasi}
      </p>
      <p style={{ fontSize: '16px' }}>
        <strong>Jabatan:</strong> {organisasi.jabatan}
      </p>
      <p style={{ fontSize: '16px' }}>
        <strong>Periode Awal:</strong> {organisasi.periode_awal}
      </p>
      <p style={{ fontSize: '16px' }}>
        <strong>Periode Akhir:</strong> {organisasi.periode_akhir || 'Sekarang'}
      </p>
      <p style={{ fontSize: '16px' }}>
        <strong>Deskripsi Jabatan:</strong> {organisasi.deskripsi_jabatan}
      </p>
      <hr /> {/* Add a horizontal line between organization entries */}
    </div>
  ));

  return (
    <div>
      <section id="organisasi" className="organisasi">
        <div className="container">
          {organisasi.length > 0 ? (
            <div className="section-title">
              <h2>Organisasi</h2>
            </div>
          ) : (
            <div className="section-title">
              <h3>No Organization Data Available</h3>
            </div>
          )}
          <div className="container">
            {organisasi.length > 0 ? (
              OrganisasiDetail
            ) : (
              <p>No organization data available.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrganisasiView;
