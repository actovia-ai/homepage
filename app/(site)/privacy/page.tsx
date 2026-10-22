import type { Metadata } from 'next'
import Link from 'next/link'

import { Footer } from '@/app/_components/footer'
import { LocalNav } from '@/app/_components/local-nav'
import { REPO_URL } from '@/app/_lib/release'

export const metadata: Metadata = {
  title: 'Privacy policy — Actovia',
  description:
    'What Actovia stores, where it stays, and the only things that leave your devices: the requests you send to the model provider and tools you chose.'
}

const EFFECTIVE = '23 October 2026'

/**
 * The privacy policy, for the site's footer and the App Store listing. It is
 * written from how the apps work (see docs/security and the source), so a
 * claim here that stops being true is a bug in one or the other.
 */
export default function PrivacyPage() {
  return (
    <>
      <LocalNav downloadHref="/#download" />
      <main className="mx-auto max-w-[1328px] px-5 py-20 sm:px-8 sm:py-28">
      <header className="max-w-[60ch]">
        <p className="tag">Privacy policy</p>
        <h1 className="type-headline mt-6">Your data stays home.</h1>
        <p className="type-lede text-graphite mt-6">
          Actovia is an AI assistant that runs on your own computer, and
          Actovia for iPhone is a remote for it. There is no account, no
          server of ours in between, and no analytics. The only things that
          leave your devices are the requests you send to the model provider
          and the tools you set up yourself. This page says exactly what those
          are. Effective {EFFECTIVE}.
        </p>
      </header>

      <div className="mt-16 grid gap-16 lg:grid-cols-12">
        <nav
          aria-label="Sections"
          className="text-graphite text-sm lg:col-span-3 lg:sticky lg:top-24 lg:self-start"
        >
          <ol className="space-y-2">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="hover:text-ink">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="prose-actovia lg:col-span-9">
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} className="border-hairline border-t py-10 first:border-t-0 first:pt-0">
              <h2 className="type-title max-w-[24ch]">{s.title}</h2>
              <div className="text-graphite mt-5 max-w-[68ch] space-y-4 font-light">
                {s.body}
              </div>
            </section>
          ))}
        </div>
      </div>
      </main>
      <Footer />
    </>
  )
}

const Dest = ({ children }: { children: React.ReactNode }) => (
  <span className="text-ink font-normal">{children}</span>
)

