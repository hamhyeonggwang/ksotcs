import Link from 'next/link'
import { supabaseRestGetSafeResult } from '@/lib/supabaseRest'
import type { PostRow } from '@/lib/adminTypes'

export const metadata = {
  title: '공지사항 | 대한아동학교작업치료학회',
}

export default async function NoticesPage() {
  const result = await supabaseRestGetSafeResult<PostRow[]>(
    '/rest/v1/posts?select=id,title,body,created_at&is_published=eq.true&order=created_at.desc&limit=100',
    [],
  )
  const posts = result.data

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">공지사항</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-primary-800 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">학회의 새로운 소식과 안내를 확인하세요</p>
        </div>

        {!result.ok ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <p className="text-gray-600">공지사항을 잠시 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">등록된 공지사항이 없습니다.</p>
          </div>
        ) : (
          <ul className="bg-white rounded-2xl shadow-xl border border-gray-100 divide-y divide-gray-100 overflow-hidden">
            {posts.map((post) => (
              <li key={post.id} className="hover:bg-primary-50/50 transition-colors">
                <Link href={`/notices/${post.id}`} className="block px-6 py-5 md:px-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <p className="text-gray-900 font-semibold text-base md:text-lg leading-snug">{post.title}</p>
                    <p className="shrink-0 text-sm text-gray-400">
                      {new Date(post.created_at).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                  <p className="mt-1.5 text-sm text-gray-500 line-clamp-2">{post.body}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
