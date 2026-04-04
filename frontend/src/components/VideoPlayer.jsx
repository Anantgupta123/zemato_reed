const VideoPlayer = ({ src, poster = '', className = '' }) => {
  return (
    <video
      className={`w-full aspect-video rounded-xl shadow-xl object-cover ${className}`}
      src={src}
      poster={poster}
      controls
      autoPlay
      muted
      loop
      playsInline
    >
      Your browser does not support the video tag.
    </video>
  )
}

export default VideoPlayer

