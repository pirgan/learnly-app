import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const ok = login(email, password)
    if (ok) {
      navigate('/dashboard')
    } else {
      setError('Invalid email or password.')
    }
  }

  function quickLogin(em) {
    setEmail(em)
    setPassword('demo')
    setError('')
  }

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white text-lg">
            L
          </div>
          <span className="text-2xl font-bold text-[#e6edf3] tracking-tight">Learnly</span>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8">
          <h1 className="text-xl font-semibold text-[#e6edf3] mb-1">Welcome back</h1>
          <p className="text-sm text-[#8b949e] mb-6">Sign in to continue learning</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#8b949e] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@learnly.com"
                required
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2.5 text-sm text-[#e6edf3] placeholder-[#484f58] focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#8b949e] mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2.5 text-sm text-[#e6edf3] placeholder-[#484f58] focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs bg-red-900/20 border border-red-800/40 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
            >
              Sign in
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-6 pt-5 border-t border-[#30363d]">
            <p className="text-xs text-[#8b949e] mb-3 text-center">Demo accounts (password: <code className="bg-[#0d1117] px-1.5 py-0.5 rounded text-[#e6edf3]">demo</code>)</p>
            <div className="space-y-2">
              {[
                { email: 'alex@learnly.com', label: 'Alex Chen', role: 'Product Manager' },
                { email: 'sarah@learnly.com', label: 'Sarah Johnson', role: 'UX Designer' },
                { email: 'hr@learnly.com', label: 'Mark Williams', role: 'L&D Manager (HR view)' },
              ].map(u => (
                <button
                  key={u.email}
                  onClick={() => quickLogin(u.email)}
                  className="w-full flex items-center justify-between px-3 py-2 bg-[#0d1117] border border-[#30363d] hover:border-[#484f58] rounded-lg transition-colors group"
                >
                  <div className="text-left">
                    <p className="text-xs font-medium text-[#e6edf3]">{u.label}</p>
                    <p className="text-xs text-[#8b949e]">{u.role}</p>
                  </div>
                  <svg className="w-4 h-4 text-[#484f58] group-hover:text-[#8b949e] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
