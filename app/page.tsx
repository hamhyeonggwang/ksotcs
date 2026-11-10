import Hero from '@/components/Hero'
import Features from '@/components/Features'
import News from '@/components/News'
import NoticePopup from '@/components/NoticePopup'
import { supabaseRestGetSafe } from '@/lib/supabaseRest'
import { activePopupsQueryPath, seoulToday, type PopupItem } from '@/lib/popupWindow'

export default async function Home() {
  const popups = await supabaseRestGetSafe<PopupItem[]>(activePopupsQueryPath(seoulToday()), [])

  return (
    <div className="flex flex-col">
      <NoticePopup items={popups} />
      <Hero />
      <Features />
      <News />
    </div>
  )
}
