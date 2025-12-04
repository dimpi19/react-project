import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation, useNavigate } from "react-router";
import { myContext } from "./context";

function Header() {
    const { showName, setShowName } = useContext(myContext);
    const location = useLocation();
    const navigate = useNavigate();
    function handleLogout() {
        localStorage.removeItem("loggedInUser");
        setShowName(false);
        navigate("/login");
    }

    return (
        <div style={{ position: "relative" }}>
           <Navbar expand="lg">
    <Container style={{ display: "flex", flexWrap: "wrap", padding: "20px" }}>
        
        <Navbar.Brand href="#home">
            <img src="https://maroko-demo.myshopify.com/cdn/shop/files/logo_1df75188-c60e-47e0-8bf8-269f725aa37c_185x@2x.png?v=1683521307"
                alt=""
                style={{ width: "100px" }} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

            {/* Left Menu */}
            <Nav className="me-auto" style={{ display: "flex", gap: "30px" }}>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/shop">Shop</Nav.Link>
                <Nav.Link href="/blog">Blog</Nav.Link>
                <Nav.Link href="/about">About Us</Nav.Link>
                <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>

            {/* Right icons */}
            <Nav
                className="ms-auto"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                }}
            >
                <Link to="/wishlist">
                    <i className="fa-solid fa-heart" style={{ fontSize: "18px", color: "black" }}></i>
                </Link>

                <Link to="/cart">
                    <i className="fa-solid fa-cart-shopping" style={{ fontSize: "18px", color: "black" }}></i>
                </Link>

                {showName && (
                    <>
                        <span style={{ fontSize: "15px", padding: "5px" }}>
                            {showName}
                        </span>
                        <button
                            style={{
                                padding: "5px 15px",
                                border: "none",
                                backgroundColor: "black",
                                color: "white",
                                borderRadius: "4px",
                            }}
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                )}
            </Nav>

        </Navbar.Collapse>
    </Container>
</Navbar>


            {location.pathname === "/" && (
                <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-bs-ride="carousel"
                >
                    <div className="carousel-indicators">
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="0"
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        ></button>
                    </div>

                    <div className="carousel-inner">
                        {/* ===== First Slide ===== */}
                        <div className="carousel-item active">
                            <img
                                src="https://maroko-demo.myshopify.com/cdn/shop/files/slide2_image_1900x.jpg?v=1683521397"
                                className="d-block w-100"
                                alt="First Slide"
                            />
                            <div
                                style={{ position: "absolute", top: "250px", left: "100px" }}
                            >
                                <h5>Get up to 80%</h5>
                                <h1
                                    data-aos="zoom-out-up"
                                    style={{ fontSize: "60px" }}
                                >
                                    Men's Fashion
                                </h1>
                                <h1
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                    style={{ fontSize: "60px" }}
                                >
                                    For New Products
                                </h1>
                            </div>
                        </div>

                        {/* ===== Second Slide ===== */}
                        <div className="carousel-item">
                            <img
                                src="https://maroko-demo.myshopify.com/cdn/shop/files/slide1_image_a28406db-2482-4a15-afbc-c774ccd97265_1898x.jpg?v=1683523529"
                                className="d-block w-100"
                                alt="Second Slide"
                            />
                            <div
                                style={{ position: "absolute", top: "250px", left: "100px" }}
                            >
                                <h5>Get up to 80%</h5>
                                <h1
                                    data-aos="zoom-out-up"
                                    style={{ fontSize: "60px" }}
                                >
                                    Women's Fashion
                                </h1>
                                <h1
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                    style={{ fontSize: "60px" }}
                                >
                                    For New Products
                                </h1>
                            </div>
                        </div>
                    </div>

                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev"
                    >
                        <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                    </button>

                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next"
                    >
                        <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default Header;
