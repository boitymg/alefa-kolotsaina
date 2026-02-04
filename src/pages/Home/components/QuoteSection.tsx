
import React from 'react';
import { Quote } from 'lucide-react';

interface QuoteSectionProps {
    title: string;
    text: string;
    signature: string;
}

const QuoteSection: React.FC<QuoteSectionProps> = ({ title, text, signature }) => {
    return (
        <div className="bg-white border-[10px] border-black p-10 mb-16 shadow-2xl relative">
            <Quote size={48} className="text-[#FF5733] opacity-10 absolute -top-4 -left-4" />
            <span className="brand-script text-4xl mb-6 block text-[#FF5733]">{title}</span>
            <p className="text-lg font-bold italic leading-relaxed text-gray-800 mb-10 border-l-8 border-[#FF5733] pl-8">
                {text}
            </p>
            <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-black opacity-20"></div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">{signature}</span>
            </div>
        </div>
    );
};

export default QuoteSection;
