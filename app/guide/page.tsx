import Link from 'next/link'
import PageIntro from '@/components/PageIntro'

export const metadata = {
  title: '이용안내 | 대한아동·학교작업치료학회',
  description: '대한아동·학교작업치료학회 홈페이지 이용안내',
}

export default function GuidePage() {
  return (
    <div className="public-page long-document">
      <div className="site-container">
        <PageIntro
          title="이용안내"
          description="학회 홈페이지의 주요 서비스와 이용 방법을 안내합니다."
        />

        <div className="document-stack legal-document">
          <section>
            <h2>홈페이지 안내</h2>
            <div className="prose-public">
              <p>
                대한아동·학교작업치료학회 홈페이지는 학회 소개, 공지사항, 학회지, 민간자격과정 및
                연간교육일정 정보를 제공합니다.
              </p>
              <p>게시된 일정과 내용은 학회 운영 사정에 따라 변경될 수 있으며, 중요한 변경사항은 공지사항을 통해 안내합니다.</p>
            </div>
          </section>

          <section>
            <h2>교육 신청과 교육대상자 조회</h2>
            <div className="fact-list">
              <div>
                <dt>교육 신청·결제</dt>
                <dd>
                  교육 신청과 결제는 별도의 <Link href="https://ksotcs.co.kr" target="_blank" rel="noopener noreferrer">교육센터</Link>에서 진행합니다.
                </dd>
              </div>
              <div>
                <dt>교육대상자 조회</dt>
                <dd>홈페이지 상단의 ‘교육 대상자 조회’에서 이름을 입력하면 현재 진행 중인 교육의 등록 상태를 확인할 수 있습니다.</dd>
              </div>
              <div>
                <dt>조회 시 주의사항</dt>
                <dd>공용 기기에서는 조회를 마친 뒤 창을 닫아 주세요. 동명이인이 있는 경우 여러 결과가 표시될 수 있습니다.</dd>
              </div>
            </div>
          </section>

          <section>
            <h2>콘텐츠와 외부 링크</h2>
            <div className="prose-public">
              <p>홈페이지의 문서, 이미지 및 학회 자료에 관한 권리는 학회 또는 해당 권리자에게 있습니다.</p>
              <p>출처를 밝히더라도 별도 허락 없이 자료를 영리 목적으로 복제·배포하거나 내용을 변경할 수 없습니다.</p>
              <p>외부 사이트로 이동한 이후의 서비스와 개인정보 처리는 해당 사이트의 정책이 적용됩니다.</p>
            </div>
          </section>

          <section>
            <h2>이용 환경과 문의</h2>
            <div className="prose-public">
              <p>최신 버전의 Chrome, Safari, Edge 또는 Firefox 사용을 권장합니다.</p>
              <p>
                홈페이지 내용의 오류, 접근성 문제 또는 이용 문의는 <Link href="mailto:ksot4cs@gmail.com">ksot4cs@gmail.com</Link>으로 보내주세요.
              </p>
              <p><Link href="/privacy">개인정보처리방침 확인</Link></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
