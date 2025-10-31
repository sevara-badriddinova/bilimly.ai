import React from 'react'

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
        Bilimly
        <span className="text-[#FFB703]">.ai</span>
      </span>
    </div>
  )
}


