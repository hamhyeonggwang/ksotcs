import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import './globals.css'
import PublicShell from '@/components/PublicShell'

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

export const metadata: Metadata = {
  title: '대한아동·학교작업치료학회',
  description: '대한아동·학교작업치료학회 공식 홈페이지',
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
        <Script id="js-ready" strategy="beforeInteractive">{`document.documentElement.classList.add('js')`}</Script>
        <Script id="hallmark-slots" strategy="afterInteractive">{`
          window.hallmarkSlots = function (slots) {
            Object.entries(slots || {}).forEach(function (entry) {
              var node = document.querySelector('[data-slot="' + entry[0] + '"] img');
              if (node && typeof entry[1] === 'string') node.src = entry[1];
            });
          };
        `}</Script>
      </body>
    </html>
  )
}
