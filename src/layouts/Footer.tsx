
import React from 'react';
import { Instagram, Facebook, Youtube, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const Footer: React.FC = () => {
  const { settings, menus } = useAdmin();

  return (
    <footer className="bg-[#0A0A0A] text-white pt-32 pb-12 px-4 md:px-8 border-t-[12px] border-[#FF5733]">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <div className="flex items-center mb-12">
            <div className="flex flex-col -ml-2">
              <span className="brand-script text-7xl leading-[0.5] mb-4 transform -rotate-3 text-white">Alefa</span>
              <span className="brand-heading text-3xl tracking-[0.2em] text-[#FF5733]">KOLOTSAINA</span>
            </div>
          </div>
          <p className="text-2xl text-gray-400 max-w-lg font-bold leading-relaxed mb-12">
            {settings.footerText}
          </p>
          <div className="flex space-x-10">
            <a href="https://www.instagram.com/alefakolotsaina" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF5733] transition-colors"><Instagram size={32} /></a>
            <a href="https://web.facebook.com/alefakolotsaina" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF5733] transition-colors"><Facebook size={32} /></a>
            <a href="#" className="hover:text-[#FF5733] transition-colors"><Youtube size={32} /></a>
            <a href="mailto:contact@alefa.mg" className="hover:text-[#FF5733] transition-colors"><Mail size={32} /></a>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <h3 className="text-[10px] uppercase tracking-[0.5em] text-[#FF5733] font-black mb-12">Navigation Rapide</h3>
          <ul className="space-y-6">
            {menus.map(item => (
              <li key={item.id}>
                <Link to={item.path} className="text-2xl font-black uppercase hover:text-[#FF5733] transition-colors tracking-widest leading-none">{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h3 className="text-[10px] uppercase tracking-[0.5em] text-[#FF5733] font-black mb-12">La Lettre AK</h3>
          <p className="text-base text-gray-500 font-bold mb-8 uppercase tracking-wider leading-tight">Recevez les dossiers confidentiels et l'agenda sélectif chaque semaine.</p>
          <form className="flex border-4 border-white/10 p-2 bg-[#111]">
            <input 
              type="email" 
              placeholder="VOTRE@EMAIL.COM" 
              className="bg-transparent p-4 w-full font-black text-xs uppercase focus:outline-none transition-colors"
            />
            <button className="bg-white text-[#0A0A0A] px-10 font-black uppercase text-[11px] tracking-widest hover:bg-[#FF5733] hover:text-white transition-all">
              S'INSCRIRE
            </button>
          </form>
        </div>
      </div>
      
      <div className="max-w-[1600px] mx-auto mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
        <p>© {new Date().getFullYear()} ALEFA KOLOTSAINA — ARCHIVES BRUTES — ANTANANARIVO.</p>
        <div className="mt-6 md:mt-0 flex space-x-12">
           <a href="#" className="hover:text-white">Mentions Légales</a>
           <a href="#" className="hover:text-white">Confidentialité</a>
           <a href="#" className="hover:text-white">Collaborer</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
