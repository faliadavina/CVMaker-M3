import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './layout/navbar';
import Footer from './layout/footer';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const [portofolios, setPorto] = useState([]);
  const id_akun = 3;

  useEffect(() => {
    getPorto()
  }, []);

  const getPorto = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/porto/${id_akun}`);
      setPorto(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const renderPortofolioContent = (url) => {
    const fileExtension = url.split('.').pop().toLowerCase();
    const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension);
    const isPDF = fileExtension === 'pdf';
    const isAudio = ['mp3', 'wav'].includes(fileExtension);
    const isVideo = ['mp4', 'webm'].includes(fileExtension);

    if (isImage) {
      return <img src={url} alt="Portofolio" />;
    } else if (isPDF) {
      return <embed src={url} type="application/pdf" className="pdf-embed" height="600" />;
    } else if (isAudio) {
      return <audio controls src={url} />;
    } else if (isVideo) {
      return <video controls src={url} />;
    } else {
      return <p>Unsupported file format</p>;
    }
  };

  // ============= CODE FOR DELETE DATA =============
  const deletePorto = async (portoID) => {
    try {
      await axios.delete(`http://localhost:5000/porto/${portoID}`);
      getPorto();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <body>
      <Navbar />
      <main id="main">
        <section id="uploadPorto" className="portfolio section-bg">
          <div className="container">

            <div className="section-title">
              <h2>Portfolio Section</h2>
            </div>

            <div className="container">
              {portofolios === null || portofolios.length === 0 ? (
                <div className="container text-center contStyle">
                  <h3>No Data Portofolio Available, Please Add Data First</h3>
                  <Link to={"add_portofolio"} className="btn btn-primary btn-lg" style={{ backgroundColor: '#000000', fontWeight: '800' }}>
                    + ADD PORTOFOLIO
                  </Link>
                </div>
              ) : (
                <>
                  <Link to={"add_portofolio"}
                    className="btn btn-primary"
                    style={{ backgroundColor: '#000000', fontWeight: '800', marginBottom: '20px' }}
                  >
                    + ADD PORTOFOLIO
                  </Link>
                  <div className="container">
                    <div className="row">
                      {portofolios.map((portofolio) => (
                        <div className="col-md-6 mx-auto" key={portofolio.id_porto}>
                          <div className="card" style={{ marginBottom: '15px' }}>
                            {renderPortofolioContent(portofolio.url)}
                            <div className="deskripsi">
                              <p>{portofolio.deskripsi}</p>
                              <div className="buttons">
                                <button onClick={() => deletePorto(portofolio.id_porto)} className="btn btn-danger">Delete</button>
                                {/* <button onClick={() => handleOnUpdateButton()} className="btn btn-primary">Update</button> */}
                                <Link to={`edit_portofolio/${portofolio.id_porto}`} className="btn btn-primary">Update</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <a href="#about" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
    </body>
  )
}

export default Portfolio;