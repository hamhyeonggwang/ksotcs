import Link from 'next/link'
import PageIntro from '@/components/PageIntro'

export const metadata = {
  title: '문의 | 대한아동학교작업치료학회',
  description: '대한아동학교작업치료학회 문의 안내',
}
export default function InquiryPage() {
  return (
    <div className="public-page">
      <div className="site-container">
        <PageIntro title="문의하기" description="학회에 대한 문의사항은 이메일로 보내주세요." />

        <div className="two-column-doc">
          <section className="content-block" aria-labelledby="chatbot-heading">
            <h2 id="chatbot-heading">챗봇 상담</h2>
            <div className="status-note" role="status">
              <strong>준비중</strong>
              <p>실시간으로 답변받을 수 있는 챗봇 상담 서비스를 준비하고 있습니다.</p>
            </div>
            <button className="secondary-action" type="button" disabled aria-disabled="true">
              상담 준비중
            </button>
          </section>

          <section className="content-block" aria-labelledby="email-heading">
            <h2 id="email-heading">이메일 문의</h2>
            <p>학회와 교육에 관한 문의 내용을 구체적으로 작성해 보내주세요.</p>
            <Link className="primary-action" href="mailto:ksot4cs@gmail.com">
              이메일 보내기
            </Link>
            <p className="content-block__meta">ksot4cs@gmail.com</p>
          </section>
        </div>

        <section className="content-block section--small" aria-labelledby="inquiry-guide-heading">
          <h2 id="inquiry-guide-heading">문의 안내</h2>
          <div className="fact-list">
            <div>
              <dt>문의 내용</dt>
              <dd>문의 내용을 구체적으로 작성해주시면 더 빠른 답변이 가능합니다.</dd>
            </div>
            <div>
              <dt>답변 일정</dt>
              <dd>이메일 답변은 평일 기준으로 처리되며, 주말 및 공휴일은 제외됩니다.</dd>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
