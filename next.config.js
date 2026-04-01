function supabaseStorageHostname() {
  const raw =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    'https://ldbzgwrabwqvnwfbbiyk.supabase.co'
  try {
    return new URL(raw).hostname
  } catch {
    return 'ldbzgwrabwqvnwfbbiyk.supabase.co'
  }
}

/** 빈 문자열을 NEXT_PUBLIC_*에 넣으면 클라이언트 번들에 ""가 박혀 Supabase 클라이언트가 깨질 수 있어, 값이 있을 때만 주입합니다. */
function supabasePublicEnv() {
  const url = (
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    ''
  ).trim()
  const anonKey = (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    ''
  ).trim()

  return {
    ...(url ? { NEXT_PUBLIC_SUPABASE_URL: url } : {}),
    ...(anonKey ? { NEXT_PUBLIC_SUPABASE_ANON_KEY: anonKey } : {}),
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /**
   * Vercel·Supabase 연동이 `SUPABASE_URL` / `SUPABASE_ANON_KEY`만 넣는 경우가 많아,
   * 빌드 시점에 NEXT_PUBLIC_*으로 넘겨 브라우저 번들에도 동일 값이 들어가게 합니다.
   */
  env: supabasePublicEnv(),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: supabaseStorageHostname(),
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
