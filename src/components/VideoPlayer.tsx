
import React from 'react';
import { Play } from 'lucide-react';
import { Video } from '../types';

interface VideoPlayerProps {
  video: Video;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <div className="group relative bg-[#0A0A0A] w-full h-full overflow-hidden">
      {!isPlaying ? (
        <div 
          className="w-full h-full cursor-pointer relative"
          onClick={() => setIsPlaying(true)}
        >
          <img 
            src={video.thumbnail} 
            alt={video.titre}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#FF5733] flex items-center justify-center rounded-none border-2 border-[#0A0A0A] group-hover:scale-110 transition-all duration-300">
              <Play size={24} className="md:size-[32px]" fill="white" stroke="white" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <h3 className="text-white text-sm font-black brand-heading uppercase tracking-widest truncate">{video.titre}</h3>
          </div>
        </div>
      ) : (
        <iframe
          src={`${video.url}?autoplay=1`}
          title={video.titre}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default VideoPlayer;
