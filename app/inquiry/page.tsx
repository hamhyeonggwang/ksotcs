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

        <div className="inquiry-primary">
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
