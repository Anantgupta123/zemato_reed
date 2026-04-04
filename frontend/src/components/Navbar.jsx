import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Navbar = () => {
  const { role, logout, user, partner } = useAuth()
  const navigate = useNavigate()
  const name = user?.fullName || partner?.name || 'User'

  const handleLogout = async () => {
    try {
      if (role === 'partner') {
        await logoutPartner()
      } else {
        await logoutUser()
      }
      logout()
    } catch (err) {
      logout() // Force local state clear
    }
    navigate('/')
  }

  async function logoutUser() {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
    if (!response.ok) throw new Error()
  }

  async function logoutPartner() {
    const response = await fetch('/api/auth/patnerLogout', {
      method: 'POST',
      credentials: 'include',
    })
    if (!response.ok) throw new Error()
  }

  return (
    <nav className="bg-white shadow-lg p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-orange-500">🍕 FoodReels</Link>
      {role ? (
        <div className="flex items-center space-x-4">
          <span className="font-medium">Hi, {name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link to="/" className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">
          Login/Register
        </Link>
      )}
    </nav>
  )
}

export default Navbar

