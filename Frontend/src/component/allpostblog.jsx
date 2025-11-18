import React from "react";
import img from "../assets/image/whywestarted.jpg";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Allpostblog() {
  const posts = [
    {
      category: "Startup",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris placerat...",
    },
    {
      category: "Business",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris placerat...",
    },
    {
      category: "Startup",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris placerat...",
    },
    {
      category: "Technology",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris placerat...",
    },
    {
      category: "Ecology",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris placerat...",
    },
  ];

  // Variants for each post
  const postVariant = {
    hidden: { y: 50, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, delay: i * 0.2, ease: "easeOut" },
    }),
  };

  return (
    <div className="container my-5">
      {/* Title */}
      <h4
        style={{
          fontFamily: "Sen, sans-serif",
          fontWeight: 700,
          fontSize: "36px",
          lineHeight: "64px",
          letterSpacing: "-2px",
        }}
        className="border-bottom mb-3 pb-3"
      >
        All Posts
      </h4>

      {/* All Blog Posts */}
      {posts.map((post, idx) => (
        <NavLink
          to={`/singleblog/:id`}
          key={idx}
          className="text-decoration-none text-dark"
        >
          <motion.div
            className="row mb-4 pb-4 border-bottom"
            custom={idx}
            variants={postVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="col-md-3 col-sm-4">
              <img src={img} className="img-fluid " alt="post" />
            </div>

            <div className="col-md-9 col-sm-8 mt-3 mt-sm-0">
              <p
                className="text-uppercase small text-muted"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "20px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                }}
              >
                {post.category}
              </p>
              <h5
                className="fw-bold"
                style={{
                  fontFamily: "Sen, sans-serif",
                  fontWeight: 700,
                  fontSize: "36px",
                  lineHeight: "48px",
                  letterSpacing: "-2px",
                }}
              >
                {post.title}
              </h5>
              <p
                className="text-muted"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "28px",
                  letterSpacing: "0px",
                }}
              >
                {post.desc}
              </p>
            </div>
          </motion.div>
        </NavLink>
      ))}

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <button className="page-link border-0 text-dark">
                &lt; Prev
              </button>
            </li>
            <li className="page-item">
              <button className="page-link border-0 text-dark">
                Next &gt;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
