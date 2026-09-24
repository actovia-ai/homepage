// Mono marks from LobeHub's AI brand icons (@lobehub/icons-static-svg, MIT),
// drawn in currentColor and turned white here.
const PROVIDERS = [
  { logo: 'openai', name: 'OpenAI' },
  { logo: 'anthropic', name: 'Anthropic' },
  { logo: 'gemini', name: 'Google Gemini' },
  { logo: 'xai', name: 'xAI' },
  { logo: 'azure', name: 'Azure OpenAI' },
  { logo: 'ollama', name: 'Ollama' }
]

export function Models() {
  return (
    <section
      data-nav-tone="dark"
      className="bg-night text-night-ink py-28 sm:py-36"
    >
      <div className="mx-auto max-w-[980px] px-6 text-center">
        <h2 className="type-headline">Bring your own models.</h2>
        <p className="type-lede text-night-graphite mx-auto mt-6 max-w-[40ch]">
          Use the frontier models with your own API keys, or run one locally
          with Ollama. Each provider’s list loads live, so a new model shows up
          the day it ships.
        </p>

        <ul className="mx-auto mt-20 grid max-w-[820px] grid-cols-3 gap-x-6 gap-y-14 sm:grid-cols-6">
          {PROVIDERS.map((p) => (
            <li key={p.logo} className="flex flex-col items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element -- tiny static SVGs */}
              <img
                src={`/provider-logos/${p.logo}.svg`}
                alt=""
                width={44}
                height={44}
                className="size-11 object-contain brightness-0 invert"
              />
              <span className="text-night-graphite text-sm">{p.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
