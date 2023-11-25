import React from "react";
import { Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar
      expand="lg"
      className="justify-content-center custom-bg-dark"
    >
      <Navbar.Brand href="#home">
        <img
          src={require("../img/logo.png")}
          height="auto"
          style={{ maxHeight: "100px" , marginTop:"40px"}}
          className="d-inline-block align-top"
          alt="Logo"
        />
      </Navbar.Brand>
    </Navbar>
  );
};

export default Header;
