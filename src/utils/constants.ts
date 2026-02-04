
import { City, EventType, Event, Artist, Video, VideoCategory, Article, MagazineCategory } from '../types';

export const COLORS = {
  BG: '#F8F8F8',
  BLACK: '#0A0A0A',
  ACCENT: '#FF5733'
};

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    titre: 'VAVY LIVE SESSIONS : JAZZ & SOUL',
    slug: 'vavy-live-sessions',
    date: '2024-05-15',
    heure: '20:00',
    ville: City.ANTANANARIVO,
    type: EventType.CONCERT,
    affiche: 'https://images.unsplash.com/photo-1501612722-298291f14281?auto=format&fit=crop&q=80&w=800',
    prix: '25.000 AR',
    whatsapp: '261340000001',
    socialLink: 'https://facebook.com',
    valide: true
  },
  {
    id: '2',
    titre: 'UNDERGROUND TANA : ELECTRO BATTLE',
    slug: 'underground-tana',
    date: '2024-05-18',
    heure: '22:00',
    ville: City.ANTANANARIVO,
    type: EventType.CLUBBING,
    affiche: 'https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?auto=format&fit=crop&q=80&w=800',
    prix: 'ENTRÉE LIBRE',
    whatsapp: '261340000002',
    socialLink: 'https://instagram.com',
    valide: true
  }
];

export const MOCK_ARTISTS: Artist[] = [
  {
    id: 'a1',
    nom: 'Kristel',
    discipline: 'Rock / Punk Alternative',
    ville: City.ANTANANARIVO,
    photo: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800',
    bio: 'Le renouveau du rock malgache, Kristel impose un son brut et puissant qui résonne au-delà des frontières de la Grande Île.',
    instagram: 'https://instagram.com/kristel'
  }
];

export const MOCK_VIDEOS: Video[] = [
  {
    id: 'v1',
    titre: 'KRISTEL - LIVE @ BOILER ROOM',
    categorie: VideoCategory.LIVES,
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1514525253361-bee8718a74a2?auto=format&fit=crop&q=80&w=1280'
  }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'art1',
    titre: 'LA REVANCHE DU LAMBA : MODE ET IDENTITÉ',
    categorie: MagazineCategory.MODE,
    cover: 'https://images.unsplash.com/photo-1523381235312-3a1b78d59b10?auto=format&fit=crop&q=80&w=1200',
    excerpt: 'Comment les jeunes créateurs malgaches réinventent le textile traditionnel pour conquérir le monde avec une esthétique brute.',
    date: '12 Mai 2024',
    author: 'Tovo R.',
    photoCredit: 'Mamy R.'
  }
];
