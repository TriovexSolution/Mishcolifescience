import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import productimg from "../assets/image/product/product1.png";
import { motion } from "framer-motion";

export default function ProductShowcase() {
  // Animation variants
  const leftVariant = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const rightVariant = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const centerVariant = {
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <>
      {/* INTERNAL CSS */}
      <style>{`
        .product-arc {
          background-color: #673ab7;
          width: 100%;
          max-width: 360px;
          border-radius: 50% 50% 0 0;
          padding-top: 40px;
        }

        .product-img {
          width: 100%;
          max-width: 260px;
        }

        @media (max-width: 768px) {
          .product-arc {
            max-width: 280px;
          }
          .product-img {
            max-width: 200px;
          }
        }
      `}</style>

      <div className="container py-5">

        {/* ---- HEADER ---- */}
        <div className="text-center mb-5 p-5 mx-5" style={{ fontFamily: "Sen, sans-serif", backgroundColor: "#EAF5FF" }}>
          <p className="text-uppercase small text-secondary fw-semibold mb-1 text-start">
            Our Product
          </p>
          <h3 className="fw-bold text-start">
            Lorem ipsum dolor sit amet, consectetur  <br />adipiscing elit
          </h3>
        </div>

        <div className="row align-items-center justify-content-center">

          {/* ---- LEFT TEXT ---- */}
          <motion.div
            className="col-12 col-md-3 text-center text-md-end mb-4 mb-md-0"
            variants={leftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h6 className="fw-bold">DIGESTIVE ENZYMES SYRUP</h6>
            <p className="small text-muted">
              We Specialise In Short And Long Stays For Contractors In And Around Whyalla.
            </p>
          </motion.div>

          {/* ---- CENTER PRODUCT ---- */}
          <motion.div
            className="col-12 col-md-6 text-center"
            variants={centerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="product-arc mx-auto p-4">
              <img
                src={productimg}
                alt="Product"
                className="img-fluid mb-3 product-img"
              />
              <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-link text-white fw-semibold p-0">
                  &lt; Prev
                </button>
                <button className="btn btn-link text-white fw-semibold p-0">
                  Next &gt;
                </button>
              </div>
            </div>
          </motion.div>

          {/* ---- RIGHT TEXT ---- */}
          <motion.div
            className="col-12 col-md-3 text-center text-md-start mt-4 mt-md-0"
            variants={rightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h6 className="fw-bold">MISTDIGEST SYRUP</h6>
            <p className="small text-muted">
              We Specialise In Short And Long Stays For Contractors In And Around Whyalla.
            </p>
            <ul className="list-unstyled small">
              <li>• 200ML</li>
              <li>• HEALTH SUPPLEMENT</li>
              <li>• VEGAN</li>
            </ul>
          </motion.div>

        </div>
      </div>
    </>
  );
}
