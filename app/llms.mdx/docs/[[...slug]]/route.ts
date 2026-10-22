import { docsLlms, source } from '@/lib/source'
import { notFound } from 'next/navigation'

// `/docs/<page>.md` (and `.mdx`, rewritten here by next.config.mjs): the page as processed Markdown — the
// title and URL on top, MDX rendered to plain Markdown.
export const revalidate = false

export async function GET(_req: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) notFound()
  return new Response(await docsLlms.page(page), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
  })
}

export function generateStaticParams() {
  return source.generateParams()
}
