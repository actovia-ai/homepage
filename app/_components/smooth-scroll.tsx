'use client'

import { ReactLenis } from 'lenis/react'
import { useEffect, type ReactNode } from 'react'

import 'lenis/dist/lenis.css'

/**
 * The page's scroll (owner's ask, 2026-10-22): Lenis smooths the wheel —
 * 1.2 s of ease-out per gesture — and the blocks of each section fade and
 * rise into view as they arrive (`[data-reveal]`, in globals.css).
 *
 * The Scenes chapter runs its own one-gesture-per-scene move while its stage
 * is pinned; it says so on `<html data-scenes-pinned>`, and Lenis leaves those
 * wheel events alone (`virtualScroll`), so the two never pull at once.
 */
// A section's blocks: the children of its container; a grid's cells one by one rather than the grid whole.
const REVEAL = [
  'main > section:not(#top):not(#scenes) > div > :not(.grid)',
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

export function SmoothScroll({ children }: { children: ReactNode }) {
  useReveal()
  return (
    <ReactLenis
      root
      options={{
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        duration: 1.2,
        smoothWheel: true,
        // The nav's `#…` links scroll instead of jumping; the header is 72px.
        anchors: { offset: -72 },
        // The pinned Scenes chapter takes the wheel itself.
        virtualScroll: () => !document.documentElement.hasAttribute('data-scenes-pinned')
      }}
    >
      {children}
    </ReactLenis>
  )
}
