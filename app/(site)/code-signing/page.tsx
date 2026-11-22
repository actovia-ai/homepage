import type { Metadata } from 'next'
import Link from 'next/link'

import { Footer } from '@/app/_components/footer'
import { LocalNav } from '@/app/_components/local-nav'
import { openGraph } from '@/app/_lib/og'
import { REPO_URL } from '@/app/_lib/release'

const DESCRIPTION =
  'The status of Windows code signing for Actovia, the proposed approval process, and how to verify a release.'

export const metadata: Metadata = {
  title: 'Code signing policy — Actovia',
  description: DESCRIPTION,
  alternates: { canonical: '/code-signing' },
  openGraph: openGraph(
    'Code signing policy — Actovia',
    DESCRIPTION,
    '/code-signing'
  )
}

export default function CodeSigningPage() {
  return (
    <>
      <LocalNav downloadHref="/#download" />
      <main className="mx-auto max-w-[1328px] px-5 py-20 sm:px-8 sm:py-28">
        <header className="max-w-[60ch]">
          <h1 className="type-headline">Code signing policy.</h1>
          <p className="type-lede text-graphite mt-6">
            We are applying to the SignPath Foundation program for our Windows
            releases. Signing through this program is not active: we have not
            yet been approved, and our published Windows installers are
            currently unsigned.
          </p>
        </header>

        <div className="prose-actovia mt-16 max-w-[68ch]">
          <section className="border-hairline border-t py-10">
            <h2 className="type-title">Requested signing provider</h2>
            <div className="text-graphite mt-5 space-y-4 font-light">
              <p>
                If approved, our Windows releases will carry this attribution:
                Free code signing provided by{' '}
                <a href="https://about.signpath.io">SignPath.io</a>, certificate
                by <a href="https://signpath.org">SignPath Foundation</a>. This
                describes the program we are applying to, not an existing
                certification.
              </p>
              <p>
                The certificate would identify SignPath Foundation as the
                publisher. Its use is subject to the Foundation&rsquo;s{' '}
                <a href="https://signpath.org/terms">
                  conditions for open-source projects
                </a>
                .
              </p>
            </div>
          </section>

          <section className="border-hairline border-t py-10">
            <h2 className="type-title">
              Maintainer and proposed approval process
            </h2>
            <div className="text-graphite mt-5 space-y-4 font-light">
              <p>
                The maintainer, reviewer and proposed signing approver is Yancey
                Leo (
                <a href="https://github.com/YanceyOfficial">YanceyOfficial</a>).
                Changes from other contributors are reviewed before inclusion in
                a release.
              </p>
              <p>
                In the proposed SignPath workflow, every signing request will
                require the maintainer&rsquo;s manual approval. A successful
                automated build alone will not approve a signing request.
              </p>
              <p>
                Release artifacts are built by{' '}
                <a href={`${REPO_URL}/actions`}>GitHub Actions</a> from the
                project&rsquo;s <a href={REPO_URL}>public source repository</a>.
                The repository includes the build scripts and release history.
                Signing will be limited to our own project binaries and
                installers; bundled upstream components retain their own
                publisher identities.
              </p>
            </div>
          </section>

          <section className="border-hairline border-t py-10">
            <h2 className="type-title">Privacy</h2>
            <div className="text-graphite mt-5 space-y-4 font-light">
              <p>
                Actovia stores conversations and provider keys locally. Signing
                submissions contain release artifacts and build provenance, not
                user conversations or API keys.
              </p>
              <p>
                Our <Link href="/privacy">privacy policy</Link> describes the
                app&rsquo;s network requests and third-party services, including
                the model providers and tools chosen by the user.
              </p>
            </div>
          </section>

          <section className="border-hairline border-t py-10">
            <h2 className="type-title">Verifying a download</h2>
            <div className="text-graphite mt-5 space-y-4 font-light">
              <p>
                Download installers from the{' '}
                <a href={`${REPO_URL}/releases`}>official GitHub releases</a>.
                Each release includes SHA256SUMS for checking file integrity. A
                matching checksum is not a code-signing certificate.
              </p>
              <p>
                After signed releases become available, Windows file properties
                will show a Digital Signatures tab and the certificate&rsquo;s
                publisher. Until then, unsigned installers may trigger Windows
                security warnings. We do not ask users to disable Windows
                Security or run an installer as administrator to bypass them.
              </p>
              <p>
                Questions about a release can be raised through{' '}
                <a href={`${REPO_URL}/issues`}>GitHub Issues</a>.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
