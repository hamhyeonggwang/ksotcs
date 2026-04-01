function supabaseStorageHostname() {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!raw) return 'ldbzgwrabwqvnwfbbiyk.supabase.co'
  try {
    return new URL(raw).hostname
  } catch {
    return 'ldbzgwrabwqvnwfbbiyk.supabase.co'
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
