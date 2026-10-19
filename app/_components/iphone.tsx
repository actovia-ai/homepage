import { PhoneShot } from '@/app/_components/shot'
import { SHOTS } from '@/app/_lib/shots'

const SCREENS = [
  {
    shot: SHOTS.iphoneChat,
    title: 'Chat',
    body: 'Your conversations, streamed from your computer with every tool card and source.'
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
 * hub, the phone asks and watches. Three screens, side by side, the way
 * Apple lines up an iPhone app.
 */
export function IPhone() {
  return (
    <section id="iphone" className="bg-paper overflow-hidden py-28 sm:py-36">
      <div className="mx-auto max-w-[980px] px-6 text-center">
        <h2 className="type-headline">Your computer, in your pocket.</h2>
        <p className="type-lede text-graphite mx-auto mt-6 max-w-[42ch]">
          Pair Actovia for iPhone with a QR code, and the Actovia on your computer
          becomes the hub. Ask from anywhere in the house; the work runs on your
          desk, with its tools, its files and its models.
        </p>
      </div>

      <ul className="mx-auto mt-16 grid max-w-[1080px] gap-14 px-10 sm:mt-20 sm:grid-cols-3 sm:gap-8 sm:px-6">
        {SCREENS.map((s) => (
          <li key={s.title} className="flex flex-col items-center text-center">
            <PhoneShot spec={s.shot} className="w-full max-w-[300px]" />
            <h3 className="type-tile mt-10">{s.title}</h3>
            <p className="text-graphite mt-2 max-w-[30ch]">{s.body}</p>
          </li>
        ))}
      </ul>

      <p className="text-graphite mx-auto mt-16 max-w-[60ch] px-6 text-center text-sm">
        Face ID on your phone unlocks Actovia on your computer. Pairing works on
        your own network, over an encrypted connection your phone verifies.
        Philharmonic on iPhone is on the way.
      </p>
    </section>
  )
}
