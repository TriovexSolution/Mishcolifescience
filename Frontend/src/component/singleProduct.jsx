import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { m, motion } from "framer-motion";
import axios from "axios";
import { Api } from "../api";
import {Arrowsvg} from "./arrowsvg";
import { RightArrow } from "./RightArrowsvg";

const API_BASE_URL = Api;

export default function ProductShowcase() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // State to manage Read More/Show Less for Left and Right Info
  const [showFullLeft, setShowFullLeft] = useState(false);
  const [showFullRight, setShowFullRight] = useState(false);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products/getall`);
        if (response.data.success) {
          setProducts(response.data.data);
          console.log(object);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
    // Reset full details view when navigating
    setShowFullLeft(false);
    setShowFullRight(false);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    // Reset full details view when navigating
    setShowFullLeft(false);
    setShowFullRight(false);
  };

  const getImageUrl = (imgArray) =>
    Array.isArray(imgArray) && imgArray.length > 0
      ? `${API_BASE_URL}${imgArray[0].replace(/\\/g, "/")}`
      : "https://via.placeholder.com/260x260/cccccc/000000?text=No+Image";

  if (loading || products.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  const current = products[currentIndex];
  console.log(current);
  const next1 = products[(currentIndex + 1) % products.length];
  const next2 = products[(currentIndex + 2) % products.length];

  const mainColor = current.color || "#673ab7";

  return (
    <>
      <style jsx>{`
        .main-container {
          position: relative;
          min-height: 600px;
        }
        .main-arc {
          width: 350px;
          height: 540px;
          border-radius: 190px 190px 0 0;
          background: ${mainColor};
          padding-top: 60px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
          position: relative;
          z-index: 1;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: -0px;
        }
        .main-img {
          max-width: 270px;
          margin-top: -10px;
        }

        /* --- INFO BOX WITH LINE LIMIT AND HIDDEN SCROLL TOGGLE --- */

        /* Base styles for the content container */
        .info-content-container {
          line-height: 1.35em;
          padding-bottom: 20px;
        }

        .info-content-wrapper {
          /* Default: Restrict to ~8 lines */
          max-height: 150px;
          overflow: hidden;
          position: relative;
          transition: max-height 0.3s ease;
          margin-bottom: 10px;
        }

        /* Expanded state: Full height with functional but HIDDEN scrollbar */
        .info-content-wrapper.expanded {
          max-height: 380px; /* Reduced height to ensure "Show Less" fits better */
          overflow-y: auto;
          overflow-x: hidden;

          /* --- HIDE SCROLLBAR LINE BUT KEEP SCROLLING --- */
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        /* Webkit browsers (Chrome, Safari) specific scrollbar hiding */
        .info-content-wrapper.expanded::-webkit-scrollbar {
          display: none;
        }
        /* --- END SCROLLBAR HIDING --- */

        /* Gradient fade effect at the bottom when NOT expanded */
        .info-content-wrapper:not(.expanded)::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: linear-gradient(to top, white, rgba(255, 255, 255, 0));
          pointer-events: none;
        }
        .read-more-btn {
          position: relative;
          z-index: 10;
        }

        /* * --- Preview Stack (3 Images Layout) --- */
        .preview-stack {
          position: absolute;
          left: 1%;
          // right: 0px;
          bottom: 0px;
          z-index: 10;
          display: flex;
          gap: 20px;
          align-items: flex-end;
          pointer-events: none;
        }
        .preview-item {
          width: 150px;
          height: 170px;
          border-radius: 75px 75px 0 0;
          background: #999;
          padding-top: 25px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
          position: relative;
          // margin-top: -30px;
        }
        .preview-item:first-child {
          margin-top: 0;
          transform: translateX(20px);
          z-index: 3;
        }
        .preview-item:nth-child(2) {
          transform: translateX(40px);
          z-index: 2;
          opacity: 0.9;
        }
        .preview-img {
          width: 100px;
          filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.3));
        }

        .nav-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          color: white;
          font-size: 2rem;
          font-weight: bold;
          border: none;
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }
        .nav-btn:hover {
          background: rgba(255, 255, 255, 0.5);
          transform: scale(1.12);
        }

        /* ------------------------------------------- */
        /* --- RESPONSIVENESS BREAKPOINTS --- */
        /* ------------------------------------------- */

        /* LAPTOP/DESKTOP (>= 992px) */
        @media (min-width: 992px) {
          .main-container {
            min-height: 600px;
          }
          .left-info-col {
            order: 1;
            // padding-right: 30px;
          }
          .right-info-col {
            order: 3;
            padding-left: 30px;
          }
          .center-product-col {
            order: 2;
          }
          .info-content-wrapper {
            max-height: 200px;
            // padding-left: 50%;
          }
          .info-content-wrapper.expanded {
            max-height: 400px;
          } /* Slightly reduced scroll height for desktop */
        }

        /* TABLET (<= 991.98px) - Optimized Layout */
        @media (max-width: 991.98px) {
          .main-container {
            min-height: auto;
          }
          .center-product-col {
            order: 1;
            margin-bottom: 40px;
          }
          .left-info-col {
            order: 2;
            // right: 100%;
          }
          .right-info-col {
            order: 3;
            margin-top: 40px;
          }

          .main-arc {
            width: 320px;
            height: 380px;
          }
          .main-img {
            max-width: 250px;
          }

          .info-content-wrapper {
            max-height: 180px;
          }
          .info-content-wrapper.expanded {
            max-height: 380px;
          } /* Slightly reduced scroll height for tablets */

          .preview-stack {
            position: relative;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            justify-content: center;
            margin-top: 40px;
            gap: 5px;
          }
          .preview-item {
            width: 120px;
            height: 140px;
            padding-top: 20px;
          }
          .preview-item:first-child,
          .preview-item:nth-child(2) {
            transform: none !important;
            margin-left: 10px;
            margin-top: 0;
          }
          .preview-img {
            width: 80px;
          }
        }

        /* MOBILE (<= 576px) - Optimized Layout */
        @media (max-width: 576px) {
          .main-arc {
            width: 280px;
            height: 340px;
          }
          .main-img {
            max-width: 220px;
          }
          .info-content-wrapper {
            max-height: 150px;
          }
          .info-content-wrapper.expanded {
            max-height: 300px;
          } /* Slightly reduced scroll height for mobile */
          .preview-stack {
            display: none;
          }
        }
      `}</style>

      <div className="container ">
        {/* Header */}
        <div
          className="text-center my-5 p-3 p-md-5 mx-md-5 rounded-4"
          style={{ backgroundColor: "#EAF5FF", fontFamily: "Sen, sans-serif" }}
        >
          <p className="text-uppercase small text-secondary fw-bold mb-1 text-start">
            {current.category?.name || "Uncategorized"}
          </p>
          <h3 className="fw-bold text-start">
            {current.productName || current.genericName}
          </h3>
          <p className="text-start text-muted small">
            {current.genericName || current.brandName}
          </p>
        </div>

        <div className="row align-items-end justify-content-center main-container  ">
          {/* Left Info - COMPOSITION & INDICATIONS */}
          {/* <div className="col-12 col-lg-3 mb-5 left-info-col  ">
            <div
              className={`info-content-wrapper  ${
                showFullLeft ? "expanded" : ""
              }`}
            >
              <div className="info-content-container">
                <h6 className="fw-bold text-dark mb-1 text-start">
                  Composition
                </h6>
                <ul className="list-unstyled small text-muted text-start">
                  {current.composition?.length > 0 ? (
                    current.composition.map((c, i) => (
                      <li key={i}>
                        • {c.name} ({c.strength})
                      </li>
                    ))
                  ) : (
                    <li>• Information pending</li>
                  )}
                </ul>

                <h6 className="fw-bold text-dark mt-2 mb-1 text-start">
                  Indications
                </h6>
                <ul className="list-unstyled small text-muted text-start">
                  {current.indications?.length > 0 ? (
                    current.indications.map((i, idx) => (
                      <li key={idx}>• {i}</li>
                    ))
                  ) : (
                    <li>• Information pending</li>
                  )}
                </ul>

                <h6 className="fw-bold text-dark mt-2 mb-1 text-start">
                  Additional Information
                </h6>
                <p className="small text-muted text-start">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime, voluptatum saepe. Quos eveniet, omnis, nemo animi
                  pariatur debitis voluptatibus, dicta iure tempore similique
                  dolore? Repellat! Amet minima corporis voluptate nemo quisquam
                  quos, repellendus voluptatibus saepe. Repellendus voluptatibus
                  saepe. Amet minima corporis voluptate nemo quisquam quos.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime, voluptatum saepe.
                </p>
              </div>
            </div>
            <div className="text-start mt-2 read-more-btn">
              <a
                href="#"
                className="read-more-link small fw-sm text-decoration-none text-primary border-0  "
                onClick={(e) => {
                  e.preventDefault();
                  setShowFullLeft(!showFullLeft);
                }}
              >
                {showFullLeft ? "Show Less" : "Read More..."}
              </a>
            </div>
          </div> */}

          {/* Center Product Display */}
          <div className="col-12 col-lg-6 text-center position-relative center-product-col  ">
            <motion.div
              key={currentIndex}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="d-inline-block position-relative"
            >
              <div className="main-arc  position-relative ">
                {/* Main Product Image */}
                <img
                  src={getImageUrl(current.productImage)}
                  alt={current.productName}
                  className="main-img img-fluid "
                  style={{ position: "relative", zIndex: 2, bottom: "-12%" }}
                />

                {/* === ALL ANNOTATIONS WITH YOUR CUSTOM ARROW === */}
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none"
                  style={{ zIndex: 10 }}
                >
                  {/* DIGESTIVE ENZYMES SYRUP - Top Left */}
                  <div
                    className="position-absolute"
                    style={{ bottom: "67%", left: "-7%" }}
                  >
                    {/* LEFT ARROW HERE */}
                    <RightArrow />

                    <div
                      className="position-absolute text-start text-nowrap fw-bold"
                      style={{
                        top: "15%",
                        right: "60px",
                        transform: "translateY(-50%)",
                        color: "#4a1fb8",
                        fontSize: "16px",
                        fontFamily: "'Comic Sans MS', cursive, sans-serif",
                        display: "-webkit-box",
                        WebkitLineClamp: 2, // ← SHOW ONLY 2 LINES
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "500px", // ← set width so clamping works
                      }}
                    >
                      <span style={{ color: mainColor, fontWeight: "bolder" }}>
                        Indications:
                      </span>
                      <span className="text-dark">{current.indications}</span>
                    </div>
                  </div>

                  {/* MISTDIGEST SYRUP - Top Right */}
                  <div
                    className="position-absolute"
                    style={{ bottom: "67%", right: "-7%" }}
                  >
                    <Arrowsvg direction="left" />
                    <div
                      className="position-absolute text-start text-nowrap fw-bold"
                      style={{
                        top: "15%",
                        left: "60px",
                        transform: "translateY(-50%)",
                        color: "#4a1fb8",
                        fontSize: "16px",
                        fontFamily: "'Comic Sans MS', cursive, sans-serif",
                        display: "-webkit-box",
                        WebkitLineClamp: 2, // ← SHOW ONLY 2 LINES
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "500px", // ← set width so clamping works
                      }}
                    >
                      <span style={{ color: mainColor, fontWeight: "bolder" }}>
                        Contraindications:
                      </span>
                      <span className="text-dark">{current.contraindications}</span>
                    </div>
                  </div>
                  {/* 200ML - Right Middle */}
                  <div
                    className="position-absolute"
                    style={{ bottom: "42%", right: "-6%" }}
                  >
                    <Arrowsvg direction="left" />
                    <div
                      className="position-absolute text-end text-nowrap fw-bold"
                      style={{
                        top: "10%",
                        left: "205%",
                        transform: "translateY(-50%)",
                        color: "black",
                        fontSize: "18px",
                        fontFamily: "'Comic Sans MS', cursive, sans-serif",
                      }}
                    >
                      {current.packSize}
                    </div>
                  </div>
                  {/* HELTH SUPPLEMENT - Lower Right */}
                  <div
                    className="position-absolute"
                    style={{ bottom: "30%", right: "-6%" }}
                  >
                    <Arrowsvg direction="left" />
                    <div
                      className="position-absolute text-end text-nowrap fw-bold"
                      style={{
                        top: "5%",
                        left: "205%",
                        transform: "translateY(-50%)",
                        color: "black",
                        fontSize: "18px",
                        fontFamily: "'Comic Sans MS', cursive, sans-serif",
                      }}
                    >
                      HELTH SUPPLEMENT
                    </div>
                  </div>

                  {/* VEGAN - Bottom Right HELTH SUPPLEMENT */}
                  <div
                    className="position-absolute"
                    style={{ bottom: "18%", right: "-6%" }}
                  >
                    <Arrowsvg direction="left" />
                    <div
                      className="position-absolute text-end text-nowrap fw-bold"
                      style={{
                        top: "5%",
                        left: "205%",
                        transform: "translateY(-50%)",
                        color: "black",
                        fontSize: "18px",
                        fontFamily: "'Comic Sans MS', cursive, sans-serif",
                      }}
                    >
                      {current.mechanismOfAction[0].drug} : <span>{current.mechanismOfAction[0].moa}</span> 
                    </div>
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-end gap-2 mt-5 bottom-0 pb-3"
                    style={{
                      position: "absolute",
                      width: "100%",
                      bottom: "10px",
                      left: "0",
                    }}
                  >
                    <button
                      onClick={goPrev}
                      className=" text-dark border-0 bg-transparent fw-bold text-white "
                      style={{ fontSize: "22px" }}
                    >
                      <span style={{ fontSize: "23px" }}>&lt;</span> Prev
                    </button>
                    <button
                      onClick={goNext}
                      className=" text-dark border-0 bg-transparent fw-bold text-white "
                      style={{ fontSize: "22px" }}
                    >
                      Next <span style={{ fontSize: "23px" }}>&gt;</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
          </div>

          {/* Right Info - KEY DETAILS & CONTRAINDICATIONS */}
          {/* <div className="col-12 col-lg-3 mb-5 right-info-col ">
            <div
              className={`info-content-wrapper ${
                showFullRight ? "expanded" : ""
              }`}
            >
              <div className="info-content-container">
                <h6 className="fw-bold text-dark mb-1 text-start">
                  Key Details
                </h6>
                <ul className="list-unstyled small text-muted text-start">
                  {current.dosageForm && <li>• Form: {current.dosageForm}</li>}
                  {current.packSize && <li>• Pack Size: {current.packSize}</li>}
                </ul>

                <h6 className="fw-bold text-dark mt-2 mb-1 text-start">
                  Contraindications
                </h6>
                <ul className="list-unstyled small text-muted text-start">
                  {current.contraindications?.length > 0 ? (
                    current.contraindications.map((c, i) => (
                      <li key={i}>• {c}</li>
                    ))
                  ) : (
                    <li>• None listed</li>
                  )}
                </ul>

                <h6 className="fw-bold text-dark mt-2 mb-1 text-start">
                  Safety Warnings
                </h6>
                <p className="small text-muted text-start">
                  Do not exceed the recommended dose. Consult a physician if
                  symptoms persist or worsen. Keep out of reach of children.
                  This section has extra content to ensure the "Read More"
                  button is activated and demonstrates the scrolling capability
                  when expanded. Maxime, voluptatum saepe. Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. This is more content to
                  test the scrollbar in the expanded state.
                </p>
              </div>
            </div>
            <div className="text-start mt-2 text-dark">
              <a
                href="#"
                className="read-more-link small fw-sm text-decoration-none text-primary border-0  "
                onClick={(e) => {
                  e.preventDefault();
                  setShowFullRight(!showFullRight);
                }}
              >
                {showFullRight ? "Show Less" : "Read More"}
              </a>
            </div>
          </div> */}
        </div>

        <div className="row justify-content-center position-relative">
          <div className="col-12 col-lg-6 position-static">
            <div className="preview-stack">
              <motion.div
                key={currentIndex + 1}
                className="preview-item"
                style={{ backgroundColor: next1.color || "#a0a0a0" }}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <img
                  src={getImageUrl(next1.productImage)}
                  alt=""
                  className="preview-img mx-auto d-block"
                />
              </motion.div>

              <motion.div
                key={currentIndex + 2}
                className="preview-item"
                style={{ backgroundColor: next2.color || "#888" }}
                initial={{ x: -120, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <img
                  src={getImageUrl(next2.productImage)}
                  alt=""
                  className="preview-img mx-auto d-block"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
