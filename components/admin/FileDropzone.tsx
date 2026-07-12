'use client'

import { useCallback, useRef, useState, type DragEvent } from 'react'

type FileDropzoneProps = {
  /** input accept 속성 값 (예: 'application/pdf' 또는 'image/*') */
  accept: string
  /** 허용 확장자 목록 (소문자, 점 없이. 예: ['pdf'] / ['jpg','jpeg','png','webp']) */
  allowedExtensions: string[]
  /** 최대 크기 (MB) */
  maxSizeMb: number
  /** 안내 문구 (예: 'PDF 파일을 끌어다 놓거나 클릭해서 선택') */
  label: string
  /** 업로드 진행 중 여부 (부모가 제어) */
  uploading?: boolean
  disabled?: boolean
  onFileSelected: (file: File) => void
}

function fileExtension(name: string): string {
  const i = name.lastIndexOf('.')
  return i >= 0 ? name.slice(i + 1).toLowerCase() : ''
}

export default function FileDropzone({
  accept,
  allowedExtensions,
  maxSizeMb,
  label,
  uploading = false,
  disabled = false,
  onFileSelected,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = useCallback(
    (file: File | undefined | null) => {
      setError(null)
      if (!file) return
      const ext = fileExtension(file.name)
      if (!allowedExtensions.includes(ext)) {
        setError(`허용되지 않는 파일 형식입니다. (${allowedExtensions.map((e) => `.${e}`).join(', ')}만 가능)`)
        return
      }
      if (file.size > maxSizeMb * 1024 * 1024) {
        setError(`파일이 너무 큽니다. 최대 ${maxSizeMb}MB까지 업로드할 수 있습니다.`)
        return
      }
      onFileSelected(file)
    },
    [allowedExtensions, maxSizeMb, onFileSelected],
  )

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setDragOver(false)
      if (disabled || uploading) return
      handleFile(e.dataTransfer.files?.[0])
    },
    [disabled, uploading, handleFile],
  )

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label={label}
        onClick={() => {
          if (!disabled && !uploading) inputRef.current?.click()
        }}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled && !uploading) inputRef.current?.click()
        }}
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled && !uploading) setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`cursor-pointer rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors ${
          dragOver
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 bg-gray-50 hover:border-primary-400 hover:bg-primary-50/50'
        } ${disabled || uploading ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="h-6 w-6 rounded-full border-2 border-primary-600 border-t-transparent animate-spin" />
            <p className="text-sm font-semibold text-gray-700">업로드 중...</p>
          </div>
        ) : (
          <>
            <p className="text-sm font-semibold text-gray-700">{label}</p>
            <p className="mt-1 text-xs text-gray-500">
              {allowedExtensions.map((e) => `.${e}`).join(', ')} · 최대 {maxSizeMb}MB
            </p>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0])
          e.target.value = ''
        }}
      />

      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
    </div>
  )
}
