'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PublicShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  if (pathname?.startsWith('/admin')) {
    return <main className="min-h-screen">{children}</main>
  }

  return (
    <div className="site-public">
      <a className="skip-link" href="#main-content">본문으로 이동</a>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  )
}
