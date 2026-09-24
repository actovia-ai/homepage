import { Shot } from '@/app/_components/shot'
import type { ShotSpec } from '@/app/_lib/shots'
import { cn } from '@/lib/utils'

/** A full-bleed chapter: a centred statement, then the screen that proves it. */
export function FeaturePanel({
  title,
  body,
  shot,
  tone = 'light',
  children
}: {
  title: string
  body: string
  shot: ShotSpec
  tone?: 'light' | 'dark'
  children?: React.ReactNode
}) {
  const dark = tone === 'dark'
  return (
    <section
      data-nav-tone={dark ? 'dark' : undefined}
      className={cn(
        'overflow-hidden py-28 sm:py-36',
        dark ? 'bg-night text-night-ink' : 'bg-paper text-ink'
      )}
    >
      <div className="mx-auto max-w-[980px] px-6 text-center">
        <h2 className="type-headline">{title}</h2>
        <p
          className={cn(
            'type-lede mx-auto mt-6 max-w-[42ch]',
            dark ? 'text-night-graphite' : 'text-graphite'
          )}
        >
          {body}
        </p>
        {children}
      </div>
      <div className="mx-auto mt-16 max-w-[1180px] px-4 sm:mt-20 sm:px-6">
        <Shot spec={shot} tone={tone} />
      </div>
    </section>
  )
}
