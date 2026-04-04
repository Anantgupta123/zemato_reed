import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { foodAPI } from '../api/food.js'
import ReelCard from '../components/ReelCard.jsx'
import UploadForm from '../components/UploadForm.jsx'

const Dashboard = () => {
  const { role, logout, partner } = useAuth()
  console.log('Dashboard role:', role, 'partner:', partner) // Debug
  const [reels, setReels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (role === 'user') {
      fetchReels()
    }
  }, [role])

  const fetchReels = async () => {
    try {
      setLoading(true)
      const response = await foodAPI.getReels()
      setReels(response.FoodItem)
    } catch (err) {
      console.error(err)
      console.error('Reels error:', err.response || err)
      setError(err.response?.data?.message || 'Failed to load reels - check backend')
      if (err.response?.status === 401) logout()
    } finally {
      setLoading(false)
    }
  }

  const handleUploadSuccess = (newReel) => {
    // For partner, refresh if needed
    setReels([newReel, ...reels])
  }

  if (role === 'partner') {
    return (
      <div className="py-12 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
            Partner Dashboard 👨‍🍳
          </h1>
          <p className="text-xl text-gray-600">Create amazing food reels for your customers</p>
        </div>
        <UploadForm onSuccess={handleUploadSuccess} />
      </div>
    )
  }

  if (role === 'user') {
    return (
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4">
              Latest Food Reels 🔥
            </h1>
            <p className="text-xl text-gray-600">Discover delicious creations from food partners</p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
            </div>
          ) : error ? (
            <div className="text-center p-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button onClick={fetchReels} className="bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600">
                Retry
              </button>
            </div>
          ) : reels.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🍕</div>
              <h2 className="text-3xl font-bold text-gray-600 mb-4">No reels yet</h2>
              <p className="text-lg text-gray-500">Be the first to check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reels.map((reel) => (
                <ReelCard key={reel._id} reel={reel} />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return <div>Unexpected role</div>
}

export default Dashboard

