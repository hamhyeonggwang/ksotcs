'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'

/** 공지 내용을 바꿀 때마다 숫자를 올리면, ‘오늘 하루 안 보기’를 눌렀던 사용자도 새 공지를 다시 볼 수 있습니다. */
const POPUP_VERSION = '1'

const STORAGE_VERSION = 'ksotcs-notice-popup-version'
const STORAGE_HIDDEN_DAY = 'ksotcs-notice-popup-hidden-day'

function todayLocalDate(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export type NoticeItem = {
  id: string
  title: string
  body: string
  href?: string
  linkLabel?: string
}

/** 랜딩 팝업에 표시할 공지 목록 (필요 시 여기만 수정) */
export const NOTICE_POPUP_ITEMS: NoticeItem[] = [
  {
    id: 'welcome',
    title: '대한아동학교작업치료학회 홈페이지를 방문해 주셔서 감사합니다',
    body:
      '학회 소식·교육 일정·문의 등은 상단 메뉴에서 확인하실 수 있습니다. 자주 찾는 안내는 공지사항에도 올려 드릴 예정입니다.',
    href: '/news',
    linkLabel: '학회소식 보기',
  },
  {
    id: 'sample',
    title: '[안내] 팝업 공지 예시',
    body:
      '대한작업치료사협회(www.kaot.org) 메인처럼 중요 안내를 팝업으로 노출할 수 있습니다. 공지 문구는 components/NoticePopup.tsx의 NOTICE_POPUP_ITEMS만 수정하면 됩니다.',
    href: '/inquiry',
    linkLabel: '문의하기',
  },
]

export default function NoticePopup() {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    try {
      const ver = localStorage.getItem(STORAGE_VERSION)
      const hiddenDay = localStorage.getItem(STORAGE_HIDDEN_DAY)
      const today = todayLocalDate()

      if (ver !== POPUP_VERSION) {
        setOpen(true)
        return
      }
      if (hiddenDay === today) {
        setOpen(false)
        return
      }
      setOpen(true)
    } catch {
      setOpen(true)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const hideForToday = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_VERSION, POPUP_VERSION)
      localStorage.setItem(STORAGE_HIDDEN_DAY, todayLocalDate())
    } catch {
      /* ignore */
    }
    setOpen(false)
  }, [])

  const closeOnly = useCallback(() => {
    setOpen(false)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeOnly()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, closeOnly])

  if (!open || NOTICE_POPUP_ITEMS.length === 0) return null

  const total = NOTICE_POPUP_ITEMS.length
  const current = NOTICE_POPUP_ITEMS[index]!

  const goPrev = () => setIndex((i) => (i - 1 + total) % total)
  const goNext = () => setIndex((i) => (i + 1) % total)

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="notice-popup-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
        aria-label="팝업 배경 닫기"
        onClick={closeOnly}
      />
      <div className="relative w-full max-w-lg max-h-[85vh] flex flex-col rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-5 py-4 text-white shrink-0">
          <p className="text-xs font-medium uppercase tracking-wide text-primary-100">POPUP ZONE</p>
          <h2 id="notice-popup-title" className="text-lg font-bold mt-1">
            공지
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {total > 1 && (
            <div className="flex items-center justify-between gap-2 mb-3 text-sm text-gray-500">
              <button
                type="button"
                onClick={goPrev}
                className="rounded-lg px-2 py-1 hover:bg-primary-50 text-primary-700 font-medium"
              >
                이전
              </button>
              <span>
                {index + 1} / {total}
              </span>
              <button
                type="button"
                onClick={goNext}
                className="rounded-lg px-2 py-1 hover:bg-primary-50 text-primary-700 font-medium"
              >
                다음
              </button>
            </div>
          )}

          <h3 className="text-base font-bold text-gray-900 leading-snug">{current.title}</h3>
          <p className="mt-3 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{current.body}</p>

          {current.href && (
            <div className="mt-4">
              <Link
                href={current.href}
                className="inline-flex text-sm font-semibold text-primary-700 hover:text-primary-800 underline underline-offset-2"
                onClick={closeOnly}
              >
                {current.linkLabel ?? '자세히 보기'}
              </Link>
            </div>
          )}
        </div>

        {total > 1 && (
          <div className="flex justify-center gap-1.5 pb-3">
            {NOTICE_POPUP_ITEMS.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-6 bg-primary-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`공지 ${i + 1}번`}
              />
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 border-t border-gray-100 p-4 bg-gray-50/90 shrink-0">
          <button
            type="button"
            onClick={hideForToday}
            className="flex-1 rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            오늘 하루 열지 않기
          </button>
          <button
            type="button"
            onClick={closeOnly}
            className="flex-1 rounded-xl bg-primary-600 py-3 text-sm font-semibold text-white hover:bg-primary-700 transition-colors shadow-md"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}
