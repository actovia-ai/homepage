'use client'

import { useId, useRef, useState } from 'react'

import { Check } from 'lucide-react'

import { Shot, useShotReady } from '@/app/_components/shot'
import { Terminal, Token } from '@/app/_components/terminal'
import { SHOTS, type ShotSpec } from '@/app/_lib/shots'
import { cn } from '@/lib/utils'

// One run, start to finish — a real sequence, so the steps are ordered.
const STEPS: {
  label: string
  title: string
  body: string
  shot: ShotSpec
  message?: string
  calls: { tool: string; args: string }[]
}[] = [
  {
    label: 'You ask',
    title: 'You ask.',
    body: 'One message, in your own words. Nothing to set up per task: it decides which tools the job needs.',
    shot: SHOTS.runAsk,
    message:
      '“Plan three days in Kyoto next month, keep it under ¥80,000, and put it on a map.”',
    calls: []
  },
  {
    label: 'It looks things up',
    title: 'It looks things up.',
    body: 'It searches the web, reads the pages that matter and keeps every source, numbered, so the answer can cite them.',
    shot: SHOTS.runResearch,
    calls: [
      { tool: 'web_search', args: '"Kyoto three day itinerary November"' },
      { tool: 'web_fetch', args: 'the pages worth reading' }
    ]
  },
  {
    label: 'It does the work',
    title: 'It does the work.',
    body: 'It writes and runs code in a folder of its own, so nothing of yours is touched.',
    shot: SHOTS.runFiles,
    calls: [
      { tool: 'write_file', args: 'budget.py' },
      { tool: 'terminal', args: 'python budget.py' }
    ]
  },
  {
    label: 'It shows you',
    title: 'It shows you.',
    body: 'A day-by-day map, a budget table and the sources, cited where they are used.',
    shot: SHOTS.runResult,
    calls: [{ tool: 'map_itinerary', args: '3 days, on a map' }]
  }
]

const HARD_STOPS = [
  'deleting outside its own folder',
  'running sudo',
  'installing system-wide',
  'pushing to git',
  'sending or paying for anything'
]

/**
 * A run, one step at a time: the step pills switch the capture, the step's
 * name and the tool calls it makes. Arrow keys move between the pills.
 */
