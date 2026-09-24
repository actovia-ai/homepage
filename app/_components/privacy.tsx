const POINTS = [
  {
    title: 'Kept on your computer.',
    body: 'Chats, memories and settings live in a database that runs inside the app, in a folder in your home directory. There is no account and no cloud copy.'
  },
  {
    title: 'Straight to your provider.',
    body: 'Your API keys are stored on your machine, and each request goes directly to the model provider you chose.'
  },
  {
    title: 'Locked when you step away.',
    body: 'Lock Exodus with a PIN or Touch ID. While it is locked, it answers nothing — not the window, not another app on your Mac.'
  },
  {
    title: 'Nothing open on your network.',
    body: 'Exodus listens only to your own computer until you pair a phone with a QR code, over an encrypted connection the phone verifies.'
  }
]

export function Privacy() {
  return (
    <section id="privacy" className="bg-mist py-28 sm:py-36">
      <div className="mx-auto max-w-[980px] px-6">
        <h2 className="type-headline mx-auto max-w-[14ch] text-center">
          Your data stays home.
        </h2>
        <dl className="mt-16 grid gap-x-16 gap-y-12 sm:mt-20 sm:grid-cols-2">
          {POINTS.map((p) => (
            <div key={p.title} className="border-hairline border-t pt-6">
              <dt className="type-tile">{p.title}</dt>
              <dd className="text-graphite mt-3 max-w-[42ch]">{p.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
