import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import logo from "../assets/logo_sigma.png";
import { IoHome } from "react-icons/io5";
import axios from "axios";

export default function Navbar() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Enquiry
  const handleSubmit = async (e) => {
    e.preventDefault();
    const API = import.meta.env.VITE_API_ENQUIRY_URL;
    setLoading(true);
    try {
      const res = await axios.post(`${API}/enquiry`, formData);
      setSuccess(res.data.message);
      setFormData({ name: "", email: "", phone: "", message: "" }); // reset form
    } catch (err) {
      console.error(err);
      setSuccess("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  // end form logic

  const [auth, setAuth] = useAuth();
  const [hideTopbar, setHideTopbar] = useState(false);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    alert("Successfully logout");
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div>
        <div
          className="topbar d-flex align-items-center fixed-top bg-dark  text-light py-1   "
          style={{
            zIndex: 1051,
            height: "50px",
            padding: "0 10px",
          }}>
          <div className="container d-flex justify-content-center justify-content-md-between">
            <div className="contact-info d-flex align-items-center">
              <i className="bi bi-envelope d-flex align-items-center me-3">
                <a
                  href="mailto:contact@example.com"
                  className="text-light text-decoration-none ">
                  sanjay@sigmalifts.co.in
                </a>
              </i>
              <i className="bi bi-phone d-flex align-items-center ">
                <span className="phone">+91-9987429648</span>
              </i>
            </div>
            <div className="social-links  d-flex align-items-center">
              {/* <a href="#" className="text-light ms-3">
                <FaXTwitter />
              </a>
              <a href="#" className="text-light ms-3">
                <FaFacebook />
              </a>
              <a href="#" className="text-light ms-3">
                <FaInstagram />
              </a>
              <a href="#" className="text-light ms-3">
                <FaLinkedin />
              </a> */}
              <button
                type="button"
                className="btn ms-3 text-light enquiry-btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal">
                Enquiry
              </button>

              {/* Modal */}
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Enquiry Form
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"></button>
                    </div>

                    {/* Modal Body with Form */}
                    <div className="modal-body">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label className="form-label">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            className="form-control"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Message</label>
                          <textarea
                            name="message"
                            className="form-control"
                            rows="3"
                            placeholder="Write your enquiry here..."
                            value={formData.message}
                            onChange={handleChange}></textarea>
                        </div>

                        {/* Success message */}
                        {success && (
                          <div className="alert alert-info">{success}</div>
                        )}

                        {/* Footer */}
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal">
                            Close
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}>
                            {loading ? "Submitting..." : "Submit Enquiry"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Navbar */}
      <div>
        <nav
          className={`navbar navbar-expand-lg fixed-top  ${
            scrolled ? "scrolled-navbar" : ""
          }`}
          style={{ marginTop: "50px" }}>
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img
                src={logo}
                style={{ width: "220px", height: "45px" }}
                alt=""
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link px-2" to="/">
                    <IoHome style={{ fontSize: "25px" }} />
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link px-2" to="/about">
                    About Us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link px-2" to="/products">
                    Products
                  </NavLink>
                </li>

                {/* ✅ Show only when logged in */}
                {auth?.user && (
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle px-2"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                      {auth?.user.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}>
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/login"
                          onClick={handleLogout}>
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                )}

                <li className="nav-item">
                  <NavLink className="nav-link px-2" to="/contact">
                    Contact Us
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
