import { SmoothScroll } from '@/app/_components/smooth-scroll'
import type { Metadata, Viewport } from 'next'
import {
  Fredoka,
  JetBrains_Mono,
  Sofia_Sans,
  Sofia_Sans_Extra_Condensed
} from 'next/font/google'

import { openGraph } from '@/app/_lib/og'
import './globals.css'

// The wordmark face — the same Fredoka the app icon's social card uses. Only
// ever at wordmark size.
const fredoka = Fredoka({
  variable: '--font-fredoka',
  subsets: ['latin'],
  weight: ['600']
})

// The display voice: thin and extra-condensed, set large.
const display = Sofia_Sans_Extra_Condensed({
  variable: '--font-sofia-xc',
  subsets: ['latin'],
  weight: ['200', '300', '400']
})

// Body and UI, from the same family so the two voices agree.
const sans = Sofia_Sans({
  variable: '--font-sofia',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600']
})

// Commands, tool names, SQL — never decoration.
const mono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500']
})

export const metadata: Metadata = {
  metadataBase: new URL('https://actovia.yancey.app'),
  title:
    'Actovia — the AI assistant that runs on your computer and answers your phone',
  description:
    'A personal AI assistant that lives on your computer: chat for quick answers, Philharmonic agent teams for the big jobs, every model with your own keys, your data kept local, and your iPhone as the remote.',
  alternates: { canonical: '/' },
  openGraph: openGraph(
    'Actovia — the AI assistant that runs on your computer',
    'Chat, agent teams and every model with your own keys, on your own computer, with your iPhone as the remote.',
    '/'
  ),
  twitter: { card: 'summary_large_image', creator: '@YanceyOfficial' }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f5f3' },
    { media: '(prefers-color-scheme: dark)', color: '#0e0e0d' }
  ],
  colorScheme: 'light dark'
}

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
