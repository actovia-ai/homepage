# Actovia website and documentation

[actovia.yancey.app](https://actovia.yancey.app) is the product homepage and Fumadocs user guide for the [desktop app](https://github.com/actovia-ai/actovia), [native iOS companion](https://apps.apple.com/app/actovia/id6824829679) and [CLI](https://github.com/actovia-ai/cli).

The homepage includes platform downloads, the product gallery, use cases, Philharmonic, Health and a scroll-linked iPhone Duo fold. The compact navigation bar links to sections; the logo returns to the page top. The official App Store badge and all iOS links use a region-neutral App Store URL.

## Develop

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm lint
pnpm exec tsc --noEmit
pnpm build
pnpm start    # preview the production build
```

Read `AGENTS.md` and the relevant Next.js documentation under `node_modules/next/dist/docs/` before framework changes. The installed Next.js version is the source of truth.

## Content and screenshots

- `app/(site)/page.tsx` and `app/_components/` contain the marketing page.
- `content/docs/` contains MDX guides; `components/screenshot.tsx` renders documentation captures.
- `app/_lib/shots.ts` lists marketing screenshots. `docs/screenshot-shotlist.md` describes capture requirements.
- Put light captures in `public/shots/name.png` and dark captures in `name-dark.png`. Match the same scene, theme and dimensions; open a real conversation rather than an empty chat. The Duo fold needs both folded and open views in both themes.
- `public/brand/` and `app` icons come from the desktop repo's `bun run icons`. Provider logos are LobeHub's AI brand SVGs (MIT).

Never place API keys, personal chat exports or simulator data in this repository. Use curated demo conversations for public screenshots.

## Deployment

The repository includes OpenNext/Cloudflare scripts (`pnpm preview`, `pnpm deploy`) as well as the standard Next.js build used by the configured hosting platform. Keep deployment credentials and project linkage outside source control. A source commit does not itself verify that production has deployed; inspect the host's deployment result separately.
