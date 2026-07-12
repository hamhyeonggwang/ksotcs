'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

/** /admin 이하 경로에서는 공개 사이트의 Navbar/Footer를 렌더하지 않습니다. */
export default function HideOnAdmin({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null
  return <>{children}</>
}
