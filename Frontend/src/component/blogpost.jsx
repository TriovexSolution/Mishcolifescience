import React from "react";
import authorImg from "../assets/image/author.png"; // replace with your author image
import postImg from "../assets/image/post-image.jpg"; // replace with your main post image

export default function BlogPost() {
  return (
    <div className="container my-5">
      {/* Author Info */}
      <div className="d-flex align-items-center mb-3">
        <img
          src={authorImg}
          alt="Author"
          className="rounded-circle me-3"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
        <div>
          <p className="mb-0 fw-bold" style={{ fontFamily: "Sen, sans-serif" }}>
            Andrew Jonson
          </p>
          <small className="text-muted">Posted on 27th January 2022</small>
        </div>
      </div>

      {/* Post Title */}
      <h2
        className="fw-bold mb-2"
        style={{
          fontFamily: "Sen, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(24px, 5vw, 32px)", // responsive font
          lineHeight: "1.3",
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </h2>

      {/* Post Category */}
      <p className="text-primary mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
        <i className="bi bi-rocket"></i> Startup
      </p>

      {/* Post Image */}
      <div className="mb-4 text-center">
        <img
          src={postImg}
          alt="Post"
          className="img-fluid rounded"
          style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
        />
      </div>

      {/* Post Content */}
      <div className="post-content" style={{ fontFamily: "Inter, sans-serif" }}>
        <p className="mb-3" style={{ lineHeight: "1.8" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
        </p>

        <p className="mb-3" style={{ lineHeight: "1.8" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec scelerisque. Neque egestas congue quisque egestas diam in arcu. 
        </p>

        <p className="mb-3" style={{ lineHeight: "1.8" }}>
          <strong>• Lorem ipsum dolor sit amet</strong> <br />
          • Non blandit massa enim nec scelerisque <br />
          • Neque egestas congue quisque egestas
        </p>

        <p className="mb-3" style={{ lineHeight: "1.8" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
}
