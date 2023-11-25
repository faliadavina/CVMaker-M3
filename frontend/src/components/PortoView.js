import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const PortoView = () => {
  const [portofolios, setPorto] = useState([]);

  const accountId = useSelector((state) => state.account.accountId);

  useEffect(() => {
    getPorto();
  }, [accountId]);


  const getPorto = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/porto/${accountId}`);
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
      return <img src={url} alt="Portofolio" height="550" />;
    } else if (isPDF) {
      return <embed src={url} type="application/pdf" className="pdf-embed" height="550" />;
    } else if (isAudio) {
      return <audio controls src={url} height="550" />;
    } else if (isVideo) {
      return <video controls src={url} height="550"/>;
    } else {
      return <p>Unsupported file format</p>;
    }
  };

  return (
    <body>
       <section id="Porto" className="portfolio">
        <div className="container">
          <div className="section-title">
            <h2>Portfolio</h2>
          </div>

          <div className="container">
            {portofolios === null || portofolios.length === 0 ? (
            <div class="title d-flex justify-content-center align-items-center text-center mt-5">
              <h5></h5>
            </div>
            ) : (
              <div className="container">
                <div className="row">
                  {portofolios.map((portofolio) => (
                    <div className="col-md-6 mx-auto" key={portofolio.id_porto}>
                      <div
                        className="card porto"
                        style={{
                          marginBottom: "15px",
                          height: "300px",
                          width: "300px",
                          marginRight: "50px",
                        }}
                      >
                        {renderPortofolioContent(portofolio.url)}
                        <div className="deskripsi">
                          <p>{portofolio.deskripsi}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </body>
  );
}

export default PortoView;
