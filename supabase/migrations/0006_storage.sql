-- 0006: Storage 버킷(notice-pdfs, activity-photos) + 관리자 쓰기 정책
-- 재실행 안전(idempotent)합니다. 0001 이후 실행하세요.
--
-- public 버킷이므로 파일 읽기는 public URL로 처리됩니다(별도 select 정책 불필요).

insert into storage.buckets (id, name, public)
values
  ('notice-pdfs', 'notice-pdfs', true),
  ('activity-photos', 'activity-photos', true)
on conflict (id) do nothing;

-- notice-pdfs: 관리자만 업로드/수정/삭제
drop policy if exists "notice_pdfs_admin_insert" on storage.objects;
create policy "notice_pdfs_admin_insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'notice-pdfs' and public.is_admin());

drop policy if exists "notice_pdfs_admin_update" on storage.objects;
create policy "notice_pdfs_admin_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'notice-pdfs' and public.is_admin());

drop policy if exists "notice_pdfs_admin_delete" on storage.objects;
create policy "notice_pdfs_admin_delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'notice-pdfs' and public.is_admin());

-- activity-photos: 관리자만 업로드/수정/삭제
drop policy if exists "activity_photos_bucket_admin_insert" on storage.objects;
create policy "activity_photos_bucket_admin_insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'activity-photos' and public.is_admin());

drop policy if exists "activity_photos_bucket_admin_update" on storage.objects;
create policy "activity_photos_bucket_admin_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'activity-photos' and public.is_admin());

drop policy if exists "activity_photos_bucket_admin_delete" on storage.objects;
create policy "activity_photos_bucket_admin_delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'activity-photos' and public.is_admin());
