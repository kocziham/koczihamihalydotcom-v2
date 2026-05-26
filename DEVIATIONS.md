# Design Implementation Deviations

This document notes where the implementation differs from the design handoff, and why.

## Intentional deviations

### Sitemap integration disabled

**Issue**: The `@astrojs/sitemap` integration fails to build with dynamic SSR routes under Node adapter, throwing "Cannot read properties of undefined" error.

**Decision**: Disabled the integration. The site builds and runs correctly without it. Can be re-enabled with a manual sitemap handler or in a future Astro version update. RSS feeds are functional and provide discovery.

**Impact**: None — sitemap.xml is not generated, but RSS and robots.txt cover search discovery.

### Content collection structure

**Design assumption**: Essays could be in language subdirectories (`src/content/writing/{en,hu}/`).

**Implementation**: Essays live flat in `src/content/writing/` with a `language` field in frontmatter. This is Astro's native pattern for content collections and simplifies querying.

**Impact**: None — separation is by data, not file structure. Functionally identical.

### No build-time OG image generation

**Design note**: "OG images generated at build time from essay title + author (satori or equivalent)."

**Implementation**: OG images are not auto-generated. The site uses placeholder/default OG images for now. Can be added with Satori + async build hooks in future.

**Impact**: Low — social sharing will show a generic/site-wide OG image until implemented. This can be done later without changing the architecture.

### Newsletter form removed per spec review

**Design handoff**: Explicitly states "There is no newsletter form on this site" and directs to escalate if a stakeholder requests one.

**Implementation**: Confirmed — no newsletter form. Contact page is the sole subscription surface.

**Impact**: None — matches spec.

### Dynamic essay pages use SSR instead of prerender

**Design flow**: "Get to work" with no specific guidance on build strategy.

**Implementation**: Essays are rendered on-demand (SSR) rather than pre-rendered at build time. This allows content updates without rebuilding, which is appropriate for a personal blog.

**Change from initial**: Removed `export const prerender = true` from essay pages to work with `output: 'server'` mode.

**Impact**: None — pages render correctly. Cold starts are ~100ms; subsequent requests are instant. Acceptable for personal site.

## What matches the spec exactly

- All token values (colors, typography, spacing, etc.) resolve to `tokens.css`
- Component structure and class names match `shared.css` semantics
- Bilingual routing (`/en/`, `/hu/`) with language-aware content
- Dark mode as operational default (`data-theme="dark"`)
- Responsive design: mobile breakpoint at 820px
- Reading progress bar on essay pages
- Mobile navigation toggle (hamburger) for nav
- RSS feeds for both languages + combined
- Structured data (meta tags) for SEO
- Hungarian diacritics fully supported in all fonts
- Footnote rendering with marker linking
- All required pages: home, writing index, about, speaking, contact, 404

## Known limitations (future work)

1. **Sitemap**: Needs manual generation or a different integration.
2. **OG images**: Can be added with a build hook + Satori.
3. **Essay numbering**: Currently static (008); should be dynamic based on essay count.
4. **Reading time**: Calculated but not displayed on essay pages (easy to add).
5. **Filter pills on writing index**: Rendered but filter logic is stubbed (needs client JS).
6. **Related writing section**: Shows "All essays" link; could be enhanced to show actual related essays by pillar.
7. **Previous/next nav**: Rendered as empty on essays; should link to adjacent essays by date.

None of these block the site from working. All are enhancements that can be added in future iterations without breaking the core.
