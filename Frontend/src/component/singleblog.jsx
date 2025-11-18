import React from "react";
import authorImg from "../assets/image/whywestarted.jpg";
import { motion } from "framer-motion";

export default function BlogPost() {
  const sections = [
    {
      heading:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
    },
    {
      heading:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
    },
  ];

  // Animation variants
  const authorImgVariant = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } },
  };
  const authorTextVariant = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } },
  };
  const sectionVariant = (i) => ({
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, delay: i * 0.2, ease: "easeOut" },
    },
  });

  return (
    <div className="container my-5">
      {/* Author Info */}
      <div className="d-flex align-items-center justify-content-center mb-4">
        <motion.img
          src={authorImg}
          alt="Author"
          className="rounded-circle me-3"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={authorImgVariant}
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={authorTextVariant}
        >
          <p className="mb-0 fw-bold" style={{ fontFamily: "Sen, sans-serif" }}>
            Andrew Jonson
          </p>
          <small className="text-muted">Posted on 27th January 2022</small>
        </motion.div>
      </div>

      {/* Post Title */}
      <motion.div
        className="d-flex align-items-center text-center flex-column w-75 mx-auto"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h1
          className="fw-bold mb-3 mx"
          style={{
            fontFamily: "Sen, sans-serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            lineHeight: "1.2",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </h1>

        {/* Category */}
        <p
          className="text-primary mb-5"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <i className="bi bi-rocket me-2"></i>Startup
        </p>
      </motion.div>

      {/* Featured Image */}
      <motion.div
        className="mb-5 text-center"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={authorImg}
          alt="Post"
          className="img-fluid rounded"
          style={{ maxHeight: "500px", width: "100%", objectFit: "cover" }}
        />
      </motion.div>

      {/* Sections */}
      <article style={{ fontFamily: "Inter, sans-serif", lineHeight: "1.8" }}>
        {sections.map((section, index) => (
          <motion.section
            key={index}
            className="mb-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariant(index)}
          >
            <h2
              className="fw-bold mb-4"
              style={{
                fontFamily: "Sen, sans-serif",
                fontSize: "clamp(24px, 4vw, 32px)",
                lineHeight: "1.3",
                color: "#212529",
              }}
            >
              {section.heading}
            </h2>
            <div className="text-muted" style={{ whiteSpace: "pre-line" }}>
              {section.content.split("\n\n").map((paragraph, i) => (
                <p key={i} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.section>
        ))}
      </article>
    </div>
  );
}
