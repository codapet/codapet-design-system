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

## Finding exact props: read the shipped types

`dist/index.d.mts` is the authoritative API reference, and it ships inside the
package with every JSDoc comment intact. When you need a component's exact
props, defaults, or union values, **read it instead of guessing**:

```
node_modules/@codapet/design-system/dist/index.d.mts
```

Grep it for the type you want — `interface SearchInputProps`,
`interface AsyncAutocompleteProps` — and you get every prop with its
documentation. It is regenerated from source on every release, so it cannot go
stale.

**One trap when reading the types.** Many components take props that never
appear in their interface body, because they come from a cva:

```ts
interface BadgeNumberProps
  extends React.ComponentProps<'span'>,
    VariantProps<typeof badgeNumberVariants> { value: number }
```

Grepping `interface BadgeNumberProps` suggests `value` is the only prop, but
`state` (`'active' | 'disabled' | 'resting'`, default `'active'`) is real — it
lives in `badgeNumberVariants`. Whenever an interface extends
`VariantProps<typeof xVariants>`, read the `declare const xVariants` entry just
above it for the remaining props. `variant`, `size`, `state` and `colorScheme`
almost always arrive this way.

Division of labour: **this guide covers what is surprising** (defaults that
differ from shadcn, which component to reach for, gotchas). **The `.d.mts`
covers what is exhaustive.** Read this file first to pick the right component,
then the types to get its props right.

The docs app in this repo also has a live example page per component, and the
richer ones (`SmartDialog*`, `AsyncAutocomplete`) carry a full props table.

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

### Tooltip / RichTooltip

- `TooltipContent` (the plain text tooltip) defaults to brand blue (`bg-primary`), including its arrow. The arrow used to be hardcoded — it now honors two extra props so a restyled body and its arrow stay in sync:
  - `arrowClassName?: string` — merged (via `cn`) onto the arrow. Recolor it to match a custom surface.
  - `hideArrow?: boolean` — omit the arrow entirely.
  - White-tooltip example (recolor body **and** arrow together, otherwise the arrow stays blue). If the body has a shadow, add a matching **`drop-shadow`** to the arrow — a plain `shadow-*` won't follow the diamond shape and a white arrow is invisible without it:
    ```tsx
    <TooltipContent
      className="bg-white text-foreground shadow-md"
      arrowClassName="bg-white fill-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.12)]"
    />
    ```
- `RichTooltipContent` (icon + heading + body, optionally `dismissible`) is dark by default. Its surface, text and arrow are no longer hardcoded:
  - `variant?: "dark" | "light"` — `"dark"` (default) is the original dark surface + white text; `"light"` is a white surface + dark text, and **ships a soft `shadow-md` on the surface plus a matching `drop-shadow` on the arrow** so it's visible on light backgrounds out of the box. Both look correct in either app theme. Pick a variant instead of hand-rolling colors.
  - `surfaceClassName?: string` — merged onto the inner surface `div`. Overrides the background (and text, since text color lives on the same element): `surfaceClassName="bg-white text-foreground"`.
  - `arrowClassName?: string` — merged onto the arrow so it matches a custom surface (e.g. `arrowClassName="fill-white"`). When you give the surface a shadow via `surfaceClassName`, pair it with a `drop-shadow` here (e.g. `arrowClassName="fill-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.12)]"`).
  - `hideArrow?: boolean` — omit the arrow.
  - `className` still lands on the **outer** (transparent) positioning wrapper, not the visible surface — that's why `className="bg-white"` alone never worked. Use `surfaceClassName`/`variant` for appearance.
