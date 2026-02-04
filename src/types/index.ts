
export enum EventType {
  CONCERT = 'Concert',
  EXPO = 'Expo',
  THEATRE = 'Théâtre',
  FESTIVAL = 'Festival',
  CLUBBING = 'Clubbing',
  CINEMA = 'Cinéma',
  WORKSHOP = 'Workshop',
  DANSE = 'Danse',
  GASTRONOMIE = 'Gastronomie',
  MODE = 'Défilé de Mode',
  LITTERATURE = 'Littérature',
  CONFERENCE = 'Conférence'
}

export enum City {
  ANTANANARIVO = 'Antananarivo',
  ANTSIRABE = 'Antsirabe',
  MAHAJANGA = 'Mahajanga',
  TOAMASINA = 'Toamasina',
  FIANARANTSOA = 'Fianarantsoa',
  TOLIARA = 'Toliara',
  ANTSIRANANA = 'Antsiranana (Diego)',
  SAMBAVA = 'Sambava',
  TAOLAGNARO = 'Taolagnaro (Fort-Dauphin)',
  MORONDAVA = 'Morondava',
  NOSY_BE = 'Nosy Be',
  SAINTE_MARIE = 'Sainte Marie',
  AMBOSITRA = 'Ambositra',
  MANAKARA = 'Manakara',
  AMBATONDRAZAKA = 'AmBATondrazaka',
  ANTALAHA = 'Antalaha',
  MAROANTSETRA = 'Maroantsetra',
  IHOROMBE = 'Ihosy',
  MAEVATANANA = 'Maevatanana'
}

export enum VideoCategory {
  LIVES = 'Lives',
  INTERVIEWS = 'Interviews',
  CLIPS = 'Clips',
  MINI_DOCS = 'Mini-docs'
}

export enum MagazineCategory {
  MODE = 'Mode',
  MUSIQUE = 'Musique',
  ART = 'Art Visuel',
  SOCIETE = 'Société',
  CINEMA = 'Cinéma',
  LITTERATURE = 'Littérature',
  GASTRONOMIE = 'Gastronomie',
  VOYAGE = 'Voyage',
  DESIGN = 'Design',
  ARCHITECTURE = 'Architecture',
  HISTOIRE = 'Histoire',
  ENVIRONNEMENT = 'Environnement',
  PHOTOGRAPHIE = 'Photographie',
  THEATRE = 'Théâtre',
  DANSE = 'Danse',
  PATRIMOINE = 'Patrimoine',
  OPINION = 'Opinion / Tribune'
}

export interface ArchiveItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  date: string;
}

export interface Event {
  id: string;
  titre: string;
  slug: string;
  date: string;
  heure: string;
  ville: City;
  type: EventType;
  affiche: string;
  prix: string; 
  whatsapp: string; 
  socialLink: string; 
  valide: boolean;
  description?: string; // Détails de l'événement
}

export interface Artist {
  id: string;
  nom: string;
  discipline: string;
  ville: City;
  photo: string;
  bio: string;
  extendedBio?: string; // Biographie longue / Storytelling
  instagram?: string;
  facebook?: string;
  archives?: ArchiveItem[];
}

export interface Video {
  id: string;
  titre: string;
  categorie: VideoCategory;
  url: string;
  thumbnail: string;
}

export interface Article {
  id: string;
  titre: string;
  categorie: MagazineCategory;
  cover: string;
  excerpt: string;
  content?: string; 
  date: string;
  author: string;
  photoCredit?: string; // Crédit photos
}

export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  footerText: string;
  siteName: string;
  metaDescription: string;
  ogImage: string;
  // Nouveau: Contrôle des panneaux éditoriaux
  tribuneTitle: string;
  tribuneText: string;
  tribuneButtonText: string;
  redacTitle: string;
  redacText: string;
  redacSignature: string;
}
