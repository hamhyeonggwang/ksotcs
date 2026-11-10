'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import EducationStatusLookupModal from '@/components/EducationStatusLookupModal'

export default function Hero() {
  const [openEducationLookup, setOpenEducationLookup] = useState(false)

  return (
    <>
      <section className="hero-ledge" aria-labelledby="home-heading">
        <figure
          className="hero-ledge__photo"
          data-slot="hero"
          data-alt="아동 작업치료 현장에서 치료사와 아동이 함께 활동하는 모습"
        >
          <Image
            src="/images/hero-landing.png"
            alt="밝은 치료실에서 치료사와 아동이 균형 활동을 하는 모습"
            fill
            priority
            unoptimized
            sizes="100vw"
          />
          <div className="hero-ledge__scrim" data-keep aria-hidden="true" />
        </figure>

        <div className="site-container hero-ledge__content">
          <h1 id="home-heading">아동과 학교를 위한 작업치료</h1>
          <div className="hero-ledge__aside">
            <p className="lead">연구와 교육으로 현장의 전문성을 함께 높입니다.</p>
            <div className="action-pair">
              <Link className="primary-action" href="/education-schedule">
                연간교육일정 확인
              </Link>
              <button className="secondary-action" type="button" onClick={() => setOpenEducationLookup(true)}>
                교육 대상자 조회
              </button>
            </div>
          </div>
        </div>
      </section>

      <EducationStatusLookupModal open={openEducationLookup} onClose={() => setOpenEducationLookup(false)} />
    </>
  )
}
