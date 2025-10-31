import React from 'react'

export default function ChatBubble({ role, children }: { role: 'user' | 'ai', children: React.ReactNode }) {
  const isUser = role === 'user'
  return (
    <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow`} style={{
        background: isUser ? '#FFB703' : '#ffffff',
        color: isUser ? '#00296b' : '#023047',
      }}>
        {children}
      </div>
    </div>
  )
}


