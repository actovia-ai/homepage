import defaultMdxComponents from '@fumadocs/base-ui/mdx'
import type { MDXComponents } from 'mdx/types'

import { Screenshot, ShotRow } from '@/components/screenshot'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return { ...defaultMdxComponents, Screenshot, ShotRow, ...components }
}

export const useMDXComponents = getMDXComponents

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>
}
