create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  area_m2 integer,
  object_type text,
  source text,
  message text,
  ip_hash text,
  user_agent text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists idx_leads_created_at on public.leads (created_at desc);
create index if not exists idx_leads_ip_hash_created on public.leads (ip_hash, created_at desc);

alter table public.leads enable row level security;