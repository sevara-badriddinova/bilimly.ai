import React from 'react'
import Logo from './Logo'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="w-full sticky top-0 z-50" style={{ background: '#003f88' }}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" aria-label="Bilimly.ai home">
          <Logo />
        </Link>
        <div className="hidden md:flex items-center gap-6 text-white/90 text-sm font-medium">
          <NavLink to="/pricing" className={({isActive})=> isActive? 'underline' : ''}>Pricing</NavLink>
          <NavLink to="/dashboard" className={({isActive})=> isActive? 'underline' : ''}>Dashboard</NavLink>
          <NavLink to="/chat" className={({isActive})=> isActive? 'underline' : ''}>Chat</NavLink>
          <NavLink to="/lessons" className={({isActive})=> isActive? 'underline' : ''}>Lessons</NavLink>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-full border px-3 py-1 text-xs font-semibold text-white" style={{ borderColor: '#FFB703' }}>
            <span className="mr-1">🇺🇿</span>/<span className="ml-1">🇬🇧</span>
          </button>
          <Link to="/auth/sign-in" className="hidden sm:inline-flex rounded-xl px-4 py-2 text-sm font-semibold text-[#00296b]" style={{ background: '#FFB703' }}>Sign In</Link>
        </div>
      </nav>
    </header>
  )
}


