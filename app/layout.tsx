import type { Metadata, Viewport } from 'next'
import { Fredoka, Inter_Tight } from 'next/font/google'
import './globals.css'

// The wordmark face — the same Fredoka the app icon's social card uses.
const fredoka = Fredoka({
  variable: '--font-fredoka',
  subsets: ['latin'],
  weight: ['600']
})

// The footer's ghosted name: an extra-light grotesk, close to SF Pro Display
// but the same on every platform.
const interTight = Inter_Tight({
  variable: '--font-inter-tight',
  subsets: ['latin'],
  weight: ['200']
})

export const metadata: Metadata = {
  metadataBase: new URL('https://exodus.yancey.app'),
  title: 'Exodus — every model, on your own machine',
  description:
    'A desktop AI workspace for macOS, Windows and Linux: every major model with your own keys, tools that finish the job, Deep Research, agent teams and a memory that stays on your computer.'
}

export const viewport: Viewport = {
  themeColor: '#fbfbfd'
}

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${interTight.variable}`}>
      <body>{children}</body>
    </html>
  )
}
