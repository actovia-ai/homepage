import { baseOptions } from '@/lib/layout.shared'
import { source } from '@/lib/source'
import { DocsLayout } from '@fumadocs/base-ui/layouts/spacious'
import { RootProvider } from '@fumadocs/base-ui/provider/next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './docs.css'

// The docs have a root layout of their own: the home page's styles and the
// docs theme never load on the same page.
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://actovia.yancey.app'),
  title: { template: '%s · Actovia Docs', default: 'Actovia Docs' }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider>
          <DocsLayout tree={source.getPageTree()} {...baseOptions()}>
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  )
}
