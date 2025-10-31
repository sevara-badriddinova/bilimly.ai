import React from 'react'
import { motion } from 'framer-motion'

const items = [
  { icon: '💬', title: 'AI explains English rules in Uzbek' },
  { icon: '🎧', title: 'Practice speaking with voice feedback' },
  { icon: '🧠', title: 'Track your progress and level' },
]

export default function FeatureList() {
  return (
    <section className="py-16" style={{ background: '#F8FAFC' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-center" style={{ color: '#023047' }}>Why Bilimly.ai?</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f, i) => (
            <motion.div key={f.title} initial={{opacity:0, y:16}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:.5, delay:i*0.05}}
              className="rounded-2xl p-6 shadow-lg ring-1" style={{ background: '#ffffff', borderColor: 'rgba(2,48,71,0.12)' }}>
              <div className="h-12 w-12 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ background: '#E6F4FA', color: '#003f88' }}>{f.icon}</div>
              <div className="text-lg font-bold" style={{ color: '#023047' }}>{f.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


