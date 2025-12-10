import React from "react";
import { motion } from "framer-motion";

import img1 from "../assets/image/about1.jpg";
import img2 from "../assets/image/about2.jpg";
import img3 from "../assets/image/about3.jpg";
import img4 from "../assets/image/about4.jpg";
import img5 from "../assets/image/about5.jpg";
<style jsx>{`
  .fixed-about-image {
    width: 100% !important;
    height: 384px !important; /* h-96 = 384px */
    object-fit: cover;
    border-radius: 0.75rem; /* rounded */
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04); /* shadow */
  }

  @media (min-width: 768px) {
    .fixed-about-image {
      height: 420px !important; /* md:h-[420px] */
    }
  }

  @media (min-width: 1024px) {
    .fixed-about-image {
      height: 480px !important; /* lg:h-[480px] */
    }
  }
`}</style>;
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
      {/* ==================== 1. Who We Are – Image Left ==================== */}
      <div className="row align-items-center my-5">
        <motion.div
          className="col-lg-6 col-md-12 text-center mb-4 mb-lg-0"
          variants={leftVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img
            src={img1}
            alt="Mishco Lifescience Team"
            className="w-100 h-96 md:h-[420px] lg:h-[480px] object-cover rounded shadow"
          />
        </motion.div>

        <motion.div
          className="col-lg-6 col-md-12"
          variants={rightVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h4 className="fw-bold" style={{ fontFamily: "Sen, sans-serif" }}>
            Who We Are
          </h4>
          <p
            className="fw-semibold mt-3"
            style={{ fontFamily: "Sen, sans-serif" }}
          >
            Making quality healthcare accessible to every individual,
            everywhere.
          </p>
          <p
            className="text-muted mt-3"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Mishco Lifescience LLP was founded with one purpose: to make quality
            healthcare accessible to every individual, everywhere. What began as
            a domestic pharmaceutical effort has grown into a trusted healthcare
            partner for doctors, distributors, and global importers across
            multiple regions.
            <br />
            <br />
            Rooted in integrity and strengthened by scientific innovation, we
            operate with a strong sense of responsibility toward patient
            wellness and healthcare excellence.
          </p>
        </motion.div>
      </div>

      {/* ==================== 2. What We Do – Text Left, Image Right ==================== */}
      <div className="row align-items-center my-5 flex-md-row-reverse flex-column-reverse">
        <motion.div
          className="col-lg-6 col-md-12 text-center mt-4 mt-lg-0"
          variants={rightVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img
            src={img3}
            alt="Our Product Range"
            style={{}}
            className="w-100 h-96 md:h-[420px] lg:h-[480px] object-cover rounded shadow"
          />
        </motion.div>

        <motion.div
          className="col-lg-6 col-md-12"
          variants={leftVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h4 className="fw-bold" style={{ fontFamily: "Sen, sans-serif" }}>
            What We Do
          </h4>
          <p
            className="fw-semibold mt-3"
            style={{ fontFamily: "Sen, sans-serif" }}
          >
            Comprehensive pharmaceutical & nutraceutical solutions across key
            therapeutic segments.
          </p>
          <p
            className="text-muted mt-3"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            At Mishco Lifescience LLP, we offer an extensive and continuously
            expanding range of high-quality branded generic medicines and
            nutraceuticals across key therapeutic segments including
            Anti-infectives, Gastrointestinal Care, Cardiac & Diabetic Care,
            Pain Management, Vitamins & Nutraceuticals, Dermatology & Oral Care,
            and Pediatric & Gynaecology formulations. Every product is
            manufactured in WHO-GMP, ISO 9001:2015, and FSSAI-certified
            facilities, ensuring superior safety, efficacy, and consistency for
            healthcare providers and patients in India and across global
            markets.
          </p>
        </motion.div>
      </div>

      {/* ==================== 3. Our Commitment to Quality – Image Left ==================== */}
      <div className="row align-items-center my-5">
        <motion.div
          className="col-lg-6 col-md-12 text-center mb-4 mb-lg-0"
          variants
          DX={leftVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img
            src={img2}
            alt="Quality Control Lab"
            className="w-100 h-96 md:h-[420px] lg:h-[480px] object-cover rounded shadow"
          />
        </motion.div>

        <motion.div
          className="col-lg-6 col-md-12"
          variants={rightVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h4 className="fw-bold" style={{ fontFamily: "Sen, sans-serif" }}>
            Our Commitment to Quality
          </h4>
          <p
            className="fw-semibold mt-3"
            style={{ fontFamily: "Sen, sans-serif" }}
          >
            Quality is our identity monitored at every stage.
          </p>
          <p
            className="text-muted mt-3"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Our dedicated QA and QC teams oversee raw material sourcing,
            formulation development, batch testing, and final release using
            validated processes and advanced analytical systems.
            <br />
            <br />
            We ensure every product meets the highest standards of 
            <strong style={{marginLeft:"4px"}}>safety, efficacy, stability, and therapeutic value</strong>.
          </p>
        </motion.div>
      </div>

      {/* ==================== 4. Global Presence – Text Left, Image Right ==================== */}
      <div className="row align-items-center my-5 flex-md-row-reverse flex-column-reverse">
        <motion.div
          className="col-lg-6 col-md-12 text-center mt-4 mt-lg-0"
          variants={rightVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img
            src={img4}
            alt="Global Export Network"
            className="w-100 h-96 md:h-[420px] lg:h-[480px] object-cover rounded shadow"
          />
        </motion.div>

        <motion.div
          className="col-lg-6 col-md-12"
          variants={leftVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h4 className="fw-bold" style={{ fontFamily: "Sen, sans-serif" }}>
            Global Presence
          </h4>
          <p
            className="fw-semibold mt-3"
            style={{ fontFamily: "Sen, sans-serif" }}
          >
            Expanding trusted healthcare solutions worldwide.
          </p>
          <p
            className="text-muted mt-3"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            We are a trusted pharmaceutical exporter from India, proudly
            supplying high-quality, WHO-GMP certified branded generics and
            nutraceuticals to fast-growing healthcare markets including Kenya,
            Ethiopia, CIS countries, the MENA region, Thailand, and beyond. With
            end-to-end regulatory support, seamless private labeling options,
            and reliable global logistics, we empower distributors, hospitals,
            and healthcare partners to deliver affordable, world-class medicines
            to patients who need them most with our international presence
            continuously expanding.
          </p>
        </motion.div>
      </div>

      {/* ==================== 5. Our Core Values – Image Left ==================== */}
      <div className="row align-items-center my-5">
        <motion.div
          className="col-lg-6 col-md-12 text-center mb-4 mb-lg-0"
          variants={leftVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img
            src={img5}
            alt="Our Core Values"
            className="w-100 h-96 md:h-[420px] lg:h-[480px] object-cover rounded shadow"
          />
        </motion.div>

        <motion.div
          className="col-lg-6 col-md-12"
          variants={rightVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h4 className="fw-bold" style={{ fontFamily: "Sen, sans-serif" }}>
            Our Core Values
          </h4>
          <p
            className="text-muted mt-3"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            At the heart of Mishco Lifescience LLP lie unwavering core values
            that define everything we do: uncompromised quality in every
            formulation, integrity in every decision, innovation driven by
            science, trust built through transparent partnerships, consistency
            that ensures excellence in every product, and timely execution that
            delivers on every commitment  because we believe ethical
            pharmaceutical practices and patient-first principles are the
            foundation of sustainable global healthcare.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TeamBlogSection;
