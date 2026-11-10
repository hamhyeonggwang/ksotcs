'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

export type NoticeBoardItem = {
  id: string
  title: string
  body: string
  created_at: string
}

const PAGE_SIZE = 10

function compact(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

function displayDate(value: string) {
  return new Date(value).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export default function NoticeBoard({ posts }: { posts: NoticeBoardItem[] }) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const indexedPosts = useMemo(
    () => posts.map((post, index) => ({ ...post, number: posts.length - index })),
    [posts],
  )

  const filteredPosts = useMemo(() => {
    const keyword = compact(query).toLocaleLowerCase('ko-KR')
    if (!keyword) return indexedPosts
    return indexedPosts.filter((post) => compact(`${post.title} ${post.body}`).toLocaleLowerCase('ko-KR').includes(keyword))
  }, [indexedPosts, query])

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const visiblePosts = filteredPosts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  useEffect(() => setPage(1), [query])

  return (
    <section className="notice-board" aria-labelledby="notice-board-heading">
      <div className="notice-board__summary">
        <div>
          <h2 id="notice-board-heading">전체 공지</h2>
          <p>학회 운영과 회원 안내에 관한 공지를 최신순으로 제공합니다.</p>
        </div>
        <p className="notice-board__count" aria-live="polite">
          총 <strong>{filteredPosts.length}</strong>건
        </p>
      </div>

      <div className="notice-board__toolbar">
        <label htmlFor="notice-search">공지 검색</label>
        <div className="notice-search">
          <input
            id="notice-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="제목이나 내용으로 검색"
          />
          {query ? (
            <button type="button" onClick={() => setQuery('')}>
              검색 초기화
            </button>
          ) : null}
        </div>
      </div>

      {visiblePosts.length === 0 ? (
        <div className="notice-board__empty" role="status">
          <strong>검색 결과가 없습니다.</strong>
          <p>다른 검색어를 입력하거나 검색을 초기화해 주세요.</p>
        </div>
      ) : (
        <>
          <div className="notice-list__head" aria-hidden="true">
            <span>번호</span>
            <span>제목</span>
            <span>등록일</span>
          </div>
          <ol className="notice-list" aria-label={`공지사항 검색 결과 ${filteredPosts.length}건`}>
            {visiblePosts.map((post) => (
              <li key={post.id}>
                <Link href={`/notices/${post.id}`} className="notice-list__link">
                  <span className="notice-list__number">{String(post.number).padStart(2, '0')}</span>
                  <span className="notice-list__copy">
                    <strong>{post.title}</strong>
                    <span>{compact(post.body)}</span>
                  </span>
                  <time dateTime={post.created_at}>{displayDate(post.created_at)}</time>
                </Link>
              </li>
            ))}
          </ol>
        </>
      )}

      {totalPages > 1 ? (
        <nav className="notice-board__pagination" aria-label="공지사항 페이지 이동">
          <button type="button" disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>
            이전
          </button>
          <div>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                aria-label={`${pageNumber}페이지`}
                aria-current={pageNumber === currentPage ? 'page' : undefined}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </div>
          <button type="button" disabled={currentPage === totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))}>
            다음
          </button>
        </nav>
      ) : null}
    </section>
  )
}
