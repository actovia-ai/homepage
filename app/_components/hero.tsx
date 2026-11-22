import { ArrowRight } from 'lucide-react'

import { HeroDownload } from '@/app/_components/hero-download'
import { ProviderMarks } from '@/app/_components/models'
import { AppWindow } from '@/app/_components/run-card'
import { RELEASES_URL, type Downloads } from '@/app/_lib/release'

/**
 * The first viewport: a pill with the release, a headline whose two places
 * are set on solid blocks (the computer it runs on, the phone that reaches
 * it), the description beside the two actions, and the app window under it.
 */
export function Hero({ downloads }: { downloads: Downloads }) {
  const v = downloads.version?.replace(/^v/u, '') ?? null

  return (
    <section id="top" className="overflow-hidden">
      <div className="mx-auto max-w-[1180px] px-5 pt-12 pb-24 sm:px-8 sm:pt-20 lg:pt-24">
        <a
          href={RELEASES_URL}
          className="group border-hairline bg-panel text-graphite hover:text-ink inline-flex items-center gap-2.5 rounded-full border py-1 pr-3.5 pl-1 text-sm transition-colors duration-150"
        >
          <span className="bg-ink text-paper rounded-full px-2.5 py-0.5 text-xs font-medium">
            Open source
          </span>
          {v ? `Version ${v} is out` : 'Latest release'}
          <ArrowRight
            aria-hidden
            className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
          />
        </a>

        <h1 className="type-hero mt-7 max-w-[18ch]">
          The AI assistant that runs on{' '}
          <span className="hero-mark bg-ink text-paper">your computer</span> and
          answers <span className="hero-mark bg-sun text-coal">your phone</span>
          .
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-x-16 lg:gap-y-8">
          <div>
            <p className="type-lede text-graphite max-w-[52ch]">
              Actovia chats, searches the web, writes code in a folder of its
              own and keeps going until the job is done. Your chats stay on your
              computer, it talks to the models you choose with your own keys,
              and the iPhone app you pair with it works with the same chats.
            </p>
          </div>

          <HeroDownload downloads={downloads} />

          <ProviderMarks className="lg:-mt-2" />
        </div>

        <div className="mt-16 sm:mt-20">
          <AppWindow />
        </div>
      </div>
    </section>
  )
}
