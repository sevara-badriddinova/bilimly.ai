import React from 'react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid place-items-center px-4" style={{ background:'linear-gradient(160deg, #219EBC, #FFB703)' }}>
      <div className="w-full max-w-md rounded-2xl p-6 shadow-2xl bg-white">
        {children}
      </div>
    </div>
  )
}


