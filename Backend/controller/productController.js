// controllers/productController.js
import Product from "../model/productModel.js";
import Category from "../model/categoryModel.js";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import Subscriber from "../model/subscribeModel.js"; // ⭐ Import Subscriber Model
import sendEmail from "../utiles/sendEmail.js";
import { Api } from "../../Mishco-Admin/api.js";
const api = Api; // ⭐ Import Email Utility
// === parseObjectId Helper (Keep yours) ===
const parseObjectId = (id) => {
  if (!id) return null;
  if (typeof id === "string") {
    if (mongoose.Types.ObjectId.isValid(id)) return id;
    try {
      const parsed = JSON.parse(id);
      if (
        parsed &&
        parsed.$oid &&
        mongoose.Types.ObjectId.isValid(parsed.$oid)
      ) {
        return parsed.$oid;
      }
    } catch {}
  }
  if (
    id &&
    typeof id === "object" &&
    id.$oid &&
    mongoose.Types.ObjectId.isValid(id.$oid)
  ) {
    return id.$oid;
  }
  return null;
};
// Helper function to delete physical file from disk
const deleteFile = (imagePath) => {
  if (imagePath && imagePath !== "https://via.placeholder.com/600x600") {
    // Correctly join path: assuming imagePath is /uploads/products/filename.ext
    const fullPath = path.join("uploads", "products", path.basename(imagePath));
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`Deleted file: ${fullPath}`);
    }
  }
};

// === CREATE PRODUCT ===
export const createProduct = async (req, res) => {
  try {
    const data = { ...req.body };

    // --- Cleanup and Parsing Logic (omitted for brevity) ---
    delete data._id;
    delete data.createdAt;
    delete data.__v;

    if (data.composition && typeof data.composition === "string")
      data.composition = JSON.parse(data.composition);
    if (data.indications && typeof data.indications === "string")
      data.indications = JSON.parse(data.indications);
    if (data.contraindications && typeof data.contraindications === "string")
      data.contraindications = JSON.parse(data.contraindications);
    if (data.uses && typeof data.uses === "string")
      data.uses = JSON.parse(data.uses);
    if (data.mechanismOfAction && typeof data.mechanismOfAction === "string")
      data.mechanismOfAction = JSON.parse(data.mechanismOfAction);

    // --- Category Validation and Assignment ---
    const categoryId = parseObjectId(data.category);
    if (!categoryId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category ID." });
    }
    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Category not found." });
    }
    data.category = categoryId;

    // --- Image - MULTIPLE FILES LOGIC (omitted for brevity) ---
    let uploadedFiles = [];
    if (Array.isArray(req.files)) {
      uploadedFiles = req.files;
    } else if (
      req.files &&
      req.files.productImages &&
      Array.isArray(req.files.productImages)
    ) {
      uploadedFiles = req.files.productImages;
    }

    const imagePaths = [];
    if (uploadedFiles.length > 0) {
      uploadedFiles.forEach((file) => {
        // NOTE: Changed path from /uploads/products/ to /uploads/product/ to match your previous path,
        // but ensure your static path setup in server.js matches your folder structure!
        imagePaths.push(`/uploads/products/${file.filename}`);
      });
    }

    data.productImage = imagePaths;

    // === 1. Create Product ===
    const product = await Product.create(data);

    // === 2. ⭐ SUBSCRIBER NOTIFICATION LOGIC (WITH DEBUGGING) ⭐ ===
    try {
      const subscribers = await Subscriber.find({});

      if (subscribers.length > 0) {
        const subscriberEmails = subscribers.map((sub) => sub.email).join(", ");
        const newProductName =
          product.productName || product.name || "New Product";

        // ⭐ START DEBUGGING LOGS ⭐
        const productUrl = `${api}/singleproduct/${product._id}`;
        console.log("--- EMAIL DEBUGGING START ---");
        console.log(
          `CLIENT_URL Environment Variable: ${process.env.CLIENT_URL}`
        );
        console.log(`New Product ID: ${product._id}`);
        console.log(`Generated Link (HREF): ${productUrl}`);
        console.log(`BCC Recipients Count: ${subscribers.length}`);
        console.log("--- EMAIL DEBUGGING END ---");
        // ⭐ END DEBUGGING LOGS ⭐

        await sendEmail({
          to: process.env.FROM_EMAIL,
          bcc: subscriberEmails,
          subject: `🚀 New Product Launch: ${newProductName} from Mishco Lifescience`,
          html: `
                        <div style="font-family: sans-serif; padding: 20px;">
                            <p>Hello valued subscriber,</p>
                            <p>We are excited to announce the launch of our new product:</p>
                            <h3 style="color: #1E5BA3;">${newProductName}</h3>
                            <p>Find out more about it on our website.</p>
                            <a href="${productUrl}" 
                               style="display: inline-block; padding: 10px 20px; background-color: #1E5BA3; color: white; text-decoration: none; border-radius: 5px;">
                                Visit Now
                            </a>
                            <p style="margin-top: 30px;">Best regards,<br>The Mishco Lifescience Team</p>
                        </div>
                    `,
        });
        console.log(
          `New product email sent to ${subscribers.length} subscribers.`
        );
      }
    } catch (emailError) {
      console.error(
        "Error sending new product email notification:",
        emailError
      );
    }
    // === 3. Populate and Respond ===
    const populated = await Product.findById(product._id)
      .populate("category", "name slug icon")
      .lean();

    res.status(201).json({
      success: true,
      message: "Product created successfully and subscribers notified.",
      data: populated,
    });
  } catch (error) {
    console.error("createProduct error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create product",
    });
  }
};

