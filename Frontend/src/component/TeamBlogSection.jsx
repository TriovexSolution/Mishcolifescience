import React from "react";
import { motion } from "framer-motion";
import img1 from "../assets/image/about-img1.jpg"; // Placeholder for R&D/QC image
import img2 from "../assets/image/about-img2.jpg"; // Placeholder for Partnership/Global image

const TeamBlogSection = () => {
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
    <div className="container py-5">
      {/* ========= SECTION 1: QUALITY ASSURANCE & CONTROL (QC/QA) ========= */}
      <div className="row align-items-center my-5">
        {/* LEFT TEXT: Quality & Compliance */}
        <motion.div
          className="col-lg-6 col-md-12 mb-4"
          variants={leftVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h4 className="fw-bold" style={{ fontFamily: "Sen, sans-serif" }}>
            Quality You Can Trust. Innovation That Delivers.
          </h4>
          <p
            className="fw-semibold mt-3"
            style={{ fontFamily: "Sen, sans-serif" }}
          >
            Our stringent <strong>Quality Assurance (QA)</strong> and <strong>Quality Control
            (QC)</strong> protocols define our global reliability.
          </p>
          <p
            className="text-muted mt-3"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Quality is the foundation of everything we do at Mishco Lifescience
            LLP. Our products are manufactured in facilities that strictly
            adhere to <strong>WHO-GMP, ISO 9001:2015</strong>, and other global regulatory
            standards. Our dedicated QA/QC teams oversee every stage from
            sourcing raw materials to final product releasethrough validated
            processes and advanced analytical systems, ensuring consistency and
            patient safety worldwide.
          </p>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="col-lg-6 col-md-12 text-center"
          variants={rightVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img
            src={img1}
            alt="Pharmaceutical Quality Control Lab"
            className="img-fluid rounded shadow"
          />
        </motion.div>
      </div>

      {/* ========= SECTION 2: RESEARCH & DEVELOPMENT (R&D) & Global Reach ========= */}
      <div className="row align-items-center my-5 flex-md-row flex-column-reverse">
        {/* LEFT IMAGE */}
        <motion.div
          className="col-lg-6 col-md-12 text-center mt-4"
          variants={leftVariant} // slide from left
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img
            src={img2}
            alt="Global shipping and logistics for pharmaceuticals"
            className="img-fluid rounded shadow"
          />
        </motion.div>

        {/* RIGHT TEXT: R&D and Global Focus */}
        <motion.div
          className="col-lg-6 col-md-12"
          variants={rightVariant} // slide from right
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h4 className="fw-bold" style={{ fontFamily: "Sen, sans-serif" }}>
            Innovation Beyond Compliance: Our R&D Commitment
          </h4>
          <p
            className="fw-semibold mt-3"
            style={{ fontFamily: "Sen, sans-serif" }}
          >
            We are dedicated to <strong>improving formulations, stability, and patient
            outcomes</strong> through continuous research and process optimization.
          </p>
          <p
            className="text-muted mt-3"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Beyond strict quality control, our <strong>Research & Development</strong>
            initiatives focus on bringing innovative, value-driven healthcare
            solutions to global markets. We actively seek to expand our global
            footprint across countries such as <strong>KENYA, EUTHOPIA, CIS, MENA
            REGION, THAILAND</strong>, and more, offering customized formulations,
            private labeling, and essential regulatory support to our partners.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TeamBlogSection;
