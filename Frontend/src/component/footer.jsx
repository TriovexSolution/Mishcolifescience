import React, { useState } from "react";
import logo from "../assets/image/footerlogo.png";
import { NavLink } from "react-router-dom";
import axios from "axios";
// Assuming Api holds your base URL like `http://localhost:5000`
import { Api } from "../api";

// ⭐ Backend Endpoint Configuration ⭐
const API_BASE_URL = Api;

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Simple email validation

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      // ⭐ API CALL TO SUBSCRIPTION ENDPOINT ⭐
      const response = await axios.post(
        `${API_BASE_URL}/api/subscribe/subscribe`,
        { email }
      );

      if (response.data.success) {
        setMessage(
          "🎉 Successfully subscribed! Check your email for confirmation."
        );
        setEmail(""); // Clear input on success
      } else {
        // Handle backend validation/duplicate email errors
        setMessage(
          response.data.message || "Subscription failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Subscription error:", error); // Handle network/server errors
      setMessage(
        "An error occurred. Please check your connection or try later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      style={{
        width: "100%",
        backgroundColor: "#1E5BA3",
        color: "white",
        fontFamily: "Inter, sans-serif",
        padding: "40px 0",
      }}
    >
      <style>
        {`
    .placeholder-white::placeholder {
      color: var(--ph-color);
    }
  `}
      </style>

      <div className="container">
        {/* TOP: LOGO + MENU */}
        <div className="row align-items-center mb-5 text-center text-md-start">
          {/* Logo */}
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0 d-flex justify-content-center justify-content-md-start">
            <NavLink to="/" style={{ outline: "none", boxShadow: "none" }}>
              <img
                src={logo}
                alt="Mishco Lifescience LLP Logo"
                style={{ height: "55px", outline: "none", boxShadow: "none" }}
              />
            </NavLink>
          </div>
          {/* Menu */}
          <div className="col-lg-6 col-md-12">
            <ul
              className="d-flex flex-wrap justify-content-center justify-content-lg-end gap-3 gap-md-4"
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                fontSize: "16px",
                fontWeight: 200,
              }}
            >
              <NavLink
                to="/"
                className="nav-link "
                style={{ outline: "none", boxShadow: "none" }}
              >
                <li>Home</li>
              </NavLink>

              <NavLink
                to="/products"
                className="nav-link "
                style={{ outline: "none", boxShadow: "none" }}
              >
                <li>Products</li>
              </NavLink>

              <NavLink
                to="/about"
                className="nav-link "
                style={{ outline: "none", boxShadow: "none" }}
              >
                <li>About Us</li>
              </NavLink>

              <NavLink
                to="/contact"
                className="nav-link "
                style={{ outline: "none", boxShadow: "none" }}
              >
                <li>Contact</li>
              </NavLink>

              <NavLink
                to="/blog"
                className="nav-link "
                style={{ outline: "none", boxShadow: "none" }}
              >
                <li>Blog</li>
              </NavLink>
            </ul>
          </div>
        </div>
        {/* NEWSLETTER SECTION */}
        <div
          className="rounded p-4 p-md-5" // Added p-md-5 for desktop padding
          style={{
            backgroundColor: "rgba(255,255,255,0.1)",
          }}
        >
          <div className="row align-items-center text-center text-md-start">
            {/* Text */}
            <div className="col-md-6 mb-4 mb-md-0">
              <h2
                style={{
                  fontWeight: 700, // Adjusted font size to scale better on mobile
                  fontSize: "clamp(24px, 4vw, 30px)",
                  lineHeight: "1.3",
                  fontFamily: "Sen, sans-serif",
                }}
              >
                Get updates on new products and partnerships from Mishco
              </h2>
            </div>
            {/* Input + Button (Subscription Form) */}
            <div className="col-md-6">
              <form onSubmit={handleSubscribe}>
                {/* ⭐ IMPROVEMENT: Use 'flex-column' on small screens, 'flex-sm-row' on small-to-up ⭐ */}

                <div className="d-flex flex-column flex-sm-row w-100 gap-3 text-light">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="placeholder-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      height: "50px",
                      padding: "0 15px",
                      borderRadius: "3px",
                      border: "1px solid #fff",
                      backgroundColor: "transparent",
                      color: "white",
                      "--ph-color": "rgba(255,255,255,0.9)", // inline variable
                    }}
                  />

                  <button
                    type="submit"
                    className="btn w-100 w-sm-auto rounded-0" // ⭐ IMPROVEMENT: w-100 on mobile, auto width on small-to-up ⭐
                    disabled={loading}
                    style={{
                      backgroundColor: "white",
                      color: "#1E5BA3", // Changed text color to match background for contrast
                      height: "50px",
                      padding: "0 25px",
                      fontWeight: 600,
                      fontFamily: "Sen, sans-serif",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {loading ? "Subscribing..." : "Subscribe"}
                  </button>
                </div>
              </form>
              {/* Subscription Status Message */}
              {message && (
                <p
                  className="mt-3 text-center text-sm-start" // ⭐ IMPROVEMENT: Center text on mobile, align left on small-to-up ⭐
                  style={{
                    fontSize: "14px", // Adjusting success/error color for better visibility against dark background
                    color: message.startsWith("🎉") ? "#90EE90" : "#FA8072",
                  }}
                >
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* ADDRESS + CONTACTS + SOCIALS */}
        <div className="row mt-5 text-center text-md-start">
          <div className="col-md-6 mb-4 mb-md-0">
            {/* Adjusted margin for better spacing on mobile */}
            {/* Corporate Office Address */}
            <p style={{ margin: 0, opacity: 0.9, fontWeight: 600 }}>
              Mishco Lifescience LLP
            </p>

            <p style={{ margin: "5px 0 0 0", opacity: 0.9 }}>
              Ahmedabad, Gujarat, India
            </p>
            {/* Phone Contacts */}
            <p style={{ margin: "10px 0 0 0", opacity: 0.9, fontSize: "15px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="25px"
                height="25px"
                viewBox="0 0 32 32"
                version="1.1"
              >
                <g id="icomoon-ignore"></g>
                <path
                  d="M23.407 30.394c-2.431 0-8.341-3.109-13.303-9.783-4.641-6.242-6.898-10.751-6.898-13.785 0-2.389 1.65-3.529 2.536-4.142l0.219-0.153c0.979-0.7 2.502-0.927 3.086-0.927 1.024 0 1.455 0.599 1.716 1.121 0.222 0.442 2.061 4.39 2.247 4.881 0.286 0.755 0.192 1.855-0.692 2.488l-0.155 0.108c-0.439 0.304-1.255 0.869-1.368 1.557-0.055 0.334 0.057 0.684 0.342 1.068 1.423 1.918 5.968 7.55 6.787 8.314 0.642 0.6 1.455 0.685 2.009 0.218 0.573-0.483 0.828-0.768 0.83-0.772l0.059-0.057c0.048-0.041 0.496-0.396 1.228-0.396 0.528 0 1.065 0.182 1.596 0.541 1.378 0.931 4.487 3.011 4.487 3.011l0.050 0.038c0.398 0.341 0.973 1.323 0.302 2.601-0.695 1.327-2.85 4.066-5.079 4.066zM9.046 2.672c-0.505 0-1.746 0.213-2.466 0.728l-0.232 0.162c-0.827 0.572-2.076 1.435-2.076 3.265 0 2.797 2.188 7.098 6.687 13.149 4.914 6.609 10.532 9.353 12.447 9.353 1.629 0 3.497-2.276 4.135-3.494 0.392-0.748 0.071-1.17-0.040-1.284-0.36-0.241-3.164-2.117-4.453-2.988-0.351-0.238-0.688-0.358-0.999-0.358-0.283 0-0.469 0.1-0.532 0.14-0.104 0.111-0.39 0.405-0.899 0.833-0.951 0.801-2.398 0.704-3.424-0.254-0.923-0.862-5.585-6.666-6.916-8.459-0.46-0.62-0.641-1.252-0.538-1.877 0.187-1.133 1.245-1.866 1.813-2.26l0.142-0.099c0.508-0.363 0.4-1.020 0.316-1.242-0.157-0.414-1.973-4.322-2.203-4.781-0.188-0.376-0.336-0.533-0.764-0.533z"
                  fill="#ffff"
                ></path>
              </svg>
              <a
                href="tel:+918980007080"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                8980007080
              </a>
              ,
              <a
                href="tel:+918980001090"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                8980001090
              </a>
            </p>
            {/* Email Contacts */}
            <div style={{ marginTop: "3px" }} className="align-item-center">
              <p
                className="mb-1 align-item-center my-auto "
                style={{ opacity: 0.9, fontSize: "15px" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#ffff"
                  width="25px"
                  height="25px"
                  viewBox="0 0 32 32"
                >
                  <title />

                  <g data-name="Layer 17" id="Layer_17">
                    <path d="M25.12,6H6.88A3.89,3.89,0,0,0,3,9.89V21.11A3.89,3.89,0,0,0,6.88,25H25.12A3.89,3.89,0,0,0,29,21.11V9.89A3.89,3.89,0,0,0,25.12,6Zm0,2,.16,0L16,14.76,6.72,8l.16,0ZM27,21.11A1.89,1.89,0,0,1,25.12,23H6.88A1.89,1.89,0,0,1,5,21.11V9.89a1.92,1.92,0,0,1,.1-.59l10.32,7.51a1,1,0,0,0,1.18,0L26.91,9.3a1.92,1.92,0,0,1,.1.59Z" />
                  </g>
                </svg>

                <a
                  href="mailto:Info@mishcolife.com"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    marginLeft: "2px",
                  }}
                >
                  Info@mishcolife.com
                </a>
              </p>
            </div>
          </div>
          {/* SOCIAL ICONS */}
          {/* ⭐ IMPROVEMENT: Added align-self-stretch and use flex-column-reverse on mobile to put icons above contacts if needed ⭐ */}

          <div className="col-md-6 d-flex justify-content-center justify-content-md-end gap-4 mt-4 mt-md-0 align-items-md-end align-self-stretch">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/mishco-lifescience/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white", outline: "none", boxShadow: "none" }}
            >
              <i className="bi bi-linkedin fs-5"></i>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/mishco_lifescience?igsh=MTdvdWdmamtuMjA5ZQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white", outline: "none", boxShadow: "none" }}
            >
              <i className="bi bi-instagram fs-5"></i>
            </a>
            {/* Facebook */}
            {/* <a
              href="https://www.facebook.com/MishcoLifescienceLLP"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white" }}
            >
              <i className="bi bi-facebook fs-5"></i>
            </a> */}
          </div>
        </div>
        {/* COPYRIGHT */}
        <div className="row mt-4 pt-3 border-top border-light border-opacity-25">
          {/* LEFT SIDE */}
          <div className="col-md-6 col-12 text-center text-md-start">
            <p className="mb-0" style={{ opacity: 0.7, fontSize: "14px" }}>
              © {new Date().getFullYear()} Mishco Lifescience LLP. All rights
              reserved.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-md-6 col-12 text-center text-md-end mt-2 mt-md-0">
            <p className="mb-0" style={{ opacity: 0.8, fontSize: "14px" }}>
              Created by{" "}
              <a
                href="https://triovexsolution.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  fontWeight: "600",
                  color: "#ffff",
                  outline: "none",
                  boxShadow: "none",
                }}
              >
                Triovex Solution
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
