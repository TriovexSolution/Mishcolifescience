import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const AboutMissionCard = () => {
  // Variants for initial position and hover animation
  const leftVariant = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    hover: { x: -10 }, // subtle movement on hover
  };

  const rightVariant = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    hover: { x: 10 }, // subtle movement on hover
  };

  return (
    <section className="py-5 px-md-4 px-lg-5">
      <div className="container-fluid px-auto ">
        <div
          className="row g-0 overflow-hidden"
          style={{ backgroundColor: "#EAF5FF" }}
        >
          {/* ---- ABOUT US ---- */}
          <motion.div
            className="col-12 col-md-6 p-4 p-md-5 border-end border-1 my-5"
            variants={leftVariant}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
          >
            <h2 className="text-uppercase fs-6 fw-semibold text-secondary mb-3">
              Advancing Healthcare with 45+ Years of Expertise
            </h2>

            <h3 className="fw-bold text-dark lh-sm mb-3">
              Mishco Lifescience LLP: Dynamic Global Pharmaceutical Company
            </h3>

            <p className="text-muted lead mb-4 text-md-justify ">
              Founded with a mission to make healthcare affordable, reliable,
              and accessible, Mishco Lifescience LLP is a dynamic pharmaceutical
              company engaged in the development, marketing, and export of
              branded generic formulations. We operate with a strong sense of
              responsibility toward patients and healthcare providers.
            </p>

            <NavLink
              to="/about"
              className="text-primary fw-semibold text-decoration-none"
              style={{ fontSize: "1rem" }}
            >
              Read More →
            </NavLink>
          </motion.div>

          {/* ---- OUR MISSION ---- */}
          <motion.div
            className="col-12 col-md-6 p-4 p-md-5 my-5"
            variants={rightVariant}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
          >
            <h2 className="text-uppercase fs-6 fw-semibold text-secondary mb-3">
              Our Vision & Mission
            </h2>

            <h3 className="fw-bold text-dark lh-sm mb-3">
              Delivering Quality, Affordable Healthcare to Every Individual
            </h3>

            <p className="text-muted lead mb-4">
              <strong>Our Vision:</strong> To become a globally recognized
              healthcare company known for trust, innovation, and excellence.{" "}
              <br />
              <br />
              <strong>Our Mission:</strong> To make quality healthcare
              affordable for every individual and to deliver value-driven
              partnerships across the pharmaceutical ecosystem.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Responsive Tweaks */}
      <style>{`
        @media (max-width: 575.98px) {
          h3 {
            font-size: 1.1rem !important;
          }
          .lead {
            font-size: 0.95rem !important;
          }
        }
        @media (min-width: 576px) and (max-width: 991.98px) {
          h3 {
            font-size: 1.3rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutMissionCard;
