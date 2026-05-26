# Design decisions

This document explains *why* each visual choice was made. The implementer should not change these without consulting the designer (the author of this bundle) and the client.

---

## Palette

**Chosen: dark editorial. Near-black surface, warm off-white text, single muted blue accent.**

### Tokens

| Role | Light (default) | Dark (operational default) | Notes |
|---|---|---|---|
| `--color-paper` (page bg) | `#fbfaf6` | `#0a0c11` | Dark is faintly blue, not pure black, to avoid screen glare. |
| `--color-paper-raised` (cards, hovers) | `#ffffff` | `#11141b` | One step lighter than paper, used for hover surfaces only. |
| `--color-paper-sunken` (filter bar) | `#f4f1ea` | `#07080c` | One step deeper than paper. |
| `--color-text` (body) | `#0e1620` | `#f1f3f6` | Warm off-white in dark — pure white reads too clinical for editorial body text. |
| `--color-text-muted` (secondary) | `#4a5562` | `#8a92a0` | ~5.4:1 contrast on paper. |
| `--color-text-faint` (meta) | `#7a8390` | `#565d6b` | Used for dates, eyebrows, supporting metadata. Below body contrast on purpose. |
| `--color-rule` (hairline dividers) | `#e2dccb` | `#2e3440` | One pixel rules between rows, eyebrow dots, etc. |
| `--color-accent` (single accent) | `#5b7cfa` (indigo) | `#6b8cff` (indigo) | The only chromatic moment on the page. |
| `--color-accent-soft` | `#4d6cd9` | `#4d6cd9` | Receded variant for low-emphasis accent uses (subtle hover). |
| `--color-accent-strong` | `#3d5bbf` | `#8aa3ff` | Lifted variant for high-emphasis. |
| `--color-accent-wash` | `#e5ebff` | `#1c2440` | Selection background, footnote pill hover. |

### Rationale

The brief asked for two palette options leading with deep burgundy, ochre, or muted forest green on a cream background. After the first review the client rejected the cream surfaces outright ("the whole beige thing is making me vomit") and asked for a modern, minimalistic dark scheme with black and blue.

We took that direction literally:

- **Surface: near-black, faintly blue (`#0a0c11`).** Pure black (`#000`) on a high-density LCD has glare problems for long-form reading; a 2 % blue cast softens the edge without warming the surface.
- **Text: warm off-white (`#f1f3f6`).** Pure white reads as clinical / chat-app. The warm tint preserves an editorial sensibility on a near-black surface.
- **Accent: single muted indigo (`#6b8cff`).** This is the *only* hue in the system besides ink. It is used for: the italic accent word in the home statement, the active-nav underline, link underlines in body, footnote markers, the reading-progress bar, the brand mark accent rule, monospaced section numbers, and the end-of-essay `§` mark. Anywhere else it is a misuse.

### What was rejected

| Option | Why rejected |
|---|---|
| Cream + burgundy (initial proposal) | Client review, see above. |
| Pure white text on pure black | Too clinical for a long-form reading site; loses the editorial tone. |
| Multi-hue accent system (one per topic pillar) | Pillars are a structural concern, not a chromatic one. Tinting them would create a visual taxonomy the writing does not have. |
| Burgundy as accent on dark | Tested. Reads too "legal-tech-startup" against a near-black surface. |
| Bright cyan as accent (`#22d3ee`) | Available as palette B for the implementer, but rejected as default — too "developer dashboard" for the editorial register. |

---

## Typography

**Chosen: Source Serif 4 for headlines and body. Inter for UI and supporting marks. JetBrains Mono for ledger numbering.**

### Stack

```css
--font-serif: "Source Serif 4", "Source Serif Pro", Georgia, "Times New Roman", serif;
--font-sans:  "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
--font-mono:  "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
```

### Why this pairing

- **Source Serif 4** is variable, optical-size aware, and ships with both upright and italic across the 8–60 pt optical range. Its italic is genuinely beautiful at display sizes — important because the home statement and pull quotes lean on italic for emphasis. Free, Google Fonts-hosted, complete Latin Extended-A coverage. Reads slowly and well at the 19 px body size we use.
- **Inter** for UI — navigation, eyebrows, metadata, tag pills. Restrained, well-hinted at small sizes, full Hungarian coverage. The body text never uses Inter; it earns its place by *not* being everywhere.
- **JetBrains Mono** for tabular ledger marks — essay numbers (`№ 008`), year labels, section counts (`02 / 05`). The site uses these like a printed journal uses tabular numerals. Mono ties the dates and counts together visually without needing colour or weight to differentiate them.

### Sizes (scale, 16 px base, ~1.2 modular)

