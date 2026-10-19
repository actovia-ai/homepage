import { Shot } from '@/app/_components/shot'
import { SHOTS, type ShotSpec } from '@/app/_lib/shots'
import { cn } from '@/lib/utils'

type Tone = 'white' | 'night' | 'sun'

interface Tile {
  title: string
  body: string
  span: string
  tone?: Tone
  shot?: ShotSpec
  /** Text beside the screenshot rather than above it (a full-width tile). */
  wide?: boolean
}

/*
  Sizes carry the hierarchy: two screenshot tiles, then two rows of short,
  text-first tiles, then one full-width tile with the text beside its
  screenshot. Tiles that share a row are the same kind, so none is stretched
  around empty space. One tile is sunflower — Memory, the most "Ody" feature.
*/
const TILES: Tile[] = [
  {
    title: 'It builds things you can use.',
    body: 'Ask for a chart, a calculator or a small web app and it opens beside the chat, running in a sandbox that cannot reach your data.',
    span: 'md:col-span-7',
    shot: SHOTS.artifacts
  },
  {
    title: 'It can use your Mac.',
    body: 'Computer Use drives one app you have allowed, window by window. Press Option-Shift-Escape and it stops at once.',
    span: 'md:col-span-5',
    tone: 'night',
    shot: SHOTS.computerUse
  },
  {
    title: 'It remembers you.',
    body: 'Your preferences, projects and the people you mention become a short profile it reads before it answers, and you can review.',
    span: 'md:col-span-4',
    tone: 'sun'
  },
  {
    title: 'Long chats that don’t forget.',
    body: 'Older turns are summarised, never thrown away. When it needs the detail, it opens a summary back up.',
    span: 'md:col-span-4'
  },
  {
    title: 'Answers from your documents.',
    body: 'Connect a LightRAG server and it searches your own notes and papers before it answers.',
    span: 'md:col-span-4'
  },
  {
    title: 'Plug in more tools.',
    body: 'Any MCP server, and skills from skills.sh installed in one click and shared with the actovia command-line tool.',
    span: 'md:col-span-4'
  },
  {
    title: 'One shortcut away.',
    body: 'Quick Chat opens from the menu bar over whatever you are doing. ⌘F finds anything in a conversation.',
    span: 'md:col-span-4'
  },
  {
    title: 'In your language.',
    body: 'The whole app in ten languages, from Deutsch and Español to 日本語, 한국어 and 繁體中文.',
    span: 'md:col-span-4'
  },
  {
    title: 'Your history, in SQL.',
    body: 'Query every chat, message and token count with DuckDB, right in Settings.',
    span: 'md:col-span-12',
    wide: true,
    shot: SHOTS.chatAudit
  }
]

const TONE: Record<Tone, string> = {
  white: 'bg-surface text-ink',
  night: 'bg-night text-night-ink',
  sun: 'bg-sun text-coal'
}
const BODY: Record<Tone, string> = {
  white: 'text-graphite',
  night: 'text-night-graphite',
  sun: 'text-coal/75'
}

export function Highlights() {
  return (
    <section id="features" className="bg-mist py-28 sm:py-36">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        <h2 className="type-headline mx-auto max-w-[16ch] text-center">
          A workspace, not a chat box.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:mt-20 md:grid-cols-12 md:gap-5">
          {TILES.map((t) => {
            const tone = t.tone ?? 'white'
            return (
              <article
                key={t.title}
                className={cn(
                  'flex flex-col overflow-hidden rounded-[28px] p-8 sm:p-10',
                  TONE[tone],
                  t.span,
                  t.shot ? 'md:min-h-[520px]' : 'md:min-h-[240px]',
                  t.wide && 'lg:min-h-[440px] lg:flex-row lg:gap-12'
                )}
              >
                <div className={cn(t.wide && 'lg:w-[34%] lg:shrink-0')}>
                  <h3 className="type-tile max-w-[18ch]">{t.title}</h3>
                  <p className={cn('mt-3 max-w-[44ch]', BODY[tone])}>
                    {t.body}
                  </p>
                </div>
                {t.shot && (
                  // The capture runs off the tile's bottom edge, the way
                  // Apple crops a screen inside a highlight.
                  <div
                    className={cn(
                      'mt-auto -mb-24 translate-y-2 pt-10 sm:-mr-16',
                      t.wide && 'lg:mt-6 lg:flex-1 lg:pt-0'
                    )}
                  >
                    <Shot
                      spec={t.shot}
                      tone={tone === 'night' ? 'dark' : 'light'}
                    />
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
