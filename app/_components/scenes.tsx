'use client'

import { type CSSProperties, useEffect, useRef, useState } from 'react'

import { Shot } from '@/app/_components/shot'
import { SHOTS, type ShotSpec } from '@/app/_lib/shots'

/**
 * Scenes — the page's one scroll-driven chapter (DESIGN.md, "Scenes").
 *
 * The chapter is tall; its stage is sticky and stays put while the scroll moves
 * the scenes through it. The component only writes `--p` (0 → 1 across the
 * chapter) onto the section; the motion itself is CSS (`.scene-copy`,
 * `.scene-shot` in globals.css): each scene's distance from the centre, in
 * scenes, drives a translate, a scale and the opacity, with the copy
 * travelling slower than the screen — the parallax. Under
 * `prefers-reduced-motion` the chapter is a plain stacked list.
 */
const SCENES: { title: string; body: string; shot: ShotSpec }[] = [
  {
    title: 'It remembers you.',
    body: 'A lasting fact goes in as you say it. An answer names the memories it used — and if one is wrong, Fix in chat puts it right.',
    shot: SHOTS.sceneMemory
  },
  {
    title: 'It shows what it found.',
    body: 'A search brings the pictures back with the pages, numbered with the sources, so you can see before you read.',
    shot: SHOTS.scenePhotos
  },
  {
    title: 'It reads the market.',
    body: 'Ask about a stock and the answer comes with the chart, the day’s move and the sources behind the story.',
    shot: SHOTS.sceneStocks
  },
  {
    title: 'It puts the plan on a map.',
    body: 'A three-day itinerary becomes a map: numbered stops, the route between them, and each place’s hours and photos.',
    shot: SHOTS.sceneMap
  },
  {
    title: 'It knows the weather.',
    body: 'A forecast card with the week ahead, in the place’s own time — and the answer says what to do with it.',
    shot: SHOTS.sceneWeather
  },
  {
    title: 'It paints.',
    body: 'Describe a picture and it is made, saved on your computer, and kept with the chat.',
    shot: SHOTS.scenePaint
  },
  {
    title: 'It builds the thing.',
    body: 'A timer, a chart, a small app: written as an artifact that runs in its own sandbox, right in the answer.',
    shot: SHOTS.sceneBuild
  },
  {
    title: 'Ask again. Keep the better one.',
    body: 'Regenerate puts two answers side by side. Pick one and the conversation carries on from it; the other stays out of the model’s sight.',
    shot: SHOTS.sceneCompare
  },
  {
    title: 'Teach it a skill.',
    body: 'Install a skill from skills.sh with one click. It reads the instructions only when a task calls for them.',
    shot: SHOTS.sceneSkills
  },
  {
    title: 'From the menu bar.',
    body: 'A pill over whatever you are doing. Type, press return, and the chat is waiting in the window.',
    shot: SHOTS.sceneQuickChat
  }
]

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return reduced
}

/**
 * One gesture, one scene (owner, 2026-10-22). While the chapter's stage is pinned, a wheel tick, a swipe or an
 * arrow key moves the page to the next or previous scene — `--p` follows the eased move — and every input
 * until that move is over (plus a moment for a trackpad's inertia) is swallowed, so a long flick still changes
 * one scene. At the first scene scrolling up, and at the last scrolling down, nothing is intercepted: the
 * page leaves the chapter as it entered it.
 */
const MOVE_MS = 450
const SETTLE_MS = 220
const WHEEL_STEP = 12
const SWIPE_STEP = 24
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

