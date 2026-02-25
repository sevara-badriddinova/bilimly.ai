import React from 'react'
import Navbar from '../../components/ui/Navbar'
import Footer from '../../components/ui/Footer'
import HeroSection from './HeroSection'
import HowItWorks from "./HowItWorks";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full" style={{ background: '#F8FAFC', color:'#023047' }}>

      <HeroSection />
        <HowItWorks/>
      <Footer />
    </div>
  )
}


