# Exodus homepage

The product page for [Exodus](https://github.com/exodus-ai-org/exodus), in the
style of an Apple product page: a pinned product bar, a hero with the app
icon and window, alternating light and dark chapters, a pinned scroll story,
Tech specs, downloads, and the name edge to edge at the bottom.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm lint
pnpm build
```

## Screenshots

Every screenshot is listed in `app/_lib/shots.ts` with what to capture and at
what size. Until a file exists, the page shows a window-shaped placeholder
that says the same. To fill one in, capture the Exodus window at 2x (on macOS,
⌘⇧4 then Space, and hold Option while clicking to leave out the shadow),
export it at the listed size, and save it under `public/` at the listed path.
Each shot has a light and a dark capture: `name.png` in light mode and
`name-dark.png` in dark mode, and visitors see the one for their system (shots
marked `darkOnly` sit on black sections and need only the dark one). If one is
missing the other is used for both. The page picks new files up on the next
build.

## Brand

`public/brand/` holds the Ody app icon (the Icon Composer Liquid Glass export)
and Ody's layers, and `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png`
and `app/opengraph-image.png` are the web set. All of them are generated in
the app repo by `bun run icons` (`brand/`); copy them over after a change.
Provider marks in `public/provider-logos/` are LobeHub's AI brand icons
(`@lobehub/icons-static-svg`, MIT).
