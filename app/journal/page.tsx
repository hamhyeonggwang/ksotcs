export default function JournalPage() {
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

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <p className="text-gray-700 leading-relaxed text-lg">
            학회지 안내 내용이 여기에 표시됩니다. 추후 링크 연동 시 실제 내용으로 업데이트됩니다.
          </p>
        </div>
      </div>
    </div>
  )
}
