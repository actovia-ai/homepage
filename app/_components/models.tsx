import { cn } from '@/lib/utils'

// Mono marks from LobeHub's AI brand icons (@lobehub/icons-static-svg, MIT),
// drawn black here and inverted in the dark scheme.
export const PROVIDERS = [
  { logo: 'openai', name: 'OpenAI' },
  { logo: 'anthropic', name: 'Anthropic' },
  { logo: 'gemini', name: 'Google Gemini' },
  { logo: 'xai', name: 'xAI' },
  { logo: 'azure', name: 'Azure OpenAI' },
  { logo: 'ollama', name: 'Ollama' }
]

/** The providers Actovia talks to, as a quiet row of marks. */
export function ProviderMarks({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p className="text-graphite text-sm">Bring your own model</p>
      <ul className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-4">
        {PROVIDERS.map((p) => (
          <li key={p.logo} title={p.name} className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element -- tiny static SVGs */}
            <img
              src={`/provider-logos/${p.logo}.svg`}
              alt={p.name}
              width={24}
              height={24}
              className={cn(
                'size-6 object-contain opacity-75 brightness-0 dark:invert'
              )}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
