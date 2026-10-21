import { loader } from 'fumadocs-core/source'
import { lucideIconsPlugin } from 'fumadocs-core/source/plugins/lucide-icons'
import { defineDocs } from 'fumadocs-mdx/macro'

const docs = defineDocs({ dir: 'content/docs' })

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  // `icon: Download` in a page's frontmatter (or a folder's meta.json) is a lucide icon in the sidebar.
  plugins: [lucideIconsPlugin()]
})
