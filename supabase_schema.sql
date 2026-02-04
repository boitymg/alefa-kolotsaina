-- Run this in your Supabase SQL Editor
-- 1. Site Settings
create table if not exists site_settings (
    id integer primary key default 1,
    site_name text default 'Alefa Kolotsaina',
    meta_description text,
    hero_title text,
    hero_subtitle text,
    footer_text text,
    og_image text,
    tribune_title text,
    tribune_text text,
    tribune_button_text text,
    redac_title text,
    redac_text text,
    redac_signature text,
    constraint single_row check (id = 1)
);
-- 2. Menus
create table if not exists menus (
    id text primary key,
    name text not null,
    path text not null
);
-- 3. Events
create table if not exists events (
    id text primary key,
    titre text not null,
    slug text,
    date text,
    heure text,
    ville text,
    type text,
    affiche text,
    prix text,
    whatsapp text,
    social_link text,
    valide boolean default true,
    description text,
    created_at timestamp with time zone default now()
);
-- 4. Artists
create table if not exists artists (
    id text primary key,
    nom text not null,
    discipline text,
    ville text,
    photo text,
    bio text,
    extended_bio text,
    instagram text,
    facebook text,
    archives jsonb default '[]'::jsonb,
    created_at timestamp with time zone default now()
);
-- 5. Videos
create table if not exists videos (
    id text primary key,
    titre text not null,
    categorie text,
    url text,
    thumbnail text,
    created_at timestamp with time zone default now()
);
-- 6. Articles
create table if not exists articles (
    id text primary key,
    titre text not null,
    categorie text,
    cover text,
    excerpt text,
    content text,
    date text,
    author text,
    photo_credit text,
    created_at timestamp with time zone default now()
);
-- 7. Enable RLS (Row Level Security) - Optional but recommended
alter table site_settings enable row level security;
alter table menus enable row level security;
alter table events enable row level security;
alter table artists enable row level security;
alter table videos enable row level security;
alter table articles enable row level security;
-- 8. Create Policies (Allow Public Read/Write for simplicity as requested, 
-- but normally you should only restrict Write to authenticated users)
-- READ
create policy "Public Read Settings" on site_settings for
select using (true);
create policy "Public Read Menus" on menus for
select using (true);
create policy "Public Read Events" on events for
select using (true);
create policy "Public Read Artists" on artists for
select using (true);
create policy "Public Read Videos" on videos for
select using (true);
create policy "Public Read Articles" on articles for
select using (true);
-- WRITE (Enable these if you want the Admin Panel to work without Supabase Auth Login)
create policy "Public Write Settings" on site_settings for
insert with check (true);
create policy "Public Update Settings" on site_settings for
update using (true);
create policy "Public Write Menus" on menus for
insert with check (true);
create policy "Public Update Menus" on menus for
update using (true);
create policy "Public Delete Menus" on menus for delete using (true);
create policy "Public Write Events" on events for
insert with check (true);
create policy "Public Update Events" on events for
update using (true);
create policy "Public Delete Events" on events for delete using (true);
create policy "Public Write Artists" on artists for
insert with check (true);
create policy "Public Update Artists" on artists for
update using (true);
create policy "Public Delete Artists" on artists for delete using (true);
create policy "Public Write Videos" on videos for
insert with check (true);
create policy "Public Update Videos" on videos for
update using (true);
create policy "Public Delete Videos" on videos for delete using (true);
create policy "Public Write Articles" on articles for
insert with check (true);
create policy "Public Update Articles" on articles for
update using (true);
create policy "Public Delete Articles" on articles for delete using (true);