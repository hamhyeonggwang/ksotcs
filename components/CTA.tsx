import Link from 'next/link'

export default function CTA() {
  return (
    <section className="section--accent section--small" aria-labelledby="join-heading">
      <div className="site-container section-head">
        <div>
          <h2 id="join-heading">교육과 회원 활동을 이어가세요</h2>
        </div>
        <div className="action-pair">
          <Link
            className="primary-action"
            href="http://ksotcs.co.kr"
            target="_blank"
            rel="noopener noreferrer"
          >
            교육센터 방문
          </Link>
          <Link
            className="secondary-action"
            href="https://ksotcs.co.kr/%ed%9a%8c%ec%9b%90%ea%b0%80%ec%9e%85/"
            target="_blank"
            rel="noopener noreferrer"
          >
            학회 가입하기
          </Link>
        </div>
      </div>
    </section>
  )
}
