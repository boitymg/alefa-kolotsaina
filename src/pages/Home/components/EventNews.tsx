
import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../../../types';

interface EventNewsProps {
    events: Event[];
}

const EventNews: React.FC<EventNewsProps> = ({ events }) => {
    return (
        <div className="lg:col-span-4 flex flex-col space-y-10">
            <div className="border-b-4 border-black pb-4">
                <h3 className="brand-heading text-2xl uppercase tracking-widest">Dépêches</h3>
            </div>
            {events.length > 0 ? events.map((event, idx) => (
                <Link to={`/agenda/${event.id}`} key={event.id} className="group flex gap-6 pb-6 border-b border-black/5 last:border-0 items-center">
                    <div className="text-xl font-black brand-heading text-gray-300 group-hover:text-[#FF5733] transition-colors">0{idx + 2}</div>
                    <div className="flex flex-col justify-center">
                        <span className="text-[9px] font-black text-[#FF5733] uppercase mb-1 tracking-widest">{event.ville}</span>
                        <h4 className="text-xl font-black brand-heading group-hover:text-[#FF5733] transition-colors uppercase leading-none">{event.titre}</h4>
                        <span className="text-[9px] font-bold uppercase text-gray-400 mt-1">
                            {new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                        </span>
                    </div>
                </Link>
            )) : (
                <p className="text-xs font-black uppercase text-gray-300 italic py-10">Agenda en cours de compilation...</p>
            )}

            <div className="bg-[#0A0A0A] text-[#FDFCF8] p-10 border-l-[10px] border-[#FF5733] mt-8 group cursor-pointer relative overflow-hidden shadow-2xl">
                <Link to="/artistes" className="block relative z-10">
                    <h3 className="brand-heading text-3xl mb-4 text-[#FF5733]">L'ANNUAIRE</h3>
                    <p className="text-xs font-bold mb-8 uppercase tracking-wider leading-relaxed opacity-60">
                        Découvrez l'index complet des créateurs qui redéfinissent la scène malgache.
                    </p>
                    <span className="inline-block border-2 border-[#FF5733] px-6 py-3 font-black text-[10px] uppercase tracking-widest hover:bg-[#FF5733] hover:text-white transition-all">
                        VOIR LES PROFILS
                    </span>
                </Link>
                <div className="absolute -bottom-10 -right-10 opacity-10 font-black brand-heading text-[160px] leading-none pointer-events-none group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform">
                    AK
                </div>
            </div>
        </div>
    );
};

export default EventNews;
