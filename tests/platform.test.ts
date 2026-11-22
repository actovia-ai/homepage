import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  detectArchitecture,
  detectPlatform,
  downloadTarget
} from '../app/_lib/platform'
import { RELEASES_URL, resolveDownloads } from '../app/_lib/release'

describe('download recommendations', () => {
  const cases = [
    [
      'Windows Chrome',
      {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        userAgentData: { platform: 'Windows' }
      },
      'windows'
    ],
    [
      'Windows Firefox',
      { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:144.0)' },
      'windows'
    ],
    [
      'Mac Safari',
      { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' },
      'mac'
    ],
    ['Linux', { userAgent: 'Mozilla/5.0 (X11; Linux x86_64)' }, 'linux'],
    [
      'iPhone',
      { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_0 like Mac OS X)' },
      'iphone'
    ],
    [
      'desktop-mode iPad',
      {
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        maxTouchPoints: 5
      },
      'iphone'
    ],
    [
      'Android',
      {
        userAgent: 'Mozilla/5.0 (Linux; Android 16)',
        userAgentData: { platform: 'Android' }
      },
      null
    ],
    [
      'ChromeOS',
      {
        userAgent: 'Mozilla/5.0 (X11; CrOS x86_64)',
        userAgentData: { platform: 'Chrome OS' }
      },
      null
    ],
    ['unknown', { userAgent: '' }, null]
  ] as const
  for (const [name, browser, expected] of cases) {
    it(`recommends the correct platform for ${name}`, () => {
      assert.equal(detectPlatform(browser), expected)
    })
  }

  it('points Windows to the installer, never the update package', () => {
    const downloads = resolveDownloads({
      tag_name: 'v2.9.2',
      published_at: '',
      html_url: RELEASES_URL,
      assets: [
        {
          name: 'actovia-2.9.2-full.nupkg',
          browser_download_url: 'https://example.com/update.nupkg',
          size: 0
        },
        {
          name: 'Actovia-2.9.2 Setup.exe',
          browser_download_url: 'https://example.com/Setup.exe',
          size: 0
        }
      ]
    })
    assert.equal(
      downloadTarget(downloads, 'windows').href,
      'https://example.com/Setup.exe'
    )
    assert.equal(downloadTarget(downloads, null).href, '#download')
    assert.equal(
      downloadTarget(downloads, 'iphone').href.startsWith(
        'https://apps.apple.com/'
      ),
      true
    )
  })

  it('retains the release-page fallback when release assets are unavailable', () => {
    assert.equal(
      downloadTarget(resolveDownloads(null), 'windows').href,
      RELEASES_URL
    )
  })

  it('prefers native client hints over the reduced x64 Windows user agent', () => {
    assert.equal(
      detectArchitecture('Windows NT 10.0; Win64; x64', {
        architecture: 'arm',
        bitness: '64'
      }),
      'arm64'
    )
    assert.equal(
      detectArchitecture('Windows NT 10.0; Win64; x64', {
        architecture: 'x86',
        bitness: '64'
      }),
      'x64'
    )
    assert.equal(detectArchitecture('X11; Linux aarch64'), 'arm64')
    assert.equal(detectArchitecture('X11; Linux x86_64'), 'x64')
    assert.equal(detectArchitecture('unknown'), null)
  })

  it('separates x64 and ARM64 packages and prefers the new wizard over legacy Squirrel', () => {
    const names = [
      'Actovia-3.0.0 Setup.exe',
      'Actovia-3.0.0-x64-Setup.exe',
      'Actovia-3.0.0-arm64-Setup.exe',
      'actovia_3.0.0_amd64.deb',
      'actovia_3.0.0_arm64.deb',
      'actovia-3.0.0-1.x86_64.rpm',
      'actovia-3.0.0-1.arm64.rpm'
    ]
    const downloads = resolveDownloads({
      tag_name: 'v3.0.0',
      published_at: '',
      html_url: RELEASES_URL,
      assets: names.map((name) => ({
        name,
        browser_download_url: `https://example.com/${name}`,
        size: 0
      }))
    })
    assert.equal(
      downloadTarget(downloads, 'windows', 'x64').href,
      'https://example.com/Actovia-3.0.0-x64-Setup.exe'
    )
    assert.equal(
      downloadTarget(downloads, 'windows', 'arm64').href,
      'https://example.com/Actovia-3.0.0-arm64-Setup.exe'
    )
    assert.equal(
      downloadTarget(downloads, 'linux', 'arm64').href,
      'https://example.com/actovia_3.0.0_arm64.deb'
    )
    assert.equal(
      downloads.linux.arm64.rpm,
      'https://example.com/actovia-3.0.0-1.arm64.rpm'
    )
    assert.equal(downloadTarget(downloads, 'windows', null).href, '#download')
  })

  it('does not substitute an x64 package when an ARM64 release is missing', () => {
    const downloads = resolveDownloads({
      tag_name: 'v2.9.2',
      published_at: '',
      html_url: RELEASES_URL,
      assets: [
        {
          name: 'Actovia-2.9.2 Setup.exe',
          browser_download_url: 'https://example.com/x64.exe',
          size: 0
        }
      ]
    })
    assert.equal(
      downloadTarget(downloads, 'windows', 'arm64').href,
      RELEASES_URL
    )
  })
})