// === UPDATE PRODUCT (Modified for Multiple Images) ===
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID" });
    } // Find the current product to compare images later
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    } // --- Array Parsing Logic (Composition, Uses, Indications, Contraindications, MOA) ---

    if (data.composition && typeof data.composition === "string")
      data.composition = JSON.parse(data.composition);
    if (data.indications && typeof data.indications === "string")
      data.indications = JSON.parse(data.indications);
    if (data.contraindications && typeof data.contraindications === "string")
      data.contraindications = JSON.parse(data.contraindications);
    if (data.uses && typeof data.uses === "string")
      data.uses = JSON.parse(data.uses);
    if (data.mechanismOfAction && typeof data.mechanismOfAction === "string")
      data.mechanismOfAction = JSON.parse(data.mechanismOfAction); // === Category ===
    if (data.category) {
      const catId = parseObjectId(data.category);
      if (!catId) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid category ID" });
      }
      const cat = await Category.findById(catId);
      if (!cat) {
        return res
          .status(400)
          .json({ success: false, message: "Category not found" });
      }
      data.category = catId;
    } // =================================================================== // === MULTIPLE IMAGE UPDATE & DELETION LOGIC (Crucial Changes) === // =================================================================== // 1. Get the list of images to keep (from the client's currentImagePaths)

    let keptImages = [];
    if (data.existingImages && typeof data.existingImages === "string") {
      keptImages = JSON.parse(data.existingImages);
    } else if (Array.isArray(data.existingImages)) {
      keptImages = data.existingImages;
    } // Filter out any potential placeholders
    keptImages = keptImages.filter(
      (p) => p !== "https://via.placeholder.com/600x600"
    ); // 2. Identify and Delete old images that are NOT in the 'keptImages' list

    const imagesToDelete = (existingProduct.productImage || []).filter(
      (path) => !keptImages.includes(path) && path.startsWith("/uploads")
    );
    imagesToDelete.forEach(deleteFile); // 3. Process new image uploads (FIXED LOGIC)

    let newFilesArray = [];

    // Check if req.files is the array itself (common result of upload.array)
    if (Array.isArray(req.files)) {
      newFilesArray = req.files;
    }
    // Fallback: Check for the files under the field name 'productImages'
    else if (
      req.files &&
      req.files.productImages &&
      Array.isArray(req.files.productImages)
    ) {
      newFilesArray = req.files.productImages;
    }

    const newImagePaths = [];
    if (newFilesArray.length > 0) {
      newFilesArray.forEach((file) => {
        newImagePaths.push(`/uploads/products/${file.filename}`);
      });
    } // 4. Construct the final array of images for the database

    data.productImage = [...keptImages, ...newImagePaths]; // 5. Update Product in the database

    const product = await Product.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    ).populate("category", "name slug icon");

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
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

