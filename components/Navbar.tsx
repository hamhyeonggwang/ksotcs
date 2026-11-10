'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import EducationStatusLookupModal from '@/components/EducationStatusLookupModal'
import SiteBrand from '@/components/SiteBrand'

const navigationGroups = [
  {
    label: '학회소개',
    links: [
      { name: '학회소개', href: '/about' },
      { name: '학회 정관', href: '/statutes' },
    ],
  },
  {
    label: '학회지',
    links: [{ name: '학회지 안내', href: '/journal' }],
  },
  {
    label: '학회소식',
    links: [
      { name: '학회소식', href: '/news' },
      { name: '공지사항', href: '/notices' },
    ],
  },
  {
    label: '교육',
    links: [
      { name: '민간자격과정', href: '/certification' },
      { name: '연간교육일정', href: '/education-schedule' },
      { name: '교육센터', href: 'http://ksotcs.co.kr' },
    ],
  },
  {
    label: '문의',
    links: [{ name: '문의하기', href: '/inquiry' }],
  },
]

function isExternal(href: string) {
  return href.startsWith('http')
}

function NavLink({ href, name, currentPath }: { href: string; name: string; currentPath: string }) {
  return (
    <Link
      href={href}
      target={isExternal(href) ? '_blank' : undefined}
      rel={isExternal(href) ? 'noopener noreferrer' : undefined}
      aria-current={currentPath === href ? 'page' : undefined}
    >
      {name}
    </Link>
  )
}

export default function Navbar() {
  const pathname = usePathname() ?? '/'
  const [mobileOpen, setMobileOpen] = useState(false)
  const [quickOpen, setQuickOpen] = useState(false)
  const [lookupOpen, setLookupOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
    setQuickOpen(false)
  }, [pathname])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMobileOpen(false)
      setQuickOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <header className="site-header">
        <div className="desktop-header">
          <div className="site-container desktop-header__masthead">
            <div className="desktop-header__spacer" aria-hidden="true" />
            <SiteBrand />
            <div className="desktop-header__utility">
              <button type="button" onClick={() => setLookupOpen(true)}>교육 대상자 조회</button>
              <Link href="http://ksotcs.co.kr" target="_blank" rel="noopener noreferrer">교육센터</Link>
            </div>
          </div>
          <nav className="desktop-nav" aria-label="주요 메뉴">
            <div className="site-container desktop-nav__inner">
              {navigationGroups.map((group) => {
                const active = group.links.some((item) => item.href === pathname)
                if (group.links.length === 1) {
                  const item = group.links[0]
                  return <NavLink key={group.label} {...item} currentPath={pathname} />
                }
                return (
                  <details key={group.label} className="desktop-nav__group">
                    <summary aria-current={active ? 'page' : undefined}>{group.label}</summary>
                    <div className="desktop-nav__popover">
                      {group.links.map((item) => <NavLink key={item.href} {...item} currentPath={pathname} />)}
                    </div>
                  </details>
                )
              })}
            </div>
          </nav>
        </div>

        <div className="mobile-header">
          <button
            type="button"
            className="mobile-header__button"
            aria-label={mobileOpen ? '전체 메뉴 닫기' : '전체 메뉴 열기'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              setMobileOpen((open) => !open)
              setQuickOpen(false)
            }}
          >
            <svg aria-hidden="true" width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.4">
              {mobileOpen ? <path d="M6 6l16 16M22 6L6 22" /> : <path d="M4 7h20M4 14h20M4 21h20" />}
            </svg>
          </button>
          <SiteBrand />
          <button
            type="button"
            className="mobile-header__button"
            aria-label={quickOpen ? '빠른 메뉴 닫기' : '빠른 메뉴 열기'}
            aria-expanded={quickOpen}
            aria-controls="mobile-quick-menu"
            onClick={() => {
              setQuickOpen((open) => !open)
              setMobileOpen(false)
            }}
          >
            <svg aria-hidden="true" width="28" height="28" viewBox="0 0 28 28" fill="currentColor">
              <circle cx="14" cy="6" r="2.1" /><circle cx="14" cy="14" r="2.1" /><circle cx="14" cy="22" r="2.1" />
            </svg>
          </button>

          <nav id="mobile-navigation" className="mobile-drawer" data-open={mobileOpen} aria-label="모바일 전체 메뉴">
            {navigationGroups.map((group) => (
              <section key={group.label} aria-labelledby={`mobile-${group.label}`}>
                <h2 id={`mobile-${group.label}`}>{group.label}</h2>
                <div>
                  {group.links.map((item) => <NavLink key={item.href} {...item} currentPath={pathname} />)}
                </div>
              </section>
            ))}
          </nav>

          <div id="mobile-quick-menu" className="mobile-quick-menu" data-open={quickOpen}>
            <button type="button" onClick={() => { setLookupOpen(true); setQuickOpen(false) }}>교육 대상자 조회</button>
            <Link href="http://ksotcs.co.kr" target="_blank" rel="noopener noreferrer">교육센터</Link>
            <Link href="/inquiry">문의하기</Link>
          </div>
        </div>
      </header>

      <EducationStatusLookupModal open={lookupOpen} onClose={() => setLookupOpen(false)} />
    </>
  )
}
