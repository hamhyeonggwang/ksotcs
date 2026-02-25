export default function InquiryPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            문의하기
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-primary-800 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            학회에 대한 문의사항을 남겨주세요
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* 챗봇 상담 */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">챗봇 상담</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              실시간으로 빠르게 답변받을 수 있는 챗봇 상담 서비스입니다.
              간단한 문의사항은 챗봇을 통해 즉시 확인하실 수 있습니다.
            </p>
            <div className="bg-primary-50 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-primary-700 mb-1">실시간 응답</p>
                  <p className="text-sm text-gray-600">챗봇이 즉시 답변해드립니다</p>
                </div>
              </div>
            </div>
            <button className="w-full px-6 py-4 bg-primary-600 text-white rounded-lg font-semibold text-lg hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              챗봇 상담 시작하기
            </button>
          </div>

          {/* 이메일 문의 */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">이메일 문의</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              상세한 문의사항이나 복잡한 내용은 이메일로 문의해주세요.
              담당자가 검토 후 답변드립니다.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-yellow-700 mb-1">답변 소요 시간</p>
                  <p className="text-sm text-gray-700">이메일 문의는 <span className="font-bold">7일~10일</span> 정도 소요됩니다</p>
                </div>
              </div>
            </div>
            <a
              href="mailto:ksot4cs@gmail.com"
              className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              이메일로 문의하기
            </a>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                이메일 주소: <a href="mailto:ksot4cs@gmail.com" className="text-primary-600 font-semibold hover:underline">ksot4cs@gmail.com</a>
              </p>
            </div>
          </div>
        </div>

        {/* 안내사항 */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">문의 안내</h3>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>챗봇 상담은 간단한 문의사항에 대해 실시간으로 답변해드립니다.</p>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>이메일 문의는 상세한 내용이나 복잡한 사항에 대해 검토 후 답변드립니다.</p>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>이메일 문의 시 문의 내용을 구체적으로 작성해주시면 더 빠른 답변이 가능합니다.</p>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>이메일 답변은 평일 기준으로 처리되며, 주말 및 공휴일은 제외됩니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
