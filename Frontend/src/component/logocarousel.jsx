"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

// --- Logo Imports ---
// NOTE: Make sure these paths are correct in your project structure
import logo1 from "../assets/logo/logoscroll2.png";
import logo2 from "../assets/logo/logoscroll3.png";
import logo3 from "../assets/logo/logoscroll4.png";

// --- Utility Hooks ---

// Hook to determine if the device is mobile (optional, but used in component logic)
const useIsMobile = () =>
  typeof window !== "undefined" && window.innerWidth < 768;

// --- Main Component ---

export default function LogoCloudCarousel() {
  // The original set of logos you want to scroll (1, 2, 3)
  const logoList = [
    logo1,
    logo2,
    logo3,
    logo1,
    logo2,
    logo3,
    logo1,
    logo2,
    logo3,
  ];

  const isMobile = useIsMobile();
  const containerRef = useRef(null);
  // Use useInView to start the animation when the component scrolls into view
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [controls, isInView]);

  return (
    <div
      className="w-full py-20 overflow-hidden my-5 py-5 "
      style={{ display: "flex" }}
    >
      <div className="container " ref={containerRef}>
        <div className="relative my-3 pt-md-5">
          {/* First Marquee Row: Scrolling Left */}
          <MarqueeRow
            direction="left"
            speed={20}
            logos={logoList}
            isMobile={isMobile}
          />

          {/* Second Marquee Row: Scrolling Right (Optional) */}
          <MarqueeRow
            direction="right"
            speed={20}
            logos={logoList}
            isMobile={isMobile}
            className="mt-8"
          />
        </div>
      </div>
    </div>
  );
}

// --- Marquee Row Component ---
// --- Marquee Row Component ---

function MarqueeRow({ direction, speed, logos, isMobile, className = "" }) {
  // CRUCIAL FOR LOOP: Duplicate the logos array exactly once (e.g., [1,2,3, 1,2,3])
  const duplicated = [...logos, ...logos];

  // The animation moves exactly 50% of the duplicated container's width,
  // which is the width of the original, single set of logos.
  const move = isMobile ? "100%" : "50%";

  return (
    <motion.div
      // ✅ Change 1: Removed `space-x-8` entirely from this container.
      className={`flex flex-nowrap w-max my-5 ${className}`}
      style={{ display: "flex" }}
      // Framer Motion Animation
      initial={{ x: direction === "left" ? 0 : `-${move}` }}
      animate={{ x: direction === "left" ? `-${move}` : 0 }}
      transition={{
        repeat: Infinity, // Loop forever
        duration: speed, // Control speed
        ease: "linear", // Consistent speed throughout the loop
      }}
    >
      {/* Map over the doubled list */}
      {duplicated.map((logo, index) => (
        <motion.div
          key={`${direction}-${index}`} // Unique key using direction and index
          // ✅ Change 2: Removed `px-4` padding and reduced `w-32` to `w-24`
          className="flex-shrink-0 flex items-center justify-center h-12 w-24 rounded-xl "
          style={{ display: "flex" }}
        >
          <img
            src={logo}
            alt={`brand-${index}`}
            // Using w-full here to make the image fill the new w-24 container
            className="w-full"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
