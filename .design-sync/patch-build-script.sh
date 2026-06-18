#!/usr/bin/env bash
# Durable patch for /design-sync: keep doc-frontmatter `category` VERBATIM as the
# DS-pane group heading instead of slugifying it to lowercase-kebab.
# The uploaded format treats `@dsCard group="..."` as a human display label
# (register_assets examples are Title Case: "Type", "Colors"), but the stock
# converter lowercases + dashes it. Our group-docs stubs already carry human
# labels ("Data Display", "Date & Time", ...), so we just stop the slugify.
#
# RE-SYNC: re-run this AFTER the `cp -r ... .ds-sync/` staging step and BEFORE
# package-build/resync — staging overwrites the patched file.
#   bash .design-sync/patch-build-script.sh
set -euo pipefail
F=".ds-sync/package-build.mjs"
node - "$F" <<'NODE'
const fs = require('fs');
const f = process.argv[2];
let s = fs.readFileSync(f, 'utf8');
const from = "const g = d.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');";
const to   = "const g = d.category.trim(); // [design-sync patch] keep human group label verbatim";
if (!s.includes(to)) {
  if (!s.includes(from)) { console.error('PATCH TARGET NOT FOUND (slugify) — converter changed; re-derive'); process.exit(1); }
  s = s.replace(from, to);
  console.log('patched: category kept verbatim as group label');
} else { console.log('slugify patch: already applied'); }

// Patch 2: emit components in a curated group order so the DS pane shows a
// logical category order instead of component-name-sorted interleave ("random").
const ORDER = ["Actions","Inputs","Forms","Selection Controls","Selects and Dropdowns","Date and Time","Overlays","Menus","Navigation","Data Display","Feedback","Layout","Badges","Typography","Theme"];
const anchor = "  for (const c of components) if (!categoryApplied.has(c)) c.group = 'misc';\n}";
const sortStmt = anchor + "\n/* [design-sync patch] curated group order for DS-pane */\n{\n  const __ORDER = " + JSON.stringify(ORDER) + ";\n  const __rank = (g) => { const i = __ORDER.indexOf(g); return i < 0 ? 999 : i; };\n  components.sort((a, b) => __rank(a.group) - __rank(b.group) || String(a.name).localeCompare(String(b.name)));\n}";
if (s.includes("[design-sync patch] curated group order")) { console.log('order patch: already applied'); }
else if (!s.includes(anchor)) { console.error('PATCH TARGET NOT FOUND (group order anchor) — converter changed; re-derive'); process.exit(1); }
else { s = s.replace(anchor, sortStmt); console.log('patched: curated group order injected'); }

fs.writeFileSync(f, s);
NODE
