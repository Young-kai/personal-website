# DESIGN.md — Yang Yang Academic Profile

version: 1.0
name: Tania-inspired academic garden
description: A reading-first academic profile that combines Tania Rascia's clear digital-garden hierarchy and warm, restrained layout with Yang Yang's optical-instrument identity, Chinese-first content, and evidence-heavy publication record.

## 1. Visual Theme & Atmosphere

The page should feel like a carefully maintained research notebook on the web: warm, direct, legible, and personal without becoming decorative. The reference is Tania Rascia's content-first digital garden—strong headings, compact navigation, narrow reading measures, plain CSS, clear light/dark surfaces—not a visual clone.

Three voice words: **studious, lucid, instrument-precise**.

- Prioritize reading order and evidence over landing-page spectacle.
- Use generous vertical rhythm and a bounded content canvas.
- Keep the pulse trace, teal accent, academic portrait, journal metadata, and Chinese/English mix as the site's own identity.
- Avoid card-on-card nesting, oversized empty hero space, tiny section labels, and decorative motion.

## 2. Color Palette & Roles

### Light — Research Paper

| Token | Value | Role |
|---|---:|---|
| `--paper` | `#F8F6EF` | Warm page canvas |
| `--surface` | `#FFFFFF` | Reading panels and cards |
| `--ink` | `#20242C` | Primary text |
| `--ink-muted` | `#5F6672` | Metadata and supporting text |
| `--soliton-teal` | `#087D75` | Links, active states, pulse trace |
| `--pulse-amber` | `#955A19` | Publication rank and status signal |
| `--hairline` | `#DED9CB` | Dividers and borders |

### Dark — Lab Evening

| Token | Value | Role |
|---|---:|---|
| `--bg` | `#111318` | Page canvas |
| `--bg-surface` | `#191C23` | Elevated reading surface |
| `--text` | `#ECEEF2` | Primary text |
| `--text-muted` | `#A3A8B2` | Metadata |
| `--accent` | `#57D5C7` | Links and active states |
| `--accent-2` | `#F0B15A` | Publication/status signal |
| `--border` | `#30343D` | Dividers and borders |

Color is functional. Teal marks navigation and actions; amber marks bibliographic importance. The three representative-publication cards may use teal, amber, and indigo side rules as quiet categorical accents; these colors must not spread into the general interface.

## 3. Typography Rules

Use a sans-led hierarchy inspired by the reference site's Outfit/system-sans clarity, adapted for Simplified Chinese.

- **Display and headings:** `Outfit`, then `Noto Sans SC`, system sans. Weight 650–700. Compact line-height and slightly negative tracking.
- **Body:** `Noto Sans SC`, `PingFang SC`, `Microsoft YaHei`, sans-serif. Weight 400. Minimum 16px.
- **Personal motto only:** `Noto Serif SC`, serif, italic/muted.
- **Metadata:** `IBM Plex Mono`, then a system monospace. Use only for dates, volume/page data, counters, and compact utility labels.

| Role | Desktop | Mobile | Line height |
|---|---:|---:|---:|
| Hero name | `clamp(3.25rem, 6vw, 4.75rem)` | fluid | 1.02 |
| Section heading | `clamp(1.65rem, 2.4vw, 2.05rem)` | fluid | 1.2 |
| Card heading | `1.125rem` | `1.05rem` | 1.4 |
| Body | `1rem` | `1rem` | 1.7 |
| Long-form body | `1.0375rem` | `1rem` | 1.8 |
| Metadata | `.8125–.875rem` | `.875rem` | 1.55 |

No content-critical text may be smaller than `.875rem` on phones.

## 4. Component Styling

