import React, { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Testimonials() {
  const testimonialsData = [
    {
      quote:
        "Mishco Lifescience has consistently delivered products that meet the highest standards of quality and reliability. Their robust supply chain and responsive team make working with them exceptionally smooth and dependable.",
      name: "Dr. Kavita Sharma",
      title: "General Physician, Maharashtra, India",
      avatar: "https://i.pravatar.cc/150?img=47", // Professional female doctor
    },
    {
      quote:
        "What sets Mishco apart is their commitment to ethical business practices and timely delivery. Their branded generics have earned strong trust among doctors and patients in our region, and their service support is excellent.",
      name: "Amit Desai",
      title: "Pharma Distributor, Ahmedabad, India",
      avatar: "https://i.pravatar.cc/150?img=61", // Professional male
    },
    {
      quote:
        "We value Mishco’s transparency, consistent product availability, and high manufacturing standards. Their formulations have shown great acceptance in the market, and their team is always proactive in addressing our needs.",
      name: "Sunil Verma",
      title: "Medical Representative, Rajasthan, India",
      avatar: "https://i.pravatar.cc/150?img=8", // Confident professional
    },
    {
      quote:
        "Mishco Lifescience has been a reliable partner for years. Their focus on quality, combined with competitive pricing, allows us to support our customers with confidence. Their professionalism is truly commendable.",
      name: "Pooja Mehta",
      title: "Pharma Wholesaler, Surat, India",
      avatar: "https://i.pravatar.cc/150?img=32", // Professional female
    },
    {
      quote:
        "From product quality to documentation support, every interaction with Mishco has been seamless. Their brand portfolio is strong, and their dedication to timely supply makes them an invaluable part of our distribution network.",
      name: "Dr. Rohan Bhatt",
      title: "Consultant Physician, Gujarat, India",
      avatar: "https://i.pravatar.cc/150?img=12", // Male doctor look
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
    <div className="container-fluid py-5 px-sm-3 px-md-5 d-flex justify-content-center align-items-center">
      <div
        className="container-fluid p-3 p-md-5" // Adjusted padding here
        style={{ backgroundColor: "#e7f1f9" }}
      >
        <div className="row align-items-center">
          {/* LEFT SECTION: Introduction */}
          <motion.div
            className="col-12 col-lg-5 border-lg-end p-3 p-md-4 p-lg-5 text-center text-lg-start border-lg-end" // Ensure text is centered on mobile
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
                fontFamily: "Sen, sans-serif",
              }}
            >
              Strengthening Trust with India’s Healthcare Community
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
              Our dedication to quality, transparency, and service excellence is
              reflected in the long-standing relationships we nurture with
              doctors, pharmacists, and distributors across India. At Mishco
              Lifescience LLP, we believe that meaningful partnerships are built
              on integrity and we work every day to uphold that trust
            </p>
          </motion.div>

          {/* RIGHT SECTION: Testimonial Content */}
          <motion.div
            className="col-12 col-lg-7 p-3 p-md-4 p-lg-5" // Adjusted padding here
            style={{ fontFamily: "Sen, sans-serif" }}
            variants={rightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Quote Text - Using a min-height for consistency, but allowing growth if needed */}
            <div className="testimonial-quote-box mb-4">
              <motion.p
                key={currentIndex}
                variants={testimonialContentVariant}
                initial="initial"
                animate="animate"
                className="mb-0" // Removed extra bottom margin to manage with parent div
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

            {/* PROFILE + ARROWS - Mobile-first stacking, then row on tablet/desktop */}
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-4 mt-4"> {/* Added mt-4 for spacing */}
              {/* PROFILE */}
              <div className="d-flex align-items-center flex-column flex-sm-row text-center text-sm-start"> {/* Center text on mobile */}
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  className="rounded-circle me-0 me-sm-3 mb-3 mb-sm-0" // Adjusted margin for mobile stack
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