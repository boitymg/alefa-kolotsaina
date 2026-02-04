
import React from 'react';

interface HeroSectionProps {
    title: string;
    subtitle: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-16 md:py-24 mb-20">
            <span className="text-[#FF5733] font-black uppercase text-xs tracking-[0.5em] mb-6">
                Culture / Musique / Vie Locale
            </span>
            <h1 className="brand-heading text-[clamp(3.5rem,10vw,140px)] leading-[0.9] mb-12 text-center uppercase text-balance w-full px-4 break-words">
                {title}
            </h1>
            <div className="w-full flex items-center gap-10 overflow-hidden">
                <div className="flex-grow h-px bg-black opacity-20"></div>
                <span className="brand-script text-3xl md:text-5xl shrink-0 -rotate-3">{subtitle}</span>
                <div className="flex-grow h-px bg-black opacity-20"></div>
            </div>
        </div>
    );
};

export default HeroSection;
