'use client'

import { useEffect, type ReactNode } from 'react'

/** Reveal content on arrival without controlling page scrolling. */
// A section's blocks: the children of its container; a grid's cells one by one rather than the grid whole.
const REVEAL = [
  'main > section:not(#top):not(#scenes):not(#iphone-duo) > div > :not(.grid)',
  'main > section:not(#top):not(#scenes) > div > .grid > *',
  'main > section:not(#top):not(#scenes) > :is(ul, ol) > li'
].join(', ')

function useReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const blocks = [...document.querySelectorAll<HTMLElement>(REVEAL)]
    // Siblings arrive a beat apart.
    const byParent = new Map<Element | null, number>()
    for (const el of blocks) {
      const i = byParent.get(el.parentElement) ?? 0
      byParent.set(el.parentElement, i + 1)
      el.dataset.reveal = ''
      el.style.setProperty('--reveal-i', String(Math.min(i, 6)))
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          ;(e.target as HTMLElement).dataset.in = ''
          io.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    )
    for (const el of blocks) io.observe(el)
    return () => io.disconnect()
  }, [])
}

export function PageReveal({ children }: { children: ReactNode }) {
  useReveal()
  return children
}
