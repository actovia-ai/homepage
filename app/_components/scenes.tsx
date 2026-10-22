'use client'

import { type CSSProperties, useEffect, useRef, useState } from 'react'

import { useLenis } from 'lenis/react'

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
 * until that move is over is swallowed — and so is the rest of the gesture: a trackpad's inertia keeps sending
 * wheel events for a second or two after the fingers lift, with deltas that only decay. A new gesture is one
 * that starts after a pause, one that turns round, or one whose deltas grow again after a run of decay — the
 * fingers are back on the trackpad (a touch ends the momentum, and a swipe's deltas ramp up). A new gesture during a move is kept and made once the
 * move ends, so two quick swipes are two scenes, in order. A long flick changes one scene. At the first scene
 * scrolling up, and at the last scrolling down, nothing is intercepted: the page leaves the chapter as it
 * entered it. The page scrolls under Lenis (smooth-scroll.tsx): while the stage is pinned `<html>` carries
 * `data-scenes-pinned` and Lenis leaves the wheel to this hook; on the way in, Lenis's own momentum is cut at
 * the scene edge it reached, and the gesture that brought the page in is spent.
 */
const MOVE_MS = 450
/** Wheel events this far apart belong to different gestures. */
const QUIET_MS = 140
const WHEEL_STEP = 20
const SWIPE_STEP = 24
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

function useChapterScenes(
  ref: React.RefObject<HTMLElement | null>,
  enabled: boolean,
  lenis: { scrollTo: (target: number, options?: { immediate?: boolean }) => void } | undefined
) {
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    const n = SCENES.length
    let raf = 0
    let lockedUntil = 0
    /** A move is running (its frames); only then is a new gesture kept for after it. */
    let moving = false
    let wheelSum = 0
    let lastWheelAt = 0
    let lastDelta = 0
    /** Consecutive wheel events quieter than the one before: inertia decaying. */
    let decay = 0
    /** The gesture under way has had its scene. */
    let spent = false
    /** A gesture that began during a move: made when the move ends. */
    let pending: 1 | -1 | 0 = 0
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
    let wasPinned = false
    /** Tells Lenis; on the way in, lands on the scene edge the page reached and spends the gesture that brought it. */
    const syncPinned = () => {
      const now = pinned()
      if (now === wasPinned) return
      wasPinned = now
      document.documentElement.toggleAttribute('data-scenes-pinned', now)
      if (!now) return
      const { top, range, p } = geometry()
      const scene = p < 0.5 ? 0 : n - 1
      const y = top + (scene / (n - 1)) * range
      if (lenis) lenis.scrollTo(y, { immediate: true })
      else window.scrollTo({ top: y, behavior: 'instant' })
      spent = true
      pending = 0
      lockedUntil = performance.now() + 300
      paint()
    }
    const moveTo = (scene: number) => {
      const { top, range } = geometry()
      const from = window.scrollY
      const to = top + (scene / (n - 1)) * range
      const started = performance.now()
      lockedUntil = started + MOVE_MS
      moving = true
      cancelAnimationFrame(raf)
      const frame = (now: number) => {
        const k = Math.min(1, Math.max(0, (now - started) / MOVE_MS))
        // `instant`: the root's `scroll-behavior: smooth` would turn each frame into a smooth scroll of its own.
        window.scrollTo({ top: from + (to - from) * easeOut(k), behavior: 'instant' })
        paint()
        if (k < 1) raf = requestAnimationFrame(frame)
        else {
          moving = false
          if (pending) {
            const direction = pending
            pending = 0
            step(direction)
          }
        }
      }
      raf = requestAnimationFrame(frame)
    }
    /**
     * A gesture in `direction` (1 down, -1 up): handled — and swallowed — unless it leaves the chapter, in
     * which case the pin is given up at once so Lenis takes this very event (its listener runs after this one).
     */
    const step = (direction: 1 | -1): boolean => {
      if (!pinned()) return false
      if (performance.now() < lockedUntil) return true
      const current = Math.round(geometry().p * (n - 1))
      const next = current + direction
      if (next < 0 || next > n - 1) {
        wasPinned = false
        document.documentElement.removeAttribute('data-scenes-pinned')
        return false
      }
      moveTo(next)
      return true
    }

    const onWheel = (e: WheelEvent) => {
      // Entry is settled here too: at the pin moment a wheel event can land before the scroll event does.
      syncPinned()
      // The stream is read whether or not the stage is pinned, so the gesture that brings the page in is
      // known as one gesture once it is.
      const now = performance.now()
      const delta = e.deltaY
      const abs = Math.abs(delta)
      const gap = now - lastWheelAt
      lastWheelAt = now
      if (abs === 0) {
        if (pinned() && (spent || now < lockedUntil)) e.preventDefault()
        return
      }
      const lastAbs = Math.abs(lastDelta)
      // Growing again after decaying: a swipe's ramp, not inertia.
      const grows = abs > lastAbs * 1.3 + 3 && decay >= 2
      if (abs < lastAbs) decay += 1
      else if (abs > lastAbs) decay = 0
      // After a pause, the other way, or louder after decay: the fingers are back.
      const fresh = gap > QUIET_MS || Math.sign(delta) !== Math.sign(lastDelta) || grows
      lastDelta = delta
      if (!pinned()) return
      if (fresh) {
        wheelSum = 0
        spent = false
      }
      if (now < lockedUntil) {
        if (moving && fresh && abs >= WHEEL_STEP) {
          pending = delta > 0 ? 1 : -1
          spent = true
        }
        e.preventDefault()
        return
      }
      if (spent) {
        e.preventDefault()
        return
      }
      wheelSum += delta
      if (Math.abs(wheelSum) < WHEEL_STEP) {
        e.preventDefault()
        return
      }
      const direction = wheelSum > 0 ? 1 : -1
      wheelSum = 0
      if (step(direction)) {
        spent = true
        e.preventDefault()
      }
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
      syncPinned()
      if (performance.now() >= lockedUntil) paint()
    }

    paint()
    syncPinned()
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
      document.documentElement.removeAttribute('data-scenes-pinned')
    }
  }, [ref, enabled, lenis])
}

export function Scenes() {
  const chapter = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const lenis = useLenis()
  useChapterScenes(chapter, !reduced, lenis)

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
