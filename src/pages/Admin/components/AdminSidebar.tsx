
import React from 'react';
import { Settings, Calendar, Users, Video, Newspaper, Menu, Save } from 'lucide-react';

interface AdminSidebarProps {
    activeTab: string;
    setActiveTab: (tab: any) => void;
    onLogout: () => void;
}

const TABS = [
    { id: 'settings', label: 'Général', icon: Settings },
    { id: 'menu', label: 'Navigation', icon: Menu },
    { id: 'events', label: 'Agenda', icon: Calendar },
    { id: 'artists', label: 'Artistes', icon: Users },
    { id: 'videos', label: 'Vidéos', icon: Video },
    { id: 'articles', label: 'Magazine', icon: Newspaper },
    { id: 'database', label: 'Données / Sync', icon: Save },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
    return (
        <div className="w-full md:w-64 bg-black text-white p-6 flex flex-col shrink-0 border-r-[12px] border-[#FF5733]">
            <div className="mb-10">
                <span className="brand-script text-3xl text-[#FF5733]">Alefa</span>
                <h2 className="brand-heading text-xl">CONSOLE V1</h2>
            </div>
            <nav className="flex-grow space-y-1">
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-4 px-4 py-3 font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === tab.id ? 'bg-[#FF5733] text-white' : 'hover:bg-white/10 text-gray-400'}`}
                    >
                        <tab.icon size={16} /> {tab.label}
                    </button>
                ))}
            </nav>
            <button
                onClick={onLogout}
                className="mt-auto border-2 border-red-500 text-red-500 py-3 font-black uppercase text-[10px] tracking-widest hover:bg-red-500 hover:text-white transition-all"
            >
                DÉCONNEXION
            </button>
        </div>
    );
};

export default AdminSidebar;
