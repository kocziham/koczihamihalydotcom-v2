# Components

Per-component documentation. Anatomy is given as the canonical class names from `shared.css`. States listed only where they exist.

> **General accessibility floor:** every interactive element must be reachable by keyboard and have a visible `:focus-visible` outline using `--focus-ring`. Click handlers on non-button elements (`<a>` with no `href`, `<div onclick>`) are forbidden in production — use `<button>` or `<a href>`.

---

## Header (`.bar`)

The top bar. Sticky, full width, hairline border below.

**Anatomy**

```
<header class="bar">
  <div class="bar-inner shell">
    <a class="brand" href="/">
      <span class="brand-name">Kocziha Mihály</span>
      <span class="brand-role">Head of Consulting · SMP Solutions</span>
    </a>
    <nav class="nav">
      <a class="nav-link is-active" href="/writing">Writing</a>
      <a class="nav-link" href="/about">About</a>
      <a class="nav-link" href="/speaking">Speaking</a>
      <a class="nav-link" href="/contact">Contact</a>
      <div class="lang-switch">
        <button class="is-active">EN</button>
        <span class="sep">/</span>
        <button>HU</button>
      </div>
    </nav>
    <button class="nav-toggle" aria-label="Open menu">…</button>
  </div>
</header>
```

**Decoration**

- A 2 px wide `--color-accent` vertical mark sits to the left of `.brand`, inset 4 px from top and bottom. This is the only branding element besides the wordmark.

**States**

| Element | Default | Hover | Active | Focus |
|---|---|---|---|---|
| `.nav-link` | `--color-text-muted` | `--color-accent`, no underline | `--color-text`, 1 px `--color-accent` underline `-2px` below | `--focus-ring` |
| `.lang-switch button` | `--color-text-faint` | `--color-text-muted` | `--color-text` | `--focus-ring` |

**Spacing**

- Inner padding: `--space-4` top/bottom. Min-height `64px` desktop, `56px` mobile.
- Gap between brand and nav: `flex` `space-between`.
- Gap between nav links: `--space-8` (32 px) desktop.

**Mobile (≤820 px)**

- Nav links hidden. `.nav-toggle` (hamburger) shown.
- Tapping `.nav-toggle` opens `.nav-mobile` — a fixed full-viewport overlay with serif 32 px links stacked, and the language switch at the bottom.

**Accessibility**

- The brand link must have an accessible name (the visible `Kocziha Mihály` text qualifies).
- The hamburger needs `aria-expanded` toggled in JS.
- Active nav link should have `aria-current="page"`.

---

## Footer (`.foot`)

Three columns, minimal. Hairline rule above.

**Anatomy**

```
<footer class="foot">
  <div class="foot-inner shell">
    <div class="foot-col">
      <div class="foot-mark">Kocziha Mihály</div>
      <div>Head of Consulting · SMP Solutions</div>
      <div>© 2026 · koczihamihaly.com</div>
    </div>
    <div class="foot-col">
      <a href="/writing">Writing</a>
      <a href="/about">About</a>
      <a href="/speaking">Speaking</a>
      <a href="/contact">Contact</a>
    </div>
    <div class="foot-col">
      <a href="mailto:mihaly@koczihamihaly.com">mihaly@koczihamihaly.com</a>
      <a href="https://www.linkedin.com">LinkedIn</a>
      <a href="/rss">RSS</a>
    </div>
  </div>
</footer>
```

**Spacing**

- `margin-top: --space-32` (128 px) from the previous section.
- Inner padding: `--space-12 0 --space-16`.

**States**

- All footer links: hover → `--color-accent`.

---

## Language switcher (`.lang-switch`)

The site-level EN / HU toggle that sits in the header. Two buttons with a literal `/` separator. No flag icons.

**Anatomy**

```
<div class="lang-switch">
  <button class="is-active">EN</button>
  <span class="sep">/</span>
  <button>HU</button>
</div>
```

**Visual rules**

- Both buttons share the same baseline. Inactive: `--color-text-faint`. Active: `--color-text`.
- The `.sep` slash is `--color-rule` (very dim).
- A 1 px left border separates the switcher from the nav by `--space-4`.

**Behaviour (implementer)**

- Toggling either button swaps the entire UI language sitewide (see `decisions.md` § Bilingual handling).
- The URL must NOT change on language toggle. Use a `lang` query param or local state.
- Set `<html lang>` to match the active language.

---

## Essay card / row (`.essay-row`, `.index-row`)

The repeating list row used on home (latest writing) and the writing index. Two variants share the same skeleton; the difference is just a wider date column on the index.

**Anatomy (home version, `.essay-row`)**

```
<a class="essay-row" href="/essay/model-risk">
  <div class="essay-row-date">14 May 2026</div>
  <div>
    <div class="essay-row-title">Model risk after the foundation model</div>
    <div class="essay-row-desc">The MNB and ECB both updated…</div>
  </div>
  <div class="essay-row-meta">
    <span class="tag-pillar">Model Risk</span>
    <span class="tag-lang">EN · HU</span>
  </div>
</a>
```

