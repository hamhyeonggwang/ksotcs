'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { getSupabaseAuthClient } from '@/lib/supabaseAdminClient'
import { errorMessage, type EducationScheduleRow } from '@/lib/adminTypes'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import { useToast } from '@/components/admin/Toast'

type ScheduleForm = {
  year: string
  month: string
  period: string
  course_name: string
  education_name: string
  education_time: string
  instructor: string
  location: string
  director: string
  method: string
  target: string
  category: string
  sort_order: string
  is_visible: boolean
}

const CURRENT_YEAR = new Date().getFullYear()

const EMPTY_FORM: ScheduleForm = {
  year: String(CURRENT_YEAR),
  month: '3',
  period: '',
  course_name: '',
  education_name: '',
  education_time: '',
  instructor: '',
  location: '',
  director: '',
  method: '',
  target: '',
  category: '',
  sort_order: '0',
  is_visible: true,
}

function rowToForm(row: EducationScheduleRow): ScheduleForm {
  return {
    year: String(row.year),
    month: String(row.month),
    period: row.period,
    course_name: row.course_name,
    education_name: row.education_name,
    education_time: row.education_time,
    instructor: row.instructor ?? '',
    location: row.location ?? '',
    director: row.director,
    method: row.method,
    target: row.target,
    category: row.category,
    sort_order: String(row.sort_order),
    is_visible: row.is_visible,
  }
}

function formToPayload(form: ScheduleForm) {
  return {
    year: Number.parseInt(form.year, 10) || CURRENT_YEAR,
    month: Number.parseInt(form.month, 10) || 1,
    period: form.period.trim(),
    course_name: form.course_name.trim(),
    education_name: form.education_name.trim(),
    education_time: form.education_time.trim(),
    instructor: form.instructor.trim() || null,
    location: form.location.trim() || null,
    director: form.director.trim(),
    method: form.method.trim(),
    target: form.target.trim(),
    category: form.category.trim(),
    sort_order: Number.parseInt(form.sort_order, 10) || 0,
    is_visible: form.is_visible,
  }
}

const inputClass =
  'w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500'

