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

The app runs on vinext and Cloudflare Workers. `cloudflare.config.ts` defines the `actovia-homepage` Worker and `actovia.yancey.app` domain; `vite.config.ts` configures Fumadocs, CSS Modules and the Workers Cache CDN adapter. There is no KV data cache or Cloudflare Images binding. Screenshot availability is resolved during the build because Workers cannot inspect the source repository's filesystem.

```bash
pnpm exec cf auth login
pnpm deploy               # build and deploy
pnpm preview              # preview a production build locally
pnpm cf-typegen           # regenerate Cloudflare binding types
```

Keep deployment credentials outside source control. Generated `.cloudflare/`, `.wrangler/` and `dist/` output is ignored. See [APPLE-CREDENTIALS.md](APPLE-CREDENTIALS.md) for the Hikki credentials needed by the separate blog and Hikki website Workers.
