
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plus } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [today, setToday] = useState('');
  const location = useLocation();
  const { menus } = useAdmin();

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const formatted = now.toLocaleDateString('fr-FR', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });
      setToday(formatted.toUpperCase());
    };

    updateDate();
    const interval = setInterval(updateDate, 3600000);
    return () => clearInterval(interval);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="z-[100] bg-transparent">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-6 pb-2 border-b-[6px] border-[#0A0A0A]">
        <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-[0.2em] mb-4 border-b border-black/10 pb-2">
          <span className="w-1/3">Édition No. 042 / Antananarivo</span>
          <span className="hidden sm:block w-1/3 text-center border-x border-black/10 px-4">{today}</span>
          <div className="w-1/3 flex justify-end gap-4">
            <span className="text-[#FF5733]">MADAGASCAR TODAY</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-4">
          <Link to="/" className="flex items-center group shrink-0">
             <div className="flex flex-col items-center">
              <span className="brand-script text-5xl md:text-7xl leading-none -mb-3 md:-mb-5 transform -rotate-2 group-hover:rotate-0 transition-transform">Alefa</span>
              <span className="brand-heading text-xl md:text-4xl tracking-[0.1em] block">KOLOTSAINA</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-10">
            {menus.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                className={`text-[10px] font-black uppercase tracking-widest transition-all hover:text-[#FF5733] relative group ${
                  isActive(link.path) ? 'text-[#FF5733]' : 'text-[#0A0A0A]'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF5733] group-hover:w-full transition-all ${isActive(link.path) ? 'w-full' : ''}`}></span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center">
             <Link
                to="/collaborer"
                className="border-2 border-black px-5 py-2.5 font-black uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-all flex items-center gap-2"
              >
                <Plus size={14} />
                <span>Publier</span>
              </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 border-2 border-black">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[150] bg-[#FDFCF8] p-8 animate-in fade-in zoom-in duration-300">
          <div className="flex justify-between items-center mb-12 border-b-2 border-black pb-4">
            <span className="brand-heading text-2xl">Menu Principal</span>
            <button onClick={() => setIsOpen(false)}><X size={32} /></button>
          </div>
          <div className="flex flex-col space-y-8">
            {menus.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-5xl font-black uppercase tracking-tighter hover:text-[#FF5733] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/collaborer"
              onClick={() => setIsOpen(false)}
              className="mt-12 bg-black text-white p-6 font-black uppercase text-center tracking-widest text-xl"
            >
              Proposer un événement
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
