import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import PublicShell from '@/components/PublicShell'

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

export const metadata: Metadata = {
  title: '대한아동학교작업치료학회',
  description: '대한아동학교작업치료학회 공식 홈페이지',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={pretendard.variable}>
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  )
}
