# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Working in a consumer codebase, not this repo?** You want [AGENTS.md](./AGENTS.md) instead — that's the published guide on how to *use* the design system. This file covers how to *develop* it.

## What this repo is

`@codapet/design-system` — a publishable React component library (Shadcn-style, Radix primitives, Tailwind v4) consumed by `admin-dashboard`, `mvp-next`, `community`, and others. The same repo also hosts a Next.js 15 docs/demo app that doubles as a manual test harness.

Two trees, both using the `@/*` alias:

- `src/` — the **library** (everything published to npm). Built by tsup; entry is `src/index.ts`.
- `app/`, `lib/`, `hooks/`, `public/` (repo root) — the **Next.js demo**. Not published.

There are two near-identical `lib/utils.ts` files (`src/lib/utils.ts` and `lib/utils.ts`) — keep `cn` in sync if you change it.

## Common commands

```bash
npm run dev          # build:css + next dev --turbopack — demo at localhost:3000
npm run build:lib    # tsup → dist/index.mjs + dist/index.d.mts, then copies styles.css
npm run build:all    # lib + demo
npm run lint         # eslint
npm run test:lib     # smoke test: imports dist/index.mjs and counts exports
```

**Vitest is configured but there is no `test` script.** Run unit tests directly:

```bash
npx vitest run                                          # single run
npx vitest run src/components/ui/date-input.test.tsx    # one file
```

## Build pipeline (tsup)

Configured in `tsup.config.ts`:

- ESM only. No CJS.
- Every output gets a `"use client";` banner injected. Don't add `'use client'` manually inside source.
- All runtime deps are `external`. **If you add a new runtime dependency, add it to both `dependencies` in `package.json` AND the `external` array in `tsup.config.ts`** — otherwise it gets bundled.
- `dts: true` emits types from `tsconfig.lib.json`, which is **stricter than `tsconfig.json`** (`noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`). The demo's `tsc` can pass while `build:lib` fails — always run `build:lib` before publishing.
- `src/styles.css` is **copied, not processed** (`build:css` does `cp src/styles.css dist/styles.css`). Edit tokens in `src/styles.css`. Restart `npm run dev` after changes.

## Adding a new component

1. Create `src/components/ui/<name>.tsx`. Don't add `'use client'` (banner adds it).
2. Re-export from `src/index.ts`. Missing this is the most common reason consumers can't find a new component.
3. New third-party dep? Add to `dependencies` *and* `external` in `tsup.config.ts`.
4. Add a demo route under `app/(docs)/<id>/page.tsx` and a nav entry in `app/(docs)/layout.tsx`.
5. Run `npm run build:lib` to confirm `tsconfig.lib.json` passes.
6. **If the new component changes consumer-facing API or defaults, update [AGENTS.md](./AGENTS.md).**

## Releasing

Tags `v*.*.*` trigger `.github/workflows/release.yml`, which runs `build:lib`, `build:css`, `test:lib`, then `npm publish --access public` (requires `NPM_TOKEN`). `prepublishOnly` runs the same checks locally.

```bash
# bump version in package.json
git commit -am "chore(release): vX.Y.Z"
git tag vX.Y.Z
git push --follow-tags
```

The `files` field in `package.json` controls what ships. Currently: `dist/**` and `AGENTS.md`. Add anything else explicitly.

## Conventions

- Prettier: no semicolons, single quotes, no trailing commas, 2-space, `arrowParens: 'avoid'`.
- Path alias `@/*` → `./src/*` for library code.
- Shadcn "new-york" style. Icons from `lucide-react`.
- `cn(...)` from `src/lib/utils.ts` for class merging.
- Brand tokens live in `src/styles.css` under `@theme inline`. Prefer `brand-*` / `sand-*` / `vibrant-text-*` / `*-surface-*` / `*-stroke-*` over raw Tailwind colors so dark mode works.

## code-review-graph MCP

Per `.kiro/steering/`, this project has a code knowledge graph. When exploring or reviewing, prefer `semantic_search_nodes`, `query_graph`, `detect_changes`, `get_review_context`, `get_impact_radius` over Grep/Glob — faster, and they surface caller/dependent/test relationships. Fall back to Read/Grep only when the graph doesn't cover what you need.
