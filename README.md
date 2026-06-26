# Dataflow — AI Data Automation Platform

A landing page built for **Frontend Battle Phase 1: Next-Gen AI Platform Speed Run**.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · vanilla CSS animations (no Framer Motion / GSAP)

## Core features

- **Matrix-driven pricing** ([constants/pricing.ts](constants/pricing.ts)): every price is computed as `baseRate(plan) × regionalTariff(currency) × (1 − 20% if annual)` — no hardcoded price cells. Changing currency or billing cycle updates only the price text node via a scoped React Context (`PriceProvider`) read by a single leaf component (`<Price />`); the surrounding card, feature list, and layout never re-render.
- **Bento-to-accordion feature grid** ([components/sections/bento-features.tsx](components/sections/bento-features.tsx)): one `activeId` state drives both the desktop bento grid and the mobile accordion, because they're CSS reflows of the same mounted tree rather than separate desktop/mobile components — so the active panel survives a resize across the breakpoint with no extra logic.
- **Scene imagery** ([components/scenes/scene-backdrop.tsx](components/scenes/scene-backdrop.tsx)): each section's backdrop is a real image, SSR'd and crawlable, with a CSS-only keyframe crossfade for sections that have multiple frames. No JS animation library.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

## Project structure

```
app/              routes, layout, metadata, sitemap, robots
components/
  sections/       one component per landing-page section
  pricing/        pricing matrix UI (isolated re-render path)
  scenes/         scene backdrop imagery component
  ui/             shared primitives (Button, Container, SectionHeading)
  icons/          hand-rolled SVG set from the supplied asset pack
constants/        pricing matrix, content copy, scene/asset mappings
hooks/            bento/accordion state, price context
lib/              currency formatting
public/scenes/    curated scene imagery per section
```
