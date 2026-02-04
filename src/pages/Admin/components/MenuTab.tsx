
import React from 'react';

interface MenuItem {
    id: string;
    name: string;
    path: string;
}

interface MenuTabProps {
    localMenus: MenuItem[];
    setLocalMenus: (menus: MenuItem[]) => void;
}

const MenuTab: React.FC<MenuTabProps> = ({ localMenus, setLocalMenus }) => {
    const addMenu = () => {
        setLocalMenus([...localMenus, { id: Date.now().toString(), name: 'NOUVEAU', path: '/' }]);
    };

    const updateMenu = (idx: number, updates: Partial<MenuItem>) => {
        const next = [...localMenus];
        next[idx] = { ...next[idx], ...updates };
        setLocalMenus(next);
    };

    const removeMenu = (idx: number) => {
        setLocalMenus(localMenus.filter((_, i) => i !== idx));
    };

    return (
        <div className="space-y-12 bg-white border-4 border-black p-10 shadow-xl">
            <div className="space-y-6">
                <h3 className="brand-heading text-2xl uppercase">Éléments de navigation</h3>
                {localMenus.map((menu, idx) => (
                    <div key={menu.id} className="flex gap-4 items-center border-b border-black/5 pb-4 last:border-0">
                        <input
                            className="flex-grow border-2 border-black p-3 font-black uppercase text-[10px] outline-none"
                            value={menu.name}
                            onChange={e => updateMenu(idx, { name: e.target.value })}
                            placeholder="NOM"
                        />
                        <input
                            className="flex-grow border-2 border-black p-3 font-bold text-xs outline-none"
                            value={menu.path}
                            onChange={e => updateMenu(idx, { path: e.target.value })}
                            placeholder="CHEMIN (EX: /agenda)"
                        />
                        <button
                            onClick={() => removeMenu(idx)}
                            className="text-red-600 font-black text-[10px] uppercase underline"
                        >
                            SUPPRIMER
                        </button>
                    </div>
                ))}
                <button
                    onClick={addMenu}
                    className="bg-black text-white px-8 py-4 font-black uppercase text-xs tracking-widest hover:bg-[#FF5733] transition-all"
                >
                    + AJOUTER UN LIEN
                </button>
            </div>
        </div>
    );
};

export default MenuTab;
