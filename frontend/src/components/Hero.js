import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Typed from "typed.js";
import axios from "axios";

const Hero = () => {
  const { user } = useSelector((state) => state.auth);
  const id = user && user.user && user.user.id_akun;
  const [profesi, setProfesi] = useState("(Profession not added yet)");
  const [data_diri, setUsers] = useState(null);

  useEffect(() => {
    if (id) {
      getProfesi();
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (profesi) {
      const options = {
        strings: [profesi],
        typeSpeed: 100,
        backSpeed: 50,
        loop: true
      };
      const typed = new Typed(".typed", options);

      return () => {
        typed.destroy();
      };
    }
  }, [profesi]);

  const getProfesi = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      const profesiData = response.data.profesi || "(Profession not added yet)";
      setProfesi(profesiData);
    } catch (error) {
      console.error("Error fetching profession:", error);
      setProfesi("Profesi not added yet");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
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
            I'm {" "}
            <span className="typed"></span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Hero;
