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
              Mishco Lifescience LLP: Trusted Leader in Global Branded Generics
            </h2>

            <h3 className="fw-bold text-dark lh-sm mb-3">
              Mishco Lifescience LLP: Dynamic Global Pharmaceutical Company
            </h3>

            <p className="text-muted lead mb-4 text-md-justify ">
              With a legacy built on quality, integrity, and scientific
              excellence, Mishco Lifescience LLP is a trusted Ahmedabad-based
              pharmaceutical company specializing in the development, marketing,
              and export of branded generics and nutraceuticals. Committed to
              making healthcare affordable and accessible worldwide, we deliver
              formulations that meet stringent regulatory standards, ensuring
              safety, efficacy, and patient well-being. Our consistency,
              transparency, and ethical approach have earned lasting trust from
              healthcare professionals and partners across markets.
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
              Delivering Quality, Accessible, and Affordable Healthcare for All
            </h3>

            <p className="text-muted lead mb-4">
              <strong>Our Vision:</strong> To emerge as a globally respected
              healthcare organization recognized for innovation, trust, and
              unwavering excellence in the pharmaceutical and nutraceutical
              sectors.
              <br />
              <br />
              <strong>Our Mission:</strong> To make high-quality, affordable
              healthcare accessible to every individual and to build long-term,
              value-driven partnerships within the global pharmaceutical
              ecosystem through ethical practices, scientific advancement, and
              customer-centric solutions.
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
