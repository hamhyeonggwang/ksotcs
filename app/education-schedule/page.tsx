import EducationScheduleView from '@/components/EducationScheduleView'
import { supabaseRestGetSafe } from '@/lib/supabaseRest'
import type { EducationScheduleRow } from '@/lib/adminTypes'
import { FALLBACK_SCHEDULES } from '@/lib/educationSchedules'

export default async function EducationSchedulePage() {
  const rows = await supabaseRestGetSafe<EducationScheduleRow[]>(
    '/rest/v1/education_schedules?select=*&is_visible=eq.true&order=month.asc,sort_order.asc',
    [],
  )
  const schedules = rows.length > 0 ? rows : FALLBACK_SCHEDULES

  return <EducationScheduleView schedules={schedules} />
}