- Exported types: `TooltipContentProps`, `RichTooltipContentProps`, `RichTooltipVariant`. All new props are optional and defaults are unchanged, so existing usages render identically.

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
| `AsyncAutocomplete` | Type-ahead over an **async** source — a Places lookup, a REST search. You own fetching and debouncing; it renders `options` verbatim, never filtering. Full ARIA combobox with keyboard nav, portaled panel, and it dismisses the moment the user scrolls. `mobileVariant="sheet"` makes it a full-screen takeover under 768px. Restyle any part through the `classNames` slot object. For a **static** list reach for `SearchableSelect` instead. |
| `DateInput` / `DateRangeInput` | Text input + Calendar popover. Controlled via `date`/`setDate` (or `dateRange`/`setDateRange`). Configurable `dateFormat` (15 options including `'MMM D, YYYY'`, `'DD/MM/YYYY'`, etc.). Prefer over a bare `Calendar`. |
| `TimeInput` | Time picker with `timeFormat` = `'12h' \| '24h' \| 'h:mm a' \| 'h:mm A'`. Value is `{ hours, minutes }`, not a `Date`. |
| `AutoResizeTextarea` | Textarea that grows with content; `maxHeight` enables scroll. Handles RHF `setValue`/`reset` correctly. |
| `ProgressBar` | Step-based bar; pass `currentStep` + `totalSteps`, or `value` (0–100) directly. |
| `SmartDialog*` | Responsive Dialog↔Drawer (see above). |
| `Typography`: `DisplayHeading`, `HeadingXL` … `HeadingXXS` (+ `*Medium` variants), `Body` | Use these instead of raw `<h1>`/`<p>` to inherit the right tokens (`font-serif italic` for display, `text-vibrant-text-heading` for headings, `text-vibrant-text-body` for body). Sizes are responsive (md: breakpoint baked in). |
| `ThemeToggle` | Drop-in light/dark toggle. |

## Choosing the right component

The most common agent mistake here is not a wrong prop, it is reaching for the
wrong component. Work from the task:

| The task | Use | Not |
|---|---|---|
| Type-ahead whose results come from an API | `AsyncAutocomplete` | `SearchInput`, whose suggestions are a static prop and whose dropdown pushes page content down |
| Pick one/many from a **static** list, with search | `SearchableSelect` | `AsyncAutocomplete`, which never filters — it renders `options` verbatim |
| Pick one from a short static list, no search | `DropdownSelect` | `Select` (heavier; still fine when you need native-select semantics) |
| Free-text entry **plus** suggestions, many values | `MultiSelectFreeText` | a hand-rolled `Input` + chips |
| A search field with a visible Search button | `SearchInput` | `Input` + a magnifier icon |
| Command palette / fuzzy launcher | `Command*` | `SearchableSelect` |
| Modal that should bottom-sheet on phones | `SmartDialog*` | `Dialog*` |
| Modal that is a dialog at every size | `Dialog*` | `SmartDialog*` |
| Panel sliding from a screen edge | `Sheet*` | `Drawer*` |
| Bottom sheet with drag-to-dismiss at every size | `Drawer*` | `Sheet*` |
| Destructive confirm | `AlertDialog*` | `Dialog*` |
| Inline, page-level notice | `AlertBanner` | `Alert` (the shadcn-equivalent, quieter) |
| Transient notification | `toast` + `Toaster` | `AlertBanner` |
| Date, or date range | `DateInput` / `DateRangeInput` | a bare `Calendar` |
| Time of day | `TimeInput` (value is `{ hours, minutes }`, not a `Date`) | `Input type="time"` |
| Any heading or body copy | `DisplayHeading` / `Heading*` / `Body` | raw `<h1>`/`<p>`, which miss the tokens |
| Textarea that grows with content | `AutoResizeTextarea` | `Textarea` + manual resize |
| Selectable card with a radio/checkbox | `OptionCard` | `Card` + a `Checkbox` |
| Step or count pill | `BadgeNumber` | `Badge` |
| Clickable filter chip | `BadgeActionable` | `Button variant="outline"` |
| Read-only metadata pill | `BadgeInformative` | `Badge` |

## Dialogs, drawers and sheets — read this before writing one

