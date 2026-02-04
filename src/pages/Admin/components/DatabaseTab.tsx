
import React from 'react';
import { Download, Upload, Trash2 } from 'lucide-react';

interface DatabaseTabProps {
    handleExport: () => void;
    handleImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
    clearAllData: () => void;
}

const DatabaseTab: React.FC<DatabaseTabProps> = ({ handleExport, handleImport, clearAllData }) => {
    return (
        <div className="space-y-12 bg-white border-4 border-black p-10">
            <div>
                <h3 className="brand-heading text-2xl mb-4">Portabilité & Sauvegarde</h3>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-8">
                    Le site fonctionne en local. Exportez vos données pour les conserver ou les transférer vers un autre déploiement.
                </p>
                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 bg-black text-white px-8 py-4 font-black uppercase text-xs tracking-widest hover:bg-[#FF5733] transition-all"
                    >
                        <Download size={18} /> EXPORTER LE JSON
                    </button>
                    <label className="flex items-center gap-2 border-4 border-black px-8 py-4 font-black uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-all cursor-pointer">
                        <Upload size={18} /> IMPORTER UN JSON
                        <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                    </label>
                </div>
            </div>
            <div className="pt-8 border-t border-black/10">
                <h3 className="brand-heading text-2xl text-red-600 mb-4">Zone de danger</h3>
                <button
                    onClick={clearAllData}
                    className="flex items-center gap-2 text-red-600 border-2 border-red-600 px-6 py-3 font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all"
                >
                    <Trash2 size={16} /> RÉINITIALISER LE SITE (USINE)
                </button>
            </div>
        </div>
    );
};

export default DatabaseTab;
