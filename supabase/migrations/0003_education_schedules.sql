-- 0003: 교육일정(education_schedules) + 기존 하드코딩 7건 시드
-- 재실행 안전(idempotent)합니다. 0002 이후 실행하세요.

create table if not exists public.education_schedules (
  id uuid primary key default gen_random_uuid(),
  year int not null default 2026,
  month int not null check (month between 1 and 12),
  period text not null,            -- '3월28일', '5월말' 등 자유 텍스트
  course_name text not null,
  education_name text not null,
  education_time text not null,
  instructor text,
  schedule_note text,
  detailed_time text,
  location text,
  director text not null default '',
  method text not null default '',
  target text not null default '',
  category text not null,
  sort_order int not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- education_schedules가 이미 다른 용도로 존재하던 경우를 대비해 누락된 컬럼을 보강합니다.
alter table public.education_schedules add column if not exists year int not null default 2026;
alter table public.education_schedules add column if not exists month int not null default 1;
alter table public.education_schedules add column if not exists period text not null default '';
alter table public.education_schedules add column if not exists course_name text not null default '';
alter table public.education_schedules add column if not exists education_name text not null default '';
alter table public.education_schedules add column if not exists education_time text not null default '';
alter table public.education_schedules add column if not exists instructor text;
alter table public.education_schedules add column if not exists schedule_note text;
alter table public.education_schedules add column if not exists detailed_time text;
alter table public.education_schedules add column if not exists location text;
alter table public.education_schedules add column if not exists director text not null default '';
alter table public.education_schedules add column if not exists method text not null default '';
alter table public.education_schedules add column if not exists target text not null default '';
alter table public.education_schedules add column if not exists category text not null default '';
alter table public.education_schedules add column if not exists sort_order int not null default 0;
alter table public.education_schedules add column if not exists is_visible boolean not null default true;
alter table public.education_schedules add column if not exists created_at timestamptz not null default now();
alter table public.education_schedules add column if not exists updated_at timestamptz not null default now();

drop trigger if exists education_schedules_set_updated_at on public.education_schedules;
create trigger education_schedules_set_updated_at
  before update on public.education_schedules
  for each row execute function public.set_updated_at();

alter table public.education_schedules enable row level security;

drop policy if exists "education_schedules_public_read" on public.education_schedules;
create policy "education_schedules_public_read" on public.education_schedules
  for select using (is_visible = true or public.is_admin());

drop policy if exists "education_schedules_admin_insert" on public.education_schedules;
create policy "education_schedules_admin_insert" on public.education_schedules
  for insert to authenticated with check (public.is_admin());

drop policy if exists "education_schedules_admin_update" on public.education_schedules;
create policy "education_schedules_admin_update" on public.education_schedules
  for update to authenticated using (public.is_admin());

drop policy if exists "education_schedules_admin_delete" on public.education_schedules;
create policy "education_schedules_admin_delete" on public.education_schedules
  for delete to authenticated using (public.is_admin());

-- 기존 하드코딩 데이터 시드 (이미 데이터가 있으면 건너뜀)
insert into public.education_schedules
  (year, month, period, course_name, education_name, education_time, instructor, schedule_note, location, director, method, target, category, sort_order)
select * from (values
  (2026, 3, '3월28일', '인지발달심리상담지도사 아동발달평가사 (질환별 사례교육)', '장애 아동의 시지각 문제에 대한 이해와 중재', '14:00-18:00', '최강미, 안소현', null::text, null::text, '조선영', '실시간온라인', '작업치료사 70명', '인지발달심리상담지도사', 1),
  (2026, 4, '4월19일', '인지발달심리상담지도사 아동발달평가사 (질환별 사례교육)', '질환별 장애아동의 이해와 중재 : 자폐스펙트럼장애 아동의 행동 중재와 사회기술훈련', '10:00-17:10', '유애리, ABA', '4/19', '서울창업허브 공덕 본관 9층 세미나실', '조선영', '오프라인', '임상가, 학생, 40명', '인지발달심리상담지도사', 2),
  (2026, 5, '5월30일', '인지발달심리상담지도사 아동발달평가사 (질환별 사례교육)', '사례로 이해하는 조산 & 뇌성마비 아동 작업치료', '09:00-16:00', '김영호, 윤인진', '5/30', '줌온라인', '박윤이', '온라인실시간', '임상가, 학생', '인지발달심리상담지도사', 3),
  (2026, 6, '6월말', '인지발달심리상담지도사 아동발달평가사 (부모교육)', 'OPC 교육 - 사례공유', '3시간(추후 시간 연장논의)', '주유미, 유은영, 임상가1', null, null, '조선영', '온라인실시간', '임상가', '인지발달심리상담지도사', 4),
  (2026, 8, '8월 말', '아동발달평가사', '임상에서 바로쓰는 영유아 발달평가 (베일리-3 발달위험군 아동(36개월)평가사례)', '16시간 (2일)', '박윤이, 김영란, 유영미, 함형광', null, null, '박윤이', '온라인실시간 또는 오프라인', '임상가', '아동발달평가사', 5),
  (2026, 9, '9월말', '아동발달평가사 1급 자격 교육', '아동발달평가서 작성', '3시간', '최강미, 함형광', null, null, '박윤이', '온라인실시간', '2급 대상자', '아동발달평가사', 6),
  (2026, 11, '11월 중순', '인지발달상담지도사 자격교육과정', '2급자격과정', '16시간', null, null, null, '조선영', '온라인 녹화', '임상가, 학생', '인지발달심리상담지도사', 7)
) as seed(year, month, period, course_name, education_name, education_time, instructor, schedule_note, location, director, method, target, category, sort_order)
where not exists (select 1 from public.education_schedules);
