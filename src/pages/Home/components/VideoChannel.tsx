
import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';
import VideoPlayer from '../../../components/VideoPlayer';
import { Video } from '../../../types';

interface VideoChannelProps {
    videos: Video[];
}

const VideoChannel: React.FC<VideoChannelProps> = ({ videos }) => {
    const video = videos[0];

    return (
        <div className="flex-grow">
            <div className="border-b-4 border-black pb-4 mb-8 flex justify-between items-end">
                <h3 className="brand-heading text-2xl uppercase tracking-widest">Canal Vidéo</h3>
                <Link to="/videos" className="text-[10px] font-black uppercase hover:text-[#FF5733]">Voir Tout</Link>
            </div>
            {video ? (
                <div className="relative group border-4 border-black p-2 bg-white shadow-lg">
                    <div className="aspect-video">
                        <VideoPlayer video={video} />
                    </div>
                    <div className="p-6">
                        <span className="text-[9px] font-black uppercase text-[#FF5733] tracking-widest mb-2 block">{video.categorie}</span>
                        <h4 className="text-2xl font-black brand-heading leading-tight uppercase group-hover:text-[#FF5733] transition-all line-clamp-1">{video.titre}</h4>
                        <div className="mt-4 pt-4 border-t border-black/5 flex justify-end">
                            <span className="flex items-center gap-2 text-[9px] font-black uppercase text-gray-400">
                                <PlayCircle size={14} /> Regarder
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="aspect-video bg-black/5 border-4 border-dashed border-black/10"></div>
            )}
        </div>
    );
};

export default VideoChannel;
