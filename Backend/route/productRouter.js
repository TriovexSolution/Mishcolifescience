// routes/productRoutes.js
import express from "express";
// Ensure this path is correct:
// import upload from "../Middleware/uplodMiddleware.js";
import upload from "../Middleware/uplodMiddleware.js";
import {
  createProduct,
  getProducts,
  getProductsByCategory,
  getProductById,
  updateProduct,
  deleteProduct,
  // ⭐ IMPORT NEW FUNCTIONS ⭐
  getCategories,
  getFilterProducts,
} from "../controller/productController.js";

const router = express.Router();

// CREATE PRODUCT (with multiple images) 
router.post("/add", upload.array("productImages", 10), createProduct);

// ----------------------------------------------------------------------
// ⭐ NEW ROUTES FOR FILTERING ⭐
// READ ALL CATEGORIES for filter sidebar
router.get("/categories", getCategories);

// READ PRODUCTS WITH SEARCH & CATEGORY FILTER
router.get("/filter", getFilterProducts);
// ----------------------------------------------------------------------

// READ ALL PRODUCTS (General list, keep if needed)
router.get("/getall", getProducts);

// READ PRODUCTS BY CATEGORY ID (Specific route, keep if needed)
router.get("/getbycategory/:categoryId", getProductsByCategory);

// READ SINGLE PRODUCT BY ID
router.get("/getbyid/:id", getProductById);

// UPDATE PRODUCT (with optional multiple image update)
router.put("/update/:id", upload.array("productImages", 10), updateProduct);

// DELETE PRODUCT (hard delete + remove image)
router.delete("/delete/:id", deleteProduct);

export default router;
