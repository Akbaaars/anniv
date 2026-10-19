create table if not exists public.love_notes (
  id uuid primary key default gen_random_uuid(),
  author_name text not null check (char_length(trim(author_name)) between 1 and 80),
  mood text not null default '❤️ Sayang Banget' check (char_length(trim(mood)) between 1 and 40),
  message text not null check (char_length(trim(message)) between 1 and 2000),
  likes integer not null default 0 check (likes >= 0),
  is_pinned boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.love_notes enable row level security;

drop policy if exists "Love notes are viewable by everyone" on public.love_notes;
drop policy if exists "Only password account can read love notes" on public.love_notes;
create policy "Only password account can read love notes"
  on public.love_notes for select to authenticated
  using ((auth.jwt() ->> 'email') = 'password-gate@example.com');

drop policy if exists "Visitors can add unpinned love notes" on public.love_notes;
drop policy if exists "Password account can add love notes" on public.love_notes;
create policy "Password account can add love notes"
  on public.love_notes for insert to authenticated
  with check (
    likes = 0
    and is_pinned = false
    and (auth.jwt() ->> 'email') = 'password-gate@example.com'
  );

revoke all on public.love_notes from public, anon, authenticated;
grant select on public.love_notes to authenticated;
grant insert (author_name, mood, message) on public.love_notes to authenticated;

insert into public.love_notes (id, author_name, mood, message, likes, is_pinned)
values
  (
    '00000000-0000-4000-8000-000000000001',
    'Poy ♥ (Your Favorite Person)',
    '❤️ Sayang Banget',
    'Noy, first date kita di pameran buku pada 23/09/25 selalu jadi salah satu kenangan favoritku. Aku suka obrolan kita tentang buku, ikan, dan kopi. Semoga cerita kita terus bertumbuh. 🍓',
    12,
    true
  ),
  (
    '00000000-0000-4000-8000-000000000002',
    'Noy ♥ (Paling Sayang Poy)',
    '🥺 Terharu',
    'Poy, first date kita di pameran buku pada 23/09/25 menjadi awal cerita yang kusyukuri. Dari buku, ikan, dan kopi, aku senang bisa semakin dekat denganmu. Dari Noy, selalu sayang kamu! ✨',
    9,
    true
  )
on conflict (id) do nothing;

create table if not exists public.heart_counters (
  id smallint primary key default 1 check (id = 1),
  count integer not null default 365 check (count >= 0)
);

insert into public.heart_counters (id, count)
values (1, 365)
on conflict (id) do nothing;

alter table public.heart_counters enable row level security;

drop policy if exists "Heart count is viewable by everyone" on public.heart_counters;
drop policy if exists "Password account can view heart count" on public.heart_counters;
create policy "Password account can view heart count"
  on public.heart_counters for select to authenticated
  using ((auth.jwt() ->> 'email') = 'password-gate@example.com');

revoke all on public.heart_counters from public, anon, authenticated;
grant select on public.heart_counters to authenticated;

create or replace function public.increment_note_like(note_id uuid)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  updated_likes integer;
begin
  if (auth.jwt() ->> 'email') is distinct from 'password-gate@example.com' then
    raise exception 'Unauthorized' using errcode = '42501';
  end if;

  update public.love_notes
  set likes = likes + 1
  where id = note_id
  returning likes into updated_likes;

  if updated_likes is null then
    raise exception 'Love note not found';
  end if;

  return updated_likes;
end;
$$;

create or replace function public.increment_heart_count()
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  updated_count integer;
begin
  if (auth.jwt() ->> 'email') is distinct from 'password-gate@example.com' then
    raise exception 'Unauthorized' using errcode = '42501';
  end if;

  update public.heart_counters
  set count = count + 1
  where id = 1
  returning count into updated_count;

  if updated_count is null then
    raise exception 'Heart counter is not initialized';
  end if;

  return updated_count;
end;
$$;

revoke all on function public.increment_note_like(uuid) from public, anon, authenticated;
revoke all on function public.increment_heart_count() from public, anon, authenticated;
grant execute on function public.increment_note_like(uuid) to authenticated;
grant execute on function public.increment_heart_count() to authenticated;