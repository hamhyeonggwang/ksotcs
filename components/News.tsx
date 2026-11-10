import Image from 'next/image'
import Link from 'next/link'
import { getSupabaseRestConfig, supabaseRestGetSafeResult } from '@/lib/supabaseRest'
import type { EducationScheduleRow } from '@/lib/adminTypes'
import { FALLBACK_SCHEDULES } from '@/lib/educationSchedules'

type PostRow = { id: string; title: string; created_at: string }
type NoticeRow = { id: string; title: string; pdf_url: string; created_at: string }
type EducationPosterRow = { id: string; image_url: string; caption: string | null; created_at: string }
type HomeListItem = { id: string; title: string; meta: string; href: string; external?: boolean }

function dateLabel(value: string) {
  return new Date(value).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

function HomePanel({ title, href, items }: { title: string; href: string; items: HomeListItem[] }) {
  return (
    <section className="home-board" aria-labelledby={`home-${title}`}>
      <div className="home-board__head">
        <h2 id={`home-${title}`}>{title}</h2>
        <Link href={href} aria-label={`${title} 전체 보기`}>전체 보기</Link>
      </div>
      {items.length > 0 ? (
        <ul>
          {items.slice(0, 5).map((item) => (
            <li key={item.id}>
              <Link href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noopener noreferrer' : undefined}>
                <span>{item.title}</span>
                <time>{item.meta}</time>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="home-board__empty">등록된 내용이 없습니다.</p>
      )}
    </section>
  )
}

export default async function News() {
  const cfg = getSupabaseRestConfig()
  const empty = <T,>(data: T) => Promise.resolve({ data, ok: true as const })

  const [postsRes, noticesRes, schedulesRes, postersRes] = await Promise.all([
    cfg
      ? supabaseRestGetSafeResult<PostRow[]>('/rest/v1/posts?select=id,title,created_at&is_published=eq.true&order=created_at.desc&limit=5', [])
      : empty<PostRow[]>([]),
    cfg
      ? supabaseRestGetSafeResult<NoticeRow[]>('/rest/v1/notices?select=id,title,pdf_url,created_at&order=created_at.desc&limit=5', [])
      : empty<NoticeRow[]>([]),
    cfg
      ? supabaseRestGetSafeResult<EducationScheduleRow[]>('/rest/v1/education_schedules?select=*&is_visible=eq.true&order=month.asc,sort_order.asc&limit=5', [])
      : empty<EducationScheduleRow[]>([]),
    cfg
      ? supabaseRestGetSafeResult<EducationPosterRow[]>('/rest/v1/activity_photos?select=id,image_url,caption,created_at&order=created_at.desc&limit=6', [])
      : empty<EducationPosterRow[]>([]),
  ])

  const posts = postsRes.ok ? postsRes.data : []
  const notices = noticesRes.ok ? noticesRes.data : []
  const schedules = schedulesRes.ok && schedulesRes.data.length > 0 ? schedulesRes.data : FALLBACK_SCHEDULES.slice(0, 5)
  const posters = postersRes.ok ? postersRes.data : []
  const loadFailed = Boolean(cfg && (!postsRes.ok || !noticesRes.ok || !schedulesRes.ok || !postersRes.ok))

  const postItems: HomeListItem[] = posts.map((post) => ({ id: post.id, title: post.title, meta: dateLabel(post.created_at), href: `/notices/${post.id}` }))
  const noticeItems: HomeListItem[] = notices.map((notice) => ({ id: notice.id, title: notice.title, meta: dateLabel(notice.created_at), href: notice.pdf_url, external: true }))
  const scheduleItems: HomeListItem[] = schedules.map((schedule) => ({ id: schedule.id, title: schedule.education_name, meta: schedule.period, href: '/education-schedule' }))

  return (
    <>
      <section className="home-information" aria-label="학회 안내와 일정">
        <div className="site-container">
          {loadFailed ? <p className="status-note" role="status">일부 최신 정보를 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.</p> : null}
          <div className="home-information__grid">
            <HomePanel title="공지사항" href="/notices" items={postItems} />
            <HomePanel title="교육공문" href="/news" items={noticeItems} />
            <HomePanel title="연간교육일정" href="/education-schedule" items={scheduleItems} />
          </div>
        </div>
      </section>

      <section className="poster-section" aria-labelledby="poster-section-heading">
        <div className="site-container poster-section__head">
          <div>
            <h2 id="poster-section-heading">교육공지 포스터</h2>
            <p>교육 과정의 일정과 신청 정보를 확인하세요.</p>
          </div>
          <Link className="secondary-action" href="/news">포스터 전체 보기</Link>
        </div>
        <div className="poster-rail-wrap">
          {posters.length > 0 ? (
            <ul className="poster-rail" aria-label="최신 교육공지 포스터" tabIndex={0}>
              {posters.map((poster) => (
                <li key={poster.id}>
                  <Link href="/news">
                    <figure>
                      <div className="poster-rail__image">
                        <Image src={poster.image_url} alt={poster.caption ?? '교육공지 포스터'} fill unoptimized sizes="(max-width: 40rem) 74vw, 20rem" />
                      </div>
                      <figcaption>{poster.caption ?? dateLabel(poster.created_at)}</figcaption>
                    </figure>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="site-container"><p className="poster-section__empty">등록된 교육공지 포스터가 없습니다.</p></div>
          )}
        </div>
      </section>

      <section className="home-practical" aria-label="교육과 문의 안내">
        <div className="site-container home-practical__grid">
          <div>
            <h2>교육 신청과 수강</h2>
            <p>교육 과정 신청과 결제는 학회 교육센터에서 진행합니다.</p>
            <Link href="http://ksotcs.co.kr" target="_blank" rel="noopener noreferrer">교육센터 방문</Link>
          </div>
          <div>
            <h2>학회 문의</h2>
            <p>학회와 교육에 관한 문의는 이메일로 보내주세요.</p>
            <Link href="mailto:ksot4cs@gmail.com">ksot4cs@gmail.com</Link>
          </div>
        </div>
      </section>
    </>
  )
}
