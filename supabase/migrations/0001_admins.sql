-- 0001: 관리자 테이블 + is_admin() 함수
-- 재실행 안전(idempotent)합니다.

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

-- SECURITY DEFINER: admins 테이블의 RLS를 우회해 정책 재귀 없이 어디서나 사용 가능
create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid())
$$;

-- 관리자만 admins 조회 가능 (AdminGuard의 자기 확인 쿼리용)
drop policy if exists "admins_select" on public.admins;
create policy "admins_select" on public.admins
  for select to authenticated using (public.is_admin());
