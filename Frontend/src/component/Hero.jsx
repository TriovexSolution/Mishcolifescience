// src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import heroImg from "../assets/image/Hero1.jpg";

export default function Hero() {
  // Framer Motion variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // delay between children
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="position-relative overflow-hidden hero-section">

      {/* BACKGROUND IMAGE */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100 hero-bg"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${heroImg}) center/cover no-repeat`,
          zIndex: 1,
        }}
      />

      {/* CONTENT */}
      <motion.div
        className="position-relative d-flex align-items-end justify-content-end h-100 container-fluid px-5 hero-content"
        style={{ zIndex: 2 }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="row w-100">
          <div className="col-12 col-lg-7 col-xl-6 text-white py-5 m4-5">

            <motion.p
              className="text-uppercase fw-bold mb-3"
              style={{
                fontSize: "clamp(0.75rem, 1vw, 1rem)",
                letterSpacing: "2px",
              }}
              variants={itemVariants}
            >
              Posted on startup
            </motion.p>

            <motion.h1
              className="fw-bold mb-4 hero-title"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3.8rem)",
                lineHeight: "1.15",
              }}
              variants={itemVariants}
            >
              Step-by-step guide to choosing
              <br className="d-none d-md-block" />
              great font pairs
            </motion.h1>

            <motion.p
              className="hero-lead mb-4"
              style={{
                maxWidth: "600px",
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                lineHeight: "1.7",
              }}
              variants={itemVariants}
            >
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident.
            </motion.p>

            <motion.a
              href="/contact"
              className="btn btn-primary px-5 py-3 rounded-pill fw-semibold hero-cta"
              style={{
                backgroundColor: "#0d6efd",
                border: "none",
                fontSize: "clamp(0.9rem, 1.1vw, 1.1rem)",
              }}
              variants={itemVariants}
            >
              Contact Now
            </motion.a>

          </div>
        </div>
      </motion.div>

      {/* RESPONSIVE CSS */}
      <style>{`
        .hero-section {
          min-height: 100vh;
          padding-top: 3rem;
          padding-bottom: 3rem;
        }
        .hero-bg {
          background-size: cover;
          background-position: center;
        }
        @media (max-width: 575.98px) {
          .hero-section { min-height: 65vh; padding: 1.8rem 0; }
          .hero-title { line-height: 1.2 !important; margin-bottom: 1rem !important; }
          .hero-lead { margin-bottom: 1.25rem; }
          .hero-bg { filter: brightness(0.80); }
        }
        @media (min-width: 576px) and (max-width: 991.98px) {
          .hero-section { min-height: 80vh; padding: 2rem 0; }
        }
        @media (min-width: 992px) {
          .hero-section { min-height: 100vh; }
        }
        .hero-title, .hero-lead { word-break: break-word; }
      `}</style>
    </section>
  );
}
