
import React from 'react';
import { X } from 'lucide-react';

interface LoginFormProps {
    passwordInput: string;
    setPasswordInput: (val: string) => void;
    handleLogin: (e: React.FormEvent) => void;
    authError: boolean;
    onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
    passwordInput,
    setPasswordInput,
    handleLogin,
    authError,
    onClose
}) => {
    return (
        <div className="fixed inset-0 z-[2000] bg-black flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-[#FDFCF8] border-8 border-[#FF5733] p-10 shadow-2xl relative">
                <button onClick={onClose} className="absolute -top-4 -right-4 bg-black text-white p-2 border-2 border-white">
                    <X size={20} />
                </button>
                <div className="text-center mb-8">
                    <span className="brand-script text-4xl text-[#FF5733] block">Alefa</span>
                    <h2 className="brand-heading text-2xl uppercase">Accès restreint</h2>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                    <input
                        type="password"
                        autoFocus
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        className={`w-full border-4 ${authError ? 'border-red-500' : 'border-black'} p-4 font-black text-xl text-center outline-none`}
                        placeholder="PASSWORD"
                    />
                    <button type="submit" className="w-full bg-black text-white py-5 font-black uppercase text-xs tracking-widest hover:bg-[#FF5733] transition-all">
                        S'IDENTIFIER
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
