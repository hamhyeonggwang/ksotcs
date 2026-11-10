'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SiteBrand from '@/components/SiteBrand'

const primaryLinks = [
  { name: '학회소개', href: '/about' },
  { name: '학회지 안내', href: '/journal' },
  { name: '학회소식', href: '/news' },
  { name: '공지사항', href: '/notices' },
  { name: '문의', href: '/inquiry' },
]

const educationLinks = [
  { name: '교육센터', href: 'http://ksotcs.co.kr' },
  { name: '민간자격과정 안내', href: '/certification' },
  { name: '연간교육일정', href: '/education-schedule' },
]

function isExternal(href: string) {
  return href.startsWith('http')
}

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => setMobileOpen(false), [pathname])

  return (
    <header className="site-header">
      <div className="site-container">
        <div className="site-header__bar">
          <SiteBrand />

          <nav className="site-nav" aria-label="주요 메뉴">
            {primaryLinks.map((item) => (
              <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>
                {item.name}
              </Link>
            ))}
            <details>
              <summary>교육</summary>
              <div className="site-nav__popover">
                {educationLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    target={isExternal(item.href) ? '_blank' : undefined}
                    rel={isExternal(item.href) ? 'noopener noreferrer' : undefined}
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </details>
          </nav>

          <Link className="primary-action site-header__action" href="/education-schedule">
            교육일정 확인
          </Link>

          <button
            type="button"
            className="mobile-menu-button"
            aria-label={mobileOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>

        <nav id="mobile-navigation" className="mobile-menu" data-open={mobileOpen} aria-label="모바일 메뉴">
          {[...primaryLinks, ...educationLinks].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={isExternal(item.href) ? '_blank' : undefined}
              rel={isExternal(item.href) ? 'noopener noreferrer' : undefined}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
