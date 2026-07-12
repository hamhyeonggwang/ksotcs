import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * 업로드 키: {yyyy-mm}/{timestamp}-{안전화된 파일명}
 * 한글·공백 등은 키에서 제거하고 확장자는 유지합니다. (원본 파일명은 제목·캡션에 반영)
 */
export function makeStorageKey(fileName: string): string {
  const i = fileName.lastIndexOf('.')
  const ext = i >= 0 ? fileName.slice(i + 1).toLowerCase() : 'bin'
  const base = (i >= 0 ? fileName.slice(0, i) : fileName)
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9-_]/g, '')
    .slice(0, 40)
  const now = new Date()
  const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const name = base ? `${Date.now()}-${base}` : `${Date.now()}`
  return `${ym}/${name}.${ext}`
}

/** 파일을 public 버킷에 업로드하고 public URL을 돌려줍니다. */
export async function uploadPublicFile(
  supabase: SupabaseClient,
  bucket: string,
  file: File,
): Promise<string> {
  const key = makeStorageKey(file.name)
  const { error } = await supabase.storage.from(bucket).upload(key, file, {
    contentType: file.type || undefined,
    upsert: false,
  })
  if (error) throw error
  const { data } = supabase.storage.from(bucket).getPublicUrl(key)
  return data.publicUrl
}

/**
 * public URL에서 스토리지 객체 키를 추출해 삭제를 시도합니다.
 * 외부 URL이거나 파싱에 실패하면 조용히 건너뜁니다(행 삭제가 우선).
 */
export async function removePublicFileByUrl(
  supabase: SupabaseClient,
  bucket: string,
  publicUrl: string,
): Promise<void> {
  const marker = `/storage/v1/object/public/${bucket}/`
  const idx = publicUrl.indexOf(marker)
  if (idx < 0) return
  const key = decodeURIComponent(publicUrl.slice(idx + marker.length).split('?')[0])
  if (!key) return
  await supabase.storage.from(bucket).remove([key])
}
