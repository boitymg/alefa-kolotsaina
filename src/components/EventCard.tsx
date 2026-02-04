
import React from 'react';
import { MapPin, MessageCircle, Info, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, featured = false }) => {
  return (
    <div className="group bg-white flex flex-col h-full border border-black/10 transition-all hover:border-black hover:shadow-xl relative">
      {/* Zone Image */}
      <Link to={`/agenda/${event.id}`} className="block relative overflow-hidden aspect-[4/5] bg-gray-50">
        <img 
          src={event.affiche} 
          alt={event.titre}
          className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
        />
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start pointer-events-none">
          <span className="bg-black text-white px-2 py-1 text-[8px] font-black uppercase tracking-[0.2em]">
            {event.type}
          </span>
          <span className="bg-white/90 backdrop-blur-sm border border-black/10 px-2 py-1 text-[9px] font-black uppercase shadow-sm">
            {event.prix}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
           <div className="bg-white p-4 rounded-full transform scale-90 group-hover:scale-100 transition-transform">
              <ArrowUpRight size={20} className="text-black" />
           </div>
        </div>
      </Link>
      
      {/* Zone Infos */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-[9px] font-black text-[#FF5733] uppercase tracking-widest mb-2">
          <span>{new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span>
          <span className="opacity-30">•</span>
          <span>{event.heure}</span>
        </div>
        
        <Link to={`/agenda/${event.id}`} className="block flex-grow">
          <h3 className="text-xl font-black brand-heading mb-4 leading-[1.1] uppercase group-hover:text-[#FF5733] transition-colors line-clamp-2">
            {event.titre}
          </h3>
        </Link>
        
        <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 mt-auto">
          <MapPin size={12} className="mr-1.5 text-black shrink-0" />
          <span className="truncate">{event.ville}</span>
        </div>

        {/* Footer actions discret et pro */}
        <div className="pt-4 border-t border-black/5 flex justify-between items-center gap-4">
           <Link 
             to={`/agenda/${event.id}`}
             className="text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 hover:text-[#FF5733] transition-all"
           >
             <Info size={14} /> DÉTAILS
           </Link>
           <a 
             href={`https://wa.me/${event.whatsapp}`}
             target="_blank"
             rel="noopener noreferrer"
             className="bg-black text-white px-4 py-2 text-[8px] font-black uppercase tracking-widest hover:bg-[#FF5733] transition-all flex items-center gap-2"
           >
             <MessageCircle size={12} /> RÉSERVER
           </a>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
