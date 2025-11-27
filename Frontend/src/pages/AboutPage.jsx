import React from "react";

import AboutPage from "../component/aboutus";
import TeamBlogSection from "../component/TeamBlogSection";

function Homepage() {
  return (
    <div className="w-100 p-0 m-0 overflow-hidden">
      <AboutPage />
      <TeamBlogSection />
    </div>
  );
}

export default Homepage;
