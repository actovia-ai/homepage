import { OdyIcon } from '@/app/_components/ody-icon'
import { RELEASES_URL, REPO_URL } from '@/app/_lib/release'

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How it works', href: '#run' },
      { label: 'Actovia for iPhone', href: '#iphone' },
      { label: 'Privacy', href: '#privacy' },
      { label: 'Tech specs', href: '#specs' },
      { label: 'Download', href: '#download' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: '/docs' },
      { label: 'Source code', href: REPO_URL },
      { label: 'Releases', href: RELEASES_URL },
      { label: 'Report an issue', href: `${REPO_URL}/issues` },
      { label: 'MIT License', href: `${REPO_URL}/blob/master/LICENSE` }
    ]
  },
  {
    title: 'Community',
    links: [
      { label: 'GitHub', href: 'https://github.com/actovia-ai' },
      { label: 'X', href: 'https://x.com/YanceyOfficial' }
    ]
  }
]

/**
 * A quiet sheet: the brand and three columns of links, then the name across
 * the full width in the thin display face, ghosted and dissolving into the
 * ground, with the fine print over its feet.
 */
export function Footer() {
  return (
    <footer className="bg-sunk text-graphite border-hairline overflow-hidden border-t">
      <div className="mx-auto grid max-w-[1328px] gap-12 px-5 pt-20 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-4">
          <a href="#top" className="text-ink flex items-center gap-2.5">
            <OdyIcon size={32} />
            <span className="font-word text-[1.4rem] leading-none">
              Actovia
            </span>
          </a>
          <p className="max-w-[28ch] text-sm leading-relaxed">
            Every model, on your own machine. Free and open source.
          </p>
        </div>
        {COLUMNS.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2 className="text-ink text-sm font-medium">{c.title}</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="hover:text-ink transition-colors duration-150"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="relative mt-16 sm:mt-24">
        <p
          aria-hidden
          className="font-display text-ink/[0.09] -mb-[0.2em] [mask-image:linear-gradient(to_bottom,#000_40%,transparent_95%)] text-center text-[27vw] leading-[0.8] font-extralight tracking-[-0.01em] select-none"
        >
          Actovia
        </p>
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto flex max-w-[1328px] flex-col gap-2 px-5 pb-8 text-xs sm:flex-row sm:justify-between sm:px-8">
            <p>Copyright © {new Date().getFullYear()} Actovia. MIT License.</p>
            <p>Made with care, and a marshmallow.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
