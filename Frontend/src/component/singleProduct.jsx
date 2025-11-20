import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import axios from "axios";
import { Api } from "../api"; // Assuming '../api' exports your base URL

// ⭐ IMPORTANT: Set your backend base URL ⭐
const API_BASE_URL = Api;

export default function ProductShowcase() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get ID from the URL param (primary) or fallback to sessionStorage
  const { id: urlId } = useParams();

  // -----------------------------------------------------------
  // 1. DATA FETCHING LOGIC
  // -----------------------------------------------------------
  useEffect(() => {
    // 1. Determine the Product ID to use
    const storedId = sessionStorage.getItem("currentProductId");
    const productId = urlId || storedId;

    if (!productId) {
      setError("Product ID not found. Please navigate from the product list.");
      setLoading(false);
      return;
    }

    // 2. Fetch the product details
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/products/getbyid/${productId}`
        );

        if (response.status === 200 && response.data.success) {
          setProduct(response.data.data);
        } else if (response.status !== 304) {
          setError(
            response.data.message || "Product not found or request failed."
          );
        }
      } catch (err) {
        console.error("Fetch error:", err);

        if (axios.isAxiosError(err) && err.response) {
          setError(`Server responded with error: ${err.response.status}`);
        } else {
          setError("An error occurred while fetching product details.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [urlId]);

  // Helper to safely get the first image URL
  const getImageUrl = (productImageArray) => {
    if (Array.isArray(productImageArray) && productImageArray.length > 0) {
      // Corrected: Uses the base URL + the path provided by the backend
      return `${API_BASE_URL}${productImageArray[0].replace(/\\/g, "/")}`;
    }
    // Fallback placeholder
    return "https://via.placeholder.com/260x260/cccccc/000000?text=Product";
  };

  // -----------------------------------------------------------
  // 2. LOADING AND ERROR RENDERING
  // -----------------------------------------------------------

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger" role="alert">
          Error: {error || "Product data is unavailable."}
        </div>
      </div>
    );
  }

  // Extract data for cleaner rendering
  const name = product.productName || product.genericName || "Unknown Product";
  const description =
    product.genericName || product.brandName || "No detailed description.";

  const {
    dosageForm, // Used for 'Form' in details list
    packSize, // Used for 'Size' in details list
    mrp, // Used for 'Price' in details list
    category,
    productImage,
    composition,
    indications,
    contraindications,
    // ⭐ FIX 1: Destructure the color field from the product object
    color, 
  } = product;

  // ⭐ FIX 2: Use the color from the database, or a sensible fallback color
  const productColor = color || "#673ab7"; // Defaulting to purple if the field is missing

  // Since `category` is an ObjectId, we hardcode 'Uncategorized'
  // or you need to ensure your backend populates this field (e.g., category.name).
  const categoryName =
    category && category.name ? category.name : "Uncategorized";

  // Function to gather details for the right panel
  const getDetailsList = () => {
    const details = [];

    if (dosageForm) details.push({ label: "Form", value: dosageForm });
    if (packSize) details.push({ label: "Pack Size", value: packSize });
    // if (mrp) details.push({ label: "Price (MRP)", value: `$${mrp}` });

    return details;
  };

  const detailsList = getDetailsList();

  // -----------------------------------------------------------
  // 3. ANIMATION VARIANTS (Unchanged)
  // -----------------------------------------------------------
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

  const centerVariant = {
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // -----------------------------------------------------------
  // 4. MAIN RENDER
  // -----------------------------------------------------------
  return (
    <>
      {/* INTERNAL CSS */}
      <style>{`
        .product-arc {
          /* ⭐ FIX 3: Removed hardcoded background-color here, relying on inline style */
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
        <div
          className="text-center mb-5 p-5 mx-5"
          style={{ fontFamily: "Sen, sans-serif", backgroundColor: "#EAF5FF" }}
        >
          <p className="text-uppercase small text-secondary fw-semibold mb-1 text-start">
            {categoryName}
          </p>
          <h3 className="fw-bold text-start">{name}</h3>
          <p className="text-start text-muted small mt-2">{description}</p>
        </div>

        <div className="row align-items-center justify-content-center">
          {/* ---- LEFT TEXT (Composition/Indications) ---- */}
          <motion.div
            className="col-12 col-md-3 text-center text-md-end mb-4 mb-md-0"
            variants={leftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h6 className="fw-bold text-primary">Composition</h6>
            <ul className="list-unstyled small text-muted text-md-end">
              {Array.isArray(composition) && composition.length > 0 ? (
                composition.map((item, index) => (
                  <li key={index}>
                    {item.name} ({item.strength})
                  </li>
                ))
              ) : (
                <li>Information pending.</li>
              )}
            </ul>

            <h6 className="fw-bold mt-4 text-primary">Indications</h6>
            <ul className="list-unstyled small text-muted text-md-end">
              {Array.isArray(indications) && indications.length > 0 ? (
                indications.map((item, index) => <li key={index}>{item}</li>)
              ) : (
                <li>Information pending.</li>
              )}
            </ul>
          </motion.div>

          {/* ---- CENTER PRODUCT (Image) ---- */}
          <motion.div
            className="col-12 col-md-6 text-center"
            variants={centerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div
              className="product-arc mx-auto p-4"
              // ⭐ FIX 4: Use the dynamic color variable here
              style={{ backgroundColor: productColor }} 
            >
              <img
                src={getImageUrl(productImage)}
                alt={name}
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

          {/* ---- RIGHT TEXT (Details/Contraindications) ---- */}
          <motion.div
            className="col-12 col-md-3 text-center text-md-start mt-4 mt-md-0"
            variants={rightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h6 className="fw-bold text-primary">Key Details</h6>
            <ul className="list-unstyled small text-muted">
              {detailsList.map((detail, index) => (
                <li key={index}>
                  • {detail.label}: {detail.value}
                </li>
              ))}
            </ul>

            <h6 className="fw-bold mt-4 text-primary">Contraindications</h6>
            <ul className="list-unstyled small text-muted">
              {Array.isArray(contraindications) &&
              contraindications.length > 0 ? (
                contraindications.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))
              ) : (
                <li>• No specific contraindications listed.</li>
              )}
            </ul>
          </motion.div>
        </div>
      </div>
    </>
  );
}