'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { popupFingerprint, type PopupItem } from '@/lib/popupWindow'

const STORAGE_VERSION = 'ksotcs-notice-popup-version'
const STORAGE_HIDDEN_DAY = 'ksotcs-notice-popup-hidden-day'

function todayLocalDate(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/**
 * 랜딩 팝업. 항목은 관리자 대시보드(/admin/popups)에서 관리하며 서버에서 조회해 props로 전달됩니다.
 * '오늘 하루 안 보기' 버전은 항목 지문(id:updated_at)으로 자동 계산되어,
 * 팝업 내용이 바뀌면 숨김이 자동 해제됩니다.
 */
export default function NoticePopup({ items }: { items: PopupItem[] }) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const version = popupFingerprint(items)

  useEffect(() => {
    if (items.length === 0) return
    try {
      const ver = localStorage.getItem(STORAGE_VERSION)
      const hiddenDay = localStorage.getItem(STORAGE_HIDDEN_DAY)
      const today = todayLocalDate()

      if (ver !== version) {
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
  }, [items.length, version])

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
      localStorage.setItem(STORAGE_VERSION, version)
      localStorage.setItem(STORAGE_HIDDEN_DAY, todayLocalDate())
    } catch {
      /* ignore */
    }
    setOpen(false)
  }, [version])

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

  if (!open || items.length === 0) return null

  const total = items.length
  const current = items[Math.min(index, total - 1)]!

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

          {current.link_href && (
            <div className="mt-4">
              <Link
                href={current.link_href}
                className="inline-flex text-sm font-semibold text-primary-700 hover:text-primary-800 underline underline-offset-2"
                onClick={closeOnly}
              >
                {current.link_label ?? '자세히 보기'}
              </Link>
            </div>
          )}
        </div>

        {total > 1 && (
          <div className="flex justify-center gap-1.5 pb-3">
            {items.map((item, i) => (
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
