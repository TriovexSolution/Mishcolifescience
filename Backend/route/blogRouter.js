// routes/blogRoutes.js
// const express = require("express");
import express from "express";
const router = express.Router();
// const upload = require("../config/multer");
import upload from "../Middleware/uplodMiddleware.js";

import {
  createBlog,
  getBlogById,
  getBlogs,
  updateBlog,
  deleteBlog,
} from "../controller/blogController.js";

// CREATE: Upload imageUrl + senderPhoto
router.post(
  "/create",
  upload.fields([
    { name: "imageUrl", maxCount: 1 },
    { name: "senderPhoto", maxCount: 1 },
  ]),
  createBlog
);

// UPDATE: Optional upload
router.put(
  "/update/:id",
  upload.fields([
    { name: "imageUrl", maxCount: 1 },
    { name: "senderPhoto", maxCount: 1 },
  ]),
  updateBlog
);

// READ
router.get("/getall", getBlogs);
router.get("/getbyid/:id", getBlogById);

// DELETE
router.delete("/delete/:id", deleteBlog);

export default router;
