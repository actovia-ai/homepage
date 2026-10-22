import { existsSync } from 'node:fs'
import { join } from 'node:path'

import { Monitor, Smartphone } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * A screenshot in the docs, or the slot one will fill.
 *
 * Every slot has a stable `id`, listed with what to capture in
 * docs/screenshot-shotlist.md. Until the capture exists the slot is a quiet
 * dashed frame showing the id and the brief; once the PNG is in
 * public/docs/shots/, pass `src="/docs/shots/<id>.png"` and it shows instead.
 *
 * A capture comes in both colour schemes: `<id>.png` is the light one and
 * `<id>-dark.png`, when it exists beside it, is served under
 * `prefers-color-scheme: dark`, so a page never mixes the two (owner,
 * 2026-10-22). A shot with no dark file (a macOS System Settings crop, the
 * colour-tone grid) shows its one file in both schemes.
 */
type Platform = 'desktop' | 'iphone' | 'macos'
type Theme = 'light' | 'dark' | 'either'

const FRAME: Record<Platform, string> = {
  desktop: 'aspect-[16/10] w-full',
  iphone: 'aspect-[1206/2622] w-full max-w-[240px]',
  // A crop of a macOS window (System Settings): shown at its own aspect.
  macos: 'w-full max-w-[520px]'
}

const PLATFORM_LABEL: Record<Platform, string> = {
  desktop: 'Desktop',
  iphone: 'iPhone',
  macos: 'macOS'
}

const PLATFORM_ICON: Record<Platform, ReactNode> = {
  desktop: <Monitor className="size-3.5" aria-hidden />,
  iphone: <Smartphone className="size-3.5" aria-hidden />,
  macos: <Monitor className="size-3.5" aria-hidden />
}

/** The dark-scheme file of a capture, if one is published beside it. */
function darkSourceOf(src: string): string | undefined {
  const dark = src.replace(/\.png$/u, '-dark.png')
  return dark !== src && existsSync(join(process.cwd(), 'public', dark)) ? dark : undefined
}

export function Screenshot({
  id,
  platform = 'desktop',
  theme = 'either',
  caption,
  src
}: {
  id: string
  platform?: Platform
  /** The scheme the brief was written for; the capture itself follows the reader's scheme. */
  theme?: Theme
  /** What the shot shows — the brief while it is a slot, the caption once it is filled. */
  caption: string
  src?: string
}) {
  const mobile = platform !== 'desktop'
  const dark = src ? darkSourceOf(src) : undefined
  return (
    <figure
      data-shot-id={id}
      className={cn(
        'not-prose my-6 flex flex-col gap-2',
        mobile ? 'items-center' : 'items-stretch'
      )}
    >
      {src ? (
        <picture
          className={cn(
            FRAME[platform],
            'border-fd-border block overflow-hidden rounded-xl border'
          )}
        >
          {dark && <source srcSet={dark} media="(prefers-color-scheme: dark)" />}
          <img
            src={src}
            alt={caption}
            loading="lazy"
            className={cn(
              'size-full',
              platform === 'macos' ? 'object-contain' : 'object-cover'
            )}
          />
        </picture>
      ) : (
        <div
          role="img"
          aria-label={`Screenshot to come: ${caption}`}
          className={cn(
            FRAME[platform],
            'border-fd-border bg-fd-muted/40 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed p-4 text-center'
          )}
        >
          <span className="text-fd-muted-foreground inline-flex items-center gap-1.5 text-xs">
            {PLATFORM_ICON[platform]}
            {PLATFORM_LABEL[platform]}
            {theme !== 'either' && <span>· {theme}</span>}
          </span>
          <code className="bg-fd-background text-fd-foreground/80 rounded px-1.5 py-0.5 font-mono text-xs">
            {id}
          </code>
          <span className="text-fd-muted-foreground max-w-md text-xs leading-relaxed">
            {caption}
          </span>
        </div>
      )}
      {src && (
        <figcaption className="text-fd-muted-foreground text-center text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/** Phone shots side by side, wrapping on a narrow screen. */
export function ShotRow({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 [&>figure]:my-0">
      {children}
    </div>
  )
}
