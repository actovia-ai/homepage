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
 * Writes the chapter's scroll progress, 0 → 1, as `--p` on the section — damped: `--p` eases toward where the
 * scroll is a little each frame, so a flick of the trackpad does not throw a scene past — and snaps: once the
 * scroll has come to rest, the page finishes the move to a whole scene. Past 30 % of the way to the next scene
 * in the direction of travel it goes on to that scene; short of it, back to the one it left (owner,
 * 2026-10-22). So the chapter never rests on two scenes at once.
 */
const SNAP_THRESHOLD = 0.3

function useChapterProgress(ref: React.RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    const n = SCENES.length
    let raf = 0
    let target = 0
    let shown = -1
    let settle = 0
    let lastY = window.scrollY
    let direction = 1
    let snapping = false

    const measure = () => {
      const r = el.getBoundingClientRect()
      const range = r.height - window.innerHeight
      target = range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0
      return { top: r.top + window.scrollY, range }
    }
    const step = () => {
      raf = 0
      if (shown < 0) shown = target
      const diff = target - shown
      shown = Math.abs(diff) < 0.0004 ? target : shown + diff * 0.18
      el.style.setProperty('--p', shown.toFixed(4))
      if (shown !== target) raf = requestAnimationFrame(step)
    }
    // At rest inside the chapter: finish the move to a whole scene.
    const snap = () => {
      settle = 0
      const { top, range } = measure()
      if (range <= 0 || target <= 0 || target >= 1) return
      const x = target * (n - 1)
      const from = direction > 0 ? Math.floor(x) : Math.ceil(x)
      const travelled = Math.abs(x - from)
      const to = travelled > SNAP_THRESHOLD ? from + direction : from
      const scene = Math.min(n - 1, Math.max(0, to))
      const y = top + (scene / (n - 1)) * range
      if (Math.abs(window.scrollY - y) < 2) return
      snapping = true
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    const tick = () => {
      const y = window.scrollY
      if (y !== lastY) direction = y > lastY ? 1 : -1
      lastY = y
      measure()
      if (!raf) raf = requestAnimationFrame(step)
      window.clearTimeout(settle)
      if (snapping) {
        // The smooth scroll's own events: it is over once they stop.
        settle = window.setTimeout(() => {
          snapping = false
        }, 160)
        return
      }
      settle = window.setTimeout(snap, 140)
    }
    tick()
    window.addEventListener('scroll', tick, { passive: true })
    window.addEventListener('resize', tick)
    return () => {
      window.removeEventListener('scroll', tick)
      window.removeEventListener('resize', tick)
      window.clearTimeout(settle)
      cancelAnimationFrame(raf)
    }
  }, [ref, enabled])
}

export function Scenes() {
  const chapter = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  useChapterProgress(chapter, !reduced)

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
