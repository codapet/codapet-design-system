# design-sync NOTES — @codapet/design-system

Repo-specific gotchas for `/design-sync`. Read before any re-sync.

## Pre-build setup (run every re-sync, after staging `.ds-sync/` scripts)

In order, from the repo root:
1. `npm ci` (if node_modules missing) and `(cd .ds-sync && npm i esbuild ts-morph @types/react @tailwindcss/cli tw-animate-css playwright)` (fresh clone only).
2. `node .ds-sync/node_modules/.bin/tailwindcss -i .design-sync/tw-input.css -o .design-sync/.cache/compiled-styles.css` — recompile `cssEntry` (gitignored).
3. `node .design-sync/gen-group-docs.mjs` — regenerate the gitignored group stubs (63).
4. `bash .design-sync/patch-build-script.sh` — re-apply the converter patches (verbatim group label + curated group order); staging overwrites them.
Then run `package-build` / `resync` as normal.

## Setup / build quirks

- **Package manager:** repo has BOTH `yarn.lock` and `package-lock.json`. The repo's own CLAUDE.md, npm scripts, and publish flow all use **npm** — install with `npm ci`. (yarn.lock appears to be a leftover.)
- **Entry:** `--entry ./dist/index.mjs` (package `module` field). `dist/` is committed/prebuilt; `cfg.buildCmd` = `npm run build:lib` (tsup + `cp src/styles.css dist/styles.css`).
- **node-modules:** repo-root `./node_modules` (single-package repo; `react` resolves there).

## CSS — Tailwind v4 (CRITICAL, not optional)

This is a **Tailwind v4** DS. The shipped `dist/styles.css` is just `cp src/styles.css` — it contains only `@theme` tokens + `@layer base`, **NO compiled utility classes**. Consumers are required to add `@import 'tailwindcss'` + `@source` to generate the utilities the components use (see AGENTS.md "Required setup"). So pointing `cssEntry` at the raw styles.css renders every component **unstyled**.

