import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { getSupabaseClientEnv } from '@/lib/supabaseEnv'

const clientOptions = {
  auth: { persistSession: false as const },
} as const

let browserClient: SupabaseClient | undefined
let browserFingerprint: string | undefined

function warnMissingOnce() {
  if (process.env.NODE_ENV !== 'development') return
  const g = globalThis as { __ksotcsSupabaseWarned?: boolean }
  if (g.__ksotcsSupabaseWarned) return
  g.__ksotcsSupabaseWarned = true
  const env = getSupabaseClientEnv()
  console.warn(
    '[getSupabase] anon 키가 없어 클라이언트를 만들 수 없습니다. NEXT_PUBLIC_SUPABASE_ANON_KEY 또는 next.config env 매핑(SUPABASE_ANON_KEY)을 확인하세요.',
    { hasClientEnv: Boolean(env) },
  )
}

/**
 * 브라우저용 Supabase 클라이언트. env는 빌드 시점 NEXT_PUBLIC_* + next.config 매핑으로 들어옵니다.
 * 동일 탭에서 인스턴스를 하나만 쓰도록 캐시합니다(URL·키가 바뀌면 재생성).
 */
export function getSupabase(): SupabaseClient | null {
  const env = getSupabaseClientEnv()
  if (!env) {
    warnMissingOnce()
    return null
  }

  const { url, anonKey } = env
  const fp = `${url}\0${anonKey}`

  if (typeof window !== 'undefined') {
    if (!browserClient || browserFingerprint !== fp) {
      browserFingerprint = fp
      browserClient = createClient(url, anonKey, clientOptions)
    }
    return browserClient
  }

  return createClient(url, anonKey, clientOptions)
}

