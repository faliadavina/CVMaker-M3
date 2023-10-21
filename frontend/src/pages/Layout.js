import React from "react";
import Sidebar from "../components/Sidebar";
import Hero from "../components/Hero";

const Layout = ({ children }) => {
  return (
    <div>
        <Sidebar />
        <Hero />
        <main id = "main">
          {children}
        </main>
        </div>
  );
};

export default Layout;