Four families, and they are the most common source of broken code here. Each
has its own React context, so **parts are never interchangeable**: a
`DialogContent` inside a `SmartDialog` throws on mobile, because the root
rendered a vaul `Drawer` and the child asked for a Radix Dialog context that
does not exist. Pick a family and use only its parts.

| Family | Parts | Renders as |
|---|---|---|
| `Dialog*` | Root, Trigger, Content, Header, Footer, Title, Description, Close, Overlay, Portal | Centred modal at every size |
| `SmartDialog*` | Root, Trigger, Content, Header, Footer, Title, Description, Close — **8 parts, no Overlay/Portal/Body** | `Dialog` above 600px, `Drawer` at/below |
| `Drawer*` | Root, Trigger, Content, Header, Footer, Title, Description, Close, Overlay, Portal | vaul sheet, draggable, `max-h-[80vh]` |
| `Sheet*` | Root, Trigger, Content, Header, Footer, Title, Description, Close | Edge panel, `w-3/4 sm:max-w-sm` |

### Never wrap `*Content` in a Portal or Overlay

`DialogContent`, `DrawerContent` and `SheetContent` **already render their own
Portal and Overlay internally.** Stock shadcn composes them by hand, so a copied
example produces two stacked backdrops (visibly double-dimmed) and two portals:

```tsx
// ❌ copied from shadcn — double overlay
<Dialog>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent>…</DialogContent>
  </DialogPortal>
</Dialog>

// ✅ here
<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm</DialogTitle>
      <DialogDescription>This cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

`DialogPortal` / `DialogOverlay` / `DrawerPortal` / `DrawerOverlay` are exported
only because shadcn exports them. **You almost never need them.** To restyle the
backdrop, pass `overlayClassName` to `DialogContent` / `DrawerContent` /
`SmartDialogContent` — `SheetContent` and `AlertDialogContent` do not accept it.

### `withCloseButton` is the drag handle, not the close button

On `DrawerContent` and `SmartDialogContent`:

- `showCloseButton` (default `true`) — the round **X** in the top-right.
- `withCloseButton` (default `true`) — the small grey **drag pill**, and only for
  `direction="bottom"`. The name is misleading; it has nothing to do with the X.

So `withCloseButton={false}` still leaves the X. To remove the X, pass
`showCloseButton={false}`. `SmartDialogContent` forwards `showCloseButton` to
both variants, so the X stays consistent across the breakpoint.

### `direction` goes on both the root and the content

vaul needs it on the root for gesture handling; the content needs it for its own
edge/rounding classes. Setting only one gives a drawer that animates from one
edge and is styled for another:

```tsx
<Drawer direction="right">
  <DrawerContent direction="right">…</DrawerContent>
