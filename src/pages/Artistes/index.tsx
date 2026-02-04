
import React from 'react';
import { Instagram, MapPin, ArrowUpRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

const Artistes: React.FC = () => {
  const { artists } = useAdmin();

  return (
    <div className="py-12 md:py-24 px-4 md:px-8 max-w-[1600px] mx-auto min-h-screen">
      <header className="mb-24 border-b-[12px] border-black pb-12 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 overflow-hidden">
        <div className="w-full lg:w-auto">
          <span className="text-[#FF5733] font-black uppercase text-xs tracking-[0.6em] mb-4 block">Index Référentiel — Artistes Malgaches</span>
          <h1 className="text-[14vw] lg:text-[140px] font-black brand-heading uppercase tracking-tighter leading-none mb-0 whitespace-nowrap">
            ARTISTES
          </h1>
        </div>
        <div className="flex flex-col items-start lg:items-end gap-4 shrink-0">
          <span className="brand-script text-4xl text-[#FF5733] -rotate-3">La force créative</span>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] bg-black text-white px-4 py-2">
            {artists.length} PROFILS ARCHIVÉS
          </div>
        </div>
      </header>

      {artists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
          {artists.map((artist, idx) => (
            <div
              key={artist.id}
              className={`group border-b-4 border-black pb-12 ${idx % 4 === 0 ? 'md:col-span-8' : 'md:col-span-4'
                }`}
            >
              <Link to={`/artistes/${artist.id}`} className="block">
                <div className={`relative overflow-hidden bg-white border-4 border-black p-2 mb-10 transition-all duration-500 group-hover:shadow-[15px_15px_0px_#FF5733] ${idx % 4 === 0 ? 'aspect-[21/9]' : 'aspect-[4/5]'}`}>
                  {artist.photo ? (
                    <img
                      src={artist.photo}
                      alt={artist.nom}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50 italic text-gray-300 font-black text-xs uppercase">
                      Archive Visuelle Manquante
                    </div>
                  )}
                  <div className="absolute top-6 right-6 bg-white border-2 border-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all group-hover:rotate-12">
                    <ArrowUpRight size={24} />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                  <div className="max-w-2xl">
                    <span className="text-xs font-black uppercase tracking-widest text-[#FF5733] mb-2 block">{artist.discipline} — {artist.ville}</span>
                    <h2 className="text-4xl md:text-7xl font-black brand-heading leading-none group-hover:text-[#FF5733] transition-colors uppercase break-words">
                      {artist.nom}
                    </h2>
                  </div>
                  <div className="pt-2">
                    <p className="text-xl font-bold text-gray-600 leading-tight line-clamp-3 mb-8">
                      {artist.bio || "Une biographie brute en attente de publication."}
                    </p>
                    <div className="flex items-center gap-6 font-black uppercase text-[10px] tracking-[0.3em] border-b-2 border-black pb-1 w-fit">
                      Explorer l'index
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-40 text-center border-8 border-dashed border-black/10">
          <h3 className="brand-heading text-5xl text-gray-300 uppercase italic">Aucun créateur dans l'index.</h3>
        </div>
      )}
    </div>
  );
};

export default Artistes;
