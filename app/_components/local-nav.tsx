import Image from 'next/image'

const LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#privacy', label: 'Privacy' },
  { href: '#specs', label: 'Tech specs' }
]

/**
 * The product bar Apple pins under its global nav: the product's name on the
 * left, its sections and the one action on the right, on a translucent
 * material the page scrolls under.
 */
export function LocalNav({ downloadHref }: { downloadHref: string }) {
  return (
    <header className="bg-paper/72 sticky top-0 z-50 border-b border-black/8 backdrop-blur-xl backdrop-saturate-180">
      <nav
        aria-label="Exodus"
        className="mx-auto flex h-13 max-w-[1024px] items-center justify-between px-4 sm:px-6"
      >
        <a href="#top" className="flex items-center gap-2">
          <Image
            src="/brand/ody-icon.png"
            alt=""
            width={26}
            height={26}
            priority
          />
          <span className="font-word text-[1.3125rem] leading-none tracking-[-0.01em]">
            Exodus
          </span>
        </a>
        <div className="flex items-center gap-6 text-[0.8125rem] tracking-[-0.01em]">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-ink/80 hover:text-ink hidden transition-colors duration-150 sm:inline"
            >
              {l.label}
            </a>
          ))}
          <a
            href={downloadHref}
            className="bg-sun text-ink hover:bg-sun-deep rounded-full px-3.5 py-1 font-medium transition-colors duration-150 active:scale-[0.97]"
          >
            Download
          </a>
        </div>
      </nav>
    </header>
  )
}
