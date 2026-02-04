
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const Magazine: React.FC = () => {
  const { articles, settings } = useAdmin();

  if (articles.length === 0) {
    return (
      <div className="py-40 text-center">
        <h2 className="brand-heading text-4xl text-gray-400">AUCUN ARTICLE PUBLIÉ</h2>
      </div>
    );
  }

  const mainArticle = articles[0];
  const secondaryArticles = articles.slice(1, 4);
  const remainingArticles = articles.slice(4);

  return (
    <div className="py-8 md:py-16 px-4 md:px-8 max-w-[1600px] mx-auto min-h-screen">
      {/* Header optimisé pour tenir sur une ligne sans chevauchement */}
      <header className="mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end border-b-[8px] border-black pb-8 md:pb-12 gap-8">
        <div className="w-full lg:w-auto">
          <span className="text-[#FF5733] font-black uppercase text-[10px] tracking-[0.5em] mb-4 block">Sommaire Mensuel — Vol. 042</span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[120px] font-black brand-heading uppercase tracking-tighter leading-none whitespace-nowrap overflow-visible">
            MAGAZINE
          </h1>
        </div>
        <div className="text-left md:text-right flex flex-col items-start md:items-end shrink-0">
          <span className="brand-script text-3xl text-[#FF5733] transform -rotate-3 mb-2">L'âme de Tana</span>
          <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }).toUpperCase()}</span>
        </div>
      </header>

      {/* Grid Layout Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">

        {/* Article à la une */}
        <div className="lg:col-span-8 group">
          <Link to={`/magazine/${mainArticle.id}`} className="block">
            <div className="relative w-full aspect-video md:aspect-[21/9] mb-8 overflow-hidden border-4 border-black bg-white group-hover:shadow-[12px_12px_0px_#FF5733] transition-all duration-500">
              <img
                src={mainArticle.cover}
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                alt={mainArticle.titre}
              />
              <div className="absolute top-4 right-4 bg-black text-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] z-10 border border-white/20">
                GRAND FORMAT
              </div>
            </div>
            <div className="max-w-3xl">
              <span className="text-[#FF5733] font-black uppercase text-[10px] tracking-widest mb-3 block">DOSSIER — {mainArticle.categorie}</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black brand-heading mb-6 leading-[1.1] uppercase group-hover:text-[#FF5733] transition-colors break-words">
                {mainArticle.titre}
              </h2>
              <p className="text-lg md:text-xl text-gray-700 font-bold mb-8 leading-tight line-clamp-3">
                {mainArticle.excerpt}
              </p>
              <div className="flex items-center gap-3 font-black uppercase text-[10px] tracking-widest border-b-2 border-black pb-1.5 w-fit group-hover:border-[#FF5733] group-hover:text-[#FF5733] transition-all">
                LIRE LE DOSSIER <ArrowUpRight size={18} />
              </div>
            </div>
          </Link>
        </div>

        {/* Sidebar: Tribune & Petits formats */}
        <div className="lg:col-span-4 space-y-12">
          <div className="bg-[#0A0A0A] text-[#FDFCF8] p-8 border-l-[8px] border-[#FF5733] shadow-lg">
            <span className="brand-script text-2xl text-[#FF5733] block mb-3">L'éditorial</span>
            <h3 className="brand-heading text-2xl mb-4 leading-none">{settings.tribuneTitle}</h3>
            <p className="text-[11px] font-bold opacity-70 mb-6 uppercase tracking-widest leading-relaxed">
              {settings.tribuneText}
            </p>
            <Link to="/collaborer" className="inline-block border border-[#FF5733] text-[#FF5733] px-5 py-2.5 font-black uppercase text-[9px] tracking-widest hover:bg-[#FF5733] hover:text-white transition-all">
              {settings.tribuneButtonText}
            </Link>
          </div>

          <div className="space-y-10">
            <h4 className="brand-heading text-lg border-b-2 border-black pb-2 opacity-30">Sommaire</h4>
            {secondaryArticles.map((art) => (
              <Link key={art.id} to={`/magazine/${art.id}`} className="flex gap-4 group items-center">
                <div className="w-24 h-24 shrink-0 border-2 border-black overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                  <img src={art.cover} className="w-full h-full object-cover" alt={art.titre} />
                </div>
                <div>
                  <span className="text-[9px] font-black text-[#FF5733] uppercase block mb-1">{art.categorie}</span>
                  <h5 className="text-lg md:text-xl font-black brand-heading group-hover:text-[#FF5733] leading-none uppercase">{art.titre}</h5>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Reste des articles plus compacts */}
      {remainingArticles.length > 0 && (
        <div className="border-t-2 border-black pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
          {remainingArticles.map(art => (
            <Link key={art.id} to={`/magazine/${art.id}`} className="group">
              <div className="aspect-[4/5] border-2 border-black mb-4 overflow-hidden shadow-[6px_6px_0px_rgba(0,0,0,0.05)]">
                <img src={art.cover} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={art.titre} />
              </div>
              <span className="text-[9px] font-black uppercase text-gray-400 mb-2 block tracking-widest">{art.categorie}</span>
              <h3 className="text-xl font-black brand-heading uppercase leading-tight group-hover:text-[#FF5733] transition-colors">{art.titre}</h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Magazine;
