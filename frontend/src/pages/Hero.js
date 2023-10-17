import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Typed from "typed.js";
import axios from "axios"; // Import axios

const Hero = () => {
  const { user } = useSelector((state) => state.auth);
  const username = user?.user?.username;
  const id = user && user.user && user.user.id_akun;
  const [skillNames, setSkillNames] = useState([
    "(Ayo isi skill mu)",
  ]);

  useEffect(() => {
    if (id) {
      getSkills(); // Fetch skills when id is available
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
        typed.destroy(); // Clean up the Typed instance to avoid memory leaks
      };
    }
  }, [skillNames]);

  const getSkills = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/skills/akun/${id}`);
      const skills = response.data.skills;
      const skillNames = skills.map((skill) => skill.nama_skill);
      setSkillNames(skillNames);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const [data_diri, setUsers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/${id}`
        );
        console.log(response.data);
        const username = response.data.nama;
        setUsers({ username });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <Sidebar />
      <section
        id="hero"
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <div className="hero-container" data-aos="fade-in">
          <h1>{data_diri && data_diri.username}</h1>
          <p>
            Saya Ahli Dalam {" "}
            <span
              className="typed"
            ></span>
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Hero;
