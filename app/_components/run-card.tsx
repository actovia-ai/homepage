'use client'

import {
  ArrowUp,
  Check,
  Folder,
  Globe,
  Map,
  MessageSquare,
  Plus,
  Search,
  Settings,
  Terminal,
  Users
} from 'lucide-react'

import { OdyIcon } from '@/app/_components/ody-icon'
import { Shot, useShotReady } from '@/app/_components/shot'
import { SHOTS } from '@/app/_lib/shots'
import { cn } from '@/lib/utils'

/*
  The product window under the hero. Until the real capture (SHOTS.hero)
  exists under public/shots/, the window is drawn in HTML the way the app
  lays out a turn: the chat list, the question, the steps the model took with
  their tools, the start of the answer, the composer. Everything in it is an
  example, and the caption says so.
*/
const STEPS = [
  {
    icon: Search,
    tool: 'web_search',
    detail: 'Kyoto in November · 10 sources',
    tag: 'every source kept'
  },
  { icon: Globe, tool: 'web_fetch', detail: 'read 3 of them in full' },
  {
    icon: Terminal,
    tool: 'terminal',
    detail: 'python budget.py · ¥76,400 of ¥80,000',
    tag: 'in a folder of its own'
  },
  { icon: Map, tool: 'map_itinerary', detail: '3 days on a map' }
]

const CHATS = [
  'Kyoto, three days',
  'Summarise the Q3 notes',
  'Why is the build flaky?',
  'A chart of my running log',
  'Reading list for October'
]

export function AppWindow() {
  const captured = useShotReady(SHOTS.hero)

  return (
    <figure>
      {captured ? (
        <Shot spec={SHOTS.hero} priority />
      ) : (
        <div className="bg-panel border-hairline overflow-hidden rounded-[12px] border shadow-[0_40px_80px_-48px_rgb(0_0_0/0.45)]">
          {/* Title bar */}
          <div className="border-hairline bg-sunk/70 relative flex h-11 items-center border-b px-4">
            <span className="flex gap-1.5" aria-hidden>
              <i className="size-3 rounded-full bg-[#ff5f57]" />
              <i className="size-3 rounded-full bg-[#febc2e]" />
              <i className="size-3 rounded-full bg-[#28c840]" />
            </span>
            <span className="border-hairline bg-panel text-graphite absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-[5px] border px-2.5 py-1 font-mono text-xs sm:flex">
              <span className="bg-go size-1.5 rounded-full" aria-hidden />
              Actovia <span className="opacity-50">/</span> on this Mac
            </span>
            <span className="text-graphite ml-auto font-mono text-xs">
              your model · your key
            </span>
          </div>

          <div className="grid md:grid-cols-[230px_minmax(0,1fr)]">
            {/* Sidebar */}
            <aside className="border-hairline bg-sunk/35 hidden flex-col border-r p-3 text-sm md:flex">
              <span className="text-ink flex items-center gap-2 rounded-[6px] px-2.5 py-2">
                <Plus aria-hidden className="size-4" strokeWidth={1.75} />
                New chat
              </span>
              <span className="text-graphite flex items-center gap-2 rounded-[6px] px-2.5 py-2">
                <Users aria-hidden className="size-4" strokeWidth={1.75} />
                Philharmonic
              </span>
              <p className="text-graphite mt-4 px-2.5 text-xs">Recent</p>
              <ul className="mt-1.5 flex flex-col">
                {CHATS.map((c, i) => (
                  <li
                    key={c}
                    className={cn(
                      'flex items-center gap-2 truncate rounded-[6px] px-2.5 py-2',
                      i === 0 ? 'bg-panel text-ink shadow-[0_1px_2px_rgb(0_0_0/0.06)]' : 'text-graphite'
                    )}
                  >
                    <MessageSquare
                      aria-hidden
                      className="size-3.5 shrink-0"
                      strokeWidth={1.75}
                    />
                    <span className="truncate">{c}</span>
                  </li>
                ))}
              </ul>
              <span className="text-graphite mt-auto flex items-center gap-2 px-2.5 pt-6 pb-1">
                <OdyIcon size={18} />
                <span className="flex-1">Actovia</span>
                <Settings aria-hidden className="size-4" strokeWidth={1.75} />
              </span>
            </aside>

            {/* The conversation */}
            <div className="flex min-w-0 flex-col px-5 pt-6 pb-5 sm:px-10 sm:pt-8">
              <div className="mx-auto w-full max-w-[640px]">
                <p className="bg-sunk ml-auto w-fit max-w-[38ch] rounded-[12px] rounded-br-[4px] px-4 py-2.5 text-[0.9375rem] leading-snug">
                  Plan three days in Kyoto next month, keep it under ¥80,000,
                  and put it on a map.
                </p>

                <ol className="mt-6 flex flex-col">
                  {STEPS.map((s, i) => (
                    <li
                      key={s.tool}
                      className="step-in flex items-center gap-3 py-1.5"
                      style={{ animationDelay: `${500 + i * 240}ms` }}
                    >
                      <span className="border-hairline bg-paper text-graphite grid size-7 shrink-0 place-items-center rounded-full border">
                        <s.icon
                          aria-hidden
                          className="size-3.5"
                          strokeWidth={1.75}
                        />
                      </span>
                      <span className="min-w-0 text-[0.9375rem] sm:truncate">
                        <code className="text-ink text-[0.8125rem]">
                          {s.tool}
                        </code>
                        <span className="text-graphite"> — {s.detail}</span>
                      </span>
                      <Check
                        aria-hidden
                        className="text-go size-4 shrink-0"
                        strokeWidth={2}
                      />
                      {s.tag && (
                        <span className="tag ml-auto hidden lg:inline-flex">
                          {s.tag}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>

                <div
                  className="step-in border-hairline mt-4 border-t pt-5"
                  style={{ animationDelay: '1500ms' }}
                >
                  <p className="text-ink text-[0.9375rem] leading-relaxed">
                    <strong className="font-semibold">Day 1, Higashiyama.</strong>{' '}
                    Start at Kiyomizu-dera before the crowds, then walk down
                    Sannenzaka to Yasaka Shrine
                    <sup className="bg-sunk text-graphite ml-1 rounded-full px-1.5 py-px align-[0.2em] text-[0.6875rem]">
                      2
                    </sup>{' '}
                    …
                  </p>
                  <p className="text-graphite mt-3 flex items-center gap-2 text-sm">
                    <Folder aria-hidden className="size-3.5" strokeWidth={1.75} />
                    <code className="text-[0.8125rem]">kyoto-plan.md</code>{' '}
                    saved in the chat’s folder
                  </p>
                </div>

                {/* Composer */}
                <div className="border-hairline bg-paper mt-8 flex items-center gap-3 rounded-[12px] border py-2.5 pr-2.5 pl-4">
                  <span className="text-graphite flex-1 text-[0.9375rem]">
                    Ask a follow-up…
                  </span>
                  <span className="text-graphite hidden font-mono text-xs sm:inline">
                    tools on
                  </span>
                  <span className="bg-ink text-paper grid size-8 place-items-center rounded-full">
                    <ArrowUp aria-hidden className="size-4" strokeWidth={2} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <figcaption className="text-graphite mt-4 text-center text-xs">
        {captured ? 'Actovia on macOS.' : 'An example run, drawn for this page.'}
      </figcaption>
    </figure>
  )
}
