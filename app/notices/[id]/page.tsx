import Link from 'next/link'
import { notFound } from 'next/navigation'
import { supabaseRestGetSafe } from '@/lib/supabaseRest'
import type { PostRow } from '@/lib/adminTypes'

export const metadata = {
  title: '공지사항 | 대한아동학교작업치료학회',
}
export default async function NoticeDetailPage({ params }: { params: { id: string } }) {
  if (!/^[0-9a-f-]{36}$/i.test(params.id)) notFound()

  const [posts, noticeIndex] = await Promise.all([
    supabaseRestGetSafe<PostRow[]>(
      `/rest/v1/posts?select=id,title,body,created_at&id=eq.${params.id}&is_published=eq.true&limit=1`,
      [],
    ),
    supabaseRestGetSafe<Pick<PostRow, 'id' | 'title' | 'created_at'>[]>(
      '/rest/v1/posts?select=id,title,created_at&is_published=eq.true&order=created_at.desc&limit=100',
      [],
    ),
  ])
  const post = posts[0]
  if (!post) notFound()
  const currentIndex = noticeIndex.findIndex((item) => item.id === post.id)
  const newerPost = currentIndex > 0 ? noticeIndex[currentIndex - 1] : null
  const olderPost = currentIndex >= 0 && currentIndex < noticeIndex.length - 1 ? noticeIndex[currentIndex + 1] : null

  return (
    <article className="public-page notice-detail-page">
      <div className="site-container">
        <nav className="notice-breadcrumb" aria-label="현재 위치">
          <Link href="/">홈</Link>
          <span aria-hidden="true">/</span>
          <Link href="/notices">공지사항</Link>
        </nav>

        <header className="notice-detail__head">
          <h1>{post.title}</h1>
          <div className="notice-detail__meta">
            <span>대한아동학교작업치료학회</span>
            <time dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          </div>
        </header>

        <div className="notice-detail__body">
          <div className="prose-public notice-copy">{post.body}</div>
        </div>

        <nav className="notice-neighbors" aria-label="이전 글과 다음 글">
          {newerPost ? (
            <Link href={`/notices/${newerPost.id}`}>
              <span>다음 글</span>
              <strong>{newerPost.title}</strong>
            </Link>
          ) : null}
          {olderPost ? (
            <Link href={`/notices/${olderPost.id}`}>
              <span>이전 글</span>
              <strong>{olderPost.title}</strong>
            </Link>
          ) : null}
        </nav>

        <div className="notice-detail__actions">
          <Link className="secondary-action" href="/notices">목록으로</Link>
        </div>
      </div>
    </article>
  )
}
