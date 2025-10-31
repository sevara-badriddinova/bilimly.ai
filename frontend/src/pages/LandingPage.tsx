import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSection from './Landing/HeroSection'
import FeatureList from './Landing/FeatureList'
import PricingBanner from './Landing/PricingBanner'

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full" style={{ background: '#F8FAFC', color:'#023047' }}>
      <Navbar />
      <HeroSection />
      <FeatureList />
      <PricingBanner />
      <Footer />
    </div>
  )
}


