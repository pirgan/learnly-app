import { createContext, useContext, useState } from 'react'
import { USERS } from '../data/users'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem('learnly_user')
    return stored ? JSON.parse(stored) : null
  })

  function login(email, password) {
    const found = USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!found) return false
    const { password: _, ...safe } = found
    setUser(safe)
    sessionStorage.setItem('learnly_user', JSON.stringify(safe))
    return true
  }

  function logout() {
    setUser(null)
    sessionStorage.removeItem('learnly_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
