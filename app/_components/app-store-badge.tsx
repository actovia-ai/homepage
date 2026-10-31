import { APP_STORE_URL } from '@/app/_lib/release'

/** Apple-supplied App Store badge; its artwork and proportions must stay intact. */
export function AppStoreBadge() {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun-deep"
    >
      <img
        src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
        alt="Download on the App Store"
        width={120}
        height={40}
      />
    </a>
  )
}
