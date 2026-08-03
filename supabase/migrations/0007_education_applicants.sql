-- 0007: 최종 교육대상자 명단(education_applicants) 스키마 보강 + 관리자 정책
-- 재실행 안전(idempotent)합니다. 0001, 0002 이후 실행하세요.
--
-- 이 테이블은 기존에 Supabase에서 직접 SQL로 만들어져 EducationStatusLookupModal
-- (홈페이지 "최종 교육대상자 명단 확인" 조회)에서 이미 사용 중입니다.
-- 이 마이그레이션은 관리자 대시보드(/admin/education-applicants)의 CSV 업로드 기능이
-- 필요로 하는 컬럼(email, education_name, is_current)과 정책을 보강합니다.
--
-- 주의: 실행 전 Supabase 대시보드 → Authentication → Policies에서
-- education_applicants에 이미 걸려 있는 정책 이름을 확인하세요.
-- 기존에 익명 쓰기를 허용하는 정책이 있다면 반드시 삭제해야 합니다.

create table if not exists public.education_applicants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  status text not null default 'selected',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 기존 테이블에 CSV 업로드 기능이 필요로 하는 컬럼을 보강합니다.
alter table public.education_applicants add column if not exists name text not null default '';
alter table public.education_applicants add column if not exists email text;
-- education_title: 기존 하위호환 컬럼(레거시). education_name: 신규 표준 컬럼.
alter table public.education_applicants add column if not exists education_title text;
alter table public.education_applicants add column if not exists education_name text not null default '';
alter table public.education_applicants add column if not exists status text not null default 'selected';
alter table public.education_applicants add column if not exists is_current boolean not null default true;
alter table public.education_applicants add column if not exists created_at timestamptz not null default now();
alter table public.education_applicants add column if not exists updated_at timestamptz not null default now();

drop trigger if exists education_applicants_set_updated_at on public.education_applicants;
create trigger education_applicants_set_updated_at
  before update on public.education_applicants
  for each row execute function public.set_updated_at();

-- CSV 업로드 시 "이름+교육명" 또는 "이메일+교육명" 기준으로 기존 행을 찾기 위한 조회용 인덱스.
-- (매칭 로직 자체는 앱에서 처리하므로 unique 제약이 아닌 일반 인덱스로 둡니다.)
create index if not exists education_applicants_name_lookup_idx
  on public.education_applicants (education_name, lower(name));

create index if not exists education_applicants_email_lookup_idx
  on public.education_applicants (education_name, lower(email))
  where email is not null and email <> '';

alter table public.education_applicants enable row level security;

-- 공개 조회: 홈페이지 이름 검색(EducationStatusLookupModal)은 익명 사용자로 조회하므로
-- select는 전체 공개, 쓰기만 관리자로 제한합니다.
drop policy if exists "education_applicants_public_read" on public.education_applicants;
create policy "education_applicants_public_read" on public.education_applicants
  for select using (true);

drop policy if exists "education_applicants_admin_insert" on public.education_applicants;
create policy "education_applicants_admin_insert" on public.education_applicants
  for insert to authenticated with check (public.is_admin());

drop policy if exists "education_applicants_admin_update" on public.education_applicants;
create policy "education_applicants_admin_update" on public.education_applicants
  for update to authenticated using (public.is_admin());

drop policy if exists "education_applicants_admin_delete" on public.education_applicants;
create policy "education_applicants_admin_delete" on public.education_applicants
  for delete to authenticated using (public.is_admin());
