export default function CertificationPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            민간자격과정 안내
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-primary-800 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            다양한 민간자격과정을 통해 전문성을 향상시키세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. 아동발달평가사 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">아동발달평가사</h2>
                <p className="mt-1 text-sm font-semibold text-primary-700">Child Development Assessor</p>
              </div>
              <span className="shrink-0 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold">
                민간자격
              </span>
            </div>

            <div className="mt-5 space-y-4 text-gray-700 leading-relaxed">
              <p>
                <span className="font-semibold text-gray-900">[아동발달평가사]</span> 자격은 자격기본법에 의거하여
                한국직업능력개발원에 정식 등록된 민간자격(제2019-002975, 교육부)이며, 학회의 자격관리 규정에 따라
                교육 및 자격증 발부가 운영되고 있습니다.
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900 mb-2">직무 내용</p>
                <p>
                  아동발달평가사 자격증은 “아동의 전반적 발달영역에 대한 지식 및 발달평가도구 활용능력을 바탕으로 전반적
                  발달검사 및 언어, 정서, 운동, 시지각, 적응행동 및 사회성 발달에 대한 검사 실시 및 결과 해석, 검사 결과에 대한
                  결과보고서 작성의 업무를 수행하는 것”을 직무 내용으로 합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 2. 인지발달심리상담지도사 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">인지발달심리상담지도사</h2>
                <p className="mt-1 text-sm font-semibold text-primary-700">Cognitive Development Psycho-Counselor</p>
              </div>
              <span className="shrink-0 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold">
                민간자격
              </span>
            </div>

            <div className="mt-5 space-y-4 text-gray-700 leading-relaxed">
              <p>
                <span className="font-semibold text-gray-900">[인지발달심리상담지도사]</span> 자격은 자격기본법에 의거하여
                한국직업능력개발원에 정식 등록된 민간자격(제2019-003433, 보건복지부)이며, 학회의 자격관리 규정에 따라
                교육 및 자격증 발급이 운영되고 있습니다.
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900 mb-2">직무 내용</p>
                <p>
                  인지발달심리상담지도사는 지남력, 기억력, 집중력, 판단력, 언어능력, 계산능력, 시공간구별능력 및 실행기능 등의
                  인지기능을 유지하고 향상시키기 위하여 인지활동 프로그램을 개발하고 활용, 지도 및 심리상담의 업무를 수행하는 것을
                  직무로 합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 3. 자격과정 신규 — lg에서 3열의 세 번째, md에서는 2열 그리드에서 한 줄 전체 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 border-dashed border-primary-200 ring-1 ring-primary-100/80 md:col-span-2 lg:col-span-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">자격과정 신규</h2>
                <p className="mt-1 text-sm font-semibold text-primary-700">New qualification programs</p>
              </div>
              <span className="shrink-0 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold">
                신규
              </span>
            </div>

            <div className="mt-5 space-y-4 text-gray-700 leading-relaxed">
              <p>
                학회에서 새롭게 안내·운영하는 민간자격과정에 대한 공지, 교육 일정, 신청 방법 등은 본 섹션과{' '}
                <span className="font-semibold text-gray-900">학회소식</span>을 통해 순차적으로 안내드립니다.
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900 mb-2">안내 예정</p>
                <p>
                  구체적인 과정명·이수 조건·시험 일정은 확정되는 대로 교육 공문 및 홈페이지 공지로 게시됩니다. 문의는
                  학회 사무국으로 연락 바랍니다.
                </p>
              </div>
            </div>
          </div>

          {/* 4. 자격시험 안내 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 md:col-span-2 lg:col-span-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">자격시험 안내</h2>
                <p className="mt-1 text-sm font-semibold text-primary-700">2급 / 1급 / 전문가 과정</p>
              </div>
              <span className="shrink-0 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-semibold">
                안내
              </span>
            </div>

            <div className="mt-5 space-y-4 text-gray-700 leading-relaxed">
              <p>
                각각의 민간자격과정에 포함된 강좌를 이수하신 분들은 자격시험을 거쳐 2급 / 1급 / 전문가 등급의 자격증이
                발급됩니다.
              </p>
              <p className="border-t pt-4">
                자세한 내용은 각각의 교육 공문을 참조바랍니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
