'use client'

import { useSyncExternalStore } from 'react'

import { detectArchitecture, type DownloadArchitecture } from './platform'

let architecture: DownloadArchitecture | null = null
let started = false
const listeners = new Set<() => void>()
const snapshot = () => architecture
const serverSnapshot = () => null

async function readArchitecture() {
  // Modern Windows UAs report x64 even on ARM64. Ask for the two hints needed
  // to choose a native build; Firefox/Safari and denied hints retain UA/manual fallback.
  const browser = navigator as Navigator & {
    userAgentData?: {
      getHighEntropyValues?: (
        hints: string[]
      ) => Promise<{ architecture?: string; bitness?: string }>
    }
  }
  let hints: { architecture?: string; bitness?: string } | undefined
  try {
    hints = await browser.userAgentData?.getHighEntropyValues?.([
      'architecture',
      'bitness'
    ])
  } catch {
    /* Permissions Policy can deny client hints. */
  }
  architecture = detectArchitecture(browser.userAgent, hints)
  for (const listener of listeners) listener()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  if (!started) {
    started = true
    void readArchitecture()
  }
  return () => {
    listeners.delete(listener)
  }
}

export function useDetectedArchitecture() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot)
}
