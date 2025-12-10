import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// IMPORT IMAGES
import hero1 from "../assets/image/hero7.png";
import hero2 from "../assets/image/hero8.jpg";
import hero3 from "../assets/image/hero8.png";

// SLIDES DATA
const slides = [
  {
    id: 1,
    img: hero1,
    tag: "Global Healthcare",
    title: "Quality, Trust, and 45+ Years of Experience",
    desc: "We are driven by a single purpose: to make quality healthcare accessible and affordable worldwide. Headquartered in Ahmedabad, India.",
  },
  {
    id: 2,
    img: hero2,
    tag: "Branded Generics",
    title: "Trusted Branded Generics, Global Footprint",
    desc: "Leading the branded generic market with a strong domestic and rapidly growing global presence。",
  },
  {
    id: 3,
    img: hero3,
    tag: "Quality & Access",
    title: "Quality, Innovation, and Accessibility Focused",
    desc: "Dedicated to quality, innovation, and accessibility, backed by WHO-GMP compliant facilities.",
  },
];

// ANIMATION VARIANTS
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, ease: "easeOut" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const [index, setIndex] = useState(0);

  // 🔥 Preload images
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.img;
    });
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Memoize current slide
  const slide = useMemo(() => slides[index], [index]);

  return (
    <section className="position-relative overflow-hidden hero-section">
      {/* BACKGROUND */}
      <div
        className="hero-bg position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: `url(${slide.img})`,
        }}
      />

      {/* OVERLAY */}
      <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100" />

      {/* TEXT CONTENT */}
      <div className="position-relative container-fluid h-100 px-5 hero-content d-flex align-items-end justify-content-end">
        <div className="row w-100">
          <div className="col-12 col-lg-7 col-xl-6 text-white py-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {/* TAG */}
                <motion.p
                  className="hero-tag text-uppercase fw-bold mb-3"
                  variants={itemVariants}
                >
                  {slide.tag}
                </motion.p>

                {/* TITLE */}
                <motion.h1 className="hero-title fw-bold mb-4" variants={itemVariants}>
                  {slide.title}
                </motion.h1>

                {/* DESCRIPTION */}
                <motion.p className="hero-lead mb-4" variants={itemVariants}>
                  {slide.desc}
                </motion.p>

                {/* BUTTON */}
                <motion.a
                  href="/contact"
                  className="btn btn-primary hero-btn px-5 py-3 rounded-pill fw-semibold"
                  variants={itemVariants}
                >
                  Contact Now
                </motion.a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* DOTS */}
      <div className="hero-dots position-absolute bottom-0 pb-4 w-100 d-flex justify-content-center gap-3">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`hero-dot ${index === i ? "active" : ""}`}
          />
        ))}
      </div>

      {/* CSS */}
      <style>{`
        .hero-section {
          min-height: 100vh;
          padding: 3rem 0;
        }

        .hero-bg {
          z-index: 1;
          background-size: cover;
          background-position: center;
          transition: background-image 0s;
        }

        .hero-overlay {
          background: rgba(0, 0, 0, 0.55);
          z-index: 1;
          pointer-events: none;
        }

        .hero-content {
          z-index: 2;
        }

        .hero-tag {
          font-size: clamp(0.75rem, 1vw, 1rem);
          letter-spacing: 2px;
        }

        .hero-title {
          font-size: clamp(1.8rem, 4vw, 3.8rem);
          line-height: 1.15;
        }

        .hero-lead {
          max-width: 600px;
          font-size: clamp(1rem, 2vw, 1.25rem);
          line-height: 1.7;
        }

        .hero-dot {
          width: 10px;
          height: 10px;
          border-radius: 20px;
          background: rgba(255,255,255,0.5);
          transition: .3s;
          cursor: pointer;
        }
        
        .hero-dot.active {
          width: 18px;
          background: #fff;
        }

        /* MOBILE */
        @media (max-width: 576px) {
          .hero-section {
            min-height: 75vh;
            padding: 1.5rem 0 2rem 0;
          }
          .hero-content {
            padding-left: 1.2rem !important;
            padding-right: 1.2rem !important;
            text-align: left;
          }
          .hero-title {
            font-size: 1.6rem !important;
            line-height: 1.25 !important;
            margin-bottom: .8rem !important;
          }
          .hero-lead {
            font-size: 1rem !important;
            max-width: 95% !important;
            line-height: 1.55 !important;
          }
          .hero-btn {
            padding: .7rem 1.7rem !important;
            font-size: .9rem !important;
          }
        }
      `}</style>
    </section>
  );
}
