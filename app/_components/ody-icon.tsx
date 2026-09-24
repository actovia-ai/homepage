import { cn } from '@/lib/utils'

/**
 * The Exodus app icon, the Liquid Glass export for the colour scheme: the
 * dark one (Ody on a dark glass tile) when the system is dark. A plain
 * <picture> so the browser picks the file itself, with no script.
 */
export function OdyIcon({
  size,
  alt = '',
  priority,
  className
}: {
  size: number
  alt?: string
  priority?: boolean
  className?: string
}) {
  return (
    <picture>
      <source
        srcSet="/brand/ody-icon-dark.png"
        media="(prefers-color-scheme: dark)"
      />
      <img
        src="/brand/ody-icon.png"
        alt={alt}
        width={size}
        height={size}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        className={cn('block', className)}
      />
    </picture>
  )
}
