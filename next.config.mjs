import { createMDX } from 'fumadocs-mdx/next'

/** @type {import('next').NextConfig} */
const config = {
  async rewrites() {
    return [
      // A docs page as Markdown: what "Copy Markdown" and "Open in …" read.
      { source: '/docs.mdx', destination: '/llms.mdx/docs' },
      { source: '/docs/:path*.mdx', destination: '/llms.mdx/docs/:path*' }
    ]
  }
}

const withMDX = createMDX()

export default withMDX(config)
