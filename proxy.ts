import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation'
import { type NextRequest, NextResponse } from 'next/server'

// An agent that asks for a docs page with `Accept: text/markdown` gets the page as Markdown, from the same URL.
// (Next drops `Vary` on page responses, so the CDN should vary on Accept for /docs.)
const { rewrite } = rewritePath('/docs{/*path}', '/llms.mdx/docs{/*path}')

export function proxy(request: NextRequest) {
  if (!isMarkdownPreferred(request)) return NextResponse.next()
  const target = rewrite(request.nextUrl.pathname)
  if (!target) return NextResponse.next()
  const response = NextResponse.rewrite(new URL(target, request.nextUrl))
  response.headers.set('Vary', 'Accept')
  return response
}

export const config = { matcher: ['/docs', '/docs/:path*'] }
