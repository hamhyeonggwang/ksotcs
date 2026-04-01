type SupabaseRestConfig = {
  url: string
  key: string
}

export function getSupabaseRestConfig(): SupabaseRestConfig | null {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://ldbzgwrabwqvnwfbbiyk.supabase.co'
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

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
  try {
    return await supabaseRestGet<T>(pathAndQuery)
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[supabaseRestGetSafe]', pathAndQuery, err)
    }
    return fallback
  }
}