// === GET ALL, BY CATEGORY, BY ID, DELETE (Modified DELETE) ===

// (getProducts, getProductsByCategory, getProductById remain the same)
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
      return res
        .status(400)
        .json({ success: false, message: "Invalid category ID" });
    }
    const products = await Product.find({ category: categoryId })
      .populate("category", "name slug")
      .sort({ createdAt: -1 });
    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
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
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID" });
    }
    const product = await Product.findById(id).populate(
      "category",
      "name slug"
    );
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
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
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID" });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Delete all associated images
    if (Array.isArray(product.productImage)) {
      product.productImage.forEach(deleteFile);
    } else {
      // Fallback for old single image format
      deleteFile(product.productImage);
    }

    await Product.findByIdAndDelete(id);
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const getCategories = async (req, res) => {
  try {
    // Fetch only active categories, select required fields, and sort
    const categories = await Category.find({ isActive: true })
      .select("name slug _id")
      .sort({ name: 1 });
    res.json({ success: true, data: categories });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch categories" });
  }
};

// ==========================================================
// ⭐ NEW: GET PRODUCTS WITH SEARCH & CATEGORY FILTER ⭐
// This replaces the simple getProducts when filtering is needed
export const getFilterProducts = async (req, res) => {
  try {
    const { category, search } = req.query; // Get filter parameters

    const query = {};
    const $andConditions = [];

    // 1. Category Slug Filtering (The main category selection filter)
    if (category && category !== "all") {
      // Find the category by slug (used by frontend) to get its ObjectId
      const cat = await Category.findOne({ slug: category });
      if (cat) {
        // Apply specific category filter
        query.category = cat._id;
      } else {
        // If category slug is invalid, return empty array
        return res.json({ success: true, count: 0, data: [] });
      }
    }

    // 2. Search Term Filtering (Product Name/Description & Category Name Search)
    if (search) {
      const searchRegex = { $regex: search, $options: "i" };

      // A) Search within Product fields
      const productSearchConditions = {
        $or: [
          { productName: searchRegex },
          { name: searchRegex },
          { description: searchRegex },
        ],
      };

      // B) Search within Category names and get their IDs
      // Note: This step is only necessary if the main 'category' filter is 'all' or not present.
      // If a specific category is already selected (step 1), we typically only search within that category.

      let categorySearchIds = [];
      // If the user has not selected a specific category (i.e., 'all'), we allow category name search.
      // If a specific category IS selected, the simple text search is enough to filter products in that category.
      if (!query.category) {
        // Equivalent to `category === 'all'` or `category` is undefined
        const matchingCategories = await Category.find({
          name: searchRegex,
        }).select("_id");
        categorySearchIds = matchingCategories.map((cat) => cat._id);
      }

      // Combine all search-related conditions using $or
      let combinedSearchOrConditions = [productSearchConditions];

      if (categorySearchIds.length > 0) {
        // If the user is searching across all categories, include products from matching category names
        combinedSearchOrConditions.push({
          category: { $in: categorySearchIds },
        });
      }

      // If a specific category was already set in step 1 (query.category is set),
      // we need to ensure the product matches BOTH the selected category AND the text search.
      if (query.category) {
        $andConditions.push({ category: query.category });
        $andConditions.push(productSearchConditions);
        delete query.category; // Clear the standalone category query
      } else {
        // If no specific category selected (category='all'),
        // the product must match one of the combined search conditions (product field OR category name).
        $andConditions.push({ $or: combinedSearchOrConditions.flat() });
      }
    }

    // Finalize query construction
    if ($andConditions.length > 0) {
      query.$and = $andConditions;
    }

    const products = await Product.find(query)
      .populate("category", "name slug") // Populate category details
      .sort({ createdAt: -1 });

    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    console.error("getFilterProducts error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch filtered products",
    });
  }
};
