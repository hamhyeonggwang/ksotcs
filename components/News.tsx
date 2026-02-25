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
  const newsImages = [
    // 공지사항 느낌의 노트와 펜
    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
    // 회의·기록용 교재
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800',
    // 교육용 자료와 문서
    'https://images.unsplash.com/photo-1457612928689-a1ab27da0dad?q=80&w=800',
  ]

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start mb-16">
          <div>
            <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-6">
              최신 소식
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              학회 소식
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              최신 공지사항과 학회 소식을 확인하세요
            </p>
          </div>
          <Link
            href="/news"
            className="hidden md:flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
          >
            전체 보기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <Link
              key={index}
              href="/news"
              className="group relative overflow-hidden bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('${newsImages[index]}')`,
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-primary-700 text-sm font-semibold rounded-full">
                    {item.category}
                  </span>
                </div>

                {/* Date */}
                <div className="absolute bottom-4 right-4">
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-sm rounded-full">
                    {item.date}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                  {item.title}
                </h3>
                <div className="flex items-center text-primary-600 font-semibold mt-4">
                  자세히 보기
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
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
