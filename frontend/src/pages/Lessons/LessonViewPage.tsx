import React from 'react'
import Navbar from '../../components/ui/Navbar'
import Footer from '../../components/ui/Footer'
import Button from '../../components/ui/Button'

export default function LessonViewPage() {
  return (
    <div className="min-h-screen w-full" style={{ background:'#F8FAFC' }}>
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="rounded-2xl p-6 shadow ring-1 bg-white" style={{ borderColor:'rgba(2,48,71,0.12)' }}>
          <div className="text-xl font-extrabold" style={{ color:'#023047' }}>Past Simple — O22gan zamon</div>
          <p className="mt-3 text-sm text-[#0F172A]/80">Past Simple zamon o'tgan ish-harakatni bildiradi. Uzbek tilida ...</p>
          <div className="mt-4 rounded-xl p-4" style={{ background:'#EAF6FB' }}>
            <div className="font-semibold" style={{ color:'#003f88' }}>Examples</div>
            <ul className="mt-2 text-sm text-[#0F172A]/80 list-disc pl-6">
              <li>I went to school yesterday — Kecha maktabga bordim.</li>
              <li>She studied English — U ingliz tilini o'rgandi.</li>
            </ul>
          </div>
          <div className="mt-4">
            <div className="font-semibold" style={{ color:'#023047' }}>Quick Quiz</div>
            <div className="mt-2 text-sm">
              Choose: go → ? (yesterday)
            </div>
            <div className="mt-2 flex gap-2 text-sm">
              {['goes','went','gone'].map(o=> <button key={o} className="rounded-xl px-3 py-2" style={{ background:'#FFB703', color:'#00296b' }}>{o}</button>)}
            </div>
          </div>
        </div>
        <div>
          <Button>Next Lesson</Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}


