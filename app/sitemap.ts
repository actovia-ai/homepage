import type { MetadataRoute } from 'next'

import { source } from '@/lib/source'

const SITE = 'https://actovia.yancey.app'

/** The site's pages, then every docs page from the docs source. */
export default function sitemap(): MetadataRoute.Sitemap {
  const site = ['/', '/privacy', '/terms', '/support'].map((path) => ({
    url: `${SITE}${path === '/' ? '' : path}`,
    priority: path === '/' ? 1 : 0.5
  }))
  const docs = source
    .getPages()
    .map((page) => ({ url: `${SITE}${page.url}`, priority: 0.7 }))
  return [...site, ...docs]
}
