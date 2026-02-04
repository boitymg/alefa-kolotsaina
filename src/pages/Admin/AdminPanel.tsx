
import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { X, Save } from 'lucide-react';

// Sub-components
import LoginForm from './components/LoginForm';
import AdminSidebar from './components/AdminSidebar';
import SettingsTab from './components/SettingsTab';
import MenuTab from './components/MenuTab';
import EventsTab from './components/EventsTab';
import ArtistsTab from './components/ArtistsTab';
import VideosTab from './components/VideosTab';
import ArticlesTab from './components/ArticlesTab';
import DatabaseTab from './components/DatabaseTab';

const ADMIN_PASSWORD = "ALEFAK";

const AdminPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    events, artists, videos, articles, menus, settings,
    updateEvents, updateArtists, updateVideos, updateArticles, updateMenus, updateSettings, updateAllData, clearAllData, exportData, importData
  } = useAdmin();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'settings' | 'menu' | 'events' | 'artists' | 'videos' | 'articles' | 'database'>('settings');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // States locaux synchronisés
  const [localSettings, setLocalSettings] = useState(settings);
  const [localMenus, setLocalMenus] = useState(menus);
  const [localEvents, setLocalEvents] = useState(events);
  const [localArtists, setLocalArtists] = useState(artists);
  const [localVideos, setLocalVideos] = useState(videos);
  const [localArticles, setLocalArticles] = useState(articles);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      setAuthError(true);
    }
  };

  const handleSave = async () => {
    setSaveStatus("SYNCHRONISATION EN COURS...");
    try {
      await updateAllData({
        settings: localSettings,
        menus: localMenus,
        events: localEvents,
        artists: localArtists,
        videos: localVideos,
        articles: localArticles
      });
      setSaveStatus("SYNCHRONISATION TERMINÉE");
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      console.error("Save failed:", error);
      setSaveStatus("ERREUR DE SAUVEGARDE (!)");
      setTimeout(() => setSaveStatus(null), 5000);
    }
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alefa-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (importData(content)) {
          alert("Base de données importée avec succès ! Le site va redémarrer.");
          window.location.reload();
        } else {
          alert("Erreur : Fichier de données invalide.");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1000;
          let width = img.width;
          let height = img.height;
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          callback(canvas.toDataURL('image/jpeg', 0.75));
        };
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isAuthenticated) {
    return (
      <LoginForm
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
        handleLogin={handleLogin}
        authError={authError}
        onClose={onClose}
      />
    );
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'settings':
        return <SettingsTab localSettings={localSettings} setLocalSettings={setLocalSettings} />;
      case 'menu':
        return <MenuTab localMenus={localMenus} setLocalMenus={setLocalMenus} />;
      case 'events':
        return <EventsTab localEvents={localEvents} setLocalEvents={setLocalEvents} handleImageUpload={handleImageUpload} />;
      case 'artists':
        return <ArtistsTab localArtists={localArtists} setLocalArtists={setLocalArtists} handleImageUpload={handleImageUpload} />;
      case 'videos':
        return <VideosTab localVideos={localVideos} setLocalVideos={setLocalVideos} handleImageUpload={handleImageUpload} />;
      case 'articles':
        return <ArticlesTab localArticles={localArticles} setLocalArticles={setLocalArticles} handleImageUpload={handleImageUpload} />;
      case 'database':
        return <DatabaseTab handleExport={handleExport} handleImport={handleImport} clearAllData={clearAllData} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-[#FDFCF8] text-black flex flex-col md:flex-row overflow-hidden">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => setIsAuthenticated(false)} />

      <div className="flex-grow overflow-y-auto p-6 md:p-12 relative">
        {saveStatus && (
          <div className="fixed top-8 right-8 bg-[#FF5733] text-white p-6 font-black uppercase text-xs tracking-widest shadow-2xl border-2 border-black z-[2000] animate-bounce">
            {saveStatus}
          </div>
        )}

        <header className="flex justify-between items-center mb-12 border-b-4 border-black pb-8">
          <h2 className="text-4xl md:text-6xl font-black brand-heading uppercase">{activeTab}</h2>
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={saveStatus === "SYNCHRONISATION EN COURS..."}
              className={`bg-[#22C55E] text-white px-8 py-4 font-black uppercase text-xs tracking-widest transition-all ${saveStatus === "SYNCHRONISATION EN COURS..." ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black'}`}
            >
              {saveStatus === "SYNCHRONISATION EN COURS..." ? "ENVOI..." : "PUBLIER LES MODIFS"}
            </button>
            <button onClick={onClose} className="border-4 border-black p-4 hover:bg-black hover:text-white transition-all">
              <X size={20} />
            </button>
          </div>
        </header>

        <div className="max-w-5xl space-y-12 pb-32">
          {renderTab()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
