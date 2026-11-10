import Image from 'next/image'
import Link from 'next/link'
import PageIntro from '@/components/PageIntro'
import { getSupabaseRestConfig, supabaseRestGet } from '@/lib/supabaseRest'

type NoticeRow = { id: string; title: string; pdf_url: string }
type ActivityPhotoRow = { id: string; image_url: string; caption: string | null; created_at: string }

export const metadata = {
  title: '학회소식 | 대한아동학교작업치료학회',
  description: '대한아동학교작업치료학회 교육공문과 활동 사진',
}
export default function NewsPage() {
  const cfg = getSupabaseRestConfig()

  return (
    <div className="public-page">
      <div className="site-container">
        <PageIntro title="학회소식" description="교육공문과 학회 활동 소식을 확인하세요." />

        {!cfg ? (
          <div className="status-note" role="status">
            <strong>Supabase 설정이 필요합니다.</strong>
            <p>환경변수를 설정하면 교육공문과 활동 사진이 표시됩니다.</p>
          </div>
        ) : (
          <div className="document-stack">
            <section className="content-block" aria-labelledby="education-notices-heading">
              <div className="section-head">
                <h2 id="education-notices-heading">교육공문</h2>
                <p>공문 PDF를 날짜순으로 확인할 수 있습니다.</p>
              </div>
              <EducationNoticesList />
            </section>

            <section className="content-block" aria-labelledby="activity-photos-heading">
              <div className="section-head">
                <h2 id="activity-photos-heading">학회 활동 사진</h2>
                <p>행사와 모임 등 학회 활동을 사진으로 만나보세요.</p>
              </div>
              <ActivityPhotosGrid />
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

    if (notices.length === 0) return <p className="paper-panel">등록된 교육공문이 없습니다.</p>

    return (
      <ul className="ruled-index" aria-label={`교육공문 총 ${notices.length}건`}>
        {notices.map((notice) => (
          <li key={notice.id}>
            <Link
              href={notice.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="ruled-index__row"
            >
              <strong>{notice.title}</strong>
              <span>교육공문</span>
              <span>PDF 보기</span>
            </Link>
          </li>
        ))}
      </ul>
    )
  } catch (error: any) {
    return (
      <div className="status-note" role="status">
        <strong>교육공문 목록을 불러오지 못했습니다.</strong>
        <p>{typeof error?.message === 'string' ? error.message : String(error)}</p>
      </div>
    )
  }
}
async function ActivityPhotosGrid() {
  try {
    const photos = await supabaseRestGet<ActivityPhotoRow[]>(
      '/rest/v1/activity_photos?select=id,image_url,caption,created_at&order=created_at.desc&limit=24',
    )

    if (photos.length === 0) return <p className="paper-panel">등록된 활동 사진이 없습니다.</p>

    return (
      <div className="photo-grid">
        {photos.map((photo) => (
          <figure key={photo.id}>
            <div className="photo-grid__image">
              <Image
                src={photo.image_url}
                alt={photo.caption ?? '학회 활동 사진'}
                fill
                unoptimized
                sizes="(max-width: 40rem) 100vw, (max-width: 60rem) 50vw, 33vw"
              />
            </div>
            <figcaption>
              {photo.caption ?? new Date(photo.created_at).toLocaleDateString('ko-KR')}
            </figcaption>
          </figure>
        ))}
      </div>
    )
  } catch (error: any) {
    return (
      <div className="status-note" role="status">
        <strong>활동 사진을 불러오지 못했습니다.</strong>
        <p>{typeof error?.message === 'string' ? error.message : String(error)}</p>
      </div>
    )
  }
}
