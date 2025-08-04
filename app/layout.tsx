import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { customFont } from '@/lib/fonts'
import { Toaster } from '@/components/ui/toaster'
import { MusicProvider } from '@/hooks/use-music'

export const metadata: Metadata = {
  title: "오성 & 주은, 결혼합니다",
  description: "2025년 12월 13일, 저희 두 사람의 새로운 시작을 함께 축복해주세요.",
  openGraph: {
    title: "오성 & 주은, 결혼합니다",
    description: "2025년 12월 13일, 저희 두 사람의 새로운 시작을 함께 축복해주세요.",
    images: ['images/thumbnail.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${GeistSans.variable} ${GeistMono.variable} ${customFont.variable}`}>
      <head />
      <body>
        <MusicProvider>
          {children}
          <Toaster />
        </MusicProvider>
      </body>
    </html>
  )
}
