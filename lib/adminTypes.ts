/** 관리자 대시보드와 공개 페이지가 공유하는 테이블 행 타입 */

export type NoticeRow = {
  id: string
  title: string
  pdf_url: string
  created_at: string
}

export type ActivityPhotoRow = {
  id: string
  image_url: string
  caption: string | null
  created_at: string
}

export type PostRow = {
  id: string
  title: string
  body: string
  is_published: boolean
  created_at: string
  updated_at: string
}

export type PopupRow = {
  id: string
  title: string
  body: string
  link_href: string | null
  link_label: string | null
  starts_at: string | null
  ends_at: string | null
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export type EducationScheduleRow = {
  id: string
  year: number
  month: number
  period: string
  course_name: string
  education_name: string
  education_time: string
  instructor: string | null
  schedule_note: string | null
  detailed_time: string | null
  location: string | null
  director: string
  method: string
  target: string
  category: string
  sort_order: number
  is_visible: boolean
  created_at: string
  updated_at: string
}

/** unknown 에러에서 사용자에게 보여줄 메시지를 추출 */
export function errorMessage(e: unknown, fallback: string): string {
  if (e instanceof Error && e.message) return e.message
  if (typeof e === 'object' && e !== null && 'message' in e) {
    const m = (e as { message?: unknown }).message
    if (typeof m === 'string' && m) return m
  }
  return fallback
}
