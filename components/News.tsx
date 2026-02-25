import Link from 'next/link'

const newsItems = [
  {
    title: '(26-01) 장애 아동의 시지각 문제에 대한 이해와 중재',
    date: '2026-02-24',
    category: '공지사항',
  },
  {
    title: '인지발달상담심리지도사 2급 교육 수료증 발급',
    date: '2025-12-05',
    category: '공지사항',
  },
  {
    title: '인지발달심리상담지도사 2급 과정 명단 공지',
    date: '2025-11-19',
    category: '공지사항',
  },
]

export default function News() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              최신 소식
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-primary-800 mb-6"></div>
          </div>
          <Link
            href="/news"
            className="hidden md:flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            전체 보기
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {newsItems.map((item, index) => (
            <Link
              key={index}
              href="/news"
              className="group p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full">
                  {item.category}
                </span>
                <span className="text-sm text-gray-500">{item.date}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                {item.title}
              </h3>
              <div className="flex items-center text-primary-600 text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                자세히 보기
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/news"
            className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            전체 보기
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
