
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Event, Artist, Video, Article, SiteSettings } from '../types';
import { MOCK_EVENTS, MOCK_ARTISTS, MOCK_VIDEOS, MOCK_ARTICLES } from '../utils/constants';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';

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
  updateAllData: (data: any) => void;
  exportData: () => string;
  importData: (json: string) => boolean;
  clearAllData: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const STORAGE_KEY = 'ak_production_data_v1';

// Mappers for DB (snake_case) <-> App (camelCase)

const mapSettingsToDb = (s: SiteSettings) => ({
  site_name: s.siteName,
  meta_description: s.metaDescription,
  hero_title: s.heroTitle,
  hero_subtitle: s.heroSubtitle,
  footer_text: s.footerText,
  og_image: s.ogImage,
  tribune_title: s.tribuneTitle,
  tribune_text: s.tribuneText,
  tribune_button_text: s.tribuneButtonText,
  redac_title: s.redacTitle,
  redac_text: s.redacText,
  redac_signature: s.redacSignature
});

const mapSettingsFromDb = (db: any): SiteSettings => ({
  siteName: db.site_name,
  metaDescription: db.meta_description,
  heroTitle: db.hero_title,
  heroSubtitle: db.hero_subtitle,
  footerText: db.footer_text,
  ogImage: db.og_image,
  tribuneTitle: db.tribune_title,
  tribuneText: db.tribune_text,
  tribuneButtonText: db.tribune_button_text,
  redacTitle: db.redac_title,
  redacText: db.redac_text,
  redacSignature: db.redac_signature
});

const mapEventToDb = (e: Event) => ({ ...e, social_link: e.socialLink });
const mapEventFromDb = (db: any): Event => ({ ...db, socialLink: db.social_link });

const mapArtistToDb = (a: Artist) => ({ ...a, extended_bio: a.extendedBio });
const mapArtistFromDb = (db: any): Artist => ({ ...db, extendedBio: db.extended_bio });

const mapArticleToDb = (a: Article) => ({ ...a, photo_credit: a.photoCredit });
const mapArticleFromDb = (db: any): Article => ({ ...db, photoCredit: db.photo_credit });


export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [appData, setAppData] = useState<{
    events: Event[];
    artists: Artist[];
    videos: Video[];
    articles: Article[];
    menus: MenuItem[];
    settings: SiteSettings;
  }>(() => {
    // Initial local load (fallback or cache)
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
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

  // Fetch from Supabase on Mount
  useEffect(() => {
    const fetchSupabaseData = async () => {
      if (isSupabaseConfigured() && supabase) {
        setIsLoading(true);
        try {
          const [settingsRes, eventsRes, artistsRes, videosRes, articlesRes, menusRes] = await Promise.all([
            supabase.from('site_settings').select('*').single(),
            supabase.from('events').select('*'),
            supabase.from('artists').select('*'),
            supabase.from('videos').select('*'),
            supabase.from('articles').select('*'),
            supabase.from('menus').select('*')
          ]);

          if (settingsRes.data) {
            setAppData(prev => ({
              ...prev,
              settings: mapSettingsFromDb(settingsRes.data),
              events: eventsRes.data ? eventsRes.data.map(mapEventFromDb) : prev.events,
              artists: artistsRes.data ? artistsRes.data.map(mapArtistFromDb) : prev.artists,
              videos: videosRes.data || prev.videos,
              articles: articlesRes.data ? articlesRes.data.map(mapArticleFromDb) : prev.articles,
              menus: menusRes.data || prev.menus
            }));
          }
        } catch (error) {
          console.error("Supabase fetch error:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchSupabaseData();
  }, []);

  // Sync to LocalStorage (as cache/backup) whenever appData changes, but primarily relying on save for DB
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    document.title = `${appData.settings.siteName} — Gazette Culturelle`;
  }, [appData]);


  const updateSettings = (settings: SiteSettings) => setAppData(prev => ({ ...prev, settings }));
  const updateMenus = (menus: MenuItem[]) => setAppData(prev => ({ ...prev, menus }));
  const updateEvents = (events: Event[]) => setAppData(prev => ({ ...prev, events }));
  const updateArtists = (artists: Artist[]) => setAppData(prev => ({ ...prev, artists }));
  const updateVideos = (videos: Video[]) => setAppData(prev => ({ ...prev, videos }));
  const updateArticles = (articles: Article[]) => setAppData(prev => ({ ...prev, articles }));

  const updateAllData = async (data: typeof appData) => {
    setAppData(data);

    if (isSupabaseConfigured() && supabase) {
      try {
        // Atomic-like update (Delete All + Insert All for arrays to ensure sync)

        await supabase.from('site_settings').upsert({ id: 1, ...mapSettingsToDb(data.settings) });

        // Arrays: Strategy Delete All -> Insert All
        // Note: In a high concurrency app this is bad. For a single admin CMS it is robust.
        await supabase.from('events').delete().neq('id', 'x');
        if (data.events.length) await supabase.from('events').insert(data.events.map(mapEventToDb));

        await supabase.from('artists').delete().neq('id', 'x');
        if (data.artists.length) await supabase.from('artists').insert(data.artists.map(mapArtistToDb));

        await supabase.from('videos').delete().neq('id', 'x');
        if (data.videos.length) await supabase.from('videos').insert(data.videos);

        await supabase.from('articles').delete().neq('id', 'x');
        if (data.articles.length) await supabase.from('articles').insert(data.articles.map(mapArticleToDb));

        await supabase.from('menus').delete().neq('id', 'x');
        if (data.menus.length) await supabase.from('menus').insert(data.menus);

        console.log("Supabase synced successfully");
      } catch (e) {
        console.error("Supabase sync failed", e);
        alert("Erreur de synchronisation Supabase. Vérifiez votre connexion.");
      }
    }
  };

  const exportData = useCallback(() => JSON.stringify(appData, null, 2), [appData]);
  const importData = useCallback((json: string) => {
    try {
      const parsed = JSON.parse(json);
      if (parsed.settings && parsed.events) {
        setAppData(parsed);
        return true;
      }
      return false;
    } catch (e) { return false; }
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
      updateAllData,
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
