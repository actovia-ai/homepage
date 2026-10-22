import { getMDXComponents } from '@/components/mdx'
import { source } from '@/lib/source'
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover
} from '@fumadocs/base-ui/layouts/spacious/page'
import { createRelativeLink } from '@fumadocs/base-ui/mdx'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug?: string[] }> }

const CONTENT_ON_GITHUB = 'https://github.com/actovia-ai/homepage/blob/main/content/docs'

export default async function Page(props: Props) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  const MDX = page.data.body
  // The page as Markdown, for an agent or a chat (app/llms.mdx, rewritten from `<page>.md`).
  const markdownUrl = `${page.url}.md`
  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-2">{page.data.description}</DocsDescription>
      <div className="mb-4 flex flex-row flex-wrap items-center gap-2 border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover markdownUrl={markdownUrl} githubUrl={`${CONTENT_ON_GITHUB}/${page.path}`} />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page)
          })}
        />
      </DocsBody>
    </DocsPage>
  )
}

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()
  return { title: page.data.title, description: page.data.description }
}
