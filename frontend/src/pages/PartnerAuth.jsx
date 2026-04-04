import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../api/auth.js'

const PartnerAuth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ name: '', contactName: '', phone: '', address: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const apiCall = isLogin ? authAPI.loginPartner : authAPI.registerPartner
      const response = await apiCall(formData)
      login(response.patner || { name: response.user }, true)
      navigate('/dashboard')
    } catch (err) {
      console.error('Partner auth error:', err.response || err)
      setError(err.response?.data?.message || err.message || 'Network error - start backend on :8080')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            {isLogin ? 'Welcome Partner!' : 'Partner Signup'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? 'Login to upload reels' : 'Create partner account'}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Restaurant Name</label>
                <input name="name" type="text" value={formData.name} onChange={handleChange} required className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500" placeholder="Pizza Palace" />
              </div>
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                <input name="contactName" type="text" value={formData.contactName} onChange={handleChange} required={!isLogin} className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500" placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required={!isLogin} className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500" placeholder="+1 234 567 8900" />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input name="address" type="text" value={formData.address} onChange={handleChange} required={!isLogin} className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500" placeholder="123 Food St" />
              </div>
            </>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500" placeholder="partner@example.com" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input name="password" type="password" value={formData.password} onChange={handleChange} required className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500" placeholder="••••••••" />
          </div>
          {error && <div className="text-red-600 text-sm p-3 bg-red-50 rounded-xl">{error}</div>}
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 transition">
            {loading ? 'Loading...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>
        <div className="text-center">
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-orange-600 hover:text-orange-500 font-medium text-sm">
            {isLogin ? 'New partner? Register' : 'Already registered? Login'}
          </button>
        </div>
        <Link to="/" className="block text-center text-sm text-gray-600 hover:text-gray-900">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

export default PartnerAuth

