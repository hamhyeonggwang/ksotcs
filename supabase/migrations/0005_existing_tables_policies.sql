-- 0005: 기존 테이블(notices, activity_photos) RLS 정책 정비
-- 재실행 안전(idempotent)합니다. 0001 이후 실행하세요.
--
-- 주의: 실행 전 Supabase 대시보드 → Authentication → Policies에서
-- 두 테이블에 이미 걸려 있는 정책 이름을 확인하세요.
-- 아래는 "공개 읽기 + 관리자 쓰기" 표준 정책을 새로 만듭니다.
-- 기존에 익명 쓰기를 허용하는 정책이 있다면 반드시 삭제해야 합니다.

alter table public.notices enable row level security;
alter table public.activity_photos enable row level security;

-- notices: 공개 읽기
drop policy if exists "notices_public_read" on public.notices;
create policy "notices_public_read" on public.notices
  for select using (true);

drop policy if exists "notices_admin_insert" on public.notices;
create policy "notices_admin_insert" on public.notices
  for insert to authenticated with check (public.is_admin());

drop policy if exists "notices_admin_update" on public.notices;
create policy "notices_admin_update" on public.notices
  for update to authenticated using (public.is_admin());

drop policy if exists "notices_admin_delete" on public.notices;
create policy "notices_admin_delete" on public.notices
  for delete to authenticated using (public.is_admin());

-- activity_photos: 공개 읽기
drop policy if exists "activity_photos_public_read" on public.activity_photos;
create policy "activity_photos_public_read" on public.activity_photos
  for select using (true);

drop policy if exists "activity_photos_admin_insert" on public.activity_photos;
create policy "activity_photos_admin_insert" on public.activity_photos
  for insert to authenticated with check (public.is_admin());

drop policy if exists "activity_photos_admin_update" on public.activity_photos;
create policy "activity_photos_admin_update" on public.activity_photos
  for update to authenticated using (public.is_admin());

drop policy if exists "activity_photos_admin_delete" on public.activity_photos;
create policy "activity_photos_admin_delete" on public.activity_photos
  for delete to authenticated using (public.is_admin());
