'use client'

import { useEffect, useRef, useState } from 'react'

import { Shot } from '@/app/_components/shot'
import { SHOTS } from '@/app/_lib/shots'
import { cn } from '@/lib/utils'

// One run, start to finish — a real sequence, so the steps are ordered.
const STEPS = [
  {
    title: 'You ask.',
    body: '“Plan three days in Kyoto next month, keep it under ¥80,000, and put it on a map.”',
    shot: SHOTS.runAsk
  },
  {
    title: 'It looks things up.',
    body: 'It searches the web, reads the pages that matter and keeps every source.',
    shot: SHOTS.runResearch
  },
  {
    title: 'It does the work.',
    body: 'It writes and runs code in a folder of its own, so nothing of yours is touched.',
    shot: SHOTS.runFiles
  },
  {
    title: 'It shows you.',
    body: 'A day-by-day map, a budget table and the sources, cited where they are used.',
    shot: SHOTS.runResult
  }
]

/**
 * A pinned screen, centred in the viewport, with the story scrolling past
 * it. The step whose text crosses the middle of the viewport sets which
 * capture is showing; the captures cross-fade in place. Below `lg` there is no
 * pinning: each step simply carries its own capture.
 */
export function RunStory() {
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting)
            setActive(Number(e.target.getAttribute('data-step')))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    for (const el of stepRefs.current) if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-paper py-28 sm:py-36">
      <div className="mx-auto max-w-[980px] px-6 text-center">
        <h2 className="type-headline">It keeps going until it’s done.</h2>
        <p className="type-lede text-graphite mx-auto mt-6 max-w-[40ch]">
          Actovia picks its tools, chains them and checks its own work. It stops
          only when it needs you, or before anything you can’t undo.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-[1180px] gap-10 px-4 sm:px-6 lg:mt-24 lg:grid-cols-[1fr_minmax(0,1.5fr)] lg:gap-16">
        <ol className="flex flex-col lg:pb-[16vh]">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              data-step={i}
              ref={(el) => {
                stepRefs.current[i] = el
              }}
              className="flex flex-col gap-6 py-10 lg:min-h-[70vh] lg:justify-center lg:py-0"
            >
              <div
                className={cn(
                  'transition-opacity duration-300 ease-out',
                  active === i ? 'lg:opacity-100' : 'lg:opacity-30'
                )}
              >
                <h3 className="type-title">{s.title}</h3>
                <p className="type-lede text-graphite mt-3 max-w-[30ch]">
                  {s.body}
                </p>
              </div>
              <div className="lg:hidden">
                <Shot spec={s.shot} />
              </div>
            </li>
          ))}
        </ol>

        <div className="hidden lg:block">
          <div className="sticky top-[calc(50vh-min(15vw,215px))]">
            <div className="relative">
              {STEPS.map((s, i) => (
                <div
                  key={s.title}
                  aria-hidden={active !== i}
                  className={cn(
                    'transition-opacity duration-500 ease-out',
                    i === 0 ? 'relative' : 'absolute inset-0',
                    active === i ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  <Shot spec={s.shot} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="text-graphite mx-auto mt-16 max-w-[62ch] px-6 text-center text-sm">
        It asks first before deleting anything outside its own folder, running
        sudo, installing system-wide, pushing to git, or sending or paying for
        anything on your behalf.
      </p>
    </section>
  )
}
