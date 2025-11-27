import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import mishcoLogo from "../assets/image/miscologo.png";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  useEffect(() => {
    // Auto Close Navbar on Mobile When Clicking Any NavLink
    const navLinks = document.querySelectorAll(".nav-link");
    const navbarCollapse = document.getElementById("navbarNav");

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navbarCollapse.classList.contains("show")) {
          // Bootstrap 5 collapse instance
          window.bootstrap.Collapse.getInstance(navbarCollapse).hide();
        }
      });
    });
  }, []);

  return (
    <section
      className="w-100 position-relative sticky-top"
      style={{ backgroundColor: "#EAF5FF", zIndex: 10 }}
    >
      <nav
        className="navbar navbar-expand-lg navbar-light py-2 custom-navbar"
        style={{ backgroundColor: "#EAF5FF" }}
      >
        <div className="container-fluid px-4 mx-5">
          {/* Logo */}
          <a className="navbar-brand" href="/" style={{ outline: "none", boxShadow: "none" }}>
            <img src={mishcoLogo} alt="Mishco Life Science LLP" height="50" />
          </a>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Nav Menu */}
          <div
            className="collapse navbar-collapse justify-content-end mobile-animate border-0"
            id="navbarNav"
          >
            <ul className="navbar-nav gap-4">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link fw-semibold text-danger border-0"
                      : "nav-link fw-semibold"
                  }
                  style={{ outline: "none", boxShadow: "none" }}
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/blog"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link fw-semibold text-danger border-0"
                      : "nav-link fw-semibold"
                  }
                  style={{ outline: "none", boxShadow: "none" }}
                >
                  Blog
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link fw-semibold text-danger"
                      : "nav-link fw-semibold"
                  }
                  style={{ outline: "none", boxShadow: "none" }}
                >
                  About Us
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/product"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link fw-semibold text-danger"
                      : "nav-link fw-semibold"
                  }
                  style={{ outline: "none", boxShadow: "none" }}
                >
                  Product
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link fw-semibold text-danger"
                      : "nav-link fw-semibold"
                  }
                  style={{ outline: "none", boxShadow: "none" }}
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Navbar Animation CSS */}
      <style>{`
        /* Mobile Slide + Fade Animation */
        @media (max-width: 991px) {
          .mobile-animate.collapse:not(.show) {
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease-in-out;
          }
          .mobile-animate.collapse.show {
            opacity: 1;
            transform: translateY(0);
            transition: all 0.35s ease-out;
          }
        }

        .custom-navbar {
          transition: box-shadow 0.3s ease;
        }

        /* Smooth shadow on scroll */
        .sticky-top.scrolled {
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
        }
      `}</style>
    </section>
  );
}
