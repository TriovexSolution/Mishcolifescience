import React, { useState } from "react";
import logo from "../assets/image/footerlogo.png";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Phone, Mail } from "lucide-react";

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
                to="/home"
                className="nav-link "
                style={{ outline: "none", boxShadow: "none" }}
              >
                <li>Home</li>
              </NavLink>

              <NavLink
                to="/product"
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
                    className="placeholder-white w-100"
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
                    className="btn  w-sm-auto  rounded-0" // ⭐ IMPROVEMENT: w-100 on mobile, auto width on small-to-up ⭐
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
              <Phone size={20} strokeWidth={1.5} />
              <a
                href="tel:+918980007080"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 500,
                  marginLeft: "5PX",
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
                <Mail size={20} strokeWidth={1.5} />

                <a
                  href="mailto:Info@mishcolife.com"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    marginLeft: "5px",
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
