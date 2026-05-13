# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Поведение

- Отвечай **только на русском языке** во всех сообщениях, объяснениях и комментариях.
- Уровень экспертизы — **Senior Frontend Developer**: давай технически точные ответы без упрощений, используй профессиональную терминологию, предлагай оптимальные решения с учётом производительности, поддерживаемости и архитектурных компромиссов.

## Project Overview

GrandManor is a static furniture e-commerce website built with Pug templates, SCSS, and vanilla JavaScript. It targets Russian-speaking users and has three pages: homepage, catalog, and product detail.

## Commands

Use **pnpm** (not npm) as the package manager:

```bash
pnpm dev        # Start Vite dev server with hot reload
pnpm build      # Build to dist/
pnpm preview    # Preview production build locally
```

There is no linter or test suite configured.

## Tech Stack

- **Pug** — HTML templating (`.pug` files compiled by `vite-plugin-pug`)
- **SCSS** — styles with auto-imported mixins/variables via Vite preprocessor options
- **Vanilla JS** (ES modules) — no framework; Swiper.js is the only runtime dependency
- **Vite** — build tool with multi-page entry points (`index.html`, `catalog.html`, `product.html`)

## Architecture

### Component Structure

Each component lives in `src/components/<name>/` and typically contains:
- `<name>.pug` — markup (included into page templates)
- `<name>.scss` — styles (imported in `src/styles/main.scss`)
- `<name>.js` — interactivity (dynamically imported in `src/scripts/main.js`)

### Entry Points

- `src/index.pug` → `index.html` (homepage: slider, categories, catalog, promotions, brands, SEO text)
- `src/catalog.pug` → `catalog.html` (full catalog with desktop/mobile filter, category nav, product list)
- `src/product.pug` → `product.html` (product detail, minimal setup)

All pages extend `src/layouts/default.pug`.

### Styling

- `src/styles/main.scss` — master file; imports Swiper CSS, all component styles, global resets
- `src/styles/_mixins.scss` — font mixins (`tenor()`, `lato()`), typography scale (h1–h7, t1–t4), and responsive helpers (`tablet()` ≤1280px, `mobile()` ≤768px)
- `src/styles/_variables.scss` — currently empty, reserved for SCSS variables

Mixins and variables are auto-imported into every SCSS file via `vite.config.js` `preprocessorOptions`.

### Path Aliases (vite.config.js)

| Alias | Resolves to |
|---|---|
| `@` | `src/` |
| `@assets` | `src/assets/` |
| `@images` | `src/assets/images/` |
| `@components` | `src/components/` |

### Desktop/Mobile Splits

Several components have parallel desktop and mobile variants (e.g., `header` / `header-mobile`, `filter` / `filter-mobile`, `search` / `search-mobile`). Keep them in sync when making changes.

### JavaScript Entry

`src/scripts/main.js` dynamically imports all component JS modules. Add new component scripts here.

## Deployment

Push to `main` → GitHub Actions builds with Node 20 → deploys to `gh-pages` branch (GitHub Pages hosting).
