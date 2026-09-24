import Image from 'next/image'

import { RELEASES_URL, REPO_URL } from '@/app/_lib/release'

const LINKS = [
  { label: 'GitHub', href: REPO_URL },
  { label: 'Releases', href: RELEASES_URL },
  { label: 'Report an issue', href: `${REPO_URL}/issues` },
  { label: 'X', href: 'https://x.com/YanceyOfficial' },
  { label: 'MIT License', href: `${REPO_URL}/blob/master/LICENSE` }
]

/**
 * Fine print on top, then the name, edge to edge — and Ody, bindle on its
 * shoulder, standing on the last letters on its way out.
 */
export function Footer() {
  return (
    <footer className="bg-mist overflow-hidden pt-14">
      <div className="text-graphite mx-auto flex max-w-[980px] flex-col gap-4 px-6 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>Copyright © 2025–2026 Exodus. Made with care, and a marshmallow.</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="hover:text-ink transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mx-auto mt-24 max-w-[1440px] px-3 sm:mt-32">
        <div
          aria-hidden
          className="absolute right-[14.5%] bottom-[55.5%] w-[16%] min-w-20"
        >
          <div className="relative aspect-square">
            <Image
              src="/brand/bindle.png"
              alt=""
              fill
              sizes="17vw"
              className="object-contain"
            />
            <Image
              src="/brand/ody.png"
              alt=""
              fill
              sizes="17vw"
              className="object-contain"
            />
          </div>
        </div>
        <svg
          viewBox="0 0 1000 242"
          role="img"
          aria-label="Exodus"
          className="text-ink block w-full"
        >
          <text
            x="0"
            y="236"
            textLength="1000"
            lengthAdjust="spacing"
            className="font-word"
            fill="currentColor"
            style={{ fontSize: 322 }}
          >
            Exodus
          </text>
        </svg>
      </div>
    </footer>
  )
}
