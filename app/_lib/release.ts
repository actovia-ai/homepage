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
export const APP_STORE_URL = 'https://apps.apple.com/app/actovia/id6824829679'

export async function getLatestRelease(): Promise<GithubRelease | null> {
  try {
    const res = await fetch(
      'https://api.github.com/repos/actovia-ai/actovia/releases/latest',
      {
        // Workers do not supply the User-Agent GitHub's API requires.
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'Actovia-Website'
        },
        next: { revalidate: 3600 }
      }
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
  windows: { exe: string; arm64: { exe: string } }
  linux: { deb: string; rpm: string; arm64: { deb: string; rpm: string } }
}

export function resolveDownloads(release: GithubRelease | null): Downloads {
  const assets = release?.assets ?? []
  const find = (...patterns: RegExp[]) =>
    patterns
      .map((pattern) => assets.find((a) => pattern.test(a.name)))
      .find(Boolean)?.browser_download_url ??
    release?.html_url ??
    RELEASES_URL
  return {
    version: release?.tag_name ?? null,
    mac: { dmg: find(/-arm64\.dmg$/u), zip: find(/darwin-arm64-.*\.zip$/u) },
    windows: {
      exe: find(/-x64-Setup\.exe$/iu, /[. ]Setup\.exe$/iu),
      arm64: { exe: find(/-arm64-Setup\.exe$/iu) }
    },
    linux: {
      deb: find(/_amd64\.deb$/u),
      rpm: find(/\.x86_64\.rpm$/u),
      arm64: {
        deb: find(/_arm64\.deb$/u),
        rpm: find(/\.(?:aarch64|arm64)\.rpm$/u)
      }
    }
  }
}
