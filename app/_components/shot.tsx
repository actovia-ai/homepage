'use client'

import { createContext, useContext } from 'react'

import type { ShotSpec } from '@/app/_lib/shots'
import { cn } from '@/lib/utils'

/** The screenshot files that exist under public/, found at build time. */
const ReadyShots = createContext<ReadonlySet<string>>(new Set())

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
  const ready = useContext(ReadyShots).has(spec.file)
  const [w, h] = spec.size
  const dark = tone === 'dark'

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[1.1%/1.7%]',
        dark
          ? 'shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9),0_0_0_1px_rgb(255_255_255/0.08)]'
          : 'shadow-[0_40px_90px_-40px_rgb(0_0_0/0.45),0_0_0_1px_rgb(0_0_0/0.06)]',
        className
      )}
      style={{ aspectRatio: `${w} / ${h}` }}
    >
      {ready ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export-friendly, sized by the wrapper
        <img
          src={spec.file}
          alt=""
          width={w / 2}
          height={h / 2}
          loading={priority ? 'eager' : 'lazy'}
          className="absolute inset-0 size-full object-cover"
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
        dark ? 'bg-night-2 text-night-graphite' : 'text-graphite bg-white'
      )}
    >
      <div
        className={cn(
          'flex h-[5.5%] min-h-5 items-center gap-[0.6%] border-b px-[1.4%]',
          dark ? 'border-white/8 bg-white/4' : 'bg-mist border-black/6'
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
            {w} × {h} · public{spec.file}
          </p>
        </div>
      </div>
    </div>
  )
}
