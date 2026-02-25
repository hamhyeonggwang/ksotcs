export default function StatutesPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            학회 정관
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-primary-800 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            대한아동·학교작업치료학회 정관
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            {/* 제 1 장 총칙 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary-200">
                제 1 장 총 칙
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제1조(명칭)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    본 회는 대한아동·학교작업치료학회라 칭하며 영문표기는 The Korean Society of Occupational Therapy for Child and School(약칭: KSOCS)로 한다.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제2조(목적)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    본 회는 아동 및 학교작업치료의 연구를 촉진하고 치료사들의 질적 향상을 통하여 이 분야의 발전에 기여함으로써 아동들의 발달 및 적응을 돕는 것을 목적으로 한다.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제3조(사무소의 위치)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    본 회의 사무실은 별도의 사무실을 임대계약 하는 것으로 한다.
                  </p>
                </div>
              </div>
            </section>

            {/* 제 2 장 사업 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary-200">
                제 2 장 사업
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 4조(사업)</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    본 회는 제 2조의 목적을 달성하기 위해 다음과 같은 사업을 시행한다.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                    <li>아동 및 학교 작업치료발전에 관한 교육 및 연구</li>
                    <li>연구발표회 및 학술대회 개최</li>
                    <li>학회지(대한아동·학교작업치료학회: The Korean Journal of Occupational Therapy for Child and School), 기타 출판물의 편집 및 간행</li>
                    <li>아동 및 학교 작업치료사의 교육 및 전문 치료사 양성</li>
                    <li>민간자격증 발급을 위한 교육 및 자격검정</li>
                    <li>국내외 관련 단체와의 교류</li>
                    <li>기타 본 회의 목적 달성에 필요한 사업</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 5조(수익사업 및 수익의 사용)</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                    <li>본 회는 제 2조의 목적에 부합하는 수익사업을 할 수 있다.</li>
                    <li>해당 수익은 단체를 위해서 사용하고 개개인에게 수익을 배분하지 않는다.</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* 제 3 장 회원 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary-200">
                제 3 장 회원
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 6조(회원의 종류)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    본 회의 회원은 일반회원, 정회원, 평생회원으로 구성된다.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 7조(회원의 자격)</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    학회의 회원 자격은 다음과 같다.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-gray-800 mb-2">1. 일반회원은 다음 각 항에 해당하는 자로 한다.</p>
                      <ol className="list-decimal list-inside space-y-1 text-gray-700 ml-4">
                        <li>대학 및 대학원에서 작업치료를 전공하고 있는 자</li>
                        <li>작업치료 관련 전공자</li>
                      </ol>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 mb-2">2. 정회원은 다음 각 항에 해당하는 자로 한다.</p>
                      <ol className="list-decimal list-inside space-y-1 text-gray-700 ml-4">
                        <li>작업치료사 면허를 취득한 자</li>
                        <li>위의 1항에 해당되지 않으나 본 학회의 목적에 동의하는 자로서 회원 2인 이상의 추천을 얻은 자</li>
                      </ol>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 mb-2">3. 평생회원은 다음 각 항에 해당하는 자로 한다.</p>
                      <ol className="list-decimal list-inside space-y-1 text-gray-700 ml-4">
                        <li>본 학회의 이사회에서 인정한 자</li>
                        <li>정회원 중 평생회비를 납부한자</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 8조(가입절차)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    일반회원과 정회원은 홈페이지에 등록하여 가입하여 회원의 자격을 취득한다.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 9조(회원의 의무)</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    학회 회원은 다음 각 호의 의무를 진다.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                    <li>회원은 본회의 정관을 준수하고, 연수교육 등에 참가할 경우 소정의 부담금을 납부하여야 한다.</li>
                    <li>회원은 본회가 주관하는 총회 및 학술활동에 적극적으로 참여하여야 한다.</li>
                    <li>회원은 본회가 의결한 사항 및 규정 등을 준수하여야 한다.</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 10조(회원의 권리)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    회원은 학회에서 주최하는 교육의 우선권 및 본 학회 자료를 열람할 수 있는 권리가 주어진다.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 11조(회원의 징계)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    본회의 명예를 훼손하거나 재산상의 손해를 끼치는 행위를 하였을 경우 이사회의 의결에 따라 징계할 수 있으며 징계 방법에 대해서는 이사회의 의결에 따른다.
                  </p>
                </div>
              </div>
            </section>

            {/* 제 4 장 임원 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary-200">
                제 4 장 임원
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 12조(임원의 종류)</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    본회에는 다음의 인원을 둔다.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                    <li>회장 1인</li>
                    <li>부회장 2인 이내</li>
                    <li>이사 10인 내외</li>
                    <li>감사 2인</li>
                    <li>고문 1인 이상</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 13조(임원의 자격)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    임원의 자격은 본 회의 의무를 성실히 이행한 자로 한다.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 14조(임원의 선출)</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                    <li>회장은 이사회에서 다수결에 의하여 선출한다.</li>
                    <li>감사는 이사회에서 선출한다.</li>
                    <li>부회장과 임명직 이사는 회장이 추천하며, 이사회에서 인준을 받는다.</li>
                    <li>고문은 이사회에서 추대한다.</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 15조(임원의 임무)</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    본 회 임원의 임무는 다음과 같다.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                    <li>회장은 본 회를 대표하고 회무를 총괄하며 총회와 이사회의 의장이 된다.</li>
                    <li>부회장은 회장을 보좌하고 회장 유고 시 그 임무를 대행한다.</li>
                    <li>총무이사는 본회의 사무를 총괄한다.</li>
                    <li>그 외 임명직 이사는 이사회의 구성원으로서 본 회의 각종 업무를 분장, 운영하며 총회, 이사회 또는 회장으로부터 위임받은 업무를 수행한다.</li>
                    <li>감사는 본 회의 사업과 회계를 매년 1회 감사하고 그 결과를 이사회 및 총회에 보고한다.</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 16조(임원의 임기)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    본 회 임원의 임기는 2년으로 한다.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 17조(임원의 보선)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    본 회 임원 중 결원이 생길 경우 이사회에서 보선하되 그 임기는 전임자의 잔여 임기로 한다.
                  </p>
                </div>
              </div>
            </section>

            {/* 제 5 장 총회 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary-200">
                제 5 장 총 회
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 18조(총회의 구성 및 소집)</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    본 회의 총회는 정기총회와 임시총회로 나눈다.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                    <li>정기총회는 연 1회 학술대회 기간에 회장이 소집한다.</li>
                    <li>임시총회는 의사회의 결의나 회원 3분의 1이상의 요청이 있을 때 회장이 소집한다.</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 19조(성립 및 의결)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    총회는 출석 인원으로 성립되고 모든 의결은 참석인원의 과반수로 의결한다.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 20조(총회의 소집통지)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    총회의 소집은 서면 또는 전자메일로 통지한다.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 21조(총회의 의결사항)</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    총회는 다음 사항을 의결한다.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                    <li>학회 해산에 관한 사항</li>
                    <li>사업보고 및 결산 승인에 관한 사항</li>
                    <li>기타 본 회 운영에 관한 사항</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 22조(총회의사록)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    총회의사록을 작성한 이사 중 3인 이상이 기명날인하여 보관한다.
                  </p>
                </div>
              </div>
            </section>

            {/* 제 6 장 이사회 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary-200">
                제 6 장 이 사 회
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 23조(이사회의 구성)</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                    <li>이사회는 회장, 부회장을 비롯한 이사로 구성한다.</li>
                    <li>업무 수행 필요에 따라 간사를 둘 수 있다.</li>
                    <li>업무 수행 필요에 따라 위원회와 함께 할 수 있다.</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 24조(이사회의 소집)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    정기이사회는 년 2회를 개최하도록 하고, 회장의 필요하다고 인정할때 또는 재직이사 3분의 1이상의 요구가 있을 때 회장이 소집한다.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 25조(이사회의 의결사항)</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    이사회는 다음 사항을 의결한다.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                    <li>총회에서 위임받은 사항</li>
                    <li>정관변경에 관한 사항</li>
                    <li>회장과 감사 선출 및 이사인준에 관한 사항</li>
                    <li>예산 및 결산에 관한 사항</li>
                    <li>주요 사업계획 및 집행에 관한 사항</li>
                    <li>회비 및 기금 조성과 관리에 관한 사항</li>
                    <li>그 외 기타 사항</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* 제 7 장 위원회 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary-200">
                제 7 장 위원회
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 26조(위원회)</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    위원회는 편집위원회, 학술위원회, 교육 및 연수위원회를 둔다.
                  </p>
                  
                  <div className="space-y-6 ml-4">
                    <div>
                      <p className="font-semibold text-gray-800 mb-3">1. 편집위원회</p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                        <li>본 회의 정회원 중에서 회장이 이사회의 인준을 거쳐 임명한 약간 명의 편집위원으로 편집위원회를 구성한다.</li>
                        <li>편집위원회 위원장은 편집위원 중에서 회장이 임명한다.</li>
                        <li>편집위원회는 학회지 발간에 관한 제반 업무를 담당한다.</li>
                      </ol>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800 mb-3">2. 학술위원회</p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                        <li>본 회의 정회원 중에서 회장이 이사회의 인준을 거쳐 임명한 약간 명의 학술위원으로 학술위원회를 구성한다.</li>
                        <li>학술위원회 위원장은 학술위원 중에서 회장이 임명한다.</li>
                        <li>위원회는 학술대회에 관한 제반 업무를 담당한다.</li>
                      </ol>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800 mb-3">3. 교육 및 연수위원회</p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                        <li>본 회의 정회원 중에서 회장이 이사회의 인준을 거쳐 임명한 약간 명의 교육 및 연수위원으로 교육 및 연수위원회를 구성한다.</li>
                        <li>교육 및 연수위원회 위원장은 학술위원 중에서 회장이 임명한다.</li>
                        <li>위원회는 회원들의 교육 및 연수에 관한 제반 업무를 담당한다.</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 제 8 장 재정 및 회계 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary-200">
                제 8 장 재정 및 회계
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 27조(재정)</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    본 회의 재정은 다음의 수입으로 한다.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                    <li>회비</li>
                    <li>지원금</li>
                    <li>기부금</li>
                    <li>기타 수입금</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 28조(회계연도)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    본회의 회계연도는 매월 1일 1일부터 12일 31일까지로 한다.
                  </p>
                </div>
              </div>
            </section>

            {/* 제 9 장 보칙 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary-200">
                제 9 장 보칙
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 29조(학회해산)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    본회를 해산하고자 할때에는 총회에서 회원 3/4이상의 찬성으로 의결하여 해산한다.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">제 30조(학회해산 시 재산처리)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    본회가 해산할 때 잔여 재산은 총회의 결정에 따른다.
                  </p>
                </div>
              </div>
            </section>

            {/* 부칙 */}
            <section className="mt-12 pt-8 border-t-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">부 칙</h2>
              <div className="space-y-4 text-gray-700">
                <p>1. 본 회칙은 2010년 5월 5일부터 시행한다.</p>
                <p>2. 본 회칙은 2024년 3월 20일부터 시행한다.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
