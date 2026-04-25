alter table public.carousel_items
add column if not exists catalog_number text null;

alter table public.carousel_items
add column if not exists source_url text null;

create index if not exists idx_carousel_items_catalog_number
on public.carousel_items (catalog_number);
