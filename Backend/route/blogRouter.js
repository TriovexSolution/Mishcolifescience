// routes/blogRoutes.js
import express from "express";
// Assuming you have 'upload' correctly imported from your Multer config
import upload from "../Middleware/uplodMiddleware.js";

import {
  createBlog,
  getBlogById,
  getBlogs,
  updateBlog,
  deleteBlog,
  getLatestBlog
} from "../controller/blogController.js";

// --- NEW MIDDLEWARE TO PARSE STRINGIFIED JSON FIELDS ---
const parseJsonFields = (req, res, next) => {
  // Multer receives 'content' as a string (if sent), so we parse it back to an Array
  if (req.body.content && typeof req.body.content === "string") {
    try {
      req.body.content = JSON.parse(req.body.content);
    } catch (e) {
      console.error("Failed to parse content JSON:", e.message);
      return res.status(400).json({
        success: false,
        message: "Invalid JSON format for content field.",
      });
    }
  } // Convert 'featured' from string ('true'/'false') back to boolean

  if (req.body.featured === "true") req.body.featured = true;
  else if (req.body.featured === "false") req.body.featured = false;

  next();
};
// -----------------------------------------------------

const router = express.Router();

// CREATE: Upload files, then parse JSON fields, then run controller
router.post(
  "/create",
  upload.fields([
    { name: "imageUrl", maxCount: 1 },
    { name: "senderPhoto", maxCount: 1 },
  ]),
  parseJsonFields, // <--- MUST BE HERE
  createBlog
);

// UPDATE: Optional upload, then parse JSON fields, then run controller
router.put(
  "/update/:id",
  upload.fields([
    { name: "imageUrl", maxCount: 1 },
    { name: "senderPhoto", maxCount: 1 },
  ]),
  parseJsonFields, // <--- MUST BE HERE
  updateBlog
);

// READ
router.get("/getall", getBlogs);
router.get("/getbyid/:id", getBlogById);
router.get("/latest", getLatestBlog);

// DELETE
router.delete("/delete/:id", deleteBlog);

export default router;
