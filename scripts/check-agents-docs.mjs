/**
 * Keeps AGENTS.md honest about the public API, in both directions.
 *
 * AGENTS.md is what consumer agents load into context, so it has two failure
 * modes and both mislead them:
 *   1. an export the guide never names — the agent misses it, or guesses a name
 *   2. a name the guide claims exists but does not — the agent imports it and
 *      the build breaks
 *
 * Runs in prepublishOnly, after build:lib, so the guide cannot ship out of sync.
 *
 * An export counts as covered when AGENTS.md names it exactly, or declares a
 * family glob it belongs to — `Dialog*` covers `Dialog`, `DialogContent`, and
 * the rest. The globs live in the prose itself, so there is no side file to
 * forget.
 */
import { readFileSync } from 'node:fs'

const docs = readFileSync(new URL('../AGENTS.md', import.meta.url), 'utf8')
const dts = readFileSync(
  new URL('../dist/index.d.mts', import.meta.url),
  'utf8'
)
const runtime = Object.keys(await import('../dist/index.mjs'))

/**
 * Type-only exports. Two shapes to cover: the trailing `export { ... }` block,
 * and standalone `export { X } from '...'` re-export lines — which is how
 * `ThemeProviderProps` reaches consumers.
 */
const types = new Set()
for (const m of dts
  .slice(dts.lastIndexOf('export {'))
  .matchAll(/type (\w+)/g)) {
  types.add(m[1])
}
for (const m of dts.matchAll(/^export \{([^}]*)\} from '[^']+'/gm)) {
  for (const raw of m[1].split(',')) {
    const name = raw.trim().replace(/^type\s+/, '')
    // Runtime re-exports show up in the .mjs keys already; keep the extras.
    if (name && !runtime.includes(name)) types.add(name)
  }
}

const families = [...docs.matchAll(/`([A-Z]\w+)\*`/g)].map(m => m[1])
const named = new Set(
  [...docs.matchAll(/\b([A-Za-z_$][\w$]*)\b/g)].map(m => m[1])
)

const covered = name =>
  named.has(name) || families.some(f => name.startsWith(f))

const real = new Set([...runtime, ...types])
const missing = [...real].filter(n => !covered(n)).sort()

// Reverse direction: every name the "Exported types" paragraph claims must exist.
const typeSection = docs.match(/\*\*Exported types\*\*[^]*?\n\n/)?.[0] ?? ''
const claimed = [...typeSection.matchAll(/`(\w+)`/g)].map(m => m[1])
const phantom = [...new Set(claimed.filter(n => !real.has(n)))].sort()

const total = real.size
let failed = false

if (missing.length) {
  failed = true
  console.error(
    `❌ ${missing.length} of ${total} public exports are not discoverable from AGENTS.md:\n`
  )
  for (let i = 0; i < missing.length; i += 6) {
    console.error('   ' + missing.slice(i, i + 6).join(', '))
  }
  console.error(
    '\nName each in AGENTS.md, or cover it with a family glob such as `Dialog*`.\n'
  )
}

if (phantom.length) {
  failed = true
  console.error(
    `❌ AGENTS.md lists ${phantom.length} exported type(s) that do not exist:\n`
  )
  console.error('   ' + phantom.join(', '))
  console.error(
    '\nRemove them, or export them for real. A name in this guide that\n' +
      'does not resolve sends consuming agents straight into a build error.\n'
  )
}

if (failed) process.exit(1)

console.log(
  `✅ AGENTS.md is in sync with the public API: all ${total} exports ` +
    `(${runtime.length} runtime, ${types.size} type-only) are discoverable, ` +
    `and every type it names resolves.`
)
