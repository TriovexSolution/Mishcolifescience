import React from "react";
import logo1 from "../assets/logo/logoscroll2.png";
import logo2 from "../assets/logo/logoscroll3.png";
import logo3 from "../assets/logo/logoscroll4.png";
// import logo4 from "../assets/image/logo4.png";
// import logo5 from "../assets/image/logo5.png";

export default function AutoScrollLogos() {
  const logos = [logo1, logo2, logo3, logo1, logo2, logo3];

  return (
    <section className="py-5 bg-white overflow-hidden ">
      <div className="container-fluid px-lg-5 overflow-hidden my-md-5">
        <div className="row align-items-center overflow-hidden my-4 py-3 py-md-5
        ">
          {/* LEFT SIDE - Centered on Mobile/Tablet */}
          <div className="col-12 col-md-2 mb-3 mb-md-0 d-flex flex-column justify-content-center text-center text-md-start">
            <p className="text-muted mb-1" style={{ fontSize: "0.9rem" }}>
              We are
            </p>
            <h5 className="fw-bold text-secondary mb-0">Featured in</h5>
          </div>

          {/* RIGHT SIDE - AUTO SCROLL LOGOS */}
          <div className="col-12 col-md-10 overflow-hidden mt-3 mt-md-0">
            <div className="logo-slider overflow-hidden">
              <div className="logo-track">
                {/* Concatenating the logos array to ensure continuous loop */}
                {logos.concat(logos).map((logo, index) => (
                  <div className="logo-item" key={index}>
                    <img src={logo} alt={`brand-${index}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS (Kept unchanged from previous iteration for functionality) */}
      <style>{`
        /* Container for the slider */
        .logo-slider {
          overflow: hidden;
          width: 100%;
          height: 100px;
          display: flex;
          align-items: center;
          position: relative;
        }

        /* The moving track */
        .logo-track {
          display: flex;
          animation: scroll 25s linear infinite;
          width: max-content;
          will-change: transform;
        }

        /* PAUSE ANIMATION ON HOVER for better accessibility */
        .logo-slider:hover .logo-track {
          animation-play-state: paused;
        }

        /* Individual logo container */
        .logo-item {
          padding: 0 40px;
          display: flex;
          align-items: center;
          flex-shrink: 0; 
          width: 250px; /* Fixed container width on desktop */
        }

        /* Logo image styling (Set height using vw for responsive scaling) */
        .logo-item img {
          /* Responsive height: Scales with viewport, max 90px */
          height: 3.5vw; 
          max-height: 90px;
          min-height: 45px;
          width: auto;
          object-fit: contain;
          filter: grayscale(0%);
          opacity: 0.8;
          transition: all 0.3s ease;
        }

        .logo-item img:hover {
          filter: grayscale(0%);
          opacity: 1;
        }

        @keyframes scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Tablet View (Max 768px) */
        @media (max-width: 768px) {
          /* Ensure vertical stacking of the 'Featured in' column and logos on tablets */
          .container-fluid {
              padding-left: 20px !important;
              padding-right: 20px !important;
          }
          .logo-slider { height: 70px; }
          .logo-item { 
            padding: 0 25px; 
            width: 150px; 
          }
          .logo-item img { 
            height: 50px; 
            max-height: 50px;
            min-height: 50px;
          }
        }

        /* Mobile View (Max 480px) */
        @media (max-width: 480px) {
          .logo-slider { height: 60px; }
          .logo-item { 
            padding: 0 15px; 
            width: 100px; 
          }
          .logo-item img { 
            height: 60px; 
            max-height: 60px;
            min-height: 60px;
          }
        }
      `}</style>
    </section>
  );
}