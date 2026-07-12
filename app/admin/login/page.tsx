'use client'

import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseAuthClient } from '@/lib/supabaseAdminClient'
import { errorMessage } from '@/lib/adminTypes'

export default function AdminLoginPage() {
  const router = useRouter()
  const supabase = getSupabaseAuthClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // 이미 로그인된 상태면 바로 대시보드로
  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/admin')
    })
  }, [supabase, router])

  const submit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setError(null)
      if (!supabase) {
        setError('Supabase 설정이 필요합니다. (NEXT_PUBLIC_SUPABASE_ANON_KEY 확인)')
        return
      }
      if (!email.trim() || !password) {
        setError('이메일과 비밀번호를 입력해 주세요.')
        return
      }
      setSubmitting(true)
      try {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })
        if (signInError) {
          setError(
            signInError.message === 'Invalid login credentials'
              ? '이메일 또는 비밀번호가 올바르지 않습니다.'
              : signInError.message,
          )
          return
        }
        router.replace('/admin')
      } catch (err: unknown) {
        setError(errorMessage(err, '로그인 중 오류가 발생했습니다.'))
      } finally {
        setSubmitting(false)
      }
    },
    [supabase, email, password, router],
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-primary-50 p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white shadow-xl ring-1 ring-black/5 overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-6 text-white">
            <p className="text-xs font-medium uppercase tracking-wide text-primary-100">KSOTCS Admin</p>
            <h1 className="text-xl font-bold mt-1">관리자 로그인</h1>
          </div>

          <form onSubmit={submit} className="p-6 space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                이메일
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                비밀번호
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="비밀번호"
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-primary-600 py-3 text-sm font-semibold text-white hover:bg-primary-700 transition-colors shadow-md disabled:opacity-60"
            >
              {submitting ? '로그인 중...' : '로그인'}
            </button>

            <p className="text-xs text-gray-500 leading-relaxed">
              비밀번호를 잊으셨다면 Supabase 대시보드(Authentication → Users)에서 재설정해 주세요.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
