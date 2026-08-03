/** 최소 CSV 파서 (외부 라이브러리 없이 "이름,이메일" 수준의 단순한 표를 다룹니다) */

const NAME_HEADERS = new Set(['이름', 'name', '성명'])
const EMAIL_HEADERS = new Set(['이메일', 'email', '이메일주소', 'e-mail'])

/** 큰따옴표로 감싼 필드(콤마 포함)를 지원하는 한 줄 CSV 파서 */
function parseLine(line: string): string[] {
  const cells: string[] = []
  let cur = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        cur += ch
      }
    } else if (ch === '"') {
      inQuotes = true
    } else if (ch === ',') {
      cells.push(cur)
      cur = ''
    } else {
      cur += ch
    }
  }
  cells.push(cur)
  return cells.map((c) => c.trim())
}

export type ParsedApplicantRow = {
  /** 원본 CSV 상의 줄 번호 (헤더 제외, 1부터) */
  line: number
  name: string
  email: string | null
}

export type CsvParseResult = {
  rows: ParsedApplicantRow[]
  /** 이름이 비어 있는 등 건너뛴 줄 */
  skipped: { line: number; reason: string }[]
}

/** "이름,이메일" 헤더를 가진 CSV 텍스트를 파싱합니다. 헤더 순서·한영 표기는 무관합니다. */
export function parseApplicantsCsv(text: string): CsvParseResult {
  const lines = text
    .replace(/^﻿/, '') // BOM 제거 (엑셀 내보내기 시 흔함)
    .split(/\r\n|\r|\n/)
    .filter((l) => l.trim().length > 0)

  if (lines.length === 0) {
    return { rows: [], skipped: [] }
  }

  const header = parseLine(lines[0]).map((h) => h.toLowerCase().trim())
  const nameIdx = header.findIndex((h) => NAME_HEADERS.has(h))
  const emailIdx = header.findIndex((h) => EMAIL_HEADERS.has(h))

  if (nameIdx < 0) {
    throw new Error('CSV 헤더에서 "이름" 컬럼을 찾을 수 없습니다. (예: 이름,이메일)')
  }

  const rows: ParsedApplicantRow[] = []
  const skipped: { line: number; reason: string }[] = []

  for (let i = 1; i < lines.length; i++) {
    const cells = parseLine(lines[i])
    const name = (cells[nameIdx] ?? '').trim()
    const email = emailIdx >= 0 ? (cells[emailIdx] ?? '').trim() : ''

    if (!name) {
      skipped.push({ line: i, reason: '이름이 비어 있음' })
      continue
    }
    rows.push({ line: i, name, email: email || null })
  }

  return { rows, skipped }
}
