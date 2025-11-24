import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
// Assuming you have 'Api' exported from a file like '../api'
import { Api } from "../api"; 
const api = Api;

const MIN_LOADING_TIME = 500; // 2 seconds minimum display time

// Initial state for the blog post details
const initialPostState = {
    title: "Loading...",
    description: "Fetching blog details...",
    imageUrl: null,
    senderName: "Unknown Author",
    senderPhoto: null,
    createdAt: new Date().toISOString(),
    content: [], // Array for detailed sections
};

export default function SingleblogPage() {
    const [blogPost, setBlogPost] = useState(initialPostState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // --- Data Fetching Logic ---
    useEffect(() => {
        // 1. Get Blog ID from Session Storage
        const blogId = sessionStorage.getItem("blogId");

        if (!blogId) {
            setError("Error: Blog ID not found in session storage.");
            setLoading(false);
            return;
        }

        const fetchPostDetails = async () => {
            setLoading(true);
            const startTime = Date.now(); // ⭐ START TIMER
            let success = false;

            try {
                const response = await axios.get(`${api}/api/blogs/getbyid/${blogId}`);

                if (response.data.success && response.data.data) {
                    const postData = response.data.data;
                    setBlogPost(postData);
                    success = true;
                } else {
                    setError("Blog post details not found.");
                }
            } catch (err) {
                console.error("Error fetching blog details:", err);
                setError("Failed to load blog post. Check API connection or ID validity.");
            } finally {
                // ⭐ ENFORCE MINIMUM 2-SECOND DELAY ⭐
                const elapsedTime = Date.now() - startTime;
                const remainingTime = MIN_LOADING_TIME - elapsedTime;

                if (remainingTime > 0) {
                    setTimeout(() => {
                        setLoading(false);
                    }, remainingTime);
                } else {
                    setLoading(false);
                }
            }
        };

        fetchPostDetails();
    }, []);

    // Format the date for display
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Fix path format for images (replace backslashes with forward slashes)
    const getImageUrl = (path) => {
        if (!path) return "placeholder.jpg"; // Fallback image
        return `${api}/${path.replace(/\\/g, '/')}`;
    };

    // --- Animation variants (Unchanged) ---
    const authorImgVariant = {
        hidden: { x: -50, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.6 } },
    };
    const authorTextVariant = {
        hidden: { x: 50, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.6 } },
    };
    const sectionVariant = (i) => ({
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, delay: i * 0.2, ease: "easeOut" },
        },
    });

    // --- Conditional Rendering for Loading/Error ---
    if (loading) {
        return (
             // ⭐ VERTICALLY CENTERED LOADING BAR JSX ⭐
            <div 
                className="d-flex justify-content-center align-items-center" 
                style={{ minHeight: '80vh' }} // Centers the spinner vertically
            >
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container my-5 text-center text-danger">
                <p>{error}</p>
                <button className="btn btn-secondary mt-3" onClick={() => window.history.back()}>Go Back</button>
            </div>
        );
    }

    // --- Main Component Render ---
    return (
        <div className="container my-5">
            
            {/* Author Info */}
            <div className="d-flex align-items-center justify-content-center mb-4">
                <motion.img
                    src={getImageUrl(blogPost.senderPhoto)}
                    alt={blogPost.senderName || "Author"}
                    className="rounded-circle me-3"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={authorImgVariant}
                />
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={authorTextVariant}
                >
                    <p className="mb-0 fw-bold" style={{ fontFamily: "Sen, sans-serif" }}>
                        {blogPost.senderName}
                    </p>
                    <small className="text-muted">Posted on {formatDate(blogPost.createdAt)}</small>
                </motion.div>
            </div>

            {/* Post Title */}
            <motion.div
                className="d-flex align-items-center text-center flex-column w-75 mx-auto"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h1
                    className="fw-bold mb-3 mx"
                    style={{
                        fontFamily: "Sen, sans-serif",
                        fontSize: "clamp(32px, 5vw, 48px)",
                        lineHeight: "1.2",
                    }}
                >
                    {blogPost.title}
                </h1>

                {/* Category (Assuming category is not part of your current data model, kept static for now) */}
                <p
                    className="text-primary mb-5"
                    style={{ fontFamily: "Inter, sans-serif" }}
                >
                    <i className="bi bi-rocket me-2"></i>Startup
                </p>
            </motion.div>

            {/* Featured Image */}
            <motion.div
                className="mb-5 text-center"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <img
                    src={getImageUrl(blogPost.imageUrl)}
                    alt={blogPost.title || "Post"}
                    className="img-fluid rounded"
                    style={{ maxHeight: "500px", width: "100%", objectFit: "cover" }}
                />
            </motion.div>

            {/* Sections */}
            <article style={{ fontFamily: "Inter, sans-serif", lineHeight: "1.8" }}>
                {blogPost.content && blogPost.content.map((section, index) => (
                    <motion.section
                        key={index}
                        className="mb-5"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={sectionVariant(index)}
                    >
                        <h2
                            className="fw-bold mb-4"
                            style={{
                                fontFamily: "Sen, sans-serif",
                                fontSize: "clamp(24px, 4vw, 32px)",
                                lineHeight: "1.3",
                                color: "#212529",
                            }}
                        >
                            {section.title}
                        </h2>
                        <div className="text-muted" style={{ whiteSpace: "pre-line" }}>
                            {/* Assuming description contains the main body text */}
                            {section.description.split("\n\n").map((paragraph, i) => (
                                <p key={i} className="mb-4">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </motion.section>
                ))}
            </article>
        </div>
    );
}