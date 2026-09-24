const SPECS: { label: string; value: React.ReactNode }[] = [
  {
    label: 'Platforms',
    value:
      'macOS on Apple silicon, Windows (64-bit), Linux (x86-64, .deb and .rpm)'
  },
  {
    label: 'Models',
    value:
      'OpenAI, Anthropic, Google Gemini, xAI and Azure OpenAI with your own keys; local models through Ollama'
  },
  {
    label: 'Built-in tools',
    value:
      'Web search, web fetch, Deep Research, knowledge base search, read, write and edit files, find files, grep, list directories, terminal, artifacts, image generation, map itineraries, weather, Computer Use (macOS), and context expand, describe and search'
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
      'Embedded PostgreSQL with vector search, on your machine. Optional: Elasticsearch for search, a LightRAG server for the knowledge base, S3 for uploads'
  },
  {
    label: 'Security',
    value:
      'PIN and Touch ID app lock; API on your own computer only; phone pairing over certificate-pinned TLS; artifacts in an isolated sandbox'
  },
  {
    label: 'Languages',
    value:
      'English, Deutsch, Español, Français, Italiano, 日本語, 한국어, Português (Brasil), 繁體中文（香港）, 繁體中文（台灣）'
  },
  { label: 'License', value: 'MIT, open source' }
]

/** Apple's Tech Specs: a label column and plain facts, divided by hairlines. */
export function Specs() {
  return (
    <section id="specs" className="bg-paper py-28 sm:py-36">
      <div className="mx-auto max-w-[980px] px-6">
        <h2 className="type-headline">Tech specs</h2>
        <dl className="mt-12 sm:mt-16">
          {SPECS.map((s) => (
            <div
              key={s.label}
              className="border-hairline grid gap-2 border-t py-7 sm:grid-cols-[220px_1fr] sm:gap-10"
            >
              <dt className="text-[1.0625rem] font-semibold">{s.label}</dt>
              <dd className="text-graphite max-w-[60ch]">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
