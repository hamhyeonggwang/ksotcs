# Supabase 마이그레이션 안내

관리자 대시보드(`/admin`)에 필요한 테이블·정책·스토리지 설정입니다.
이 프로젝트는 Supabase CLI를 사용하지 않으므로, **Supabase 대시보드 → SQL Editor**에서 아래 파일을 **번호 순서대로** 복사해 실행하세요.

## 1. SQL 실행 순서

| 순서 | 파일 | 내용 |
|---|---|---|
| 1 | `migrations/0001_admins.sql` | 관리자 테이블 + `is_admin()` 함수 |
| 2 | `migrations/0002_posts.sql` | 일반 공지 게시판 + `set_updated_at()` 트리거 함수 |
| 3 | `migrations/0003_education_schedules.sql` | 교육일정 테이블 + 기존 7건 시드 |
| 4 | `migrations/0004_popups.sql` | 랜딩 팝업 테이블 + 기존 2건 시드 |
| 5 | `migrations/0005_existing_tables_policies.sql` | notices·activity_photos RLS 정비 |
| 6 | `migrations/0006_storage.sql` | 스토리지 버킷(공문 PDF, 활동사진) + 정책 |

모든 파일은 재실행해도 안전합니다(idempotent).

> **0005 실행 전 확인**: 대시보드 → Database → Policies에서 `notices`, `activity_photos`에
> 이미 걸려 있는 정책을 확인하세요. 익명(anon) 쓰기를 허용하는 정책이 있다면 삭제해야 합니다.
> 0005는 "공개 읽기 + 관리자 쓰기" 표준 정책을 새로 추가합니다.

## 2. 관리자 계정 만들기

1. Supabase 대시보드 → **Authentication → Users → Add user → Create new user**
   - 이메일·비밀번호 입력, **Auto Confirm User 체크**
2. SQL Editor에서 관리자로 등록:

```sql
insert into public.admins (user_id, email)
select id, email from auth.users where email = '관리자이메일@example.com'
on conflict (user_id) do nothing;
```

3. 사이트의 `/admin/login`에서 해당 이메일·비밀번호로 로그인

### 관리자 제거

```sql
delete from public.admins where email = '제거할이메일@example.com';
```

## 3. 확인 방법

- 익명 키로 쓰기가 거부되는지 (401/42501이면 정상):

```bash
curl -X POST 'https://ldbzgwrabwqvnwfbbiyk.supabase.co/rest/v1/posts' \
  -H 'apikey: <ANON_KEY>' -H 'Authorization: Bearer <ANON_KEY>' \
  -H 'Content-Type: application/json' \
  -d '{"title":"test","body":"test"}'
```

- 공개 페이지(`/news`, `/education-schedule`)가 정상 표시되는지 (읽기 정책 확인)

## 4. 자주 발생하는 오류

**`ERROR: 42703: column "..." does not exist`**
`posts`, `popups`, `education_schedules` 중 하나가 이미 다른 용도로 만들어져 있어 필요한 컬럼이 없는 경우입니다.
해당 번호의 마이그레이션 파일을 다시 실행하면 누락된 컬럼을 자동으로 추가하도록 되어 있으니, **같은 파일을 한 번 더 그대로 실행**하면 해결됩니다. (idempotent이므로 재실행해도 안전합니다.)

## 5. 문제가 생겼을 때 (롤백)

신규 테이블만 제거하려면:

```sql
drop table if exists public.posts cascade;
drop table if exists public.popups cascade;
drop table if exists public.education_schedules cascade;
drop table if exists public.admins cascade;
drop function if exists public.is_admin() cascade;
```

기존 `notices`, `activity_photos` 데이터는 위 SQL의 영향을 받지 않습니다.
