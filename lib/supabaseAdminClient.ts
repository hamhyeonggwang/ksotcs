import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { getSupabaseClientEnv } from '@/lib/supabaseEnv'

/**
 * 관리자 페이지 전용 Supabase 클라이언트.
 * 공개 페이지용 getSupabase()와 달리 세션을 localStorage에 유지하며,
 * storageKey를 분리해 두 클라이언트가 같은 탭에서 공존해도 충돌하지 않습니다.
 */
const authClientOptions = {
  auth: {
    persistSession: true as const,
    autoRefreshToken: true as const,
    storageKey: 'ksotcs-admin-auth',
  },
} as const

let authClient: SupabaseClient | undefined
let authFingerprint: string | undefined

export function getSupabaseAuthClient(): SupabaseClient | null {
  const env = getSupabaseClientEnv()
  if (!env) return null

  const { url, anonKey } = env
  const fp = `${url}\0${anonKey}`

  if (typeof window !== 'undefined') {
    if (!authClient || authFingerprint !== fp) {
      authFingerprint = fp
      authClient = createClient(url, anonKey, authClientOptions)
    }
    return authClient
  }

  return createClient(url, anonKey, authClientOptions)
}
