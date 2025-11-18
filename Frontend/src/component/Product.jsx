import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ProductPageNo = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Categories");

  const products = [
    { id: 1, name: "Product 1", color: "#6a0572" },
    { id: 2, name: "Product 2", color: "#fd7e14" },
    { id: 3, name: "Product 3", color: "#0d6efd" },
    { id: 4, name: "Product 4", color: "#6a0572" },
    { id: 5, name: "Product 5", color: "#fd7e14" },
    { id: 6, name: "Product 6", color: "#0d6efd" },
  ];

  const categories = [
    "Categories",
    "Lorem ipsum",
    "Dolor sit",
    "Consectetur",
    "Adipiscing",
  ];

  // Animation Variants
  const sidebarVariant = {
    hidden: { x: -200, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const productVariant = {
    hidden: { y: 50, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: i * 0.2 },
    }),
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      {/* Header */}
      <div className="row mb-5" style={{ backgroundColor: "#EAF5FF" }}>
        <div className="col-12 text-center py-5">
          <h1 className="display-5 fw-bold" style={{ fontFamily: "Sen, sans-serif" }}>
            Our Product
          </h1>
          <p className="text-muted" style={{ fontFamily: "Inter, sans-serif" }}>
            Lorem ipsum dolor sit amet
          </p>
        </div>
      </div>

      <div className="row g-4 mx-2">
        {/* Left Sidebar */}
        <motion.div
          className="col-lg-3 mb-5"
          variants={sidebarVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="bg-[#EAF5FF] p-4 rounded shadow-sm h-100">
            {/* Search */}
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
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ boxShadow: "none" }}
              />
            </div>

            {/* Categories */}
            <h6 className="text-uppercase fw-bold text-dark mb-3" style={{ fontSize: "0.85rem", letterSpacing: "1px", fontFamily: "Inter, sans-serif" }}>
              Categories
            </h6>
            <div className="list-group list-group-flush">
              {categories.map((cat, index) => (
                <button
                  key={index}
                  className={`list-group-item list-group-item-action border-0 px-0 ${activeCategory === cat ? "text-primary fw-bold" : "text-secondary"}`}
                  onClick={() => setActiveCategory(cat)}
                  style={{ backgroundColor: "transparent", fontFamily: "Inter, sans-serif" }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Products */}
        <div className="col-lg-9">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
            {products.map((product, i) => (
              <motion.div
                className="col"
                key={product.id}
                custom={i}
                variants={productVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div
                  className="card border-0 shadow-sm h-100 overflow-hidden"
                  style={{
                    backgroundColor: product.color,
                    borderRadius: "10px",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                  onClick={() => navigate(`/singleproduct/${product.id}`)}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="card-body d-flex align-items-center justify-content-center" style={{ minHeight: "300px" }}>
                    <img
                      src="https://via.placeholder.com/150/ffffff/000000?text=Medicine"
                      alt={product.name}
                      className="img-fluid"
                      style={{ objectFit: "contain", maxHeight: "150px", mixBlendMode: "multiply" }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageNo;
