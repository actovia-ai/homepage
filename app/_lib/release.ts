export interface GithubAsset {
  name: string
  browser_download_url: string
  size: number
}

export interface GithubRelease {
  tag_name: string
  published_at: string
  html_url: string
  assets: GithubAsset[]
}

export const RELEASES_URL =
  'https://github.com/actovia-ai/actovia/releases/latest'
export const REPO_URL = 'https://github.com/actovia-ai/actovia'

export async function getLatestRelease(): Promise<GithubRelease | null> {
  try {
    const res = await fetch(
      'https://api.github.com/repos/actovia-ai/actovia/releases/latest',
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return null
    return (await res.json()) as GithubRelease
  } catch {
    return null
  }
}

const ASSET_PREFIX = /^(?:Actovia|Exodus)-/u

export interface Downloads {
  version: string | null
  mac: { dmg: string; zip: string }
  windows: { exe: string }
  linux: { deb: string; rpm: string }
}

/**
 * Asset URLs by the names electron-forge gives them
 * (`Actovia-1.17.0-arm64.dmg`, `Actovia-1.17.0.Setup.exe`, …; releases
 * before the rename carry the `Exodus-` prefix). Anything
 * missing falls back to the release page rather than a guessed URL.
 */
export function resolveDownloads(release: GithubRelease | null): Downloads {
  const assets = release?.assets ?? []
  // Releases before the rename are `Exodus-…`; from the first Actovia
  // release on they are `Actovia-…`. Both prefixes are accepted.
  const find = (pattern: RegExp) =>
    assets.find((a) => ASSET_PREFIX.test(a.name) && pattern.test(a.name))
      ?.browser_download_url ??
    release?.html_url ??
    RELEASES_URL
  return {
    version: release?.tag_name ?? null,
    mac: { dmg: find(/-arm64\.dmg$/u), zip: find(/darwin-arm64-.*\.zip$/u) },
    windows: { exe: find(/[. ]Setup\.exe$/iu) },
    linux: { deb: find(/_amd64\.deb$/u), rpm: find(/\.x86_64\.rpm$/u) }
  }
}
