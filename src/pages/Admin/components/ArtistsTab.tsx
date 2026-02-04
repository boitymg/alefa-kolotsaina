
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

                        {/* ARCHIVES SECTION */}
                        <div className="pt-6 border-t-4 border-dashed border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#FF5733]">
                                    <span>📂</span> LES ARCHIVES
                                </label>
                                <button
                                    onClick={() => {
                                        const newArchive = {
                                            id: Date.now().toString(),
                                            title: 'Nouveau projet',
                                            description: '',
                                            image: '',
                                            date: new Date().toISOString().split('T')[0]
                                        };
                                        updateArtist(idx, {
                                            archives: [...(artist.archives || []), newArchive]
                                        });
                                    }}
                                    className="bg-[#FF5733] text-white px-4 py-2 font-black uppercase text-[9px] tracking-widest hover:bg-black transition-all"
                                >
                                    + AJOUTER ARCHIVE
                                </button>
                            </div>
                            <p className="text-[9px] uppercase text-gray-400 mb-4 italic">Dossiers, projets passés et visuels inédits</p>

                            {artist.archives && artist.archives.length > 0 ? (
                                <div className="space-y-4">
                                    {artist.archives.map((archive, archiveIdx) => (
                                        <div key={archive.id} className="border-2 border-gray-300 p-4 bg-gray-50 space-y-3">
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                                <div className="md:col-span-1">
                                                    <ImageBox
                                                        label="IMAGE"
                                                        current={archive.image || ''}
                                                        onUpload={(e) => handleImageUpload(e, (b) => {
                                                            const updatedArchives = [...(artist.archives || [])];
                                                            updatedArchives[archiveIdx] = { ...updatedArchives[archiveIdx], image: b };
                                                            updateArtist(idx, { archives: updatedArchives });
                                                        })}
                                                    />
                                                </div>
                                                <div className="md:col-span-3 space-y-3">
                                                    <input
                                                        className="w-full border-2 border-black p-3 font-black uppercase text-sm outline-none focus:border-[#FF5733]"
                                                        value={archive.title}
                                                        onChange={e => {
                                                            const updatedArchives = [...(artist.archives || [])];
                                                            updatedArchives[archiveIdx] = { ...updatedArchives[archiveIdx], title: e.target.value };
                                                            updateArtist(idx, { archives: updatedArchives });
                                                        }}
                                                        placeholder="TITRE DU PROJET"
                                                    />
                                                    <input
                                                        type="date"
                                                        className="w-full border-2 border-black p-3 font-bold text-xs outline-none focus:border-[#FF5733]"
                                                        value={archive.date}
                                                        onChange={e => {
                                                            const updatedArchives = [...(artist.archives || [])];
                                                            updatedArchives[archiveIdx] = { ...updatedArchives[archiveIdx], date: e.target.value };
                                                            updateArtist(idx, { archives: updatedArchives });
                                                        }}
                                                    />
                                                    <textarea
                                                        className="w-full border-2 border-black p-3 font-medium text-xs outline-none focus:border-[#FF5733] min-h-[80px]"
                                                        value={archive.description}
                                                        onChange={e => {
                                                            const updatedArchives = [...(artist.archives || [])];
                                                            updatedArchives[archiveIdx] = { ...updatedArchives[archiveIdx], description: e.target.value };
                                                            updateArtist(idx, { archives: updatedArchives });
                                                        }}
                                                        placeholder="Description du projet..."
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            const updatedArchives = (artist.archives || []).filter((_, i) => i !== archiveIdx);
                                                            updateArtist(idx, { archives: updatedArchives });
                                                        }}
                                                        className="text-red-600 font-black text-[9px] uppercase underline hover:text-red-800"
                                                    >
                                                        SUPPRIMER CETTE ARCHIVE
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="border-2 border-dashed border-gray-300 p-8 text-center">
                                    <p className="text-xs text-gray-400 italic">Aucune archive pour le moment</p>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => removeArtist(artist.id)}
                            className="text-red-600 font-black text-[10px] uppercase underline hover:text-red-800 mt-4"
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
