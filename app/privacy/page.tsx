import Link from 'next/link'
import PageIntro from '@/components/PageIntro'

export const metadata = {
  title: '개인정보처리방침 | 대한아동·학교작업치료학회',
  description: '대한아동·학교작업치료학회 개인정보처리방침',
}

export default function PrivacyPage() {
  return (
    <div className="public-page long-document">
      <div className="site-container">
        <PageIntro
          title="개인정보처리방침"
          description="학회 홈페이지에서 처리하는 개인정보와 보호 기준을 안내합니다."
        />

        <p className="status-note">시행일: 2026년 11월 11일</p>

        <div className="document-stack legal-document">
          <section>
            <h2>1. 개인정보의 처리 목적·항목·보유기간</h2>
            <p className="prose-public">
              대한아동·학교작업치료학회는 아래 목적에 필요한 최소한의 개인정보를 처리합니다.
            </p>
            <table className="data-table responsive-table">
              <thead>
                <tr><th>구분</th><th>처리 목적</th><th>처리 항목</th><th>보유기간</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="구분">교육대상자 명단</td>
                  <td data-label="처리 목적">교육 신청 확인, 대상자 선정 및 등록 상태 조회</td>
                  <td data-label="처리 항목">이름, 이메일(선택), 교육명, 등록 상태</td>
                  <td data-label="보유기간">교육 운영과 관련 행정업무 종료 시까지. 보존 필요가 있는 경우 관계 법령에서 정한 기간</td>
                </tr>
                <tr>
                  <td data-label="구분">이메일 문의</td>
                  <td data-label="처리 목적">문의 확인과 답변</td>
                  <td data-label="처리 항목">발신자 이름·이메일 주소, 문의 내용</td>
                  <td data-label="보유기간">문의 처리 완료 후 지체 없이 삭제. 분쟁 대응이 필요한 경우 해결 시까지</td>
                </tr>
                <tr>
                  <td data-label="구분">관리자 계정</td>
                  <td data-label="처리 목적">관리자 본인 확인과 홈페이지 운영</td>
                  <td data-label="처리 항목">이메일 주소, 인증 식별자, 로그인 기록</td>
                  <td data-label="보유기간">관리자 권한 종료 또는 계정 삭제 시까지</td>
                </tr>
                <tr>
                  <td data-label="구분">자동 생성 정보</td>
                  <td data-label="처리 목적">서비스 안정성, 보안, 오류 분석</td>
                  <td data-label="처리 항목">접속 일시, IP 주소, 브라우저·기기 정보, 서비스 이용 기록</td>
                  <td data-label="보유기간">서비스 제공자의 로그 보유 정책 또는 관계 법령에서 정한 기간</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2>2. 개인정보의 수집 방법</h2>
            <div className="prose-public">
              <p>교육 신청·운영 과정에서 제출된 명단, 이메일 문의, 관리자 로그인 과정에서 개인정보를 수집합니다.</p>
              <p>교육대상자 조회 시 입력한 이름은 일치하는 명단을 찾는 목적으로만 사용됩니다.</p>
            </div>
          </section>

          <section>
            <h2>3. 개인정보의 제3자 제공</h2>
            <div className="prose-public">
              <p>학회는 원칙적으로 정보주체의 개인정보를 제3자에게 제공하지 않습니다.</p>
              <p>다만 정보주체가 사전에 동의했거나 법령에 특별한 규정이 있는 경우에는 필요한 범위에서 제공할 수 있습니다.</p>
            </div>
          </section>

          <section>
            <h2>4. 개인정보 처리업무의 위탁</h2>
            <table className="data-table responsive-table">
              <thead><tr><th>수탁자</th><th>위탁 업무</th></tr></thead>
              <tbody>
                <tr><td data-label="수탁자">Supabase, Inc.</td><td data-label="위탁 업무">교육대상자 데이터 저장, 관리자 인증 및 데이터베이스 운영</td></tr>
                <tr><td data-label="수탁자">Vercel Inc.</td><td data-label="위탁 업무">홈페이지 호스팅, 배포 및 서비스 로그 처리</td></tr>
                <tr><td data-label="수탁자">Google LLC</td><td data-label="위탁 업무">이메일 문의 수신과 답변</td></tr>
              </tbody>
            </table>
            <p className="prose-public">수탁자 또는 위탁 업무가 변경되는 경우 본 방침을 통해 공개합니다.</p>
          </section>

          <section>
            <h2>5. 개인정보의 파기</h2>
            <div className="prose-public">
              <p>보유기간이 끝나거나 처리 목적이 달성된 개인정보는 지체 없이 파기합니다.</p>
              <p>전자적 파일은 복구할 수 없는 방법으로 삭제하고, 종이 문서는 분쇄하거나 소각합니다.</p>
              <p>관계 법령에 따라 보존해야 하는 정보는 다른 정보와 분리해 해당 기간 동안 보관합니다.</p>
            </div>
          </section>

          <section>
            <h2>6. 정보주체의 권리와 행사 방법</h2>
            <div className="prose-public">
              <p>정보주체는 자신의 개인정보에 대해 열람, 정정·삭제, 처리정지 또는 동의 철회를 요청할 수 있습니다.</p>
              <p>요청은 학회 개인정보 담당 창구에 이메일 또는 전화로 접수할 수 있으며, 본인 확인 후 지체 없이 처리합니다.</p>
              <p>법정대리인은 정보주체를 대신해 권리를 행사할 수 있으며, 이 경우 위임장 등 대리 관계를 확인할 수 있는 자료가 필요합니다.</p>
            </div>
          </section>

          <section>
            <h2>7. 개인정보의 안전성 확보 조치</h2>
            <ul className="prose-public">
              <li>관리자 인증과 권한 확인을 통한 접근 통제</li>
              <li>전송 구간 암호화와 보안 업데이트 적용</li>
              <li>개인정보 접근 권한의 최소화와 관리자 계정 관리</li>
              <li>접속 기록 점검 및 데이터 백업 관리</li>
            </ul>
          </section>

          <section>
            <h2>8. 자동 수집 장치와 브라우저 저장소</h2>
            <div className="prose-public">
              <p>홈페이지는 관리자 로그인 유지와 팝업 표시 여부 저장 등을 위해 브라우저 저장소를 사용할 수 있습니다.</p>
              <p>이용자는 브라우저 설정에서 저장된 정보를 삭제할 수 있으며, 삭제 시 로그인 유지 등 일부 기능이 제한될 수 있습니다.</p>
            </div>
          </section>

          <section>
            <h2>9. 개인정보 보호 담당 창구</h2>
            <div className="fact-list">
              <div><dt>담당</dt><dd>대한아동·학교작업치료학회 사무국</dd></div>
              <div><dt>이메일</dt><dd><Link href="mailto:ksot4cs@gmail.com">ksot4cs@gmail.com</Link></dd></div>
              <div><dt>전화</dt><dd>010-7631-1778</dd></div>
              <div><dt>주소</dt><dd>대전광역시 서구 관저동로90번길 47, 1106동 402호(관저동)</dd></div>
            </div>
          </section>

          <section>
            <h2>10. 권익침해 구제와 처리방침 변경</h2>
            <div className="prose-public">
              <p>
                개인정보 침해에 관한 상담과 신고는 <Link href="https://www.privacy.go.kr" target="_blank" rel="noopener noreferrer">개인정보 포털</Link> 또는
                {' '}<Link href="https://privacy.kisa.or.kr" target="_blank" rel="noopener noreferrer">개인정보침해 신고센터</Link>를 이용할 수 있습니다.
              </p>
              <p>본 방침이 변경되는 경우 시행 전에 홈페이지를 통해 변경 내용과 시행일을 안내합니다.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
