
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Event } from '../../../types';

interface FeaturedEventProps {
    event: Event | null;
}

const FeaturedEvent: React.FC<FeaturedEventProps> = ({ event }) => {
    if (!event) {
        return (
            <div className="lg:col-span-8 border-4 border-dashed border-black/10 flex items-center justify-center py-40">
                <span className="brand-heading text-4xl text-gray-200">Aucun dossier à la une</span>
            </div>
        );
    }

    return (
        <div className="lg:col-span-8 group">
            <Link to={`/agenda/${event.id}`} className="block">
                <div className="aspect-video lg:aspect-[21/9] mb-10 overflow-hidden border-[6px] border-black p-2 bg-white shadow-xl">
                    <img
                        src={event.affiche}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                        alt={event.titre}
                    />
                </div>
                <div className="flex items-start gap-8">
                    <div className="hidden md:block">
                        <span className="brand-heading text-6xl text-[#FF5733] opacity-20">01</span>
                    </div>
                    <div className="flex-grow">
                        <span className="bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
                            {event.type} — À L'AFFICHE
                        </span>
                        <h2 className="text-3xl md:text-5xl lg:text-7xl font-black brand-heading mb-8 group-hover:text-[#FF5733] transition-colors leading-[0.95] uppercase text-balance break-words">
                            {event.titre}
                        </h2>
                        <p className="text-xl md:text-2xl font-bold leading-tight mb-8 drop-cap max-w-3xl text-gray-700">
                            {event.description || `Préparez-vous à vivre l'événement le plus attendu de la saison culturelle à ${event.ville}. Un moment de partage et de création brute.`}
                        </p>
                        <div className="flex items-center font-black uppercase text-sm tracking-widest gap-4 border-b-4 border-black pb-2 w-fit">
                            <span>RÉSERVER MA PLACE</span>
                            <ArrowRight size={24} />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default FeaturedEvent;
