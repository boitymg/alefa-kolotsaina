
import React from 'react';
import { Article, MagazineCategory } from '../../../types';
import ImageBox from './ImageBox';

interface ArticlesTabProps {
    localArticles: Article[];
    setLocalArticles: (articles: Article[]) => void;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => void;
}

const ArticlesTab: React.FC<ArticlesTabProps> = ({ localArticles, setLocalArticles, handleImageUpload }) => {
    const addArticle = () => {
        setLocalArticles([{
            id: Date.now().toString(),
            titre: 'TITRE ARTICLE',
            categorie: MagazineCategory.MUSIQUE,
            cover: '',
            excerpt: '',
            date: new Date().toLocaleDateString('fr-FR'),
            author: 'AK Redac'
        }, ...localArticles]);
    };

    const updateArticle = (idx: number, updates: Partial<Article>) => {
        const next = [...localArticles];
        next[idx] = { ...next[idx], ...updates };
        setLocalArticles(next);
    };

    const removeArticle = (id: string) => {
        setLocalArticles(localArticles.filter(a => a.id !== id));
    };

    return (
        <div className="space-y-12">
            <button
                onClick={addArticle}
                className="bg-black text-white px-8 py-4 font-black uppercase text-xs tracking-widest hover:bg-[#FF5733] transition-all"
            >
                + RÉDIGER ARTICLE
            </button>
            {localArticles.map((art, idx) => (
                <div key={art.id} className="bg-white border-4 border-black p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-lg">
                    <div className="lg:col-span-3">
                        <ImageBox
                            label="COUVERTURE"
                            current={art.cover}
                            onUpload={(e) => handleImageUpload(e, (b) => updateArticle(idx, { cover: b }))}
                        />
                    </div>
                    <div className="lg:col-span-9 space-y-4">
                        <input
                            className="w-full border-2 border-black p-4 font-black uppercase text-xl outline-none focus:border-[#FF5733]"
                            value={art.titre}
                            onChange={e => updateArticle(idx, { titre: e.target.value })}
                            placeholder="TITRE"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <select
                                className="p-3 border-2 border-black font-black uppercase text-[10px] outline-none"
                                value={art.categorie}
                                onChange={e => updateArticle(idx, { categorie: e.target.value as any })}
                            >
                                {Object.values(MagazineCategory).map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <input
                                className="p-3 border-2 border-black font-bold text-xs outline-none"
                                value={art.author}
                                onChange={e => updateArticle(idx, { author: e.target.value })}
                                placeholder="AUTEUR"
                            />
                        </div>
                        <textarea
                            className="w-full border-2 border-black p-4 font-bold text-xs outline-none focus:border-[#FF5733]"
                            rows={3}
                            value={art.excerpt}
                            onChange={e => updateArticle(idx, { excerpt: e.target.value })}
                            placeholder="ACCROCHE"
                        />
                        <textarea
                            className="w-full border-2 border-black p-4 font-medium text-sm h-64 outline-none focus:border-[#FF5733]"
                            value={art.content || ''}
                            onChange={e => updateArticle(idx, { content: e.target.value })}
                            placeholder="CONTENU DE L'ARTICLE (TEXTE / MARKDOWN)"
                        />
                        <button
                            onClick={() => removeArticle(art.id)}
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

export default ArticlesTab;
