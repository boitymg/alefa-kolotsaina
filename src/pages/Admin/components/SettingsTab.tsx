
import React from 'react';
import { SiteSettings } from '../../../types';

interface SettingsTabProps {
    localSettings: SiteSettings;
    setLocalSettings: (settings: SiteSettings) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ localSettings, setLocalSettings }) => {
    return (
        <div className="space-y-12 bg-white border-4 border-black p-10 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">NOM DU SITE</label>
                    <input
                        type="text"
                        value={localSettings.siteName}
                        onChange={e => setLocalSettings({ ...localSettings, siteName: e.target.value })}
                        className="w-full border-2 border-black p-4 font-black text-lg outline-none focus:border-[#FF5733]"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">HERO TITLE</label>
                    <input
                        type="text"
                        value={localSettings.heroTitle}
                        onChange={e => setLocalSettings({ ...localSettings, heroTitle: e.target.value })}
                        className="w-full border-2 border-black p-4 font-black text-lg outline-none focus:border-[#FF5733]"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">HERO SUBTITLE</label>
                    <input
                        type="text"
                        value={localSettings.heroSubtitle}
                        onChange={e => setLocalSettings({ ...localSettings, heroSubtitle: e.target.value })}
                        className="w-full border-2 border-black p-4 font-black text-lg outline-none focus:border-[#FF5733]"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">DESCRIPTION SEO</label>
                    <textarea
                        value={localSettings.metaDescription}
                        onChange={e => setLocalSettings({ ...localSettings, metaDescription: e.target.value })}
                        className="w-full border-2 border-black p-4 font-bold text-sm h-32 outline-none focus:border-[#FF5733]"
                    />
                </div>
            </div>
            <div className="pt-8 border-t border-black/10 space-y-6">
                <h4 className="brand-heading text-xl text-[#FF5733]">Contenus de l'accueil</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">TITRE TRIBUNE</label>
                        <input
                            type="text"
                            value={localSettings.tribuneTitle}
                            onChange={e => setLocalSettings({ ...localSettings, tribuneTitle: e.target.value })}
                            className="w-full border-2 border-black p-4 font-black text-sm uppercase"
                        />
                        <textarea
                            value={localSettings.tribuneText}
                            onChange={e => setLocalSettings({ ...localSettings, tribuneText: e.target.value })}
                            className="w-full border-2 border-black p-4 font-bold text-xs h-24"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">MOT DE LA RÉDAC</label>
                        <input
                            type="text"
                            value={localSettings.redacTitle}
                            onChange={e => setLocalSettings({ ...localSettings, redacTitle: e.target.value })}
                            className="w-full border-2 border-black p-4 font-bold italic"
                        />
                        <textarea
                            value={localSettings.redacText}
                            onChange={e => setLocalSettings({ ...localSettings, redacText: e.target.value })}
                            className="w-full border-2 border-black p-4 font-medium text-xs italic h-32"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsTab;
