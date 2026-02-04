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

## 4. Déploiement Vercel (Production)
⚠️ **TRÈS IMPORTANT** : Pour que le site fonctionne en ligne, vous devez ajouter ces mêmes variables sur Vercel :

1. Allez dans votre projet sur [Vercel](https://vercel.com/dashboard).
2. Cliquez sur **Settings** > **Environment Variables**.
3. Ajoutez les variables suivantes (avec les mêmes valeurs que dans votre `.env.local`) :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Redéployez votre site (ou attendez le prochain push) pour que cela prenne effet.
