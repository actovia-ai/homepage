import { existsSync } from 'node:fs'
import { join } from 'node:path'

import { Download } from '@/app/_components/download'
import { FeaturePanel } from '@/app/_components/feature-panel'
import { Footer } from '@/app/_components/footer'
import { Hero } from '@/app/_components/hero'
import { Highlights } from '@/app/_components/highlights'
import { LocalNav } from '@/app/_components/local-nav'
import { Models } from '@/app/_components/models'
import { Privacy } from '@/app/_components/privacy'
import { RunStory } from '@/app/_components/run-story'
import { ShotsProvider } from '@/app/_components/shot'
import { Specs } from '@/app/_components/specs'
import { getLatestRelease, resolveDownloads } from '@/app/_lib/release'
import { SHOTS } from '@/app/_lib/shots'

export default async function Page() {
  const downloads = resolveDownloads(await getLatestRelease())
  // Screenshots that have been dropped into public/ replace their placeholders.
  const ready = Object.values(SHOTS)
    .map((s) => s.file)
    .filter((f) => existsSync(join(process.cwd(), 'public', f)))

  return (
    <ShotsProvider ready={ready}>
      <LocalNav downloadHref="#download" />
      <main>
        <Hero macHref={downloads.mac.dmg} version={downloads.version} />
        <Models />
        <Highlights />
        <RunStory />
        <FeaturePanel
          title="Ask once. Read the report."
          body="Deep Research writes its own search queries, follows what it finds a level or two deeper, and turns what it learned into a cited report you can come back to."
          shot={SHOTS.deepResearch}
        />
        <FeaturePanel
          tone="dark"
          title="Hire a team."
          body="Philharmonic puts agents into groups, each with its own role, memory and workspace. Hand them a task now, or give them a schedule: every weekday at nine, or once on Friday."
          shot={SHOTS.philharmonic}
        />
        <Privacy />
        <Specs />
        <Download downloads={downloads} />
      </main>
      <Footer />
    </ShotsProvider>
  )
}
