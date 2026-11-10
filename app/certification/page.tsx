import PageIntro from '@/components/PageIntro'

export const metadata = {
  title: '민간자격과정 안내 | 대한아동학교작업치료학회',
  description: '대한아동학교작업치료학회의 민간자격과정 안내',
}
export default function CertificationPage() {
  return (
    <div className="public-page">
      <div className="site-container">
        <PageIntro title="민간자격과정 안내" description="학회가 운영하는 민간자격과정과 자격시험을 확인하세요." />

        <div className="qualification-grid">
          <article className="content-block">
            <h2>아동발달평가사</h2>
            <p className="content-block__meta">Child Development Assessor</p>
            <p>
              <strong>[아동발달평가사]</strong> 자격은 자격기본법에 의거하여 한국직업능력개발원에 정식 등록된
              민간자격(제2019-002975, 교육부)이며, 학회의 자격관리 규정에 따라 교육 및 자격증 발부가 운영되고 있습니다.
            </p>
            <h3>직무 내용</h3>
            <p>
              아동의 전반적 발달영역에 대한 지식 및 발달평가도구 활용능력을 바탕으로 발달검사와 결과 해석,
              결과보고서 작성의 업무를 수행합니다.
            </p>
          </article>

          <article className="content-block">
            <h2>인지발달심리상담지도사</h2>
            <p className="content-block__meta">Cognitive Development Psycho-Counselor</p>
            <p>
              <strong>[인지발달심리상담지도사]</strong> 자격은 자격기본법에 의거하여 한국직업능력개발원에 정식 등록된
              민간자격(제2019-003433, 보건복지부)이며, 학회의 자격관리 규정에 따라 교육 및 자격증 발급이 운영되고 있습니다.
            </p>
            <h3>직무 내용</h3>
            <p>
              인지기능을 유지하고 향상시키기 위한 인지활동 프로그램을 개발하고 활용, 지도 및 심리상담의 업무를 수행합니다.
            </p>
          </article>

          <article className="content-block">
            <h2>자격시험 안내</h2>
            <p className="content-block__meta">2급 / 1급 / 전문가 과정</p>
            <p>
              각각의 민간자격과정에 포함된 강좌를 이수하신 분들은 자격시험을 거쳐 2급 / 1급 / 전문가 등급의
              자격증이 발급됩니다.
            </p>
            <p>자세한 내용은 각각의 교육 공문을 참조바랍니다.</p>
          </article>
        </div>
      </div>
    </div>
  )
}