const SECTIONS: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: 'what-we-keep',
    title: 'What Actovia keeps, and where',
    body: (
      <>
        <p>
          <Dest>On your computer</Dest>, everything lives in one folder in
          your home directory (<code>~/.actovia</code>): your chats and their
          sources, the memories Actovia has formed about you, your settings
          and provider keys, the files it writes while working, its logs, and
          the backups it makes of its own database. That database runs inside
          the app. Nothing is copied to a cloud, and we cannot see any of it.
        </p>
        <p>
          <Dest>On your iPhone</Dest>, the app keeps the record of the
          computer it is paired with (the computer&rsquo;s name, its
          addresses, the fingerprint of its certificate and a token for it),
          a cache of what Apple Health gave it, and what its widgets show.
          Your conversations are not stored on the phone; they are fetched
          from your computer when you open them.
        </p>
        <p>
          There is no account to create and no sign-in, so there is nothing
          that identifies you to us.
        </p>
      </>
    )
  },
  {
    id: 'what-leaves',
    title: 'What leaves your devices, and to whom',
    body: (
      <>
        <p>
          Actovia sends data only to services you chose and configured, and
          only when you use them. Each of them has its own privacy policy.
        </p>
        <p>
          <Dest>The model provider you picked</Dest> — OpenAI, Anthropic,
          Google, xAI or Azure OpenAI, with your own API key, or a model
          running locally with Ollama, which sends nothing anywhere. A request
          carries the conversation you are in (what is needed of it to answer),
          the files and images you attached, the memories Actovia picked as
          relevant, and the results of the tools it called. Dictation is sent
          to the same OpenAI account as audio and comes back as text. Your key
          is stored on your computer, encrypted, and goes only to that
          provider&rsquo;s address.
        </p>
        <p>
          <Dest>Tools, when a run calls them</Dest>: web search and the
          Discover feed send the search terms to Brave Search with your Brave
          key; the weather tool sends a place name to Open-Meteo (no key); the
          map itinerary sends place names to Google Places and loads Google
          Maps, with your Google key; reading a web page fetches that page. A
          knowledge base, MCP servers and an S3 bucket are services you run or
          own, and receive what you point them at.
        </p>
        <p>
          <Dest>Two things of ours</Dest>: the Skills Market browses the
          skills.sh registry through a relay we host (skills-md.yancey.app),
          which receives the search terms and the id of a skill you open or
          install and nothing about you; and the desktop app asks
          update.electronjs.org whether a newer version exists, sending the
          platform, the architecture and the version it is running. This
          website is served by Cloudflare and runs no analytics of its own.
        </p>
      </>
    )
  },
  {
    id: 'iphone',
    title: 'The iPhone app',
    body: (
      <>
        <p>
          Actovia for iPhone talks to exactly one place: the computer you
          paired it with, over HTTPS, on your own network or across a Tailscale
          network you set up. It pins that computer&rsquo;s certificate and
          sends every request with its pairing token; the computer keeps only a
          hash of that token. Nothing listens on your computer&rsquo;s network
          until you pair a phone, and you can revoke a phone at any time in
          Settings → Devices.
        </p>
        <p>
          What the phone sends to your computer is what you do in it: the
          messages and photos you send, the audio you dictate, the day&rsquo;s
          Health numbers when you ask a question from the Health screen, and
          the phone&rsquo;s own error reports, which are written into the
          computer&rsquo;s local log and go no further.
        </p>
        <p>
          The app asks for permissions only when a feature needs them, each
          for one purpose: the <Dest>camera</Dest> to scan the pairing code
          and to take a photo for a chat; the <Dest>microphone</Dest> while you
          dictate; <Dest>location</Dest> to show where you are on an itinerary
          map; your <Dest>photo library</Dest> to save an image you chose;{' '}
          <Dest>Face ID</Dest> to unlock the connection to your computer;{' '}
          <Dest>local network</Dest> to find your computer; and{' '}
          <Dest>Apple Health</Dest>, below.
        </p>
      </>
    )
  },
  {
    id: 'health',
    title: 'Apple Health',
    body: (
      <>
        <p>
          With your permission, the app reads your sleep, activity, heart and
          recovery, body and mood data from Apple Health to draw the Health
          screen — the day, the calendar, the weekly and monthly reports. That
          reading stays on the phone.
        </p>
        <p>
          Health data goes to the AI provider set up on your computer in two
          cases only, both yours to start: when you ask a question from the
          Health screen, the numbers you are looking at travel with it, shown
          to you in the message; and, if you turn on Ody&rsquo;s daily note, a
          short summary of the day is sent to write that note. You can turn
          the note off and take back Health access at any time, in the app or
          in Settings → Privacy &amp; Security → Health. Clearing the archive
          in the app removes what it cached.
        </p>
        <p>
          The app writes one thing to Apple Health: the water you log there.
          Health data is never used for anything else, never sold, and never
          shared with anyone but the provider you chose, in the way above.
        </p>
      </>
    )
  },
  {
    id: 'memory',
    title: 'Memory',
    body: (
      <>
        <p>
          Actovia keeps a memory of you — lasting facts, interests, the people
          you mention — so it can answer better next time. It is a list you can
          read, edit, switch off entry by entry or delete in Settings →
          Memory, on your computer and from the phone; a deleted entry can be
          restored for a while. Each answer that used memories says which, and
          lets you correct them in the chat. The memories chosen for a question
          are sent to the provider with it, as above, and nowhere else.
        </p>
      </>
    )
  },
  {
    id: 'security',
    title: 'How it is protected',
    body: (
      <>
        <p>
          Provider keys and other secrets are encrypted at rest with the
          operating system&rsquo;s keychain. The app can be locked with a PIN
          or Touch ID; while it is locked it answers nothing, not even another
          program on the same computer. On the network it listens only to the
          computer it runs on until a phone is paired, and then only over HTTPS
          to paired phones. The code is open source under the MIT license, so
          all of this can be checked.
        </p>
      </>
    )
  },
  {
    id: 'children',
    title: 'Children',
    body: (
      <p>
        Actovia is not directed at children under 13 and we do not knowingly
        keep anything about them — we keep nothing about anyone.
      </p>
    )
  },
  {
    id: 'changes',
    title: 'Changes and contact',
    body: (
      <>
        <p>
          If this policy changes, the new version is published here with a
          new effective date, and a change that matters is noted in the release
          notes of the version that brings it.
        </p>
        <p>
          Questions go to{' '}
          <a href={`${REPO_URL}/issues`} className="text-ink underline">
            the project&rsquo;s issue tracker
          </a>{' '}
          or to{' '}
          <a href="mailto:developer@yanceyleo.com" className="text-ink underline">
            developer@yanceyleo.com
          </a>
          .{' '}
          <Link href="/" className="text-ink underline">
            Back to Actovia
          </Link>
          .
        </p>
      </>
    )
  }
]
