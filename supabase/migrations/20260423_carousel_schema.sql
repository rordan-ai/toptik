-- TOPTIK Carousel schema
create extension if not exists pgcrypto;

create table if not exists public.carousel_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text null,
  cover_image_path text not null,
  display_order integer not null default 1,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.carousel_item_angles (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references public.carousel_items(id) on delete cascade,
  angle_key text not null,
  image_path text not null,
  angle_order integer not null default 1
);

create table if not exists public.carousel_settings (
  id integer primary key default 1,
  autoplay_ms integer not null default 3500,
  transition_mode text not null default 'shatter-particle',
  updated_at timestamptz not null default now(),
  constraint carousel_settings_singleton check (id = 1)
);

insert into public.carousel_settings (id, autoplay_ms, transition_mode)
values (1, 3500, 'shatter-particle')
on conflict (id) do nothing;

create index if not exists idx_carousel_items_order on public.carousel_items(display_order);
create index if not exists idx_carousel_angles_item_order on public.carousel_item_angles(item_id, angle_order);

alter table public.carousel_items enable row level security;
alter table public.carousel_item_angles enable row level security;
alter table public.carousel_settings enable row level security;

-- Public read policies
drop policy if exists "carousel_items_public_read" on public.carousel_items;
create policy "carousel_items_public_read"
on public.carousel_items
for select
to anon, authenticated
using (true);

drop policy if exists "carousel_item_angles_public_read" on public.carousel_item_angles;
create policy "carousel_item_angles_public_read"
on public.carousel_item_angles
for select
to anon, authenticated
using (true);

drop policy if exists "carousel_settings_public_read" on public.carousel_settings;
create policy "carousel_settings_public_read"
on public.carousel_settings
for select
to anon, authenticated
using (true);

-- Authenticated admin write policies (single-admin model).
-- For strict single-admin, refine this policy in Supabase dashboard by email/uid.
drop policy if exists "carousel_items_auth_write" on public.carousel_items;
create policy "carousel_items_auth_write"
on public.carousel_items
for all
to authenticated
using (true)
with check (true);

drop policy if exists "carousel_item_angles_auth_write" on public.carousel_item_angles;
create policy "carousel_item_angles_auth_write"
on public.carousel_item_angles
for all
to authenticated
using (true)
with check (true);

drop policy if exists "carousel_settings_auth_write" on public.carousel_settings;
create policy "carousel_settings_auth_write"
on public.carousel_settings
for all
to authenticated
using (true)
with check (true);
