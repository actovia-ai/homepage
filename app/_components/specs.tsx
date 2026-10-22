const SPECS: { label: string; value: React.ReactNode }[] = [
  {
    label: 'Platforms',
    value:
      'macOS on Apple silicon, Windows (64-bit), Linux (x86-64, .deb and .rpm); Actovia for iPhone as a paired remote'
  },
  {
    label: 'Models',
    value:
      'OpenAI, Anthropic, Google Gemini, xAI and Azure OpenAI with your own keys; local models through Ollama'
  },
  {
    label: 'Built-in tools',
    value:
      'Web search, web fetch, Deep Research, knowledge base search, read, write and edit files, find files, grep, list directories, terminal, artifacts, image generation, map itineraries, weather, memory updates, Computer Use (macOS, experimental), and context recall, expand, describe and search'
  },
  {
    label: 'Extensions',
    value: 'Model Context Protocol servers; skills from skills.sh'
  },
  {
    label: 'Agents',
    value:
      'Philharmonic groups with per-agent memory and workspaces; recurring and one-off schedules'
  },
  {
    label: 'Storage',
    value:
      'Embedded PostgreSQL with vector search, on your machine. Optional: a LightRAG server for the knowledge base, S3 for uploads'
  },
  {
    label: 'Security',
    value:
      'PIN and Touch ID app lock; API keys encrypted at rest; API on your own computer only; phone pairing over certificate-pinned TLS; artifacts in an isolated sandbox'
  },
  {
    label: 'Command line',
    value: (
      <>
        <code className="text-ink text-[0.875em]">
          npm install -g @actovia-ai/cli
        </code>{' '}
        — status, logs, backups, pairing and skills from a terminal
      </>
    )
  },
  {
    label: 'Languages',
    value:
      'English, Deutsch, Español, Français, Italiano, 日本語, 한국어, Português (Brasil), 繁體中文（香港）, 繁體中文（台灣）'
  },
  { label: 'License', value: 'MIT, open source' }
]

/** Plain facts, a label column and hairlines. */
export function Specs() {
  return (
    <section id="specs" className="border-hairline border-t py-28 sm:py-36">
      <div className="mx-auto grid max-w-[1328px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <h2 className="type-headline lg:col-span-4">Tech specs</h2>
        <dl className="border-hairline border-b lg:col-span-8">
          {SPECS.map((s) => (
            <div
              key={s.label}
              className="border-hairline grid grid-cols-1 gap-2 border-t py-6 sm:grid-cols-[180px_1fr] sm:gap-10"
            >
              <dt className="font-medium">{s.label}</dt>
              <dd className="text-graphite max-w-[62ch] font-light">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
