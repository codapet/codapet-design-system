// Generates category stub docs (frontmatter only — body still synthesizes from
// .d.ts) so the DS-pane menu shows components under humanized group headings.
// Output: .design-sync/group-docs/<Name>.md  (gitignored — REGENERATE before build).
//
// Self-contained: the kept component set + their groups are embedded below, so no
// build artifact is needed. Re-run after the export set changes (and add any new
// top-level component to GROUPS with its group).
//
//   node .design-sync/gen-group-docs.mjs
import { mkdirSync, writeFileSync, rmSync } from 'fs'

// The 63 top-level components that get menu cards → their humanized group.
// (The ~226 compound sub-parts are excluded as cards via config.componentSrcMap
//  and need no stub.) Group labels are kept VERBATIM as headings — see
//  patch-build-script.sh. Avoid "&" (it HTML-escapes in the card comment).
const GROUPS = {
  'Actions': ['Button', 'Toggle', 'ToggleGroup'],
  'Badges': ['Badge', 'BadgeActionable', 'BadgeInformative', 'BadgeNumber'],
  'Data Display': ['Accordion', 'Avatar', 'Card', 'Carousel', 'ChartContainer', 'Collapsible', 'Table'],
  'Date and Time': ['Calendar', 'DateInput', 'DateRangeInput', 'TimeInput'],
  'Feedback': ['Alert', 'AlertBanner', 'Progress', 'ProgressBar', 'Skeleton', 'Toaster'],
  'Forms': ['Form'],
  'Inputs': ['AutoResizeTextarea', 'Input', 'InputOTP', 'Label', 'OptionCard', 'SearchInput', 'Textarea'],
  'Layout': ['AspectRatio', 'ResizablePanelGroup', 'ScrollArea', 'Separator'],
  'Menus': ['Command', 'ContextMenu', 'DropdownMenu', 'Menubar'],
  'Navigation': ['Breadcrumb', 'NavigationMenu', 'Pagination', 'Sidebar', 'Tabs'],
  'Overlays': ['AlertDialog', 'Dialog', 'Drawer', 'HoverCard', 'Popover', 'Sheet', 'SmartDialog', 'Tooltip'],
  'Selection Controls': ['Checkbox', 'RadioGroup', 'Slider', 'Switch'],
  'Selects and Dropdowns': ['DropdownSelect', 'MultiSelectFreeText', 'SearchableSelect', 'Select'],
  'Theme': ['ThemeToggle'],
  'Typography': ['DisplayHeading']
}

const dir = '.design-sync/group-docs'
rmSync(dir, { recursive: true, force: true })
mkdirSync(dir, { recursive: true })
let n = 0
for (const [group, names] of Object.entries(GROUPS)) {
  for (const name of names) {
    writeFileSync(`${dir}/${name}.md`, `---\ncategory: ${group}\n---\n`)
    n++
  }
}
console.log(`wrote ${n} group stubs to ${dir}`)
