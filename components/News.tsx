import Image from 'next/image'
import Link from 'next/link'
import { getSupabaseRestConfig, supabaseRestGetSafeResult } from '@/lib/supabaseRest'

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

  const [noticesRes, photosRes] = await Promise.all([
    cfg
      ? supabaseRestGetSafeResult<NoticeRow[]>(
          '/rest/v1/notices?select=id,title,pdf_url,created_at&order=created_at.desc&limit=2',
          [],
        )
      : Promise.resolve({ data: [] as NoticeRow[], ok: true as const }),
    cfg
      ? supabaseRestGetSafeResult<ActivityPhotoRow[]>(
          '/rest/v1/activity_photos?select=id,image_url,caption,created_at&order=created_at.desc&limit=1',
          [],
        )
      : Promise.resolve({ data: [] as ActivityPhotoRow[], ok: true as const }),
  ])

  const notices = noticesRes.ok ? noticesRes.data : []
  const photo = photosRes.ok && photosRes.data[0] ? photosRes.data[0] : null
  const loadFailed = Boolean(cfg && (!noticesRes.ok || !photosRes.ok))

  return (
    <section className="section" aria-labelledby="news-heading">
      <div className="site-container">
        <div className="section-head">
          <div>
            <h2 id="news-heading">지금의 학회 소식</h2>
          </div>
          <Link className="secondary-action" href="/news">학회소식 전체 보기</Link>
        </div>

        {loadFailed ? (
          <div className="paper-panel" role="status">
            <strong>학회 소식 데이터를 불러오지 못했습니다.</strong>
            <p>잠시 후 다시 확인해 주세요.</p>
          </div>
        ) : (
          <div className="news-grid">
            <div className="ruled-index">
              {(notices.length > 0 ? notices : [null, null]).slice(0, 2).map((notice, index) => {
                const date = notice?.created_at
                  ? new Date(notice.created_at).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })
                  : '등록된 교육공문이 없습니다'

                return (
                  <Link key={notice?.id ?? `notice-empty-${index}`} href="/news" className="ruled-index__row">
                    <strong>{notice?.title ?? '교육공문'}</strong>
                    <span>{date}</span>
                    <span>내용 확인</span>
                  </Link>
                )
              })}
              <Link href="/notices" className="ruled-index__row">
                <strong>공지사항</strong>
                <span>학회의 새로운 안내를 확인하세요.</span>
                <span>목록 확인</span>
              </Link>
            </div>

            <figure>
              <div
                className="news-photo"
                data-slot="activity-photo"
                data-alt="학회 교육이나 모임 현장을 보여주는 공식 활동 사진"
              >
                {photo ? (
                  <Image
                    src={photo.image_url}
                    alt={photo.caption ?? '학회 활동 사진'}
                    fill
                    unoptimized
                    sizes="(min-width: 60rem) 33vw, 100vw"
                  />
                ) : (
                  <Image
                    src="/images/news-1.jpg"
                    alt="학회 활동 사진을 위한 임시 이미지"
                    fill
                    unoptimized
                    sizes="(min-width: 60rem) 33vw, 100vw"
                  />
                )}
              </div>
              <figcaption>{photo?.caption ?? '학회 활동 사진'}</figcaption>
            </figure>
          </div>
        )}
      </div>
    </section>
  )
}
