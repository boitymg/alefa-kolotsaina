
import React from 'react';
import { Event, City, EventType } from '../../../types';
import ImageBox from './ImageBox';

interface EventsTabProps {
    localEvents: Event[];
    setLocalEvents: (events: Event[]) => void;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => void;
}

const EventsTab: React.FC<EventsTabProps> = ({ localEvents, setLocalEvents, handleImageUpload }) => {
    const addEvent = () => {
        setLocalEvents([{
            id: Date.now().toString(),
            titre: 'NOUVEL ÉVÉNEMENT',
            slug: 'nouvel-evenement',
            date: new Date().toISOString().split('T')[0],
            heure: '20:00',
            ville: City.ANTANANARIVO,
            type: EventType.CONCERT,
            affiche: '',
            prix: 'À DETERMINER',
            whatsapp: '',
            socialLink: '',
            valide: true
        }, ...localEvents]);
    };

    const updateEvent = (idx: number, updates: Partial<Event>) => {
        const next = [...localEvents];
        next[idx] = { ...next[idx], ...updates };
        setLocalEvents(next);
    };

    const removeEvent = (id: string) => {
        setLocalEvents(localEvents.filter(e => e.id !== id));
    };

    return (
        <div className="space-y-12">
            <button
                onClick={addEvent}
                className="bg-black text-white px-8 py-4 font-black uppercase text-xs tracking-widest hover:bg-[#FF5733] transition-all"
            >
                + AJOUTER ÉVÉNEMENT
            </button>
            {localEvents.map((event, idx) => (
                <div key={event.id} className="bg-white border-4 border-black p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-lg">
                    <div className="lg:col-span-3">
                        <ImageBox
                            label="AFFICHE"
                            current={event.affiche}
                            onUpload={(e) => handleImageUpload(e, (b) => updateEvent(idx, { affiche: b }))}
                        />
                    </div>
                    <div className="lg:col-span-9 space-y-4">
                        <input
                            className="w-full border-2 border-black p-4 font-black uppercase text-xl outline-none focus:border-[#FF5733]"
                            value={event.titre}
                            onChange={e => updateEvent(idx, { titre: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                            placeholder="TITRE"
                        />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <select
                                className="p-3 border-2 border-black font-black uppercase text-[10px]"
                                value={event.ville}
                                onChange={e => updateEvent(idx, { ville: e.target.value as City })}
                            >
                                {Object.values(City).map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <select
                                className="p-3 border-2 border-black font-black uppercase text-[10px]"
                                value={event.type}
                                onChange={e => updateEvent(idx, { type: e.target.value as EventType })}
                            >
                                {Object.values(EventType).map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <input
                                type="date"
                                className="p-3 border-2 border-black font-bold text-xs"
                                value={event.date}
                                onChange={e => updateEvent(idx, { date: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                className="p-3 border-2 border-black font-bold text-xs"
                                value={event.prix}
                                onChange={e => updateEvent(idx, { prix: e.target.value })}
                                placeholder="PRIX (EX: 20.000 AR)"
                            />
                            <input
                                className="p-3 border-2 border-black font-bold text-xs"
                                value={event.whatsapp}
                                onChange={e => updateEvent(idx, { whatsapp: e.target.value })}
                                placeholder="WHATSAPP (SANS +)"
                            />
                        </div>
                        <input
                            className="w-full border-2 border-black p-3 font-bold text-xs"
                            value={event.socialLink}
                            onChange={e => updateEvent(idx, { socialLink: e.target.value })}
                            placeholder="LIEN SOCIAL (FB/IG)"
                        />
                        <div className="pt-4 border-t-2 border-dashed border-gray-200">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#FF5733] mb-2">NOTE DE L'ORGANISATEUR</label>
                            <textarea
                                className="w-full border-2 border-black p-4 font-medium text-sm outline-none focus:border-[#FF5733] min-h-[120px]"
                                value={event.description || ''}
                                onChange={e => updateEvent(idx, { description: e.target.value })}
                                placeholder="Détails, contexte, histoire..."
                            />
                        </div>
                        <button
                            onClick={() => removeEvent(event.id)}
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

export default EventsTab;