function useChapterScenes(ref: React.RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    const n = SCENES.length
    let raf = 0
    let lockedUntil = 0
    let wheelSum = 0
    let touchY: number | null = null

    const geometry = () => {
      const r = el.getBoundingClientRect()
      const range = r.height - window.innerHeight
      return { top: r.top + window.scrollY, range, p: range > 0 ? -r.top / range : 0 }
    }
    const paint = () => {
      const { p } = geometry()
      el.style.setProperty('--p', Math.min(1, Math.max(0, p)).toFixed(4))
    }
    /** The stage is pinned: the chapter spans the viewport. */
    const pinned = () => {
      const r = el.getBoundingClientRect()
      return r.top <= 1 && r.bottom >= window.innerHeight - 1
    }
    const moveTo = (scene: number) => {
      const { top, range } = geometry()
      const from = window.scrollY
      const to = top + (scene / (n - 1)) * range
      const started = performance.now()
      lockedUntil = started + MOVE_MS + SETTLE_MS
      cancelAnimationFrame(raf)
      const frame = (now: number) => {
        const k = Math.min(1, Math.max(0, (now - started) / MOVE_MS))
        // `instant`: the root's `scroll-behavior: smooth` would turn each frame into a smooth scroll of its own.
        window.scrollTo({ top: from + (to - from) * easeOut(k), behavior: 'instant' })
        paint()
        if (k < 1) raf = requestAnimationFrame(frame)
      }
      raf = requestAnimationFrame(frame)
    }
    /** A gesture in `direction` (1 down, -1 up): handled — and swallowed — unless it leaves the chapter. */
    const step = (direction: 1 | -1): boolean => {
      if (!pinned()) return false
      if (performance.now() < lockedUntil) return true
      const current = Math.round(geometry().p * (n - 1))
      const next = current + direction
      if (next < 0 || next > n - 1) return false
      moveTo(next)
      return true
    }

    const onWheel = (e: WheelEvent) => {
      if (!pinned()) return
      if (performance.now() < lockedUntil) {
        e.preventDefault()
        return
      }
      wheelSum += e.deltaY
      if (Math.abs(wheelSum) < WHEEL_STEP) {
        e.preventDefault()
        return
      }
      const direction = wheelSum > 0 ? 1 : -1
      wheelSum = 0
      if (step(direction)) e.preventDefault()
    }
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? null
    }
    const onTouchMove = (e: TouchEvent) => {
      if (touchY === null || !pinned()) return
      if (performance.now() < lockedUntil) {
        e.preventDefault()
        return
      }
      const y = e.touches[0]?.clientY ?? touchY
      const delta = touchY - y
      if (Math.abs(delta) < SWIPE_STEP) return
      touchY = null
      if (step(delta > 0 ? 1 : -1)) e.preventDefault()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as HTMLElement | null
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return
      const down = e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)
      const up = e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)
      if (!down && !up) return
      if (step(down ? 1 : -1)) e.preventDefault()
    }
    const onScroll = () => {
      if (performance.now() >= lockedUntil) {
        wheelSum = 0
        paint()
      }
    }

    paint()
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', paint)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', paint)
      cancelAnimationFrame(raf)
    }
  }, [ref, enabled])
}

export function Scenes() {
  const chapter = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  useChapterScenes(chapter, !reduced)

  if (reduced) {
    return (
      <section id="scenes" aria-label="Scenes" className="border-t border-hairline py-28 sm:py-36">
        <div className="mx-auto max-w-[1328px] px-5 sm:px-8">
          <p className="tag">A few more scenes</p>
          <ol className="mt-10 grid gap-y-20">
            {SCENES.map((s) => (
              <li key={s.title} className="grid grid-cols-12 items-center gap-x-8 gap-y-6">
                <div className="col-span-12 lg:col-span-4">
                  <h3 className="type-title">{s.title}</h3>
                  <p className="type-lede mt-3 max-w-[38ch]">{s.body}</p>
                </div>
                <div className="col-span-12 lg:col-span-8">
                  <Shot spec={s.shot} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    )
  }

  return (
    <section
      id="scenes"
      aria-label="Scenes"
      ref={chapter}
      className="scenes border-t border-hairline"
      style={{ '--n': SCENES.length } as CSSProperties}
    >
      <div className="scenes-stage">
        <div className="mx-auto grid h-full max-w-[1328px] grid-cols-12 items-center gap-x-8 gap-y-6 px-5 sm:px-8">
          <p className="tag absolute top-8 left-5 sm:left-8">A few more scenes</p>
          <div className="relative col-span-12 h-44 lg:col-span-4 lg:h-[60vh]">
            {SCENES.map((s, i) => (
              <div
                key={s.title}
                className="scene-copy flex flex-col justify-center"
                style={{ '--i': i } as CSSProperties}
              >
                <h3 className="type-title">{s.title}</h3>
                <p className="type-lede mt-3 max-w-[38ch]">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="relative col-span-12 aspect-[16/10] lg:col-span-8">
            {SCENES.map((s, i) => (
              <div key={s.title} className="scene-shot" style={{ '--i': i } as CSSProperties}>
                <Shot spec={s.shot} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