- **Fix:** we compile a full stylesheet (utilities scanned from `dist/` + `src/`, plus theme tokens) with the Tailwind CLI into `.design-sync/.cache/compiled-styles.css` and point `cfg.cssEntry` there.
- **The Tailwind input `.design-sync/tw-input.css` is COMMITTED (durable).** The compiled output `.design-sync/.cache/compiled-styles.css` is gitignored and **MUST be regenerated before every build** (it's what `cfg.cssEntry` points at). Re-sync command (from repo root, before `package-build`/`resync`):
  ```sh
  node .ds-sync/node_modules/.bin/tailwindcss -i .design-sync/tw-input.css -o .design-sync/.cache/compiled-styles.css
  ```
  (`.ds-sync/node_modules` carries `@tailwindcss/cli`; on a fresh clone re-run the `.ds-sync` dep install first.)
- Verified visually: Calendar renders fully styled; Switch shows the brand-blue toggle (brand token `--primary`/`--brand-normal` applies).

## Fonts (resolved — shipped from Google Fonts, latin subset)

The DS expects the host app to provide three font CSS vars via `next/font` (`--font-plus-jakarta-sans` sans, `--font-noto-serif` serif/display-italic, `--font-geist-mono` mono). They are undefined in a standalone bundle, so we ship them ourselves:

- woff2 (latin subset, variable fonts) downloaded into `.design-sync/fonts-src/` + a `fonts.css` (committed, durable). Wired via `cfg.extraFonts`.
- The `--font-*` `:root` definitions are injected via the `@layer base` block appended to `tw-input.css` so the compiled `cssEntry` defines them (the `@theme inline` mapping `--font-sans: var(--font-plus-jakarta-sans)` then resolves).
- Fonts are **Plus Jakarta Sans / Geist Mono / Noto Serif** — open-source (OFL), fetched from Google Fonts. If re-fetching, latin subset is enough for previews.

## Grouping (human Title Case headings)

Components are grouped via `cfg.docsDir = .design-sync/group-docs/` — one frontmatter-only `<Name>.md` stub per component (`category: <Group>`). Empty body → prompt.md still synthesizes from `.d.ts`. 15 groups: Actions, Badges, Data Display, Date and Time, Feedback, Forms, Inputs, Layout, Menus, Navigation, Overlays, Selection Controls, Selects and Dropdowns, Theme, Typography.

- **`group-docs/` is GITIGNORED and regenerated** — only the 63 kept components get a stub (the script `.design-sync/gen-group-docs.mjs` is committed and self-contained: it embeds the 63-component→group map, no build artifact needed). **Run `node .design-sync/gen-group-docs.mjs` before every build** (part of pre-build setup below). Add any new top-level component to the `GROUPS` map in that script.

- **REQUIRED PATCH — `.design-sync/patch-build-script.sh`:** the stock converter slugifies the category to lowercase-kebab (`data-display`), which shows as ugly lowercase headings in the DS pane. The patch makes it keep the frontmatter category **verbatim** as the group label (the uploaded format treats `@dsCard group=` as a human display label). **On every re-sync, run `bash .design-sync/patch-build-script.sh` AFTER the `cp -r ... .ds-sync/` staging step and BEFORE building** — staging overwrites the patched file. (Committed + idempotent; prints "already patched" if re-run.)
- **No `&` in group labels:** `emit` HTML-escapes `&`→`&amp;` in the `@dsCard` comment, which would display literally if the pane doesn't decode entities. So "Date and Time" / "Selects and Dropdowns" (spelled out), not "&".
- **Group labels contain spaces** → component dirs/upload paths contain spaces (`components/Data Display/Button/...`). Verified the build/validate/render handle this; the pane reads the `@dsCard group` label.
- On re-sync, if the export set changed, regenerate stubs with `node .design-sync/gen-group-docs.mjs` (it currently reads `ds-bundle/components/general` from a docsDir-unset build — adapt to read `src/index.ts` if needed).

## Component scope (shadcn-style: 1 card per component)

289 exports total; **only the 63 top-level components get menu cards** (Button, Card, Dialog, Select, …) — matching the shadcn component list + CodaPet additions. The ~226 compound sub-parts (`AccordionContent`, `DialogTrigger`, `CardHeader`, `Heading*`, etc.) are **excluded as cards** via `cfg.componentSrcMap: {<SubPart>: null}` (226 entries, baked into config.json) so they don't bury the real components in the DS-pane menu.

- **Sub-parts remain fully importable** — the bundle is built from the dist entry, so `window.CodapetDesignSystem` still exposes all 310 exports. `DialogContent`, `CardHeader`, etc. work in code; they just have no standalone card. Each component's composition (with its sub-parts) is documented on the component's own `.prompt.md`.
- **User decision (first sync):** the flat 289-card menu was rejected as cluttered — restructured to 63 cards. If new top-level components are added upstream, add them to the keep set and regenerate the exclusion map (the keep list lived in `.design-sync/.cache/author-scope.json`; the exclusions are now durable in config.json's `componentSrcMap`).
- All 63 have authored, graded-good previews (sub-parts composed inside their parent's preview).

## Known render warns (triaged — NOT new issues)

These are floor-card / by-nature-tiny components; expected, non-blocking. A re-sync seeing these is fine:

- `[RENDER_BLANK]` sub-parts (stay floor cards): `InputOTPSeparator`, `BreadcrumbEllipsis`, `PaginationEllipsis`, `SidebarMenuSkeleton` — render as small/empty by design.
- `[RENDER_THIN] ThemeProvider` — context-only provider, 0px height, no visual. Floor card.
- `[TOKENS_MISSING]`/`tokens … missing` for `--radix-navigation-menu-viewport-height` / `--radix-navigation-menu-viewport-width` — set at RUNTIME by Radix NavigationMenu; expected absent in static scrape.
- Avatar/Progress/ProgressBar/Checkbox/Slider also flagged blank when unauthored — these ARE top-level and get authored previews (warn clears once authored).

## Authored previews (63 top-level components)

- Authored `.design-sync/previews/<Name>.tsx` for all 63 top-level components (see config author scope). Each imports from `@codapet/design-system`; icons from `lucide-react`. Realistic CodaPet (in-home pet vet care) content.
- **Preview-only runtime deps** that must resolve from `node_modules` in the preview build: `lucide-react` (icons, used widely), `react-hook-form` (Form.tsx — `useForm()`), `recharts` (ChartContainer.tsx). All are DS deps already installed.
- **`cfg.overrides` cardMode decisions** (presentation only — grades carry across rebuilds):
  - `column` (wide, all stories kept full-width): Carousel, ProgressBar, NavigationMenu, Checkbox, DisplayHeading.
  - `single` + primaryStory + viewport (portal/overlay content that escapes the grid): Dialog, AlertDialog, Drawer, Sheet, SmartDialog, Popover, HoverCard, Tooltip, DropdownMenu, Menubar, Select, DropdownSelect. Only the primaryStory cell shows in the product card (other cells still exist + are graded); this is the sanctioned remedy for portal content.
- **ThemeToggle** preview wraps itself in `ThemeProvider` (needs `next-themes` context) — self-contained, renders a small sun icon button.
- **Calendar/DateInput/DateRangeInput/TimeInput** are controlled — previews pass a fixed value + no-op setter.

## Known render warns (authored) — triaged, NOT new

- `[RENDER_THIN] Toaster` — Toaster is the toast HOST region; it renders empty statically (visible surface is the `toast()` call). Authored intentionally minimal. Benign.
- **ContextMenu** renders the styled trigger target only — Radix right-click menus can't be forced open inline (no `open`/`defaultOpen`/`value` prop). Full menu composition is in its `.prompt.md`. Graded good as the trigger.
- (Earlier floor-card blanks `InputOTPSeparator`/`BreadcrumbEllipsis`/`PaginationEllipsis`/`SidebarMenuSkeleton` + `[RENDER_THIN] ThemeProvider` remain — see "Known render warns" above.)

## Re-sync risks (watch-list)

- **Compiled CSS (`cssEntry`) is gitignored and must be recompiled before every build** — the biggest re-sync footgun. The input `tw-input.css` IS committed, but the compiled `.cache/compiled-styles.css` is not; a build run without regenerating it ships unstyled or fails. (See CSS section for the one-line recompile.)
- **Fonts pinned to a manual fetch** — `fonts-src/` woff2 are committed, so re-sync is stable, but they won't track upstream font updates. Latin subset only (no CJK/cyrillic/vietnamese glyphs in previews).
- **Grouping is derived, not from real docs** — `gen-group-docs.mjs` uses a hardcoded name→group rule table. New components fall to `Components` group until a rule is added. Re-run the generator + add rules when exports change.
- **Author scope was top-level-only** — the ~225 sub-part floor cards are the standing offer for incremental authoring on future syncs.
