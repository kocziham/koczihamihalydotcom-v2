# Fonts

Three families. All free, all on Google Fonts, all confirmed for Hungarian.

| Family | Role | Weights | Italic | Optical sizing |
|---|---|---|---|---|
| Source Serif 4 | Headlines & body | 300–700 (variable) | Yes | 8–60 pt (variable) |
| Inter | UI, nav, eyebrows, tag pills | 400, 450, 500, 600, 700 | No | — |
| JetBrains Mono | Tabular ledger marks | 400, 500 | No | — |

## Copy-pasteable `@import`

This is the single line used by all the mockups in this bundle. Drop it into the implementation's `<head>` or the top of `tokens.css`.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300..700;1,8..60,300..700&family=Inter:wght@400;450;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
```

Or as `@import` inside CSS:

```css
@import url("https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300..700;1,8..60,300..700&family=Inter:wght@400;450;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap");
```

`display=swap` lets the fallback render immediately and swap in the web font when ready — important for editorial content where reading shouldn't be blocked by network.

## Required subsets

| Subset | Required because |
|---|---|
| `latin` | Standard English coverage. |
| `latin-ext` | **Hungarian.** Contains `ő ű Ő Ű` and their precomposed forms. Without this, `ő` falls back to `ǒ` or a tofu glyph. |

Google Fonts ships both subsets by default for all three families above. If you self-host (e.g. via `fontsource`, `@fontsource`, or a build pipeline that subsets fonts) you must include `latin-ext`.

## Hungarian glyph confirmation

All three families have been verified to render the full Hungarian diacritic set:

```
á  é  í  ó  ö  ő  ú  ü  ű
Á  É  Í  Ó  Ö  Ő  Ú  Ü  Ű
```

QA test string for every page after font subsetting:

> *Árvíztűrő tükörfúrógép.* — The canonical Hungarian pangram. If `ű` and `ő` render as separate ASCII fallbacks instead of the proper Latin Extended-A glyphs, the subset is missing.

Also test small caps with diacritics (used on the first line of essay body):

> *ÁRVÍZTŰRŐ TÜKÖRFÚRÓGÉP.*

## Per-family notes

### Source Serif 4

- License: SIL Open Font License 1.1.
- Variable axes: `ital` (0–1), `opsz` (8–60), `wght` (300–700).
- We use the variable font directly, not a static cut. The optical-size axis matters at the 52 px hero size — letting the axis run free with `font-optical-sizing: auto` gives the display weight the right contrast.
- The italic descender on `y g j p q` is genuinely longer than the upright. The mockups include extra line-height (`1.22` on hero, `1.62` on body) to absorb this; don't tighten it.

### Inter

- License: SIL Open Font License 1.1.
- Used at 12–14 px almost exclusively. We rely on Inter's strong hinting at small sizes.
- We load `wght=450` because Inter has it and it sits beautifully between regular (400) and medium (500) for nav links and eyebrow labels. Keep the 450 weight in any subsetted build.
- No italic — the design never uses italic Inter.

### JetBrains Mono

- License: SIL Open Font License 1.1.
- Used only for ledger marks: essay numbers (`№ 008`), year labels (`2026`), section counts (`02 / 05`). Always at 12–13 px.
- We load weights 400 and 500. 500 is used for the accent-coloured `№ NNN` essay numbers; 400 for plain dates and counts.
- Tabular numerals are on by default in JetBrains Mono — no `font-feature-settings` required.

## What if a font fails to load?

The fallback stack on each family is intentional, not lazy:

```css
--font-serif: "Source Serif 4", "Source Serif Pro", Georgia, "Times New Roman", serif;
--font-sans:  "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
--font-mono:  "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
```

- Source Serif Pro (the predecessor name) catches systems with the old Adobe install. Georgia is the editorial fallback worth respecting — degrades gracefully.
- Inter degrades to the platform system sans. Acceptable.
- JetBrains Mono degrades to the platform mono. The tabular-numeral rendering may shift; live with it.

## Self-hosting (optional)

If the implementer wants to self-host (recommended for performance and privacy), pull from `@fontsource`:

```sh
npm i @fontsource-variable/source-serif-4 @fontsource-variable/inter @fontsource-variable/jetbrains-mono
```

…and import the `latin-ext` subset files explicitly. The token `--font-serif` etc. stay unchanged; only the `@import` is replaced.
