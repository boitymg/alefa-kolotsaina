
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { Article } from '../../../types';

interface MagazinePreviewProps {
    article: Article | null;
}

const MagazinePreview: React.FC<MagazinePreviewProps> = ({ article }) => {
    if (!article) {
        return (
            <div className="py-20 border-4 border-dashed border-black/10 flex items-center justify-center font-black uppercase text-gray-200">
                Rédaction en cours...
            </div>
        );
    }

    return (
        <Link to={`/magazine/${article.id}`} className="group block">
            <div className="relative aspect-video bg-white border-4 border-black p-3 mb-10 overflow-hidden shadow-xl">
                <img
                    src={article.cover}
                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                    alt={article.titre}
                />
                <div className="absolute top-8 left-8 bg-black text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest">À LA UNE</div>
            </div>
            <span className="text-[10px] font-black uppercase text-[#FF5733] mb-4 tracking-[0.4em] block">
                DOSSIER — {article.categorie}
            </span>
            <h3 className="text-[clamp(1rem,5vw,3rem)] lg:text-5xl font-black brand-heading mb-4 lg:mb-8 leading-[1] group-hover:text-[#FF5733] transition-colors uppercase whitespace-nowrap">
                {article.titre}
            </h3>
            <p className="text-xl font-bold text-gray-700 leading-tight mb-8 drop-cap line-clamp-3">
                {article.excerpt}
            </p>
            <div className="inline-flex items-center gap-4 font-black text-xs uppercase tracking-widest border-b-4 border-black pb-2 w-fit group-hover:border-[#FF5733] transition-all">
                Lire le dossier <BookOpen size={20} />
            </div>
        </Link>
    );
};

export default MagazinePreview;
