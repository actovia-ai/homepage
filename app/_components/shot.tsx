'use client'

import { createContext, useContext } from 'react'

import { darkFileOf, type ShotSpec } from '@/app/_lib/shots'
import { cn } from '@/lib/utils'

/** The screenshot files that exist under public/, found at build time. */
const ReadyShots = createContext<ReadonlySet<string>>(new Set())

/**
 * The captures to show for each colour scheme, or null while neither exists.
 * A missing scheme borrows the other's capture.
 */
function useSources(spec: ShotSpec): { light: string; dark: string } | null {
  const ready = useContext(ReadyShots)
  const light = !spec.darkOnly && ready.has(spec.file) ? spec.file : undefined
  const dark = ready.has(darkFileOf(spec)) ? darkFileOf(spec) : undefined
  if (!light && !dark) return null
  return { light: light ?? dark!, dark: dark ?? light! }
}

/** Where the captures go, as the placeholder shows it. */
function filesLabel(spec: ShotSpec): string {
  const dark = darkFileOf(spec).split('/').pop()
  return spec.darkOnly ? `public${spec.file}` : `public${spec.file} + ${dark}`
}

/** A capture that follows the colour scheme, filling its frame. */
function Capture({
  sources,
  width,
  height,
  priority
}: {
  sources: { light: string; dark: string }
  width: number
  height: number
  priority?: boolean
}) {
  return (
    <picture>
      {sources.dark !== sources.light && (
        <source srcSet={sources.dark} media="(prefers-color-scheme: dark)" />
      )}
      <img
        src={sources.light}
        alt=""
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        className="absolute inset-0 size-full object-cover"
      />
    </picture>
  )
}

export function ShotsProvider({
  ready,
  children
}: {
  ready: string[]
  children: React.ReactNode
}) {
  return (
    <ReadyShots.Provider value={new Set(ready)}>{children}</ReadyShots.Provider>
  )
}

/**
 * A product screenshot. Until its file exists this draws a window-shaped
 * placeholder that says what to capture, at what size, and where to put it.
 * A real capture already carries Exodus's own title bar, so it is shown as
 * is, with only the corner radius and shadow a window has on screen.
 */
export function Shot({
  spec,
  tone = 'light',
  priority,
  className
}: {
  spec: ShotSpec
  tone?: 'light' | 'dark'
  priority?: boolean
  className?: string
}) {
  const sources = useSources(spec)
  const [w, h] = spec.size
  const dark = tone === 'dark'

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[1.1%/1.7%]',
        dark
          ? 'shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9),0_0_0_1px_rgb(255_255_255/0.08)]'
          : 'shadow-[0_40px_90px_-40px_rgb(0_0_0/0.45),0_0_0_1px_rgb(0_0_0/0.06)] dark:shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9),0_0_0_1px_rgb(255_255_255/0.1)]',
        className
      )}
      style={{ aspectRatio: `${w} / ${h}` }}
    >
      {sources ? (
        <Capture
          sources={sources}
          width={w / 2}
          height={h / 2}
          priority={priority}
        />
      ) : (
        <Placeholder spec={spec} dark={dark} />
      )}
    </div>
  )
}

function Placeholder({ spec, dark }: { spec: ShotSpec; dark: boolean }) {
  const [w, h] = spec.size
  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col',
        dark ? 'bg-night-2 text-night-graphite' : 'text-graphite bg-surface'
      )}
    >
      <div
        className={cn(
          'flex h-[5.5%] min-h-5 items-center gap-[0.6%] border-b px-[1.4%]',
          dark
            ? 'border-white/8 bg-white/4'
            : 'bg-mist border-black/6 dark:border-white/8'
        )}
      >
        <i className="aspect-square h-[38%] rounded-full bg-[#ff5f57]" />
        <i className="aspect-square h-[38%] rounded-full bg-[#febc2e]" />
        <i className="aspect-square h-[38%] rounded-full bg-[#28c840]" />
      </div>
      <div
        className="grid flex-1 place-items-center p-[6%]"
        style={{
          backgroundImage: `repeating-linear-gradient(135deg, ${dark ? 'rgb(255 255 255/0.035)' : 'rgb(0 0 0/0.03)'} 0 1px, transparent 1px 14px)`
        }}
      >
        <div className="max-w-md text-center text-[clamp(0.75rem,1.2vw,0.9375rem)] leading-snug">
          <p className={dark ? 'text-night-ink' : 'text-ink'}>{spec.brief}</p>
          <p className="mt-2 font-mono text-[0.85em] opacity-80">
            {w} × {h} · {filesLabel(spec)}
          </p>
        </div>
      </div>
    </div>
  )
}

/**
 * An iPhone screenshot in a phone-shaped frame: a raw screen capture has no
 * bezel, so one is drawn around it (and around the placeholder).
 */
export function PhoneShot({
  spec,
  className
}: {
  spec: ShotSpec
  className?: string
}) {
  const sources = useSources(spec)
  const [w, h] = spec.size

  return (
    <div
      className={cn(
        'bg-coal rounded-[15%/7%] p-[3.2%] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.5),inset_0_0_0_1px_rgb(255_255_255/0.12)] dark:bg-[#2c2c2e]',
        className
      )}
    >
      <div
        className="bg-surface relative overflow-hidden rounded-[12%/5.6%] dark:bg-black"
        style={{ aspectRatio: `${w} / ${h}` }}
      >
        {sources ? (
          <Capture sources={sources} width={w / 3} height={h / 3} />
        ) : (
          <div
            className="text-graphite absolute inset-0 grid place-items-center p-[10%]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(135deg, rgb(0 0 0/0.03) 0 1px, transparent 1px 14px)'
            }}
          >
            <div className="text-center text-[clamp(0.6875rem,1vw,0.8125rem)] leading-snug">
              <p className="text-ink">{spec.brief}</p>
              <p className="mt-2 font-mono text-[0.85em] break-all opacity-80">
                {w} × {h} · {filesLabel(spec)}
              </p>
            </div>
          </div>
        )}
        {/* The Dynamic Island, over the screen as on the device. */}
        <i className="absolute top-[1.6%] left-1/2 h-[3.6%] w-[31%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  )
}
