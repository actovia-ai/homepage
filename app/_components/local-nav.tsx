'use client'

import { useEffect, useState } from 'react'

import { OdyIcon } from '@/app/_components/ody-icon'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#iphone', label: 'iPhone' },
  { href: '#privacy', label: 'Privacy' },
  { href: '#specs', label: 'Tech specs' }
]

/**
 * The product bar Apple pins under its global nav: the product's name on the
 * left, its sections and the one action on the right, on a translucent
 * material the page scrolls under. Over a section marked
 * `data-nav-tone="dark"` the material turns dark with it, so the bar never
 * reads as a light strip laid across a black chapter.
 */
export function LocalNav({ downloadHref }: { downloadHref: string }) {
  const dark = useDarkUnderneath()

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b backdrop-blur-xl backdrop-saturate-180 transition-[background-color,border-color,color] duration-300 ease-out',
        dark
          ? 'bg-night-2/72 text-night-ink border-white/10'
          : 'bg-paper/72 text-ink border-black/8 dark:border-white/10'
      )}
    >
      <nav
        aria-label="Exodus"
        className="mx-auto flex h-13 max-w-[1024px] items-center justify-between px-4 sm:px-6"
      >
        <a href="#top" className="flex items-center gap-2">
          <OdyIcon size={26} priority />
          <span className="font-word text-[1.3125rem] leading-none tracking-[-0.01em]">
            Exodus
          </span>
        </a>
        <div className="flex items-center gap-6 text-[0.8125rem] tracking-[-0.01em]">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden opacity-80 transition-opacity duration-150 hover:opacity-100 sm:inline"
            >
              {l.label}
            </a>
          ))}
          <a
            href={downloadHref}
            className="bg-sun text-coal hover:bg-sun-deep rounded-full px-3.5 py-1 font-medium transition-colors duration-150 active:scale-[0.97]"
          >
            Download
          </a>
        </div>
      </nav>
    </header>
  )
}

/** Whether a dark section is currently under the bar (the top 52 px). */
function useDarkUnderneath() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const under = new Set<Element>()
    let observer: IntersectionObserver | undefined
    // A band the height of the bar along the top of the viewport. rootMargin
    // takes no calc(), so the band is set in pixels and rebuilt on resize.
    const observe = () => {
      observer?.disconnect()
      under.clear()
      observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) under.add(e.target)
            else under.delete(e.target)
          }
          setDark(under.size > 0)
        },
        { rootMargin: `0px 0px -${Math.max(window.innerHeight - 52, 0)}px 0px` }
      )
      for (const el of document.querySelectorAll('[data-nav-tone="dark"]')) {
        observer.observe(el)
      }
    }
    observe()
    window.addEventListener('resize', observe)
    return () => {
      window.removeEventListener('resize', observe)
      observer?.disconnect()
    }
  }, [])

  return dark
}
