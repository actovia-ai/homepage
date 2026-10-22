/**
 * Every screenshot the page needs, in one place. Capture at 2x; `size` is the
 * pixel size to export.
 *
 * Each shot comes in two captures, one per colour scheme: `file` in light
 * mode, and the same name with `-dark` (`hero-main-window-dark.png`) in dark
 * mode; visitors get the one for their system. A shot that only ever sits on
 * a black section is `darkOnly`, and `file` is its dark capture. Drop the PNGs
 * under public/ and they replace the placeholder; if one scheme's capture is
 * missing, the other is shown for both.
 */
export interface ShotSpec {
  file: string
  size: [number, number]
  /** What to capture — shown inside the placeholder until a file exists. */
  brief: string
  darkOnly?: boolean
}

/** The dark-mode capture of a shot (the same file for a dark-only shot). */
export function darkFileOf(spec: ShotSpec): string {
  return spec.darkOnly ? spec.file : spec.file.replace(/\.png$/u, '-dark.png')
}

/** Every file a shot can use, for checking which ones exist. */
export function shotFiles(spec: ShotSpec): string[] {
  return spec.darkOnly ? [spec.file] : [spec.file, darkFileOf(spec)]
}

export const SHOTS = {
  hero: {
    file: '/shots/hero-main-window.png',
    size: [2880, 1800],
    brief:
      'Main window: sidebar with a few chats, a conversation with a finished answer, a tool card and the composer.'
  },
  runAsk: {
    file: '/shots/run-1-ask.png',
    size: [2400, 1600],
    brief: 'A run starting: the user message and the first thinking step.'
  },
  runResearch: {
    file: '/shots/run-2-research.png',
    size: [2400, 1600],
    brief: 'The timeline mid-run: web_search and web_fetch steps expanded.'
  },
  runFiles: {
    file: '/shots/run-3-files.png',
    size: [2400, 1600],
    brief:
      'terminal and write_file steps working in the chat’s workspace folder.'
  },
  runResult: {
    file: '/shots/run-4-result.png',
    size: [2400, 1600],
    brief: 'The finished answer with an artifact or map itinerary card open.'
  },
  deepResearch: {
    file: '/shots/deep-research.png',
    size: [2880, 1800],
    brief: 'A Deep Research report open, with its progress and cited sources.'
  },
  philharmonic: {
    file: '/shots/philharmonic-dark.png',
    size: [2880, 1800],
    darkOnly: true,
    brief: 'Philharmonic: a group of agents on a task, plus the Schedule tab.' // capture in dark mode
  },
  artifacts: {
    file: '/shots/artifacts.png',
    size: [1600, 1200],
    brief: 'An artifact rendered in its sandbox (a small HTML app or chart).'
  },
  iphoneChat: {
    file: '/shots/iphone-chat.png',
    size: [1206, 2622],
    brief:
      'Actovia for iPhone: a chat streaming from the paired computer, with a tool card.'
  },
  iphoneControl: {
    file: '/shots/iphone-control.png',
    size: [1206, 2622],
    brief:
      'Actovia for iPhone: a run working on the computer — Computer Use or terminal steps.'
  },
  iphoneSettings: {
    file: '/shots/iphone-settings.png',
    size: [1206, 2622],
    brief: 'Actovia for iPhone: Settings, showing models and providers.'
  },
  sceneMemory: {
    file: '/shots/scene-memory.png',
    size: [1600, 1000],
    brief: 'The memories an answer used, opened at the foot of a run.'
  },
  scenePhotos: {
    file: '/shots/scene-photos.png',
    size: [1600, 1000],
    brief: 'A web search’s pictures under the answer, numbered with the sources.'
  },
  sceneStocks: {
    file: '/shots/scene-stocks.png',
    size: [1600, 1000],
    brief: 'A stock answer with the TradingView chart card and cited sources.'
  },
  sceneMap: {
    file: '/shots/scene-map.png',
    size: [1600, 1000],
    brief: 'The three-day Kyoto itinerary on a map, a stop’s detail panel open.'
  },
  sceneWeather: {
    file: '/shots/scene-weather.png',
    size: [1600, 1000],
    brief: 'The weather card for Tokyo’s week, above the answer.'
  },
  scenePaint: {
    file: '/shots/scene-paint.png',
    size: [1600, 1000],
    brief: 'An image made in the chat: a watercolor Kyoto lane.'
  },
  sceneBuild: {
    file: '/shots/scene-build.png',
    size: [1600, 1000],
    brief: 'A Pomodoro timer built as an artifact, running in the answer.'
  },
  sceneCompare: {
    file: '/shots/scene-compare.png',
    size: [1600, 1000],
    brief: 'Regenerate: two answers side by side, one to keep.'
  },
  sceneSkills: {
    file: '/shots/scene-skills.png',
    size: [1600, 1000],
    brief: 'Settings → Skills Market: the skills.sh leaderboard.'
  },
  sceneQuickChat: {
    file: '/shots/scene-quick-chat.png',
    size: [1600, 1000],
    brief: 'The quick-chat pill summoned from the menu bar.'
  },
  chatAudit: {
    file: '/shots/chat-audit.png',
    size: [1600, 1200],
    brief: 'Settings → Developer → Chat Audit with a SQL query and results.'
  }
} satisfies Record<string, ShotSpec>
