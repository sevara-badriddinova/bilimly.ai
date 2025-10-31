import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10" style={{ background: '#003f88' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-white/90 text-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2025 Bilimly.ai</div>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
            <a href="https://t.me/" target="_blank" rel="noreferrer" className="hover:underline">Telegram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}


