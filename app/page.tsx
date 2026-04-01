import Hero from '@/components/Hero'
import About from '@/components/About'
import Features from '@/components/Features'
import News from '@/components/News'
import CTA from '@/components/CTA'
import NoticePopup from '@/components/NoticePopup'

export default function Home() {
  return (
    <div className="flex flex-col">
      <NoticePopup />
      <Hero />
      <About />
      <Features />
      <News />
      <CTA />
    </div>
  )
}
