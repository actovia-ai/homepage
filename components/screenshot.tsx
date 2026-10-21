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
 */
type Platform = 'desktop' | 'iphone'
type Theme = 'light' | 'dark' | 'either'

const FRAME: Record<Platform, string> = {
  desktop: 'aspect-[16/10] w-full',
  iphone: 'aspect-[1206/2622] w-full max-w-[240px]'
}

const PLATFORM_LABEL: Record<Platform, string> = {
  desktop: 'Desktop',
  iphone: 'iPhone'
}

const PLATFORM_ICON: Record<Platform, ReactNode> = {
  desktop: <Monitor className="size-3.5" aria-hidden />,
  iphone: <Smartphone className="size-3.5" aria-hidden />
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
  theme?: Theme
  /** What the shot shows — the brief while it is a slot, the caption once it is filled. */
  caption: string
  src?: string
}) {
  const mobile = platform !== 'desktop'
  return (
    <figure
      data-shot-id={id}
      className={cn(
        'not-prose my-6 flex flex-col gap-2',
        mobile ? 'items-center' : 'items-stretch'
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element -- static captures of known size, no optimisation needed
        <img
          src={src}
          alt={caption}
          loading="lazy"
          className={cn(
            FRAME[platform],
            'border-fd-border h-auto rounded-xl border object-cover'
          )}
        />
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