</Drawer>
```

`Sheet` uses `side` instead (`'top' | 'right' | 'bottom' | 'left'`, default
`'right'`), on `SheetContent` only.

### `SmartDialog` specifics

- The breakpoint is **600px**, not the 768px `useIsMobile` uses. That is
  deliberate — see the note further down.
- **The first client render is always the Dialog variant**, then it settles to
  the real one. The server has no viewport, so `useMediaQuery` returns the server
  snapshot during hydration; rendering the true value there would be a hydration
  mismatch. Do not measure the DOM or branch on the variant during first paint.
- Props are a union of Dialog's and Drawer's, so drawer-only props
  (`direction`, `dismissible`) are accepted and silently ignored above 600px.
- `Drawer` hardcodes `repositionInputs={false}`, which `SmartDialog` inherits —
  relevant if you put a focused input inside on iOS.

### Always give it a title

All four families are Radix-Dialog-based and warn without a `Title`. If the
design has no visible heading, keep the element and hide it:

```tsx
<DialogTitle className="sr-only">Edit profile</DialogTitle>
```

Pass `aria-describedby={undefined}` on the content when there is genuinely no
`Description`, rather than leaving the warning in the console.

## Color tokens (don't reach for raw Tailwind colors)

The brand palette lives in CSS variables exposed as Tailwind colors. Use these, not `bg-blue-600`, `text-gray-500`, `border-red-300`, etc. — raw colors won't dark-mode correctly.

- **Brand**: `brand-{subtle,light,normal,vibrant,dark}`, `brand-text-vibrant`. `primary` aliases `brand-normal`.
- **Surfaces** (backgrounds): `gray-surface-{light,default,dark}`, `primary-surface-{subtle,light,default}`, `secondary-surface-default`, `sand-{subtle,light,normal,dark}`, `sage-{light,normal,dark}`, `rose-{light,normal,dark}`, `error-surface-{subtle,light,default,dark}`, `error-destructive` (filled destructive buttons only), `success-surface-{subtle,default}`, `warning-surface-{subtle,light}`.
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

## Complete export index

Everything below is imported from the single entry `'@codapet/design-system'`.
A `Foo*` glob means the whole compound family — `Dialog*` is `Dialog`,
`DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`,
`DialogDescription`, `DialogClose`, `DialogOverlay`, `DialogPortal`. Families
follow the standard shadcn part names; when unsure, grep the `.d.mts`.

**If a name is not in this list, it does not exist — do not import it.**

| Area | Exports |
|---|---|
| Layout & structure | `AspectRatio`, `Card*`, `Separator`, `ScrollArea`, `ScrollBar`, `Resizable*`, `Sidebar*`, `useSidebar`, `Table*`, `Skeleton` |
| Typography | `DisplayHeading`, `HeadingXL`, `HeadingL`, `HeadingM`, `HeadingS`, `HeadingXS`, `HeadingXXS` (each with a `*Medium` twin, e.g. `HeadingLMedium`), `Body` |
| Buttons & badges | `Button`, `Badge`, `BadgeActionable`, `BadgeInformative`, `BadgeInformativeGroup`, `BadgeInformativeItem`, `BadgeNumber`, `Toggle`, `ToggleGroup`, `ToggleGroupItem` |
| Form fields | `Input`, `Textarea`, `AutoResizeTextarea`, `Label`, `Checkbox`, `RadioGroup`, `RadioGroupItem`, `Switch`, `Slider`, `InputOTP*`, `Form*`, `useFormField`, `OptionCard` |
| Selection & search | `AsyncAutocomplete*`, `SearchableSelect*`, `SearchInput`, `MultiSelectFreeText`, `DropdownSelect*`, `Select*`, `Command*` |
| Date & time | `Calendar`, `CalendarDayButton`, `DateInput`, `DateRangeInput`, `TimeInput` |
| Overlays & menus | `Dialog*`, `AlertDialog*`, `Drawer*`, `Sheet*`, `SmartDialog*`, `Popover*`, `HoverCard*`, `Tooltip*`, `RichTooltip*`, `DropdownMenu*`, `ContextMenu*`, `Menubar*` |
| Feedback | `Alert`, `AlertTitle`, `AlertDescription`, `AlertBanner`, `Toaster`, `toast`, `Progress`, `ProgressBar` |
| Navigation | `Tabs*`, `Breadcrumb*`, `Pagination*`, `NavigationMenu*` |
| Content & data | `Accordion*`, `Collapsible*`, `Avatar*`, `Carousel*`, `Chart*` |
| Theming & utilities | `ThemeProvider*`, `ThemeToggle`, `cn`, `useIsMobile` |

**cva style objects** — use these to give a non-button element a button's look
rather than reimplementing the classes: `buttonVariants`, `badgeVariants`,
`badgeActionableVariants`, `badgeInformativeVariants`, `badgeNumberVariants`,
`alertBannerVariants`, `inputVariants`, `labelTextVariants`, `optionCardVariants`,
`progressBarVariants`, `tabsTriggerVariants`, `toggleVariants`,
`bodyTextVariants`, `displayTextVariants`, `navigationMenuTriggerStyle`.

**Exported types** — import with `import type`: `InputProps`, `TextareaProps`,
`SearchInputProps`, `SearchSuggestion`, `AlertBannerProps`,
`BadgeActionableProps`, `BadgeInformativeProps`, `BadgeNumberProps`,
`OptionCardProps`, `ProgressBarProps`, `TabsTriggerProps`, `TooltipContentProps`,
`RichTooltipContentProps`, `RichTooltipVariant`, `DateFormat`, `DateInputProps`,
`DateRangeInputProps`, `DateRange` (re-exported from `react-day-picker`:
`{ from?: Date; to?: Date }` — the value type for `DateRangeInput`),
`TimeFormat`, `TimeValue`, `TimeInputProps`,
`SearchableSelectOption`, `SearchableSelectProps`, `MultiSelectFreeTextOption`,
`MultiSelectFreeTextProps`, `DropdownSelectProps`, `DropdownSelectLabelProps`,
`DropdownSelectTriggerProps`, `DropdownSelectContentProps`,
`DropdownSelectOptionProps`, `AsyncAutocompleteProps`,
`AsyncAutocompleteOption`, `AsyncAutocompleteOptionState`,
`AsyncAutocompleteClassNames`, `AsyncAutocompleteInputProps`, `CarouselApi`,
`ChartConfig`, `ThemeProviderProps`.

There are no other public exports, and no subpath imports: only
`'@codapet/design-system'` and `'@codapet/design-system/styles'` resolve.

## Common gotchas

- **Unstyled components** → missing `@source` glob for `node_modules/@codapet/design-system/dist/**` in the consumer's CSS.
- **Wrong default Button look** → you forgot `variant="primary"`/`size="md"` are not the same as shadcn's defaults; passing nothing gives you `primary` + `lg`.
- **Toast looks generic** → you imported `toast` from `'sonner'` instead of from `@codapet/design-system`.
- **Modal doesn't bottom-sheet on mobile** → you used `Dialog` instead of `SmartDialog`.
- **`AsyncAutocomplete` fires a request per keystroke** → it deliberately does not debounce. Debounce in your fetch layer (`usePlacesService({ debounce: 300 })`, your own hook) so cancellation and out-of-order responses stay with the code that owns them.
- **`AsyncAutocomplete` shows results that don't match what you typed** → it renders `options` verbatim by design, because the server already filtered. If your list is static, use `SearchableSelect`/`DropdownSelect`, which filter client-side.
- **Styling `AsyncAutocomplete`** → it does **not** follow the flat `*ClassName` convention that `DateInput`/`TimeInput` use, because it has twenty-odd stylable slots. `className` is the root wrapper; everything else lives in one `classNames` object: `field`, `input`, `leftIcon`, `clearButton`, `content`, `listbox`, `option`, `optionHighlighted`, `optionDisabled`, `optionIcon`, `optionLabel`, `optionDescription`, `loading`, `loadingSpinner`, `empty`, plus `sheetOverlay`, `sheetContent`, `sheetHeader`, `sheetCloseButton`, `sheetInput`, `sheetList`. All merge through `cn`, so `{ content: 'max-h-[420px]' }` replaces the built-in max-height rather than stacking with it. A single row can also carry its own `className` via the option object, and rows expose `data-highlighted` / `data-disabled` for parent-level selectors. Use `renderOption` to change row *structure*, `classNames` to change its *look*.
- **Headings look wrong** → you used a raw `<h1>` instead of `HeadingXL` / `DisplayHeading`. The serif-italic display style only comes from `DisplayHeading`.
- **Dark mode broken** → you used raw Tailwind colors (`bg-gray-100`, `text-zinc-700`) instead of brand tokens; or you forgot to wrap in `ThemeProvider`.
- **"Module not found" in tests** → Jest can't parse ESM; add `'@codapet/design-system'` to `transformIgnorePatterns` or switch the test file to Vitest.
