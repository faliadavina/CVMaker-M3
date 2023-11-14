import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
function OrganisasiView() {
      // Data Organisasi
  const [organisasi, setOrganisasi] = useState([]);
  const accountId = useSelector((state) => state.account.accountId);

  useEffect(() => {
    const fetchDataOrganisasi = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/organisasi-by-id-akun/${accountId}`
        );
        setOrganisasi(response.data);
      } catch (error) {
        console.error("Error fetching organisasi data:", error);
      }
    };

    fetchDataOrganisasi();
  }, [accountId]);
  return (
    <div>
      <section id="resume" className="resume">
        <div className="container">
          {organisasi.length > 0 ? (
            <>
              <div className="section-title">
                <h2>Organizational Experience</h2>
              </div>
              <div className="card-content">
                <div className="content">
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
                          <p>{org.jabatan}</p>
                          <p>{org.deskripsi_jabatan}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="section-title">
                <h2>Organizational Experience</h2>
              </div>            
              <div class="title d-flex justify-content-center align-items-center text-center mt-5">
              <h5></h5>
            </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default OrganisasiView