export default function AdminSchedulesPage() {
  const supabase = getSupabaseAuthClient()
  const { showToast } = useToast()

  const [rows, setRows] = useState<EducationScheduleRow[] | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [yearFilter, setYearFilter] = useState<number | '전체'>('전체')

  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<ScheduleForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  const [deleteTarget, setDeleteTarget] = useState<EducationScheduleRow | null>(null)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    if (!supabase) return
    setLoadError(null)
    const { data, error } = await supabase
      .from('education_schedules')
      .select('*')
      .order('year', { ascending: false })
      .order('month', { ascending: true })
      .order('sort_order', { ascending: true })
    if (error) {
      setLoadError(error.message)
      return
    }
    setRows((data ?? []) as EducationScheduleRow[])
  }, [supabase])

  useEffect(() => {
    void load()
  }, [load])

  const years = useMemo(() => {
    const unique = Array.from(new Set((rows ?? []).map((r) => r.year))).sort((a, b) => b - a)
    return unique
  }, [rows])

  const visibleRows = useMemo(() => {
    if (!rows) return null
    return yearFilter === '전체' ? rows : rows.filter((r) => r.year === yearFilter)
  }, [rows, yearFilter])

  const openCreate = useCallback(() => {
    setEditingId(null)
    setForm({ ...EMPTY_FORM, sort_order: String((rows?.length ?? 0) + 1) })
    setFormOpen(true)
  }, [rows])

  const openEdit = useCallback((row: EducationScheduleRow) => {
    setEditingId(row.id)
    setForm(rowToForm(row))
    setFormOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const save = useCallback(async () => {
    if (!supabase) return
    const payload = formToPayload(form)
    if (!payload.period || !payload.course_name || !payload.education_name || !payload.category) {
      showToast('error', '교육시기·자격교육과정명·교육명·교육과정 분류는 필수입니다.')
      return
    }
    if (payload.month < 1 || payload.month > 12) {
      showToast('error', '월은 1~12 사이여야 합니다.')
      return
    }
    setSaving(true)
    try {
      if (editingId) {
        const { error } = await supabase.from('education_schedules').update(payload).eq('id', editingId)
        if (error) throw error
        showToast('success', '교육일정이 수정되었습니다.')
      } else {
        const { error } = await supabase.from('education_schedules').insert(payload)
        if (error) throw error
        showToast('success', '교육일정이 등록되었습니다.')
      }
      setFormOpen(false)
      await load()
    } catch (e: unknown) {
      showToast('error', errorMessage(e, '저장 중 오류가 발생했습니다.'))
    } finally {
      setSaving(false)
    }
  }, [supabase, form, editingId, showToast, load])

  const toggleVisible = useCallback(
    async (row: EducationScheduleRow) => {
      if (!supabase) return
      const { error } = await supabase
        .from('education_schedules')
        .update({ is_visible: !row.is_visible })
        .eq('id', row.id)
      if (error) {
        showToast('error', errorMessage(error, '변경 중 오류가 발생했습니다.'))
        return
      }
      showToast('success', row.is_visible ? '일정을 숨겼습니다.' : '일정을 노출합니다.')
      await load()
    },
    [supabase, showToast, load],
  )

  const remove = useCallback(async () => {
    if (!supabase || !deleteTarget) return
    setDeleting(true)
    try {
      const { error } = await supabase.from('education_schedules').delete().eq('id', deleteTarget.id)
      if (error) throw error
      showToast('success', '교육일정이 삭제되었습니다.')
      setDeleteTarget(null)
      await load()
    } catch (e: unknown) {
      showToast('error', errorMessage(e, '삭제 중 오류가 발생했습니다.'))
    } finally {
      setDeleting(false)
    }
  }, [supabase, deleteTarget, showToast, load])

  const setField = useCallback(<K extends keyof ScheduleForm>(key: K, value: ScheduleForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">교육일정 관리</h1>
          <p className="mt-2 text-gray-600">연간교육일정 페이지에 표시되는 일정을 관리합니다.</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="shrink-0 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors shadow-md"
        >
          새 일정 추가
        </button>
      </div>

      {/* 작성/수정 폼 */}
      {formOpen && (
        <section className="rounded-2xl bg-white shadow-md ring-1 ring-primary-100 p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-900">{editingId ? '일정 수정' : '새 일정'}</h2>

          <div className="grid sm:grid-cols-4 gap-4">
            <div>
              <label htmlFor="sch-year" className="block text-sm font-semibold text-gray-700 mb-1.5">연도</label>
              <input id="sch-year" type="number" value={form.year} onChange={(e) => setField('year', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="sch-month" className="block text-sm font-semibold text-gray-700 mb-1.5">월 (1~12)</label>
              <input id="sch-month" type="number" min={1} max={12} value={form.month} onChange={(e) => setField('month', e.target.value)} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="sch-period" className="block text-sm font-semibold text-gray-700 mb-1.5">교육시기 (예: 3월28일, 5월말)</label>
              <input id="sch-period" type="text" value={form.period} onChange={(e) => setField('period', e.target.value)} className={inputClass} />
            </div>
          </div>

          <div>
            <label htmlFor="sch-course" className="block text-sm font-semibold text-gray-700 mb-1.5">자격교육과정명</label>
            <input id="sch-course" type="text" value={form.course_name} onChange={(e) => setField('course_name', e.target.value)} className={inputClass} placeholder="예: 아동발달평가사 1급 자격 교육" />
          </div>

          <div>
            <label htmlFor="sch-name" className="block text-sm font-semibold text-gray-700 mb-1.5">교육명</label>
            <input id="sch-name" type="text" value={form.education_name} onChange={(e) => setField('education_name', e.target.value)} className={inputClass} placeholder="예: 아동발달평가서 작성" />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="sch-time" className="block text-sm font-semibold text-gray-700 mb-1.5">교육시간</label>
              <input id="sch-time" type="text" value={form.education_time} onChange={(e) => setField('education_time', e.target.value)} className={inputClass} placeholder="예: 14:00-18:00, 16시간(2일)" />
            </div>
            <div>
              <label htmlFor="sch-method" className="block text-sm font-semibold text-gray-700 mb-1.5">교육방법</label>
              <input id="sch-method" type="text" value={form.method} onChange={(e) => setField('method', e.target.value)} className={inputClass} placeholder="예: 온라인실시간, 오프라인" />
            </div>
            <div>
              <label htmlFor="sch-target" className="block text-sm font-semibold text-gray-700 mb-1.5">교육대상자</label>
              <input id="sch-target" type="text" value={form.target} onChange={(e) => setField('target', e.target.value)} className={inputClass} placeholder="예: 임상가, 학생" />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="sch-instructor" className="block text-sm font-semibold text-gray-700 mb-1.5">강사 (선택)</label>
              <input id="sch-instructor" type="text" value={form.instructor} onChange={(e) => setField('instructor', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="sch-location" className="block text-sm font-semibold text-gray-700 mb-1.5">장소 (선택)</label>
              <input id="sch-location" type="text" value={form.location} onChange={(e) => setField('location', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="sch-director" className="block text-sm font-semibold text-gray-700 mb-1.5">담당자</label>
              <input id="sch-director" type="text" value={form.director} onChange={(e) => setField('director', e.target.value)} className={inputClass} />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="sch-category" className="block text-sm font-semibold text-gray-700 mb-1.5">교육과정 분류 (필터에 사용)</label>
              <input id="sch-category" type="text" value={form.category} onChange={(e) => setField('category', e.target.value)} className={inputClass} placeholder="예: 아동발달평가사" list="sch-category-list" />
              <datalist id="sch-category-list">
                {Array.from(new Set((rows ?? []).map((r) => r.category))).map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
            <div>
              <label htmlFor="sch-order" className="block text-sm font-semibold text-gray-700 mb-1.5">표시 순서 (같은 달 안에서)</label>
              <input id="sch-order" type="number" value={form.sort_order} onChange={(e) => setField('sort_order', e.target.value)} className={inputClass} />
            </div>
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <input
                  type="checkbox"
                  checked={form.is_visible}
                  onChange={(e) => setField('is_visible', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                공개 페이지에 노출
              </label>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors shadow-md disabled:opacity-60"
            >
              {saving ? '저장 중...' : editingId ? '수정 저장' : '일정 등록'}
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
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/80 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-gray-900">등록된 일정</h2>
          <div className="flex items-center gap-2">
            {years.length > 1 && (
              <div className="flex gap-1.5">
                {(['전체', ...years] as const).map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => setYearFilter(y)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
                      yearFilter === y ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {y === '전체' ? '전체' : `${y}년`}
                  </button>
                ))}
              </div>
            )}
            <p className="text-sm text-gray-500">{visibleRows ? `총 ${visibleRows.length}건` : ''}</p>
          </div>
        </div>

        {loadError ? (
          <p className="p-6 text-sm text-red-600">목록을 불러오지 못했습니다: {loadError}</p>
        ) : visibleRows === null ? (
          <p className="p-6 text-sm text-gray-500">불러오는 중...</p>
        ) : visibleRows.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">
            등록된 일정이 없습니다. Supabase 마이그레이션(0003)을 실행했다면 기존 일정 7건이 자동 등록됩니다.
          </p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {visibleRows.map((row) => (
              <li key={row.id} className="px-6 py-4 flex flex-col lg:flex-row lg:items-center gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="shrink-0 rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-semibold text-primary-700">
                      {row.year}년 {row.month}월
                    </span>
                    <span className="text-xs text-gray-400">{row.period}</span>
                    <span className="text-xs text-gray-400">{row.category}</span>
                    {!row.is_visible && (
                      <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-500">
                        숨김
                      </span>
                    )}
                  </div>
                  <p className="font-semibold text-gray-900 leading-snug mt-1">{row.education_name}</p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {row.course_name} · {row.education_time} · {row.method}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => void toggleVisible(row)}
                    className={`rounded-lg border px-3 py-1.5 text-sm font-semibold ${
                      row.is_visible
                        ? 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        : 'border-green-200 text-green-700 hover:bg-green-50'
                    }`}
                  >
                    {row.is_visible ? '숨기기' : '노출'}
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
        title="교육일정을 삭제할까요?"
        description={deleteTarget ? `"${deleteTarget.education_name}" 일정이 삭제됩니다. 잠시 숨기려면 '숨기기'를 사용하세요.` : undefined}
        busy={deleting}
        onConfirm={remove}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
