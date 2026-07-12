'use client'

import { useCallback, useEffect, useState } from 'react'
import { getSupabaseAuthClient } from '@/lib/supabaseAdminClient'
import { errorMessage, type NoticeRow } from '@/lib/adminTypes'
import { uploadPublicFile, removePublicFileByUrl } from '@/lib/adminStorage'
import FileDropzone from '@/components/admin/FileDropzone'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import { useToast } from '@/components/admin/Toast'

const BUCKET = 'notice-pdfs'

export default function AdminNoticesPage() {
  const supabase = getSupabaseAuthClient()
  const { showToast } = useToast()

  const [rows, setRows] = useState<NoticeRow[] | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  // 등록 폼
  const [title, setTitle] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)

  // 제목 인라인 편집
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')

  // 삭제 확인
  const [deleteTarget, setDeleteTarget] = useState<NoticeRow | null>(null)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    if (!supabase) return
    setLoadError(null)
    const { data, error } = await supabase
      .from('notices')
      .select('id,title,pdf_url,created_at')
      .order('created_at', { ascending: false })
      .limit(200)
    if (error) {
      setLoadError(error.message)
      return
    }
    setRows((data ?? []) as NoticeRow[])
  }, [supabase])

  useEffect(() => {
    void load()
  }, [load])

  const create = useCallback(async () => {
    if (!supabase) return
    const t = title.trim()
    if (!t) {
      showToast('error', '공문 제목을 입력해 주세요.')
      return
    }
    if (!file) {
      showToast('error', 'PDF 파일을 선택해 주세요.')
      return
    }
    setSaving(true)
    try {
      const pdfUrl = await uploadPublicFile(supabase, BUCKET, file)
      const { error } = await supabase.from('notices').insert({ title: t, pdf_url: pdfUrl })
      if (error) throw error
      showToast('success', '교육공문이 등록되었습니다.')
      setTitle('')
      setFile(null)
      await load()
    } catch (e: unknown) {
      showToast('error', errorMessage(e, '등록 중 오류가 발생했습니다.'))
    } finally {
      setSaving(false)
    }
  }, [supabase, title, file, showToast, load])

  const saveTitle = useCallback(async () => {
    if (!supabase || !editingId) return
    const t = editingTitle.trim()
    if (!t) {
      showToast('error', '제목을 입력해 주세요.')
      return
    }
    const { error } = await supabase.from('notices').update({ title: t }).eq('id', editingId)
    if (error) {
      showToast('error', errorMessage(error, '수정 중 오류가 발생했습니다.'))
      return
    }
    showToast('success', '제목이 수정되었습니다.')
    setEditingId(null)
    await load()
  }, [supabase, editingId, editingTitle, showToast, load])

  const remove = useCallback(async () => {
    if (!supabase || !deleteTarget) return
    setDeleting(true)
    try {
      const { error } = await supabase.from('notices').delete().eq('id', deleteTarget.id)
      if (error) throw error
      await removePublicFileByUrl(supabase, BUCKET, deleteTarget.pdf_url).catch(() => undefined)
      showToast('success', '교육공문이 삭제되었습니다.')
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
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">교육공문 관리</h1>
        <p className="mt-2 text-gray-600">등록한 공문은 학회소식 페이지에 바로 표시됩니다.</p>
      </div>

      {/* 등록 폼 */}
      <section className="rounded-2xl bg-white shadow-md ring-1 ring-black/5 p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">새 공문 등록</h2>
        <div>
          <label htmlFor="notice-title" className="block text-sm font-semibold text-gray-700 mb-1.5">
            공문 제목
          </label>
          <input
            id="notice-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="예: 2026년 아동발달평가사 교육 안내"
          />
        </div>

        <FileDropzone
          accept="application/pdf"
          allowedExtensions={['pdf']}
          maxSizeMb={20}
          label={file ? `선택됨: ${file.name}` : 'PDF 파일을 끌어다 놓거나 클릭해서 선택'}
          uploading={saving}
          onFileSelected={setFile}
        />

        <button
          type="button"
          onClick={create}
          disabled={saving}
          className="rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors shadow-md disabled:opacity-60"
        >
          {saving ? '등록 중...' : '공문 등록'}
        </button>
      </section>

      {/* 목록 */}
      <section className="rounded-2xl bg-white shadow-md ring-1 ring-black/5 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/80 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">등록된 공문</h2>
          <p className="text-sm text-gray-500">{rows ? `총 ${rows.length}건` : ''}</p>
        </div>

        {loadError ? (
          <p className="p-6 text-sm text-red-600">목록을 불러오지 못했습니다: {loadError}</p>
        ) : rows === null ? (
          <p className="p-6 text-sm text-gray-500">불러오는 중...</p>
        ) : rows.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">등록된 공문이 없습니다.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {rows.map((n) => (
              <li key={n.id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="min-w-0 flex-1">
                  {editingId === n.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={saveTitle}
                        className="rounded-lg bg-primary-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-primary-700"
                      >
                        저장
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                      >
                        취소
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="font-semibold text-gray-900 leading-snug">{n.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(n.created_at).toLocaleDateString('ko-KR')}
                      </p>
                    </>
                  )}
                </div>
                {editingId !== n.id && (
                  <div className="flex gap-2 shrink-0">
                    <a
                      href={n.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      PDF 보기
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(n.id)
                        setEditingTitle(n.title)
                      }}
                      className="rounded-lg border border-primary-200 px-3 py-1.5 text-sm font-semibold text-primary-700 hover:bg-primary-50"
                    >
                      제목 수정
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(n)}
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="공문을 삭제할까요?"
        description={deleteTarget ? `"${deleteTarget.title}" 공문과 PDF 파일이 삭제됩니다. 되돌릴 수 없습니다.` : undefined}
        busy={deleting}
        onConfirm={remove}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
