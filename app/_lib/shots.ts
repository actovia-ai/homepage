/**
 * Every screenshot the page needs, in one place: drop the PNG at `file`
 * (under public/) and it replaces the placeholder. Capture at 2x; `size` is
 * the pixel size to export.
 */
export interface ShotSpec {
  file: string
  size: [number, number]
  /** What to capture — shown inside the placeholder until the file exists. */
  brief: string
}

export const SHOTS = {
  hero: {
    file: '/shots/hero-main-window.png',
    size: [2880, 1800],
    brief:
      'Main window, light mode: sidebar with a few chats, a conversation with a finished answer, a tool card and the composer.'
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
    file: '/shots/philharmonic.png',
    size: [2880, 1800],
    brief:
      'Philharmonic, dark mode: a group of agents on a task, plus the Schedule tab.'
  },
  artifacts: {
    file: '/shots/artifacts.png',
    size: [1600, 1200],
    brief: 'An artifact rendered in its sandbox (a small HTML app or chart).'
  },
  computerUse: {
    file: '/shots/computer-use.png',
    size: [1600, 1200],
    brief: 'A computer_use step driving an allowlisted app window.'
  },
  iphoneChat: {
    file: '/shots/iphone-chat.png',
    size: [1206, 2622],
    brief:
      'Exodus for iPhone: a chat streaming from the paired computer, with a tool card.'
  },
  iphoneControl: {
    file: '/shots/iphone-control.png',
    size: [1206, 2622],
    brief:
      'Exodus for iPhone: a run working on the computer — Computer Use or terminal steps.'
  },
  iphoneSettings: {
    file: '/shots/iphone-settings.png',
    size: [1206, 2622],
    brief: 'Exodus for iPhone: Settings, showing models and providers.'
  },
  chatAudit: {
    file: '/shots/chat-audit.png',
    size: [1600, 1200],
    brief: 'Settings → Developer → Chat Audit with a SQL query and results.'
  }
} satisfies Record<string, ShotSpec>
