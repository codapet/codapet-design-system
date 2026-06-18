# Building with `@codapet/design-system`

CodaPet's design system — shadcn/ui-style components (Radix primitives + class-variance-authority + **Tailwind v4**), one published package. Build CodaPet's product UI (in-home pet veterinary care: booking, scheduling, pet records, vet profiles) by composing these real components. **Always reach for a library component before hand-rolling one.**

## Setup & wrapping

- Single import: `import { Button, Card, Dialog } from '@codapet/design-system'`. There are **no subpath imports**. `'use client'` is already baked into every export — never add your own.
- **Theme/dark mode:** wrap the app once in `<ThemeProvider>` (re-exported `next-themes`, pre-set `attribute="class"`, `defaultTheme="light"`). Light mode works without it; dark mode needs the `.dark` class it manages.
- **Toasts:** mount `<Toaster />` once at the root and call `toast(...)` — both from this package, **not** from `sonner`.
- Brand fonts (Plus Jakarta Sans / Noto Serif italic for display / Geist Mono) are wired in the bound `styles.css`; `font-sans` / `font-serif` / `font-mono` resolve to them.

## Styling idiom (Tailwind v4 + tokens — never hardcode hex/named colors)

**1. Style components via their PROPS first — the design language lives there:**
- `Button`: `variant` = `primary` (default) · `secondary` · `tertiary` · `outline` · `ghost` · `ghost-secondary` · `ghost-destructive` · `link` · `destructive` · `destructive-secondary` · `destructive-tertiary`; `size` = `sm` · `md` · `lg` (default) · `icon`. **Default is `primary`/`lg`** — pass `size="md"` for normal inline buttons.
- `Input`/`Textarea`: `size` `sm`·`md`(default)·`lg`, `error` boolean, `leftIcon`/`rightIcon`.
- Most components expose `variant`/`size`/state props — check the component's `.d.ts`.

**2. For your own layout glue, use Tailwind utilities + the semantic color tokens** (these are the design language; they auto-adapt to dark mode):
- Layout/spacing/radius: standard Tailwind v4 (`flex`, `grid`, `gap-3`, `p-4`, `rounded-lg`, …).
- Color utilities that exist in the bound `styles.css`: `bg-primary` / `text-primary-foreground`, `bg-card` / `text-card-foreground`, `bg-muted` / `text-muted-foreground`, `bg-secondary` / `text-secondary-foreground`, `bg-accent`, `bg-destructive`, `text-foreground`, `border-border`, `ring-ring`, and display type like `text-vibrant-text-display`.
- Full brand palette is exposed as CSS variables in `:root` — use via `[var(--token)]` arbitrary values or inline `style` when no semantic utility fits: `--brand-normal` / `--brand-light` / `--brand-dark` / `--brand-vibrant` / `--brand-subtle`, `--primary`, `--sand-light|normal|dark`, `--rose-light|normal|dark`, `--sage-light|normal|dark`, plus `*-surface-*` / `*-stroke-*` / `vibrant-text-*` families. Prefer these `brand-*`/`sand-*` tokens over raw Tailwind colors so dark mode works.

## Where the truth lives

Before styling, read the bound **`_ds/<folder>/styles.css`** (token definitions + the utility set actually shipped) and, per component, its **`.prompt.md`** (usage + composition with sub-parts like `CardHeader`, `DialogContent`) and **`.d.ts`** (exact props). Sub-parts aren't separate menu cards but are fully importable from the package.

## Idiomatic example

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from '@codapet/design-system'

<Card className="w-80">
  <CardHeader>
    <CardTitle>Annual checkup</CardTitle>
    <CardDescription>Wellness visit for Bella</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">Tue, Jul 14 · 10:30 AM with Dr. Sarah Chen.</p>
  </CardContent>
  <CardFooter className="flex justify-end gap-2">
    <Button variant="ghost" size="md">Reschedule</Button>
    <Button size="md">Confirm</Button>
  </CardFooter>
</Card>
```
