'use client'

import { Shot } from '@/app/_components/shot'
import { SHOTS, type ShotSpec } from '@/app/_lib/shots'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'
import styles from './scenes.module.css'

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

/** Native horizontal gallery: vertical scrolling always belongs to the page. */
export function Scenes() {
  const rail = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const goTo = (index: number, instant = false) => {
    const container = rail.current
    const card = container?.children[index] as HTMLElement | undefined
    if (!container || !card) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    container.scrollTo({
      left: card.offsetLeft - (container.clientWidth - card.clientWidth) / 2,
      behavior: instant || reduced ? 'instant' : 'smooth'
    })
  }
  const sync = () => {
    const container = rail.current
    if (!container) return
    const center = container.scrollLeft + container.clientWidth / 2
    const cards = Array.from(container.children) as HTMLElement[]
    let nearest = 0
    cards.forEach((card, index) => {
      if (
        Math.abs(card.offsetLeft + card.clientWidth / 2 - center) <
        Math.abs(
          cards[nearest].offsetLeft + cards[nearest].clientWidth / 2 - center
        )
      )
        nearest = index
    })
    setCurrent(nearest)
  }
  return (
    <section
      id="scenes"
      aria-labelledby="scenes-title"
      aria-roledescription="carousel"
      className="border-hairline overflow-hidden border-t py-20 sm:py-28"
    >
      <div className="mx-auto mb-10 flex max-w-[1328px] items-end justify-between gap-6 px-5 sm:mb-14 sm:px-8">
        <h2 id="scenes-title" className="type-headline">
          A few more possibilities.
        </h2>
        <p className="text-graphite hidden max-w-[25ch] text-right text-sm sm:block">
          One assistant. Many ways to use it.
        </p>
      </div>
      <div
        id="scenes-gallery"
        ref={rail}
        className={styles.rail}
        onScroll={sync}
        tabIndex={0}
        aria-label="Product scenes. Use left and right arrow keys to browse."
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault()
            goTo(
              Math.max(
                0,
                Math.min(
                  SCENES.length - 1,
                  current + (event.key === 'ArrowRight' ? 1 : -1)
                )
              ),
              true
            )
          }
        }}
      >
        {SCENES.map((scene, index) => (
          <article
            key={scene.title}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${SCENES.length}: ${scene.title}`}
            className={styles.card}
          >
            <div className={styles.copy}>
              <h3 className="type-title">{scene.title}</h3>
              <p className="text-graphite mt-5 max-w-[36ch] font-light">
                {scene.body}
              </p>
            </div>
            <div className={styles.visual}>
              <Shot spec={scene.shot} />
            </div>
          </article>
        ))}
      </div>
      <div className="mx-auto mt-8 flex max-w-[1328px] items-center justify-center gap-2 px-2 sm:mt-10 sm:gap-5 sm:px-8">
        <button
          type="button"
          aria-label="Previous scene"
          aria-controls="scenes-gallery"
          disabled={current === 0}
          onClick={() => goTo(current - 1)}
          className={styles.arrow}
        >
          <ChevronLeft aria-hidden className="size-5" />
        </button>
        <div className={styles.dots} aria-label="Choose a scene">
          {SCENES.map((scene, index) => (
            <button
              key={scene.title}
              type="button"
              aria-label={`Show ${scene.title}`}
              aria-current={current === index ? 'true' : undefined}
              aria-controls="scenes-gallery"
              onClick={() => goTo(index)}
              className={styles.dot}
            >
              <span />
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label="Next scene"
          aria-controls="scenes-gallery"
          disabled={current === SCENES.length - 1}
          onClick={() => goTo(current + 1)}
          className={styles.arrow}
        >
          <ChevronRight aria-hidden className="size-5" />
        </button>
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {current + 1} of {SCENES.length}: {SCENES[current].title}
        </span>
      </div>
    </section>
  )
}
