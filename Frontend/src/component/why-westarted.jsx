import React from "react";
import img1 from "../assets/image/whywestarted.jpg";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
const WhyWeStartedSection = () => {
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
  return (
    <section className="py-5 bg-white position-relative ">
      <div className="container-fluid px-5 position-relative">
        <div className="row align-items-center g-5 pb-5">
          {/* IMAGE COLUMN */}
          <div className="col-6 col-lg-8">
            <motion.div
              className="col-12 col-lg-8"
              variants={leftVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="position-relative overflow-hidden ">
                <img
                  src={img1}
                  alt="Pharmacy team helping customer"
                  className="img-fluid w-100"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </motion.div>
          </div>
          {/* TEXT CARD */}
          <div className="col-6 col-lg-4 bg-white p-4 p-lg-5 why-text-card">
            <motion.div
              className="col-12 col-lg-8 inner-text-content" // Added a helper class here
              variants={rightVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3
                className="text-uppercase text-muted fw-semibold fs-6 mb-3"
                style={{
                  fontFamily: "Inter ,sans-serif",
                  fontWeight: "600",
                  fontSize: "18px",
                  lineHeight: "20px",
                }}
              >
                OUR CORE MISSION
              </h3>
              <h1
                className="fw-bold text-dark lh-sm mb-4 display-6"
                style={{
                  fontFamily: "Sen ,sans-serif",
                  fontWeight: "700",
                  fontSize: "40px",
                  lineHeight: "64px",
                }}
              >
                Delivering Quality Healthcare, Accessible to Communities
                Worldwide
              </h1>
              <p
                className="text-muted lead mb-4"
                style={{
                  fontFamily: "Inter ,sans-serif",
                  fontWeight: "400",
                  fontSize: "16px",
                  lineHeight: "28px",
                }}
              >
                At Mishco Lifescience LLP, we are committed to making
                high-quality healthcare affordable, reliable, and accessible
                worldwide. As a progressive pharmaceutical company, we develop,
                market, and export trusted branded generics that meet strict
                international standards. With a strong sense of responsibility
                toward patients and healthcare professionals, we ensure every
                product reflects the highest levels of quality, safety, and
                therapeutic value. Driven by science, ethics, and innovation, we
                continue to expand our reach and improve lives across global
                markets.
              </p>
              <NavLink
                to={"contact"}
                className="btn btn-primary px-4 py-3 fw-semibold bg-[#246CB3] rounded-0"
                style={{
                  fontFamily: "Sen ,sans-serif",
                  fontWeight: "700",
                  fontSize: "18px",
                  lineHeight: "24px",
                }}
              >
                Conatct Us
              </NavLink>
            </motion.div>
          </div>
        </div>
      </div>
      {/* ---------- RESPONSIVE OVERLAY POSITIONING ---------- */}
      <style>{`
        /* Desktop (Large Screens): Only apply complex layout above 1250px */
        @media (min-width: 1250px) {
          .why-text-card {
            position: absolute;
            bottom: 0%;
            left: 74%;
            transform: translateX(-50%);
            width: 68%;
            height: 71%; 
          }
        }
        
        /* Tablet/Intermediate View: Switch to stacked layout below 1250px (768px to 1249.98px) */
        @media (min-width: 768px) and (max-width: 1249.98px) { 
          .why-text-card {
            position: relative !important;
            width: 100% !important;
            left: 0 !important;
            bottom: 0 !important;
            transform: none !important;
            margin-top: 1rem;
          }
          /* FIX: Ensure the inner text content takes full width when stacked */
          .why-text-card .col-12.col-lg-8 {
            width: 100% !important; 
          }
        }

        /* Mobile View (Below 768px) */
        @media (max-width: 767.98px) {
          .col-6 {
            width: 100%; 
          }
          .why-text-card {
            position: relative !important;
            width: 100%;
            left: 0 !important;
            bottom: 0 !important;
            transform: none !important;
            margin-top: 1.5rem;
          }
          /* FIX: Ensure the inner text content takes full width when stacked */
          .why-text-card .col-12.col-lg-8 {
            width: 100% !important; 
          }
        }
      `}</style>
    </section>
  );
};
export default WhyWeStartedSection;