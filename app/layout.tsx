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
  title: 'Exodus — your assistant, on your own machine',
  description:
    'A personal AI assistant that lives on your computer: chat for quick answers, Philharmonic agent teams for the big jobs, every model with your own keys, your data kept local, and your iPhone as the remote.'
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfbfd' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
  colorScheme: 'light dark'
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
