import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

export function baseOptions(): BaseLayoutProps {
  return {
    nav: { title: 'Actovia Docs', url: '/docs' },
    links: [{ text: 'Home', url: '/' }],
    githubUrl: 'https://github.com/actovia-ai/actovia'
  }
}
