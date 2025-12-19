import React from 'react'
import AuthLayout from './AuthLayout'
import Button from '../../components/ui/Button'

export default function SignInPage() {
  return (
    <AuthLayout>
      <div className="text-center">
        <div className="text-2xl font-extrabold" style={{ color:'#023047' }}>Sign In</div>
        <p className="text-sm text-[#0F172A]/70 mt-1">Welcome back to Bilimly.ai</p>
      </div>
      <form className="mt-6 space-y-3">
        <input type="email" placeholder="Email" className="w-full rounded-xl px-4 py-3 bg-[#EAF6FB] outline-none" />
        <input type="password" placeholder="Password" className="w-full rounded-xl px-4 py-3 bg-[#EAF6FB] outline-none" />
        <Button className="w-full">Sign In</Button>
      </form>
      <div className="text-xs text-center mt-3">
        No account? <a href="/auth/sign-up" className="underline" style={{ color:'#003f88' }}>Create one</a>
      </div>
    </AuthLayout>
  )
}


