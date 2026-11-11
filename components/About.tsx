import Image from 'next/image'

const facts = [
  {
    title: '최신 연구 발표',
    description: '아동 및 학교 작업치료 분야의 최신 연구를 발표하고 학술 교류를 활성화합니다.',
  },
  {
    title: '전문가 네트워크',
    description: '작업치료 전문가들의 협력과 지식 공유를 통해 전문성을 향상시킵니다.',
  },
  {
    title: '교육 프로그램',
    description: '전문가 양성과 지속적인 교육을 통해 작업치료 분야의 발전을 도모합니다.',
  },
]

export default function About() {
  return (
    <section className="section" aria-labelledby="about-heading">
      <div className="site-container split-feature">
        <figure
          className="split-feature__photo"
          data-slot="field-practice"
          data-alt="아동과 작업치료사가 치료 도구를 함께 사용하는 현장 사진"
        >
          <Image
            src="/images/feature-research-practice.png"
            alt="작업치료사가 아동과 블록 활동을 진행하는 모습"
            fill
            unoptimized
            sizes="(min-width: 60rem) 58vw, 100vw"
          />
        </figure>

        <div className="split-feature__body">
          <div>
            <h2 id="about-heading">연구와 실천을 잇습니다</h2>
            <p className="lead">
              대한아동·학교작업치료학회는 아동과 학교 환경의 연구와 실천을 연결합니다.
            </p>
          </div>

          <dl className="fact-list">
            {facts.map((fact) => (
              <div key={fact.title}>
                <dt>{fact.title}</dt>
                <dd>{fact.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
