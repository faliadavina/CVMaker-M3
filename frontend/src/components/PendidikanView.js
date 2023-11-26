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
        `http://194.233.93.124:8000/pendidikan/akun/${accountId}`
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
      <section id="pendidikan" class="pendidikan">
        <div class="container">
          <div class="section-title">
            <h2>Education</h2>
          </div>

          {pendidikan.length > 0 ? (

              <ul class="education-list">
              {pendidikan.map((item, index) => (
                <li key={index} class="education-item">
                  <h3 class="jenjang">{item.jenjang}</h3>
                  <div class="school-info">
                    <p class="nama-sekolah">{item.nama_sekolah}</p>
                    <p class="jurusan">{item.jurusan}</p>
                  </div>
                  <p class="tahun">
                    {item.tahun_masuk} - {item.tahun_lulus}
                  </p>
                </li>
              ))}
              </ul>

          ):(
              <div class="title d-flex justify-content-center align-items-center text-center mt-5">
              <h5></h5>
              </div>

          )}
        </div>
      </section>
    </div>
  );
};

export default PendidikanView;
