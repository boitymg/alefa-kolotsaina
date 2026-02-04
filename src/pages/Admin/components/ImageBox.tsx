
import React from 'react';
import { Upload } from 'lucide-react';

interface ImageBoxProps {
    label: string;
    current: string;
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageBox: React.FC<ImageBoxProps> = ({ label, current, onUpload }) => (
    <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</label>
        <div className="aspect-square border-2 border-black relative group overflow-hidden bg-gray-50">
            {current ? (
                <img src={current} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={label} />
            ) : (
                <div className="w-full h-full flex items-center justify-center italic text-gray-300">VIDE</div>
            )}
            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all">
                <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
                <Upload className="text-white" size={24} />
            </label>
        </div>
    </div>
);

export default ImageBox;
