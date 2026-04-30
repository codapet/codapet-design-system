# AGENTS.md — `@codapet/design-system`

Guidance for AI coding agents working in **consumer codebases** that import `@codapet/design-system`. Read this before reaching for shadcn docs or muscle memory — most things are the same, but a handful of defaults and APIs are not, and the install/publish model is different.

> This file is published with the npm package. Consumer repos pull it into agent context via `@./node_modules/@codapet/design-system/AGENTS.md` in their own `CLAUDE.md` / `AGENTS.md`. Don't edit it in a consumer repo — fixes belong upstream in the design-system repo.

## Mental model

This is a **shadcn/ui-style** library (Radix primitives + cva variants + Tailwind), but it ships as a **single published npm package** — not copy-paste components. So:

- ✅ `import { Button } from '@codapet/design-system'`
- ❌ Don't `npx shadcn add ...`. Don't copy components into the consumer repo. Add new variants by extending via `className` or, if missing, propose them upstream.
- ✅ Most shadcn examples translate 1:1 — same `data-slot` attrs, same compound-component patterns (`Card` / `CardHeader` / `CardContent`, `Dialog.Trigger` / `Dialog.Content`, etc.).
- 'use client' is **already baked in** to every export by the build — never wrap design-system components in your own `'use client'` boundary just for that reason. RSCs that pass props down still work.
- ESM-only. If a consumer uses Jest, add the package to `transformIgnorePatterns` (or use Vitest, which handles it).
- Single entry: `from '@codapet/design-system'`. There are **no subpath component imports** — only `'@codapet/design-system'` and `'@codapet/design-system/styles'` exist.

## Required setup in a consumer (Tailwind v4)

In the app's global CSS:

```css
@import 'tailwindcss';
@source "../node_modules/@codapet/design-system/dist/**/*.{js,mjs,ts,tsx}";
@import '@codapet/design-system/styles';
```

The `@source` line is **mandatory** — without it Tailwind won't see the class names used inside the package and components render unstyled. Tailwind v3 consumers add the same path under `content` in `tailwind.config.js`.

Wrap the app in `<ThemeProvider>` (re-export of `next-themes` with `attribute="class"`, `defaultTheme="light"`, `enableSystem`, `disableTransitionOnChange` pre-set), and mount `<Toaster />` once at the root. Both come from the package.

Required font CSS variables (set on `<body>` or `<html>`): `--font-plus-jakarta-sans` (sans), `--font-noto-serif` (serif, used by display headings — italic), `--font-geist-mono`. Without these, `font-sans`/`font-serif`/`font-mono` fall back to the browser default.

## Differences from shadcn defaults

These are the foot-guns. Knowing them prevents most "why does my Button look wrong" loops.

### Button

