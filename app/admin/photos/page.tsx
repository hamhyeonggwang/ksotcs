'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { getSupabaseAuthClient } from '@/lib/supabaseAdminClient'
import { errorMessage, type ActivityPhotoRow } from '@/lib/adminTypes'
import { uploadPublicFile, removePublicFileByUrl } from '@/lib/adminStorage'
import FileDropzone from '@/components/admin/FileDropzone'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import { useToast } from '@/components/admin/Toast'

const BUCKET = 'activity-photos'

export default function AdminPhotosPage() {
  const supabase = getSupabaseAuthClient()
  const { showToast } = useToast()

  const [rows, setRows] = useState<ActivityPhotoRow[] | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  // 업로드 폼
  const [caption, setCaption] = useState('')
  const [uploading, setUploading] = useState(false)

  // 캡션 인라인 편집
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingCaption, setEditingCaption] = useState('')

  // 삭제 확인
  const [deleteTarget, setDeleteTarget] = useState<ActivityPhotoRow | null>(null)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    if (!supabase) return
    setLoadError(null)
    const { data, error } = await supabase
      .from('activity_photos')
      .select('id,image_url,caption,created_at')
      .order('created_at', { ascending: false })
      .limit(200)
    if (error) {
      setLoadError(error.message)
      return
    }
    setRows((data ?? []) as ActivityPhotoRow[])
  }, [supabase])

  useEffect(() => {
    void load()
  }, [load])

  const upload = useCallback(
    async (file: File) => {
      if (!supabase) return
      setUploading(true)
      try {
        const imageUrl = await uploadPublicFile(supabase, BUCKET, file)
        const { error } = await supabase
          .from('activity_photos')
          .insert({ image_url: imageUrl, caption: caption.trim() || null })
        if (error) throw error
        showToast('success', '사진이 업로드되었습니다.')
        setCaption('')
        await load()
      } catch (e: unknown) {
        showToast('error', errorMessage(e, '업로드 중 오류가 발생했습니다.'))
      } finally {
        setUploading(false)
      }
    },
    [supabase, caption, showToast, load],
  )

  const saveCaption = useCallback(async () => {
    if (!supabase || !editingId) return
    const { error } = await supabase
      .from('activity_photos')
      .update({ caption: editingCaption.trim() || null })
      .eq('id', editingId)
    if (error) {
      showToast('error', errorMessage(error, '수정 중 오류가 발생했습니다.'))
      return
    }
    showToast('success', '캡션이 수정되었습니다.')
    setEditingId(null)
    await load()
  }, [supabase, editingId, editingCaption, showToast, load])

  const remove = useCallback(async () => {
    if (!supabase || !deleteTarget) return
    setDeleting(true)
    try {
      const { error } = await supabase.from('activity_photos').delete().eq('id', deleteTarget.id)
      if (error) throw error
      await removePublicFileByUrl(supabase, BUCKET, deleteTarget.image_url).catch(() => undefined)
      showToast('success', '사진이 삭제되었습니다.')
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
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">활동사진 관리</h1>
        <p className="mt-2 text-gray-600">업로드한 사진은 학회소식 페이지의 활동 사진 섹션에 표시됩니다.</p>
      </div>

      {/* 업로드 폼 */}
      <section className="rounded-2xl bg-white shadow-md ring-1 ring-black/5 p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">새 사진 업로드</h2>
        <div>
          <label htmlFor="photo-caption" className="block text-sm font-semibold text-gray-700 mb-1.5">
            캡션 (선택)
          </label>
          <input
            id="photo-caption"
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="예: 2026 춘계학술대회 단체사진"
          />
        </div>

        <FileDropzone
          accept="image/*"
          allowedExtensions={['jpg', 'jpeg', 'png', 'webp', 'gif']}
          maxSizeMb={10}
          label="사진을 끌어다 놓거나 클릭해서 선택 (선택 즉시 업로드됩니다)"
          uploading={uploading}
          onFileSelected={(f) => void upload(f)}
        />
      </section>

      {/* 목록 */}
      <section className="rounded-2xl bg-white shadow-md ring-1 ring-black/5 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/80 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">등록된 사진</h2>
          <p className="text-sm text-gray-500">{rows ? `총 ${rows.length}장` : ''}</p>
        </div>

        {loadError ? (
          <p className="p-6 text-sm text-red-600">목록을 불러오지 못했습니다: {loadError}</p>
        ) : rows === null ? (
          <p className="p-6 text-sm text-gray-500">불러오는 중...</p>
        ) : rows.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">등록된 사진이 없습니다.</p>
        ) : (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rows.map((p) => (
              <figure key={p.id} className="rounded-xl border border-gray-100 bg-gray-50 overflow-hidden shadow-sm">
                <div className="relative aspect-[4/3] w-full bg-gray-200">
                  <Image
                    src={p.image_url}
                    alt={p.caption ?? '학회 활동 사진'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <figcaption className="px-4 py-3 space-y-2">
                  {editingId === p.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingCaption}
                        onChange={(e) => setEditingCaption(e.target.value)}
                        className="flex-1 min-w-0 rounded-lg border border-gray-300 px-2 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="캡션"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={saveCaption}
                        className="rounded-lg bg-primary-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-primary-700"
                      >
                        저장
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                      >
                        취소
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-gray-700 leading-relaxed min-h-[1.25rem]">
                        {p.caption ?? <span className="text-gray-400">캡션 없음</span>}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-400">{new Date(p.created_at).toLocaleDateString('ko-KR')}</p>
                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingId(p.id)
                              setEditingCaption(p.caption ?? '')
                            }}
                            className="rounded-lg border border-primary-200 px-2.5 py-1 text-xs font-semibold text-primary-700 hover:bg-primary-50"
                          >
                            캡션 수정
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(p)}
                            className="rounded-lg border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="사진을 삭제할까요?"
        description="사진 파일과 캡션이 함께 삭제됩니다. 되돌릴 수 없습니다."
        busy={deleting}
        onConfirm={remove}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
