import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
        <>
            <section
                className="vh-100 image-container fade-in"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <NavbarMainLanding />
                <section id="home">
                    <div className="container h-100 d-flex align-items-center">
                        <div className="container main-lp">
                            <h1>WELCOME PEPS!</h1>
                            <p>Welcome to CV Maker - M3 Web Application. This is the right place for you to create your own CV! Try starting to create your own CV on our website and see the results directly on this page. CV Maker - M3 "Make Your CV Beauty"</p>
                        </div>
                    </div>
                </section>
            </section>
            <section id="testimonials" className="testimonials" style={{ zIndex: '1000' }}>
                <div className="container">
                    <div className="section-title">
                        <h2 style={{ color: 'lightblue' }}>Biography</h2>
                    </div>
                    <div className="row">
                        {loading ? (
                            <p>Loading users...</p>
                        ) : Array.isArray(users) && users.length > 0 ? (
                            users.map((user) => (
                                <div
                                    key={user.id}
                                    className="col-lg-4 col-md-6 mb-4"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleUserClick(user.id_akun)}
                                >
                                    <div className="testimonial-item">
                                        <p>
                                            <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                                            {user.deskripsi}
                                            <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                                        </p>
                                        <div className="zoom-image" style={{ overflow: "hidden" }}>
                                            <img
                                                src={`https://api-cvmaster.agilearn.id/profilePict/${user.profile_pict}`}
                                                className="testimonial-img"
                                                alt=""
                                            />
                                        </div>
                                        <h3 style={{ color: 'white' }}>{user.nama}</h3>
                                        <h4 style={{ color: 'white' }}>{user.email}</h4>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Users data is not in the expected format.</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default LandingPageMain;
