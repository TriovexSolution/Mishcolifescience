import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./component/Navbar";
import Footer from "./component/footer";

// PAGES
import Homepage from "./pages/Homepage";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";
import ContactUs from "./component/contact";
import BlogPage from "./pages/BlogPage";
import SingleproductPage from "./pages/SingleProductPage";
import SingleblogPage from "./pages/SingleblogPage";
import PrivacypolicyPage from "./pages/PrivacypolicyPage";
import SingleProduct from "./component/Newsingleproduct";

/**
 * Robust ScrollToTop (in-App.js)
 * - useLayoutEffect to run before paint
 * - runs multiple scroll techniques (window.scrollTo, document.body/documentElement)
 * - requestAnimationFrame + setTimeout fallback for mobile/Safari quirks
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useLayoutEffect(() => {
    // central function that attempts multiple scroll techniques
    const doScrollTop = () => {
      try {
        // most reliable immediate jump
        window.scrollTo(0, 0);
      } catch (e) {}

      try {
        // override possible saved scroll positions
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      } catch (e) {}

      try {
        // some browsers support this API
        document.documentElement.scrollTo({ top: 0, left: 0, behavior: "auto" });
      } catch (e) {}
    };

    // run immediately (before paint)
    doScrollTop();

    // run again inside rAF twice to ensure it's applied after render/layout
    const rafId1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        doScrollTop();
      });
    });

    // final fallback: run after short delay (mobile render sometimes slower)
    const timeoutId = setTimeout(doScrollTop, 80);

    // cleanup
    return () => {
      cancelAnimationFrame(rafId1);
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <Router>
      {/* Robust scroll-to-top inside App */}
      <ScrollToTop />

      <ConditionalLayout />
    </Router>
  );
}

// Component to conditionally render Navbar & Footer
const ConditionalLayout = () => {
  const location = useLocation();
  const hideLayout = location.pathname === "/privacypolicy"; // Hide Navbar/Footer on this page

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/singleproduct/:id" element={<SingleproductPage />} />
        <Route path="/newsingleProduct/:id" element={<SingleProduct />} />

        <Route path="/blog" element={<BlogPage />} />
        <Route path="/singleblog/:id" element={<SingleblogPage />} />
        <Route path="/privacypolicy" element={<PrivacypolicyPage />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};
