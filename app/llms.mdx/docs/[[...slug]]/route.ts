import { source } from '@/lib/source'
import { notFound } from 'next/navigation'

// `/docs/<page>.mdx` (rewritten here by next.config.mjs): the page as Markdown, its title on top.
export const revalidate = false

export async function GET(_req: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) notFound()
  const body = (await page.data.getText('raw')).replace(/^---\n[\s\S]*?\n---\n/u, '').trim()
  return new Response(`# ${page.data.title}\n\n${body}\n`, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
  })
}

export function generateStaticParams() {
  return source.generateParams()
}
