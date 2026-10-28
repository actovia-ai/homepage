import { PhoneShot } from '@/app/_components/shot'
import { SHOTS } from '@/app/_lib/shots'

const SCREENS = [
  {
    shot: SHOTS.iphoneChat,
    title: 'Chat',
    body: 'Your conversations, streamed from your computer with every tool card and source — a three-day plan on a map, here.'
  },
  {
    shot: SHOTS.iphoneControl,
    title: 'Control',
    body: 'Start a run from the couch and watch it work on your desk: files, terminal, even your Mac’s apps.'
  },
  {
    shot: SHOTS.iphoneSettings,
    title: 'Settings',
    body: 'Switch models, add keys and turn tools on or off without walking back to your computer.'
  }
]

/**
 * Actovia for iPhone is a remote, not a second app: the computer stays the
 * hub, the phone asks and watches.
 */
export function IPhone() {
  return (
    <section
      id="iphone"
      className="border-hairline overflow-hidden border-t py-28 sm:py-36"
    >
      <div className="mx-auto max-w-[1328px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <h2 className="type-headline max-w-[13ch]">
            Your computer, in your pocket.
          </h2>
          <p className="type-lede text-graphite max-w-[48ch] lg:justify-self-end">
            Pair Actovia for iPhone with a QR code, and the Actovia on your
            computer becomes the hub. Ask from anywhere in the house; the work
            runs on your desk, with its tools, its files and its models.
          </p>
        </div>

        <ul className="border-hairline mt-16 grid border-t sm:mt-20 sm:grid-cols-3">
          {SCREENS.map((s, i) => (
            <li
              key={s.title}
              className={
                i > 0
                  ? 'border-hairline flex flex-col border-t pt-12 pb-4 sm:border-t-0 sm:border-l sm:px-10 sm:pt-12'
                  : 'flex flex-col pt-12 pb-12 sm:pr-10 sm:pb-4'
              }
            >
              <h3 className="type-tile">{s.title}</h3>
              <p className="text-graphite mt-2 mb-6 max-w-[32ch] font-light">
                {s.body}
              </p>
              {/* The phones sit on one line whatever the copy's height. */}
              <PhoneShot
                spec={s.shot}
                className="mx-auto mt-auto w-full max-w-[280px]"
              />
            </li>
          ))}
        </ul>

        <p className="text-graphite mt-16 max-w-[64ch] text-sm">
          Face ID on your phone unlocks Actovia on your computer. Pairing works
          on your own network, over an encrypted connection your phone verifies.
          Philharmonic comes along too: follow a group&apos;s run, answer the PM
          and approve a step from wherever you are.
        </p>
      </div>
    </section>
  )
}
