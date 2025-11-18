import React from "react";
import { motion } from "framer-motion";
import img from "../assets/image/Hero1.jpg";

export default function FeaturedPost() {
  const leftVariant = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const rightVariant = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };
  return (
    <div className="container-fluid py-5" style={{ backgroundColor: "#EAF5FF" }}>
      <div className="row align-items-center">

        {/* Text Section (slide from left) */}
        <motion.div
          className="col-12 col-md-6 d-flex flex-column justify-content-center px-4 px-md-5 text-center text-md-start"
          variants={leftVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p
            className="text-uppercase small text-muted mb-2"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "20px",
              letterSpacing: "3px",
            }}
          >
            Featured Post
          </p>

          <h3
            className="fw-bold mb-3"
            style={{
              fontFamily: "Sen, sans-serif",
              fontWeight: 700,
              fontSize: "28px",
              lineHeight: "36px",
              letterSpacing: "-1px",
            }}
          >
            Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit
          </h3>

          <p
            className="text-muted mb-3"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "28px",
              letterSpacing: "0px",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit.
          </p>

          <button
            className="btn btn-primary w-50 rounded-0 py-2 px-4"
            style={{
              fontFamily: "Sen, sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "0px",
            }}
          >
            Read More
          </button>
        </motion.div>

        {/* Image Section (slide from right) */}
        <motion.div
          className="col-12 col-md-6 d-flex justify-content-center mt-4 mt-md-0 px-0"
          variants={rightVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src={img}
            className="img-fluid"
            alt="featured"
            style={{
              maxWidth: "90%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </motion.div>

      </div>
    </div>
  );
}
