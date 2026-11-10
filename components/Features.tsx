import Link from 'next/link'

const quickLinks = [
  {
    title: '학회소개',
    description: '인사말, 조직과 연혁',
    href: '/about',
    tone: 'peach',
  },
  {
    title: '학회지 안내',
    description: '논문투고와 학회지 규정',
    href: '/journal',
    tone: 'lime',
  },
  {
    title: '민간자격과정',
    description: '자격과정과 시험 안내',
    href: '/certification',
    tone: 'sky',
  },
  {
    title: '연간교육일정',
    description: '월별 교육과정 일정',
    href: '/education-schedule',
    tone: 'lilac',
  },
]

export default function Features() {
  return (
    <section className="quick-links" aria-label="주요 메뉴 바로가기">
      <div className="site-container quick-links__grid">
        {quickLinks.map((item) => (
          <Link key={item.href} href={item.href} className="quick-link" data-tone={item.tone}>
            <strong>{item.title}</strong>
            <span>{item.description}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
