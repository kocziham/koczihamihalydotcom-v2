# koczihamihaly.com

Personal editorial site for Kocziha Mihály, Head of Consulting at SMP Solutions. Bilingual (English/Hungarian), built with Astro, hosted on Railway.

## Stack

- **Framework**: Astro 4.x with TypeScript
- **Styling**: Tailwind CSS + custom CSS from design tokens
- **Content**: MDX essays with Astro content collections
- **Hosting**: Railway (Node SSR adapter, standalone mode)
- **Package manager**: pnpm

## Local development

### Install dependencies

```bash
pnpm install
```

### Run dev server

```bash
pnpm dev
```

Open http://localhost:3000. The site redirects `/` to `/en/` by default based on Accept-Language header.

### Build

```bash
pnpm build
```

Produces a production bundle ready for SSR. Preview with:

```bash
pnpm preview
```

## Content authoring

### Adding an essay

1. Create a new file in `src/content/writing/{en|hu}/` with a slug name, e.g. `src/content/writing/en/my-essay.mdx`.

2. Add frontmatter with required fields:

```yaml
---
title: Your essay title
slug: my-essay
date: 2026-05-26T09:00:00Z
description: One-line summary shown in essay listings.
pillar: ai-governance  # genai-banking | ai-governance | ai-consulting | data-foundations
language: en           # en | hu
draft: false           # Set to true to exclude from production
crossLanguageRef: paired-essay-slug-optional  # If this essay has a paired translation
---
```

3. Write the essay in Markdown/MDX. Supported elements:
   - Headings (h2, h3)
   - Paragraphs, blockquotes, lists
   - Inline code: `` `code` ``
   - Code blocks: ` ```language ... ``` `
   - Footnotes: `Text.[^1]` with `[^1]: Footnote text` at bottom
   - Emphasis: `*italic*`, `**bold**`

### Pairing translations

If you write an essay in English and then translate it to Hungarian:

1. Add `crossLanguageRef: hungarian-slug` to the English essay's frontmatter.
2. Add `crossLanguageRef: english-slug` to the Hungarian essay's frontmatter.

The language switcher will then show both languages available for that essay.

### Hungarian diacritics

All fonts (Source Serif 4, Inter, JetBrains Mono) ship with full Hungarian glyph coverage including `á é í ó ö ő ú ü ű`. No special markup needed; just type naturally.

Test string to verify font subsetting: *Árvíztűrő tükörfúrógép.*

## Design

All visual tokens live in `design-handoff/tokens/tokens.css` (canonical) and `design-handoff/tokens/tokens.json` (for build tooling). Components use semantic class names from `design-handoff/shared.css`.

**Do not hard-code colors, spacing, or typography values.** Reference tokens via CSS variables: `var(--color-accent)`, `var(--space-6)`, `var(--fs-19)`, etc.

Tailwind is configured to consume tokens at build time. Raw CSS uses `@import` directives.

## Deployment

### Prerequisites

- GitHub repository connected to Railway
- Node 20+ runtime selected in Railway settings

### Environment variables

Set these in Railway:

| Variable | Value | Notes |
|---|---|---|
| `SITE_URL` | `https://koczihamihaly.com` | Used for OG tags, sitemap, RSS |
| `PLAUSIBLE_DOMAIN` | `koczihamihaly.com` | Analytics domain (if using Plausible) |
| `NEWSLETTER_ENDPOINT` | Buttondown or other endpoint | For newsletter form (optional) |

### Deploy

1. Connect the repo to Railway
2. Set env vars in Railway dashboard
3. Railway auto-detects `astro build` in `package.json` and deploys

Cold deployments should complete in <2 min. The site runs in standalone SSR mode (`@astrojs/node` with `mode: standalone`).

### Healthcheck

Railway expects a 200 response on `/` within 30s of start. This is automatic.

## Architecture

```
src/
  pages/
    index.astro            → Root redirect to /en/ or /hu/
    en/
      index.astro          → Home page
      about.astro
      speaking.astro
      contact.astro
      writing/
        index.astro        → Writing index, filterable by pillar
        [slug].astro       → Individual essay page
      rss.xml.ts           → English feed
    hu/
      index.astro
      about.astro
      speaking.astro
      contact.astro
      writing/
        index.astro
        [slug].astro
      rss.xml.ts           → Hungarian feed
    rss.xml.ts             → Combined feed (all languages)
    404.astro
  content/
    writing/
      en/
        *.mdx              → English essays
      hu/
        *.mdx              → Hungarian essays
    config.ts              → Content schema + pillar labels
  layouts/
    BaseLayout.astro       → Main layout wrapper
  components/
    Header.astro
    Footer.astro
    EssayRow.astro         → Used on home + writing index
  lib/
    essays.ts              → Essay fetching, reading time
    i18n.ts                → Translation strings, language helpers
    locale.ts              → Accept-Language detection
  styles/
    global.css             → Tailwind + design tokens imports
    tokens.css             → Copied from design-handoff/
    shared.css             → Copied from design-handoff/
  design-handoff/
    tokens/                → Canonical design tokens
    shared.css             → Component stylesheet
    mockups-{desktop,mobile}/  → Reference mockups
```

## Notes

- **No build-time OG image generation** currently implemented. Use a placeholder or add Satori integration if needed.
- **No newsletter form** on the site by design. The Contact page is the sole subscription surface.
- **Language switcher** does NOT change URL; it swaps UI language sitewide via query param/state.
- **Reading progress bar** (2px accent line at top) only appears on essay pages; driven by scroll listener.
- **Dark mode is the default.** Light mode is fully designed but not the production default. Set `[data-theme="dark"]` on `<html>`.
