import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import Button from '../../components/ui/Button'
import { loginUser } from '../../services/api'
import { useAuth, saveToken } from '../../context/AuthContext'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await loginUser(email, password)

      if (data.error) {
        setError(data.error)
        return
      }

      if (data.token) {
        await login(data.token, rememberMe)
        navigate('/dashboard')
      } else {
        setError('Login failed. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="text-center">
        <div className="text-2xl font-extrabold" style={{ color:'#023047' }}>Sign In</div>
        <p className="text-sm text-[#0F172A]/70 mt-1">Welcome back to Bilimly.ai</p>
      </div>
      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        {error && (
          <div className="text-red-600 text-sm text-center bg-red-50 rounded-xl px-4 py-2">
            {error}
          </div>
        )}
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
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-[#003f88] focus:ring-[#003f88]"
          />
          <label htmlFor="rememberMe" className="text-sm text-[#0F172A]/70 cursor-pointer">
            Remember me
          </label>
        </div>

        <Button className="w-full" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
      <div className="text-xs text-center mt-3">
        No account? <a href="/auth/sign-up" className="underline" style={{ color:'#003f88' }}>Create one</a>
      </div>
    </AuthLayout>
  )
}


