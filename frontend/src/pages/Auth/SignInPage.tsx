import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import Button from '../../components/ui/Button'
import { registerUser } from '../../services/api'
import { useAuth } from '../../context/AuthContext'

export default function SignUpPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    try {
      const data = await registerUser(email, password)

      if (data.error) {
        setError(data.error)
        return
      }

      if (data.token) {
        setSuccess(true)

        // Wait 2 seconds to show success message, then login and navigate
        setTimeout(async () => {
          await login(data.token)
          navigate('/dashboard')
        }, 2000)
      } else {
        setError('Registration failed. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Registration error:', err)
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
      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        {error && (
          <div className="text-red-600 text-sm text-center bg-red-50 rounded-xl px-4 py-2">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-600 text-sm text-center bg-green-50 rounded-xl px-4 py-2">
            ✓ Account created successfully! Redirecting...
          </div>
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