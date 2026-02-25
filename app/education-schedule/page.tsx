'use client'

import { useState, useMemo } from 'react'

interface EducationSchedule {
  id: string
  month: number
  monthName: string
  period: string
  courseName: string
  educationName: string
  educationTime: string
  instructor?: string
  schedule?: string
  detailedTime?: string
  location?: string
  director: string
  method: string
  target: string
  category: string
}

const schedules: EducationSchedule[] = [
  {
    id: '1',
    month: 3,
    monthName: '3월',
    period: '3월말',
    courseName: '인지발달심리상담지도사 아동발달평가사 (질환별 사례교육)',
    educationName: '시지각',
    educationTime: '2시간/2시간',
    instructor: '최강미, 안소현',
    director: '조선영',
    method: '보수교육(실시간)',
    target: '임상가',
    category: '인지발달심리상담지도사',
  },
  {
    id: '2',
    month: 4,
    monthName: '4월',
    period: '4월말',
    courseName: '인지발달심리상담지도사 아동발달평가사 (질환별 사례교육)',
    educationName: '질환별 사례교육',
    educationTime: '3시간/3시간',
    instructor: '유애리, ABA',
    schedule: '4/19? 4/25? 토? 일?',
    detailedTime: '13:00~? 16:00~?',
    location: '서울역? 이름센터? 대전대?',
    director: '조선영',
    method: '대면',
    target: '임상가, 학생',
    category: '인지발달심리상담지도사',
  },
  {
    id: '3',
    month: 5,
    monthName: '5월',
    period: '5월말',
    courseName: '인지발달심리상담지도사 아동발달평가사 (질환별 사례교육)',
    educationName: '질환별 사례교육',
    educationTime: '3시간/3시간',
    instructor: '김영호(CP), 윤인진(조산)',
    director: '박윤이',
    method: '실시간',
    target: '임상가, 학생',
    category: '인지발달심리상담지도사',
  },
  {
    id: '4',
    month: 6,
    monthName: '6월',
    period: '6월말',
    courseName: '인지발달심리상담지도사 아동발달평가사 (부모교육)',
    educationName: 'OPC 교육 - 사례공유',
    educationTime: '3시간(추후 시간 연장논의)',
    instructor: '주유미, 유은영, 임상가1',
    director: '조선영',
    method: '실시간',
    target: '임상가',
    category: '인지발달심리상담지도사',
  },
  {
    id: '5',
    month: 8,
    monthName: '8월',
    period: '8월 말',
    courseName: '아동발달평가사',
    educationName: '임상에서 바로쓰는 영유아 발달평가 (베일리-3 발달위험군 아동(36개월)평가사례)',
    educationTime: '16시간 (2일)',
    instructor: '박윤이, 김영란, 유영미, 함형광',
    director: '박윤이',
    method: '실시간 또는 대면',
    target: '임상가',
    category: '아동발달평가사',
  },
  {
    id: '6',
    month: 9,
    monthName: '9월',
    period: '9월말',
    courseName: '아동발달평가사 1급 자격 교육',
    educationName: '아동발달평가서 작성',
    educationTime: '3시간',
    instructor: '최강미, 함형광',
    director: '박윤이',
    method: '실시간',
    target: '2급 대상자',
    category: '아동발달평가사',
  },
  {
    id: '7',
    month: 11,
    monthName: '11월',
    period: '11월 중순',
    courseName: '인지발달상담지도사 자격교육과정',
    educationName: '2급자격과정',
    educationTime: '16시간',
    director: '조선영',
    method: '온라인 녹화',
    target: '임상가, 학생',
    category: '인지발달상담지도사',
  },
]

const categories = [
  '전체',
  '인지발달심리상담지도사',
  '아동발달평가사',
  '인지발달상담지도사',
]

export default function EducationSchedulePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체')
  const [selectedMonth, setSelectedMonth] = useState<string>('전체')

  const months = ['전체', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

  const filteredSchedules = useMemo(() => {
    return schedules.filter((schedule) => {
      const categoryMatch = selectedCategory === '전체' || schedule.category === selectedCategory
      const monthMatch = selectedMonth === '전체' || schedule.monthName === selectedMonth
      return categoryMatch && monthMatch
    })
  }, [selectedCategory, selectedMonth])

  const groupedByMonth = useMemo(() => {
    const grouped: { [key: string]: EducationSchedule[] } = {}
    filteredSchedules.forEach((schedule) => {
      if (!grouped[schedule.monthName]) {
        grouped[schedule.monthName] = []
      }
      grouped[schedule.monthName].push(schedule)
    })
    return grouped
  }, [filteredSchedules])

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            2026년도 연간교육일정
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
            {Object.keys(groupedByMonth)
              .sort((a, b) => {
                const monthOrder = ['3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
                return monthOrder.indexOf(a) - monthOrder.indexOf(b)
              })
              .map((month) => (
                <div key={month} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">{month} 교육 일정</h2>
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
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">강사</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">교육방법</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">교육대상자</th>
                          </tr>
                        </thead>
                        <tbody>
                          {groupedByMonth[month].map((schedule) => (
                            <tr
                              key={schedule.id}
                              className="border-b border-gray-100 hover:bg-primary-50 transition-colors"
                            >
                              <td className="py-4 px-4 text-gray-700">{schedule.period}</td>
                              <td className="py-4 px-4 text-gray-700">{schedule.courseName}</td>
                              <td className="py-4 px-4 text-gray-700 font-medium">{schedule.educationName}</td>
                              <td className="py-4 px-4 text-gray-700">{schedule.educationTime}</td>
                              <td className="py-4 px-4 text-gray-700">{schedule.instructor || '-'}</td>
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
