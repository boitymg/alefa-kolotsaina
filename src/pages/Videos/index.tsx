
import React, { useState, useMemo } from 'react';
import { VideoCategory } from '../../types';
import VideoPlayer from '../../components/VideoPlayer';
import { useAdmin } from '../../context/AdminContext';
import { PlayCircle } from 'lucide-react';

const Videos: React.FC = () => {
  const { videos } = useAdmin();
  const [activeCategory, setActiveCategory] = useState<VideoCategory | 'Tout'>('Tout');

  const filteredVideos = useMemo(() => {
    return activeCategory === 'Tout'
      ? videos
      : videos.filter(v => v.categorie === activeCategory);
  }, [videos, activeCategory]);

  const categories = ['Tout', ...Object.values(VideoCategory)];

  return (
    <div className="py-8 md:py-16 px-4 md:px-8 max-w-[1600px] mx-auto min-h-screen">
      <header className="mb-12 md:mb-20 border-b-[8px] md:border-b-[12px] border-black pb-8 md:pb-12 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 overflow-hidden">
        <div className="w-full lg:w-auto">
          <span className="text-[#FF5733] font-black uppercase text-[10px] tracking-[0.4em] mb-3 block">Flux Visuel — Alefa Productions</span>
          <h1 className="text-[14vw] lg:text-[140px] font-black brand-heading uppercase tracking-tighter leading-none mb-0 whitespace-nowrap">
            VIDÉOS
          </h1>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-6 w-full lg:w-auto shrink-0">
          <span className="brand-script text-3xl text-[#FF5733] transform -rotate-2 hidden md:block">Le son & l'image</span>
          <div className="flex flex-wrap gap-2 justify-start lg:justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-4 py-2 font-black uppercase text-[9px] tracking-widest border-2 border-black transition-all ${activeCategory === cat
                    ? 'bg-black text-white'
                    : 'bg-transparent text-black hover:bg-[#FF5733] hover:text-white hover:border-[#FF5733]'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Grille Vidéo */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-16 lg:gap-y-24">
          {filteredVideos.map((video) => (
            <div key={video.id} className="group flex flex-col">
              <div className="border-4 border-black p-2 bg-white shadow-[10px_10px_0px_rgba(0,0,0,0.05)] transition-all group-hover:shadow-[10px_10px_0px_#FF573333] aspect-video">
                <VideoPlayer video={video} />
              </div>
              <div className="mt-6 flex flex-col gap-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-grow">
                    <span className="text-[10px] font-black uppercase text-[#FF5733] tracking-[0.3em] mb-2 block">
                      {video.categorie}
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black brand-heading uppercase leading-[1] group-hover:text-[#FF5733] transition-colors break-words">
                      {video.titre}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-2 border-t border-black/10 w-full justify-between">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Production AK-24</span>
                  <button className="flex items-center gap-2 font-black uppercase text-[9px] tracking-widest hover:text-[#FF5733] transition-all">
                    PARTAGER <PlayCircle size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-32 text-center border-4 border-dashed border-black/10">
          <h3 className="brand-heading text-3xl md:text-5xl text-gray-300 uppercase italic">Canal vide. En attente de diffusion.</h3>
        </div>
      )}
    </div>
  );
};

export default Videos;
