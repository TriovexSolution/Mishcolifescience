import React from "react";
import heroImg from "../assets/image/Hero1.jpg";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure bootstrap CSS is imported if using utility classes

const  AboutPage = () => {
  const colors = {
    textDark: "#212529",
    textGrey: "#6c757d",
    bluePrimary: "#2c6fb3",
    blueLight: "#eef7ff",
  };
  const leftVariant = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const rightVariant = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const styles = {
    sectionLabel: {
      fontFamily: "Inter, sans-serif",
      fontSize: "16px",
      fontWeight: "500",
      letterSpacing: "3px",
      textTransform: "uppercase",
      color: colors.textGrey,
      marginBottom: "1rem",
      paddingLeft: "7%",
    },
    heading: {
      fontFamily: "Sen, sans-serif",
      fontWeight: "700",
      fontSize: "2.5rem",
      lineHeight: "1.2",
      color: colors.textDark,
      padding: "7%",
      paddingTop: "0%",
    },
    subHeading: {
      fontFamily: "Sen, sans-serif",
      fontWeight: "700",
      fontSize: "1.5rem",
      marginBottom: "1rem",
      color: colors.textDark,
    },
    statNumber: {
      fontSize: "2rem",
      fontWeight: "700",
      fontFamily: '"Times New Roman", Times, serif',
    },
    statLabel: {
      fontSize: "0.8rem",
      opacity: "0.9",
    },
    image: {
      width: "100%",
      minHeight: "400px",
      objectFit: "cover",
    },
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* RESPONSIVE FIXES (Keep existing styles for layout) */}
      <style>
        {`
      /* MOBILE FIX: Remove absolute positioning */
      @media (max-width: 991px) {
       .about-left-box,
       .about-right-box {
        position: relative !important;
        top: auto !important;
        left: auto !important;
        right: auto !important;
        margin-top: 20px;
        padding-left: 0 !important;
        padding-right: 0 !important;
       }
      }

      /* DESKTOP: Keep your original UI */
      @media (min-width: 992px) {
       .about-left-box {
        position: absolute;
        top: 20%;
        left: 5%;
        z-index: 5;
        background: white;
       }
       .about-right-box {
        position: absolute;
        top: 20%;
        left: 55%;
        right: 5%;
        z-index: 5;
        text-align: justify;
       }
      }

      /* Stats Box Desktop Floating */
      @media (min-width: 992px) {
       .stats-box {
        position: absolute;
        bottom: 40px;
        left: 0;
        width: 65%;
        background-color: ${colors.bluePrimary};
        color: white;
        padding: 2rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
       }
      }

      /* Mobile Stats – Full width */
      @media (max-width: 991px) {
       .stats-box {
        background-color: ${colors.bluePrimary};
        padding: 1.5rem;
        margin-top: 20px;
        width: 100%;
        position: relative;
        z-index: 1;
       }
      }
       @media (max-width: 768px) {
  .about-right-box p {
    text-align: center !important;
  }
}

     `}
      </style>
      {/* ------------ HEADER SECTION (Updated) ------------- */}
      <div className="container py-5 px-3 px-lg-5">
        <div className="row justify-content-center align-items-center">
          {/* LEFT HEADING */}
          <motion.div
            className="col-lg-5 bg-white px-md-0 about-left-box"
            variants={leftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ left: "4%" }}
          >
            <div
              style={styles.sectionLabel}
              className="text-center justify-content-center"
            >
              Our Legacy of Trust
            </div>

            <h2
              style={styles.heading}
              className="text-center justify-content-center"
            >
              45+ Years of Global Pharma Excellence
            </h2>
          </motion.div>
          {/* RIGHT TEXT */}
          <motion.div
            className="col-lg-4 px-md-0 about-right-box"
            variants={rightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-muted" style={{ lineHeight: "26px" }}>
              Mishco Lifescience LLP is an Ahmedabad, India-based, WHO-GMP compliant pharmaceutical company specializing in affordable branded generic formulations and nutraceuticals for global export and marketing.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* ---------- IMAGE + STATS SECTION (Updated) ----------- */}
      <div className="container mx-auto p-0 position-relative mt-5 pt-5">
        <img
          src={heroImg}
          alt="Modern Pharmaceutical manufacturing facility"
          style={styles.image}
        />

        <div
          className="stats-box mx-auto mx-lg-0 text-white p-4 rounded shadow"
          style={{ backgroundColor: colors.bluePrimary }}
        >
          <div className="row text-center">
            <div className="col-4 border-end border-light border-opacity-25">
              <motion.div
                style={styles.statNumber}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                45+
              </motion.div>

              <div style={styles.statLabel}>Years of Industry Expertise</div>
            </div>

            <div className="col-4 border-end border-light border-opacity-25">
              <motion.div
                style={styles.statNumber}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                10+
              </motion.div>

              <div style={styles.statLabel}>International Markets Covered</div>
            </div>

            <div className="col-4">
              <motion.div
                style={styles.statNumber}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                150+
              </motion.div>

              <div style={styles.statLabel}>Branded Generic Formulations</div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* ---------- VISION & MISSION SECTION (Updated) ----------- */}

      <div className="pb-5">
        <div className="container mx-auto">
          <div
            className="row p-4 p-md-5"
            style={{ backgroundColor: "#EAF5FF" }}
          >
            {/* Mission */}
            <motion.div
              className="col-md-6 mb-5 mb-md-0"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div style={styles.sectionLabel} className="p-0">
                Our Mission
              </div>

              <h3 style={styles.subHeading}>
                Making Quality Healthcare Accessible and Affordable Worldwide
              </h3>

              <p
                className="text-muted small"
                style={{ fontFamily: "Inter ,sans-serif" }}
              >
                Our founding principle is to deliver high-quality, <strong>reliable,
                and affordable</strong> branded generic formulations. We operate with a
                strong sense of responsibility toward patients and healthcare
                providers, ensuring every product we develop, market, and export
                meets the most stringent standards of efficacy and compliance.
              </p>
            </motion.div>
            {/* Vision */}
            <motion.div
              className="col-md-6"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div style={styles.sectionLabel} className="p-0">
                Our Vision
              </div>

              <h3 style={styles.subHeading}>
                The Most Trusted Global Partner for Value-Driven Pharma
                Solutions
              </h3>

              <p
                className="text-muted small"
                style={{ fontFamily: "Inter ,sans-serif" }}
              >
                We aim to continuously expand our global reach into markets like
                CIS, MENA, Kenya, and Thailand, focusing on <strong>innovative
                formulations</strong> and robust supply chains. We strive to be the
                preferred partner for clients seeking <strong>WHO-GMP compliant</strong>,
                customized, and ethically sourced healthcare products.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
