import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const lessons = [
  { key:'grammar', name:'Grammar', desc:'Clear Uzbek explanations' },
  { key:'vocabulary', name:'Vocabulary', desc:'Smart spaced repetition' },
  { key:'speaking', name:'Speaking', desc:'Pronunciation practice' },
]

export default function LessonsPage() {
  return (
    <div className="min-h-screen w-full" style={{ background:'#F8FAFC' }}>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map(l=> (
            <a key={l.key} href={`/lessons/${l.key}`} className="rounded-2xl p-6 shadow ring-1 bg-white hover:-translate-y-1 transition" style={{ borderColor:'rgba(2,48,71,0.12)' }}>
              <div className="text-lg font-bold" style={{ color:'#023047' }}>{l.name}</div>
              <div className="text-sm text-[#0F172A]/80 mt-1">{l.desc}</div>
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}


