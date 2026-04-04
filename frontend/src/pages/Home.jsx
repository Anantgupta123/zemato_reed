import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Home = () => {
  const { role, loading } = useAuth()

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>

  if (role) {
    return (
      <div className="text-center py-20">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-8">
          Welcome to FoodReels! 🍕
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Your dashboard awaits with delicious reels.
        </p>
        <Link 
          to="/dashboard" 
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-xl hover:shadow-2xl"
        >
          Go to Dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 bg-clip-text text-transparent mb-8 animate-pulse">
          🍕 FoodReels
        </h1>
        <p className="text-2xl md:text-3xl text-gray-700 font-light max-w-2xl mx-auto mb-16 leading-relaxed">
          Discover mouth-watering food reels from your favorite partners. 
          Register as user to watch or partner to create!
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        <Link 
          to="/user-auth"
          className="group bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-10 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 text-center"
        >
          <div className="text-5xl mb-6">👤</div>
          <h2 className="text-3xl font-bold mb-4 group-hover:scale-105 transition-transform">I'm a User</h2>
          <p className="text-xl opacity-90">Watch amazing food reels from partners</p>
        </Link>
        <Link 
          to="/partner-auth"
          className="group bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-10 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 text-center"
        >
          <div className="text-5xl mb-6">👨‍🍳</div>
          <h2 className="text-3xl font-bold mb-4 group-hover:scale-105 transition-transform">I'm a Partner</h2>
          <p className="text-xl opacity-90">Create reels for your delicious food</p>
        </Link>
      </div>
    </div>
  )
}

export default Home

