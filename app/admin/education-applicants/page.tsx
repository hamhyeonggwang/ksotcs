'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { getSupabaseAuthClient } from '@/lib/supabaseAdminClient'
import { errorMessage, APPLICANT_STATUS_OPTIONS, type EducationApplicantRow } from '@/lib/adminTypes'
import { parseApplicantsCsv, type ParsedApplicantRow } from '@/lib/csv'
import FileDropzone from '@/components/admin/FileDropzone'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import { useToast } from '@/components/admin/Toast'

type PreviewRow = ParsedApplicantRow & {
  status: string
  match: 'new' | 'update'
  existingId?: string
}

const DEFAULT_STATUS = 'selected'
const INSERT_CHUNK_SIZE = 200
const UPDATE_CHUNK_SIZE = 10

function normalize(v: string) {
  return v.trim().toLowerCase()
}

async function runInChunks<T>(items: T[], size: number, fn: (chunk: T[]) => Promise<void>) {
  for (let i = 0; i < items.length; i += size) {
    await fn(items.slice(i, i + size))
  }
}

function statusLabel(status: string): string {
  return APPLICANT_STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status
}

const inputClass =
  'w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500'

export default function AdminEducationApplicantsPage() {
  const supabase = getSupabaseAuthClient()
  const { showToast } = useToast()

  const [scheduleEducationNames, setScheduleEducationNames] = useState<string[]>([])
  const [educationName, setEducationName] = useState('')
  const [defaultStatus, setDefaultStatus] = useState(DEFAULT_STATUS)
  const [markCurrent, setMarkCurrent] = useState(true)

  const [preview, setPreview] = useState<PreviewRow[] | null>(null)
  const [skipped, setSkipped] = useState<{ line: number; reason: string }[]>([])
  const [parsing, setParsing] = useState(false)
  const [parseError, setParseError] = useState<string | null>(null)
  const [registering, setRegistering] = useState(false)

  const [rows, setRows] = useState<EducationApplicantRow[] | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [filterEducation, setFilterEducation] = useState('전체')
  const [filterStatus, setFilterStatus] = useState('전체')
  const [searchName, setSearchName] = useState('')

  const [deleteTarget, setDeleteTarget] = useState<EducationApplicantRow | null>(null)
  const [deleting, setDeleting] = useState(false)

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [bulkStatus, setBulkStatus] = useState(DEFAULT_STATUS)
  const [bulkApplying, setBulkApplying] = useState(false)

  const load = useCallback(async () => {
    if (!supabase) return
    setLoadError(null)
    const { data, error } = await supabase
      .from('education_applicants')
      .select('id,name,email,education_name,status,is_current,created_at,updated_at')
      .order('education_name', { ascending: true })
      .order('updated_at', { ascending: false })
    if (error) {
      setLoadError(error.message)
      return
    }
    setRows((data ?? []) as EducationApplicantRow[])
  }, [supabase])

  useEffect(() => {
    void load()
  }, [load])

  useEffect(() => {
    if (!supabase) return
    let cancelled = false
    supabase
      .from('education_schedules')
      .select('education_name')
      .then(({ data }) => {
        if (cancelled) return
        const names = Array.from(
          new Set(((data ?? []) as { education_name: string }[]).map((r) => r.education_name).filter(Boolean)),
        )
        setScheduleEducationNames(names)
      })
    return () => {
      cancelled = true
    }
  }, [supabase])

  const educationOptions = useMemo(() => {
    const fromRows = (rows ?? []).map((r) => r.education_name)
    return Array.from(new Set([...scheduleEducationNames, ...fromRows])).sort()
  }, [scheduleEducationNames, rows])

  const handleFile = useCallback(
    async (file: File) => {
      setParseError(null)
      setPreview(null)
      setSkipped([])

      const eduName = educationName.trim()
      if (!eduName) {
        setParseError('먼저 교육명을 입력해 주세요.')
        return
      }
      if (!supabase) {
        setParseError('Supabase 설정이 필요합니다. (.env.local의 키를 확인해 주세요)')
        return
      }

      setParsing(true)
      try {
        const text = await file.text()
        const { rows: parsed, skipped: skippedRows } = parseApplicantsCsv(text)
        setSkipped(skippedRows)

        if (parsed.length === 0) {
          setParseError('등록할 행이 없습니다. CSV 내용을 확인해 주세요.')
          return
        }

        const { data: existing, error } = await supabase
          .from('education_applicants')
          .select('id,name,email')
          .eq('education_name', eduName)
        if (error) throw error

        const byEmail = new Map<string, EducationApplicantRow>()
        const byName = new Map<string, EducationApplicantRow>()
        for (const r of (existing ?? []) as EducationApplicantRow[]) {
          if (r.email) byEmail.set(normalize(r.email), r)
          byName.set(normalize(r.name), r)
        }

        // CSV 내부에 같은 사람이 여러 줄 있는 경우도 "갱신"으로 인식하도록 처리
        const seenInFile = new Map<string, PreviewRow>()
        const previewRows: PreviewRow[] = []

        for (const p of parsed) {
          const key = p.email ? `e:${normalize(p.email)}` : `n:${normalize(p.name)}`
          const matchedExisting = p.email ? byEmail.get(normalize(p.email)) : byName.get(normalize(p.name))
          const alreadyInFile = seenInFile.get(key)

          const row: PreviewRow = {
            ...p,
            status: defaultStatus,
            match: matchedExisting || alreadyInFile ? 'update' : 'new',
            existingId: matchedExisting?.id ?? alreadyInFile?.existingId,
          }
          seenInFile.set(key, row)
          previewRows.push(row)
        }

        setPreview(previewRows)
      } catch (e: unknown) {
        setParseError(errorMessage(e, 'CSV 처리 중 오류가 발생했습니다.'))
      } finally {
        setParsing(false)
      }
    },
    [educationName, defaultStatus, supabase],
  )

  const setPreviewStatus = useCallback((line: number, status: string) => {
    setPreview((prev) => (prev ? prev.map((r) => (r.line === line ? { ...r, status } : r)) : prev))
  }, [])

  const summary = useMemo(() => {
    if (!preview) return null
    const newCount = preview.filter((r) => r.match === 'new').length
    return { total: preview.length, newCount, updateCount: preview.length - newCount }
  }, [preview])

  const register = useCallback(async () => {
    if (!supabase || !preview || preview.length === 0) return
    const eduName = educationName.trim()
    setRegistering(true)
    try {
      // CSV 내부 중복 시 마지막 줄 값만 반영
      const byKey = new Map<string, PreviewRow>()
      for (const r of preview) {
        const key = r.existingId ? `id:${r.existingId}` : r.email ? `e:${normalize(r.email)}` : `n:${normalize(r.name)}`
        byKey.set(key, r)
      }
      const uniqueRows = Array.from(byKey.values())
      const toInsert = uniqueRows.filter((r) => r.match === 'new')
      const toUpdate = uniqueRows.filter((r) => r.match === 'update' && r.existingId)

      if (toInsert.length > 0) {
        await runInChunks(toInsert, INSERT_CHUNK_SIZE, async (chunk) => {
          const { error } = await supabase.from('education_applicants').insert(
            chunk.map((r) => ({
              name: r.name,
              email: r.email,
              education_name: eduName,
              status: r.status,
              is_current: markCurrent,
            })),
          )
          if (error) throw error
        })
      }

      if (toUpdate.length > 0) {
        await runInChunks(toUpdate, UPDATE_CHUNK_SIZE, async (chunk) => {
          await Promise.all(
            chunk.map(async (r) => {
              const { error } = await supabase
                .from('education_applicants')
                .update({ name: r.name, email: r.email, status: r.status, is_current: markCurrent })
                .eq('id', r.existingId as string)
              if (error) throw error
            }),
          )
        })
      }

      showToast('success', `총 ${uniqueRows.length}건 처리: 신규 ${toInsert.length}건 · 갱신 ${toUpdate.length}건`)
      setPreview(null)
      setSkipped([])
      await load()
    } catch (e: unknown) {
      showToast('error', errorMessage(e, '등록 중 오류가 발생했습니다.'))
    } finally {
      setRegistering(false)
    }
  }, [supabase, preview, educationName, markCurrent, showToast, load])

  const updateStatus = useCallback(
    async (row: EducationApplicantRow, status: string) => {
      if (!supabase) return
      const { error } = await supabase.from('education_applicants').update({ status }).eq('id', row.id)
      if (error) {
        showToast('error', errorMessage(error, '변경 중 오류가 발생했습니다.'))
        return
      }
      showToast('success', '상태가 변경되었습니다.')
      await load()
    },
    [supabase, showToast, load],
  )

  const toggleCurrent = useCallback(
    async (row: EducationApplicantRow) => {
      if (!supabase) return
      const { error } = await supabase
        .from('education_applicants')
        .update({ is_current: !row.is_current })
        .eq('id', row.id)
      if (error) {
        showToast('error', errorMessage(error, '변경 중 오류가 발생했습니다.'))
        return
      }
      showToast('success', row.is_current ? '현재 조회 대상에서 제외했습니다.' : '현재 조회 대상으로 설정했습니다.')
      await load()
    },
    [supabase, showToast, load],
  )

  const remove = useCallback(async () => {
    if (!supabase || !deleteTarget) return
    setDeleting(true)
    try {
      const { error } = await supabase.from('education_applicants').delete().eq('id', deleteTarget.id)
      if (error) throw error
      showToast('success', '삭제되었습니다.')
      setDeleteTarget(null)
      setSelectedIds((prev) => {
        if (!prev.has(deleteTarget.id)) return prev
        const next = new Set(prev)
        next.delete(deleteTarget.id)
        return next
      })
      await load()
    } catch (e: unknown) {
      showToast('error', errorMessage(e, '삭제 중 오류가 발생했습니다.'))
    } finally {
      setDeleting(false)
    }
  }, [supabase, deleteTarget, showToast, load])

  const rowEducationOptions = useMemo(
    () => Array.from(new Set((rows ?? []).map((r) => r.education_name))).sort(),
    [rows],
  )

  const visibleRows = useMemo(() => {
    if (!rows) return null
    const q = searchName.trim().toLowerCase()
    return rows.filter((r) => {
      if (filterEducation !== '전체' && r.education_name !== filterEducation) return false
      if (filterStatus !== '전체' && r.status !== filterStatus) return false
      if (q && !r.name.toLowerCase().includes(q)) return false
      return true
    })
  }, [rows, filterEducation, filterStatus, searchName])

  const toggleSelectOne = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const allVisibleSelected = useMemo(
    () => !!visibleRows && visibleRows.length > 0 && visibleRows.every((r) => selectedIds.has(r.id)),
    [visibleRows, selectedIds],
  )

  const toggleSelectAllVisible = useCallback(() => {
    if (!visibleRows || visibleRows.length === 0) return
    setSelectedIds((prev) => {
      const next = new Set(prev)
      const allSelected = visibleRows.every((r) => next.has(r.id))
      for (const r of visibleRows) {
        if (allSelected) next.delete(r.id)
        else next.add(r.id)
      }
      return next
    })
  }, [visibleRows])

  const applyBulkStatus = useCallback(async () => {
    if (!supabase || selectedIds.size === 0) return
    const ids = Array.from(selectedIds)
    setBulkApplying(true)
    try {
      await runInChunks(ids, INSERT_CHUNK_SIZE, async (chunk) => {
        const { error } = await supabase.from('education_applicants').update({ status: bulkStatus }).in('id', chunk)
        if (error) throw error
      })
      showToast('success', `${ids.length}건을 "${statusLabel(bulkStatus)}" 상태로 일괄 변경했습니다.`)
      setSelectedIds(new Set())
      await load()
    } catch (e: unknown) {
      showToast('error', errorMessage(e, '일괄 변경 중 오류가 발생했습니다.'))
    } finally {
      setBulkApplying(false)
    }
  }, [supabase, selectedIds, bulkStatus, showToast, load])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">교육대상자 명단 관리</h1>
        <p className="mt-2 text-gray-600">
          CSV(이름, 이메일)를 업로드하면 홈페이지 "최종 교육대상자 명단 확인"에서 이름으로 조회할 수 있습니다.
        </p>
      </div>

      {/* CSV 업로드 */}
      <section className="rounded-2xl bg-white shadow-md ring-1 ring-primary-100 p-6 space-y-5">
        <h2 className="text-lg font-bold text-gray-900">명단 업로드</h2>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label htmlFor="app-edu-name" className="block text-sm font-semibold text-gray-700 mb-1.5">
              교육명
            </label>
            <input
              id="app-edu-name"
              type="text"
              value={educationName}
              onChange={(e) => setEducationName(e.target.value)}
              className={inputClass}
              placeholder="예: 아동발달평가서 작성"
              list="app-edu-name-list"
            />
            <datalist id="app-edu-name-list">
              {educationOptions.map((n) => (
                <option key={n} value={n} />
              ))}
            </datalist>
          </div>
          <div>
            <label htmlFor="app-default-status" className="block text-sm font-semibold text-gray-700 mb-1.5">
              기본 상태 (업로드되는 모든 행에 적용)
            </label>
            <select
              id="app-default-status"
              value={defaultStatus}
              onChange={(e) => setDefaultStatus(e.target.value)}
              className={inputClass}
            >
              {APPLICANT_STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <input
            type="checkbox"
            checked={markCurrent}
            onChange={(e) => setMarkCurrent(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          홈페이지 조회에서 "현재 접수중인 교육"으로 표시
        </label>

        <FileDropzone
          accept=".csv,text/csv"
          allowedExtensions={['csv']}
          maxSizeMb={5}
          label="CSV 파일을 끌어다 놓거나 클릭해서 선택 (이름, 이메일 컬럼)"
          uploading={parsing}
          disabled={!educationName.trim()}
          onFileSelected={(file) => void handleFile(file)}
        />

        {parseError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {parseError}
          </div>
        )}

        {skipped.length > 0 && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {skipped.length}개 행을 건너뛰었습니다: {skipped.map((s) => `${s.line}행(${s.reason})`).join(', ')}
          </div>
        )}

        {preview && summary && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold text-gray-800">
                미리보기 {summary.total}건 · 신규 {summary.newCount}건 · 갱신 {summary.updateCount}건
              </p>
              <button
                type="button"
                onClick={() => void register()}
                disabled={registering}
                className="rounded-xl bg-primary-600 px-5 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors shadow-md disabled:opacity-60"
              >
                {registering ? '등록 중...' : `"${educationName.trim()}" 명단 등록`}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPreview(null)
                  setSkipped([])
                }}
                disabled={registering}
                className="rounded-xl border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
              >
                취소
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr className="text-left text-gray-600">
                    <th className="px-3 py-2 font-semibold">#</th>
                    <th className="px-3 py-2 font-semibold">이름</th>
                    <th className="px-3 py-2 font-semibold">이메일</th>
                    <th className="px-3 py-2 font-semibold">구분</th>
                    <th className="px-3 py-2 font-semibold">상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {preview.map((r) => (
                    <tr key={r.line}>
                      <td className="px-3 py-2 text-gray-500">{r.line}</td>
                      <td className="px-3 py-2 font-semibold text-gray-900">{r.name}</td>
                      <td className="px-3 py-2 text-gray-600">{r.email ?? '-'}</td>
                      <td className="px-3 py-2">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                            r.match === 'new' ? 'bg-sky-50 text-sky-700' : 'bg-emerald-50 text-emerald-700'
                          }`}
                        >
                          {r.match === 'new' ? '신규' : '갱신'}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <select
                          value={r.status}
                          onChange={(e) => setPreviewStatus(r.line, e.target.value)}
                          className="rounded-lg border border-gray-300 px-2 py-1 text-sm"
                        >
                          {APPLICANT_STATUS_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* 등록된 명단 */}
      <section className="rounded-2xl bg-white shadow-md ring-1 ring-black/5 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/80 flex flex-wrap items-center gap-3">
          <h2 className="text-lg font-bold text-gray-900 shrink-0">등록된 명단</h2>
          <select
            value={filterEducation}
            onChange={(e) => setFilterEducation(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
          >
            <option value="전체">전체 교육</option>
            {rowEducationOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
          >
            <option value="전체">전체 상태</option>
            {APPLICANT_STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="이름 검색"
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
          />
          <p className="text-sm text-gray-500 ml-auto">{visibleRows ? `총 ${visibleRows.length}건` : ''}</p>
        </div>

        {visibleRows && visibleRows.length > 0 && (
          <div className="px-6 py-3 border-b border-gray-100 bg-white flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={allVisibleSelected}
                onChange={toggleSelectAllVisible}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              전체 선택 (현재 목록 기준)
            </label>

            {selectedIds.size > 0 && (
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-gray-600">{selectedIds.size}건 선택됨</span>
                <select
                  value={bulkStatus}
                  onChange={(e) => setBulkStatus(e.target.value)}
                  className="rounded-lg border border-gray-300 px-2.5 py-1.5 text-sm"
                >
                  {APPLICANT_STATUS_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => void applyBulkStatus()}
                  disabled={bulkApplying}
                  className="rounded-lg bg-primary-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
                >
                  {bulkApplying ? '변경 중...' : '선택 항목 상태 일괄 변경'}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedIds(new Set())}
                  disabled={bulkApplying}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-60"
                >
                  선택 해제
                </button>
              </div>
            )}
          </div>
        )}

        {loadError ? (
          <p className="p-6 text-sm text-red-600">목록을 불러오지 못했습니다: {loadError}</p>
        ) : visibleRows === null ? (
          <p className="p-6 text-sm text-gray-500">불러오는 중...</p>
        ) : visibleRows.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">등록된 명단이 없습니다.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {visibleRows.map((row) => (
              <li key={row.id} className="px-6 py-4 flex flex-col lg:flex-row lg:items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedIds.has(row.id)}
                  onChange={() => toggleSelectOne(row.id)}
                  aria-label={`${row.name} 선택`}
                  className="h-4 w-4 shrink-0 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900">{row.name}</span>
                    {row.email && <span className="text-sm text-gray-500">{row.email}</span>}
                    {!row.is_current && (
                      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-500">
                        현재 조회 대상 아님
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{row.education_name}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={row.status}
                    onChange={(e) => void updateStatus(row, e.target.value)}
                    className="rounded-lg border border-gray-300 px-2.5 py-1.5 text-sm"
                    aria-label={`${row.name} 상태`}
                  >
                    {APPLICANT_STATUS_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => void toggleCurrent(row)}
                    className={`rounded-lg border px-3 py-1.5 text-sm font-semibold ${
                      row.is_current
                        ? 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        : 'border-green-200 text-green-700 hover:bg-green-50'
                    }`}
                  >
                    {row.is_current ? '현재 조회 제외' : '현재 조회로 설정'}
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
        title="명단에서 삭제할까요?"
        description={deleteTarget ? `"${deleteTarget.name}" (${deleteTarget.education_name}) 항목이 삭제됩니다.` : undefined}
        busy={deleting}
        onConfirm={remove}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}

