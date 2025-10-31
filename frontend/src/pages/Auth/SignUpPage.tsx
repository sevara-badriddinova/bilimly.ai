import React from 'react'
import AuthLayout from './AuthLayout'
import Button from '../../components/ui/Button'

export default function SignUpPage() {
  return (
    <AuthLayout>
      <div className="text-center">
        <div className="text-2xl font-extrabold" style={{ color:'#023047' }}>Create account</div>
        <p className="text-sm text-[#0F172A]/70 mt-1">Start learning with Bilimly.ai</p>
      </div>
      <form className="mt-6 space-y-3">
        <input type="text" placeholder="Full name" className="w-full rounded-xl px-4 py-3 bg-[#EAF6FB] outline-none" />
        <input type="email" placeholder="Email" className="w-full rounded-xl px-4 py-3 bg-[#EAF6FB] outline-none" />
        <input type="password" placeholder="Password" className="w-full rounded-xl px-4 py-3 bg-[#EAF6FB] outline-none" />
        <Button className="w-full">Sign Up</Button>
      </form>
      <div className="text-xs text-center mt-3">
        Have an account? <a href="/auth/sign-in" className="underline" style={{ color:'#003f88' }}>Sign in</a>
      </div>
    </AuthLayout>
  )
}


