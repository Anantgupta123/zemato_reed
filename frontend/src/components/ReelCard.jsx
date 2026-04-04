import VideoPlayer from './VideoPlayer.jsx'
import { Link } from 'react-router-dom'

const ReelCard = ({ reel }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
      <div className="aspect-video relative">
        <VideoPlayer src={reel.video} className="group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
          <h3 className="text-white text-xl font-bold">{reel.food}</h3>
          <p className="text-white/90 text-sm">{reel.description}</p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-600 text-sm">by {reel.foodPatner.name || 'Partner'}</p>
      </div>
    </div>
  )
}

export default ReelCard

