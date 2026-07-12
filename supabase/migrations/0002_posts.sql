-- 0002: 일반 공지 게시판(posts) + updated_at 자동 갱신 트리거 함수(공용)
-- 재실행 안전(idempotent)합니다. 0001 이후 실행하세요.

-- 공용 updated_at 트리거 함수 (popups, education_schedules에서도 재사용)
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- posts 테이블이 이미 다른 용도로 존재하던 경우를 대비해 누락된 컬럼을 보강합니다.
alter table public.posts add column if not exists title text not null default '';
alter table public.posts add column if not exists body text not null default '';
alter table public.posts add column if not exists is_published boolean not null default true;
alter table public.posts add column if not exists created_at timestamptz not null default now();
alter table public.posts add column if not exists updated_at timestamptz not null default now();

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

alter table public.posts enable row level security;

drop policy if exists "posts_public_read" on public.posts;
create policy "posts_public_read" on public.posts
  for select using (is_published = true or public.is_admin());

drop policy if exists "posts_admin_insert" on public.posts;
create policy "posts_admin_insert" on public.posts
  for insert to authenticated with check (public.is_admin());

drop policy if exists "posts_admin_update" on public.posts;
create policy "posts_admin_update" on public.posts
  for update to authenticated using (public.is_admin());

drop policy if exists "posts_admin_delete" on public.posts;
create policy "posts_admin_delete" on public.posts
  for delete to authenticated using (public.is_admin());