| Token | Size | Use |
|---|---|---|
| `--fs-12` | 12 px | Eyebrow labels, tag pills, ledger marks |
| `--fs-13` | 13 px | Meta info, secondary UI |
| `--fs-14` | 14 px | Default UI (nav, buttons) |
| `--fs-15` | 15 px | Footnote body |
| `--fs-19` | 19 px | **Body reading.** The single most important value. |
| `--fs-22` | 22 px | Italic deck, lede, list-row titles |
| `--fs-28` | 28 px | Essay subheads |
| `--fs-40` | 40 px | Essay title (fluid clamp) |
| `--fs-52` | 52 px | Home hero statement (fluid clamp) |

Body at 19 px / 1.62 leading / 640 px measure (`--measure-essay`) is the heart of the design. Hanging punctuation on `<p>` (where supported), small-caps on the first line of the opening paragraph, italic deck above the byline.

### What was rejected

| Option | Why |
|---|---|
| Newsreader | Available as alt in `[data-type="newsreader"]`. Beautiful but slightly more literary than the brief calls for. |
| EB Garamond | Available as alt. Too classical — the writing is contemporary. |
| System UI sans throughout | Cheap and ubiquitous. The brief is editorial, not utility. |
| Inter for body | Tested. Reads as a SaaS marketing page. Killed it. |

---

## Layout

### Measure

The essay reading column is **`--measure-essay: 40 rem (640 px)`**, set on the article body. This is the single most important typographic decision on the site and the one the implementer is most likely to be tempted to widen. Resist.

Wider measures (e.g. 800 px) increase reading-line length past the 60–75 char optimum at 19 px serif. The 640 px measure produces ~62 char lines, which is right.

### Other widths

| Token | Value | Use |
|---|---|---|
| `--measure-essay` | 40 rem (640 px) | Essay body, footnotes, related-essays tail |
| `--measure-wide` | 46 rem (736 px) | Reserved for hero photo or full-width figure inside essays |
| `--measure-index` | 52 rem (832 px) | Writing index, speaking, contact |
| `--shell-max` | 72 rem (1152 px) | Outer page max (home, about) |

### Grid

The site does not use a strict column grid. Layouts are flex- and grid-based, with **two recurring structures**:

1. **Two-column index row.** Date (left, monospaced numbering) + content (right). Used on home (latest writing), writing index, speaking. Always `grid-template-columns: 11ch 1fr auto;` on desktop.
2. **About split.** Reading column (left) + sticky portrait + meta sidebar (right). `grid-template-columns: 1fr 280px;` with generous gap.

### Spacing rhythm

4 px grid. Tokens from `--sp-1` (4 px) to `--sp-32` (128 px). The most-used values are `--sp-6` (24 px, inter-element gap), `--sp-10` (40 px, section break), `--sp-16` (64 px, major section break), and `--sp-20`/`--sp-24` for page-top breathing.

Vertical rhythm is hand-tuned, not strictly enforced from a baseline grid. Editorial type benefits from slight irregularity.

---

## Density and whitespace philosophy

The site is **deliberately under-dense**. Three operating principles:

1. **One screen, one idea.** The home page must be readable above the fold with the positioning statement, the three latest essay rows, and one CTA — and nothing else. No hero image, no testimonials, no logos.
2. **Whitespace is not waste.** Every section break uses at least `--sp-12` (48 px); every page top uses `--sp-16` to `--sp-20`. Don't compress these to fit more on screen.
3. **The text is the product.** Marketing pages decorate around the text. This site frames the text. The only decoration is hairlines, small monospaced ledger marks, and the single blue accent.

If a stakeholder asks to "fill the empty space" with images, badges, or social proof, the answer is no. That space is doing work.

---

## Bilingual handling — EN / HU

### How language is signalled visually

1. **Site-level language switch** sits in the top bar, far right, after a hairline divider: `EN / HU`. Inactive language is dimmed (`--color-text-faint`); active language is `--color-text`. The slash is a literal `/` glyph in `--color-rule`. No flag icons, no globe icon — the letters are the affordance.
2. **Per-essay language tag** sits in the essay-row metadata as a bordered uppercase pill: `[ EN · HU ]` for an essay available in both, `[ EN ]` or `[ HU ]` for one. This is the most reliable signal — readers learn it within two essays.
3. **Fallback notice** on the single-essay page: if the reader's chosen UI language is not available for that piece, an italic line directly under the byline reads "Available in English only." / "Csak magyarul érhető el." in the *chosen* language. We don't punish the reader for being curious.

### How the switch behaves

- Switching language **swaps all UI strings and essay metadata** (titles, decks, descriptions, tags) site-wide.
- It does *not* swap the URL or scroll position.
- For essays available in only one language, switching to the unavailable language still loads the essay in its original language with the fallback notice — better than a 404.
- Hungarian copy is real, not machine-translated. The implementer should treat the supplied HU strings as authoritative.

### Glyph coverage to verify

`á é í ó ö ő ú ü ű Á É Í Ó Ö Ő Ú Ü Ű` plus standard punctuation. All three loaded fonts ship these; the implementer should verify after font subsetting if a build pipeline is used.
