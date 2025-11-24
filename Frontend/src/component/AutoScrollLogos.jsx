import React from "react";
import logo1 from "../assets/image/logo1.png";
import logo2 from "../assets/image/logo2.png";
import logo3 from "../assets/image/logo3.png";
import logo4 from "../assets/image/logo4.png";
import logo5 from "../assets/image/logo5.png";

export default function AutoScrollLogos() {
  const logos = [logo1, logo2, logo3, logo4, logo5];

  return (
    <section className="py-5 bg-white overflow-hidden mt-4">
      <div className="container-fluid px-5 overflow-hidden">
        
        <div className="row align-items-center overflow-hidden">
          
          {/* LEFT SIDE */}
          <div className="col-12 col-md-2 mb-3 mb-md-0">
            <p className="text-muted mb-1" style={{ fontSize: "0.9rem" }}>
              We are
            </p>
            <h5 className="fw-bold text-secondary mb-0">Featured in</h5>
          </div>

          {/* RIGHT SIDE - AUTO SCROLL LOGOS */}
          <div className="col-12 col-md-10 overflow-hidden">
            <div className="logo-slider overflow-hidden">
              <div className="logo-track">
                {logos.concat(logos).map((logo, index) => (
                  <div className="logo-item" key={index}>
                    <img src={logo} alt="brand" />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* CSS */}
      <style>{`
        body {
          overflow-x: hidden !important;
        }

        .logo-slider {
          overflow: hidden;
          width: 100%;
          height: 70px;
          display: flex;
          align-items: center;
          position: relative;
        }

        .logo-track {
          display: flex;
          animation: scroll 25s linear infinite;
          width: max-content;
          will-change: transform;
        }

        .logo-item {
          padding: 0 40px;
          display: flex;
          align-items: center;
        }

        .logo-item img {
          height: 30px;
          object-fit: contain;
          filter: grayscale(100%);
          opacity: 0.8;
          transition: all 0.3s ease;
        }

        .logo-item img:hover {
          filter: grayscale(0%);
          opacity: 1;
        }

        @keyframes scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (max-width: 768px) {
          .logo-item { padding: 0 25px; }
          .logo-item img { height: 45px; }
        }

        @media (max-width: 480px) {
          .logo-item { padding: 0 20px; }
          .logo-item img { height: 40px; }
        }
      `}</style>
    </section>
  );
}
