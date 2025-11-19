// src/components/Contact.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    queryType: "General Inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const colors = {
    heading: "#2c3e50",
    redPrimary: "#C11F26",
    bluePrimary: "#246CB3",
  };

  const styles = {
    sectionLabel: {
      fontSize: "0.85rem",
      fontWeight: "700",
      letterSpacing: "2px",
      color: colors.heading,
      textTransform: "uppercase",
      marginBottom: "0.5rem",
      fontFamily: "Inter, sans-serif",
    },
    mainHeading: {
      fontFamily: "Sen, sans-serif",
      fontWeight: "700",
      color: colors.heading,
      fontSize: "2.5rem",
    },
    infoDetail: {
      fontSize: "1.5rem",
      fontWeight: "700",
      fontFamily: "Sen, sans-serif",
    },
    infoHours: {
      fontSize: "2rem",
      fontWeight: "700",
      fontFamily: "Sen, sans-serif",
    },
    input: {
      height: "50px",
      borderColor: "#ced4da",
      boxShadow: "none",
      fontSize: "0.95rem",
      fontFamily: "Inter, sans-serif",
    },
  };

  const fadeUp = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const slideLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const slideRight = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact/addcontact`,
        formData
      );

      toast.success(
        response.data.message || "Thank you! Your message has been sent."
      );

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        queryType: "General Inquiry",
        message: "",
      });
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-7">
            {/* Header Section */}
            <motion.div
              className="text-center mb-5"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div style={styles.sectionLabel}>CONTACT US</div>
              <h1 className="fw-bold" style={styles.mainHeading}>
                Let's Start a Conversation
              </h1>
              <p
                className="text-muted small mt-3"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </motion.div>

            {/* Info Box (Red Section) */}
            <motion.div
              className="row g-0 mb-5"
              style={{
                backgroundColor: colors.redPrimary,
                color: "white",
                borderRadius: "0.3rem",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="col-md-6 p-4 border-end border-light border-opacity-10">
                <p
                  className="text-uppercase small fw-bold mb-3"
                  style={{ opacity: 0.7, fontFamily: "Inter, sans-serif" }}
                >
                  Working hours
                </p>
                <p style={styles.infoDetail}>Monday To Friday</p>
                <p style={styles.infoHours}>9:00 AM to 8:00 PM</p>
                <p
                  className="small mt-3"
                  style={{ opacity: 0.8, fontFamily: "Inter, sans-serif" }}
                >
                  Our Support Team is available 24/7
                </p>
              </div>

              <div className="col-md-6 p-4 ps-md-5">
                <p
                  className="text-uppercase small fw-bold mb-3"
                  style={{ opacity: 0.7, fontFamily: "Inter, sans-serif" }}
                >
                  Contact Us
                </p>
                <p style={styles.infoDetail}>020 7993 2905</p>
                <p
                  className="small"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  hello@finsweet.com
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="mb-3">
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  style={styles.input}
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  style={styles.input}
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                {/* // src/components/Contact.jsx  ← THIS ONE WORKS 100% */}
                <select
                  name="queryType"
                  className="form-select"
                  style={styles.input}
                  value={formData.queryType}
                  onChange={handleChange}
                  required
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-4">
                <textarea
                  name="message"
                  className="form-control"
                  rows="5"
                  placeholder="Message"
                  style={{
                    resize: "none",
                    borderColor: "#ced4da",
                    boxShadow: "none",
                    fontSize: "0.95rem",
                    fontFamily: "Inter, sans-serif",
                  }}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-lg w-100 fw-bold"
                style={{
                  backgroundColor: colors.bluePrimary,
                  color: "white",
                  height: "55px",
                  fontSize: "1.1rem",
                  fontFamily: "Sen, sans-serif",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
