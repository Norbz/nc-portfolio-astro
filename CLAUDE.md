# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (localhost:4321)
npm run build        # Dither images then build (runs dither-images first)
npm run dither-images  # Process source images → Bayer-dithered output
npm run preview      # Preview production build
```

No lint or test commands exist in this project.

> **Important:** If a project image is missing from `src/assets/imgs/projects/`, run `npm run dither-images` — source images live in `src/assets/src-imgs/projects/` and must be processed before build.

## Architecture

### Stack
Astro 5 static site, SCSS modules, no client-side framework. Icons via `astro-icon` + Iconify (`lucide:*`, `uil:*`). Deployed to GitHub Pages on release via release-please.

### Content collections (`src/content.config.ts`)
All data is file-based, no CMS:
- `projects` — `data/projects.json`
- `hardware` — `data/hardware.json` (5 devices, days-based lifecycle schema)
- `services` — `data/services.json` (GitHub, CDN, Claude Code)
- `skills` — `data/skills.json`
- `reports` — `data/reports/*.md` (glob, markdown with rich frontmatter)

### CO₂ computation (`src/utils/co2.ts`)
Pure build-time TypeScript. Implements the verified spreadsheet formula:
- **Longevity reward**: `effective_lifespan = max(estimated_lifespan_days, actual_days_owned_at_build_time)`
- Keeping a device longer than planned lowers its daily CO₂ figure
- Key exports: `computeDailyCO2`, `computeHardwareCO2ForProject`, `computeServiceCO2ForProject`

### Reports feature (`/reports`, `/reports/[id]`)
Each report `.md` frontmatter declares `hardware_used` (array of hardware IDs), `services_used`, `duration_days`, `accent` (hex color), `use_metrics` (manually entered). The dynamic page filters the collections, computes totals, and renders three sections: embodied (hardware + services), use energy (metrics grid + websitecarbon badge), and the markdown narrative body.

### Styling system
- All SCSS via `<style lang="scss">` in `.astro` files; global styles in `src/scss/`
- Global includes auto-imported via `@use "@includes" as *` (alias resolves to `src/scss/includes/`)
- Available everywhere without import: `$yellow`, `$black`, `$border`, `$mainFont`, breakpoint mixins, `set-color()`
- CSS custom properties for theming: `--mainColor` (default `$yellow`), `--textColor` (default `$black`)
- Per-report accent: `Layout.astro` accepts an `accent` prop that overrides `--mainColor` via inline style on `<html>`

### Design rules (enforce strictly)
- Hard borders only: `border: $border` (1px solid `--textColor`)
- Offset shadows, no blur: `box-shadow: 4px 4px 0 var(--textColor)`
- No rounded corners — ever
- No gradients, no glassmorphism, no second font
- Deliberate hover transitions only (not decorative)
- Inverted sections: `@include set-color(true)` swaps `--mainColor`/`--textColor`

### Accent color rules (enforce strictly)
- **One accent color per page/report — never two**. Think black-and-white photography with a single color pop.
- Default accent is `$yellow` (`#F2D94C`). Per-report accent overrides `--mainColor` via inline style on `<html>`.
- Accent must be **light enough to read black text on top** (used as background in inverted sections). Dark colors like `#2563eb` fail this — use lighter variants like `#60a5fa` instead.
- "High-contrast but not garish" — bold and intentional, like print ink, not screen glow.
- Good accent examples: green `#34d399`, orange `#fb923c`, purple `#a78bfa`, blue `#60a5fa`, default yellow `#f2d94c`
- Avoid: neon, pastels, dark shades (they break inverted text contrast), anything muted or desaturated

### Breakpoints (from `_rupture.scss`)
```scss
@include mobile()   // ≤ 400px
@include tablet()   // 401px–1049px
@include desktop()  // ≥ 1050px
@include above(720px)  // custom pixel value also works
```

### Layout structure
`Layout.astro` wraps all pages: sticky 60px header → `<main>` (2rem padding) → sticky `AppSticky` → footer. The `TwoColumnsSection.astro` component is used for the two-column sticky-title + content pattern seen throughout reports.

### Release flow
Merging to `main` triggers release-please (auto changelog + version bump PR). Publishing a GitHub release triggers the deploy workflow to GitHub Pages.
