'use client'

import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { OdyIcon } from '@/app/_components/ody-icon'
import { REPO_URL } from '@/app/_lib/release'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#scenes', label: 'Scenes' },
  { href: '#run', label: 'How it works' },
  { href: '#iphone', label: 'iPhone' },
  { href: '#privacy', label: 'Privacy' },
  { href: '/docs', label: 'Docs' }
]

/**
 * The bar the page scrolls under: the name on the left, the sections on the
 * right with a dot beside the one in view, the source and the one action.
 */
export function LocalNav({ downloadHref }: { downloadHref: string }) {
  const current = useSectionInView(
    LINKS.filter((l) => l.href.startsWith('#')).map((l) => l.href.slice(1))
  )

  return (
    <header className="bg-paper/80 border-hairline sticky top-0 z-50 border-b backdrop-blur-md">
      <nav
        aria-label="Actovia"
        className="mx-auto flex h-16 max-w-[1328px] items-center justify-between gap-6 px-5 sm:px-8"
      >
        <a href="#top" className="flex items-center gap-2.5">
          <OdyIcon size={28} priority />
          <span className="font-word text-[1.3125rem] leading-none">
            Actovia
          </span>
        </a>
        <div className="flex items-center gap-1 text-[0.9375rem]">
          {LINKS.map((l) => {
            const active = current === l.href.slice(1)
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={active ? 'location' : undefined}
                className={cn(
                  'relative hidden items-center gap-2 px-3 py-2 transition-colors duration-150 lg:inline-flex',
                  active ? 'text-ink' : 'text-graphite hover:text-ink'
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'bg-sun-deep size-1.5 rounded-full transition-[opacity,scale] duration-200 ease-out',
                    active ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  )}
                />
                {l.label}
              </a>
            )
          })}
          <a
            href={REPO_URL}
            className="border-hairline text-ink hover:bg-panel ml-3 hidden items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-150 sm:inline-flex"
          >
            <GithubMark />
            Source
          </a>
          <a
            href={downloadHref}
            className="bg-ink text-paper ml-2 inline-flex items-center rounded-[3px] px-4 py-2 text-sm font-medium transition-[opacity,scale] duration-150 hover:opacity-85 active:scale-[0.97]"
          >
            Download
          </a>
          <details className="group relative ml-1 lg:hidden">
            <summary
              aria-label="Menu"
              className="text-ink hover:bg-panel grid size-9 cursor-pointer list-none place-items-center rounded-[4px] [&::-webkit-details-marker]:hidden"
            >
              <Menu aria-hidden className="size-5 group-open:hidden" />
              <X aria-hidden className="hidden size-5 group-open:block" />
            </summary>
            <div className="bg-panel border-hairline absolute top-full right-0 mt-3 flex w-56 flex-col rounded-[6px] border p-2 shadow-[0_16px_40px_-20px_rgb(0_0_0/0.35)]">
              {[...LINKS, { href: REPO_URL, label: 'Source on GitHub' }].map(
                (l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) =>
                      e.currentTarget
                        .closest('details')
                        ?.removeAttribute('open')
                    }
                    className="text-ink hover:bg-sunk rounded-[4px] px-3 py-2.5"
                  >
                    {l.label}
                  </a>
                )
              )}
            </div>
          </details>
        </div>
      </nav>
    </header>
  )
}

export function GithubMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className={cn('size-4', className)}
      fill="currentColor"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

/** The id of the section that spans a line just under the bar, if any. */
function useSectionInView(ids: string[]) {
  const [current, setCurrent] = useState<string | null>(null)
  const key = ids.join(',')

  useEffect(() => {
    const els = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    let frame = 0
    const measure = () => {
      frame = 0
      const line = 120
      let found: string | null = null
      for (const el of els) {
        const r = el.getBoundingClientRect()
        if (r.top <= line && r.bottom > line) found = el.id
      }
      setCurrent(found)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [key])

  return current
}
