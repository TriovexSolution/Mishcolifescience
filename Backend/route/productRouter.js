// routes/productRoutes.js
import express from "express";
import upload from "../Middleware/uplodMiddleware.js"; // Multer config for image upload
import {
  createProduct,
  getProducts,
  getProductsByCategory,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controller/productController.js";

const router = express.Router();

// CREATE PRODUCT (with image)
router.post("/add", upload.single("productImage"), createProduct);

// READ ALL PRODUCTS
router.get("/getall", getProducts);

// READ PRODUCTS BY CATEGORY ID
router.get("/getbycategory/:categoryId", getProductsByCategory);

// READ SINGLE PRODUCT BY ID
router.get("/getbyid/:id", getProductById);

// UPDATE PRODUCT (with optional image update)
router.put("/update/:id", upload.single("productImage"), updateProduct);

// DELETE PRODUCT (hard delete + remove image)
router.delete("/delete/:id", deleteProduct);

export default router;