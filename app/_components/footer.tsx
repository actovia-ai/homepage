import Image from 'next/image'

import { RELEASES_URL, REPO_URL } from '@/app/_lib/release'

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Exodus for iPhone', href: '#iphone' },
      { label: 'Privacy', href: '#privacy' },
      { label: 'Tech specs', href: '#specs' },
      { label: 'Download', href: '#download' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Source code', href: REPO_URL },
      { label: 'Releases', href: RELEASES_URL },
      { label: 'Report an issue', href: `${REPO_URL}/issues` },
      { label: 'MIT License', href: `${REPO_URL}/blob/master/LICENSE` }
    ]
  },
  {
    title: 'Community',
    links: [
      { label: 'GitHub', href: 'https://github.com/exodus-ai-org' },
      { label: 'X', href: 'https://x.com/YanceyOfficial' }
    ]
  }
]

/**
 * A night footer: the brand and three columns of links, then the name across
 * the full width as a ghost — an extra-light face filled with a white that
 * fades out downwards, under a mask that dissolves its feet into the black.
 * The last line of fine print sits over it.
 */
export function Footer() {
  return (
    <footer
      data-nav-tone="dark"
      className="bg-night text-night-graphite overflow-hidden"
    >
      <div className="mx-auto grid max-w-[1180px] gap-12 px-6 pt-24 sm:grid-cols-2 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-4">
          <a href="#top" className="flex items-center gap-2.5">
            <Image src="/brand/ody-icon.png" alt="" width={36} height={36} />
            <span className="font-word text-night-ink text-[1.5rem] leading-none">
              Exodus
            </span>
          </a>
          <p className="max-w-[28ch] text-sm leading-relaxed">
            Every model, on your own machine. Free and open source.
          </p>
        </div>
        {COLUMNS.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2 className="text-night-ink text-sm font-medium">{c.title}</h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="hover:text-night-ink transition-colors duration-150"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="relative mt-20 sm:mt-28">
        <svg
          viewBox="0 0 1000 268"
          aria-hidden
          className="block w-full [mask-image:linear-gradient(to_bottom,#000_35%,transparent_92%)] select-none"
        >
          <defs>
            <linearGradient id="footer-ghost" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.34" />
              <stop offset="1" stopColor="#fff" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          <text
            x="500"
            y="262"
            textAnchor="middle"
            textLength="990"
            lengthAdjust="spacing"
            fill="url(#footer-ghost)"
            className="font-ghost"
            style={{ fontSize: 330, fontWeight: 200, letterSpacing: '-0.04em' }}
          >
            Exodus
          </text>
        </svg>

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto flex max-w-295 flex-col gap-2 px-6 pb-8 text-xs sm:flex-row sm:justify-between">
            <p>Copyright © {new Date().getFullYear()} Exodus. MIT License.</p>
            <p>Made with care, and a marshmallow.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
