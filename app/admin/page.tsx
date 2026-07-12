'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getSupabaseAuthClient } from '@/lib/supabaseAdminClient'

type SectionCard = {
  href: string
  title: string
  description: string
  table: string
}

const SECTIONS: SectionCard[] = [
  { href: '/admin/notices', title: '교육공문 관리', description: '공문 PDF 등록·삭제 (학회소식 페이지에 표시)', table: 'notices' },
  { href: '/admin/photos', title: '활동사진 관리', description: '학회 활동 사진 업로드·캡션 편집', table: 'activity_photos' },
  { href: '/admin/popups', title: '팝업 관리', description: '홈 화면 팝업 공지의 내용·노출 기간·순서 설정', table: 'popups' },
  { href: '/admin/schedules', title: '교육일정 관리', description: '연간교육일정 등록·수정·노출 관리', table: 'education_schedules' },
  { href: '/admin/posts', title: '공지 게시판 관리', description: '일반 공지글 작성·게시 관리', table: 'posts' },
]

export default function AdminHomePage() {
  const supabase = getSupabaseAuthClient()
  const [counts, setCounts] = useState<Record<string, number | null>>({})

  useEffect(() => {
    if (!supabase) return
    let cancelled = false

    Promise.all(
      SECTIONS.map(async (s) => {
        const { count, error } = await supabase.from(s.table).select('id', { count: 'exact', head: true })
        return [s.table, error ? null : count] as const
      }),
    ).then((entries) => {
      if (!cancelled) setCounts(Object.fromEntries(entries))
    })

    return () => {
      cancelled = true
    }
  }, [supabase])

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">대시보드 홈</h1>
      <p className="mt-2 text-gray-600">관리할 항목을 선택하세요.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((s) => {
          const count = counts[s.table]
          return (
            <Link
              key={s.href}
              href={s.href}
              className="group rounded-2xl bg-white shadow-md ring-1 ring-black/5 p-6 hover:shadow-lg hover:ring-primary-200 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                  {s.title}
                </h2>
                <span className="shrink-0 rounded-full bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-700">
                  {count === undefined ? '…' : count === null ? '-' : `${count}건`}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.description}</p>
            </Link>
          )
        })}
      </div>

      <div className="mt-10 rounded-2xl bg-primary-50 border border-primary-100 p-5">
        <p className="text-sm text-gray-700 leading-relaxed">
          <span className="font-semibold">처음 사용하시나요?</span> 관리자 계정 추가와 데이터베이스 설정 방법은 저장소의{' '}
          <code className="font-mono text-primary-800">supabase/README.md</code>를 참고하세요.
        </p>
      </div>
    </div>
  )
}