- **Default `variant` is `primary`**, not `default`. There is no `default` variant. Available: `primary | secondary | tertiary | outline | ghost | ghost-secondary | ghost-destructive | link | destructive | destructive-secondary | destructive-tertiary`.
- **Default `size` is `lg` (h-12)**, not `default` (h-9). Sizes: `sm` (h-9) · `md` (h-10) · `lg` (h-12) · `icon` (size-8). For a typical inline action, you usually want `size="md"` — passing nothing gives you a chunky button.
- Has `cursor-pointer` baked in (shadcn doesn't).

### Input

- Custom `size` prop: `sm` (h-10) · `md` (h-12, default) · `lg` (h-14). All bigger than shadcn's h-9.
- Built-in `leftIcon`, `rightIcon`, `rightIconOnClick`, `error` props — don't wrap Input in your own icon container, use these. `rightIcon` renders inside a `Button` (clickable); `leftIcon` is decorative.
- Pass `error={true}` to switch to the error color scheme; it also sets `aria-invalid`.

### Textarea

- Same `error` prop pattern as Input.
- For auto-grow, use `AutoResizeTextarea` (custom, takes `minHeight` / `maxHeight` in px) — don't reach for `field-sizing-content` manually.

### Toast

- Import `toast` and `Toaster` from `@codapet/design-system`, **not** from `'sonner'`. The exported `Toaster` is pre-styled to match alert tokens; using sonner directly will produce off-brand toasts.
- Mount `<Toaster />` once in the root layout.

### Form

- Standard shadcn pattern: `react-hook-form` + `zod` + `Form / FormField / FormItem / FormLabel / FormControl / FormMessage`. Same API as shadcn — no surprises here.

### Accordion

- Adds a `variant` prop on `<Accordion>`: `default` (shadcn-equivalent, bottom-stripe items) or `outlined` (each item is its own bordered card with taller trigger and roomier padding). Reach for `variant="outlined"` on FAQ sections, settings panels, or any "stacked cards" pattern.
- Variant propagates to children via context — set it once on the root, not on every `AccordionItem`/`Trigger`/`Content`.
- Plus/Minus (or any custom) icons are opt-in via `collapsedIcon`/`expandedIcon` on `AccordionTrigger`. The default remains a rotating `ChevronDown`.

### Dialog vs SmartDialog

- `Dialog`/`Drawer` are the standard Radix/Vaul primitives.
- **`SmartDialog*`** is a CodaPet addition: same API surface, but renders `Drawer` on `≤600px` and `Dialog` above. Prefer it for any modal that should bottom-sheet on mobile. Replace every `Dialog` token with `SmartDialog` (`SmartDialogTrigger`, `SmartDialogContent`, etc.).

## Components added on top of shadcn

These don't exist in shadcn — reach for them instead of building your own:

| Component | Use when |
|---|---|
| `AlertBanner` | Inline page-level alerts with `type` = `informative` / `error` / `success`, optional `heading`, `icon`, `dismissible`. Distinct from `Alert` (shadcn-equivalent). |
| `BadgeActionable` | Clickable chip/filter badge with `selected` state and `onBackground` modifier. |
| `BadgeInformative` (+ `Group` / `Item`) | Read-only info badge with `colorScheme` = `gray` / `blue` / `yellow`. Use `Group` + `Item` for multi-content badges in one container. |
| `BadgeNumber` | Numeric pill (counts, step indicators). `state` = `active` / `disabled` / `resting`. |
| `OptionCard` | Selectable card with built-in radio/checkbox indicator. `selectionType` = `single` / `multiple`, `selectorPosition` = `left` / `right`. Visual-only — wire `selected` and `onClick` yourself. |
| `DropdownSelect` | Compound `DropdownSelect` / `Trigger` / `Content` / `Option` / `Label`. Lighter alternative to `Select` for simple lists. |
| `SearchableSelect` | Combobox-style select with search; supports `mode="single"` or `"multiple"` + `maxCount` for tag overflow. |
| `MultiSelectFreeText` | Tag input where users can type free text **and** pick from suggestions. |
| `SearchInput` | Search field with `variant="icon"` or `"button"`, suggestions dropdown, and clear button. Don't compose this from `Input` + a Search icon. |
| `DateInput` / `DateRangeInput` | Text input + Calendar popover. Controlled via `date`/`setDate` (or `dateRange`/`setDateRange`). Configurable `dateFormat` (15 options including `'MMM D, YYYY'`, `'DD/MM/YYYY'`, etc.). Prefer over a bare `Calendar`. |
| `TimeInput` | Time picker with `timeFormat` = `'12h' \| '24h' \| 'h:mm a' \| 'h:mm A'`. Value is `{ hours, minutes }`, not a `Date`. |
| `AutoResizeTextarea` | Textarea that grows with content; `maxHeight` enables scroll. Handles RHF `setValue`/`reset` correctly. |
| `ProgressBar` | Step-based bar; pass `currentStep` + `totalSteps`, or `value` (0–100) directly. |
| `SmartDialog*` | Responsive Dialog↔Drawer (see above). |
| `Typography`: `DisplayHeading`, `HeadingXL` … `HeadingXXS` (+ `*Medium` variants), `Body` | Use these instead of raw `<h1>`/`<p>` to inherit the right tokens (`font-serif italic` for display, `text-vibrant-text-heading` for headings, `text-vibrant-text-body` for body). Sizes are responsive (md: breakpoint baked in). |
| `ThemeToggle` | Drop-in light/dark toggle. |

## Color tokens (don't reach for raw Tailwind colors)

The brand palette lives in CSS variables exposed as Tailwind colors. Use these, not `bg-blue-600`, `text-gray-500`, `border-red-300`, etc. — raw colors won't dark-mode correctly.

- **Brand**: `brand-{subtle,light,normal,vibrant,dark}`, `brand-text-vibrant`. `primary` aliases `brand-normal`.
- **Surfaces** (backgrounds): `gray-surface-{light,default,dark}`, `primary-surface-{subtle,light,default}`, `secondary-surface-default`, `sand-{subtle,light,normal,dark}`, `sage-{light,normal,dark}`, `rose-{light,normal,dark}`, `error-surface-{subtle,light,default,dark}`, `success-surface-{subtle,default}`, `warning-surface-{subtle,light}`.
- **Strokes** (borders): `gray-stroke-{light,default}`, `primary-stroke-default`, `secondary-stroke-{light,default}`, `error-stroke-{light,default}`, `success-stroke-light`, `warning-stroke-{default,dark}`, `sand-stroke-disabled`.
- **Text**: `vibrant-text-{display,heading,body,details,white-darker}`, `secondary-text-dark`, `gray-subtle`, `foreground-secondary`, `destructive-text`.
- **Icons**: `gray-icon-{subtle,light,default,dark}`, `icon-disabled`.
- **Semantic** (inherited from shadcn): `background`, `foreground`, `border`, `input`, `ring`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `sidebar*`. These are wired to the brand palette in light **and** dark mode.

Source of truth: `src/styles.css` in this package. If a token is missing, propose it there rather than hardcoding a hex.

## Spacing & sizing conventions

- Components are built with **fixed pixel heights**, not `py-*` shorthands. Buttons: 36/40/48 (sm/md/lg). Inputs: 40/48/56. Badges (informative/actionable): 24/32/40. Match these when building adjacent custom UI.
- Border radius is **per-component**, not global — Buttons `rounded-md`, Cards `rounded-xl`, Badges `rounded-md` (default) or `rounded-[8px]` (informative/actionable), Alert banners `rounded-[12px]`. Don't override unless you have a reason.
- Mobile breakpoint is **768px** (`useIsMobile`), but `SmartDialog*` switches at **600px** via its own `useMediaQuery`. They are intentionally different — use the right one.

## Utilities & hooks

- `cn(...inputs)` — `clsx` + `tailwind-merge`. Use it when composing `className` props passed to design-system components, so caller classes win conflicts cleanly.
- `useIsMobile()` — boolean, 768px breakpoint, SSR-safe (returns `false` on first render).
- `useTheme()` — re-exported from `next-themes`.
- `buttonVariants`, `badgeVariants`, etc. — exported `cva` instances. Use them when you need the same look on a non-button element (e.g. an `<a>` styled like a button) instead of reimplementing the styles.

## Common gotchas

- **Unstyled components** → missing `@source` glob for `node_modules/@codapet/design-system/dist/**` in the consumer's CSS.
- **Wrong default Button look** → you forgot `variant="primary"`/`size="md"` are not the same as shadcn's defaults; passing nothing gives you `primary` + `lg`.
- **Toast looks generic** → you imported `toast` from `'sonner'` instead of from `@codapet/design-system`.
- **Modal doesn't bottom-sheet on mobile** → you used `Dialog` instead of `SmartDialog`.
- **Headings look wrong** → you used a raw `<h1>` instead of `HeadingXL` / `DisplayHeading`. The serif-italic display style only comes from `DisplayHeading`.
- **Dark mode broken** → you used raw Tailwind colors (`bg-gray-100`, `text-zinc-700`) instead of brand tokens; or you forgot to wrap in `ThemeProvider`.
- **"Module not found" in tests** → Jest can't parse ESM; add `'@codapet/design-system'` to `transformIgnorePatterns` or switch the test file to Vitest.
