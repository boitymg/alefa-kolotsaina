
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Event, Artist, Video, Article, SiteSettings } from '../types';
import { MOCK_EVENTS, MOCK_ARTISTS, MOCK_VIDEOS, MOCK_ARTICLES } from '../utils/constants';

interface MenuItem {
  id: string;
  name: string;
  path: string;
}

interface AdminContextType {
  events: Event[];
  artists: Artist[];
  videos: Video[];
  articles: Article[];
  menus: MenuItem[];
  settings: SiteSettings;
  isLoading: boolean;
  updateEvents: (events: Event[]) => void;
  updateArtists: (artists: Artist[]) => void;
  updateVideos: (videos: Video[]) => void;
  updateArticles: (articles: Article[]) => void;
  updateMenus: (menus: MenuItem[]) => void;
  updateSettings: (settings: SiteSettings) => void;
  exportData: () => string;
  importData: (json: string) => boolean;
  clearAllData: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const STORAGE_KEY = 'ak_production_data_v1';

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  // State unique pour une synchronisation atomique
  const [appData, setAppData] = useState<{
    events: Event[];
    artists: Artist[];
    videos: Video[];
    articles: Article[];
    menus: MenuItem[];
    settings: SiteSettings;
  }>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
    return {
      events: MOCK_EVENTS,
      artists: MOCK_ARTISTS,
      videos: MOCK_VIDEOS,
      articles: MOCK_ARTICLES,
      menus: [
        { id: '1', name: 'Agenda', path: '/agenda' },
        { id: '2', name: 'Magazine', path: '/magazine' },
        { id: '3', name: 'Vidéos', path: '/videos' },
        { id: '4', name: 'Artistes', path: '/artistes' },
        { id: '5', name: 'Collaborer', path: '/collaborer' },
      ],
      settings: {
        siteName: "Alefa Kolotsaina",
        metaDescription: "Le média culturel malgache haut de gamme, humain et authentique.",
        heroTitle: "L'ESSENTIEL.",
        heroSubtitle: "Le pouls de la Grande Île",
        footerText: "Le média qui capture l'âme et l'énergie de la culture malgache. Brut, sans filtre, authentique.",
        ogImage: "",
        tribuneTitle: "TRIBUNE LIBRE",
        tribuneText: "\"UN MÉDIA N'EST RIEN SANS SES LECTEURS.\" PARTICIPEZ AU DÉBAT CULTUREL MALGACHE.",
        tribuneButtonText: "ÉCRIRE POUR ALEFA",
        redacTitle: "Le Mot de la Rédac'",
        redacText: "\"Nous croyons fermement que la culture n'est pas un luxe, mais une nécessité brute.\"",
        redacSignature: "LA RÉDACTION"
      }
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    document.title = `${appData.settings.siteName} — Gazette Culturelle`;
    setIsLoading(false);
  }, [appData]);

  const updateSettings = (settings: SiteSettings) => setAppData(prev => ({ ...prev, settings }));
  const updateMenus = (menus: MenuItem[]) => setAppData(prev => ({ ...prev, menus }));
  const updateEvents = (events: Event[]) => setAppData(prev => ({ ...prev, events }));
  const updateArtists = (artists: Artist[]) => setAppData(prev => ({ ...prev, artists }));
  const updateVideos = (videos: Video[]) => setAppData(prev => ({ ...prev, videos }));
  const updateArticles = (articles: Article[]) => setAppData(prev => ({ ...prev, articles }));

  const exportData = useCallback(() => {
    return JSON.stringify(appData, null, 2);
  }, [appData]);

  const importData = useCallback((json: string) => {
    try {
      const parsed = JSON.parse(json);
      // Basic validation
      if (parsed.settings && parsed.events) {
        setAppData(parsed);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }, []);

  const clearAllData = () => {
    if (confirm("Action irréversible : Réinitialiser toutes les données ?")) {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  };

  return (
    <AdminContext.Provider value={{
      ...appData,
      isLoading,
      updateEvents,
      updateArtists,
      updateVideos,
      updateArticles,
      updateMenus,
      updateSettings,
      exportData,
      importData,
      clearAllData
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};