- **Navigation:** 60px sticky bar, warm paper surface, one-pixel divider, compact active underline. Desktop links remain on one row; mobile uses a full-width scrolling drawer with 48px rows.
- **Buttons:** 44px minimum target, 6px radius, quiet border. Primary is teal-filled; secondary is transparent. No large pills.
- **Section headings:** prominent sans text with a short teal rule. They must read as headings, not tiny metadata labels.
- **Profile card:** the portrait uses a single frosted caption pane with name and role. It is a static identity card rather than an interactive control. Its soft hand-painted backdrop switches between pale blue/cream in day mode and near-black/charcoal/teal in dark mode. Frosted glass is permitted only here as a deliberate personal-profile treatment.
- **Information panel:** one clean surface with a subtle border. Do not wrap internal subsections in additional cards.
- **Timeline:** reading-width column, hairline rail, teal nodes, date as secondary metadata.
- **Project cards:** restrained white surfaces, 1px border, 8px radius, no visible shadow. Current project may carry stronger emphasis through border color, not scale.
- **Featured publications:** 16px radius and distinct 4px left rules—teal, amber, then indigo. Equal-height rows are not required; content rhythm is more important.
- **Publication list:** full-width evidence rows with authors, title, venue, and badges aligned by hierarchy. Dividers replace enclosing cards.
- **Inputs:** 16px text, 44px minimum height, warm surface, visible focus ring.

## 5. Layout Principles

Use two nested width systems, derived from the reference site's 760px reading measure:

- `--page-width: 1040px` for grids, publication lists, and panels.
- `--reading-width: 760px` for prose, timelines, section leads, and forms.

Desktop spacing:

- Section block: `clamp(4.5rem, 7vw, 6.5rem)`.
- Main horizontal gutter: 32px.
- Section heading to content: 32px.
- Card/grid gap: 20–24px.

Mobile spacing:

- Section block: 3rem.
- Horizontal gutter: 18px plus safe-area inset.
- Grids collapse to one column; two-column fact grids may remain until 420px.

The hero remains portrait + identity on desktop and stacks on tablet/phone. Long prose never stretches across the full grid. Alternate section backgrounds may separate chapters, but nested surfaces should remain sparse.

## 6. Depth & Elevation

Depth is conveyed primarily through surface tone and hairline borders.

- Default card shadow: none.
- Sticky navigation: one border plus an optional extremely soft shadow only when condensed.
- Hover: border-color change and at most 1px translation on fine pointers.
- Do not use glass blur outside the approved portrait caption, floating card stacks, large diffuse shadows, or gradient decoration.

## 7. Do's and Don'ts

### Do

- Make section titles and publication titles immediately scannable.
- Keep Chinese body text at comfortable reading size and line length.
- Preserve exact bibliographic content, authorship marks, rankings, and contact details.
- Use whitespace to group related evidence.
- Maintain light/dark hierarchy parity and WCAG AA contrast.

### Don't

- Do not clone Tania Rascia's pink palette, logo, sidebar content, or personal branding.
- Do not turn every section into a rounded card.
- Do not use tiny mono labels as primary headings.
- Do not reduce academic metadata below readable mobile sizes.
- Do not change the information architecture or remove content during the visual polish.

## 8. Responsive Behavior

- **Below 1020px:** switch desktop navigation to the existing mobile drawer; hero becomes one column; contact becomes one column.
- **Below 800px:** featured grids favor two columns only when each card remains at least 280px; otherwise one column.
- **Below 600px:** 18px gutters, 3rem section spacing, full-width hero actions, stacked project headers, publication rows become vertical.
- **Below 420px:** basic-information grid becomes one column.
- Maintain 44px touch targets, safe-area padding, `100dvh` menu limits, and no hover-only behavior.
- Verify at 320, 360, 390, 768, 1024, and 1440px, including phone landscape.

## 9. Agent Prompt Guide

Use this specification to polish the existing academic profile without changing its content or section order.

Implementation priorities:

1. Replace the serif-dominant heading hierarchy with Outfit/Noto Sans SC clarity; reserve serif for the motto.
2. Establish 1040px page width and 760px reading width.
3. Increase section-heading size and vertical rhythm across the page.
4. Reduce unnecessary card depth while preserving the approved featured-publication accent cards.
5. Keep responsive navigation, safe areas, touch targets, dark mode, and performance optimizations intact.

Reference sources: Tania Rascia's live website and official open-source `src/styles/style.css`; structure follows VoltAgent `awesome-design-md`'s nine-section DESIGN.md convention. The result must be recognizably Yang Yang's academic site, not a replica of the reference.
