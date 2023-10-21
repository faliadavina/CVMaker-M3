import React from "react";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <div>
        <Sidebar />
        <main id = "main">
          {children}
        </main>
        </div>
  );
};

export default Layout;
