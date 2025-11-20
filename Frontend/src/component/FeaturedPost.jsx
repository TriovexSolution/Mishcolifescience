import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios"; // Assuming you have 'axios' installed (npm install axios)
import { Api } from "../api";
const api = Api;
// Define an initial state structure
const initialBlogState = {
  _id: null,
  title: "Loading Featured Content...",
  excerpt: "Fetching the most recent blog post data from the server. Please wait.",
  imageUrl: null, // Initial state for image
};

export default function FeaturedPost() {
  const [latestBlog, setLatestBlog] = useState(initialBlogState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Data Fetching Logic ---
  useEffect(() => {
    const fetchLatestBlog = async () => {
      // NOTE: Adjust the URL below to match your backend's actual base URL
      // E.g., if running locally: 'http://localhost:5000/api/blogs/latest'
      
      
      try {
        const response = await axios.get(`${api}/api/blogs/latest`);
        
        if (response.data.success && response.data.title) {
          setLatestBlog(response.data);
        } else {
          // Handle case where API is successful but returns no data
          setError("No featured blog posts found.");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching latest blog:", err);
        setError("Failed to load featured post. Check API connection.");
        setLoading(false);
      }
    };
    fetchLatestBlog();
  }, []); // Empty dependency array means this runs only once on mount

  // --- Framer Motion Variants (Unchanged) ---
  const leftVariant = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const rightVariant = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // --- Conditional Rendering for Loading/Error ---
  if (loading) {
    return (
      <div className="container-fluid py-5 text-center" style={{ backgroundColor: "#EAF5FF" }}>
        <p>Loading Featured Post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid py-5 text-center text-danger" style={{ backgroundColor: "#EAF5FF" }}>
        <p>{error}</p>
      </div>
    );
  }

  // --- Main Component Render ---
  return (
    <div className="container-fluid py-5" style={{ backgroundColor: "#EAF5FF" }}>
      <div className="row align-items-center">

        {/* Text Section (slide from left) */}
        <motion.div
          className="col-12 col-md-6 d-flex flex-column justify-content-center px-4 px-md-5 text-center text-md-start"
          variants={leftVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p
            className="text-uppercase small text-muted mb-2"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "20px",
              letterSpacing: "3px",
            }}
          >
            Featured Post
          </p>

          <h3
            className="fw-bold mb-3"
            style={{
              fontFamily: "Sen, sans-serif",
              fontWeight: 700,
              fontSize: "28px",
              lineHeight: "36px",
              letterSpacing: "-1px",
            }}
          >
            {/* DYNAMIC TITLE */}
            {latestBlog.title}
          </h3>

          <p
            className="text-muted mb-3"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "28px",
              letterSpacing: "0px",
            }}
          >
            {/* DYNAMIC EXCERPT (description from controller) */}
            {latestBlog.excerpt}
          </p>

          <button
            className="btn btn-primary w-50 rounded-0 py-2 px-4"
            style={{
              fontFamily: "Sen, sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "0px",
            }}
            onClick={() => {
                if (latestBlog._id) {
                    // 1. Store the blog ID in Session Storage
                    // Key: 'blogId', Value: the ID of the latest blog post
                    sessionStorage.setItem('blogId', latestBlog._id); 
                    
                    // 2. Navigate to the full blog post page
                    // We use history.push or window.location.href to navigate
                    window.location.href = `/singleblog/${latestBlog._id}`; // Example route
                }
            }}
          >
            Read More
          </button>
        </motion.div>

        {/* Image Section (slide from right) */}
        {/* Image Section (slide from right) */}
        <motion.div
          className="col-12 col-md-6 d-flex justify-content-center mt-4 mt-md-0 px-0"
          variants={rightVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div style={{ width: '50%', height: '50%', overflow: 'hidden' }}>
            <img
              src={latestBlog.imageUrl ? `${api}/${latestBlog.imageUrl.replace(/\\/g, '/')}` : 'placeholder.jpg'}
              className="img-fluid"
              alt={latestBlog.title || "Featured Blog Post"}
              style={{
                // ⭐ FIX 4: Set image to fill the container and cover the space ⭐
                width: "100%",
                height: "100%", 
                objectFit: "cover", // This is CRUCIAL for maintaining aspect ratio and filling the box
                display: 'block'
              }}
            />
          </div>
        </motion.div> 
      </div>
    </div>
  );
}
//  src={latestBlog.imageUrl ? `${api}/${latestBlog.imageUrl.replace(/\\/g, '/')}` : 'placeholder.jpg'} 