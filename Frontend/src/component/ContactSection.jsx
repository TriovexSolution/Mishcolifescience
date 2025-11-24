import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function ContactSection() {
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        minHeight: "75vh",
        fontFamily: "Inter, sans-serif",
        padding: "20px",
      }}
    >
      {/* Title */}
      <motion.h2
        style={{
          fontWeight: 700,
          color: "#1D2433",
          fontFamily: "Sen, sans-serif",
          lineHeight: "1.3",
          fontSize: "clamp(24px, 4vw, 40px)",
          marginBottom: "12px",
        }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
      Partner with a Trusted Name in <br /> Global Healthcare Solutions
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        style={{
          color: "#6B7280",
          maxWidth: "450px",
          fontSize: "clamp(14px, 2vw, 18px)",
          lineHeight: "1.6",
          marginBottom: "30px",
        }}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        Ready to source <strong>GMP compliant branded generic formulations</strong> or establish an export partnership? Our team in <strong>Ahmedabad, India</strong>, is ready to deliver value, quality, and ethical service.
      </motion.p>

      {/* Button */}
      <NavLink to={"contact"}>
      <motion.button
        className="btn"
        style={{
          backgroundColor: "#1E5BA3",
          padding: "12px 35px",
          color: "white",
          fontSize: "16px",
          fontWeight: 600,
          borderRadius: "4px",
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.05, backgroundColor: "#164E87" }}
      >
        Contact Us
      </motion.button>
      </NavLink>
    </div>
  );
}
