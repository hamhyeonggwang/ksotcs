import Link from 'next/link'

const services = [
  {
    title: '학회지 안내',
    description: '아동과 학교 작업치료 분야의 논문투고 안내, 투고규정과 연구윤리규정을 확인하세요.',
    href: '/journal',
    action: '학회지 안내 보기',
  },
  {
    title: '학회소식',
    description: '교육공문과 학회 활동 사진을 한곳에서 확인하세요.',
    href: '/news',
    action: '학회소식 확인',
  },
  {
    title: '교육센터',
    description: '교육 프로그램과 세미나, 회원 교육은 교육센터에서 이어집니다.',
    href: 'http://ksotcs.co.kr',
    action: '교육센터 방문',
  },
]

export default function Features() {
  return (
    <section className="section section--paper-2" aria-labelledby="services-heading">
      <div className="site-container">
        <div className="section-head">
          <h2 id="services-heading">연구, 소식, 교육</h2>
          <p>학회의 주요 활동을 필요한 순서대로 찾아보세요.</p>
        </div>

        <div className="bento-services">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              target={service.href.startsWith('http') ? '_blank' : undefined}
              rel={service.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="service-panel"
            >
              <div>
                <h3>{service.title}</h3>
                <p className="lead">{service.description}</p>
              </div>
              <strong>{service.action}</strong>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
