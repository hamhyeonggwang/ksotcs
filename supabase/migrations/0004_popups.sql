-- 0004: 랜딩 팝업(popups) + 기존 하드코딩 2건 시드
-- 재실행 안전(idempotent)합니다. 0002 이후 실행하세요.

create table if not exists public.popups (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  link_href text,
  link_label text,
  starts_at date,                  -- null이면 즉시 노출
  ends_at date,                    -- null이면 무기한
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists popups_set_updated_at on public.popups;
create trigger popups_set_updated_at
  before update on public.popups
  for each row execute function public.set_updated_at();

alter table public.popups enable row level security;

-- 공개 read는 활성 팝업만(노출 기간 필터는 조회 쿼리에서 처리), 관리자는 전체
drop policy if exists "popups_public_read" on public.popups;
create policy "popups_public_read" on public.popups
  for select using (is_active = true or public.is_admin());

drop policy if exists "popups_admin_insert" on public.popups;
create policy "popups_admin_insert" on public.popups
  for insert to authenticated with check (public.is_admin());

drop policy if exists "popups_admin_update" on public.popups;
create policy "popups_admin_update" on public.popups
  for update to authenticated using (public.is_admin());

drop policy if exists "popups_admin_delete" on public.popups;
create policy "popups_admin_delete" on public.popups
  for delete to authenticated using (public.is_admin());

-- 기존 NoticePopup 하드코딩 2건 시드 (이미 데이터가 있으면 건너뜀)
insert into public.popups (title, body, link_href, link_label, sort_order)
select * from (values
  ('질환별 장애아동의 이해와 중재 조산 & 뇌성마비 아동 작업치료',
   '명단 조회 > 진행중인 교육 > 이름 검색.',
   '/news', '진행중인 교육', 1),
  ('(접수중)작업수행 기반 효과적인 부모상담 기법과 사례: 작업수행코칭(OPC)모델 중심으로',
   '추가접수 ~ 6/4 .',
   'http://ksotcs.co.kr', '교육센터', 2)
) as seed(title, body, link_href, link_label, sort_order)
where not exists (select 1 from public.popups);
