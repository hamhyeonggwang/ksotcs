import { createClient } from '@supabase/supabase-js'

export function getSupabase() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://ldbzgwrabwqvnwfbbiyk.supabase.co'
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!key) return null

  return createClient(url, key, {
    auth: { persistSession: false },
  })
}