**Anatomy (index version, `.index-row`)** — adds an essay number above the date.

```
<a class="index-row" href="/essay/model-risk">
  <div class="index-row-date">
    <div class="index-row-num">№ 008</div>
    <div>2026.05.14</div>
  </div>
  <div>
    <div class="index-row-title">…</div>
    <div class="index-row-desc">…</div>
  </div>
  <div class="index-row-meta">
    <span class="tag-pillar">…</span>
    <span class="tag-lang">…</span>
  </div>
</a>
```

**States**

| State | Background | Title colour |
|---|---|---|
| Default | transparent | `--color-text` |
| Hover | `--color-paper-raised` (mixed at 60 % toward transparent) | `--color-accent` |
| Focus | as default + `--focus-ring` | `--color-text` |

**Grid**

- Home: `grid-template-columns: 10ch 1fr auto;`
- Index: `grid-template-columns: 11ch 1fr auto;` (number column needs the extra char).

**Spacing**

- Vertical padding inside each row: `--space-5`.
- Bottom border: 1 px `--color-rule`.

**Mobile**

- Stacks to single column. `.essay-row-meta` and `.essay-row-date` reorder above the title.

---

## Pillar tag (`.tag-pillar`)

The topic label for an essay. Used inline next to a date or in essay metadata.

**Anatomy**

```
<span class="tag-pillar">AI Governance</span>
```

**Visual rules**

- Always uppercase, `--tracking-wider` letter-spacing.
- `font-size: --fs-12`. `font-family: --font-sans`.
- Colour: `--color-accent`. (This is the only place outside links where the accent appears as text colour.)
- `white-space: nowrap`. `flex-shrink: 0`.

There is no hover state — the tag is informational, not interactive.

---

## Language tag (`.tag-lang`)

A bordered pill showing which language(s) an essay is available in.

**Anatomy**

```
<span class="tag-lang">EN · HU</span>
<!-- or -->
<span class="tag-lang">HU</span>
```

**Visual rules**

- Always uppercase, `--tracking-wider`.
- `font-size: 10px` (one tick smaller than `--fs-12` — this is the only place we use a hand-set sub-token).
- 1 px border in `--color-rule-strong`, `--radius-1` corners, `padding: 2px 7px`.
- Colour: `--color-text`.
- `white-space: nowrap`. `flex-shrink: 0`.

---

## Footnote marker (`sup.fn`) and footnotes block (`.footnotes`)

Two pieces. The marker lives inline in essay body; the footnotes block lives at the foot of the essay column.

**Marker anatomy**

```
…doing more work than most people realise.<sup class="fn">1</sup>
```

**Marker rules**

- Renders as a small circular outline with the number inside.
- `font-family: --font-mono`. `font-size: 0.62em` (relative to body). `font-weight: 500`.
- 1 px border in `--color-accent`, `border-radius: 999px`, `padding: 0 4px`.
- `vertical-align: super`. `position: relative; top: -0.4em`.
- Hover: `background: --color-accent-wash`.

**Block anatomy**

```
<aside class="footnotes" aria-label="Footnotes">
  <h3>Footnotes</h3>
  <ol>
    <li id="fn-1">The 2017 MNB guidance defines a model as …</li>
    <li id="fn-2">In conversations with model-risk leads …</li>
  </ol>
</aside>
```

**Block rules**

- Sits below `.essay-body`, separated by `--space-16` margin and a 1 px `--color-rule` top border.
- Max-width matches `--measure-essay`.
- Body type: serif, `--fs-15`, `line-height: 1.55`, `--color-text-muted`.
- `ol li::marker` is `--color-accent` — the only chromatic accent in the block.

**Behaviour (implementer)**

- Clicking a marker should jump to its corresponding `<li id="fn-N">`. Use `<a href="#fn-N">` wrapping the sup.
- Each footnote should include a `↩` return link to the marker.

---

## Newsletter form

**There is no newsletter form on this site.** The brief explicitly omits it. If a stakeholder requests one, escalate before implementing. (The Contact page is the sole subscription/contact surface, and it carries no form by design — only email + LinkedIn + RSS.)

---

## Next / previous essay nav (`.essay-prevnext`)

A two-column row at the foot of any single-essay page.

**Anatomy**

```
<nav class="essay-prevnext" aria-label="Adjacent essays">
  <a href="/essay/prev-slug">
    <span class="label">← Previous</span>
    <span class="title-link">DORA is quietly reshaping vendor selection</span>
  </a>
  <a class="next" href="/essay/next-slug">
    <span class="label">Next →</span>
    <span class="title-link">What the second line actually does about AI</span>
  </a>
</nav>
```

**Rules**

