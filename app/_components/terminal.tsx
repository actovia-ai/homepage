import { cn } from '@/lib/utils'

/**
 * A black block for anything the app or its CLI types: commands, tool calls,
 * SQL. Black in both schemes; the sunflower marks the token that matters.
 */
export function Terminal({
  label,
  className,
  children
}: {
  label?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'bg-term text-term-ink overflow-hidden rounded-[6px] ring-1 ring-white/6',
        className
      )}
    >
      {label && (
        <div className="text-term-dim border-b border-white/8 px-4 py-2.5 font-mono text-xs">
          {label}
        </div>
      )}
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[0.75rem] leading-[1.7] break-words whitespace-pre-wrap sm:text-[0.8125rem] sm:whitespace-pre">
        <code>{children}</code>
      </pre>
    </div>
  )
}

/** The highlighted token in a command. */
export function Token({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-sun/15 text-sun rounded-[2px] px-1">{children}</span>
  )
}
