import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MenuCV = () => {
  const [activeButton, setActiveButton] = useState("ATS");
  const navigate = useNavigate();

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    if (buttonName === "ATS" || buttonName === "Creative") {
      navigate("/menu_cv");
    }
  };

  const templatesATS = [
    { id: 1, title: "Functional", imageUrl: "/img/cv/cv_1.jpg" },
    { id: 2, title: "London", imageUrl: "/img/cv/cv_2.jpg" },
  ];

  const templatesCreative = [
    { id: 3, title: "Lilac Dreams", imageUrl: "/img/cv/cv_3.png" },
    { id: 4, title: "NavyOR CV", imageUrl: "/img/cv/cv_4.png" },
    { id: 5, title: "Midnight Yellow", imageUrl: "/img/cv/cv_5.png" },
    { id: 6, title: "Majestic Mocca", imageUrl: "/img/cv/cv_6.png" },
  ];

  const selectedTemplates = activeButton === "ATS" ? templatesATS : templatesCreative;

  const handleChooseCV = (templateId) => {
    navigate(`/generate_cv/${templateId}`);
  };

  return (
    <div>
      <section id="menuCV" className="menuCV">
        <div className="container">
          <div className="section-title">
            <h2> Template CV</h2>
          </div>

          <nav className="navbar bg-body-tertiary">
            <form className="container-fluid justify-content-start">
              <button className={`btn ${activeButton === "ATS" ? "btn-active" : ""}`} type="button" onClick={() => handleButtonClick("ATS")} style={activeButton === "ATS" ? { backgroundColor: "#0e2442", color: "#fff" } : {}}>
                ATS Friendly
              </button>
              <button className={`btn ${activeButton === "Creative" ? "btn-active" : ""}`} type="button" onClick={() => handleButtonClick("Creative")} style={activeButton === "Creative" ? { backgroundColor: "#0e2442", color: "#fff" } : {}}>
                Creative
              </button>
            </form>
          </nav>

          <div className="card-menu-container">
            {selectedTemplates.map((template) => (
              <div key={template.id} className="card-menu-cv">
                <div className="border">
                  <img src={template.imageUrl} alt={template.title} className="cv-img" />
                  <div className="title-cv">{template.title}</div>
                  <button className="select-cv" type="button" onClick={() => handleChooseCV(template.id)}>
                    Choose Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuCV;
