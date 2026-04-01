import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabaseEnv'

type SupabaseRestConfig = {
  url: string
  key: string
}

export function getSupabaseRestConfig(): SupabaseRestConfig | null {
  const url = getSupabaseUrl()
  const key = getSupabaseAnonKey()
  if (!key) return null
  return { url, key }
}

export async function supabaseRestGet<T>(pathAndQuery: string): Promise<T> {
  const cfg = getSupabaseRestConfig()
  if (!cfg) {
    throw new Error('Supabase 설정이 필요합니다. (.env.local의 키를 확인해 주세요)')
  }

  const res = await fetch(`${cfg.url}${pathAndQuery}`, {
    headers: {
      apikey: cfg.key,
      Authorization: `Bearer ${cfg.key}`,
      Accept: 'application/json',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Supabase REST ${res.status}: ${text || res.statusText}`)
  }

  return (await res.json()) as T
}

/**
 * 서버 컴포넌트·정적 페이지에서 사용: Supabase/네트워크 오류 시 예외를 던지지 않고 fallback을 돌려
 * 배포 환경에서 키·RLS·일시 장애로 인한 전체 500을 막습니다.
 */
export async function supabaseRestGetSafe<T>(pathAndQuery: string, fallback: T): Promise<T> {
  const r = await supabaseRestGetSafeResult(pathAndQuery, fallback)
  return r.data
}

export type SupabaseRestSafeResult<T> =
  | { data: T; ok: true }
  | { data: T; ok: false; error: string }

/** ok가 false면 data는 fallback이며, 배포 환경에서 원인 파악용으로 로그를 남깁니다. */
export async function supabaseRestGetSafeResult<T>(
  pathAndQuery: string,
  fallback: T,
): Promise<SupabaseRestSafeResult<T>> {
  try {
    const data = await supabaseRestGet<T>(pathAndQuery)
    return { data, ok: true }
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err)
    if (process.env.NODE_ENV === 'development' || process.env.VERCEL) {
      console.warn('[supabaseRest]', pathAndQuery, error)
    }
    return { data: fallback, ok: false, error }
  }
}

