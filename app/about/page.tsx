'use client'

import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            학회소개
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-primary-800 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            대한아동학교작업치료학회에 대해 알아보세요
          </p>
          <div className="mt-6">
            <Link
              href="/statutes"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              학회 정관 보기
            </Link>
          </div>
        </div>

        {/* 배너용 슬로건 */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-3xl p-12 mb-16 text-center shadow-2xl">
          <p className="text-3xl md:text-4xl font-bold text-white leading-relaxed">
            아이곁에서, 현장 속에서<br />
            아동작업치료의 성장을 함께합니다
          </p>
        </div>

        {/* 학회장 인사말 */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-primary-200">
            학회장 인사말
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
            <p>
              안녕하세요. 안녕하세요.
            </p>
            <p>
              대한아동학교 작업치료학회장입니다.
            </p>
            <p>
              아이들과 함께하는 시간을 소중히 여기며, 아동작업치료 분야에서 작은 변화와 성장을 만들어가고 있습니다. 
              그 보람으로 이 자리에 오게 되었습니다.
            </p>
            <p>
              본 학회는 2011년 창립 이후 회원 여러분과 함께 아동작업치료의 전문성과 질적 성장을 위해 노력해왔습니다. 
              사례 공유와 학술 활동을 통해 현장 경험을 연결하고, 회원 상호 간의 성장을 지원하고자 합니다.
            </p>
            <p>
              앞으로도 회원 여러분과 소통하며 현장에서 실질적인 도움이 되는 학회로 성장하겠습니다.
            </p>
            <p>
              많은 관심과 참여 부탁드립니다.
            </p>
            <p className="text-right font-semibold mt-8">
              감사합니다.
            </p>
          </div>
        </div>

        {/* 조직도 */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-primary-200">
            조직도
          </h2>
          <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse">
           <thead>
             <tr className="bg-primary-50">
             <th className="p-4">구분</th>
             <th className="p-4">직책</th>
             <th className="p-4">이름</th>
           </tr>
    </thead>
    <tbody>
      <tr><td className="p-4">회장</td><td className="p-4">김진경</td><td className="p-4">한서대학교</td></tr>
      <tr><td className="p-4">부회장</td><td className="p-4">박경영</td><td className="p-4">중원대학교</td></tr>

      <tr><td className="p-4">이사진</td><td className="p-4">총무이사</td><td className="p-4">최강미</td></tr>
      <tr><td className="p-4">   </td><td className="p-4">기획이사</td><td className="p-4">유영미</td></tr>
      <tr><td className="p-4">   </td><td className="p-4">교재편찬이사</td><td className="p-4">이지연</td></tr>
      <tr><td className="p-4">   </td><td className="p-4">재무이사</td><td className="p-4">김영란</td></tr>
      <tr><td className="p-4">   </td><td className="p-4">대외협력이사</td><td className="p-4">김세연</td></tr>
      <tr><td className="p-4">   </td><td className="p-4">국제이사</td><td className="p-4">주유미</td></tr>
      <tr><td className="p-4">   </td><td className="p-4">교육이사1</td><td className="p-4">박윤이</td></tr>
      <tr><td className="p-4">   </td><td className="p-4">교육이사2</td><td className="p-4">조선영</td></tr>

      <tr><td className="p-4">감사</td><td className="p-4">최유임</td><td className="p-4">원광대학교</td></tr>

      <tr><td className="p-4">고문</td><td className="p-4">고문</td><td className="p-4">이재신</td></tr>
      <tr><td className="p-4">고문</td><td className="p-4">고문</td><td className="p-4">유은영</td></tr>
    </tbody>
  </table>
</div>
          
        </div>

        {/* 연혁 */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-primary-200">
            연혁
          </h2>
          <div className="space-y-8">
            {/* 2026년 */}
            <div className="border-l-4 border-primary-600 pl-6">
              <div className="text-3xl font-bold text-primary-600 mb-4">2026년</div>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]"></span>
                  <span>제5대 김진경 회장 취임</span>
                </div>
              </div>
            </div>

            {/* 2024년 */}
            <div className="border-l-4 border-primary-600 pl-6">
              <div className="text-3xl font-bold text-primary-600 mb-4">2024년</div>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]"></span>
                  <span>제4대 유은영 회장 취임</span>
                </div>
              </div>
            </div>

            {/* 2015년 */}
            <div className="border-l-4 border-primary-600 pl-6">
              <div className="text-3xl font-bold text-primary-600 mb-4">2015년</div>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">1월</span>
                  <span>제2대 이지연 회장 취임</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">3월</span>
                  <span>CO-OP(Cognitive Orientation to daily Occupational Performance) 소개 및 사례 발표</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">5월</span>
                  <span>Interactive metronome(IM) 전문가 교육 세미나</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">11월</span>
                  <span>추계학술대회 (주제: 작업치료사를 위한 연구 윤리)</span>
                </div>
              </div>
            </div>

            {/* 2014년 */}
            <div className="border-l-4 border-primary-600 pl-6">
              <div className="text-3xl font-bold text-primary-600 mb-4">2014년</div>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">3월</span>
                  <span>아동작업치료 개정판 출간</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">4월</span>
                  <span>뇌성마비 아동의 인지치료와 인지학습 치료</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">7월</span>
                  <span>인지발달치료사 교육</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">7월</span>
                  <span>- 인지지각 신경과학</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">7월</span>
                  <span>- 아동기 인지발달 이론</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">7월</span>
                  <span>- 인지심리학의 기초</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">7월</span>
                  <span>- 글쓰기 평가 및 중재</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">7월</span>
                  <span>- 인지 평가 및 중재</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">7월</span>
                  <span>- 시지각 평가 및 중재</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">7월</span>
                  <span>- 학교 작업치료</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">7월</span>
                  <span>- 발달 평가</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">11월</span>
                  <span>추계학술대회 (주제: 아동의 인지학습을 위한 보조공학적 접근)</span>
                </div>
              </div>
            </div>

            {/* 2013년 */}
            <div className="border-l-4 border-primary-600 pl-6">
              <div className="text-3xl font-bold text-primary-600 mb-4">2013년</div>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">3월</span>
                  <span>OTIPM을 적용한 아동작업치료의 실제 교육</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">5월</span>
                  <span>3주년 기념 특강 "행동치료를 통합 ADL 훈련의 실제"</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">7월</span>
                  <span>인지 심리학 및 발달 교육</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">7월</span>
                  <span>- 인지 지각신경과학과 인지 평가 및 중재 교육</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">7월</span>
                  <span>- 글쓰기 평가 및 중재 교육</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">7월</span>
                  <span>- 발달 평가 교육</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">7월</span>
                  <span>- 시지각 평가 및 중재 교육</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">7월</span>
                  <span>- 학교작업치료 교육</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">9월</span>
                  <span>인지학습치료</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">11월</span>
                  <span>추계학술대회 (주제: 정서발달의 심리학)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">12월</span>
                  <span>인지발달치료사 자격시험</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">12월</span>
                  <span>「아동∙학교 작업치료학회지」4권 발간</span>
                </div>
              </div>
            </div>

            {/* 2012년 */}
            <div className="border-l-4 border-primary-600 pl-6">
              <div className="text-3xl font-bold text-primary-600 mb-4">2012년</div>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">3월</span>
                  <span>시지각 이론과 평가 및 중재 교육</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">5월</span>
                  <span>글쓰기 이론과 평가 및 중재 교육</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">6월</span>
                  <span>SFA 평가 및 치료적 적용 교육</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">8월</span>
                  <span>인지발달치료사 자격시험 실시</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">8월</span>
                  <span>아동∙학교 작업치료학회 하계 특강</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">9월</span>
                  <span>인지 심리학의 기초 및 인지 발달 교육</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">9월</span>
                  <span>아동작업치료(계축문화사) 출간</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">11월</span>
                  <span>추계학술대회 (주제: 발달장애 아동 작업치료에서 응용행동분석의 적용)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">12월</span>
                  <span>「아동∙학교 작업치료학회지」3권 발간</span>
                </div>
              </div>
            </div>

            {/* 2011년 */}
            <div className="border-l-4 border-primary-600 pl-6">
              <div className="text-3xl font-bold text-primary-600 mb-4">2011년</div>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">4월</span>
                  <span>제1대 이재신 회장 취임</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">4월</span>
                  <span>아동∙학교 작업치료학회 창립세미나 및 교육</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">4월</span>
                  <span>아동∙학교 작업치료학회 회칙 및 운영세칙 개정</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">6월</span>
                  <span>「아동∙학교 작업치료학회지」2권 발간</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">7월</span>
                  <span>인지․지각 신경학적 기초 및 인지 발달 교육</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">9월</span>
                  <span>아동∙학교 작업치료학회 베일리 Ⅲ 워크숍</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">11월</span>
                  <span>추계학술대회 (주제: 아동인지평가도구 DOTCA-Ch의 이론과 실제)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">12월</span>
                  <span>「아동∙학교 작업치료학회지」2권 2호 발간</span>
                </div>
              </div>
            </div>

            {/* 2010년 */}
            <div className="border-l-4 border-primary-600 pl-6">
              <div className="text-3xl font-bold text-primary-600 mb-4">2010년</div>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary-700 min-w-[60px]">12월</span>
                  <span>「아동∙학교 작업치료학회지」1권 발간</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
