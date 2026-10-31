'use client'

import { ArrowRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useId, useState } from 'react'

import { Terminal, Token } from '@/app/_components/terminal'
import type { Downloads } from '@/app/_lib/release'
import { APP_STORE_URL, RELEASES_URL } from '@/app/_lib/release'
import { cn } from '@/lib/utils'

type Platform = 'mac' | 'windows' | 'linux' | 'cli' | 'iphone'

/**
 * The close: what to do, in order. The first step is open, with a tab per
 * platform; the next two say what comes after the download.
 */
export function Download({ downloads }: { downloads: Downloads }) {
  const [platform, setPlatform] = useState<Platform>('mac')
  const id = useId()
  const version = downloads.version?.replace(/^v/u, '')

  const TABS: { id: Platform; label: string }[] = [
    { id: 'mac', label: 'macOS' },
    { id: 'windows', label: 'Windows' },
    { id: 'linux', label: 'Linux' },
    { id: 'cli', label: 'CLI' },
    { id: 'iphone', label: 'iPhone' }
  ]

  return (
    <section id="download" className="border-hairline border-t py-28 sm:py-36">
      <div className="mx-auto grid max-w-[1328px] grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 className="type-headline">Get Actovia.</h2>
          <p className="type-lede text-graphite mt-6 max-w-[34ch]">
            Free and open source, with no account to make.
            {version ? ` Version ${version}.` : ''} Download it, add a model,
            and ask it something.
          </p>
          <a
            href={RELEASES_URL}
            className="text-ink mt-8 inline-block underline decoration-[color:var(--color-hairline)] underline-offset-[0.3em] hover:decoration-current"
          >
            Release notes and every past version
          </a>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink mt-4 inline-block underline decoration-[color:var(--color-hairline)] underline-offset-[0.3em] hover:decoration-current"
          >
            Get Actovia for iPhone on the App Store
          </a>
        </div>

        <ol className="lg:col-span-7">
          <li className="border-hairline border-b pb-10">
            <StepHead n={1} title="Install Actovia" open />
            <div className="mt-6 pl-12">
              <div
                role="tablist"
                aria-label="Platform"
                className="flex flex-wrap items-center gap-1"
              >
                <span className="text-graphite mr-2 text-sm">Install for</span>
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    type="button"
                    id={`${id}-${t.id}`}
                    aria-selected={platform === t.id}
                    aria-controls={`${id}-panel`}
                    onClick={() => setPlatform(t.id)}
                    className={cn(
                      'rounded-[4px] px-3 py-1.5 text-[0.9375rem] transition-colors duration-150',
                      platform === t.id
                        ? 'bg-sunk text-ink'
                        : 'text-graphite hover:text-ink'
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div
                key={platform}
                id={`${id}-panel`}
                role="tabpanel"
                aria-labelledby={`${id}-${platform}`}
                className="panel-swap mt-6"
              >
                {platform === 'mac' && (
                  <>
                    <p className="text-graphite font-light">
                      For Macs with Apple silicon.
                    </p>
                    <Buttons
                      primary={{
                        label: 'Download .dmg',
                        href: downloads.mac.dmg
                      }}
                      secondary={{ label: '.zip', href: downloads.mac.zip }}
                    />
                  </>
                )}
                {platform === 'windows' && (
                  <>
                    <p className="text-graphite font-light">
                      For 64-bit Windows. It updates itself.
                    </p>
                    <Buttons
                      primary={{
                        label: 'Download installer',
                        href: downloads.windows.exe
                      }}
                    />
                  </>
                )}
                {platform === 'linux' && (
                  <>
                    <p className="text-graphite font-light">For x86-64.</p>
                    <Buttons
                      primary={{
                        label: 'Download .deb',
                        href: downloads.linux.deb
                      }}
                      secondary={{ label: '.rpm', href: downloads.linux.rpm }}
                    />
                  </>
                )}
                {platform === 'iphone' && (
                  <>
                    <p className="text-graphite max-w-[56ch] font-light">
                      Actovia for iPhone is now on the App Store. It pairs with
                      the Mac app, which works on its own.
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <a
                        href={APP_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-hairline text-graphite hover:text-ink inline-flex items-center gap-3 rounded-[3px] border px-5 py-3 font-medium transition-colors"
                      >
                        Download on the App Store
                      </a>
                      <Link
                        href="/docs/iphone"
                        className="text-graphite hover:text-ink text-sm underline"
                      >
                        What the iPhone app does
                      </Link>
                    </div>
                  </>
                )}
                {platform === 'cli' && (
                  <>
                    <p className="text-graphite max-w-[56ch] font-light">
                      Look after the desktop app from a terminal — status, logs,
                      backups, pairing — and install skills. Runs on Bun 1.3 or
                      later.
                    </p>
                    <Terminal className="mt-6">
                      <span className="text-term-dim">$ </span>npm install -g{' '}
                      <Token>@actovia-ai/cli</Token>
                    </Terminal>
                    <Link
                      href="/docs/cli"
                      className="text-ink mt-5 inline-block text-sm underline"
                    >
                      The CLI’s commands
                    </Link>
                  </>
                )}
              </div>
            </div>
          </li>

          <li className="border-hairline border-b">
            <Disclosure n={2} title="Add a model">
              Open Settings, choose a provider and paste your API key; the list
              of models loads from the provider itself. Or run a model locally
              with Ollama and use no key at all.
            </Disclosure>
          </li>
          <li className="border-hairline border-b">
            <Disclosure n={3} title="Pair your iPhone">
              In Settings → Integrations → Devices, start pairing and scan the
              QR code with Actovia for iPhone. It works on your own network, and
              the phone verifies the computer before it sends anything. Away
              from home, put both on one{' '}
              <a
                href="https://tailscale.com"
                className="text-ink underline decoration-hairline underline-offset-4 hover:decoration-ink"
              >
                Tailscale
              </a>{' '}
              network with MagicDNS on, and keep the computer from sleeping —{' '}
              <Link
                href="/docs/remote-access#from-anywhere"
                className="text-ink underline decoration-hairline underline-offset-4 hover:decoration-ink"
              >
                how to set it up
              </Link>
              .
            </Disclosure>
          </li>
        </ol>
      </div>
    </section>
  )
}

function StepHead({
  n,
  title,
  open
}: {
  n: number
  title: string
  open?: boolean
}) {
  return (
    <span className="flex items-center gap-4">
      <span
        className={cn(
          'grid size-8 shrink-0 place-items-center rounded-full text-sm',
          open ? 'bg-ink text-paper' : 'border-graphite/50 text-graphite border'
        )}
      >
        {n}
      </span>
      <span className={cn('type-tile', !open && 'text-graphite')}>{title}</span>
    </span>
  )
}

function Disclosure({
  n,
  title,
  children
}: {
  n: number
  title: string
  children: React.ReactNode
}) {
  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-7 [&::-webkit-details-marker]:hidden">
        <StepHead n={n} title={title} />
        <ChevronDown
          aria-hidden
          className="text-graphite size-5 shrink-0 transition-transform duration-200 ease-out group-open:rotate-180"
        />
      </summary>
      <p className="text-graphite max-w-[56ch] pb-8 pl-12 font-light">
        {children}
      </p>
    </details>
  )
}

function Buttons({
  primary,
  secondary
}: {
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
}) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
      <a
        href={primary.href}
        className="group bg-ink text-paper inline-flex items-center gap-3 rounded-[3px] px-5 py-3 font-medium transition-[opacity,scale] duration-150 hover:opacity-90 active:scale-[0.97]"
      >
        {primary.label}
        <ArrowRight
          aria-hidden
          className="text-sun size-[1.1em] transition-transform duration-200 ease-out group-hover:translate-x-1"
        />
      </a>
      {secondary && (
        <a
          href={secondary.href}
          className="text-graphite hover:text-ink text-sm underline"
        >
          Or the {secondary.label}
        </a>
      )}
    </div>
  )
}
