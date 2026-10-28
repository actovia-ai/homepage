import type { Metadata } from 'next'
import Link from 'next/link'

import { Footer } from '@/app/_components/footer'
import { LocalNav } from '@/app/_components/local-nav'
import { openGraph } from '@/app/_lib/og'
import { REPO_URL } from '@/app/_lib/release'

const DESCRIPTION =
  'The terms for using Actovia, Actovia for iPhone and this website: free and open source, your own keys under each provider’s terms, and an assistant whose work you check.'

export const metadata: Metadata = {
  title: 'Terms of use — Actovia',
  description: DESCRIPTION,
  alternates: { canonical: '/terms' },
  openGraph: openGraph('Terms of use — Actovia', DESCRIPTION, '/terms')
}

const EFFECTIVE = '28 October 2026'

/**
 * The terms of use, beside the privacy policy in the footer and the App Store
 * listing. Like the policy, it is written from how the apps work: a claim here
 * that stops being true is a bug in one or the other.
 */
export default function TermsPage() {
  return (
    <>
      <LocalNav downloadHref="/#download" />
      <main className="mx-auto max-w-[1328px] px-5 py-20 sm:px-8 sm:py-28">
        <header className="max-w-[60ch]">
          <p className="tag">Terms of use</p>
          <h1 className="type-headline mt-6">Yours to run.</h1>
          <p className="type-lede text-graphite mt-6">
            Actovia is free, open-source software that runs on your own
            computer, and Actovia for iPhone is a remote for it. These terms
            cover using the apps and this website. They are short because there
            is no account, no subscription and no service of ours in the middle.
            Effective {EFFECTIVE}.
          </p>
        </header>

        <div className="mt-16 grid gap-16 lg:grid-cols-12">
          <nav
            aria-label="Sections"
            className="text-graphite text-sm lg:sticky lg:top-24 lg:col-span-3 lg:self-start"
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
              <section
                key={s.id}
                id={s.id}
                className="border-hairline border-t py-10 first:border-t-0 first:pt-0"
              >
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
    id: 'license',
    title: 'The software and its license',
    body: (
      <>
        <p>
          Actovia&rsquo;s source code is published under the{' '}
          <a
            href={`${REPO_URL}/blob/master/LICENSE`}
            className="text-ink underline"
          >
            MIT license
          </a>
          . You may use, copy, change and share it as that license allows, and
          the license governs the code wherever these terms say less.
        </p>
        <p>
          The apps are free. Nothing is sold, there is no account to create, and
          using them does not make you a customer of ours.
        </p>
      </>
    )
  },
  {
    id: 'providers',
    title: 'Your keys, their terms',
    body: (
      <>
        <p>
          Actovia works with the services you connect it to, using your own
          keys: <Dest>a model provider</Dest> (OpenAI, Anthropic, Google, xAI,
          Azure OpenAI, or a local model through Ollama),{' '}
          <Dest>Brave Search</Dest>, <Dest>Google Maps</Dest>, MCP servers,
          coding agents such as Claude Code or Codex, and storage you own.
        </p>
        <p>
          Your use of each of those is between you and that service: its own
          terms, its acceptable-use rules, its prices and its limits apply, and
          whatever it charges is charged to your account with it. Keep your keys
          to yourself; Actovia stores them encrypted on your computer and sends
          each only to its own service.
        </p>
      </>
    )
  },
  {
    id: 'your-computer',
    title: 'What the assistant does on your computer',
    body: (
      <>
        <p>
          Actovia can read and write files, run commands in a terminal, fetch
          web pages, call the tools of MCP servers, start coding agents in the
          folders you give them and, if you switch it on, operate an app on your
          Mac. You decide which of these are on, and it asks before touching
          secrets outside its own folder; but it acts on your behalf, with your
          permissions.
        </p>
        <p>
          Keep backups of what matters, read what it proposes before you approve
          it, and give it only the folders, apps and servers you are willing to
          let it work in. You are responsible for what you ask it to do and for
          what you allow it to do.
        </p>
      </>
    )
  },
  {
    id: 'answers',
    title: 'Answers can be wrong',
    body: (
      <>
        <p>
          Language models make mistakes, and so do search results, web pages and
          the tools they read. Check anything that matters before you rely on
          it. Nothing Actovia writes is professional advice — legal, financial,
          medical or otherwise.
        </p>
        <p>
          The Health pages of Actovia for iPhone show what Apple Health gave
          them and can ask a model about it. They are not a medical device and
          do not diagnose, treat or monitor any condition.
        </p>
      </>
    )
  },
  {
    id: 'use',
    title: 'Using it fairly',
    body: (
      <p>
        Don&rsquo;t use Actovia to break the law, to harm other people, or to
        get around the rules of the services it connects to. The Skills Market
        relay and the website are offered for ordinary use; automated scraping
        or abuse of them may be blocked.
      </p>
    )
  },
  {
    id: 'iphone',
    title: 'Actovia for iPhone',
    body: (
      <p>
        Actovia for iPhone is distributed through the App Store, and
        Apple&rsquo;s{' '}
        <a
          href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
          className="text-ink underline"
        >
          Standard End User License Agreement
        </a>{' '}
        applies to it alongside these terms. Apple is not responsible for the
        app or for support of it; support is ours, at{' '}
        <Link href="/support" className="text-ink underline">
          /support
        </Link>
        .
      </p>
    )
  },
  {
    id: 'warranty',
    title: 'No warranty',
    body: (
      <p>
        The apps are provided &ldquo;as is&rdquo;, without warranty of any kind,
        as the MIT license says. To the extent the law allows, the authors are
        not liable for any claim, damage or loss arising from the apps or from
        their use — including lost data, actions the assistant took that you
        approved or enabled, and charges from the services you connected.
      </p>
    )
  },
  {
    id: 'changes',
    title: 'Changes and contact',
    body: (
      <>
        <p>
          If these terms change, the new version is published here with a new
          effective date. The{' '}
          <Link href="/privacy" className="text-ink underline">
            privacy policy
          </Link>{' '}
          says what the apps keep and send.
        </p>
        <p>
          Questions go to{' '}
          <a href={`${REPO_URL}/issues`} className="text-ink underline">
            the project&rsquo;s issue tracker
          </a>{' '}
          or to{' '}
          <a
            href="mailto:developer@yanceyleo.com"
            className="text-ink underline"
          >
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
