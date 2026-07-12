'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { getSupabaseAuthClient } from '@/lib/supabaseAdminClient'
import { errorMessage, type PostRow } from '@/lib/adminTypes'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import { useToast } from '@/components/admin/Toast'

type PostForm = {
  title: string
  body: string
  is_published: boolean
}

const EMPTY_FORM: PostForm = { title: '', body: '', is_published: true }

export default function AdminPostsPage() {
  const supabase = getSupabaseAuthClient()
  const { showToast } = useToast()

  const [rows, setRows] = useState<PostRow[] | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<PostForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  const [deleteTarget, setDeleteTarget] = useState<PostRow | null>(null)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    if (!supabase) return
    setLoadError(null)
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200)
    if (error) {
      setLoadError(error.message)
      return
    }
    setRows((data ?? []) as PostRow[])
  }, [supabase])

  useEffect(() => {
    void load()
  }, [load])

  const openCreate = useCallback(() => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setFormOpen(true)
  }, [])

  const openEdit = useCallback((row: PostRow) => {
    setEditingId(row.id)
    setForm({ title: row.title, body: row.body, is_published: row.is_published })
    setFormOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const save = useCallback(async () => {
    if (!supabase) return
    const title = form.title.trim()
    const body = form.body.trim()
    if (!title || !body) {
      showToast('error', '제목과 내용을 입력해 주세요.')
      return
    }
    setSaving(true)
    try {
      const payload = { title, body, is_published: form.is_published }
      if (editingId) {
        const { error } = await supabase.from('posts').update(payload).eq('id', editingId)
        if (error) throw error
        showToast('success', '공지글이 수정되었습니다.')
      } else {
        const { error } = await supabase.from('posts').insert(payload)
        if (error) throw error
        showToast('success', '공지글이 등록되었습니다.')
      }
      setFormOpen(false)
      await load()
    } catch (e: unknown) {
      showToast('error', errorMessage(e, '저장 중 오류가 발생했습니다.'))
    } finally {
      setSaving(false)
    }
  }, [supabase, form, editingId, showToast, load])

  const togglePublished = useCallback(
    async (row: PostRow) => {
      if (!supabase) return
      const { error } = await supabase.from('posts').update({ is_published: !row.is_published }).eq('id', row.id)
      if (error) {
        showToast('error', errorMessage(error, '변경 중 오류가 발생했습니다.'))
        return
      }
      showToast('success', row.is_published ? '공지글을 숨겼습니다.' : '공지글을 게시했습니다.')
      await load()
    },
    [supabase, showToast, load],
  )

  const remove = useCallback(async () => {
    if (!supabase || !deleteTarget) return
    setDeleting(true)
    try {
      const { error } = await supabase.from('posts').delete().eq('id', deleteTarget.id)
      if (error) throw error
      showToast('success', '공지글이 삭제되었습니다.')
      setDeleteTarget(null)
      await load()
    } catch (e: unknown) {
      showToast('error', errorMessage(e, '삭제 중 오류가 발생했습니다.'))
    } finally {
      setDeleting(false)
    }
  }, [supabase, deleteTarget, showToast, load])

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">공지 게시판 관리</h1>
          <p className="mt-2 text-gray-600">
            게시된 글은{' '}
            <Link href="/notices" className="text-primary-700 underline underline-offset-2" target="_blank">
              공지사항 페이지
            </Link>
            에 표시됩니다.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="shrink-0 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors shadow-md"
        >
          새 공지 작성
        </button>
      </div>

      {/* 작성/수정 폼 */}
      {formOpen && (
        <section className="rounded-2xl bg-white shadow-md ring-1 ring-primary-100 p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-900">{editingId ? '공지 수정' : '새 공지'}</h2>

          <div>
            <label htmlFor="post-title" className="block text-sm font-semibold text-gray-700 mb-1.5">
              제목
            </label>
            <input
              id="post-title"
              type="text"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="공지 제목"
            />
          </div>

          <div>
            <label htmlFor="post-body" className="block text-sm font-semibold text-gray-700 mb-1.5">
              내용
            </label>
            <textarea
              id="post-body"
              value={form.body}
              onChange={(e) => setForm((p) => ({ ...p, body: e.target.value }))}
              rows={10}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="공지 내용 (줄바꿈이 그대로 표시됩니다)"
            />
          </div>

          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={(e) => setForm((p) => ({ ...p, is_published: e.target.checked }))}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            바로 게시 (체크 해제 시 임시저장 상태)
          </label>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors shadow-md disabled:opacity-60"
            >
              {saving ? '저장 중...' : editingId ? '수정 저장' : '공지 등록'}
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
          <h2 className="text-lg font-bold text-gray-900">등록된 공지</h2>
          <p className="text-sm text-gray-500">{rows ? `총 ${rows.length}건` : ''}</p>
        </div>

        {loadError ? (
          <p className="p-6 text-sm text-red-600">목록을 불러오지 못했습니다: {loadError}</p>
        ) : rows === null ? (
          <p className="p-6 text-sm text-gray-500">불러오는 중...</p>
        ) : rows.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">등록된 공지가 없습니다. &lsquo;새 공지 작성&rsquo;으로 시작하세요.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {rows.map((row) => (
              <li key={row.id} className="px-6 py-4 flex flex-col lg:flex-row lg:items-center gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {!row.is_published && (
                      <span className="shrink-0 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-700">
                        임시저장
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      {new Date(row.created_at).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-900 leading-snug mt-1">{row.title}</p>
                  <p className="text-sm text-gray-500 truncate mt-0.5">{row.body}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => void togglePublished(row)}
                    className={`rounded-lg border px-3 py-1.5 text-sm font-semibold ${
                      row.is_published
                        ? 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        : 'border-green-200 text-green-700 hover:bg-green-50'
                    }`}
                  >
                    {row.is_published ? '숨기기' : '게시'}
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
            ))}
          </ul>
        )}
      </section>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="공지글을 삭제할까요?"
        description={deleteTarget ? `"${deleteTarget.title}" 글이 삭제됩니다. 잠시 숨기려면 '숨기기'를 사용하세요.` : undefined}
        busy={deleting}
        onConfirm={remove}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
