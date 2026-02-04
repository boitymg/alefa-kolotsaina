
import React from 'react';
import { Video, VideoCategory } from '../../../types';
import ImageBox from './ImageBox';

interface VideosTabProps {
    localVideos: Video[];
    setLocalVideos: (videos: Video[]) => void;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => void;
}

const VideosTab: React.FC<VideosTabProps> = ({ localVideos, setLocalVideos, handleImageUpload }) => {
    const addVideo = () => {
        setLocalVideos([{
            id: Date.now().toString(),
            titre: 'NOUVELLE VIDÉO',
            categorie: VideoCategory.LIVES,
            url: '',
            thumbnail: ''
        }, ...localVideos]);
    };

    const updateVideo = (idx: number, updates: Partial<Video>) => {
        const next = [...localVideos];
        next[idx] = { ...next[idx], ...updates };
        setLocalVideos(next);
    };

    const removeVideo = (id: string) => {
        setLocalVideos(localVideos.filter(v => v.id !== id));
    };

    return (
        <div className="space-y-12">
            <button
                onClick={addVideo}
                className="bg-black text-white px-8 py-4 font-black uppercase text-xs tracking-widest hover:bg-[#FF5733] transition-all"
            >
                + AJOUTER VIDÉO
            </button>
            {localVideos.map((video, idx) => (
                <div key={video.id} className="bg-white border-4 border-black p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-lg">
                    <div className="lg:col-span-3">
                        <ImageBox
                            label="MINIATURE"
                            current={video.thumbnail}
                            onUpload={(e) => handleImageUpload(e, (b) => updateVideo(idx, { thumbnail: b }))}
                        />
                    </div>
                    <div className="lg:col-span-9 space-y-4">
                        <input
                            className="w-full border-2 border-black p-4 font-black uppercase text-xl outline-none focus:border-[#FF5733]"
                            value={video.titre}
                            onChange={e => updateVideo(idx, { titre: e.target.value })}
                            placeholder="TITRE DE LA VIDÉO"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                className="p-3 border-2 border-black font-bold text-xs outline-none focus:border-[#FF5733]"
                                value={video.url}
                                onChange={e => updateVideo(idx, { url: e.target.value })}
                                placeholder="URL EMBED (YOUTUBE/VIMEO)"
                            />
                            <select
                                className="p-3 border-2 border-black font-black uppercase text-[10px]"
                                value={video.categorie}
                                onChange={e => updateVideo(idx, { categorie: e.target.value as VideoCategory })}
                            >
                                {Object.values(VideoCategory).map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <button
                            onClick={() => removeVideo(video.id)}
                            className="text-red-600 font-black text-[10px] uppercase underline hover:text-red-800"
                        >
                            SUPPRIMER
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VideosTab;
