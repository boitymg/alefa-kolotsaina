
import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

const Collaborer: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="py-40 px-4 text-center max-w-2xl mx-auto">
        <CheckCircle2 size={80} className="mx-auto text-[#FF5733] mb-8" />
        <h2 className="text-5xl font-black brand-font mb-6">TON MESSAGE A ÉTÉ REÇU !</h2>
        <p className="text-xl font-bold uppercase tracking-widest text-gray-500 mb-12">
          L'équipe d'Alefa Kolotsaina va t'écrire très rapidement. Ensemble, faisons bouger les lignes.
        </p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="bg-[#0A0A0A] text-white px-12 py-5 font-black uppercase text-sm border-2 border-[#0A0A0A] hover:bg-transparent hover:text-[#0A0A0A] transition-all"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <div className="py-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      <header className="mb-16 border-b-8 border-[#0A0A0A] pb-8">
        <h1 className="text-5xl md:text-7xl font-black brand-heading mb-4">COLLABORER</h1>
        <p className="text-lg font-bold text-gray-500 uppercase tracking-widest">Un projet ? Un événement ? Une idée folle ?</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-20">
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-black brand-font mb-8">POURQUOI NOUS CONTACTER ?</h2>
          <div className="space-y-10">
            <div>
              <h3 className="text-xl font-black uppercase text-[#FF5733] mb-2">PROPOSER UN ÉVÉNEMENT</h3>
              <p className="text-lg font-bold text-gray-600">Vous organisez un concert ou une expo ? On s'occupe de la visibilité auprès de la bonne audience.</p>
            </div>
            <div>
              <h3 className="text-xl font-black uppercase text-[#FF5733] mb-2">PRODUCTION VIDÉO</h3>
              <p className="text-lg font-bold text-gray-600">Besoin d'un Aftermovie brutal ou d'une session live Boiler Room ? Notre équipe créative est prête.</p>
            </div>
            <div>
              <h3 className="text-xl font-black uppercase text-[#FF5733] mb-2">PARTENARIAT</h3>
              <p className="text-lg font-bold text-gray-600">Vous êtes une marque qui partage nos valeurs d'authenticité et d'excellence ? Discutons.</p>
            </div>
          </div>
          
          <div className="mt-20 p-8 border-2 border-dashed border-[#0A0A0A] bg-white">
            <h4 className="font-black uppercase mb-4">Urgence ?</h4>
            <p className="font-bold text-2xl">+261 34 00 000 00</p>
            <p className="text-xs uppercase tracking-widest text-gray-500 mt-2">WhatsApp Disponible 24/7</p>
          </div>
        </div>

        <div className="lg:w-1/2 bg-[#0A0A0A] p-10 text-white">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-3 text-[#FF5733]">Ton Nom</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-transparent border-b-2 border-white py-2 text-xl font-bold focus:outline-none focus:border-[#FF5733] transition-colors"
                  placeholder="Jean Rakoto"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-3 text-[#FF5733]">Ton Email</label>
                <input 
                  required
                  type="email" 
                  className="w-full bg-transparent border-b-2 border-white py-2 text-xl font-bold focus:outline-none focus:border-[#FF5733] transition-colors"
                  placeholder="jean@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest mb-3 text-[#FF5733]">Type de projet</label>
              <select className="w-full bg-[#111] border-2 border-white p-4 font-bold focus:outline-none focus:border-[#FF5733] transition-colors">
                <option>Événement à promouvoir</option>
                <option>Production Vidéo / Live</option>
                <option>Partenariat Média</option>
                <option>Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest mb-3 text-[#FF5733]">Ton message</label>
              <textarea 
                required
                rows={5}
                className="w-full bg-transparent border-2 border-white p-4 text-xl font-bold focus:outline-none focus:border-[#FF5733] transition-colors"
                placeholder="Raconte-nous tout..."
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-white text-[#0A0A0A] py-6 font-black uppercase text-lg flex items-center justify-center space-x-4 hover:bg-[#FF5733] hover:text-white transition-all"
            >
              <span>Envoyer le dossier</span>
              <Send size={24} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Collaborer;
