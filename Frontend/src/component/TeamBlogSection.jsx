import React from "react";
import { motion } from "framer-motion";
import img1 from "../assets/image/about-img1.jpg";
import img2 from "../assets/image/about-img2.jpg";

const TeamBlogSection = () => {
  const leftVariant = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const rightVariant = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="container py-5">

      {/* ========= SECTION 1 ========= */}
      <div className="row align-items-center my-5">
        {/* LEFT TEXT */}
        <motion.div
          className="col-lg-6 col-md-12 mb-4"
          variants={leftVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h4 className="fw-bold" style={{ fontFamily: "Sen, sans-serif" }}>
            Our team of creatives
          </h4>
          <p className="fw-semibold mt-3" style={{ fontFamily: "Sen, sans-serif" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
            tempor incididunt.
          </p>
          <p className="text-muted mt-3" style={{ fontFamily: "Inter, sans-serif" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
            voluptate velit esse cillum dolore eu fugiat.
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
            alt="team"
            className="img-fluid rounded shadow"
          />
        </motion.div>
      </div>

      {/* ========= SECTION 2 ========= */}
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
            alt="blog reason"
            className="img-fluid rounded shadow"
          />
        </motion.div>

        {/* RIGHT TEXT */}
        <motion.div
          className="col-lg-6 col-md-12"
          variants={rightVariant} // slide from right
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h4 className="fw-bold" style={{ fontFamily: "Sen, sans-serif" }}>
            Why we started this Blog
          </h4>
          <p className="fw-semibold mt-3" style={{ fontFamily: "Sen, sans-serif" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
            tempor incididunt.
          </p>
          <p className="text-muted mt-3" style={{ fontFamily: "Inter, sans-serif" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
            voluptate velit esse cillum dolore eu fugiat.
          </p>
        </motion.div>
      </div>

    </div>
  );
};

export default TeamBlogSection;
