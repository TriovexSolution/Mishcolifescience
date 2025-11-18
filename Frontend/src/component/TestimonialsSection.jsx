import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Testimonials() {
  // Variants
  const leftVariant = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const rightVariant = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="container-fluid py-5 px-5 d-flex justify-content-center align-items-center">
      <div className="container-fluid p-4 p-md-5" style={{ backgroundColor: "#e7f1f9" }}>
        <div className="row align-items-center">

          {/* LEFT SECTION */}
          <motion.div
            className="col-12 col-lg-5 border-lg-end p-3 p-md-4 p-lg-5 text-center text-lg-start border-lg-end"
            style={{ fontFamily: "Sen, sans-serif" }}
            variants={leftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p
              className="text-uppercase fw-semibold mb-2"
              style={{
                letterSpacing: "4px",
                color: "#575757",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Testimonials
            </p>

            <h3
              className="fw-bold mb-3"
              style={{
                fontSize: "28px",
                lineHeight: "36px",
                color: "#272b34",
              }}
            >
              What people say <br className="d-none d-lg-block" />
              about our blog
            </h3>

            <p
              className="mb-0"
              style={{
                fontSize: "18px",
                color: "#4f5562",
                lineHeight: "1.6",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </p>
          </motion.div>

          {/* RIGHT SECTION */}
          <motion.div
            className="col-12 col-lg-7 p-3 p-md-4 p-lg-5"
            style={{ fontFamily: "Sen, sans-serif" }}
            variants={rightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p
              className="mb-4 mb-md-5"
              style={{
                fontSize: "20px",
                lineHeight: "30px",
                color: "#272b34",
                fontWeight: "500",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            {/* PROFILE + ARROWS */}
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-4">

              {/* PROFILE */}
              <div className="d-flex align-items-center">
                <img
                  src="https://i.pravatar.cc/150?img=11"
                  alt="Profile"
                  className="rounded-circle me-3"
                  width="60"
                  height="60"
                />
                <div>
                  <h4
                    className="fw-bold m-0"
                    style={{ fontFamily: "Sen, sans-serif", fontSize: "20px" }}
                  >
                    Jonathan Vallem
                  </h4>
                  <p
                    className="text-muted m-0"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    New York, USA
                  </p>
                </div>
              </div>

              {/* ARROWS */}
              <div className="d-flex gap-3">
                <button
                  className="d-flex align-items-center justify-content-center rounded-circle border-0 shadow-sm"
                  style={{
                    width: "55px",
                    height: "55px",
                    background: "#ffffff",
                    fontSize: "24px",
                    color: "#2e2e2e",
                  }}
                >
                  ←
                </button>

                <button
                  className="d-flex align-items-center justify-content-center rounded-circle border-0"
                  style={{
                    width: "55px",
                    height: "55px",
                    background: "#2d2f3a",
                    fontSize: "24px",
                    color: "#ffffff",
                  }}
                >
                  →
                </button>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
