// controllers/blogController.js
import Blog from "../model/blogModel.js";

// ==================== CREATE ====================
export const createBlog = async (req, res) => {
  try {
    const {
      title,
      description,
      content, // Now guaranteed to be an array or undefined/null by middleware
      imageUrl,
      featured,
      senderName,
      senderPhoto,
    } = req.body; // Validate required fields

    if (!title || !description || !senderName) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and senderName are required",
      });
    } // Validate content is array and has at least one section // This now runs correctly because the middleware converted 'content' from string to array

    if (!Array.isArray(content) || content.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Content must be a non-empty array of sections",
      });
    }

    for (const section of content) {
      if (!section.title || !section.description) {
        return res.status(400).json({
          success: false,
          message: "Each section must have title and description",
        });
      }
    } // Only one featured blog at a time // 'featured' is now guaranteed to be a boolean due to the middleware

    if (featured) {
      await Blog.updateMany({ featured: true }, { $set: { featured: false } });
    }

    const blog = await Blog.create({
      title,
      description,
      content,
      imageUrl: req.files.imageUrl ? req.files.imageUrl[0].path : imageUrl, // Use path from Multer if file uploaded, else use string in req.body (for future updates)
      featured: featured || false,
      senderName,
      senderPhoto: req.files.senderPhoto
        ? req.files.senderPhoto[0].path
        : senderPhoto, // Use path from Multer if file uploaded, else use string in req.body (for future updates)
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create blog",
      error: error.message,
    });
  }
};

// ==================== READ ALL ====================
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 }) // <-- Sort by newest first
      .select(
        "title description imageUrl createdAt featured senderName senderPhoto"
      );

    // The first post is the latest (used in the featured component).
    // We filter the remaining posts into a separate array.
    const featured = blogs.length > 0 ? blogs[0] : null; // The absolute latest post

    // All other posts, starting from the second element (index 1)
    // const posts = blogs.slice(1);
    // You can optionally filter out featured posts too, but slicing already removes the newest one

    res.status(200).json({
      success: true,
      featured, // The absolute latest one
      posts: blogs, // All posts EXCEPT the absolute latest one
      total: blogs.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
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
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ==================== UPDATE ====================
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; // Handle Multer file paths for updates

    if (req.files) {
      if (req.files.imageUrl) {
        updates.imageUrl = req.files.imageUrl[0].path;
      }
      if (req.files.senderPhoto) {
        updates.senderPhoto = req.files.senderPhoto[0].path;
      }
    } // Prevent invalid _id update

    if (updates._id) delete updates._id; // Validate content if provided (runs correctly after parseJsonFields middleware)

    if (updates.content) {
      if (!Array.isArray(updates.content) || updates.content.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Content must be a non-empty array",
        });
      }
      for (const sec of updates.content) {
        if (!sec.title || !sec.description) {
          return res.status(400).json({
            success: false,
            message: "Each section must have title and description",
          });
        }
      }
    } // Handle featured logic // 'updates.featured' is now guaranteed to be a boolean due to the middleware

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
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update blog",
      error: error.message,
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
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getLatestBlog = async (req, res) => {
  try {
    // Query the database:
    // 1. Sort by 'createdAt' in descending order (-1) to get the newest first.
    // 2. Limit the result to 1 document.
    // 3. Select the fields needed for the featured display (image, title, excerpt).
    const latestBlog = await Blog.findOne()
      .sort({ createdAt: -1 })
      .limit(1)
      .select("title description imageUrl createdAt");

    if (!latestBlog) {
      return res.status(404).json({
        success: false,
        message: "No blog posts found",
      });
    }

    // The 'description' field is the best fit for the featured post's excerpt text
    // If your description is too long, you might need client-side trimming.

    res.status(200).json({
      success: true,
      title: latestBlog.title,
      imageUrl: latestBlog.imageUrl,
      excerpt: latestBlog.description, // Using description as the body text
      _id: latestBlog._id, // Include ID for the "Read More" button
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error fetching latest blog",
      error: error.message,
    });
  }
};
