/** 기본 프로젝트 URL (로컬·Vercel 모두 env로 덮어쓰는 것을 권장) */
const DEFAULT_SUPABASE_URL = 'https://ldbzgwrabwqvnwfbbiyk.supabase.co'

/**
 * Supabase URL (트레일링 슬래시 제거).
 * Vercel Supabase 통합은 보통 `SUPABASE_URL`만 넣으므로 `NEXT_PUBLIC_SUPABASE_URL`과 함께 지원합니다.
 */
export function getSupabaseUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    process.env.SUPABASE_URL?.trim() ||
    ''
  const cleaned = raw.replace(/\/+$/, '')
  return cleaned || DEFAULT_SUPABASE_URL
}

/**
 * anon / publishable 키. 서버 전용 `SUPABASE_ANON_KEY`는 RSC·Route에서만 사용됩니다.
 * 클라이언트 번들에서는 `next.config.js`의 `env`로 `NEXT_PUBLIC_*`에 매핑된 값이 들어갑니다.
 */
export function getSupabaseAnonKey(): string | null {
  const k =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.SUPABASE_ANON_KEY?.trim() ||
    ''
  return k || null
}

/** 브라우저에서 createClient에 넣기 전에 한 번에 검증할 때 사용 (비밀 값은 노출하지 않음) */
export function getSupabaseClientEnv(): { url: string; anonKey: string } | null {
  const url = getSupabaseUrl()
  const anonKey = getSupabaseAnonKey()
  if (!anonKey) return null
  return { url, anonKey }
}
