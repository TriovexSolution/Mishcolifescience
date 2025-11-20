import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Api } from "../api";
const api = Api;

export default function Allpostblog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // ⭐ 1. Pagination State ⭐
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // Set the number of posts to display per page

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${api}/api/blogs/getall`, {
          // Bypassing cache to ensure fresh data fetch
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });

        if (response.data.success) {
          // Store ALL non-featured posts received from the backend
          setPosts(response.data.posts);
        } else {
          setError("Failed to fetch blog posts.");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Server error while fetching blog posts.");
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // -----------------------------------------------------------------
  // ⭐ 2. Pagination Logic (Calculations) ⭐
  
  // Calculate the total number of pages needed
  const totalPages = Math.ceil(posts.length / postsPerPage);
  
  // Calculate the starting and ending index for the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  
  // Slice the full 'posts' array to get only the posts for the current page
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Function to handle moving to the next page
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Function to handle moving to the previous page
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // -----------------------------------------------------------------


  // Fix path format for images (replace backslashes with forward slashes)
  const getImageUrl = (path) => {
    if (!path) return "placeholder.jpg";
    return `${api}/${path.replace(/\\/g, "/")}`;
  };

  // Function to save ID and navigate
  const handleReadMore = (id) => {
    sessionStorage.setItem("blogId", id);
    window.location.href = `/singleblog/${id}`;
  };

  // Variants for each post (Unchanged)
  const postVariant = {
    hidden: { y: 50, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, delay: i * 0.2, ease: "easeOut" },
    }),
  };

  if (loading)
    return (
      <div className="container my-5 text-center">
        <p>Loading All Posts...</p>
      </div>
    );
    
  if (error)
    return (
      <div className="container my-5 text-center text-danger">
        <p>{error}</p>
      </div>
    );
    
  // Check if there are ANY posts (including the featured one)
  if (posts.length === 0)
    return (
      <div className="container my-5 text-center">
        <p>No other posts found. (You need at least two posts in your database.)</p>
      </div>
    );

  return (
    <div className="container my-5">
      {/* Title */}
      <h4
        style={{
          fontFamily: "Sen, sans-serif",
          fontWeight: 700,
          fontSize: "36px",
          lineHeight: "64px",
          letterSpacing: "-2px",
        }}
        className="border-bottom mb-3 pb-3"
      >
        All Posts (Page {currentPage} of {totalPages})
      </h4>

      {/* ⭐ 3. Use currentPosts instead of the full posts array ⭐ */}
      {currentPosts.map((post, idx) => (
        <NavLink
          to={`/singleblog/${post._id}`}
          key={post._id}
          className="text-decoration-none text-dark"
          onClick={(e) => {
            e.preventDefault();
            handleReadMore(post._id);
          }}
        >
          <motion.div
            className="row mb-4 pb-4 border-bottom"
            custom={idx}
            variants={postVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="col-md-3 col-sm-4">
              <img
                src={getImageUrl(post.imageUrl)}
                className="img-fluid "
                alt={post.title}
              />
            </div>

            <div className="col-md-9 col-sm-8 mt-3 mt-sm-0">
              {/* Category section removed for brevity as it was N/A */}
              <h5
                className="fw-bold"
                style={{
                  fontFamily: "Sen, sans-serif",
                  fontWeight: 700,
                  fontSize: "36px",
                  lineHeight: "48px",
                  letterSpacing: "-2px",
                }}
              >
                {post.title}
              </h5>
              <p
                className="text-muted"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "28px",
                  letterSpacing: "0px",
                }}
              >
                {post.description}
              </p>
            </div>
          </motion.div>
        </NavLink>
      ))}

      {/* ⭐ 4. Pagination Controls (Updated) ⭐ */}
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button 
                className="page-link border-0 text-dark"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                &lt; Prev
              </button>
            </li>
            
            {/* You can add page number buttons here if desired */}
            {/* Example: Displaying current page number */}
            <li className="page-item active">
                <button className="page-link text-white bg-dark border-0">
                    {currentPage}
                </button>
            </li>

            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button 
                className="page-link border-0 text-dark"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next &gt;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}