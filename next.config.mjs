import { createMDX } from 'fumadocs-mdx/next'

/** @type {import('next').NextConfig} */
const config = {
  async rewrites() {
    return [
      // A docs page as Markdown: `/docs/<page>.md` is what "Copy Markdown", "Open in …", llms.txt and an
      // agent asking for text/markdown read (`.mdx` kept for links already out there).
      { source: '/docs.md', destination: '/llms.mdx/docs' },
      { source: '/docs/:path*.md', destination: '/llms.mdx/docs/:path*' },
      { source: '/docs.mdx', destination: '/llms.mdx/docs' },
      { source: '/docs/:path*.mdx', destination: '/llms.mdx/docs/:path*' }
    ]
  }
}

const withMDX = createMDX()

export default withMDX(config)
