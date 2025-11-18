import React from 'react'
import Navbar from '../component/Navbar'
import HeroSection from '../component/Hero'
import AboutMissionPage from '../component/about-misson'
import WhyWeStartedSection from '../component/why-westarted'
import AutoScrollLogos from '../component/AutoScrollLogos'
import TestimonialsSection from '../component/TestimonialsSection'
import ContactSection from '../component/ContactSection'
import Footer from '../component/footer'

function Homepage() {
  return (
    <div className="w-100 p-0 m-0">
      {/* <Navbar /> */}
      <HeroSection />
      <AboutMissionPage/>
      <WhyWeStartedSection />
      <AutoScrollLogos />
      <TestimonialsSection />
      <ContactSection />
      {/* <Footer /> */}
    </div>
  )
}

export default Homepage
