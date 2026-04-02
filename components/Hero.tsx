'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import EducationStatusLookupModal from '@/components/EducationStatusLookupModal'

export default function Hero() {
  const [showWorkTherapy, setShowWorkTherapy] = useState(false)
  const [showOtherText, setShowOtherText] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [openEducationLookup, setOpenEducationLookup] = useState(false)

  const fullText = '아동작업치료의 발전과 질적인 성장을 위해 함께 노력합니다.'

  useEffect(() => {
    // "작업치료" 먼저 페이드인
    const timer1 = setTimeout(() => {
      setShowWorkTherapy(true)
    }, 300)

    // 그 다음 "아이들과 함께"와 "미래를 만들어갑니다" 동시에 페이드인
    const timer2 = setTimeout(() => {
      setShowOtherText(true)
    }, 1000)

    // 타이핑 효과 시작 (제목이 나타난 후)
    let typingInterval: NodeJS.Timeout | null = null
    const timer3 = setTimeout(() => {
      let currentIndex = 0
      typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setTypedText(fullText.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          if (typingInterval) {
            clearInterval(typingInterval)
            typingInterval = null
          }
          // 타이핑 완료 후 커서 깜빡임 제거
          setTimeout(() => {
            setShowCursor(false)
          }, 500)
        }
      }, 50) // 각 글자마다 50ms 간격
    }, 2500) // 제목 애니메이션 완료 후 시작

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      if (typingInterval) {
        clearInterval(typingInterval)
      }
    }
  }, [fullText])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* 배경: 제공 이미지 + Ken Burns(확대·이동) 역동감 */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -inset-[14%] bg-cover bg-no-repeat opacity-40 animate-hero-kenburns motion-reduce:animate-none bg-[position:58%_center] sm:bg-[position:55%_center]"
          style={{
            backgroundImage: `url('/images/hero-landing.png')`,
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/25" />
      </div>

      {/* Geometric Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="text-white">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
              대한아동학교작업치료학회
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className={`transition-opacity duration-1000 ${
                showOtherText ? 'opacity-100' : 'opacity-0'
              }`}>
                아이들을 위한
              </span>
              <br />
              <span className={`text-primary-400 transition-opacity duration-1000 ${
                showWorkTherapy ? 'opacity-100' : 'opacity-0'
              }`}>
                작업치료
              </span>
              <br />
              <span className={`transition-opacity duration-1000 ${
                showOtherText ? 'opacity-100' : 'opacity-0'
              }`}>
                미래를 만들어갑니다
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-10 leading-relaxed min-h-[3rem] md:whitespace-nowrap">
              {typedText}
              {showCursor && <span className="animate-pulse">|</span>}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/about"
                className="px-8 py-4 bg-white text-black rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center"
              >
                학회 소개
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="http://ksotcs.co.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-transparent text-white rounded-lg font-semibold text-lg border-2 border-white hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center"
              >
                교육센터
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: Visual Element */}
          <div className="hidden lg:block relative">
            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 h-full flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6 w-full">
                  <Link href="/education-schedule" className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer">
                    <div className="w-12 h-12 bg-primary-500 rounded-xl mb-4 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">다가오는 교육</div>
                    <div className="text-sm text-gray-300">교육일정 바로가기</div>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setOpenEducationLookup(true)}
                    className="text-left bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-blue-500 rounded-xl mb-4 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">진행중인 교육</div>
                    <div className="text-sm text-gray-300">대상자 명단 확인</div>
                  </button>
                  <Link
                    href="/news"
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-purple-500 rounded-xl mb-4 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">학회 소식</div>
                    <div className="text-sm text-gray-300">최신 공지사항</div>
                  </Link>
                  <a
                    href="http://sm.ksnot.scholars.link/admin/login.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-emerald-500 rounded-xl mb-4 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">논문투고</div>
                    <div className="text-sm text-gray-300">투고 안내</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EducationStatusLookupModal
        open={openEducationLookup}
        onClose={() => setOpenEducationLookup(false)}
      />
    </section>
  )
}
