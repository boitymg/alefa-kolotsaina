# 🔍 DIAGNOSTIC SUPABASE - GUIDE DE DÉPANNAGE

## Problème : Les modifications ne se synchronisent pas

### ÉTAPE 1 : Vérifier la configuration locale

1. **Ouvrez la console du navigateur** (F12)
2. **Allez dans l'onglet Console**
3. **Cliquez sur "PUBLIER LES MODIFS"**
4. **Regardez les messages** :

#### ✅ SI VOUS VOYEZ :
```
🔄 Starting sync to Supabase...
📊 Data to sync: { events: X, artists: Y, ... }
✅ Supabase is configured. Starting sync...
📝 Syncing settings...
✅ Settings synced
...
🎉 ALL DATA SYNCED TO SUPABASE SUCCESSFULLY!
```
**→ La synchronisation FONCTIONNE en local !**
**→ Le problème est sur VERCEL (voir Étape 3)**

#### ❌ SI VOUS VOYEZ :
```
⚠️ Supabase NOT configured. Saving to localStorage only.
```
**→ Les clés Supabase ne sont PAS chargées !**
**→ Suivez l'Étape 2**

#### ❌ SI VOUS VOYEZ :
```
❌ Supabase sync failed: [erreur]
```
**→ Il y a un problème de connexion ou de permissions**
**→ Lisez l'erreur et suivez l'Étape 4**

---

### ÉTAPE 2 : Vérifier le fichier .env.local

1. Ouvrez le fichier `.env.local` à la racine du projet
2. Vérifiez qu'il contient EXACTEMENT :
```
VITE_SUPABASE_URL=https://tixdwaczshbfdocnskqz.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_81bnY2rX8boZra3gIo0cPw_41IvyT1R
```

3. **IMPORTANT** : Après toute modification de `.env.local` :
   - Arrêtez le serveur (`CTRL+C`)
   - Relancez `npm run dev`

---

### ÉTAPE 3 : Vérifier la configuration VERCEL

**C'EST ICI QUE LE PROBLÈME SE TROUVE SOUVENT !**

1. Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Cliquez sur votre projet `alefa-kolotsaina`
3. Allez dans **Settings** → **Environment Variables**
4. Vérifiez que vous avez EXACTEMENT ces 2 variables :

```
VITE_SUPABASE_URL = https://tixdwaczshbfdocnskqz.supabase.co
VITE_SUPABASE_ANON_KEY = sb_publishable_81bnY2rX8boZra3gIo0cPw_41IvyT1R
```

5. **Si elles n'existent pas** : Ajoutez-les !
6. **Si elles existent** : Vérifiez qu'il n'y a PAS d'espaces avant/après
7. **Après modification** : Allez dans **Deployments** → Cliquez sur les 3 points → **Redeploy**

---

### ÉTAPE 4 : Vérifier les permissions Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Ouvrez votre projet
3. Allez dans **SQL Editor**
4. Exécutez cette requête pour vérifier les données :

```sql
SELECT COUNT(*) as total FROM events;
SELECT COUNT(*) as total FROM artists;
SELECT COUNT(*) as total FROM videos;
```

Si les compteurs sont à 0 alors que vous avez ajouté du contenu → Les données ne sont PAS synchronisées.

5. Vérifiez les **RLS Policies** :
   - Allez dans **Authentication** → **Policies**
   - Assurez-vous que les policies "Public Write" existent pour toutes les tables

---

### ÉTAPE 5 : Test de synchronisation manuelle

1. Ouvrez la console du navigateur (F12)
2. Collez ce code dans la console :

```javascript
console.log("VITE_SUPABASE_URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("VITE_SUPABASE_ANON_KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY);
```

3. Si vous voyez `undefined` → Les variables ne sont PAS chargées
4. Si vous voyez les valeurs → Les variables SONT chargées

---

### ÉTAPE 6 : Images en Base64

**IMPORTANT** : Les images sont converties en Base64 et stockées DIRECTEMENT dans Supabase.

- ✅ **Avantage** : Pas besoin de stockage séparé
- ⚠️ **Limite** : Les images très lourdes peuvent ralentir la synchronisation

**Si les images ne passent pas** :
1. Utilisez des images < 500 KB
2. Le système les compresse automatiquement à 1000px de largeur

---

## 🆘 CHECKLIST RAPIDE

- [ ] `.env.local` existe et contient les bonnes clés
- [ ] Serveur redémarré après modification de `.env.local`
- [ ] Variables d'environnement ajoutées sur Vercel
- [ ] Vercel redéployé après ajout des variables
- [ ] Console du navigateur affiche "🎉 ALL DATA SYNCED"
- [ ] Données visibles dans Supabase SQL Editor

---

## 📞 CONTACT

Si le problème persiste après toutes ces vérifications, envoyez-moi :
1. Une capture d'écran de la console (F12) après avoir cliqué sur "PUBLIER"
2. Une capture d'écran de vos variables Vercel
3. Le résultat de la requête SQL dans Supabase
