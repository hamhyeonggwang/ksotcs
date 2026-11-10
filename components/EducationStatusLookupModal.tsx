'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
  /** Supabase `education_applicants` — 기존 호환용 */
  education_title?: string | null
  /** Supabase에 추가하는 교육명 컬럼(권장: `education_name`) */
  education_name?: string | null
  updated_at?: string | null
  created_at?: string | null
}

function educationLabel(row: LookupRow): string | null {
  const v = row.education_name ?? row.education_title
  if (typeof v === 'string' && v.trim()) return v.trim()
  return null
}

const SELECT_APPLICANTS_WITH_EDU_NAME =
  'id,name,status,education_title,education_name,updated_at,created_at'
const SELECT_APPLICANTS_LEGACY = 'id,name,status,education_title,updated_at,created_at'

function errorMessage(err: unknown): string {
  if (err && typeof err === 'object' && 'message' in err) {
    return String((err as { message?: string }).message ?? '')
  }
  return typeof err === 'string' ? err : ''
}

function looksLikeMissingEducationNameColumn(err: unknown): boolean {
  const m = errorMessage(err).toLowerCase()
  return m.includes('education_name') && (m.includes('does not exist') || m.includes('schema cache'))
}

function normalizeName(input: string) {
  return input.replace(/\s+/g, ' ').trim()
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
  const dialogRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      requestAnimationFrame(() => inputRef.current?.focus())
    } else if (!open && dialog.open) {
      dialog.close()
    }
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
      const fetchApplicants = async (selectCols: string): Promise<LookupRow[]> => {
        const build = () =>
          supabase
            .from('education_applicants')
            .select(selectCols)
            .ilike('name', n)
            .order('updated_at', { ascending: false })
            .limit(10)

        // 1) “현재 접수 진행중인 교육”만 분리 컬럼이 있으면 우선 사용
        const { data: d1, error: e1 } = await build().eq('is_current', true)
        if (!e1) return ((d1 ?? []) as unknown) as LookupRow[]

        // 2) is_current 컬럼이 없거나 정책상 불가하면, 이름으로만 조회
        const { data: d2, error: e2 } = await build()
        if (e2) throw e2
        return ((d2 ?? []) as unknown) as LookupRow[]
      }

      try {
        setRows(await fetchApplicants(SELECT_APPLICANTS_WITH_EDU_NAME))
      } catch (e) {
        if (looksLikeMissingEducationNameColumn(e)) {
          setRows(await fetchApplicants(SELECT_APPLICANTS_LEGACY))
        } else {
          throw e
        }
      }
    } catch (e: any) {
      setError(typeof e?.message === 'string' ? e.message : '조회 중 오류가 발생했습니다.')
    } finally {
      setSubmitting(false)
    }
  }, [name, supabase])

  return (
    <dialog
      ref={dialogRef}
      className="dialog-native"
      aria-labelledby="education-lookup-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="dialog-panel">
        <div className="dialog-panel__head">
          <h2 id="education-lookup-title">
            최종 교육대상자 명단 확인
          </h2>
          <p>
            접수 진행중인 교육에 대해 본인 이름으로 상태를 확인할 수 있습니다.
          </p>
        </div>

        <div className="dialog-panel__body">
          <div className="field">
            <label htmlFor="education-lookup-name">
              이름
            </label>
            <div className="action-pair">
              <input
                ref={inputRef}
                id="education-lookup-name"
                name="education-lookup-name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') void submit()
                }}
                placeholder="이름"
                aria-invalid={Boolean(error)}
                aria-describedby="education-lookup-help"
              />
              <button
                type="button"
                onClick={() => void submit()}
                disabled={submitting}
                className="primary-action"
                aria-busy={submitting}
              >
                {submitting ? '조회 중…' : '조회'}
              </button>
            </div>
            <p id="education-lookup-help" className="field-help" aria-live="polite">
              {error ?? '동일 이름이 있을 경우 결과가 여러 개 표시될 수 있습니다.'}
            </p>
          </div>

          {rows && (
            <div className="lookup-results" aria-live="polite">
              {rows.length === 0 ? (
                <div className="paper-panel">
                  입력한 이름으로 조회되는 접수 정보가 없습니다.
                </div>
              ) : (
                <ul className="ruled-index">
                  {rows.map((r) => {
                    const message = statusMap[r.status] ?? '상태를 확인해 주세요.'
                    const edu = educationLabel(r)
                    return (
                      <li key={r.id} className="lookup-result">
                        <div>
                          <div>
                            {edu ? (
                              <p>교육명: {edu}</p>
                            ) : null}
                            <p>
                              {r.name} 님<br />
                              {message}
                            </p>
                          </div>
                          <span>{r.status}</span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="dialog-panel__foot">
          <button
            type="button"
            onClick={onClose}
            className="secondary-action"
          >
            닫기
          </button>
        </div>
      </div>
    </dialog>
  )
}

