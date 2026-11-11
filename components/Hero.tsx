'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import EducationStatusLookupModal from '@/components/EducationStatusLookupModal'

const slides = [
  {
    desktopSrc: '/images/hero-children-park.jpg',
    mobileSrc: '/images/hero-children-park.jpg',
    width: 1280,
    height: 959,
    alt: '도시 공원의 잔디밭을 달리는 두 아이의 뒷모습',
    title: '아동과 학교를 위한 작업치료',
    description: '연구와 교육으로 현장의 전문성을 함께 높입니다.',
    position: 'hero-slide--first',
  },
  {
    desktopSrc: '/images/hero-school-blocks.jpg',
    mobileSrc: '/images/hero-school-blocks.jpg',
    width: 1280,
    height: 720,
    alt: '학교 운동장 잔디 위에 놓인 알록달록한 블록과 무지개 장난감',
    title: '연구와 교육을 현장으로',
    description: '아동 작업치료의 지식과 실천을 연결합니다.',
    position: 'hero-slide--second',
  },
]

export default function Hero() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [lookupOpen, setLookupOpen] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (paused || reducedMotion) return
    const timer = window.setInterval(() => setActive((index) => (index + 1) % slides.length), 6000)
    return () => window.clearInterval(timer)
  }, [paused, reducedMotion])

  const select = (index: number) => setActive((index + slides.length) % slides.length)

  return (
    <>
      <section
        className="home-hero"
        aria-roledescription="carousel"
        aria-label="학회 주요 안내"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false)
        }}
      >
        <div className="home-hero__slides" aria-live="off">
          {slides.map((slide, index) => (
            <article
              key={slide.title}
              className={`hero-slide ${slide.position}`}
              data-active={index === active}
              aria-hidden={index !== active}
              aria-label={`${index + 1} / ${slides.length}`}
            >
              <picture data-slot={`hero-${index + 1}`} data-alt={slide.alt}>
                <source media="(max-width: 64rem)" srcSet={slide.mobileSrc} />
                <img src={slide.desktopSrc} width={slide.width} height={slide.height} alt={slide.alt} fetchPriority={index === 0 ? 'high' : 'auto'} />
              </picture>
              <div className="hero-slide__scrim" aria-hidden="true" />
              <div className="site-container hero-slide__content">
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
                <div className="action-pair">
                  <Link className="primary-action" href="/education-schedule" tabIndex={index === active ? undefined : -1}>연간교육일정</Link>
                  <button className="hero-text-action" type="button" tabIndex={index === active ? undefined : -1} onClick={() => setLookupOpen(true)}>교육 대상자 조회</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="home-hero__controls">
          <button type="button" aria-label="이전 화면" onClick={() => select(active - 1)}>
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 4l-7 7 7 7" /></svg>
          </button>
          <div className="home-hero__dots" aria-label="화면 선택">
            {slides.map((slide, index) => (
              <button key={slide.title} type="button" aria-label={`${index + 1}번째 화면`} aria-current={active === index ? 'true' : undefined} onClick={() => select(index)} />
            ))}
          </div>
          <button type="button" aria-label="다음 화면" onClick={() => select(active + 1)}>
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 4l7 7-7 7" /></svg>
          </button>
          <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? '자동 넘김 재생' : '자동 넘김 일시정지'}>
            {paused ? (
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M6 4l10 6-10 6z" /></svg>
            ) : (
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4h3v12H5zM12 4h3v12h-3z" /></svg>
            )}
          </button>
        </div>
      </section>

      <EducationStatusLookupModal open={lookupOpen} onClose={() => setLookupOpen(false)} />
    </>
  )
}
