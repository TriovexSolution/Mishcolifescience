import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// IMPORT IMAGES
import hero1 from "../assets/image/Hero1.jpg";
import hero2 from "../assets/image/hero2.jpg";
import hero3 from "../assets/image/hero4.png";

const slides = [
  {
    id: 1,
    img: hero2,
    tag: "Global Healthcare",
    title: "Quality, Trust, and 45+ Years of Experience",
    desc: "We are driven by a single purpose: to make quality healthcare accessible and affordable worldwide. Headquartered in Ahmedabad, India.Z",
  },
  {
    id: 2,
    img: hero1,
    tag: "Branded Generics",
    title: "Trusted Branded Generics, Global Footprint",
    desc: "Leading the branded generic market with a strong domestic and rapidly growing global presence.",
  },
  {
    id: 3,
    img: hero3,
    tag: "Quality & Access",
    title: "Quality, Innovation, and Accessibility Focused",
    desc: "Dedicated to quality, innovation, and accessibility, backed by WHO-GMP compliant facilities.",
  },
];

// TEXT ANIMATION VARIANTS
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Hero() {
  const [index, setIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="position-relative overflow-hidden hero-section">

      {/* BACKGROUND IMAGE (NO FADE BETWEEN SLIDES) */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          zIndex: 1,
          backgroundImage: `url(${slides[index].img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 0s", // NO FADE
        }}
      />

      {/* BLACK OVERLAY */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: "rgba(0,0,0,0.55)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* TEXT CONTENT */}
      <div
        className="position-relative d-flex align-items-end justify-content-end h-100 container-fluid px-5 hero-content"
        style={{ zIndex: 2 }}
      >
        <div className="row w-100">
          <div className="col-12 col-lg-7 col-xl-6 text-white py-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[index].id + "-text"}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {/* TAG */}
                <motion.p
                  className="text-uppercase fw-bold mb-3"
                  style={{
                    fontSize: "clamp(0.75rem, 1vw, 1rem)",
                    letterSpacing: "2px",
                  }}
                  variants={itemVariants}
                >
                  {slides[index].tag}
                </motion.p>

                {/* TITLE */}
                <motion.h1
                  className="fw-bold mb-4 hero-title"
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 3.8rem)",
                    lineHeight: "1.15",
                  }}
                  variants={itemVariants}
                >
                  {slides[index].title}
                </motion.h1>

                {/* DESCRIPTION */}
                <motion.p
                  className="hero-lead mb-4"
                  style={{
                    maxWidth: "600px",
                    fontSize: "clamp(1rem, 2vw, 1.25rem)",
                    lineHeight: "1.7",
                  }}
                  variants={itemVariants}
                >
                  {slides[index].desc}
                </motion.p>

                {/* BUTTON */}
                <motion.a
                  href="/contact"
                  className="btn btn-primary px-5 py-3 rounded-pill fw-semibold"
                  style={{
                    backgroundColor: "#0d6efd",
                    border: "none",
                    fontSize: "clamp(0.9rem, 1.1vw, 1.1rem)",
                  }}
                  variants={itemVariants}
                >
                  Contact Now
                </motion.a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* SLIDER DOTS */}
      <div
        className="d-flex justify-content-center gap-3 position-absolute bottom-0 pb-4 w-100"
        style={{ zIndex: 3 }}
      >
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width: index === i ? "18px" : "10px",
              height: "10px",
              borderRadius: "20px",
              background: index === i ? "#fff" : "rgba(255,255,255,0.5)",
              cursor: "pointer",
              transition: "0.3s",
            }}
          />
        ))}
      </div>

      {/* CSS */}
      <style>{`
        .hero-section {
          min-height: 100vh;
          padding-top: 3rem;
          padding-bottom: 3rem;
        }
        @media (max-width: 575.98px) {
          .hero-section { 
            min-height: 65vh;
            padding: 1.8rem 0;
          }
          .hero-title {
            line-height: 1.2 !important;
            margin-bottom: 1rem !important;
          }
          .hero-lead { margin-bottom: 1.25rem; }
        }
      `}</style>
    </section>
  );
}
