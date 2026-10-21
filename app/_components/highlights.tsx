import { Shot } from '@/app/_components/shot'
import { Terminal, Token } from '@/app/_components/terminal'
import { SHOTS } from '@/app/_lib/shots'
import { cn } from '@/lib/utils'

/*
  What it can do, as one hairline-ruled sheet rather than a wall of cards:
  two wide cells with captures, rows of short cells that each carry a small
  piece of the real thing (a key combination, a command, a query), and one
  full-width cell to close.
*/
const LANGUAGES = [
  'English',
  'Deutsch',
  'Español',
  'Français',
  'Italiano',
  '日本語',
  '한국어',
  'Português',
  '繁體中文（香港）',
  '繁體中文（台灣）'
]

export function Highlights() {
  return (
    <section id="features" className="py-28 sm:py-36">
      <div className="mx-auto max-w-[1328px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <h2 className="type-headline max-w-[14ch]">
            A workspace, not a chat box.
          </h2>
          <p className="type-lede text-graphite max-w-[46ch] lg:justify-self-end">
            Tools it picks for itself, a memory of you, long conversations it
            does not lose, and room for the things you already use.
          </p>
        </div>

        <div className="bg-hairline border-hairline mt-16 grid grid-cols-1 gap-px overflow-hidden border sm:mt-20 md:grid-cols-6 lg:grid-cols-12">
          <Cell
            span="md:col-span-6 lg:col-span-7"
            title="It builds things you can use."
            body="Ask for a chart, a calculator or a small web app and it opens beside the chat, running in a sandbox that cannot reach your data."
          >
            <div className="mt-10 -mr-8 -mb-10 sm:-mr-12 sm:-mb-12">
              <Shot spec={SHOTS.artifacts} />
            </div>
          </Cell>

          <Cell
            span="md:col-span-6 lg:col-span-5"
            title="It can use your Mac."
            body="Computer Use drives one app you have allowed, window by window. Press Option-Shift-Escape and it stops at once."
          >
            <div className="mt-8 flex items-center gap-2" aria-hidden>
              {['⌥', '⇧', 'esc'].map((k) => (
                <kbd
                  key={k}
                  className="border-hairline bg-paper text-ink grid h-11 min-w-11 place-items-center rounded-[6px] border border-b-[3px] px-3 text-base"
                >
                  {k}
                </kbd>
              ))}
              <span className="text-graphite ml-2 text-sm">stops it</span>
            </div>
            <div className="mt-10 -mr-8 -mb-10 sm:-mr-12 sm:-mb-12">
              <Shot spec={SHOTS.computerUse} tone="dark" />
            </div>
          </Cell>

          <Cell
            span="md:col-span-3 lg:col-span-4"
            title="It remembers you."
            body="Your preferences, projects and the people you mention become a short profile it reads before it answers."
          >
            <div className="mt-8 flex flex-wrap items-center gap-2 text-sm">
              <ul className="flex flex-wrap gap-2">
                {['Profile', 'Topics', 'People'].map((s) => (
                  <li
                    key={s}
                    className="border-hairline bg-paper rounded-[4px] border px-2.5 py-1"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <span className="flex items-center whitespace-nowrap">
                <span
                  aria-hidden
                  className="bg-sun-deep size-1.5 rounded-full"
                />
                <span aria-hidden className="bg-sun-deep h-px w-5" />
                <span className="tag">you review every entry</span>
              </span>
            </div>
          </Cell>

          <Cell
            span="md:col-span-3 lg:col-span-4"
            title="Long chats that don’t forget."
            body="Older turns are summarised, never thrown away. When it needs the detail, it opens a summary back up."
          >
            <Terminal className="mt-8" label="what the model sees">
              <span className="text-term-dim">
                [summary of the older turns]
              </span>
              {'\n'}
              <span className="text-term-dim">+ the latest runs, whole</span>
              {'\n'}
              <span className="text-term-dim">› </span>
              <Token>lcm_expand</Token> summary
              {'\n'}
              <span className="text-term-dim"> the turns themselves</span>
            </Terminal>
          </Cell>

          <Cell
            span="md:col-span-6 lg:col-span-4"
            title="Answers from your documents."
            body="Connect a LightRAG server and it searches your own notes and papers before it answers."
          />

          <Cell
            span="md:col-span-6 lg:col-span-5"
            title="Plug in more tools."
            body="Any MCP server, and skills from skills.sh installed in one click — or from the actovia command-line tool, which shares them."
          >
            <Terminal className="mt-8">
              <span className="text-term-dim">$ </span>
              actovia <Token>skills</Token> install{' '}
              <span className="text-term-dim">owner/repo/skill</span>
            </Terminal>
          </Cell>

          <Cell
            span="md:col-span-3 lg:col-span-3"
            title="One shortcut away."
            body="Quick Chat opens from the menu bar over whatever you are doing. ⌘F finds anything in a conversation."
          />

          <Cell
            span="md:col-span-3 lg:col-span-4"
            title="In your language."
            body="The whole app in ten languages."
          >
            <ul className="text-graphite mt-6 flex flex-wrap gap-x-4 gap-y-1.5 text-[0.9375rem]">
              {LANGUAGES.map((l) => (
                <li key={l} className="whitespace-nowrap">
                  {l}
                </li>
              ))}
            </ul>
          </Cell>

          <Cell
            span="md:col-span-6 lg:col-span-12"
            className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
            title="Your history, in SQL."
            body="Every chat, message and token count, queried with DuckDB right in Settings. Read-only, on a copy, on your machine."
          >
            <Terminal className="mt-8 lg:mt-0" label="Settings → Chat Audit">
              <span className="text-sun">select</span> model,
              {'\n       '}
              <span className="text-sun">sum</span>(total_tokens){' '}
              <span className="text-sun">as</span> tokens,
              {'\n       '}
              <span className="text-sun">round</span>(
              <span className="text-sun">sum</span>(cost_usd), 2){' '}
              <span className="text-sun">as</span> usd
              {'\n'}
              <span className="text-sun">from</span> messages
              {'\n'}
              <span className="text-sun">where</span> role ={' '}
              <span className="text-term-dim">&apos;assistant&apos;</span>
              {'\n'}
              <span className="text-sun">group by</span> model
              {'\n'}
              <span className="text-sun">order by</span> usd{' '}
              <span className="text-sun">desc</span>;
            </Terminal>
          </Cell>
        </div>
      </div>
    </section>
  )
}

function Cell({
  title,
  body,
  span,
  className,
  children
}: {
  title: string
  body: string
  span: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <article
      className={cn(
        'bg-panel flex flex-col overflow-hidden p-8 sm:p-12',
        span,
        className
      )}
    >
      <div>
        <h3 className="type-tile max-w-[20ch]">{title}</h3>
        <p className="text-graphite mt-3 max-w-[46ch] font-light">{body}</p>
      </div>
      {children}
    </article>
  )
}
