'use client'

import { useState } from 'react'

interface AccordionItem {
  id: string
  title: string
  content: JSX.Element
  icon: JSX.Element
}

const accordionItems: AccordionItem[] = [
  {
    id: 'submission',
    title: '논문투고 안내',
    content: (
      <div className="space-y-10 text-gray-800 leading-relaxed">
        {/* 제목 */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-primary-700">
            대한아동학교 작업치료학회는 아래와 같이 논문을 상시 모집합니다.
          </h3>
        </div>

        {/* 01 지원분야 */}
        <div>
          <h4 className="text-xl font-bold text-primary-600 mb-2">01 지원분야</h4>
          <p className="border-t pt-3 text-gray-700">- 아동·학교 작업치료 관련 전 분야</p>
        </div>

        {/* 02 투고방법 */}
        <div>
          <h4 className="text-xl font-bold text-primary-600 mb-2">02 투고방법</h4>
          <div className="border-t pt-3 space-y-2 text-gray-700">
            <p>
              1) 온라인 투고{' '}
              <a
                href="http://submission.ksotcs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-700 underline underline-offset-2"
              >
                (http://submission.ksotcs.com)
              </a>
            </p>
            <p>2) 상시접수</p>
          </div>
        </div>

        {/* 03 투고료 */}
        <div>
          <h4 className="text-xl font-bold text-primary-600 mb-2">03 논문투고료 및 게재료 안내</h4>
          <div className="border-t pt-3 space-y-2 text-gray-700">
            <p>1) 투고료: 5만원</p>
            <p>2) 게재료: 12만원 (게재확정시)</p>
          </div>
        </div>

        {/* 04 계좌 */}
        <div>
          <h4 className="text-xl font-bold text-primary-600 mb-2">04 투고료 및 게재료 입금계좌</h4>
          <div className="border-t pt-3">
            <p className="text-red-500 font-semibold">국민 490101-04-329097 예금주 김영란</p>
          </div>
        </div>

        {/* 05 주의사항 */}
        <div>
          <h4 className="text-xl font-bold text-primary-600 mb-2">05 주의사항</h4>
          <div className="border-t pt-3 text-gray-700">
            <p>- 논문 투고 시 1저자 또는 교신저자는 연회비(3만원)를 납부하여야 함</p>
          </div>
        </div>
      </div>
    ),
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 'guidelines',
    title: '논문투고규정',
    content: (
      <div className="space-y-8 text-gray-800 leading-relaxed">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-primary-700">논문투고규정</h3>
          <p className="mt-3 text-gray-700">
            대한아동학교작업치료학회지는 아동, 청소년 및 학교작업치료와 관련된 분야의 논문을 게재함을 목적으로 한다.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-bold text-primary-600 mb-2">1. 투고 자격</h4>
          <div className="border-t pt-3 text-gray-700">
            <p>본 학회지에 투고할 수 있는 자는 대한아동학교작업치료학회의 회원으로 한다.</p>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-bold text-primary-600 mb-2">2. 논문의 종류</h4>
          <div className="border-t pt-3 space-y-2 text-gray-700">
            <p>본 학회지에 게재하는 논문의 종류는 다음과 같다.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>원저(original article)</li>
              <li>종설(review article)</li>
              <li>증례보고(case report)</li>
              <li>기타 편집위원회에서 인정하는 논문</li>
            </ul>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-bold text-primary-600 mb-2">3. 논문의 내용</h4>
          <div className="border-t pt-3 space-y-3 text-gray-700">
            <p>본 학회지는 아동, 청소년 및 학교작업치료와 관련된 분야의 논문으로 한다.</p>
            <p>관련된 분야는 다음의 각 호와 같다.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>아동작업치료 일반</li>
              <li>아동 정신사회 작업치료</li>
              <li>감각통합</li>
              <li>발달 및 학습</li>
              <li>학교작업치료</li>
              <li>기타 아동작업치료와 관련된 분야</li>
            </ul>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-bold text-primary-600 mb-2">4. 논문 작성</h4>
          <div className="border-t pt-3 text-gray-700">
            <p>논문은 학회에서 정한 투고 규정 및 작성 양식에 따라 작성하여야 한다.</p>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-bold text-primary-600 mb-2">5. 논문 제출</h4>
          <div className="border-t pt-3 text-gray-700">
            <p>논문은 온라인 투고 시스템을 통해 제출한다.</p>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-bold text-primary-600 mb-2">6. 논문 심사</h4>
          <div className="border-t pt-3 text-gray-700">
            <p>제출된 논문은 편집위원회에서 심사를 거쳐 게재 여부를 결정한다.</p>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-bold text-primary-600 mb-2">7. 기타</h4>
          <div className="border-t pt-3 text-gray-700">
            <p>기타 사항은 편집위원회의 결정에 따른다.</p>
          </div>
        </div>
      </div>
    ),
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: 'ethics',
    title: '윤리규정',
    content: (
      <div className="space-y-8 text-gray-800 leading-relaxed">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-primary-700">연구윤리규정</h3>
          <p className="mt-3 text-gray-700">
            대한아동학교 작업치료학회는 연구윤리를 확립하고 연구부정행위를 방지하기 위하여 다음과 같은 연구윤리규정을 둔다.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-bold text-primary-600 mb-2">제1조 (연구자의 윤리)</h4>
          <div className="border-t pt-3 space-y-3 text-gray-700">
            <p>
              연구자는 연구 수행 과정에서 정직성과 객관성을 유지해야 하며, 다음과 같은 연구부정행위를 해서는 안 된다.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-semibold">위조 (fabrication)</span>: 존재하지 않는 데이터 또는 연구결과를 허위로 만들어내는 행위
              </li>
              <li>
                <span className="font-semibold">변조 (falsification)</span>: 연구자료, 장비, 과정 등을 인위적으로 조작하거나 데이터를 임의로 변형·삭제하는 행위
              </li>
              <li>
                <span className="font-semibold">표절 (plagiarism)</span>: 타인의 아이디어, 연구내용, 결과 등을 정당한 인용 없이 사용하는 행위
              </li>
            </ul>
            <p>
              또한 연구자는 부당한 저자 표시를 해서는 안 되며, 연구에 실질적으로 기여한 사람에게만 저자 자격을 부여해야 한다.
            </p>
            <p>동일 논문의 중복 게재 및 중복 투고는 허용되지 않는다.</p>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-bold text-primary-600 mb-2">제2조 (연구부정행위에 대한 조치)</h4>
          <div className="border-t pt-3 space-y-2 text-gray-700">
            <p>연구부정행위가 확인될 경우 학회는 다음과 같은 조치를 취할 수 있다.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>해당 논문의 게재 취소 또는 철회</li>
              <li>일정 기간 논문 투고 제한</li>
            </ul>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-bold text-primary-600 mb-2">제3조 (연구부정행위 제보 및 보호)</h4>
          <div className="border-t pt-3 space-y-2 text-gray-700">
            <p>누구든지 연구부정행위를 제보할 수 있으며, 제보자의 신원은 보호된다.</p>
            <p>학회는 제보로 인해 불이익이 발생하지 않도록 조치한다.</p>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-bold text-primary-600 mb-2">제4조 (심사자의 윤리)</h4>
          <div className="border-t pt-3 space-y-2 text-gray-700">
            <p>심사자는 논문을 공정하고 객관적으로 평가해야 하며, 다음 사항을 준수해야 한다.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>개인적 이해관계나 편견 없이 심사를 수행해야 한다.</li>
              <li>논문에 대한 비밀을 유지해야 한다.</li>
              <li>이해상충이 있는 경우 심사를 회피해야 한다.</li>
            </ul>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-bold text-primary-600 mb-2">제5조 (편집위원의 윤리)</h4>
          <div className="border-t pt-3 space-y-2 text-gray-700">
            <p>편집위원은 논문의 채택 여부를 공정하게 결정해야 하며, 다음 사항을 준수해야 한다.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>저자의 성별, 소속, 개인적 관계 등에 영향을 받지 않아야 한다.</li>
              <li>심사 과정의 공정성을 유지해야 한다.</li>
              <li>이해상충이 있는 경우 의사결정에서 제외되어야 한다.</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 'search',
    title: '학회지검색',
    content: <p>학회지검색 내용이 여기에 표시됩니다. 추후 실제 내용으로 업데이트됩니다.</p>,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
]

export default function JournalPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            학회지 안내
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-primary-800 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            최신 연구 논문과 학술 자료를 확인하세요
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {accordionItems.map((item) => {
            const isOpen = openItems.has(item.id)
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      {item.icon}
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                      {item.title}
                    </h2>
                  </div>
                  <svg
                    className={`w-6 h-6 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                    <div className="pl-16">
                      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                        {item.content}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
