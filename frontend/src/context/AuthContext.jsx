import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [partner, setPartner] = useState(null)
  const [token, setToken] = useState(document.cookie.split('; ').find(row => row.startsWith('token= '))?.split('=')[1] || null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check role on mount
    if (token) {
      // Role detection: AJAX call or from localStorage (set on login)
      const storedRole = localStorage.getItem('role')
      const storedData = localStorage.getItem('userData')
      if (storedRole && storedData) {
        const data = JSON.parse(storedData)
        if (storedRole === 'user') setUser(data)
        if (storedRole === 'partner') setPartner(data)
        setRole(storedRole)
      }
    }
    setLoading(false)
  }, [token])

  const login = (data, isPartner = false) => {
    const roleKey = isPartner ? 'partner' : 'user'
    setRole(roleKey)
    localStorage.setItem('role', roleKey)
    localStorage.setItem('userData', JSON.stringify(data))
    if (isPartner) setPartner(data)
    else setUser(data)
    // Cookie set by backend
  }

  const logout = () => {
    setUser(null)
    setPartner(null)
    setRole(null)
    setToken(null)
    localStorage.removeItem('role')
    localStorage.removeItem('userData')
    document.cookie = 'token=; Max-Age=0; path=/; domain=' + window.location.hostname
  }

  return (
    <AuthContext.Provider value={{
      user, partner, token, role, loading, login, logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

