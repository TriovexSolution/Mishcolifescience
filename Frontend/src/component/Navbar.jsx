import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import mishcoLogo from "../assets/image/miscologo.png";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <section
      className="w-100 position-relative sticky-top position-sticky"
      style={{ backgroundColor: "#EAF5FF" }}
    >
      <nav
        className="navbar navbar-expand-lg navbar-light  position-sticky py-2"
        style={{ backgroundColor: "#EAF5FF" }}
      >
        <div
          className="container-fluid px-4 mx-5"
          style={{ backgroundColor: "#EAF5FF" }}
        >
          {/* Logo */}
          <a className="navbar-brand" href="/">
            <img src={mishcoLogo} alt="Mishco Life Science LLP" height="45" />
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

          {/* Menu */}
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav gap-4">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link fw-semibold text-danger border-0 "
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
                      ? "nav-link fw-semibold text-danger"
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

          {/* Desktop Contact */}
          {/* <div className="d-none d-lg-block">
            
          </div> */}
        </div>
      </nav>
    </section>
  );
}
