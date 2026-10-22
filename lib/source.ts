import { llms, loader } from 'fumadocs-core/source'
import { lucideIconsPlugin } from 'fumadocs-core/source/plugins/lucide-icons'
import { defineDocs } from 'fumadocs-mdx/macro'

const docs = defineDocs({
  dir: 'content/docs',
  // Each page's processed Markdown (`getText('processed')`), for llms.txt and the `.md` routes.
  docs: { postprocess: { includeProcessedMarkdown: true } }
})

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  // `icon: Download` in a page's frontmatter (or a folder's meta.json) is a lucide icon in the sidebar.
  plugins: [lucideIconsPlugin()]
})

const SITE = 'https://actovia.yancey.app'

/**
 * The docs' own MDX components, as Markdown: a `<Screenshot>` becomes the image with its caption (or the
 * caption alone while the slot is empty), and a `<ShotRow>` is just its children.
 */
function componentsToMarkdown(markdown: string): string {
  return markdown
    .replace(/<Screenshot\b([^>]*?)\/>/gu, (_, attrs: string) => {
      const attr = (name: string) => attrs.match(new RegExp(`\\b${name}="([^"]*)"`, 'u'))?.[1]
      const caption = attr('caption') ?? ''
      const src = attr('src')
      return src ? `![${caption}](${SITE}${src})` : `_Screenshot: ${caption}_`
    })
    .replace(/^[ \t]*<\/?ShotRow>[ \t]*\n/gmu, '')
}

/** The docs for agents: `index()` is llms.txt, `full()` llms-full.txt, `page()` one page as Markdown. */
export const docsLlms = llms(source, {
  async renderPage(page) {
    const body = componentsToMarkdown(await page.data.getText('processed'))
    return `# ${page.data.title}\n\nURL: ${SITE}${page.url}\n\n${body.trim()}\n`
  }
})
