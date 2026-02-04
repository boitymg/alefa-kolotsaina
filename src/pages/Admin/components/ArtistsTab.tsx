
import React from 'react';
import { Artist, City } from '../../../types';
import ImageBox from './ImageBox';

interface ArtistsTabProps {
    localArtists: Artist[];
    setLocalArtists: (artists: Artist[]) => void;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => void;
}

const ArtistsTab: React.FC<ArtistsTabProps> = ({ localArtists, setLocalArtists, handleImageUpload }) => {
    const addArtist = () => {
        setLocalArtists([{
            id: Date.now().toString(),
            nom: 'NOUVEL ARTISTE',
            photo: '',
            discipline: 'ARTISTE SCÉNIQUE',
            ville: City.ANTANANARIVO,
            bio: '',
            instagram: ''
        }, ...localArtists]);
    };

    const updateArtist = (idx: number, updates: Partial<Artist>) => {
        const next = [...localArtists];
        next[idx] = { ...next[idx], ...updates };
        setLocalArtists(next);
    };

    const removeArtist = (id: string) => {
        setLocalArtists(localArtists.filter(a => a.id !== id));
    };

    return (
        <div className="space-y-12">
            <button
                onClick={addArtist}
                className="bg-black text-white px-8 py-4 font-black uppercase text-xs tracking-widest hover:bg-[#FF5733] transition-all"
            >
                + AJOUTER ARTISTE
            </button>
            {localArtists.map((artist, idx) => (
                <div key={artist.id} className="bg-white border-4 border-black p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-lg">
                    <div className="lg:col-span-3">
                        <ImageBox
                            label="PHOTO"
                            current={artist.photo}
                            onUpload={(e) => handleImageUpload(e, (b) => updateArtist(idx, { photo: b }))}
                        />
                    </div>
                    <div className="lg:col-span-9 space-y-4">
                        <input
                            className="w-full border-2 border-black p-4 font-black uppercase text-xl outline-none focus:border-[#FF5733]"
                            value={artist.nom}
                            onChange={e => updateArtist(idx, { nom: e.target.value })}
                            placeholder="NOM D'ARTISTE"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                className="p-3 border-2 border-black font-black uppercase text-[10px]"
                                value={artist.discipline}
                                onChange={e => updateArtist(idx, { discipline: e.target.value })}
                                placeholder="DISCIPLINE"
                            />
                            <select
                                className="p-3 border-2 border-black font-black uppercase text-[10px]"
                                value={artist.ville}
                                onChange={e => updateArtist(idx, { ville: e.target.value as City })}
                            >
                                {Object.values(City).map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <textarea
                            className="w-full border-2 border-black p-4 font-bold text-xs h-32 outline-none focus:border-[#FF5733]"
                            value={artist.bio}
                            onChange={e => updateArtist(idx, { bio: e.target.value })}
                            placeholder="BIOGRAPHIE"
                        />
                        <input
                            className="w-full border-2 border-black p-3 font-bold text-xs"
                            value={artist.instagram}
                            onChange={e => updateArtist(idx, { instagram: e.target.value })}
                            placeholder="LIEN INSTAGRAM"
                        />
                        <button
                            onClick={() => removeArtist(artist.id)}
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

export default ArtistsTab;
