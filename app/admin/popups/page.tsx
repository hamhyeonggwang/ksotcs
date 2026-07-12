'use client'

import { useCallback, useEffect, useState } from 'react'
import { getSupabaseAuthClient } from '@/lib/supabaseAdminClient'
import { errorMessage, type PopupRow } from '@/lib/adminTypes'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import { useToast } from '@/components/admin/Toast'

type PopupForm = {
  title: string
  body: string
  link_href: string
  link_label: string
  starts_at: string
  ends_at: string
  sort_order: string
  is_active: boolean
}

const EMPTY_FORM: PopupForm = {
  title: '',
  body: '',
  link_href: '',
  link_label: '',
  starts_at: '',
  ends_at: '',
  sort_order: '0',
  is_active: true,
}

function rowToForm(row: PopupRow): PopupForm {
  return {
    title: row.title,
    body: row.body,
    link_href: row.link_href ?? '',
    link_label: row.link_label ?? '',
    starts_at: row.starts_at ?? '',
    ends_at: row.ends_at ?? '',
    sort_order: String(row.sort_order),
    is_active: row.is_active,
  }
}

function formToPayload(form: PopupForm) {
  return {
    title: form.title.trim(),
    body: form.body.trim(),
    link_href: form.link_href.trim() || null,
    link_label: form.link_label.trim() || null,
    starts_at: form.starts_at || null,
    ends_at: form.ends_at || null,
    sort_order: Number.parseInt(form.sort_order, 10) || 0,
    is_active: form.is_active,
  }
}

/** 오늘 기준 노출 상태 요약 */
function exposureLabel(row: PopupRow): { text: string; tone: 'on' | 'off' | 'scheduled' } {
  if (!row.is_active) return { text: '비활성', tone: 'off' }
  const today = new Date().toISOString().slice(0, 10)
  if (row.starts_at && row.starts_at > today) return { text: `${row.starts_at}부터`, tone: 'scheduled' }
  if (row.ends_at && row.ends_at < today) return { text: '기간 종료', tone: 'off' }
  return { text: '노출 중', tone: 'on' }
}

