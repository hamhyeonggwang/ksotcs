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
          <p className="text-lg text-gray-600">
            기존이사명 유지
          </p>
        </div>

        {/* 연혁 */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-primary-200">
            연혁
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-primary-50 to-white rounded-xl border-l-4 border-primary-600">
              <div className="text-2xl font-bold text-primary-600 min-w-[80px]">2011년</div>
              <div className="text-lg text-gray-700">제1대 이재신 회장 취임</div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-primary-50 to-white rounded-xl border-l-4 border-primary-600">
              <div className="text-2xl font-bold text-primary-600 min-w-[80px]">2015년</div>
              <div className="text-lg text-gray-700">제2대 이지연 회장 취임</div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-primary-50 to-white rounded-xl border-l-4 border-primary-600">
              <div className="text-2xl font-bold text-primary-600 min-w-[80px]"></div>
              <div className="text-lg text-gray-700">제3대 최유임 회장 취임</div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-primary-50 to-white rounded-xl border-l-4 border-primary-600">
              <div className="text-2xl font-bold text-primary-600 min-w-[80px]">2024년</div>
              <div className="text-lg text-gray-700">제4대 유은영 회장 취임</div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-primary-50 to-white rounded-xl border-l-4 border-primary-600">
              <div className="text-2xl font-bold text-primary-600 min-w-[80px]">2026년</div>
              <div className="text-lg text-gray-700">
                제5대 김진경 회장 취임과 이사회 구성 중심으로
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
