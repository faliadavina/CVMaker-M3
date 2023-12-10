import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../img/bg.jpg";
import NavbarMainLanding from "../pages/NavbarMainLanding";
import { setAccountId } from "../features/accountSlice";
import axios from "axios";

const LandingPageMain = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("https://api-cvmaster.agilearn.id/users");
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleUserClick = (id_akun) => {
        console.log("Clicked on user with id_akun:", id_akun);
        dispatch(setAccountId(id_akun));
        navigate("/page-view");
    };

    return (
        <section className="vh-100 image-container fade-in" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <NavbarMainLanding />
            <section id="home" className="container-fluid">
                <div className="row align-items-center justify-content-center">
                    <div className="col-md-8 col-lg-6 col-ms-8 text-center">
                        <h1 className="text-white">WELCOME PEPS!</h1>
                        <p className="text-white mr-4 ml-4">
                            Welcome to CV Master - M3 Web Application. This is the right place for you to create your own CV! Try starting to create your own CV on our website and see the results directly on this page. CV Master "Make Your CV Beauty"
                        </p>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default LandingPageMain;
