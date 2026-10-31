'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

import styles from './iphone-duo.module.css'

/** A scroll-linked book fold, using the actual folded and inner-display captures. */
export function IPhoneDuo() {
  const track = useRef<HTMLElement>(null)
  const device = useRef<HTMLDivElement>(null)
  const hinge = useRef<HTMLDivElement>(null)
  const left = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = track.current
    if (!section) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const measure = () => {
      frame = 0
      const box = section.getBoundingClientRect()
      const range = box.height - innerHeight
      const p = reduced.matches
        ? 1
        : Math.min(1, Math.max(0, (-box.top / range - 0.1) / 0.75))
      if (device.current)
        device.current.style.transform = `translateX(${(1 - p) * 25}%) scale(${1 + (1 - p) * 0.15})`
      if (hinge.current)
        hinge.current.style.transform = `rotateY(${(p - 1) * 180}deg)`
      if (left.current) left.current.style.opacity = String(Math.min(1, p * 20))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    const apply = () => {
      section.toggleAttribute('data-moving', !reduced.matches)
      measure()
    }
    apply()
    addEventListener('scroll', schedule, { passive: true })
    addEventListener('resize', schedule)
    reduced.addEventListener('change', apply)
    return () => {
      cancelAnimationFrame(frame)
      removeEventListener('scroll', schedule)
      removeEventListener('resize', schedule)
      reduced.removeEventListener('change', apply)
    }
  }, [])

  return (
    <section
      id="iphone-duo"
      ref={track}
      className={`${styles.track} border-hairline border-t`}
    >
      <div className={styles.sticky}>
        <div className="mx-auto grid w-full max-w-[1328px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="type-headline max-w-[12ch]">
              Ready for iPhone Duo.
            </h2>
            <p className="type-lede text-graphite mt-6 max-w-[34ch]">
              A familiar chat when folded. Open it up, and your conversations
              and workspace sit side by side. More room for the same assistant.
            </p>
            <p className={`${styles.hint} text-graphite mt-6 text-sm`}>
              Unfold as you scroll.
            </p>
          </div>
          <div className={`${styles.stage} lg:col-span-8`}>
            <div
              ref={device}
              className={styles.device}
              role="img"
              aria-label="Actovia on iPhone Duo unfolds from a compact chat into a wide workspace with the conversation sidebar beside it."
            >
              <div ref={left} className={`${styles.half} ${styles.left}`}>
                <Face side="left" />
              </div>
              <div ref={hinge} className={`${styles.half} ${styles.right}`}>
                <div className={styles.front}>
                  <Face side="right" />
                </div>
                <div className={styles.back}>
                  <Image
                    src="/shots/duo-folded.png"
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 50vw, 360px"
                    className={styles.folded}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Face({ side }: { side: 'left' | 'right' }) {
  return (
    <Image
      src="/shots/duo-open.png"
      alt=""
      width={2853}
      height={2007}
      sizes="(max-width: 1024px) 90vw, 800px"
      className={`${styles.face} ${side === 'right' ? styles.faceRight : ''}`}
    />
  )
}
