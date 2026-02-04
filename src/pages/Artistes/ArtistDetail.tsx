
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Instagram, MapPin, ArrowLeft, History, Quote } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const ArtistDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { artists } = useAdmin();
  const artist = artists.find(a => a.id === id);

  if (!artist) {
    return (
      <div className="py-40 text-center">
        <h2 className="brand-heading text-4xl text-gray-400 uppercase">Artiste introuvable</h2>
        <Link to="/artistes" className="mt-8 inline-block border-2 border-black px-8 py-3 font-black uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-all">Retour à l'annuaire</Link>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-24 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      <Link to="/artistes" className="inline-flex items-center gap-2 font-black uppercase text-[10px] tracking-widest mb-12 hover:text-[#FF5733] transition-colors">
        <ArrowLeft size={16} /> Retour à l'index
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
        <div className="lg:col-span-5">
          <div className="aspect-[3/4] border-[8px] border-black p-4 bg-white shadow-[20px_20px_0px_rgba(0,0,0,0.05)]">
            <img src={artist.photo} alt={artist.nom} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-[#FF5733] text-white px-3 py-1 font-black uppercase text-[10px] tracking-widest">{artist.discipline}</span>
            <span className="flex items-center text-gray-400 font-bold uppercase text-[10px] tracking-widest">
              <MapPin size={12} className="mr-1" /> {artist.ville}
            </span>
          </div>
          <h1 className="text-[clamp(2.5rem,12vw,6.5rem)] lg:text-8xl font-black brand-heading uppercase tracking-tighter leading-none mb-8 whitespace-nowrap overflow-hidden text-ellipsis">
            {artist.nom}
          </h1>
          <p className="text-xl md:text-2xl font-bold leading-relaxed mb-10 text-gray-700 drop-cap">
            {artist.bio}
          </p>
          {artist.instagram && (
            <a href={artist.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 border-b-4 border-black pb-2 w-fit font-black uppercase text-sm tracking-widest hover:border-[#FF5733] hover:text-[#FF5733] transition-all">
              <Instagram size={20} /> Instagram Official
            </a>
          )}
        </div>
      </div>

      {/* EXTENDED BIO / STORYTELLING SECTION */}
      {artist.extendedBio && (
        <section className="mb-32 max-w-4xl mx-auto border-l-8 border-black pl-8 md:pl-16 relative">
          <Quote size={48} className="absolute -left-12 -top-6 text-[#FF5733] opacity-20" />
          <h3 className="brand-heading text-3xl mb-8 text-[#FF5733] italic">Le Parcours / Storytelling</h3>
          <div className="prose prose-xl text-lg md:text-xl font-medium leading-[1.8] text-gray-800 whitespace-pre-line italic">
            {artist.extendedBio}
          </div>
        </section>
      )}

      {/* ARCHIVES SECTION */}
      <section className="border-t-[12px] border-black pt-20">
        <header className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-5xl font-black brand-heading uppercase tracking-tighter flex items-center gap-4">
              <History size={40} className="text-[#FF5733]" /> LES ARCHIVES
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mt-2">Dossiers, projets passés et visuels inédits</p>
          </div>
        </header>

        {artist.archives && artist.archives.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {artist.archives.map((item) => (
              <div key={item.id} className="group border-b-4 border-black pb-8">
                <div className="aspect-video border-2 border-black p-1 bg-white mb-6 overflow-hidden">
                  {item.image && (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                  )}
                </div>
                <span className="text-[9px] font-black uppercase text-[#FF5733] tracking-widest mb-2 block">{item.date}</span>
                <h3 className="text-2xl font-black brand-heading mb-4 uppercase group-hover:text-[#FF5733] transition-colors">{item.title}</h3>
                <p className="text-sm font-bold text-gray-600 leading-relaxed uppercase italic">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border-4 border-dashed border-black/10">
            <h3 className="brand-heading text-4xl text-gray-300">SECTION ARCHIVE VIDE</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">Aucun document n'a été rattaché à cet artiste pour le moment.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ArtistDetail;
