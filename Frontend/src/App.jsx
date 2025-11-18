// src/App.js
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

// Scroll to Top Component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <Router>
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
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/singleproduct/:id" element={<SingleproductPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/singleblog/:id" element={<SingleblogPage />} />
        <Route path="/privacypolicy" element={<PrivacypolicyPage />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};
