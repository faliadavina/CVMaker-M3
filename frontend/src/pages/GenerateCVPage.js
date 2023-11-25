import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMe } from "../features/authSlice";
import ATSTemplate1 from "../components/ATSTemplate1/ATSTemplate1";
import ATSTemplate2 from "../components/ATSTemplate2/ATSTemplate2";
import CVTemplate1 from "../components/CVTemplate1/CVTemplate1";
import CVTemplate2 from "../components/CVTemplate2/CVTemplate2";
import CVTemplate3 from "../components/CVTemplate3/CVTemplate3";
// import CVTemplate4 from "../components/CVTemplate4/CVTemplate4";

const GenerateCVPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const { templateId } = useParams();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  // Render the selected template based on the templateId
  const renderTemplate = () => {
    switch (templateId) {
      case "1":
        return <ATSTemplate1 />;
      case "2":
        return <ATSTemplate2 />;
      case "3":
        return <CVTemplate1 />;
      case "4":
        return <CVTemplate2 />;
      case "5":
        return <CVTemplate3 />;
      // case "6":
      //   return <CVTemplate4 />;
      default:
        return null;
    }
  };

  return <>{renderTemplate()}</>;
};

export default GenerateCVPage;
