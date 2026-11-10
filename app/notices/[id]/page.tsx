import Link from 'next/link'
import { notFound } from 'next/navigation'
import { supabaseRestGetSafe } from '@/lib/supabaseRest'
import type { PostRow } from '@/lib/adminTypes'

export const metadata = {
  title: '공지사항 | 대한아동학교작업치료학회',
}
export default async function NoticeDetailPage({ params }: { params: { id: string } }) {
  if (!/^[0-9a-f-]{36}$/i.test(params.id)) notFound()

  const posts = await supabaseRestGetSafe<PostRow[]>(
    `/rest/v1/posts?select=id,title,body,created_at&id=eq.${params.id}&is_published=eq.true&limit=1`,
    [],
  )
  const post = posts[0]
  if (!post) notFound()

  return (
    <article className="public-page">
      <div className="site-container">
        <header className="page-intro">
          <div>
            <h1>{post.title}</h1>
            <div className="action-pair page-intro__action">
              <Link className="secondary-action" href="/notices">목록으로</Link>
            </div>
          </div>
          <time dateTime={post.created_at}>
            {new Date(post.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
        </header>
        <div className="prose-public notice-copy">{post.body}</div>
      </div>
    </article>
  )
}
