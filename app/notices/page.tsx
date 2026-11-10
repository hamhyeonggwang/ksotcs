import Link from 'next/link'
import PageIntro from '@/components/PageIntro'
import { supabaseRestGetSafeResult } from '@/lib/supabaseRest'
import type { PostRow } from '@/lib/adminTypes'

export const metadata = {
  title: '공지사항 | 대한아동학교작업치료학회',
  description: '대한아동학교작업치료학회의 새로운 소식과 안내',
}
export default async function NoticesPage() {
  const result = await supabaseRestGetSafeResult<PostRow[]>(
    '/rest/v1/posts?select=id,title,body,created_at&is_published=eq.true&order=created_at.desc&limit=100',
    [],
  )
  const posts = result.data

  return (
    <div className="public-page">
      <div className="site-container">
        <PageIntro title="공지사항" description="학회의 새로운 소식과 안내를 확인하세요." />

        {!result.ok ? (
          <div className="status-note" role="status">공지사항을 잠시 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.</div>
        ) : posts.length === 0 ? (
          <div className="paper-panel">등록된 공지사항이 없습니다.</div>
        ) : (
          <ul className="ruled-index" aria-label="공지사항 목록">
            {posts.map((post) => (
              <li key={post.id}>
                <Link href={`/notices/${post.id}`} className="ruled-index__row">
                  <strong>{post.title}</strong>
                  <span>{post.body}</span>
                  <time dateTime={post.created_at}>{new Date(post.created_at).toLocaleDateString('ko-KR')}</time>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
