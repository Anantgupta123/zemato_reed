import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { foodAPI } from '../api/food.js'

const UploadForm = ({ onSuccess }) => {
  const [food, setFood] = useState('')
  const [description, setDescription] = useState('')
  const [video, setVideo] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const { logout } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!food || !description || !video) {
      setError('All fields required')
      return
    }

    setUploading(true)
    setError('')
    const formData = new FormData()
    formData.append('food', food)
    formData.append('description', description)
    formData.append('video', video)

    try {
      const response = await foodAPI.createReel(formData)
      onSuccess(response.reel)
      setFood('')
      setDescription('')
      setVideo(null)
    } catch (err) {
      console.error(err)
      console.error('Upload error:', err.response || err)
      setError(err.response?.data?.message || 'Upload failed - check backend')
      if (err.response?.status === 401) logout()
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Upload New Reel 🍕</h2>
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Food Name (e.g., Pizza)"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          required
        />
        <textarea
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-vertical"
          required
        />
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
          className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-orange-500 file:text-white hover:file:bg-orange-600"
          required
        />
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 transition-all"
        >
          {uploading ? 'Uploading...' : 'Upload Reel'}
        </button>
      </div>
    </form>
  )
}

export default UploadForm

