/** 최소 CSV 파서 (외부 라이브러리 없이 "이름,이메일" 수준의 단순한 표를 다룹니다) */

const NAME_HEADERS = new Set(['이름', 'name', '성명'])
const EMAIL_HEADERS = new Set(['이메일', 'email', '이메일주소', 'e-mail'])

function normalizeHeader(value: string): string {
  return value
    .replace(/[\uFEFF\u200B-\u200D\u2060]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\([^)]*\)|（[^）]*）/g, '')
    .replace(/[\s_()（）:[\]{}*＊·]/g, '')
}

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

/**
 * 브라우저에서 받은 CSV 바이트를 UTF-8로 먼저 해석하고, 한글 Excel CSV에서 흔한
 * CP949(EUC-KR)로 저장된 파일은 자동으로 다시 해석합니다.
 */
export function parseApplicantsCsvBuffer(buffer: ArrayBuffer): CsvParseResult {
  const bytes = new Uint8Array(buffer)

  // Excel의 "유니코드 텍스트" 형식(UTF-16LE/BE)도 받아들입니다.
  if (bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xfe) {
    return parseApplicantsCsv(new TextDecoder('utf-16le').decode(buffer))
  }
  if (bytes.length >= 2 && bytes[0] === 0xfe && bytes[1] === 0xff) {
    const swapped = bytes.slice(2)
    for (let i = 0; i + 1 < swapped.length; i += 2) {
      const first = swapped[i]
      swapped[i] = swapped[i + 1]
      swapped[i + 1] = first
    }
    return parseApplicantsCsv(new TextDecoder('utf-16le').decode(swapped))
  }

  const utf8 = new TextDecoder('utf-8').decode(buffer)
  let utf8Error: unknown

  // 잘못된 UTF-8 바이트는 대체문자(�)가 생기므로 바로 CP949 해석을 시도합니다.
  if (!utf8.includes('\uFFFD')) {
    try {
      return parseApplicantsCsv(utf8)
    } catch (error) {
      utf8Error = error
    }
  }

  try {
    const cp949 = new TextDecoder('euc-kr').decode(buffer)
    return parseApplicantsCsv(cp949)
  } catch {
    if (utf8Error) throw utf8Error
    throw new Error('CSV 문자 인코딩을 확인해 주세요. UTF-8 또는 CP949 형식만 지원합니다.')
  }
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

  const delimiter = lines[0].includes('\t') && !lines[0].includes(',') ? '\t' : ','
  const parseRow = delimiter === ',' ? parseLine : (line: string) => line.split(delimiter).map((cell) => cell.trim())
  const rawHeader = parseRow(lines[0])
  const header = rawHeader.map(normalizeHeader)
  const nameIdx = header.findIndex((h) => NAME_HEADERS.has(h))
  const emailIdx = header.findIndex((h) => EMAIL_HEADERS.has(h))

  if (nameIdx < 0) {
    const detected = rawHeader.map((h) => h.trim()).filter(Boolean).join(', ') || '없음'
    throw new Error(`CSV 헤더에서 "이름" 컬럼을 찾을 수 없습니다. 감지된 헤더: ${detected}`)
  }

  const rows: ParsedApplicantRow[] = []
  const skipped: { line: number; reason: string }[] = []

  for (let i = 1; i < lines.length; i++) {
    const cells = parseRow(lines[i])
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
