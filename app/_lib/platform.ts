import { APP_STORE_URL, type Downloads } from './release'

export type DownloadPlatform = 'mac' | 'windows' | 'linux' | 'iphone'
export type DownloadArchitecture = 'x64' | 'arm64'

export function detectArchitecture(
  userAgent: string,
  hints?: { architecture?: string; bitness?: string }
): DownloadArchitecture | null {
  if (hints?.architecture === 'arm' && hints.bitness === '64') return 'arm64'
  if (hints?.architecture === 'x86' && hints.bitness === '64') return 'x64'
  if (/aarch64|arm64/iu.test(userAgent)) return 'arm64'
  if (/x86_64|x64|Win64|amd64/iu.test(userAgent)) return 'x64'
  return null
}

type BrowserPlatform = {
  userAgent: string
  maxTouchPoints?: number
  userAgentData?: { platform: string }
}

/** Download recommendations only. Every platform remains manually selectable. */
export function detectPlatform(
  browser: BrowserPlatform
): DownloadPlatform | null {
  const ua = browser.userAgent
  const hint = browser.userAgentData?.platform ?? ''
  if (/iPhone|iPad|iPod/iu.test(ua) || hint === 'iOS') return 'iphone'
  // iPadOS can identify itself as desktop macOS.
  if (/Macintosh/iu.test(ua) && (browser.maxTouchPoints ?? 0) > 1)
    return 'iphone'
  // Android and ChromeOS also contain Linux in their user agents.
  if (/Android|CrOS|Windows Phone/iu.test(`${hint} ${ua}`)) return null
  if (/Windows/iu.test(hint)) return 'windows'
  if (/macOS/iu.test(hint)) return 'mac'
  if (/Linux/iu.test(hint)) return 'linux'
  if (/Windows NT/iu.test(ua)) return 'windows'
  if (/Macintosh|Mac OS X/iu.test(ua)) return 'mac'
  if (/Linux/iu.test(ua)) return 'linux'
  return null
}

export function downloadTarget(
  downloads: Downloads,
  platform: DownloadPlatform | null,
  architecture: DownloadArchitecture | null = 'x64'
) {
  switch (platform) {
    case 'mac':
      return {
        href: downloads.mac.dmg,
        label: 'Download for Mac',
        detail: 'Apple silicon · .dmg'
      }
    case 'windows':
      return {
        href:
          architecture === null
            ? '#download'
            : architecture === 'arm64'
              ? downloads.windows.arm64.exe
              : downloads.windows.exe,
        label: 'Download for Windows',
        detail:
          architecture === null
            ? 'Choose x64 or ARM64 below'
            : `${architecture === 'arm64' ? 'ARM64' : 'x64'} Windows · .exe installer`
      }
    case 'linux':
      return {
        href:
          architecture === null
            ? '#download'
            : architecture === 'arm64'
              ? downloads.linux.arm64.deb
              : downloads.linux.deb,
        label: 'Download for Linux',
        detail:
          architecture === null
            ? 'Choose x64 or ARM64 below'
            : `${architecture === 'arm64' ? 'ARM64' : 'x86-64'} Linux · .deb or .rpm`
      }
    case 'iphone':
      return {
        href: APP_STORE_URL,
        label: 'Get on the App Store',
        detail: 'Actovia for iPhone'
      }
    default:
      return {
        href: '#download',
        label: 'Download Actovia',
        detail: 'macOS, Windows and Linux'
      }
  }
}
