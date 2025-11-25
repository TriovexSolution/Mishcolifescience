import React, { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Testimonials() {
  // Testimonial Data focused on the Indian Domestic Market and Key Values
  const testimonialsData = [
    {
      quote:
        "Mishco's adherence to WHO-GMP and commitment to ethical practice builds immense trust. Their quality assurance protocols ensure patient safety, making them a reliable partner for my practice.",
      name: "Dr. Aarti Sharma",
      title: "Consulting Physician, Mumbai, India",
      avatar: "https://i.pravatar.cc/150?img=47", // Placeholder for avatar
    },
    {
      quote:
        "The focus on delivering affordable, high-quality branded generics is what sets Mishco apart. Their dedicated team and consistent supply chain are vital for our domestic distribution network.",
      name: "Rajesh Patel",
      title: "Pharma Distributor, Gujarat, India",
      avatar: "https://i.pravatar.cc/150?img=61", // Placeholder for avatar
    },
    {
      quote:
        "With over 45 years of expertise, Mishco has built a legacy of excellence. We rely on their commitment to timely execution and compliance for our global and domestic sourcing needs.",
      name: "Sanjay Menon",
      title: "Sourcing Head, Large Indian Pharma Chain",
      avatar: "https://i.pravatar.cc/150?img=5", // Placeholder for avatar
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonialsData.length) % testimonialsData.length
    );
  };

  const currentTestimonial = testimonialsData[currentIndex];

  // Variants
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

  // Custom variant for the sliding testimonial content
  const testimonialContentVariant = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.5 } },
  };

  return (
    <div className="container-fluid py-5 px-5 d-flex justify-content-center align-items-center">
      <div
        className="container-fluid p-4 p-md-5"
        style={{ backgroundColor: "#e7f1f9" }}
      >
        <div className="row align-items-center">
          {/* LEFT SECTION: Introduction */}
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
              Partner Feedback
            </p>

            <h3
              className="fw-bold mb-3"
              style={{
                fontSize: "28px",
                lineHeight: "36px",
                color: "#272b34",
              }}
            >
              Building Trust with <br className="d-none d-lg-block" />
              Indian Healthcare Professionals
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
              Our commitment to quality and service is reflected in the strong,
              ethical relationships we build with doctors and distributors
              across India.
            </p>
          </motion.div>

          {/* RIGHT SECTION: Testimonial Content */}
          <motion.div
            className="col-12 col-lg-7 p-3 p-md-4 p-lg-5"
            style={{ fontFamily: "Sen, sans-serif" }}
            variants={rightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* ===== TEXT BLOCK WITH RESPONSIVE FIXED HEIGHT ===== */}
            {/* Mobile height */}
            <div
              className="d-block d-sm-none"
              style={{ height: "120px", overflow: "hidden" }}
            >
              <motion.p
                key={currentIndex}
                variants={testimonialContentVariant}
                initial="initial"
                animate="animate"
                className="mb-4 mb-md-5"
                style={{
                  fontSize: "20px",
                  lineHeight: "30px",
                  color: "#272b34",
                  fontWeight: "500",
                }}
              >
                {currentTestimonial.quote}
              </motion.p>
            </div>

            {/* Tablet height */}
            <div
              className="d-none d-sm-block d-lg-none"
              style={{ height: "150px", overflow: "hidden" }}
            >
              <motion.p
                key={currentIndex}
                variants={testimonialContentVariant}
                initial="initial"
                animate="animate"
                className="mb-4 mb-md-5"
                style={{
                  fontSize: "20px",
                  lineHeight: "30px",
                  color: "#272b34",
                  fontWeight: "500",
                }}
              >
                {currentTestimonial.quote}
              </motion.p>
            </div>

            {/* Desktop height */}
            <div
              className="d-none d-lg-block"
              style={{ height: "180px", overflow: "hidden" }}
            >
              <motion.p
                key={currentIndex}
                variants={testimonialContentVariant}
                initial="initial"
                animate="animate"
                className="mb-4 mb-md-5"
                style={{
                  fontSize: "20px",
                  lineHeight: "30px",
                  color: "#272b34",
                  fontWeight: "500",
                }}
              >
                {currentTestimonial.quote}
              </motion.p>
            </div>
            {/* ========================================================== */}

            {/* PROFILE + ARROWS */}
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-4">
              {/* PROFILE */}
              <div className="d-flex align-items-center">
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  className="rounded-circle me-3"
                  width="60"
                  height="60"
                />
                <div>
                  <h4
                    className="fw-bold m-0"
                    style={{ fontFamily: "Sen, sans-serif", fontSize: "20px" }}
                  >
                    {currentTestimonial.name}
                  </h4>
                  <p
                    className="text-muted m-0"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    {currentTestimonial.title}
                  </p>
                </div>
              </div>

              {/* ARROWS */}
              <div className="d-flex gap-3">
                <button
                  onClick={handlePrev}
                  className="d-flex align-items-center justify-content-center rounded-circle border-0 shadow-sm"
                  aria-label="Previous testimonial"
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
                  onClick={handleNext}
                  className="d-flex align-items-center justify-content-center rounded-circle border-0"
                  aria-label="Next testimonial"
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
