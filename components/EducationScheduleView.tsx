'use client'

import { useState, useMemo } from 'react'
import type { EducationScheduleRow } from '@/lib/adminTypes'

const EDUCATION_CENTER_SHOP_URL = 'https://ksotcs.co.kr/shop/'

export default function EducationScheduleView({ schedules }: { schedules: EducationScheduleRow[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체')
  const [selectedMonth, setSelectedMonth] = useState<string>('전체')

  const year = schedules[0]?.year ?? new Date().getFullYear()

  const categories = useMemo(() => {
    const unique = Array.from(new Set(schedules.map((s) => s.category)))
    return ['전체', ...unique]
  }, [schedules])

  const months = useMemo(() => {
    const unique = Array.from(new Set(schedules.map((s) => s.month))).sort((a, b) => a - b)
    return ['전체', ...unique.map((m) => `${m}월`)]
  }, [schedules])

  const filteredSchedules = useMemo(() => {
    return schedules.filter((schedule) => {
      const categoryMatch = selectedCategory === '전체' || schedule.category === selectedCategory
      const monthMatch = selectedMonth === '전체' || `${schedule.month}월` === selectedMonth
      return categoryMatch && monthMatch
    })
  }, [schedules, selectedCategory, selectedMonth])

  const groupedByMonth = useMemo(() => {
    const grouped = new Map<number, EducationScheduleRow[]>()
    filteredSchedules.forEach((schedule) => {
      const list = grouped.get(schedule.month) ?? []
      list.push(schedule)
      grouped.set(schedule.month, list)
    })
    return grouped
  }, [filteredSchedules])

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {year}년도 연간교육일정
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-primary-800 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            월별 교육 일정을 확인하고 필터로 검색하세요
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* 교육과정 필터 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                교육과정
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* 월별 필터 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                월별
              </label>
              <div className="flex flex-wrap gap-2">
                {months.map((month) => (
                  <button
                    key={month}
                    onClick={() => setSelectedMonth(month)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedMonth === month
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 결과 카운트 */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              총 <span className="font-bold text-primary-600">{filteredSchedules.length}</span>개의 교육 일정이 있습니다.
            </p>
          </div>
        </div>

        {/* Schedule List */}
        {filteredSchedules.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">선택한 조건에 해당하는 교육 일정이 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Array.from(groupedByMonth.keys())
              .sort((a, b) => a - b)
              .map((month) => (
                <div key={month} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">{month}월 교육 일정</h2>
                  </div>
                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-gray-200">
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">교육시기</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">자격교육과정명</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">교육명</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">교육시간</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">교육방법</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">교육대상자</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(groupedByMonth.get(month) ?? []).map((schedule) => (
                            <tr
                              key={schedule.id}
                              className="border-b border-gray-100 hover:bg-primary-50 transition-colors"
                            >
                              <td className="py-4 px-4 text-gray-700">{schedule.period}</td>
                              <td className="py-4 px-4 text-gray-700">{schedule.course_name}</td>
                              <td className="py-4 px-4 text-gray-700 font-medium">
                                <a
                                  href={EDUCATION_CENTER_SHOP_URL}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary-700 hover:text-primary-800 hover:underline underline-offset-2"
                                  aria-label={`${schedule.education_name} - 교육센터로 이동`}
                                >
                                  {schedule.education_name}
                                </a>
                              </td>
                              <td className="py-4 px-4 text-gray-700">{schedule.education_time}</td>
                              <td className="py-4 px-4 text-gray-700">
                                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                                  {schedule.method}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-gray-700">{schedule.target}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Note */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">※ 참고:</span> 매년 1급 시험 시행 (9월~11월)
          </p>
        </div>
      </div>
    </div>
  )
}
