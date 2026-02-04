
/**
 * Extrait l'ID de la vidéo YouTube et retourne l'URL de la miniature.
 */
export const getYouTubeThumbnail = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
        const videoId = match[2];
        // hqdefault est plus fiable que maxresdefault qui peut manquer sur certaines vidéos
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }

    return null;
};

/**
 * Nettoie une URL YouTube pour en faire un lien embed propre.
 */
export const getYouTubeEmbedUrl = (url: string): string => {
    if (!url) return '';
    if (url.includes('embed')) return url;

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
    }

    return url;
};