- Two equal columns, right column right-aligned (`.next`).
- Hairline rule above, `--space-12` margin, `--space-8` padding-top.
- `.label`: uppercase, `--fs-12`, `--tracking-wider`, `--color-text-faint`.
- `.title-link`: serif, `--fs-19`, `--color-text`. Hover → `--color-accent`.

**Edge cases**

- If there is no previous or next essay, render an empty `<div />` to preserve the grid — do not collapse the column.

---

## Empty state — Speaking page (`.speak-empty`)

The Speaking page must look intentional even when nothing is scheduled. This empty state is the proof.

**Anatomy**

```
<section class="speaking-section">
  <div class="speaking-section-head">
    <span class="label">Upcoming</span>
    <span class="count">00 / 05</span>
  </div>
  <div class="speak-empty">
    Nothing on the calendar at the moment.
    <span class="speak-empty-cta">
      To propose an event, <a href="/contact">write to me</a>.
    </span>
  </div>
</section>
```

**Rules**

- The body line is italic serif, `--fs-19`, `--color-text-faint`. Not greyed out into oblivion — readable.
- The CTA line sits below with `display: block; margin-top: --space-3` — a single hairline route, no button.
- A 1 px `--color-rule` rule sits *below* the block so it still divides the section visually.
- The `.speaking-section-head` count (e.g. `00 / 05`) reads as `<upcoming-count> / <total>`. Show it even at zero — it communicates that the page is structured, not broken.

---

## Reading progress (`.progress`)

A 2 px accent line at the very top of the viewport, advancing with scroll. Only used on essay pages.

**Anatomy**

```
<div class="progress" aria-hidden="true"></div>
```

**Rules**

- Position fixed, `top: 0; left: 0; height: 2px; width: 0`.
- Background `--color-accent`. `z-index: --z-progress`.
- Width updated by scroll listener: `width = (scrollTop / (scrollHeight - clientHeight)) * 100%`.
- Width transition: `width 80ms linear` — gated on `prefers-reduced-motion: no-preference`.

**Accessibility**

- `aria-hidden="true"`. Purely decorative.

---

## Section ornament (`.ornament`)

A short hairline + centred label + hairline, used to separate major sections within a page.

**Anatomy**

```
<div class="ornament">
  <span class="ornament-mark">2026</span>
</div>
```

**Rules**

- Centred horizontal hairlines either side, `--color-rule`.
- The mark itself is `--font-serif`, `--fs-15`, letter-spaced `0.4em` (Caps tracking).
- Max-width `32rem`, margin `--space-12` top and bottom.

Use sparingly — at most twice per page.

---

## Tag dot separator (`.tag-dot`)

A 3 × 3 px filled circle, `--color-rule-strong`, used to separate eyebrow items.

**Anatomy**

```
<span class="tag-dot" aria-hidden="true"></span>
```

Always `aria-hidden`. Adds visual rhythm to comma-style metadata: `Pillar · Date · Lang · Reading time`.

---

## Filter pill (`.filter-pill`)

Used on the writing index for language and pillar filtering.

**Anatomy**

```
<button class="filter-pill is-active">All</button>
<button class="filter-pill">EN</button>
<button class="filter-pill">HU</button>
```

**States**

| State | Border | Background | Text |
|---|---|---|---|
| Default | 1 px `--color-rule` | transparent | `--color-text-muted` |
| Hover | 1 px `--color-text` | transparent | `--color-text` |
| Active | 1 px `--color-text` | `--color-text` | `--color-paper` |
| Focus | as default + ring | — | — |

**Rules**

- `border-radius: --radius-pill`. Padding `5px 11px`.
- `font-family: --font-sans`, `font-size: --fs-13`, `font-weight: 450`.

---

## Essay end mark (`.essay-end`)

A centred `§` flanked by two short hairlines, placed after the last paragraph of an essay body.

**Anatomy**

```
<div class="essay-end" aria-hidden="true">
  <span class="essay-end-mark">§</span>
</div>
```

**Rules**

- Flex row, `--space-5` gap. Hairlines flex-grow with `max-width: 80px` each.
- Mark: serif, italic, `--fs-22`, `--color-accent`.
- Always aria-hidden — purely typographic.

---

## Eyebrow / metadata row (`.essay-eyebrow`)

A horizontal beat of small uppercase metadata above an essay title.

**Anatomy**

```
<div class="essay-eyebrow">
  <span class="essay-num">008</span>
  <span class="tag-dot"></span>
  <span class="tag-pillar">Model Risk</span>
  <span class="tag-dot"></span>
  <span class="tag">14 May 2026</span>
  <span class="tag-dot"></span>
  <span class="tag-lang">EN · HU</span>
  <span class="tag-dot"></span>
  <span class="tag">14 min read</span>
</div>
```

**Rules**

- Flex, `flex-wrap: wrap`, gap `--space-3`.
- Every child has `white-space: nowrap` and `flex-shrink: 0` so items wrap as whole units, not mid-word.
- The `.essay-num` carries a `№` prefix via `::before` (do not include the № glyph in the data — it's part of the visual treatment).
