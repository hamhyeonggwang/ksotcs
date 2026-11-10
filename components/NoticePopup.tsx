'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { popupFingerprint, type PopupItem } from '@/lib/popupWindow'

const STORAGE_VERSION = 'ksotcs-notice-popup-version'
const STORAGE_HIDDEN_DAY = 'ksotcs-notice-popup-hidden-day'

function todayLocalDate(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
export default function NoticePopup({ items }: { items: PopupItem[] }) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const version = popupFingerprint(items)

  const closeOnly = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (items.length === 0) return
    try {
      const savedVersion = localStorage.getItem(STORAGE_VERSION)
      const hiddenDay = localStorage.getItem(STORAGE_HIDDEN_DAY)
      const today = todayLocalDate()

      if (savedVersion !== version) {
        setOpen(true)
        return
      }
      setOpen(hiddenDay !== today)
    } catch {
      setOpen(true)
    }
  }, [items.length, version])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const hideForToday = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_VERSION, version)
      localStorage.setItem(STORAGE_HIDDEN_DAY, todayLocalDate())
    } catch {
      // Storage may be unavailable in private browsing.
    }
    setOpen(false)
  }, [version])

  if (items.length === 0) return null

  const total = items.length
  const current = items[Math.min(index, total - 1)]!
  const goPrev = () => setIndex((value) => (value - 1 + total) % total)
  const goNext = () => setIndex((value) => (value + 1) % total)

  return (
    <dialog
      ref={dialogRef}
      className="dialog-native"
      aria-labelledby="notice-popup-title"
      onCancel={(event) => {
        event.preventDefault()
        closeOnly()
      }}
      onClose={closeOnly}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeOnly()
      }}
    >
      <div className="dialog-panel">
        <div className="dialog-panel__head">
          <h2 id="notice-popup-title">공지</h2>
        </div>

        <div className="dialog-panel__body notice-body">
          {total > 1 ? (
            <div className="notice-pagination" aria-label="공지 페이지 이동">
              <button type="button" className="secondary-action" onClick={goPrev}>이전</button>
              <span aria-live="polite">{index + 1} / {total}</span>
              <button type="button" className="secondary-action" onClick={goNext}>다음</button>
            </div>
          ) : null}

          <h3>{current.title}</h3>
          <p className="notice-copy">{current.body}</p>

          {current.link_href ? (
            <Link className="secondary-action" href={current.link_href} onClick={closeOnly}>
              {current.link_label ?? '내용 확인'}
            </Link>
          ) : null}

          {total > 1 ? (
            <div className="notice-pages" aria-label="공지 선택">
              {items.map((item, itemIndex) => (
                <button
                  key={item.id}
                  type="button"
                  aria-current={itemIndex === index ? 'page' : undefined}
                  onClick={() => setIndex(itemIndex)}
                >
                  {itemIndex + 1}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="dialog-panel__foot">
          <button type="button" className="secondary-action" onClick={hideForToday}>
            오늘 하루 열지 않기
          </button>
          <button type="button" className="primary-action" onClick={closeOnly}>
            닫기
          </button>
        </div>
      </div>
    </dialog>
  )
}
