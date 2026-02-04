
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2, Printer, Clock, Camera, Quote, Twitter, Facebook } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const ArticleDetail: React.FC = () => {
   const { id } = useParams<{ id: string }>();
   const { articles } = useAdmin();
   const article = articles.find(a => a.id === id);

   if (!article) {
      return (
         <div className="py-40 text-center">
            <h2 className="brand-heading text-4xl text-gray-400 uppercase">Article introuvable</h2>
            <Link to="/magazine" className="mt-8 inline-block border-2 border-black px-8 py-3 font-black uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-all">Retour au magazine</Link>
         </div>
      );
   }

   const wordCount = (article.content || '').split(/\s+/).length;
   const readingTime = Math.max(1, Math.ceil(wordCount / 200));

   return (
      <article className="bg-[#FDFCF8] min-h-screen">
         <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-8 md:pt-12">
            <Link to="/magazine" className="inline-flex items-center gap-2 font-black uppercase text-[10px] tracking-widest mb-10 hover:text-[#FF5733] transition-colors">
               <ArrowLeft size={16} /> Retour au magazine
            </Link>

            {/* Header optimisé pour tenir au mieux sur une ligne ou couper proprement */}
            <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start lg:items-end mb-12">
               <div className="lg:col-span-9">
                  <span className="text-[#FF5733] font-black uppercase text-[10px] tracking-[0.5em] mb-4 block">Grand Format — {article.categorie}</span>
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[80px] font-black brand-heading uppercase tracking-tighter leading-none mb-0 break-words overflow-visible">
                     {article.titre}
                  </h1>
               </div>
               <div className="lg:col-span-3 border-t-4 lg:border-t-0 lg:border-l-2 border-black pt-6 lg:pt-0 lg:pl-10 h-full flex flex-col justify-end">
                  <div className="space-y-3">
                     <div className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">RÉACTION & CRÉDITS</div>
                     <div className="text-lg font-black uppercase underline decoration-[#FF5733] decoration-4 underline-offset-4">{article.author}</div>
                     <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest pt-2">
                        <Clock size={12} /> {readingTime} MIN. DE LECTURE
                     </div>
                  </div>
               </div>
            </header>

            {/* Visuel principal */}
            <div className="w-full h-[50vh] md:h-[65vh] border-[6px] md:border-[10px] border-black overflow-hidden relative mb-12 bg-white shadow-xl">
               <img src={article.cover} className="w-full h-full object-cover grayscale" alt={article.titre} />
               <div className="absolute bottom-4 left-4 md:bottom-6 md:right-6 bg-black text-white p-3 font-black uppercase text-[9px] tracking-widest flex items-center gap-2 border border-white/20">
                  <Camera size={12} className="text-[#FF5733]" /> {article.photoCredit || "ARCHIVES AK"}
               </div>
            </div>
         </div>

         {/* Contenu */}
         <div className="max-w-[1600px] mx-auto px-4 md:px-8 pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

               <aside className="lg:col-span-1 hidden lg:flex flex-col items-center gap-6 pt-4 sticky top-32 h-fit">
                  <button className="p-3 border-2 border-black hover:bg-[#FF5733] hover:text-white transition-all"><Twitter size={18} /></button>
                  <button className="p-3 border-2 border-black hover:bg-[#FF5733] hover:text-white transition-all"><Facebook size={18} /></button>
                  <button className="p-3 border-2 border-black hover:bg-[#FF5733] hover:text-white transition-all"><Share2 size={18} /></button>
                  <div className="w-px h-24 bg-black/20"></div>
               </aside>

               <div className="lg:col-span-7">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-black leading-[1.2] mb-12 text-black break-words tracking-tight border-l-8 border-[#FF5733] pl-6 md:pl-10 py-2 uppercase">
                     {article.excerpt}
                  </div>

                  <div className="space-y-12 text-lg md:text-xl font-medium leading-[1.7] text-gray-800 whitespace-pre-line gazette-body text-justify">
                     {article.content ? article.content : (
                        <div className="py-20 text-center border-4 border-dashed border-black/10 font-black uppercase tracking-widest text-gray-300">
                           Archive en cours de compilation...
                        </div>
                     )}
                  </div>

                  <div className="mt-20 flex items-center gap-6">
                     <div className="flex-grow h-px bg-black/10"></div>
                     <div className="brand-script text-4xl text-[#FF5733] transform -rotate-3">{article.author}</div>
                     <div className="flex-grow h-px bg-black/10"></div>
                  </div>
               </div>

               <div className="lg:col-span-4 space-y-10">
                  <div className="bg-white border-4 border-black p-8 shadow-lg relative">
                     <Quote size={32} className="text-[#FF5733] opacity-10 absolute top-4 right-4" />
                     <h4 className="brand-heading text-xl mb-4 opacity-30">INDEXATION</h4>
                     <div className="flex flex-wrap gap-2">
                        {['IDENTITÉ', 'BRUT', 'AK', article.categorie.toUpperCase()].map(tag => (
                           <span key={tag} className="bg-black text-white px-2 py-1 text-[8px] font-black tracking-widest">{tag}</span>
                        ))}
                     </div>
                  </div>

                  <div className="border-t-[6px] border-[#FF5733] pt-8">
                     <h4 className="brand-heading text-xl mb-4">REJOINDRE LE MOUVEMENT</h4>
                     <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest leading-relaxed mb-6">
                        Vous souhaitez réagir ou proposer votre propre dossier ? Alefa est une plateforme collaborative.
                     </p>
                     <Link to="/collaborer" className="block w-full text-center bg-black text-white py-4 font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#FF5733] transition-all">
                        POSTULER À LA RÉDACTION
                     </Link>
                  </div>
               </div>

            </div>
         </div>
      </article>
   );
};

export default ArticleDetail;
