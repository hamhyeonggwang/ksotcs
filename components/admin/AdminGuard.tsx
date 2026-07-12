'use client'

import { useCallback, useEffect, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { Session } from '@supabase/supabase-js'
import { getSupabaseAuthClient } from '@/lib/supabaseAdminClient'
import { ToastProvider } from '@/components/admin/Toast'

type GuardState = 'loading' | 'not-admin' | 'admin'

const NAV_ITEMS = [
  { href: '/admin', label: '대시보드 홈' },
  { href: '/admin/notices', label: '교육공문 관리' },
  { href: '/admin/photos', label: '활동사진 관리' },
  { href: '/admin/popups', label: '팝업 관리' },
  { href: '/admin/schedules', label: '교육일정 관리' },
  { href: '/admin/posts', label: '공지 게시판 관리' },
] as const

export default function AdminGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = getSupabaseAuthClient()

  const [state, setState] = useState<GuardState>('loading')
  const [email, setEmail] = useState<string | null>(null)

  const isLoginPage = pathname === '/admin/login'

  const checkAdmin = useCallback(
    async (session: Session | null) => {
      if (!supabase) return
      if (!session) {
        setState('loading')
        router.replace('/admin/login')
        return
      }
      setEmail(session.user.email ?? null)
      const { data, error } = await supabase
        .from('admins')
        .select('user_id')
        .eq('user_id', session.user.id)
        .maybeSingle()
      if (error || !data) {
        setState('not-admin')
        return
      }
      setState('admin')
    },
    [supabase, router],
  )

  useEffect(() => {
    if (!supabase || isLoginPage) return

    let cancelled = false

    supabase.auth.getSession().then(({ data }) => {
      if (!cancelled) void checkAdmin(data.session)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!cancelled) void checkAdmin(session)
    })

    return () => {
      cancelled = true
      sub.subscription.unsubscribe()
    }
  }, [supabase, isLoginPage, checkAdmin])

  const signOut = useCallback(async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    router.replace('/admin/login')
  }, [supabase, router])

  if (isLoginPage) {
    return <ToastProvider>{children}</ToastProvider>
  }

  if (!supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <p className="text-gray-900 font-semibold">Supabase 설정이 필요합니다.</p>
          <p className="text-sm text-gray-600 mt-2">
            <code className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> 환경변수를 확인해 주세요.
          </p>
        </div>
      </div>
    )
  }

  if (state === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <div className="h-8 w-8 rounded-full border-2 border-primary-600 border-t-transparent animate-spin" />
          <p className="text-sm">확인 중...</p>
        </div>
      </div>
    )
  }

  if (state === 'not-admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center space-y-4">
          <p className="text-gray-900 font-bold text-lg">관리자 권한이 없습니다</p>
          <p className="text-sm text-gray-600">
            {email ? `${email} 계정은 관리자로 등록되어 있지 않습니다.` : '관리자로 등록된 계정으로 로그인해 주세요.'}
          </p>
          <button
            type="button"
            onClick={signOut}
            className="rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
          >
            로그아웃
          </button>
        </div>
      </div>
    )
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
        {/* 사이드바 */}
        <aside className="lg:w-64 shrink-0 bg-gradient-to-b from-primary-700 to-primary-900 text-white lg:min-h-screen">
          <div className="px-5 py-6">
            <Link href="/admin" className="block">
              <p className="text-xs font-medium uppercase tracking-wide text-primary-200">KSOTCS</p>
              <p className="text-lg font-bold mt-0.5">관리자 대시보드</p>
            </Link>
          </div>
          <nav className="px-3 pb-4 flex lg:flex-col gap-1 overflow-x-auto">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                    active ? 'bg-white/15 text-white' : 'text-primary-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <div className="px-5 py-4 border-t border-white/10 mt-auto hidden lg:block">
            {email && <p className="text-xs text-primary-200 truncate mb-2">{email}</p>}
            <div className="flex gap-3 text-sm">
              <Link href="/" className="text-primary-100 hover:text-white underline underline-offset-2">
                사이트 보기
              </Link>
              <button type="button" onClick={signOut} className="text-primary-100 hover:text-white underline underline-offset-2">
                로그아웃
              </button>
            </div>
          </div>
        </aside>

        {/* 본문 */}
        <div className="flex-1 min-w-0">
          <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
            {email && <p className="text-xs text-gray-500 truncate">{email}</p>}
            <div className="flex gap-3 text-sm shrink-0">
              <Link href="/" className="text-primary-700 font-semibold">
                사이트 보기
              </Link>
              <button type="button" onClick={signOut} className="text-gray-600 font-semibold">
                로그아웃
              </button>
            </div>
          </div>
          <main className="p-4 sm:p-6 lg:p-10 max-w-6xl mx-auto">{children}</main>
        </div>
      </div>
    </ToastProvider>
  )
}
