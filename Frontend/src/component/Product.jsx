import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Api } from "../api";

// ⭐ IMPORTANT: Set your backend base URL ⭐
const API_BASE_URL = Api;

const ProductPageNo = () => {
  const navigate = useNavigate(); // ⭐ STATE FOR DYNAMIC DATA AND FILTERS ⭐

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Array of category objects
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategorySlug, setActiveCategorySlug] = useState("all"); // 'all' for all categories // ------------------------------------------------------------------- // 1. DATA FETCHING LOGIC (CATEGORIES & PRODUCTS) // ------------------------------------------------------------------- // Function to fetch products based on current filters (Debounce target)

  const fetchProducts = useCallback(
    async (currentSearch, currentCategorySlug) => {
      setLoading(true);
      setError(null);
      try {
        const params = {}; // 💡 FILTER LOGIC: Apply category filter if it's not 'all'

        if (currentCategorySlug && currentCategorySlug !== "all") {
          params.category = currentCategorySlug;
        } // 💡 FILTER LOGIC: Apply search term filter
        if (currentSearch) {
          params.search = currentSearch;
        } // Hit the filter endpoint with combined parameters

        const response = await axios.get(
          `${API_BASE_URL}/api/products/filter`,
          {
            params: params,
          }
        );

        if (response.data.success) {
          setProducts(response.data.data);
        } else {
          setError("Failed to fetch products.");
          setProducts([]);
        }
      } catch (err) {
        console.error("Fetch products error:", err);
        setError("An error occurred while fetching products.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    },
    []
  ); // Function to fetch all categories once on mount

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Hit the new categories endpoint
        const response = await axios.get(
          `${API_BASE_URL}/api/products/categories`
        );
        if (response.data.success) {
          // Add 'All Categories' option at the start for the filter reset
          const allCategories = [
            { name: "All Categories", slug: "all" },
            ...response.data.data,
          ];
          setCategories(allCategories);
        }
      } catch (err) {
        console.error("Fetch categories error:", err);
      }
    };
    fetchCategories();
  }, []); // Debounced useEffect to call fetchProducts when filters change

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchProducts(searchTerm, activeCategorySlug);
    }, 300); // 300ms delay for debouncing search input

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, activeCategorySlug, fetchProducts]); // ------------------------------------------------------------------- // 2. HELPER FUNCTIONS // ------------------------------------------------------------------- // Helper to safely get the first image URL

  const getImageUrl = (productImageArray) => {
    if (Array.isArray(productImageArray) && productImageArray.length > 0) {
      // Correcting file path format for web access
      return `${API_BASE_URL}${productImageArray[0].replace(/\\/g, "/")}`;
    }
    return "https://via.placeholder.com/150/ffffff/000000?text=No+Image";
  }; // Helper to get the display name of the active category

  const activeCategoryName =
    categories.find((cat) => cat.slug === activeCategorySlug)?.name ||
    "All Products"; // ------------------------------------------------------------------- // 3. ANIMATION VARIANTS (Unchanged) // -------------------------------------------------------------------

  const sidebarVariant = {
    hidden: { x: -200, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const productVariant = {
    hidden: { y: 50, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: i * 0.2 },
    }),
  }; // ------------------------------------------------------------------- // 4. COMPONENT RENDER // -------------------------------------------------------------------

  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}
    >
      {/* Header */}
      <div className="row mb-5" style={{ backgroundColor: "#EAF5FF" }}>
        <div className="col-12 text-center py-5">
          <h1
            className="display-5 fw-bold"
            style={{ fontFamily: "Sen, sans-serif" }}
          >
            Our Global Product Range
          </h1>

          <p
            className="text-muted "
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Explore our range of Pharmaceuticals, Nutraceuticals, and Healthcare
            Products <br />
            Currently Showing: <strong>{activeCategoryName}</strong>
          </p>
        </div>
      </div>

      <div className="row g-4 mx-2">
        {/* Left Sidebar (Filters) */}
        <motion.div
          className="col-lg-3 mb-5"
          variants={sidebarVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="bg-[#EAF5FF] p-4 rounded shadow-sm h-100">
            {/* 🛑 SEARCH INPUT FILTER 🛑 */}
            <div className="input-group mb-4">
              <span className="input-group-text bg-white border-end-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search text-muted"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </span>

              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search products..."
                value={searchTerm} // CONNECTED: Updates searchTerm state
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ boxShadow: "none" }}
              />
            </div>
            {/* 🛑 CATEGORIES FILTER 🛑 */}
            <h6
              className="text-uppercase fw-bold text-dark mb-3"
              style={{
                fontSize: "0.85rem",
                letterSpacing: "1px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Filter by Categories
            </h6>

            <div className="list-group list-group-flush">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <button
                    key={cat.slug}
                    className={`list-group-item list-group-item-action border-0 px-0 ${
                      activeCategorySlug === cat.slug
                        ? "text-primary fw-bold"
                        : "text-secondary"
                    }`} // CONNECTED: Updates activeCategorySlug state
                    onClick={() => setActiveCategorySlug(cat.slug)}
                    style={{
                      backgroundColor: "transparent",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {cat.name}
                  </button>
                ))
              ) : (
                <p className="text-muted small">Loading categories...</p>
              )}
            </div>
          </div>
        </motion.div>
        {/* Products Display (Dynamic Content) */}
        <div className="col-lg-9">
          {/* Conditional Rendering for Loading/Error/No Products */}

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading products...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger text-center">{error}</div>
          ) : products.length === 0 ? (
            <div className="alert alert-info text-center">
              No products found matching the criteria.
            </div>
          ) : (
            // Render Products Grid
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
              {products.map((product, i) => (
                <motion.div
                  className="col"
                  key={product._id}
                  custom={i} // Removed product variants to maintain smooth list updates during filtering
                >
                  <motion.div
                    className="card border-0 shadow-sm h-100 overflow-hidden"
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "10px",
                      cursor: "pointer",
                      transition: "transform 0.2s",
                    }}
                    onClick={() => {
                      // 1. Store the product ID in sessionStorage
                      sessionStorage.setItem("currentProductId", product._id); // 2. Navigate to the single product page
                      navigate(`/singleproduct/${product._id}`);
                    }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div
                      className="card-body d-flex flex-column align-items-center justify-content-center"
                      style={{ minHeight: "300px" }}
                    >
                      {/* DYNAMIC IMAGE */}

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="border-0 bg-transparent"
                      >
                        <img
                          src={getImageUrl(product.productImage)}
                          alt={product.name}
                          className="img-fluid"
                          style={{
                            objectFit: "contain",
                            maxHeight: "150px",
                            mixBlendMode: "multiply",
                          }}
                        />
                      </motion.button>
                      {/* DYNAMIC PRODUCT INFO */}

                      <h5 className="fw-bold mt-3 text-dark text-center">
                        {product.productName}
                      </h5>

                      <p className="small text-muted mb-0">
                        {product.category?.name || "N/A"}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPageNo;
