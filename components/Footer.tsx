import Link from 'next/link'
import SiteBrand from '@/components/SiteBrand'

const footerGroups = [
  {
    title: '학회',
    links: [
      { label: '학회 소개', href: '/about' },
      { label: '조직도와 연혁', href: '/about' },
      { label: '학회 정관', href: '/statutes' },
    ],
  },
  {
    title: '연구와 소식',
    links: [
      { label: '학회지 안내', href: '/journal' },
      { label: '학회소식', href: '/news' },
      { label: '공지사항', href: '/notices' },
    ],
  },
  {
    title: '교육',
    links: [
      { label: '교육센터', href: 'http://ksotcs.co.kr' },
      { label: '민간자격과정', href: '/certification' },
      { label: '연간교육일정', href: '/education-schedule' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <SiteBrand />
            <p>
              대전광역시 서구 관저동로90번길 47<br />
              1106동 402호(관저동)
            </p>
            <p>
              대표번호 010.7631.1778<br />
              사업자등록번호 480-03-03349
            </p>
            <Link href="mailto:ksot4cs@gmail.com">ksot4cs@gmail.com</Link>
          </div>

          <div className="site-footer__links">
            {footerGroups.map((group) => (
              <section key={group.title} aria-labelledby={`footer-${group.title}`}>
                <h2 id={`footer-${group.title}`}>{group.title}</h2>
                <ul>
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.label}`}>
                      <Link
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>

        <div className="site-footer__legal">
          <p>Copyright © 2015 대한아동학교작업치료학회. All right reserved.</p>
          <div className="action-pair">
            <Link href="/about">이용안내</Link>
            <Link href="/about">개인정보처리방침</Link>
            <Link href="/inquiry">문의하기</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
