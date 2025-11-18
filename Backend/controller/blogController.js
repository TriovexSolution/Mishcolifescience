// controllers/blogController.js
// const Blog = require('../model/blogModel');
import Blog from '../model/blogModel.js';

// ==================== CREATE ====================
export const createBlog = async (req, res) => {
  try {
    const {
      title,
      description,
      content,           // array of { title, description }
      imageUrl,
      featured,
      senderName,
      senderPhoto
    } = req.body;

    // Validate required fields
    if (!title || !description || !senderName) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and senderName are required'
      });
    }

    // Validate content is array and has at least one section
    if (!Array.isArray(content) || content.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Content must be a non-empty array of sections'
      });
    }

    for (const section of content) {
      if (!section.title || !section.description) {
        return res.status(400).json({
          success: false,
          message: 'Each section must have title and description'
        });
      }
    }

    // Only one featured blog at a time
    if (featured) {
      await Blog.updateMany({ featured: true }, { $set: { featured: false } });
    }

    const blog = await Blog.create({
      title,
      description,
      content,
      imageUrl,
      featured: featured || false,
      senderName,
      senderPhoto
    });

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create blog',
      error: error.message
    });
  }
};

// ==================== READ ALL ====================
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ featured: -1, createdAt: -1 })
      .select('title description imageUrl createdAt featured senderName senderPhoto');

    const featured = blogs.find(b => b.featured) || null;
    const posts = blogs.filter(b => !b.featured);

    res.status(200).json({
      success: true,
      featured,
      posts,
      total: blogs.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// ==================== READ ONE ====================
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// ==================== UPDATE ====================
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Prevent invalid _id update
    if (updates._id) delete updates._id;

    // Validate content if provided
    if (updates.content) {
      if (!Array.isArray(updates.content) || updates.content.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Content must be a non-empty array'
        });
      }
      for (const sec of updates.content) {
        if (!sec.title || !sec.description) {
          return res.status(400).json({
            success: false,
            message: 'Each section must have title and description'
          });
        }
      }
    }

    // Handle featured logic
    if (updates.featured === true) {
      await Blog.updateMany({ featured: true }, { $set: { featured: false } });
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      data: blog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update blog',
      error: error.message
    });
  }
};

// ==================== DELETE ====================
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};