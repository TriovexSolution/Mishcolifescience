import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { m, motion } from "framer-motion";
import axios from "axios";
import { Api } from "../api";
// import { Arrowsvg } from "./arrowsvg";
// import { RightArrow } from "./RightArrowsvg";
import ProductDetailModal from "./ProductDetailModal";

const API_BASE_URL = Api;
const MIN_LOADING_TIME = 500; // 2 seconds minimum display time

export default function ProductShowcase() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const [showFullLeft, setShowFullLeft] = useState(false);
  const [showFullRight, setShowFullRight] = useState(false);
  const productid = sessionStorage.getItem("currentProductId");

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProductById = async () => {
      const productId = sessionStorage.getItem("currentProductId");

      if (!productId) {
        console.error("No product ID found in sessionStorage");
        setLoading(false);
        return;
      }

      setLoading(true);
      const startTime = Date.now(); // ⭐ START TIMER

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/products/getbyid/${productId}`
        );

        if (response.data.success && response.data.data) {
          setProducts([response.data.data]);
        } else {
          console.error(
            "Product not found or API response failed:",
            response.data
          );
        }
      } catch (err) {
        console.error(
          "Error fetching product:",
          err.response?.data || err.message
        );
      } finally {
        // ⭐ ENFORCE MINIMUM 2-SECOND DELAY ⭐
        const elapsedTime = Date.now() - startTime;
        const remainingTime = MIN_LOADING_TIME - elapsedTime;

        if (remainingTime > 0) {
          setTimeout(() => {
            setLoading(false);
          }, remainingTime);
        } else {
          setLoading(false);
        }
      }
    };

    fetchProductById();
  }, []);

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
    setShowFullLeft(false);
    setShowFullRight(false);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    setShowFullLeft(false);
    setShowFullRight(false);
  };

  const getImageUrl = (imgArray) =>
    Array.isArray(imgArray) && imgArray.length > 0
      ? `${API_BASE_URL}${imgArray[0].replace(/\\/g, "/")}`
      : "https://via.placeholder.com/260x260/cccccc/000000?text=No+Image";

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // ⭐ VERTICALLY CENTERED LOADING BAR JSX ⭐
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh" }} // Centers the spinner vertically in a large portion of the viewport
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-5">
        <h4 className="text-danger">Product data could not be loaded.</h4>
      </div>
    );
  }

  const current = products[currentIndex];
  const mainColor = current.color || "#673ab7";

  return (
    <>
      <div className="container ">
        {/* Header */}
        <div
          className="text-center my-4 p-3 p-md-5 mx-md-5 rounded-4"
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

        {/* Main Content Row */}
        <div className="row my-5 d-flex align-items-center">
          {/* Product Image Column */}
          <div className="col-12 col-lg-4 text-center mb-3 mb-lg-0">
            <motion.div
              key={currentIndex}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 10,
              }}
              className="d-inline-block position-relative"
            >
              <div
  className="main-arc position-relative d-flex justify-content-center align-items-center"
  style={{
    width: "350px",
    height: "540px",
    borderRadius: "190px 190px 0 0",
    background: mainColor,
    paddingTop: "60px",
    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.25)",
    marginLeft: "auto",
    marginRight: "auto",
  }}
>
  <img
    src={getImageUrl(current.productImage)}
    alt={current.productName}
    className="main-img img-fluid"
    style={{
      maxWidth: "270px",
      objectFit: "contain",
    }}
  />
</div>

            </motion.div>
            <p className="text-danger small mt-5">*{current.storage}</p>
          </div>

          {/* Product Details Column */}
          <div className="col-12 col-lg-8 p-3 p-lg-5">
            <h2>{current.genericName}</h2>
            <br />
            {current.mechanismOfAction &&
              current.mechanismOfAction.length > 0 && (
                <>
                  {/* First Drug */}
                  {current.mechanismOfAction[0] && (
                    <div className="mb-4">
                      <h3 className="h4 fw-bold text-dark">
                        {current.mechanismOfAction[0].drug}
                      </h3>
                      <p className="text-muted fs-6 lh-base">
                        {current.mechanismOfAction[0].moa ||
                          "Mechanism information not available"}
                      </p>
                    </div>
                  )}

                  {/* Second Drug (Optional) */}
                  {current.mechanismOfAction[1] && (
                    <div className="mb-4">
                      <h3 className="h4 fw-bold text-dark">
                        {current.mechanismOfAction[1].drug}
                      </h3>
                      <p className="text-muted fs-6 lh-base">
                        {current.mechanismOfAction[1].moa ||
                          "Mechanism information not available"}
                      </p>
                    </div>
                  )}
                </>
              )}

            <h2>{current.packSize}</h2>
            <br />

            {/* View More Button */}
            <button
              className="btn  fw-bold mt-4 p-2  rounded-lg"
              style={{
                fontFamily: "Sen, sans-serif",
                color: mainColor,
              }}
              onClick={openModal}
            >
              View more
            </button>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {current && (
        <ProductDetailModal
          show={isModalOpen}
          handleClose={closeModal}
          product={current}
        />
      )}
    </>
  );
}
