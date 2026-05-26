# koczihamihaly.com — design handoff

This bundle is the complete design specification for **koczihamihaly.com**, the personal site of Kocziha Mihály (Head of Consulting, SMP Solutions). It is editorial in tone — closer to a journal than a SaaS product — and bilingual (English / Hungarian). The aesthetic is deliberately restrained: serif body type at a slow reading measure, near-black surface with a single blue accent, hairline rules, monospaced ledger marks. Nothing flashy.

The site reads, in its final dark state, like a thinking person's notebook rather than a consultancy. That is the brief.

## What this bundle is for

A developer (the implementer) takes this folder and builds the production site from it. They should never need to ask you to clarify a token, a font weight, or a component anatomy — every decision is captured here.

## How the bundle is organized

| Path | Role |
|---|---|
| `README.md` | This file. Orientation. |
| `decisions.md` | Why each choice was made; what was rejected. |
| `tokens/tokens.css` | **Canonical** design tokens as CSS custom properties. Source of truth. |
| `tokens/tokens.json` | The same tokens, flat JSON, for build tooling (Tailwind config, design-token pipelines). |
| `fonts/fonts.md` | Font sources, weights, subsets, Hungarian coverage verification, copy-pasteable `@import` block. |
| `components.md` | Per-component anatomy, states, accessibility notes. |
| `shared.css` | Portable component stylesheet. Imports `tokens/tokens.css`. Drop directly into the implementation. |
| `mockups-desktop/*.html` | Five static reference pages at desktop layout. |
| `mockups-mobile/*.html` | Four static reference pages at 390 px. |

## How the implementer should consume this

1. **Tokens are canonical.** Anything visual in the production site must resolve to a token. If a layout calls for a colour, type size, or spacing value not in `tokens.css`, that is a design gap — flag it, do not invent.
2. **`shared.css` is portable.** Its class names are semantic and component-scoped (`.essay`, `.essay-meta`, `.pillar-tag`). Drop it into the implementation. Do not retheme it.
3. **The HTML mockups are reference, not source.** They show the intended output for each page, with realistic content (long titles, Hungarian diacritics in headings and body, footnotes, blockquotes, code-like inline elements). The implementer rebuilds these pages in the production framework, using `shared.css` and the tokens.
4. **Light is the CSS default; the operational default is dark.** Tokens at `:root` define the light scheme. `[data-theme="dark"]` defines the dark overrides. The mockups ship with `data-theme="dark"` on the `<html>` element, because that is the chosen production default. Light is supplied as a fallback / accessibility option; it is fully designed but not the canonical look.

## Intentionally unstyled / left for implementation

- **JavaScript behaviour.** The mockups are static. The implementer is responsible for: language switcher (EN / HU toggle in the bar), filter pills on the writing index, reading-progress bar on essay pages, and SPA navigation if used. The `shared.css` already styles all of these elements; only the behaviour is missing.
- **Routing.** Hash, history, or framework routing is the implementer's choice. The mockups link cross-page via plain relative `href`s for demo purposes.
- **Real content.** All copy in the mockups is placeholder, including Mihály's biography and essays. Real content will be supplied separately.
- **The portrait on the About page.** The mockup uses a placeholder slot. A final head-and-shoulders photo will be supplied as a JPG at 1× ≥ 640 px wide; the implementer drops it in.
- **Sitewide animation.** Restrained transitions only (link colour fades, hover background of list rows). No scroll-jacking, parallax, or page transitions. The `--dur-*` tokens are provided; everything else is intentionally absent.
- **Forms.** The Contact page has no form by design. Do not add one.

## Hungarian support

Source Serif 4, Inter, and JetBrains Mono all ship with the Latin Extended-A range required for Hungarian (`á é í ó ö ő ú ü ű` and their capitals). See `fonts/fonts.md` for the verified `@import` line and subset declarations. Every mockup includes Hungarian copy somewhere — verify diacritic rendering as part of QA.

## Accessibility floor

- All text must clear WCAG AA against its background (4.5:1 for body, 3:1 for large text). The token contrasts are verified in `decisions.md`.
- Every interactive element needs a visible `:focus-visible` ring. The token `--focus-ring` is provided.
- The reading-progress bar must respect `prefers-reduced-motion`. The mockups use a 80 ms width transition; under reduced-motion this should resolve to no transition.

Build with care. The audience is senior bankers and the regulator-adjacent crowd in Hungary; the site should feel like the writer is serious about the work.
