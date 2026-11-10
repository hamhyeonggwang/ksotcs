'use client'

import { useMemo, useState } from 'react'
import PageIntro from '@/components/PageIntro'
import type { EducationScheduleRow } from '@/lib/adminTypes'

const EDUCATION_CENTER_SHOP_URL = 'https://ksotcs.co.kr/shop/'

export default function EducationScheduleView({ schedules }: { schedules: EducationScheduleRow[] }) {
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [selectedMonth, setSelectedMonth] = useState('전체')
  const year = schedules[0]?.year ?? new Date().getFullYear()

  const categories = useMemo(() => ['전체', ...Array.from(new Set(schedules.map((schedule) => schedule.category)))], [schedules])
  const months = useMemo(() => {
    const values = Array.from(new Set(schedules.map((schedule) => schedule.month))).sort((a, b) => a - b)
    return ['전체', ...values.map((month) => `${month}월`)]
  }, [schedules])

  const filteredSchedules = useMemo(
    () => schedules.filter((schedule) => {
      const categoryMatches = selectedCategory === '전체' || schedule.category === selectedCategory
      const monthMatches = selectedMonth === '전체' || `${schedule.month}월` === selectedMonth
      return categoryMatches && monthMatches
    }),
    [schedules, selectedCategory, selectedMonth],
  )

  const groupedByMonth = useMemo(() => {
    const grouped = new Map<number, EducationScheduleRow[]>()
    filteredSchedules.forEach((schedule) => {
      grouped.set(schedule.month, [...(grouped.get(schedule.month) ?? []), schedule])
    })
    return grouped
  }, [filteredSchedules])

  return (
    <div className="public-page">
      <div className="site-container">
        <PageIntro title={`${year}년도 연간교육일정`} description="교육과정과 월을 선택해 일정을 확인하세요." />

        <section className="filter-panel" aria-label="교육 일정 필터">
          <div className="filter-grid">
            <div className="filter-group">
              <span id="category-filter-label">교육과정</span>
              <div className="filter-buttons" role="group" aria-labelledby="category-filter-label">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={selectedCategory === category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <span id="month-filter-label">월별</span>
              <div className="filter-buttons" role="group" aria-labelledby="month-filter-label">
                {months.map((month) => (
                  <button
                    key={month}
                    type="button"
                    aria-pressed={selectedMonth === month}
                    onClick={() => setSelectedMonth(month)}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <p className="filter-count" aria-live="polite">총 {filteredSchedules.length}개의 교육 일정이 있습니다.</p>
        </section>

        {filteredSchedules.length === 0 ? (
          <div className="paper-panel" role="status">선택한 조건에 해당하는 교육 일정이 없습니다.</div>
        ) : (
          <div className="schedule-list">
            {Array.from(groupedByMonth.keys()).sort((a, b) => a - b).map((month) => (
              <section key={month} className="schedule-month" aria-labelledby={`schedule-month-${month}`}>
                <h2 id={`schedule-month-${month}`}>{month}월 교육 일정</h2>
                <table className="data-table responsive-table">
                  <thead>
                    <tr>
                      <th>교육시기</th>
                      <th>자격교육과정명</th>
                      <th>교육명</th>
                      <th>교육시간</th>
                      <th>교육방법</th>
                      <th>교육대상자</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(groupedByMonth.get(month) ?? []).map((schedule) => (
                      <tr key={schedule.id}>
                        <td data-label="교육시기">{schedule.period}</td>
                        <td data-label="자격교육과정명">{schedule.course_name}</td>
                        <td data-label="교육명">
                          <a
                            href={EDUCATION_CENTER_SHOP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${schedule.education_name}, 교육센터로 이동`}
                          >
                            {schedule.education_name}
                          </a>
                        </td>
                        <td data-label="교육시간">{schedule.education_time}</td>
                        <td data-label="교육방법">{schedule.method}</td>
                        <td data-label="교육대상자">{schedule.target}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            ))}
          </div>
        )}

        <p className="status-note">참고: 매년 1급 시험 시행 (9월~11월)</p>
      </div>
    </div>
  )
}
