import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ChatBubble from './Chat/ChatBubble'

export default function ChatPage() {
  const [messages, setMessages] = React.useState<{role:'user'|'ai', text:string}[]>([
    { role:'ai', text:'Salom! Men sizning AI ingliz tili murabbiyingizman.' }
  ])
  const [input, setInput] = React.useState('')

  function send() {
    if (!input.trim()) return
    setMessages((m)=> [...m, { role:'user', text: input }, { role:'ai', text: 'Ajoyib savol! Bu yerda qisqa tushuntirish...' }])
    setInput('')
  }

  return (
    <div className="min-h-screen w-full" style={{ background: '#F8FAFC' }}>
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-2xl p-4 bg-white shadow ring-1" style={{ borderColor:'rgba(2,48,71,0.12)' }}>
          <div className="h-[60vh] overflow-y-auto mb-3">
            {messages.map((m, i)=> <ChatBubble key={i} role={m.role}>{m.text}</ChatBubble>)}
          </div>
          <div className="flex items-center gap-2">
            <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Ask me anything in Uzbek or English..." className="flex-1 rounded-xl px-4 py-3 text-sm bg-[#EAF6FB] outline-none" />
            <button aria-label="Voice input" className="rounded-xl px-3 py-3" style={{ background:'#003f88', color:'#fff' }}>🎤</button>
            <button onClick={send} className="rounded-xl px-4 py-3 font-semibold" style={{ background:'#FFB703', color:'#00296b' }}>Send</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}


