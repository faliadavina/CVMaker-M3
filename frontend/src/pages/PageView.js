import React from "react";
import SkillView from "../components/SkillView";
import DataView from "../components/DataView";
import { Link } from "react-router-dom";
import PortoView from "../components/PortoView";
import PendidikanView from "../components/PendidikanView";
import OrganisasiView from "../components/OrganisasiView";

const PageView = () => {
  return (
    <div>
      <DataView />
      <PendidikanView />
      <OrganisasiView/>
      <PortoView />
      <SkillView />



      {/* Tombol back */}
      <Link
        to="/"
        className="position-fixed top-0 end-0 mt-5 mr-5"
        style={{ fontSize: "24px", textDecoration: "none" }}
      >
        <div className="back-to-top-button btn btn-dark">
          <i className="bi bi-arrow-left"></i>
          <span className="ms-2">Back</span>
        </div>
      </Link>
    </div>
  );
};

export default PageView;
