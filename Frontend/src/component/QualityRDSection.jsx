import React from "react";
import { motion } from "framer-motion";

function QualityRDSection() {
  const keyStrengths = [
    { icon: "bi-shield-check", text: "Stringent quality assurance protocols" },
    { icon: "bi-graph-up-arrow", text: "Advanced analytical and stability studies" },
    { icon: "bi-file-earmark-ruled", text: "Regulatory and documentation excellence" },
    { icon: "bi-arrow-repeat", text: "Continuous process optimization for improved outcome" },
  ];

  return (
    <section id="quality-rd" className=" py-lg-7 my-2">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="text-center mb-5">
              <h4 className="display-6 fw-normal text-dark">Quality / R&D</h4>
              <p className="lead text-danger fw-sm mt-2">
                Quality You Can Trust. Innovation That Drives Better Healthcare.
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4 g-lg-5 align-items-stretch">
          {/* LEFT COLUMN ANIMATION */}
          <motion.div
            className="col-lg-7"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="h-100 p-4 p-md-5 shadow-lg rounded-3 border-start border-primary border-5">
              <h3 className="fw-bold text-dark mb-4">Global Standards, Advanced Research & Absolute Commitment to Quality</h3>

              <p className="mb-4 text-muted">
                At Mishco Lifescience LLP, quality isn’t just a process it is the core principle that guides every product we manufacture and every partnership we build. Our formulations are produced in facilities that comply with WHO-GMP, ISO, and stringent global regulatory standards, ensuring uncompromised safety, efficacy, and consistency across all markets.
              </p>

              <p className="mb-4 text-muted">
            Our highly skilled Quality Assurance (QA) and Quality Control (QC) teams monitor every stage of production from raw material sourcing to final batch release using validated systems and state-of-the-art analytical technologies. This structured approach guarantees that every product meets the highest benchmarks of therapeutic performance and patient safety.
              </p>

              <p className="mb-0 text-muted">
                Beyond compliance, our Research & Development (R&D) division focuses on delivering meaningful innovation. From improving formulation stability to exploring new therapeutic segments, our efforts are driven by science, patient needs, and a commitment to developing value-driven healthcare solutions that create long-term impact..
              </p>
            </div>
          </motion.div>

          {/* RIGHT COLUMN ANIMATION */}
          <motion.div
            className="col-lg-5"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="h-100 p-4 text-white rounded-3 shadow-lg">
              <h4 className="fw-bolder mb-4 text-dark border-bottom pb-2">
                Key Strengths
              </h4>

              <div className="row g-3">
                {keyStrengths.map((item, index) => (
                  <motion.div
                    key={index}
                    className="col-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="d-flex align-items-center bg-white text-dark p-3 rounded shadow-sm">
                      <i className={`bi ${item.icon} fs-4 me-3 text-primary`}></i>
                      <p className="mb-0 fw-medium">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default QualityRDSection;
