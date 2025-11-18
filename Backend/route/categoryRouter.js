// routes/categoryRoutes.js
import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../controller/categoryController.js";

const router = express.Router();

// CREATE
router.post("/add", createCategory);

// READ
router.get("/getall", getCategories);
router.get("/getbyid/:id", getCategoryById);

// UPDATE
router.put("/update/:id", updateCategory);

// DELETE
router.delete("/delete/:id", deleteCategory);

export default router;