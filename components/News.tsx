import Link from 'next/link'
import Image from 'next/image'
import { getSupabaseRestConfig, supabaseRestGetSafe } from '@/lib/supabaseRest'

type NoticeRow = {
  id: string
  title: string
  pdf_url: string
  created_at: string
}

type ActivityPhotoRow = {
  id: string
  image_url: string
  caption: string | null
  created_at: string
}

export default async function News() {
  const cfg = getSupabaseRestConfig()

  const [notices, photo] = await Promise.all([
    cfg
      ? supabaseRestGetSafe<NoticeRow[]>(
          '/rest/v1/notices?select=id,title,pdf_url,created_at&order=created_at.desc&limit=2',
          [],
        )
      : Promise.resolve([] as NoticeRow[]),
    cfg
      ? supabaseRestGetSafe<ActivityPhotoRow[]>(
          '/rest/v1/activity_photos?select=id,image_url,caption,created_at&order=created_at.desc&limit=1',
          [],
        ).then((arr) => arr[0] ?? null)
      : Promise.resolve(null as ActivityPhotoRow | null),
  ])

  const fallbackNoticeImages = ['/images/news-1.jpg', '/images/news-2.jpg']

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
          {/* 최신 교육공문 2개 */}
          {(notices.length > 0 ? notices : [null, null]).slice(0, 2).map((n, index) => {
            const title = n?.title ?? '등록된 교육공문이 없습니다'
            const date = n?.created_at
              ? new Date(n.created_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })
              : ''
            const bg = fallbackNoticeImages[index] ?? '/images/news-1.jpg'

            return (
              <Link
                key={n?.id ?? `notice-fallback-${index}`}
                href="/news"
                className="group relative overflow-hidden bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${bg}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-primary-700 text-sm font-semibold rounded-full">
                      교육공문
                    </span>
                  </div>

                  {date ? (
                    <div className="absolute bottom-4 right-4">
                      <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-sm rounded-full">
                        {date}
                      </span>
                    </div>
                  ) : null}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                    {title}
                  </h3>
                  <div className="flex items-center text-primary-600 font-semibold mt-4">
                    자세히 보기
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}

          {/* 학회 활동 사진 1장 */}
          <Link
            href="/news#activity-photos-heading"
            className="group relative overflow-hidden bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
          >
            <div className="relative h-48 overflow-hidden bg-gray-200">
              {photo ? (
                <Image
                  src={photo.image_url}
                  alt={photo.caption ?? '학회 활동 사진'}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-primary-400 opacity-40" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-primary-700 text-sm font-semibold rounded-full">
                  활동 사진
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                {photo?.caption ?? '학회 활동 사진을 확인하세요'}
              </h3>
              <div className="flex items-center text-primary-600 font-semibold mt-4">
                자세히 보기
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
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
