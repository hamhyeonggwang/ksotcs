/** 팝업 노출 기간·버전 계산 (서버/클라이언트 공용 순수 함수) */

export type PopupItem = {
  id: string
  title: string
  body: string
  link_href: string | null
  link_label: string | null
  updated_at: string
}

/** Asia/Seoul 기준 오늘 날짜 (yyyy-mm-dd) */
export function seoulToday(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(new Date())
}

/**
 * '오늘 하루 열지 않기' 무효화용 버전 지문.
 * 팝업이 추가·수정·삭제되면 값이 바뀌어 숨김이 자동 해제됩니다.
 */
export function popupFingerprint(items: PopupItem[]): string {
  return items.map((i) => `${i.id}:${i.updated_at}`).join('|')
}

/** 노출 기간 필터를 포함한 PostgREST 조회 경로 */
export function activePopupsQueryPath(today: string): string {
  const select = 'select=id,title,body,link_href,link_label,updated_at'
  const range = `and=(or(starts_at.is.null,starts_at.lte.${today}),or(ends_at.is.null,ends_at.gte.${today}))`
  return `/rest/v1/popups?${select}&is_active=eq.true&${range}&order=sort_order.asc,created_at.asc`
}
