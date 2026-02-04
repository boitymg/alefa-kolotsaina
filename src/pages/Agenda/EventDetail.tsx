
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, MessageCircle, Share2, Info, Calendar } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { events } = useAdmin();
  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <div className="py-40 text-center">
        <h2 className="brand-heading text-4xl text-gray-400 uppercase">Événement introuvable</h2>
        <Link to="/agenda" className="mt-8 inline-block border-2 border-black px-8 py-3 font-black uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-all">Retour à l'agenda</Link>
      </div>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="bg-[#FDFCF8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-24">
        <Link to="/agenda" className="inline-flex items-center gap-2 font-black uppercase text-[10px] tracking-widest mb-12 hover:text-[#FF5733] transition-colors">
          <ArrowLeft size={16} /> Retour à l'agenda
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Affiche de l'événement */}
          <div className="lg:col-span-5">
            <div className="border-[10px] border-black p-3 bg-white shadow-[30px_30px_0px_rgba(255,87,51,0.1)] sticky top-24">
              <img src={event.affiche} alt={event.titre} className="w-full aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
              <div className="absolute top-6 left-6 bg-[#FF5733] text-white px-4 py-2 font-black uppercase text-xs tracking-widest">
                {event.type}
              </div>
            </div>
          </div>

          {/* Infos de l'événement */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="bg-black text-white px-3 py-1 font-black uppercase text-[10px] tracking-widest">{event.prix}</span>
              <span className="flex items-center text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                <MapPin size={12} className="mr-1" /> {event.ville}
              </span>
            </div>

            <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-black brand-heading uppercase tracking-tighter leading-none mb-12 text-wrap-balance break-words">
              {event.titre}
            </h1>

            {/* Practical info bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-y-4 border-black py-10 mb-12">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                  <Calendar size={14} className="text-[#FF5733]" /> DATE DU RENDEZ-VOUS
                </span>
                <p className="text-xl font-black uppercase">{formattedDate}</p>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                  <Clock size={14} className="text-[#FF5733]" /> HEURE DE DÉBUT
                </span>
                <p className="text-xl font-black uppercase">{event.heure}</p>
              </div>
            </div>

            {/* Description / Storytelling of the event */}
            <div className="prose prose-xl mb-16">
              <h3 className="brand-heading text-2xl mb-6 text-[#FF5733] italic">Note de l'organisateur</h3>
              <div className="text-lg md:text-xl font-medium leading-relaxed text-gray-800 whitespace-pre-line drop-cap">
                {event.description || "Aucun détail supplémentaire n'a été fourni pour cet événement. Rendez-vous sur place pour vivre l'expérience Alefa Kolotsaina."}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-6 mt-auto">
              <a
                href={`https://wa.me/${event.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#FF5733] text-white py-6 font-black uppercase text-center tracking-widest flex items-center justify-center gap-4 hover:bg-black transition-all"
              >
                <MessageCircle size={24} /> RÉSERVER VIA WHATSAPP
              </a>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: event.titre,
                      text: `Alefa Kolotsaina : ${event.titre} à ${event.ville}`,
                      url: window.location.href
                    });
                  }
                }}
                className="bg-black text-white px-10 py-6 font-black uppercase text-center tracking-widest flex items-center justify-center gap-4 hover:bg-[#FF5733] transition-all"
              >
                <Share2 size={24} /> PARTAGER
              </button>
            </div>

            {event.socialLink && (
              <a
                href={event.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 font-black uppercase text-[10px] tracking-widest hover:text-[#FF5733] opacity-50 hover:opacity-100 transition-all"
              >
                <Info size={14} /> VOIR LE POST ORIGINAL
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
