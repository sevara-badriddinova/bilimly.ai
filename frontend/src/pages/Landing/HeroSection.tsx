import React from 'react'
import { motion } from 'framer-motion'
import Button from '../../components/ui/Button'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: '#219EBC' }}>
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-40" style={{ background: '#FFB703' }} />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-30" style={{ background: '#FB8500' }} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center text-white">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}}>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">Learn English in Uzbek with AI 🤖</h1>
          <p className="mt-4 text-base sm:text-lg max-w-xl text-white/90">
            Your personal AI tutor that explains grammar, vocabulary, and speaking — all in Uzbek.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button>Start Learning</Button>
            <Button variant="outline">Sign In</Button>
          </div>
        </motion.div>
        <motion.div initial={{opacity:0,scale:.96}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:.5}}>
          <div className="mx-auto max-w-md rounded-2xl p-5 shadow-2xl ring-1 ring-white/20" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.2), rgba(2,48,71,0.2))' }}>
            <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="AI robot illustration">
              <rect x="160" y="180" rx="20" ry="20" width="480" height="300" fill="#00509d" />
              <circle cx="400" cy="240" r="60" fill="#ffd500" />
              <rect x="340" y="300" width="120" height="20" rx="10" fill="#fff" opacity="0.85" />
              <rect x="210" y="350" width="380" height="24" rx="12" fill="#219EBC" />
              <rect x="210" y="390" width="300" height="24" rx="12" fill="#FFB703" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


