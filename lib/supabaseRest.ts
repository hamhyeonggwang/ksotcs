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

