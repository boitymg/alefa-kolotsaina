-- 🔍 SCRIPT DE VÉRIFICATION ET CORRECTION DU SCHÉMA SUPABASE
-- Exécutez ce script dans votre Supabase SQL Editor pour vérifier et corriger les colonnes
-- 1. Vérifier les colonnes existantes de la table events
SELECT column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'events'
ORDER BY ordinal_position;
-- Si la table n'existe pas ou si les colonnes sont incorrectes, supprimez-la et recréez-la :
DROP TABLE IF EXISTS events CASCADE;
-- 2. Créer la table events avec TOUTES les colonnes nécessaires
CREATE TABLE events (
    id text PRIMARY KEY,
    titre text NOT NULL,
    slug text,
    date text,
    heure text,
    ville text,
    type text,
    affiche text,
    -- ⚠️ IMPORTANT : Cette colonne doit exister
    prix text,
    whatsapp text,
    social_link text,
    -- ⚠️ En snake_case dans la DB
    valide boolean DEFAULT true,
    description text,
    created_at timestamp with time zone DEFAULT now()
);
-- 3. Activer RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
-- 4. Créer les policies
CREATE POLICY "Public Read Events" ON events FOR
SELECT USING (true);
CREATE POLICY "Public Write Events" ON events FOR
INSERT WITH CHECK (true);
CREATE POLICY "Public Update Events" ON events FOR
UPDATE USING (true);
CREATE POLICY "Public Delete Events" ON events FOR DELETE USING (true);
-- 5. Vérifier que tout est OK
SELECT column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'events'
ORDER BY ordinal_position;