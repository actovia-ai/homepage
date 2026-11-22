'use client'

import { useSyncExternalStore } from 'react'

import { detectPlatform } from './platform'

// The browser's platform is stable for the life of this page. A neutral
// server snapshot keeps SSR/hydration consistent without recommending Mac
// to a Windows visitor before the browser has been read.
const subscribe = () => () => {}
const serverPlatform = () => null
const browserPlatform = () => detectPlatform(navigator)

export function useDetectedPlatform() {
  return useSyncExternalStore(subscribe, browserPlatform, serverPlatform)
}
