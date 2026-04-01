'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { getSupabase } from '@/lib/supabase'

const statusMap: Record<string, string> = {
  open: '접수가 진행되고 있습니다.',
  review: '명단 확인 중입니다.',
  selected: '교육 대상자로 확인되었습니다.',
  pending: '등록을 위해 입금 확인이 필요합니다.',
  completed: '등록이 완료되었습니다.',
  // 하위호환: 기존 한글 상태값이 들어오는 경우
  접수중: '접수가 진행되고 있습니다.',
  검토중: '명단 확인 중입니다.',
  선정: '교육 대상자로 확인되었습니다.',
  미입금: '등록을 위해 입금 확인이 필요합니다.',
  완료: '등록이 완료되었습니다.',
}

type LookupRow = {
  id: string
  name: string
  status: string
  education_title?: string | null
  updated_at?: string | null
  created_at?: string | null
}

function normalizeName(input: string) {
  return input.replace(/\s+/g, ' ').trim()
}

function badgeClasses(status?: string) {
  switch (status) {
    case 'selected':
    case 'completed':
    case '선정':
    case '완료':
      return 'bg-emerald-50 text-emerald-700 ring-emerald-200'
    case 'pending':
    case '미입금':
      return 'bg-amber-50 text-amber-800 ring-amber-200'
    default:
      return 'bg-sky-50 text-sky-700 ring-sky-200'
  }
}

export default function EducationStatusLookupModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const supabase = useMemo(() => getSupabase(), [])
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rows, setRows] = useState<LookupRow[] | null>(null)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    setName('')
    setRows(null)
    setError(null)
    setSubmitting(false)
  }, [open])

  const submit = useCallback(async () => {
    const n = normalizeName(name)
    setError(null)
    setRows(null)

    if (!n) {
      setError('이름을 입력해 주세요.')
      return
    }
    if (!supabase) {
      setError('Supabase 설정이 필요합니다. (.env.local의 키를 확인해 주세요)')
      return
    }

    setSubmitting(true)
    try {
      // 1) “현재 접수 진행중인 교육”만 분리 컬럼이 있으면 우선 사용
      const base = supabase
        .from('education_applicants')
        .select('id,name,status,education_title,updated_at,created_at')
        .ilike('name', n)
        .order('updated_at', { ascending: false })
        .limit(10)

      const { data, error: e1 } = await base.eq('is_current', true)
      if (!e1) {
        setRows((data ?? []) as LookupRow[])
        return
      }

      // 2) is_current 컬럼이 없거나 정책상 불가하면, 이름으로만 조회
      const { data: data2, error: e2 } = await base
      if (e2) throw e2
      setRows((data2 ?? []) as LookupRow[])
    } catch (e: any) {
      setError(typeof e?.message === 'string' ? e.message : '조회 중 오류가 발생했습니다.')
    } finally {
      setSubmitting(false)
    }
  }, [name, supabase])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="education-lookup-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        aria-label="팝업 닫기"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-5 text-white">
          <p className="text-xs font-medium text-primary-100 uppercase tracking-wide">Education</p>
          <h2 id="education-lookup-title" className="mt-1 text-xl sm:text-2xl font-bold">
            최종 교육대상자 명단 확인
          </h2>
          <p className="mt-2 text-sm text-primary-100">
            접수 진행중인 교육에 대해 본인 이름으로 상태를 확인할 수 있습니다.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800" htmlFor="education-lookup-name">
              이름
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="education-lookup-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') void submit()
                }}
                placeholder="예) 홍길동"
                className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
              />
              <button
                type="button"
                onClick={() => void submit()}
                disabled={submitting}
                className="rounded-xl bg-primary-600 px-5 py-3 text-white font-semibold hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? '조회 중…' : '조회'}
              </button>
            </div>
            <p className="text-xs text-gray-500">
              동일 이름이 있을 경우 결과가 여러 개 표시될 수 있습니다.
            </p>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {rows && (
            <div className="space-y-3">
              {rows.length === 0 ? (
                <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm text-gray-700">
                  입력한 이름으로 조회되는 접수 정보가 없습니다.
                </div>
              ) : (
                <ul className="space-y-3">
                  {rows.map((r) => {
                    const message = statusMap[r.status] ?? '상태를 확인해 주세요.'
                    return (
                      <li key={r.id} className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div className="min-w-0">
                            {r.education_title ? (
                              <p className="text-sm text-gray-500">교육: {r.education_title}</p>
                            ) : null}
                            <p className="text-gray-900 font-semibold leading-snug">
                              {r.name} 님<br />
                              {message}
                            </p>
                          </div>
                          <span
                            className={`shrink-0 inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ${badgeClasses(
                              r.status,
                            )}`}
                          >
                            {r.status}
                          </span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}

