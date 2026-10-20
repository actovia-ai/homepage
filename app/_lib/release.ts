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

export interface Downloads {
  version: string | null
  mac: { dmg: string; zip: string }
  windows: { exe: string }
  linux: { deb: string; rpm: string }
}

export function resolveDownloads(release: GithubRelease | null): Downloads {
  const assets = release?.assets ?? []
  const find = (pattern: RegExp) =>
    assets.find((a) => pattern.test(a.name))?.browser_download_url ??
    release?.html_url ??
    RELEASES_URL
  return {
    version: release?.tag_name ?? null,
    mac: { dmg: find(/-arm64\.dmg$/u), zip: find(/darwin-arm64-.*\.zip$/u) },
    windows: { exe: find(/[. ]Setup\.exe$/iu) },
    linux: { deb: find(/_amd64\.deb$/u), rpm: find(/\.x86_64\.rpm$/u) }
  }
}