export default function AdminPopupsPage() {
  const supabase = getSupabaseAuthClient()
  const { showToast } = useToast()

  const [rows, setRows] = useState<PopupRow[] | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  // 폼: editingId가 null이면 신규 작성
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<PopupForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  const [deleteTarget, setDeleteTarget] = useState<PopupRow | null>(null)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    if (!supabase) return
    setLoadError(null)
    const { data, error } = await supabase
      .from('popups')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true })
    if (error) {
      setLoadError(error.message)
      return
    }
    setRows((data ?? []) as PopupRow[])
  }, [supabase])

  useEffect(() => {
    void load()
  }, [load])

  const openCreate = useCallback(() => {
    setEditingId(null)
    setForm({ ...EMPTY_FORM, sort_order: String((rows?.length ?? 0) + 1) })
    setFormOpen(true)
  }, [rows])

  const openEdit = useCallback((row: PopupRow) => {
    setEditingId(row.id)
    setForm(rowToForm(row))
    setFormOpen(true)
  }, [])

  const save = useCallback(async () => {
    if (!supabase) return
    const payload = formToPayload(form)
    if (!payload.title || !payload.body) {
      showToast('error', '제목과 내용을 입력해 주세요.')
      return
    }
    if (payload.starts_at && payload.ends_at && payload.starts_at > payload.ends_at) {
      showToast('error', '노출 종료일이 시작일보다 빠릅니다.')
      return
    }
    setSaving(true)
    try {
      if (editingId) {
        const { error } = await supabase.from('popups').update(payload).eq('id', editingId)
        if (error) throw error
        showToast('success', '팝업이 수정되었습니다.')
      } else {
        const { error } = await supabase.from('popups').insert(payload)
        if (error) throw error
        showToast('success', '팝업이 등록되었습니다.')
      }
      setFormOpen(false)
      await load()
    } catch (e: unknown) {
      showToast('error', errorMessage(e, '저장 중 오류가 발생했습니다.'))
    } finally {
      setSaving(false)
    }
  }, [supabase, form, editingId, showToast, load])

  const toggleActive = useCallback(
    async (row: PopupRow) => {
      if (!supabase) return
      const { error } = await supabase.from('popups').update({ is_active: !row.is_active }).eq('id', row.id)
      if (error) {
        showToast('error', errorMessage(error, '변경 중 오류가 발생했습니다.'))
        return
      }
      showToast('success', row.is_active ? '팝업을 비활성화했습니다.' : '팝업을 활성화했습니다.')
      await load()
    },
    [supabase, showToast, load],
  )

  const remove = useCallback(async () => {
    if (!supabase || !deleteTarget) return
    setDeleting(true)
    try {
      const { error } = await supabase.from('popups').delete().eq('id', deleteTarget.id)
      if (error) throw error
      showToast('success', '팝업이 삭제되었습니다.')
      setDeleteTarget(null)
      await load()
    } catch (e: unknown) {
      showToast('error', errorMessage(e, '삭제 중 오류가 발생했습니다.'))
    } finally {
      setDeleting(false)
    }
  }, [supabase, deleteTarget, showToast, load])

  const setField = useCallback(<K extends keyof PopupForm>(key: K, value: PopupForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">팝업 관리</h1>
          <p className="mt-2 text-gray-600">
            홈 화면에 뜨는 팝업 공지입니다. 내용을 수정하면 &lsquo;오늘 하루 열지 않기&rsquo;를 누른 방문자에게도 다시
            표시됩니다.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="shrink-0 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors shadow-md"
        >
          새 팝업 만들기
        </button>
      </div>

      {/* 작성/수정 폼 */}
      {formOpen && (
        <section className="rounded-2xl bg-white shadow-md ring-1 ring-primary-100 p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-900">{editingId ? '팝업 수정' : '새 팝업'}</h2>

          <div>
            <label htmlFor="popup-title" className="block text-sm font-semibold text-gray-700 mb-1.5">
              제목
            </label>
            <input
              id="popup-title"
              type="text"
              value={form.title}
              onChange={(e) => setField('title', e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="예: [안내] 2026 춘계학술대회 사전등록"
            />
          </div>

          <div>
            <label htmlFor="popup-body" className="block text-sm font-semibold text-gray-700 mb-1.5">
              내용
            </label>
            <textarea
              id="popup-body"
              value={form.body}
              onChange={(e) => setField('body', e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="팝업에 표시할 안내 문구"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="popup-link" className="block text-sm font-semibold text-gray-700 mb-1.5">
                링크 주소 (선택)
              </label>
              <input
                id="popup-link"
                type="text"
                value={form.link_href}
                onChange={(e) => setField('link_href', e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="예: /news 또는 https://..."
              />
            </div>
            <div>
              <label htmlFor="popup-link-label" className="block text-sm font-semibold text-gray-700 mb-1.5">
                링크 버튼 문구 (선택)
              </label>
              <input
                id="popup-link-label"
                type="text"
                value={form.link_label}
                onChange={(e) => setField('link_label', e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="예: 자세히 보기"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="popup-starts" className="block text-sm font-semibold text-gray-700 mb-1.5">
                노출 시작일 (비우면 즉시)
              </label>
              <input
                id="popup-starts"
                type="date"
                value={form.starts_at}
                onChange={(e) => setField('starts_at', e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label htmlFor="popup-ends" className="block text-sm font-semibold text-gray-700 mb-1.5">
                노출 종료일 (비우면 무기한)
              </label>
              <input
                id="popup-ends"
                type="date"
                value={form.ends_at}
                onChange={(e) => setField('ends_at', e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label htmlFor="popup-order" className="block text-sm font-semibold text-gray-700 mb-1.5">
                표시 순서 (작을수록 먼저)
              </label>
              <input
                id="popup-order"
                type="number"
                value={form.sort_order}
                onChange={(e) => setField('sort_order', e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => setField('is_active', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            활성화 (체크 해제 시 기간과 무관하게 숨김)
          </label>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors shadow-md disabled:opacity-60"
            >
              {saving ? '저장 중...' : editingId ? '수정 저장' : '팝업 등록'}
            </button>
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              disabled={saving}
              className="rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60"
            >
              취소
            </button>
          </div>
        </section>
      )}

      {/* 목록 */}
      <section className="rounded-2xl bg-white shadow-md ring-1 ring-black/5 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/80 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">등록된 팝업</h2>
          <p className="text-sm text-gray-500">{rows ? `총 ${rows.length}건` : ''}</p>
        </div>

        {loadError ? (
          <p className="p-6 text-sm text-red-600">목록을 불러오지 못했습니다: {loadError}</p>
        ) : rows === null ? (
          <p className="p-6 text-sm text-gray-500">불러오는 중...</p>
        ) : rows.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">등록된 팝업이 없습니다. &lsquo;새 팝업 만들기&rsquo;로 시작하세요.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {rows.map((row) => {
              const exposure = exposureLabel(row)
              return (
                <li key={row.id} className="px-6 py-4 flex flex-col lg:flex-row lg:items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          exposure.tone === 'on'
                            ? 'bg-green-100 text-green-700'
                            : exposure.tone === 'scheduled'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {exposure.text}
                      </span>
                      <span className="text-xs text-gray-400">순서 {row.sort_order}</span>
                      {(row.starts_at || row.ends_at) && (
                        <span className="text-xs text-gray-400">
                          {row.starts_at ?? '즉시'} ~ {row.ends_at ?? '무기한'}
                        </span>
                      )}
                    </div>
                    <p className="font-semibold text-gray-900 leading-snug mt-1">{row.title}</p>
                    <p className="text-sm text-gray-500 truncate mt-0.5">{row.body}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => void toggleActive(row)}
                      className={`rounded-lg border px-3 py-1.5 text-sm font-semibold ${
                        row.is_active
                          ? 'border-gray-200 text-gray-600 hover:bg-gray-50'
                          : 'border-green-200 text-green-700 hover:bg-green-50'
                      }`}
                    >
                      {row.is_active ? '숨기기' : '활성화'}
                    </button>
                    <button
                      type="button"
                      onClick={() => openEdit(row)}
                      className="rounded-lg border border-primary-200 px-3 py-1.5 text-sm font-semibold text-primary-700 hover:bg-primary-50"
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(row)}
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      삭제
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="팝업을 삭제할까요?"
        description={deleteTarget ? `"${deleteTarget.title}" 팝업이 삭제됩니다. 잠시 숨기려면 '숨기기'를 사용하세요.` : undefined}
        busy={deleting}
        onConfirm={remove}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
