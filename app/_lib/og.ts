import type { Metadata } from 'next'

/**
 * Open Graph for a page: its own title, description and URL over the shared
 * card. A page that sets `openGraph` replaces its layout's whole block, image
 * included, so every page builds it here instead.
 */
export function openGraph(
  title: string,
  description: string,
  url: string,
  extra: { siteName?: string; type?: 'website' | 'article' } = {}
): NonNullable<Metadata['openGraph']> {
  return {
    type: extra.type ?? 'website',
    siteName: extra.siteName ?? 'Actovia',
    url,
    title,
    description,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Actovia' }]
  }
}
