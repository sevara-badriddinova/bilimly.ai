import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import Button from '../../components/ui/Button'
import { authApi } from '../../utils/api'
import { useAuth } from '../../hooks/useAuth'

export default function SignUpPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authApi.register(name, email, password)
      login(response.token)
      navigate('/chat')
    } catch (err: any) {
      setError(err.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="text-center">
        <div className="text-2xl font-extrabold" style={{ color:'#023047' }}>Create account</div>
        <p className="text-sm text-[#0F172A]/70 mt-1">Start learning with Bilimly.ai</p>
      </div>
      <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
        {error && (
          <div className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</div>
        )}
        <input 
          type="text" 
          placeholder="Full name" 
          className="w-full rounded-xl px-4 py-3 bg-[#EAF6FB] outline-none" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full rounded-xl px-4 py-3 bg-[#EAF6FB] outline-none" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full rounded-xl px-4 py-3 bg-[#EAF6FB] outline-none" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <Button className="w-full" disabled={loading}>
          {loading ? 'Creating account...' : 'Sign Up'}
        </Button>
      </form>
      <div className="text-xs text-center mt-3">
        Have an account? <a href="/auth/sign-in" className="underline" style={{ color:'#003f88' }}>Sign in</a>
      </div>
    </AuthLayout>
  )
}


