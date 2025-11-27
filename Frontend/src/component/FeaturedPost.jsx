import React from "react";

function FeaturedPost() {
  return (
    <div className="row mb-5 mx-auto" style={{ backgroundColor: "#EAF5FF" }}>
      <div className="col-12 text-center py-5 mx-auto">
        <h1
          className="display-5 fw-bold"
          style={{ fontFamily: "Sen, sans-serif" }}
        >
          Our Blogs
        </h1>

        <p className="text-muted" style={{ fontFamily: "Inter, sans-serif" }}>
          Stay informed with expert insights, industry updates, and
          health-focused articles from our pharmaceutical and healthcare blog.
          {/* <br /> */}
          
        </p>
      </div>
    </div>
  );
}

export default FeaturedPost;
