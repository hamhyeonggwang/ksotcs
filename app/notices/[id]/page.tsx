import Link from 'next/link'
import { notFound } from 'next/navigation'
import { supabaseRestGetSafe } from '@/lib/supabaseRest'
import type { PostRow } from '@/lib/adminTypes'

export const metadata = {
  title: '공지사항 | 대한아동학교작업치료학회',
}

export default async function NoticeDetailPage({ params }: { params: { id: string } }) {
  // UUID 형식이 아니면 Supabase 조회 없이 404
  if (!/^[0-9a-f-]{36}$/i.test(params.id)) notFound()

  const posts = await supabaseRestGetSafe<PostRow[]>(
    `/rest/v1/posts?select=id,title,body,created_at&id=eq.${params.id}&is_published=eq.true&limit=1`,
    [],
  )
  const post = posts[0]
  if (!post) notFound()

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-6 md:px-10 md:py-8 text-white">
            <p className="text-sm font-medium text-primary-100">공지사항</p>
            <h1 className="mt-2 text-2xl md:text-3xl font-bold leading-snug">{post.title}</h1>
            <p className="mt-3 text-sm text-primary-100">
              {new Date(post.created_at).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div className="px-6 py-8 md:px-10 md:py-10">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{post.body}</p>
          </div>
          <div className="px-6 pb-8 md:px-10">
            <Link
              href="/notices"
              className="inline-flex items-center rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              ← 목록으로
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
