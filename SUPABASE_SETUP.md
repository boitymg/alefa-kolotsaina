# Configuration Supabase pour Alefa Kolotsaina

L'intégration est prête. Voici comment l'activer :

## 1. Base de données
Copiez le contenu du fichier `supabase_schema.sql` (situé à la racine) et exécutez-le dans l'onglet **SQL Editor** de votre projet Supabase.

## 2. Variables d'environnement
Modifiez (ou créez) le fichier `.env.local` à la racine du projet et ajoutez vos clés :

```bash
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_cle_anon_publique
```

## 3. Lancer le site
Redémarrez le serveur :
1. Arrêtez le serveur actuel (`CTRL+C`)
2. Lancez `npm run dev`

L'application détectera automatiquement les clés et basculera en mode "Connecté".
Si les clés sont absentes, elle continuera à fonctionner en mode "Local".
