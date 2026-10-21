import { Shot } from '@/app/_components/shot'
import type { ShotSpec } from '@/app/_lib/shots'
import { cn } from '@/lib/utils'

/**
 * One of the big jobs: the statement in a narrow column, the screen that
 * proves it wide beside it. `flip` puts the screen first; a dark-only capture
 * sits in a black field so it reads as a window, not a hole.
 */
export function FeaturePanel({
  title,
  body,
  shot,
  tone = 'light',
  flip,
  children
}: {
  title: string
  body: string
  shot: ShotSpec
  tone?: 'light' | 'dark'
  flip?: boolean
  children?: React.ReactNode
}) {
  const dark = tone === 'dark'
  return (
    <section className="border-hairline overflow-hidden border-t">
      <div className="mx-auto grid max-w-[1328px] grid-cols-1 items-center gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-12 lg:gap-16">
        <div className={cn('lg:col-span-4', flip && 'lg:order-2')}>
          <h2 className="type-headline">{title}</h2>
          <p className="type-lede text-graphite mt-6 max-w-[40ch]">{body}</p>
          {children}
        </div>
        <div
          className={cn(
            'lg:col-span-8',
            flip && 'lg:order-1',
            dark && 'bg-term rounded-[10px] p-4 sm:p-10'
          )}
        >
          <Shot spec={shot} tone={tone} />
        </div>
      </div>
    </section>
  )
}
