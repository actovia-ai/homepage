import Image from 'next/image'

import type { Downloads } from '@/app/_lib/release'
import { RELEASES_URL } from '@/app/_lib/release'

export function Download({ downloads }: { downloads: Downloads }) {
  const platforms = [
    {
      name: 'macOS',
      needs: 'Apple silicon',
      primary: { label: 'Download .dmg', href: downloads.mac.dmg },
      secondary: [{ label: '.zip', href: downloads.mac.zip }]
    },
    {
      name: 'Windows',
      needs: '64-bit',
      primary: { label: 'Download installer', href: downloads.windows.exe },
      secondary: []
    },
    {
      name: 'Linux',
      needs: 'x86-64',
      primary: { label: 'Download .deb', href: downloads.linux.deb },
      secondary: [{ label: '.rpm', href: downloads.linux.rpm }]
    }
  ]

  return (
    <section id="download" className="bg-paper pt-12 pb-28 sm:pb-36">
      <div className="mx-auto flex max-w-[980px] flex-col items-center px-6 text-center">
        <Image
          src="/brand/ody-icon.png"
          alt=""
          width={112}
          height={112}
          className="drop-shadow-[0_14px_24px_rgb(245_163_0/0.25)]"
        />
        <h2 className="type-headline mt-8">Get Exodus.</h2>
        <p className="type-lede text-graphite mt-4">
          Free and open source.
          {downloads.version
            ? ` Version ${downloads.version.replace(/^v/u, '')}.`
            : ''}
        </p>

        <ul className="mt-14 grid w-full gap-4 sm:grid-cols-3">
          {platforms.map((p) => (
            <li
              key={p.name}
              className="bg-mist flex flex-col items-center rounded-[28px] px-6 py-10"
            >
              <h3 className="type-tile">{p.name}</h3>
              <p className="text-graphite mt-1 text-sm">{p.needs}</p>
              <a
                href={p.primary.href}
                className="bg-sun text-ink hover:bg-sun-deep mt-8 rounded-full px-6 py-2.5 font-medium transition-[background-color,scale] duration-150 active:scale-[0.97]"
              >
                {p.primary.label}
              </a>
              {p.secondary.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="text-graphite hover:text-ink mt-4 text-sm underline-offset-4 hover:underline"
                >
                  Or download the {s.label}
                </a>
              ))}
            </li>
          ))}
        </ul>

        <a
          href={RELEASES_URL}
          className="text-ink mt-10 text-[1.0625rem] font-medium underline-offset-4 hover:underline"
        >
          Release notes and every past version
        </a>
      </div>
    </section>
  )
}
