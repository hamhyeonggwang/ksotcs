import Link from 'next/link'
import NoticeBoard, { type NoticeBoardItem } from '@/components/NoticeBoard'
import { supabaseRestGetSafeResult } from '@/lib/supabaseRest'

export const metadata = {
  title: '공지사항 | 대한아동학교작업치료학회',
  description: '대한아동학교작업치료학회의 새로운 소식과 안내',
}
export default async function NoticesPage() {
  const result = await supabaseRestGetSafeResult<NoticeBoardItem[]>(
    '/rest/v1/posts?select=id,title,body,created_at&is_published=eq.true&order=created_at.desc&limit=100',
    [],
  )
  const posts = result.data

  return (
    <div className="public-page">
      <div className="site-container">
        <div className="notice-masthead">
          <h1>공지사항</h1>
          <div>
            <p>학회 운영, 회원 안내와 주요 일정을 정확하게 확인하세요.</p>
            <Link className="secondary-action" href="/inquiry">문의하기</Link>
          </div>
        </div>

        {!result.ok ? (
          <div className="notice-board__empty" role="status">
            <strong>공지사항을 잠시 불러올 수 없습니다.</strong>
            <p>잠시 후 다시 시도해 주세요.</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="notice-board__empty" role="status">
            <strong>등록된 공지사항이 없습니다.</strong>
            <p>새 공지가 등록되면 이곳에서 확인할 수 있습니다.</p>
          </div>
        ) : (
          <NoticeBoard posts={posts} />
        )}
      </div>
    </div>
  )
}
