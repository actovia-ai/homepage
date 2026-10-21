# Product

<!-- impeccable:product-schema 1 -->

<!--
  Written 2026-10-21 by an agent without an interview: every fact below is
  inferred from the actovia repository (CLAUDE.md, docs under content/docs)
  and this site's existing copy. Confirm or correct with the owner.
-->

## Platform

web

## Users

People who want a capable AI assistant on their own computer rather than in
someone else's cloud: developers and technical power users on a Mac (Apple
silicon first; Windows and Linux builds exist), who already hold API keys for
one or more model providers or run local models with Ollama, and who often
also carry an iPhone. On this site they are evaluating whether to download a
free, open-source desktop app.

## Product Purpose

Actovia is a desktop AI assistant (Electron, macOS / Windows / Linux) that
runs and keeps its data on the user's own machine. Chat for quick answers;
tools that let it act (web search and fetch, files, terminal, artifacts,
Computer Use on macOS); Deep Research for cited reports; Philharmonic for
teams of agents on scheduled work. An iPhone companion pairs over the local
network and acts as a remote for the computer. Success for the site: the
visitor understands what it is and downloads it.

## Positioning

The computer is the hub: the assistant, its memory, its tools and its data
live in a database on the user's machine, requests go straight to the model
provider the user chose with their own key, and the phone steers the
computer rather than replacing it. Free, MIT-licensed, no account.

## Operating Context

- Downloads come from GitHub releases (`actovia-ai/actovia`); macOS builds are
  ad-hoc signed and not notarized yet, so the first launch needs "Open Anyway"
  (documented in /docs/installation).
- The `actovia` CLI (`npm install -g @actovia-ai/cli`) looks after the desktop
  app from a terminal and installs skills from skills.sh.
- Docs live under /docs on the same site (Fumadocs).

## Capabilities and Constraints

- Providers: OpenAI, Anthropic, Google Gemini, xAI, Azure OpenAI with the
  user's own keys; local models through Ollama. Model lists load live.
- Built-in tools, MCP servers, skills.sh skills, LightRAG knowledge base
  (optional, self-hosted), DuckDB Chat Audit, ten UI languages, app lock (PIN,
  Touch ID), LAN pairing over certificate-pinned TLS.
- Philharmonic on iPhone is not shipped yet.
- No pricing: the app is free and open source.

## Brand Commitments

- Name: Actovia. Mascot: Ody the Traveller, a marshmallow gumdrop with a
  bindle, on sunflower yellow. App icon and brand images in `public/brand/`
  stay as they are.
- Wordmark set in Fredoka (small sizes only).
- Copy is plain, concrete English; no hype.

## Evidence on Hand

- Brand images: `public/brand/`; provider marks: `public/provider-logos/`.
- No product screenshots yet: every capture is listed in `app/_lib/shots.ts`
  and drawn as a placeholder until its PNG lands in `public/shots/`.
- No testimonials, customer logos, usage numbers or benchmarks exist; never
  invent them.

## Product Principles

- Local first: what the user owns stays on the user's machine.
- Prove with the product, not with adjectives.
- The desktop is the richest control centre; the phone is its remote.
- Ask before anything that cannot be undone.
