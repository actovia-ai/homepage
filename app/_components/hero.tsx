'use client'

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

import { Shot } from '@/app/_components/shot'
import { REPO_URL } from '@/app/_lib/release'
import { SHOTS } from '@/app/_lib/shots'

/**
 * The page's one orchestrated moment: the icon, the name and the promise,
 * then the app window below them growing to full size as it scrolls into
 * view — the way Apple lifts a product out of its introduction.
 */
export function Hero({
  macHref,
  version
}: {
  macHref: string
  version: string | null
}) {
  const shotRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: shotRef,
    offset: ['start end', 'center center']
  })
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1])
  const y = useTransform(scrollYProgress, [0, 1], [60, 0])

  return (
    <section id="top" className="overflow-hidden pt-20 pb-24 sm:pt-28">
      <div className="mx-auto flex max-w-[980px] flex-col items-center px-6 text-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.9, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.9 }}
        >
          <Image
            src="/brand/ody-icon.png"
            alt="The Exodus app icon: Ody, a marshmallow with a bindle on its shoulder"
            width={128}
            height={128}
            priority
            className="drop-shadow-[0_18px_30px_rgb(245_163_0/0.28)]"
          />
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            bounce: 0,
            duration: 0.9,
            delay: 0.08
          }}
          className="mt-8 flex flex-col items-center"
        >
          <h1 className="font-word type-hero">Exodus</h1>
          <p className="type-headline mt-3">
            Every model, on your own machine.
          </p>
          <p className="type-lede text-graphite mt-6 max-w-[36ch]">
            Chat with OpenAI, Anthropic, Gemini, xAI or a local model, and let
            it search, read, run and build until the job is done. Your chats,
            keys and files stay on your computer.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <a
              href={macHref}
              className="bg-sun text-ink hover:bg-sun-deep rounded-full px-7 py-3 text-[1.0625rem] font-medium transition-[background-color,scale] duration-150 active:scale-[0.97]"
            >
              Download for Mac
            </a>
            <a
              href={REPO_URL}
              className="text-ink text-[1.0625rem] font-medium underline-offset-4 hover:underline"
            >
              View the source on GitHub
            </a>
          </div>
          <p className="text-graphite mt-5 text-sm">
            Free and open source. Also for{' '}
            <a
              href="#download"
              className="text-ink underline underline-offset-4"
            >
              Windows and Linux
            </a>
            .{version ? ` Version ${version.replace(/^v/u, '')}.` : ''}
          </p>
        </motion.div>
      </div>

      <div className="mx-auto mt-20 max-w-[1180px] px-4 sm:px-6">
        <motion.div
          ref={shotRef}
          style={reduce ? undefined : { scale, y }}
          className="origin-top"
        >
          <Shot spec={SHOTS.hero} priority />
        </motion.div>
      </div>
    </section>
  )
}
