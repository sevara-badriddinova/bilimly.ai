import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/ui/Button'

export default function DashboardPage() {
  return (
    <div className="min-h-screen w-full" style={{ background: '#F8FAFC' }}>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1 rounded-2xl p-5 shadow ring-1 bg-white" style={{ borderColor:'rgba(2,48,71,0.12)'}}>
          <div className="text-sm font-bold mb-3" style={{ color:'#023047' }}>Menu</div>
          <ul className="space-y-2 text-sm text-[#023047]">
            <li>Dashboard</li>
            <li>Lessons</li>
            <li>Vocabulary</li>
            <li>Chat</li>
            <li>Settings</li>
          </ul>
        </aside>
        <main className="lg:col-span-3 space-y-6">
          <div className="rounded-2xl p-6 shadow ring-1 bg-white" style={{ borderColor:'rgba(2,48,71,0.12)'}}>
            <div className="text-xl font-extrabold" style={{ color:'#023047' }}>Hello, Sevara 👋 — you’re Level A2!</div>
            <div className="mt-4 h-3 w-full rounded-full overflow-hidden" style={{ background:'#E6F4FA' }}>
              <div className="h-full" style={{ width:'45%', background:'#FFB703' }}></div>
            </div>
            <div className="mt-4">
              <Button>Continue Lesson</Button>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl p-6 shadow ring-1 bg-white" style={{ borderColor:'rgba(2,48,71,0.12)'}}>
              <div className="text-lg font-bold" style={{ color:'#023047' }}>Recent Activity</div>
              <ul className="mt-3 text-sm text-[#0F172A]/80 space-y-2">
                <li>• Finished Grammar: Past Simple</li>
                <li>• 20 new words added</li>
              </ul>
            </div>
            <div className="rounded-2xl p-6 shadow ring-1 bg-white" style={{ borderColor:'rgba(2,48,71,0.12)'}}>
              <div className="text-lg font-bold" style={{ color:'#023047' }}>Progress</div>
              <div className="mt-3 text-sm text-[#0F172A]/80">Weekly XP: 320</div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}


