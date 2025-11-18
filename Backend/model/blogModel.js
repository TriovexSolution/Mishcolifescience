// models/Blog.js
// const mongoose = require('mongoose');
import mongoose from 'mongoose';
const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  }
});

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {               // short preview (was excerpt)
    type: String,
    required: true
  },
  content: [sectionSchema],    // ARRAY of { title, description }
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/800x400'
  },
  featured: {
    type: Boolean,
    default: false
  },
  senderName: {
    type: String,
    required: true,
    trim: true
  },
  senderPhoto: {
    type: String,
    default: 'https://via.placeholder.com/80x80'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

blogSchema.index({ featured: -1, createdAt: -1 });
const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
