// controllers/productController.js
import Product from "../model/productModel.js";
import Category from "../model/categoryModel.js";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

// === parseObjectId Helper (Keep yours) ===
const parseObjectId = (id) => {
  if (!id) return null;
  if (typeof id === "string") {
    if (mongoose.Types.ObjectId.isValid(id)) return id;
    try {
      const parsed = JSON.parse(id);
      if (parsed && parsed.$oid && mongoose.Types.ObjectId.isValid(parsed.$oid)) {
        return parsed.$oid;
      }
    } catch {}
  }
  if (id && typeof id === "object" && id.$oid && mongoose.Types.ObjectId.isValid(id.$oid)) {
    return id.$oid;
  }
  return null;
};

// === CREATE PRODUCT ===
export const createProduct = async (req, res) => {
  try {
    const data = { ...req.body };

    // Remove auto-generated fields
    delete data._id;
    delete data.createdAt;
    delete data.__v;

    // === 1. Composition ===
    if (data.composition) {
      if (typeof data.composition === "string") {
        try {
          data.composition = JSON.parse(data.composition);
        } catch (err) {
          return res.status(400).json({
            success: false,
            message: "Invalid composition: Must be valid JSON array.",
          });
        }
      }
      if (!Array.isArray(data.composition)) {
        return res.status(400).json({
          success: false,
          message: "Composition must be an array of {name, strength}.",
        });
      }
    }

    // === 2. Indications ===
    if (data.indications) {
      if (typeof data.indications === "string") {
        data.indications = data.indications
          .split("\n")
          .map(s => s.trim())
          .filter(Boolean);
      }
      if (!Array.isArray(data.indications) || data.indications.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Indications must be a non-empty array.",
        });
      }
    }

    // === 3. Contraindications ===
    if (data.contraindications) {
      if (typeof data.contraindications === "string") {
        data.contraindications = data.contraindications
          .split("\n")
          .map(s => s.trim())
          .filter(Boolean);
      }
    }

    // === 4. NEW: Uses ===
    if (data.uses) {
      if (typeof data.uses === "string") {
        data.uses = data.uses
          .split("\n")
          .map(s => s.trim())
          .filter(Boolean);
      }
      if (!Array.isArray(data.uses) || data.uses.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Uses must be a non-empty array.",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Uses field is required.",
      });
    }

    // === 5. NEW: Mechanism of Action (Drug-wise MOA) ===
    if (data.mechanismOfAction) {
      if (typeof data.mechanismOfAction === "string") {
        try {
          data.mechanismOfAction = JSON.parse(data.mechanismOfAction);
        } catch (err) {
          return res.status(400).json({
            success: false,
            message: "Invalid MOA format. Must be valid JSON array.",
          });
        }
      }
      if (!Array.isArray(data.mechanismOfAction)) {
        return res.status(400).json({
          success: false,
          message: "mechanismOfAction must be an array.",
        });
      }
      const invalid = data.mechanismOfAction.some(m => !m.drug || !m.moa);
      if (invalid) {
        return res.status(400).json({
          success: false,
          message: "Each MOA must have 'drug' and 'moa'.",
        });
      }
    }

    // === 6. Category ===
    const categoryId = parseObjectId(data.category);
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID.",
      });
    }
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category not found.",
      });
    }
    data.category = categoryId;

    // === 7. Image ===
    if (req.file) {
      data.productImage = `/uploads/products/${req.file.filename}`;
    }

    // === 8. Create Product ===
    const product = await Product.create(data);

    // === 9. Populate ===
    const populated = await Product.findById(product._id)
      .populate("category", "name slug icon")
      .lean();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: populated,
    });
  } catch (error) {
    console.error("createProduct error:", error);
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create product",
    });
  }
};

// === UPDATE PRODUCT (Updated with new fields) ===
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    // === Parse arrays ===
    if (data.composition && typeof data.composition === "string") {
      data.composition = JSON.parse(data.composition);
    }
    if (data.indications && typeof data.indications === "string") {
      data.indications = data.indications.split("\n").map(s => s.trim()).filter(Boolean);
    }
    if (data.contraindications && typeof data.contraindications === "string") {
      data.contraindications = data.contraindications.split("\n").map(s => s.trim()).filter(Boolean);
    }

    // === NEW: Parse Uses ===
    if (data.uses && typeof data.uses === "string") {
      data.uses = data.uses.split("\n").map(s => s.trim()).filter(Boolean);
    }

    // === NEW: Parse MOA ===
    if (data.mechanismOfAction && typeof data.mechanismOfAction === "string") {
      try {
        data.mechanismOfAction = JSON.parse(data.mechanismOfAction);
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid MOA JSON format.",
        });
      }
    }

    // === Category ===
    if (data.category) {
      const catId = parseObjectId(data.category);
      if (!catId) {
        return res.status(400).json({ success: false, message: "Invalid category ID" });
      }
      const cat = await Category.findById(catId);
      if (!cat) {
        return res.status(400).json({ success: false, message: "Category not found" });
      }
      data.category = catId;
    }

    // === Image Update ===
    if (req.file) {
      const old = await Product.findById(id);
      if (old?.productImage && old.productImage !== "https://via.placeholder.com/600x600") {
        const oldPath = path.join("uploads", "products", path.basename(old.productImage));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      data.productImage = `/uploads/products/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    ).populate("category", "name slug icon");

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("updateProduct error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// === GET ALL, BY CATEGORY, BY ID, DELETE (unchanged) ===
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name slug")
      .sort({ createdAt: -1 });
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ success: false, message: "Invalid category ID" });
    }
    const products = await Product.find({ category: categoryId })
      .populate("category", "name slug")
      .sort({ createdAt: -1 });
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.json({
      success: true,
      category: { _id: category._id, name: category.name, slug: category.slug },
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }
    const product = await Product.findById(id).populate("category", "name slug");
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    if (product.productImage && product.productImage !== "https://via.placeholder.com/600x600") {
      const imagePath = path.join("uploads", "products", path.basename(product.productImage));
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }
    await Product.findByIdAndDelete(id);
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};