import { docsLlms } from '@/lib/source'

// llms.txt: the docs as an index an agent can read — every page with its title, description and Markdown URL.
export const revalidate = false

export async function GET() {
  return new Response(await docsLlms.index(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
  })
}
