import { OdyIcon } from '@/app/_components/ody-icon'
import { Shot } from '@/app/_components/shot'
import { REPO_URL } from '@/app/_lib/release'
import { SHOTS } from '@/app/_lib/shots'

/**
 * The page's one orchestrated moment: the icon, the name and the promise,
 * then the app window below them growing to full size as it scrolls into
 * view — the way Apple lifts a product out of its introduction. Both motions
 * are CSS (`hero-arrive`, `hero-rise` in globals.css).
 */
export function Hero({
  macHref,
  version
}: {
  macHref: string
  version: string | null
}) {
  return (
    <section id="top" className="overflow-hidden pt-20 pb-24 sm:pt-28">
      <div className="mx-auto flex max-w-[980px] flex-col items-center px-6 text-center">
        <div className="hero-arrive">
          <OdyIcon
            size={128}
            priority
            alt="The Exodus app icon: Ody, a marshmallow with a bindle on its shoulder"
            className="drop-shadow-[0_18px_30px_rgb(245_163_0/0.28)]"
          />
        </div>

        <div className="hero-arrive mt-8 flex flex-col items-center [animation-delay:80ms]">
          <h1 className="font-word type-hero">Exodus</h1>
          <p className="type-headline mt-3">
            Your assistant.
            <br />
            On your own machine.
          </p>
          <p className="type-lede text-graphite mt-6 max-w-[38ch]">
            Chat for the quick things. Philharmonic, a team of agents, for the
            big ones. Everything runs and stays on your computer, and your
            iPhone can steer it from anywhere in the house.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <a
              href={macHref}
              className="bg-sun text-coal hover:bg-sun-deep rounded-full px-7 py-3 text-[1.0625rem] font-medium transition-[background-color,scale] duration-150 active:scale-[0.97]"
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
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-[1180px] px-4 sm:px-6">
        <div className="hero-rise">
          <Shot spec={SHOTS.hero} priority />
        </div>
      </div>
    </section>
  )
}