export function RunStory() {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const id = useId()
  const step = STEPS[active]

  const onKeyDown = (e: React.KeyboardEvent) => {
    const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    const to =
      e.key === 'Home'
        ? 0
        : e.key === 'End'
          ? STEPS.length - 1
          : delta
            ? (active + delta + STEPS.length) % STEPS.length
            : null
    if (to === null) return
    e.preventDefault()
    setActive(to)
    tabs.current[to]?.focus()
  }

  return (
    <section id="run" className="py-28 sm:py-36">
      <div className="mx-auto max-w-[1328px] px-5 sm:px-8">
        <h2 className="type-headline max-w-[16ch]">
          It keeps going until it’s done.
        </h2>
        <p className="type-lede text-graphite mt-6 max-w-[52ch]">
          Actovia picks its tools, chains them and checks its own work. It stops
          only when it needs you, or before anything you can’t undo.
        </p>

        <div className="bg-panel border-hairline mt-14 rounded-[10px] border p-5 shadow-[0_30px_70px_-50px_rgb(0_0_0/0.35)] sm:mt-16 sm:p-8">
          <p className="text-graphite text-sm">Follow one run:</p>
          <div
            role="tablist"
            aria-label="The steps of a run"
            onKeyDown={onKeyDown}
            className="mt-3 flex flex-wrap gap-2"
          >
            {STEPS.map((s, i) => (
              <button
                key={s.label}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                role="tab"
                type="button"
                id={`${id}-tab-${i}`}
                aria-selected={active === i}
                aria-controls={`${id}-panel`}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  'flex items-center gap-2 rounded-[4px] border px-3.5 py-2 text-[0.9375rem] transition-[background-color,border-color,color,scale] duration-150 active:scale-[0.97]',
                  active === i
                    ? 'bg-ink text-paper border-transparent'
                    : 'border-hairline bg-paper text-ink hover:border-graphite/40'
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'size-1.5 rounded-full',
                    active === i ? 'bg-sun' : 'bg-hairline'
                  )}
                />
                {s.label}
              </button>
            ))}
          </div>

          <div
            id={`${id}-panel`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${active}`}
            className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-10"
          >
            <div className="bg-sunk rounded-[6px] p-4 sm:p-8">
              {/* Every capture stays mounted, so switching never waits on a load. */}
              <RunPreview active={active} />
            </div>

            <div key={active} className="panel-swap flex flex-col">
              <p className="font-display text-[clamp(3rem,5.4vw,5rem)] leading-[0.95] font-extralight">
                {step.title}
              </p>
              <Terminal
                className="mt-6"
                label={step.message ? 'your message' : 'tool calls'}
              >
                {step.message && (
                  <span className="block whitespace-pre-wrap">
                    {step.message}
                  </span>
                )}
                {step.calls.map((c, i) => (
                  <span key={i} className="block whitespace-pre-wrap">
                    <span className="text-term-dim">› </span>
                    <Token>{c.tool}</Token>{' '}
                    <span className="text-term-ink">{c.args}</span>
                  </span>
                ))}
              </Terminal>
              <p className="text-graphite mt-6 max-w-[40ch] font-light">
                {step.body}
              </p>
              <p className="text-graphite mt-8 text-sm">
                Step {active + 1} of {STEPS.length}
                {active < STEPS.length - 1 && (
                  <>
                    {' · '}
                    <button
                      type="button"
                      onClick={() => setActive(active + 1)}
                      className="text-ink underline"
                    >
                      Next: {STEPS[active + 1].label.toLowerCase()}
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="border-hairline mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-baseline sm:gap-5">
            <p className="text-ink shrink-0 text-sm font-medium">
              It asks first before
            </p>
            <ul className="flex flex-wrap gap-2">
              {HARD_STOPS.map((h) => (
                <li
                  key={h}
                  className="border-hairline text-graphite rounded-[4px] border px-2.5 py-1 text-sm"
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * What the chat shows at each step. Real captures (SHOTS.run*) replace the
 * drawn version once all four exist under public/shots/; until then the run
 * is drawn in HTML, the same example the hero's card tells.
 */
function RunPreview({ active }: { active: number }) {
  const captured = [
    useShotReady(STEPS[0].shot),
    useShotReady(STEPS[1].shot),
    useShotReady(STEPS[2].shot),
    useShotReady(STEPS[3].shot)
  ].every(Boolean)

  if (captured) {
    return (
      <div className="relative">
        {STEPS.map((s, i) => (
          <div
            key={s.label}
            aria-hidden={active !== i}
            className={cn(
              'transition-opacity duration-300 ease-out',
              i === 0 ? 'relative' : 'absolute inset-0',
              active === i ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Shot spec={s.shot} />
          </div>
        ))}
      </div>
    )
  }

  // A row belongs to a step; rows of earlier steps stay, dimmed, and rows of
  // later steps are not there yet.
  const row = (step: number) =>
    cn(
      'transition-[opacity,filter] duration-300 ease-out',
      step > active && 'hidden',
      step < active && 'opacity-45'
    )

  return (
    <figure>
      <div className="bg-panel border-hairline aspect-[3/2] overflow-hidden rounded-[8px] border shadow-[0_20px_44px_-28px_rgb(0_0_0/0.3)] max-sm:aspect-auto">
        <div className="border-hairline bg-sunk/60 flex items-center gap-1.5 border-b px-4 py-2.5">
          <i className="size-2.5 rounded-full bg-[#ff5f57]" />
          <i className="size-2.5 rounded-full bg-[#febc2e]" />
          <i className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="text-graphite ml-3 text-xs">Kyoto, three days</span>
        </div>
        <div className="flex flex-col gap-3 p-4 text-[0.875rem] sm:p-6">
          <p className="bg-sunk ml-auto w-fit max-w-[36ch] rounded-[10px] rounded-br-[3px] px-3.5 py-2 leading-snug">
            Plan three days in Kyoto next month, keep it under ¥80,000, and put
            it on a map.
          </p>

          {active === 0 && (
            <p className="text-graphite flex items-center gap-2">
              <span className="bg-sun-deep size-1.5 animate-pulse rounded-full" />
              Thinking about what the job needs…
            </p>
          )}

          <div className={row(1)}>
            <PreviewStep tool="web_search" detail="10 sources" />
            <ol
              className={cn(
                'mt-2 ml-9 flex flex-wrap gap-1.5',
                active > 1 && 'hidden'
              )}
            >
              {Array.from({ length: 10 }, (_, i) => (
                <li
                  key={i}
                  className="border-hairline bg-paper text-graphite grid size-6 place-items-center rounded-full border text-[0.6875rem]"
                >
                  {i + 1}
                </li>
              ))}
            </ol>
            <PreviewStep tool="web_fetch" detail="read 3 of them in full" />
          </div>

          <div className={row(2)}>
            <PreviewStep
              tool="write_file"
              detail="budget.py, in the chat’s folder"
            />
            <PreviewStep tool="terminal" detail="python budget.py" />
            <div
              className={cn(
                'bg-term text-term-ink mt-2 ml-9 rounded-[6px] px-3 py-2.5 font-mono text-[0.75rem] leading-relaxed',
                active > 2 && 'hidden'
              )}
            >
              <span className="text-term-dim">$ </span>python budget.py
              <br />
              total <span className="text-sun">¥76,400</span>
              <span className="text-term-dim"> of ¥80,000</span>
            </div>
          </div>

          <div className={row(3)}>
            <PreviewStep tool="map_itinerary" detail="3 days on a map" />
            <ul className="border-hairline mt-2 ml-9 divide-y divide-[color:var(--color-hairline)] rounded-[6px] border">
              {[
                ['Day 1', 'Higashiyama'],
                ['Day 2', 'Arashiyama'],
                ['Day 3', 'Fushimi and Nishiki']
              ].map(([d, p], i) => (
                <li key={d} className="flex items-center gap-3 px-3 py-2">
                  <span className="bg-ink text-paper grid size-5 place-items-center rounded-full text-[0.6875rem]">
                    {i + 1}
                  </span>
                  <span className="font-medium">{d}</span>
                  <span className="text-graphite">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <figcaption className="text-graphite mt-3 text-xs">
        An example run, drawn for this page.
      </figcaption>
    </figure>
  )
}

function PreviewStep({ tool, detail }: { tool: string; detail: string }) {
  return (
    <p className="flex items-center gap-3">
      <span className="text-go border-hairline bg-paper grid size-6 shrink-0 place-items-center rounded-full border">
        <Check aria-hidden className="size-3" strokeWidth={2.25} />
      </span>
      <code className="text-[0.8125rem]">{tool}</code>
      <span className="text-graphite">{detail}</span>
    </p>
  )
}
