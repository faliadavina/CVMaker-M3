import React, { useEffect } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import EditOrganisasi from "../components/EditOrganisasi";

const EditOrganisasiPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);
  
    useEffect(() => {
      dispatch(getMe());
    }, [dispatch]);
  
    useEffect(() => {
      if (isError) {
        navigate("/login");
      }
    }, [isError, navigate]);
  return (
    <Layout>
    <EditOrganisasi />
  </Layout>
  )
}

export default EditOrganisasiPage;