'use client'

import { ArrowRight, ArrowUpRight } from 'lucide-react'

import { AppStoreBadge } from '@/app/_components/app-store-badge'
import { GithubMark } from '@/app/_components/local-nav'
import { downloadTarget } from '@/app/_lib/platform'
import { REPO_URL, type Downloads } from '@/app/_lib/release'
import { useDetectedArchitecture } from '@/app/_lib/use-detected-architecture'
import { useDetectedPlatform } from '@/app/_lib/use-detected-platform'

export function HeroDownload({ downloads }: { downloads: Downloads }) {
  const target = downloadTarget(
    downloads,
    useDetectedPlatform(),
    useDetectedArchitecture()
  )
  return (
    <div className="lg:row-span-2 lg:pt-1">
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={target.href}
          className="group bg-ink text-paper inline-flex items-center gap-2.5 rounded-[6px] px-5 py-3 text-base font-medium transition-[opacity,scale] duration-150 hover:opacity-90 active:scale-[0.97]"
        >
          {target.label}
          <ArrowRight
            aria-hidden
            className="text-sun size-4.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
          />
        </a>
        <a
          href={REPO_URL}
          className="border-hairline bg-panel text-ink hover:bg-sunk inline-flex items-center gap-2.5 rounded-[6px] border px-5 py-3 text-base font-medium transition-[background-color,scale] duration-150 active:scale-[0.97]"
        >
          <GithubMark className="size-4" />
          Source
          <ArrowUpRight aria-hidden className="text-graphite size-4" />
        </a>
      </div>
      <p className="text-graphite mt-4 font-mono text-xs">
        MIT · no account · your own model keys
      </p>
      <p className="text-graphite mt-1.5 text-sm">
        {target.detail}.{' '}
        <a href="#download" className="text-ink underline">
          All downloads
        </a>
      </p>
      <div className="border-hairline mt-6 flex items-center gap-5 border-t pt-5">
        <div>
          <p className="text-ink text-sm font-medium">Take it with you.</p>
          <p className="text-graphite mt-1 text-sm">Actovia for iPhone</p>
        </div>
        <AppStoreBadge />
      </div>
    </div>
  )
}
