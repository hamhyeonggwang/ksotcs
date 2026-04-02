import Image from 'next/image'
import Link from 'next/link'
import { getSupabaseRestConfig, supabaseRestGet } from '@/lib/supabaseRest'

type NoticeRow = {
  id: string
  title: string
  pdf_url: string
}

type ActivityPhotoRow = {
  id: string
  image_url: string
  caption: string | null
  created_at: string
}

export default function NewsPage() {
  const cfg = getSupabaseRestConfig()

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">학회소식</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-primary-800 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            교육 공문과 학회 활동 소식을 확인하세요
          </p>
        </div>

        {!cfg ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <p className="text-gray-900 font-semibold">Supabase 설정이 필요합니다.</p>
            <p className="text-gray-700 leading-relaxed mt-2">
              환경변수 <code className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>를 설정하면 교육공문·활동 사진이
              표시됩니다.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              프로젝트 URL 기본값:{' '}
              <code className="font-mono">https://ldbzgwrabwqvnwfbbiyk.supabase.co</code>
            </p>
          </div>
        ) : (
          <div className="space-y-14">
            {/* 1) 교육공문 — 주로 쓰는 섹션: 상단·가독성 우선 */}
            <section aria-labelledby="education-notices-heading">
              <div className="rounded-2xl bg-white shadow-xl border border-primary-100 overflow-hidden">
                <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-5 md:px-8 md:py-6">
                  <p className="text-sm font-medium text-primary-100">Education notices</p>
                  <h2 id="education-notices-heading" className="mt-1 text-2xl md:text-3xl font-bold text-white">
                    교육공문
                  </h2>
                  <p className="mt-2 text-sm md:text-base text-primary-100">공문 PDF를 날짜순으로 확인할 수 있습니다.</p>
                </div>
                <div className="p-6 md:p-8 lg:p-10">
                  <EducationNoticesList />
                </div>
              </div>
            </section>

            {/* 2) 학회 활동 사진 */}
            <section aria-labelledby="activity-photos-heading">
              <div className="rounded-2xl bg-white shadow-lg border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 md:px-8 border-b border-gray-100 bg-gray-50/80">
                  <h2 id="activity-photos-heading" className="text-xl md:text-2xl font-bold text-gray-900">
                    학회 활동 사진
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">행사·모임 등 학회 활동을 사진으로 만나보세요.</p>
                </div>
                <div className="p-6 md:p-8">
                  <ActivityPhotosGrid />
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}

async function EducationNoticesList() {
  try {
    const notices = await supabaseRestGet<NoticeRow[]>(
      '/rest/v1/notices?select=id,title,pdf_url&order=created_at.desc&limit=50',
    )

    if (notices.length === 0) {
      return <p className="text-gray-600 text-lg">등록된 교육공문이 없습니다.</p>
    }

    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <p className="text-sm text-gray-500">총 {notices.length}건</p>
        </div>

        <ul className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          {notices.map((n) => (
            <li key={n.id} className="hover:bg-primary-50/50 transition-colors">
              <div className="px-5 py-4 md:px-6 md:py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-900 font-semibold text-base md:text-lg leading-snug">{n.title}</p>
                </div>
                <div className="shrink-0">
                  <Link
                    href={n.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center min-w-[7rem] px-5 py-2.5 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-sm"
                  >
                    PDF 보기
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  } catch (e: any) {
    return (
      <div className="space-y-2">
        <p className="text-gray-900 font-semibold">교육공문 목록을 불러오지 못했습니다.</p>
        <p className="text-sm text-gray-600 font-mono">{typeof e?.message === 'string' ? e.message : String(e)}</p>
      </div>
    )
  }
}

async function ActivityPhotosGrid() {
  try {
    const photos = await supabaseRestGet<ActivityPhotoRow[]>(
      '/rest/v1/activity_photos?select=id,image_url,caption,created_at&order=created_at.desc&limit=24',
    )

    if (photos.length === 0) {
      return <p className="text-gray-600">등록된 활동 사진이 없습니다.</p>
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((p) => (
          <figure
            key={p.id}
            className="group rounded-xl border border-gray-100 bg-gray-50 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-[4/3] w-full bg-gray-200">
              <Image
                src={p.image_url}
                alt={p.caption ?? '학회 활동 사진'}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            {p.caption ? (
              <figcaption className="px-4 py-3 text-sm text-gray-700 leading-relaxed">{p.caption}</figcaption>
            ) : (
              <figcaption className="px-4 py-2 text-xs text-gray-400">
                {new Date(p.created_at).toLocaleDateString('ko-KR')}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    )
  } catch (e: any) {
    return (
      <div className="space-y-2">
        <p className="text-gray-900 font-semibold">활동 사진을 불러오지 못했습니다.</p>
        <p className="text-sm text-gray-600 font-mono">{typeof e?.message === 'string' ? e.message : String(e)}</p>
      </div>
    )
  }
}
