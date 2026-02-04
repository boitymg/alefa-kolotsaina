
import React, { useState, useMemo } from 'react';
import { Search, MapPin } from 'lucide-react';
import { City, EventType } from '../../types';
import EventCard from '../../components/EventCard';
import { useAdmin } from '../../context/AdminContext';

const Agenda: React.FC = () => {
  const { events } = useAdmin();
  const [selectedCity, setSelectedCity] = useState<City | 'Tous'>('Tous');
  const [selectedType, setSelectedType] = useState<EventType | 'Tous'>('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchCity = selectedCity === 'Tous' || event.ville === selectedCity;
      const matchType = selectedType === 'Tous' || event.type === selectedType;
      const matchSearch = event.titre.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCity && matchType && matchSearch;
    });
  }, [events, selectedCity, selectedType, searchQuery]);

  return (
    <div className="py-12 md:py-20 px-4 md:px-8 max-w-[1600px] mx-auto min-h-screen">
      <header className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end border-b-[12px] border-black pb-12 gap-8 overflow-hidden">
        <div className="w-full lg:w-auto">
          <span className="text-[#FF5733] font-black uppercase text-xs tracking-[0.6em] mb-4 block">Agenda Culturel — Saison 2024</span>
          <h1 className="text-[14vw] lg:text-[140px] font-black brand-heading uppercase tracking-tighter leading-none whitespace-nowrap">
            AGENDA
          </h1>
        </div>
        <div className="text-left md:text-right shrink-0">
          <p className="text-xl font-bold text-gray-400 uppercase tracking-widest leading-none">
            Ne manquez<br />aucun battement.
          </p>
        </div>
      </header>

      {/* Filters Wide Section - Design plus épuré */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-20">
        <div className="lg:col-span-6">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#FF5733] transition-colors" size={24} />
            <input
              type="text"
              placeholder="RECHERCHER UN ÉVÉNEMENT..."
              className="w-full border-2 border-black/10 focus:border-black pl-16 pr-6 py-6 font-black text-lg uppercase focus:outline-none bg-white transition-all placeholder:text-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          <select
            className="w-full border-2 border-black/10 focus:border-black px-6 py-6 font-black text-sm uppercase focus:outline-none bg-white cursor-pointer transition-all"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value as any)}
          >
            <option value="Tous">VILLES (TOUTES)</option>
            {Object.values(City).sort().map(city => <option key={city} value={city}>{city.toUpperCase()}</option>)}
          </select>
        </div>

        <div className="lg:col-span-3">
          <select
            className="w-full border-2 border-black/10 focus:border-black px-6 py-6 font-black text-sm uppercase focus:outline-none bg-white cursor-pointer transition-all"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as any)}
          >
            <option value="Tous">CATÉGORIES (TOUTES)</option>
            {Object.values(EventType).sort().map(type => <option key={type} value={type}>{type.toUpperCase()}</option>)}
          </select>
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {filteredEvents.map((event) => (
            <div key={event.id}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-40 text-center border-2 border-dashed border-black/10">
          <h3 className="text-4xl md:text-5xl font-black brand-heading text-gray-200 uppercase italic">Aucun résultat.</h3>
        </div>
      )}
    </div>
  );
};

export default Agenda;
