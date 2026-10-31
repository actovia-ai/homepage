import Link from 'next/link'

import { PhoneShot } from '@/app/_components/shot'
import { SHOTS } from '@/app/_lib/shots'

export function Health() {
  return (
    <section id="health" className="border-hairline border-t py-28 sm:py-36">
      <div className="mx-auto max-w-[1328px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <h2 className="type-headline max-w-[15ch]">
            Your day, with a little more understanding.
          </h2>
          <div>
            <p className="type-lede text-graphite max-w-[48ch]">
              Health brings your Apple Health day to Actovia. Sleep, movement
              and recovery, with a daily note from Ody to help make sense of it.
              Ask about your day, and get an answer grounded in your numbers.
            </p>
            <Link
              href="/docs/iphone/health"
              className="text-ink mt-5 inline-block underline underline-offset-4"
            >
              Explore Health
            </Link>
          </div>
        </div>
        <div className="mt-16 grid items-start gap-12 sm:mt-20 md:grid-cols-3 md:gap-10">
          {[
            {
              title: 'A day with Ody.',
              body: 'A sky that follows your day. A note that connects last night’s sleep with today’s movement and recovery.',
              shot: SHOTS.healthHome
            },
            {
              title: 'See the bigger picture.',
              body: 'Move through weeks, months and years. Find the patterns behind a good week, or a tired morning.',
              shot: SHOTS.healthCalendar
            },
            {
              title: 'Numbers into perspective.',
              body: 'Reports bring your trends together, with comparisons, insights and something small to try next.',
              shot: SHOTS.healthReport
            }
          ].map((item, index) => (
            <div
              key={item.title}
              className={
                index === 1 ? 'md:pt-16' : index === 2 ? 'md:pt-32' : ''
              }
            >
              <PhoneShot
                spec={item.shot}
                className="mx-auto w-full max-w-[300px]"
              />
              <div className="mx-auto mt-8 max-w-[300px]">
                <h3 className="type-tile">{item.title}</h3>
                <p className="text-graphite mt-3 font-light">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-graphite mt-16 max-w-[76ch] text-sm">
          Your health data stays on your iPhone. Daily notes are optional: only
          a short summary goes to your chosen AI provider, never the raw data.
        </p>
      </div>
    </section>
  )
}
