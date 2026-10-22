import Link from 'next/link'

const POINTS = [
  {
    title: 'Kept on your computer.',
    body: 'Chats, memories and settings live in a database that runs inside the app, in a folder in your home directory. There is no account and no cloud copy.'
  },
  {
    title: 'Straight to your provider.',
    body: 'Your API keys are stored on your machine, encrypted, and each request goes directly to the model provider you chose.'
  },
  {
    title: 'Locked when you step away.',
    body: 'Lock Actovia with a PIN or Touch ID. While it is locked, it answers nothing — not the window, not another app on your Mac.'
  },
  {
    title: 'Nothing open on your network.',
    body: 'Actovia listens only to your own computer until you pair a phone with a QR code, over an encrypted connection the phone verifies.'
  }
]

export function Privacy() {
  return (
    <section
      id="privacy"
      className="bg-sunk/60 border-hairline border-t py-28 sm:py-36"
    >
      <div className="mx-auto grid max-w-[1328px] grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 className="type-headline max-w-[10ch]">Your data stays home.</h2>
          <p className="type-lede text-graphite mt-6 max-w-[36ch]">
            The app is the server. What you tell it stays on the machine you
            installed it on.
          </p>
          <Link
            href="/privacy"
            className="text-ink mt-8 inline-block underline decoration-hairline underline-offset-4 hover:decoration-ink"
          >
            The privacy policy, in full
          </Link>
        </div>
        <dl className="bg-hairline border-hairline grid grid-cols-1 gap-px border sm:grid-cols-2 lg:col-span-8">
          {POINTS.map((p) => (
            <div key={p.title} className="bg-panel p-8 sm:p-10">
              <dt className="type-tile max-w-[16ch]">{p.title}</dt>
              <dd className="text-graphite mt-4 max-w-[42ch] font-light">
                {p.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
