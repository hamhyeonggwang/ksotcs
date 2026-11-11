import PageIntro from '@/components/PageIntro'

export const metadata = {
  title: '교육센터 | 대한아동·학교작업치료학회',
  description: '대한아동·학교작업치료학회 교육센터 안내',
}
export default function CenterPage() {
  return (
    <div className="public-page">
      <div className="site-container">
        <PageIntro title="교육센터" description="전문 교육센터에서 체계적인 교육을 받으세요." />
        <section className="content-block" aria-labelledby="center-content-heading">
          <h2 id="center-content-heading">교육센터 안내</h2>
          <p className="lead">교육센터 내용이 여기에 표시됩니다. 추후 링크 연동 시 실제 내용으로 업데이트됩니다.</p>
        </section>
      </div>
    </div>
  )
}
