import { docsLlms } from '@/lib/source'

// llms-full.txt: every docs page rendered as Markdown, one after the other.
export const revalidate = false

export async function GET() {
  return new Response(await docsLlms.full(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
  })
}
