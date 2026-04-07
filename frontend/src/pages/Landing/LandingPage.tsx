import React from 'react'
import HeroSection from './HeroSection'
import HowItWorks from './HowItWorks'

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full">
      <HeroSection />
      <HowItWorks />
    </div>
  )
}