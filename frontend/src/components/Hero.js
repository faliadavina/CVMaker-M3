import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Typed from "typed.js";
import axios from "axios";

const Hero = () => {
  const { user } = useSelector((state) => state.auth);
  const id = user && user.user && user.user.id_akun;
  const [skillNames, setSkillNames] = useState([
    "(No skills added yet)",
  ]);
  const [data_diri, setUsers] = useState(null);

  useEffect(() => {
    if (id) {
      getSkills();
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (skillNames.length > 0) {
      const options = {
        strings: skillNames,
        typeSpeed: 100,
        backSpeed: 50,
        loop: true
      };
      const typed = new Typed(".typed", options);

      return () => {
        typed.destroy();
      };
    }
  }, [skillNames]);

  const getSkills = async () => {
    try {
      const response = await axios.get(`http://194.233.93.124:8000/skills/akun/${id}`);
      const skills = response.data.skills;
      const hardSkills = skills.filter((skill) => skill.kategori_skill === "hardskill");
      const skillNames = hardSkills.length > 0
        ? hardSkills.map((skill) => skill.nama_skill)
        : ["No Hardskills added yet"];
      setSkillNames(skillNames);
    } catch (error) {
      console.error("Error fetching skills:", error);
      setSkillNames(["No Hardskills added yet"]);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://194.233.93.124:8000/users/${id}`);
      const username = response.data.nama;
      setUsers({ username });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <section
        id="hero"
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <div className="hero-container text-center p-4" data-aos="fade-in">
          <h1>{data_diri && data_diri.username}</h1>
          <p>
            I am an expert in {" "}
            <span className="typed"></span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Hero;
