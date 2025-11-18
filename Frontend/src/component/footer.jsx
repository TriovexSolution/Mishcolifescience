import React from "react";
import logo from "../assets/image/miscologo2.png";
import { NavLink } from "react-router-dom";

export default function Footer() {
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
      <div className="container">
        {/* TOP: LOGO + MENU */}
        <div className="row align-items-center mb-5 text-center text-md-start">
          {/* Logo */}
          <div className="col-lg-6 col-md-12 mb-3 mb-md-0 d-flex justify-content-center justify-content-md-start">
            <img src={logo} alt="Mishco" style={{ height: "55px" }} />
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
              <NavLink to="/" className="nav-link ">
                <li>Home</li>
              </NavLink>
              <NavLink to="/blog" className="nav-link ">
                <li>Blog</li>
              </NavLink>
              <NavLink to="/about" className="nav-link ">
                <li>About us</li>
              </NavLink>
              <NavLink to="/contact" className="nav-link ">
                <li>Contact us</li>
              </NavLink>
              <NavLink to="/privacypolicy" className="nav-link ">
                <li>Privacy Policy</li>
              </NavLink>
            </ul>
          </div>
        </div>

        {/* NEWSLETTER SECTION */}
        <div
          className="rounded"
          style={{
            backgroundColor: "rgba(255,255,255,0.1)",
            padding: "40px 25px",
          }}
        >
          <div className="row align-items-center text-center text-md-start">
            {/* Text */}
            <div className="col-md-6 mb-4 mb-md-0">
              <h2
                style={{
                  fontWeight: 700,
                  fontSize: "30px",
                  lineHeight: "42px",
                  fontFamily: "Sen, sans-serif",
                }}
              >
                Subscribe to our newsletter to get latest updates and news
              </h2>
            </div>

            {/* Input + Button */}
            <div className="col-md-6">
              <div className="d-flex flex-column flex-sm-row w-100 gap-3 text-light">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="flex-grow-1"
                  style={{
                    height: "50px",
                    padding: "0 15px",
                    borderRadius: "3px",
                    border: "1px solid #fff",
                    backgroundColor: "transparent",
                    color: "white",
                  }}
                />

                <button
                  className="btn rounded-0"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    height: "50px",
                    padding: "0 25px",
                    fontWeight: 600,
                    fontFamily: "Sen, sans-serif",
                    whiteSpace: "nowrap",
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ADDRESS + SOCIALS */}
        <div className="row mt-5 text-center text-md-start">
          <div className="col-md-6 mb-3 mb-md-0">
            <p style={{ margin: 0, opacity: 0.9 }}>
              Finstreet 118 2561 Fintown
            </p>
            <p style={{ margin: 0, opacity: 0.9 }}>
              Hello@finsweet.com &nbsp;&nbsp; 020 7993 2905
            </p>
          </div>

          {/* SOCIAL ICONS */}
          <div className="col-md-6 d-flex justify-content-center justify-content-md-end gap-4 mt-3 mt-md-0">
            <i className="bi bi-facebook"></i>
            <i className="bi bi-twitter"></i>
            <i className="bi bi-instagram"></i>
            <i className="bi bi-linkedin"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}
