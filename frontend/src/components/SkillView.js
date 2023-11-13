import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";


const SkillView = () => {
  const accountId = useSelector((state) => state.account.accountId);
  console.log(accountId)


  const [softSkills, setSoftSkills] = useState([]);
  const [hardSkills, setHardSkills] = useState([]);
  const [data_skill, setSkill] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    getSkills();
  }, [accountId]);

  const getSkills = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/skills/akun/${accountId}`
      );
      setSkill(response.data);

      // Pisahkan skills berdasarkan kategori_skill
      const softSkills = response.data.skills.filter(
        (skill) => skill.kategori_skill === "softskill"
      );
      const hardSkills = response.data.skills.filter(
        (skill) => skill.kategori_skill === "hardskill"
      );

      setSoftSkills(softSkills);
      setHardSkills(hardSkills);
      setErrorMessage(""); // Reset error message on successful fetch
    } catch (error) {
      console.error("Error fetching skills:", error);
      setSkill(null);
    }
  };

  return (
    <div>
        <section id="skills" className="skills">
          {data_skill ? (
            <div className="container">
              <div
                className="section-title"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div className="title-container">
                  <h2>Skills</h2>
                </div>
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
              </div>

              <div className="row skills-content">
                <div className="col-lg-6">
                  <div className="section-subtitle">
                    <h5>Soft Skills</h5>
                  </div>
                  {softSkills.map((skill, index) => (
                    <div
                      className="progress-container"
                      key={skill.id_skill}
                      data-aos="fade-up"
                    >
                      <div className="progress">
                        <span className="skill mb-4 pt-2">
                          {skill.nama_skill}{" "}
                          <i className="val">{skill.level * 10}%</i>
                        </span>
                        <div
                          className="progress-bar progress-bar-striped progress-bar-animated mt-4"
                          role="progressbar"
                          aria-valuenow={skill.level * 10}
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ width: `${skill.level * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-lg-6">
                  <div className="section-subtitle">
                    <h5>Hard Skills</h5>
                  </div>
                  {hardSkills.map((skill, index) => (
                    <div
                      className="progress-container"
                      key={skill.id_skill}
                      data-aos="fade-up"
                    >
                      <div className="progress">
                        <span className="skill mb-4 pt-2">
                          {skill.nama_skill}{" "}
                          <i className="val">{skill.level * 10}%</i>
                        </span>
                        <div
                          className="progress-bar progress-bar-striped progress-bar-animated mt-4"
                          role="progressbar"
                          aria-valuenow={skill.level * 10}
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ width: `${skill.level * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
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
                Skill Hasn't Been Added
              </div>
            </div>
          )}
        </section>
    </div>
  );
};

export default SkillView;
