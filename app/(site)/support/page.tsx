import type { Metadata } from 'next'
import Link from 'next/link'

import { Footer } from '@/app/_components/footer'
import { LocalNav } from '@/app/_components/local-nav'
import { openGraph } from '@/app/_lib/og'
import { REPO_URL } from '@/app/_lib/release'

const DESCRIPTION =
  'Help with Actovia and Actovia for iPhone: the docs, answers to the common questions, and where to report a problem.'

export const metadata: Metadata = {
  title: 'Support — Actovia',
  description: DESCRIPTION,
  alternates: { canonical: '/support' },
  openGraph: openGraph('Support — Actovia', DESCRIPTION, '/support')
}

const QUESTIONS: { q: string; a: React.ReactNode; href: string }[] = [
  {
    q: 'My iPhone can’t find my computer.',
    a: 'Both need to be on the same network, and Actovia must be running on the computer. Pair again from Settings → Devices on the computer; away from home, set up remote access first.',
    href: '/docs/remote-access'
  },
  {
    q: 'Actovia asks me to enter an API key again.',
    a: 'Keys are encrypted with your computer’s keychain. When the keychain can’t open them — a new Mac, a copied data folder — Settings lists each one to paste in again. Nothing was sent anywhere.',
    href: '/docs/data#keys-at-rest'
  },
  {
    q: 'An answer stopped with an error.',
    a: 'The error under the answer comes from the model provider: usually a key, a quota or the network. Settings → Logger shows the details, and “Copy for AI” makes them easy to share.',
    href: '/docs/app/logs'
  },
  {
    q: 'How do I update?',
    a: 'Settings → About checks for a new version. Until the Mac builds are signed, the update opens the releases page to download it.',
    href: '/docs/installation#updates'
  },
  {
    q: 'Where is my data?',
    a: 'On your computer, in the .actovia folder in your home folder. Backups, export and import are under Settings → Data Controls.',
    href: '/docs/app/backups'
  }
]

/**
 * The support page, for the footer and the App Store listing's Support URL.
 * There is no help desk: the docs answer, and the issue tracker takes reports.
 */
export default function SupportPage() {
  return (
    <>
      <LocalNav downloadHref="/#download" />
      <main className="mx-auto max-w-[1328px] px-5 py-20 sm:px-8 sm:py-28">
        <header className="max-w-[60ch]">
          <p className="tag">Support</p>
          <h1 className="type-headline mt-6">How can we help?</h1>
          <p className="type-lede text-graphite mt-6">
            Most answers are in the{' '}
            <Link
              href="/docs"
              className="text-ink underline underline-offset-4"
            >
              docs
            </Link>
            . For anything else — a bug, a question, an idea — open an issue on
            GitHub and it will be answered there.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="bg-ink text-paper inline-flex items-center rounded-[6px] px-5 py-3 text-base font-medium transition-[opacity,scale] duration-150 hover:opacity-90 active:scale-[0.97]"
            >
              Read the docs
            </Link>
            <a
              href={`${REPO_URL}/issues/new`}
              className="border-hairline bg-panel text-ink hover:bg-sunk inline-flex items-center rounded-[6px] border px-5 py-3 text-base font-medium transition-[background-color,scale] duration-150 active:scale-[0.97]"
            >
              Report a problem
            </a>
          </div>
        </header>

        <section className="mt-20 max-w-[68ch]">
          <h2 className="type-title">Common questions</h2>
          <dl className="mt-8">
            {QUESTIONS.map((item) => (
              <div
                key={item.q}
                className="border-hairline border-t py-8 first:border-t-0 first:pt-0"
              >
                <dt className="type-tile">{item.q}</dt>
                <dd className="text-graphite mt-3 font-light">
                  {item.a}{' '}
                  <Link
                    href={item.href}
                    className="text-ink underline underline-offset-4"
                  >
                    More in the docs
                  </Link>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="border-hairline mt-20 max-w-[68ch] border-t pt-10">
          <h2 className="type-title">Reporting a problem</h2>
          <p className="text-graphite mt-5 font-light">
            Say what you did, what you expected and what happened, with the
            version from Settings → About. Leave out API keys and anything from
            your chats you would rather keep private — issues are public. How
            Actovia handles your data is in the{' '}
            <Link
              href="/privacy"
              className="text-ink underline underline-offset-4"
            >
              privacy policy
            </Link>
            .
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}
