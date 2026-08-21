'use client'

import {
  AsyncAutocomplete,
  type AsyncAutocompleteOption
} from '@/components/ui/async-autocomplete'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Building2, Eraser, MapPin, Stethoscope } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CodeBlock } from '../buttons/CodeBlock'
import { PropsTable } from '../smart-dialog-drawer/PropsTable'

/* ─── A stand-in for a real search API ─────────────────────── */

type City = { id: string; city: string; state: string }

const CITIES: City[] = [
  { id: '1', city: 'Denver', state: 'Colorado' },
  { id: '2', city: 'Denton', state: 'Texas' },
  { id: '3', city: 'Denham Springs', state: 'Louisiana' },
  { id: '4', city: 'San Francisco', state: 'California' },
  { id: '5', city: 'San Diego', state: 'California' },
  { id: '6', city: 'San Antonio', state: 'Texas' },
  { id: '7', city: 'Santa Monica', state: 'California' },
  { id: '8', city: 'Sacramento', state: 'California' },
  { id: '9', city: 'Salem', state: 'Oregon' },
  { id: '10', city: 'Seattle', state: 'Washington' },
  { id: '11', city: 'Savannah', state: 'Georgia' },
  { id: '12', city: 'Scottsdale', state: 'Arizona' }
]

/**
 * Mimics what a consumer's fetch layer does: debounce, then resolve after a
 * round trip. `AsyncAutocomplete` deliberately does none of this itself.
 */
function useFakeCitySearch() {
  const [options, setOptions] = useState<AsyncAutocompleteOption<City>[]>([])
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const latencyRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(
    () => () => {
      clearTimeout(debounceRef.current)
      clearTimeout(latencyRef.current)
    },
    []
  )

  const search = useCallback((query: string) => {
    clearTimeout(debounceRef.current)
    clearTimeout(latencyRef.current)

    if (query.trim() === '') {
      setOptions([])
      setLoading(false)
      return
    }

    setLoading(true)
    debounceRef.current = setTimeout(() => {
      latencyRef.current = setTimeout(() => {
        const lower = query.toLowerCase()
        setOptions(
          CITIES.filter(city =>
            `${city.city} ${city.state}`.toLowerCase().includes(lower)
          ).map(city => ({
            id: city.id,
            label: city.city,
            description: city.state,
            data: city
          }))
        )
        setLoading(false)
      }, 600)
    }, 300)
  }, [])

  const reset = useCallback(() => {
    clearTimeout(debounceRef.current)
    clearTimeout(latencyRef.current)
    setOptions([])
    setLoading(false)
  }, [])

  return { options, loading, search, reset }
}

function SelectedNote({ value }: { value: string | null }) {
  if (!value) return null
  return (
    <p className="text-sm text-slate-600 dark:text-slate-400">
      Selected: <span className="font-semibold">{value}</span>
    </p>
  )
}

/* ─── Page ─────────────────────────────────────────────────── */

export default function AsyncAutocompletePage() {
  const basic = useFakeCitySearch()
  const [basicValue, setBasicValue] = useState('')
  const [basicSelected, setBasicSelected] = useState<string | null>(null)

  const stacked = useFakeCitySearch()
  const [stackedValue, setStackedValue] = useState('')

  const clipped = useFakeCitySearch()
  const [clippedValue, setClippedValue] = useState('')

  const themed = useFakeCitySearch()
  const [themedValue, setThemedValue] = useState('')

  const sheet = useFakeCitySearch()
  const [sheetValue, setSheetValue] = useState('')
  const [sheetSelected, setSheetSelected] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-8 w-screen md:w-full px-4">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3 md:mb-4">
          Async Autocomplete
        </h2>
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
          Type-ahead over an async source. Results are rendered verbatim, the
          panel is portaled, and it dismisses the moment the user scrolls.
        </p>
      </div>

      {/* Basic */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Async search
          </CardTitle>
          <CardDescription>
            Try <span className="font-mono font-semibold">san</span> or{' '}
            <span className="font-mono font-semibold">den</span>. The demo
            debounces 300ms then fakes 600ms of latency, so you can watch the
            spinner, the results, and the empty state. Scroll the page with the
            list open — it closes immediately.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-w-sm space-y-3">
            <AsyncAutocomplete
              idPrefix="demo-city"
              label="Search a city"
              options={basic.options}
              loading={basic.loading}
              value={basicValue}
              onValueChange={setBasicValue}
              onSearch={basic.search}
              onSelect={option => {
                setBasicValue(`${option.label}, ${option.description}`)
                setBasicSelected(option.data?.state ?? null)
                basic.reset()
              }}
              onClear={() => {
                setBasicSelected(null)
                basic.reset()
              }}
              placeholder="Search a city"
              leftIcon={<MapPin />}
              optionIcon={<MapPin />}
              emptyMessage="No cities match that search"
            />
            <SelectedNote value={basicSelected} />
          </div>

          <CodeBlock
            code={`import { AsyncAutocomplete } from '@codapet/design-system'
import { MapPin } from 'lucide-react'

// Your fetch layer owns debouncing and cancellation.
const { options, loading, search } = useCitySearch()

<AsyncAutocomplete
  label="Search a city"
  options={options}
  loading={loading}
  value={value}
  onValueChange={setValue}
  onSearch={search}
  onSelect={option => setValue(option.label)}
  placeholder="Search a city"
  leftIcon={<MapPin />}
  optionIcon={<MapPin />}
  emptyMessage="No cities match that search"
/>`}
          />
        </CardContent>
      </Card>

      {/* renderOption */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Custom rows with renderOption
          </CardTitle>
          <CardDescription>
            The default row is one truncated line. Use{' '}
            <span className="font-mono font-semibold">renderOption</span> for
            stacked two-line rows, avatars, or bold match highlighting — the
            wrapper, ARIA roles, ids and keyboard wiring stay with the
            component.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-w-sm">
            <AsyncAutocomplete
              idPrefix="demo-stacked"
              label="Search a city"
              options={stacked.options}
              loading={stacked.loading}
              value={stackedValue}
              onValueChange={setStackedValue}
              onSearch={stacked.search}
              onSelect={option => {
                setStackedValue(option.label)
                stacked.reset()
              }}
              onClear={stacked.reset}
              placeholder="Search a city"
              leftIcon={<Stethoscope />}
              renderOption={option => (
                <>
                  <span className="flex size-[40px] shrink-0 items-center justify-center rounded-[8px] bg-gray-surface-light text-gray-icon-light [&_svg]:size-[20px]">
                    <Building2 />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate font-sans font-semibold text-[16px] leading-[24px] text-vibrant-text-heading">
                      {option.label}
                    </span>
                    <span className="truncate font-sans font-normal text-[14px] leading-[20px] text-vibrant-text-details">
                      {option.description}
                    </span>
                  </span>
                </>
              )}
            />
          </div>

          <CodeBlock
            code={`<AsyncAutocomplete
  options={options}
  onSearch={search}
  onSelect={onSelect}
  renderOption={option => (
    <>
      <span className="size-[40px] rounded-[8px] bg-gray-surface-light …">
        <Building2 />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate font-semibold">{option.label}</span>
        <span className="truncate text-[14px]">{option.description}</span>
      </span>
    </>
  )}
/>`}
          />
        </CardContent>
      </Card>

      {/* Portal escape */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            Escapes clipping ancestors
          </CardTitle>
          <CardDescription>
            The field below sits in a short{' '}
            <span className="font-mono font-semibold">overflow-hidden</span>{' '}
            box. Because the panel is portaled, the results still render in full
            instead of being cut off — which is why several call sites
            hand-rolled{' '}
            <span className="font-mono font-semibold">createPortal</span> before
            this component existed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-[104px] max-w-sm overflow-hidden rounded-xl border border-dashed border-slate-300 p-4 dark:border-slate-700">
            <AsyncAutocomplete
              idPrefix="demo-clipped"
              label="Search a city"
              options={clipped.options}
              loading={clipped.loading}
              value={clippedValue}
              onValueChange={setClippedValue}
              onSearch={clipped.search}
              onSelect={option => {
                setClippedValue(option.label)
                clipped.reset()
              }}
              onClear={clipped.reset}
              placeholder="Search a city"
              leftIcon={<MapPin />}
              optionIcon={<MapPin />}
            />
          </div>
        </CardContent>
      </Card>

      {/* Class slots */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
            Restyling with class slots
          </CardTitle>
          <CardDescription>
            Every part is addressable through{' '}
            <span className="font-mono font-semibold">classNames</span> — the
            field, the input, the clear button, the panel, each row and its
            highlighted/disabled states, the loading and empty rows, and all six
            sheet slots. Classes merge through{' '}
            <span className="font-mono font-semibold">cn</span>, so a caller
            class replaces a conflicting default instead of fighting it. A
            single option can also carry its own{' '}
            <span className="font-mono font-semibold">className</span>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-w-sm">
            <AsyncAutocomplete
              idPrefix="demo-themed"
              label="Search a city"
              options={themed.options}
              loading={themed.loading}
              value={themedValue}
              onValueChange={setThemedValue}
              onSearch={themed.search}
              onSelect={option => {
                setThemedValue(option.label)
                themed.reset()
              }}
              onClear={themed.reset}
              placeholder="Search a city"
              leftIcon={<MapPin />}
              optionIcon={<MapPin />}
              clearLabel="Reset city"
              clearIcon={<Eraser />}
              classNames={{
                input: 'rounded-full border-brand-normal',
                leftIcon: 'text-brand-normal',
                clearButton: 'text-brand-normal',
                // max-h and rounding both replace the defaults via cn.
                content: 'rounded-2xl max-h-[200px] border-brand-light',
                option: 'rounded-full',
                optionHighlighted: 'bg-brand-subtle',
                optionLabel: 'text-brand-text-vibrant',
                empty: 'justify-center italic'
              }}
            />
          </div>

          <CodeBlock
            code={`<AsyncAutocomplete
  options={options}
  onSearch={search}
  onSelect={onSelect}
  clearLabel="Reset city"
  clearIcon={<Eraser />}
  classNames={{
    input: 'rounded-full border-brand-normal',
    leftIcon: 'text-brand-normal',
    clearButton: 'text-brand-normal',
    content: 'rounded-2xl max-h-[200px] border-brand-light',
    option: 'rounded-full',
    optionHighlighted: 'bg-brand-subtle',
    optionLabel: 'text-brand-text-vibrant',
    empty: 'justify-center italic'
  }}
/>

// A single row can override the shared slot:
const options = [
  { id: 'geo', label: 'Use my current location', className: 'font-semibold' },
  ...results
]`}
          />
        </CardContent>
      </Card>

      {/* Sheet */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            mobileVariant=&quot;sheet&quot;
          </CardTitle>
          <CardDescription>
            Below 768px this turns the search into a full-screen takeover with
            the field pinned and the page behind scroll-locked, so there is
            nothing to scroll and the panel cannot drift. Above 768px it is
            identical to the popover. Narrow the window to try it.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-w-sm space-y-3">
            <AsyncAutocomplete
              idPrefix="demo-sheet"
              label="Search a city"
              mobileVariant="sheet"
              sheetTitle="Search cities"
              options={sheet.options}
              loading={sheet.loading}
              value={sheetValue}
              onValueChange={setSheetValue}
              onSearch={sheet.search}
              onSelect={option => {
                setSheetValue(`${option.label}, ${option.description}`)
                setSheetSelected(option.label)
                sheet.reset()
              }}
              onClear={() => {
                setSheetSelected(null)
                sheet.reset()
              }}
              placeholder="Search a city"
              leftIcon={<MapPin />}
              optionIcon={<MapPin />}
            />
            <SelectedNote value={sheetSelected} />
          </div>

          <CodeBlock
            code={`<AsyncAutocomplete
  mobileVariant="sheet"
  sheetTitle="Search cities"
  options={options}
  onSearch={search}
  onSelect={onSelect}
  placeholder="Search a city"
  leftIcon={<MapPin />}
/>`}
          />
        </CardContent>
      </Card>

      {/* Props reference */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-slate-500 rounded-full" />
            Props Reference
          </CardTitle>
          <CardDescription>
            <code className="font-mono text-xs">AsyncAutocomplete</code> is
            generic over the payload you hang off each option:{' '}
            <code className="font-mono text-xs">
              AsyncAutocomplete&lt;TData&gt;
            </code>
            . <code className="font-mono text-xs">TData</code> is inferred from{' '}
            <code className="font-mono text-xs">options</code>, so you never
            write the type argument — and{' '}
            <code className="font-mono text-xs">onSelect</code> hands back a
            typed <code className="font-mono text-xs">option.data</code> with no
            cast.
            <span className="block mt-1">
              Two behaviours are worth knowing before reading the tables. It{' '}
              <strong>never debounces</strong> — one{' '}
              <code className="font-mono text-xs">onSearch</code> per keystroke,
              because cancellation and out-of-order responses belong to your
              fetch layer. And it <strong>never filters</strong>:{' '}
              <code className="font-mono text-xs">options</code> render
              verbatim, because the server already narrowed them. For a static
              list use{' '}
              <code className="font-mono text-xs">SearchableSelect</code>{' '}
              instead.
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <PropsTable
            name="<AsyncAutocomplete> — data"
            description="You own fetching. These three are the whole contract."
            rows={[
              [
                'options',
                'AsyncAutocompleteOption<TData>[]',
                'required',
                'Current result set, rendered verbatim in order. Never filtered, sorted or cached.'
              ],
              [
                'onSearch',
                '(query: string) => void',
                'required',
                "Fired on every keystroke, and with '' when the clear button is pressed. Not debounced — debounce in your fetch layer."
              ],
              [
                'onSelect',
                '(option: AsyncAutocompleteOption<TData>) => void',
                'required',
                'Fired on click, tap or Enter. Closes the panel. Does not write the label into the input — set value yourself.'
              ],
              [
                'loading',
                'boolean',
                'false',
                'A request is in flight. The spinner row only replaces the list when there is nothing else to show — results already on screen stay put and the listbox is marked aria-busy / data-busy, so typing another character does not flash the panel back to "Searching…".'
              ]
            ]}
          />

          <PropsTable
            name="<AsyncAutocomplete> — value"
            description="Controlled or uncontrolled, following the same pattern as SearchInput."
            rows={[
              ['value', 'string', '-', 'Controlled input text.'],
              [
                'defaultValue',
                'string',
                "''",
                'Initial text when uncontrolled.'
              ],
              [
                'onValueChange',
                '(value: string) => void',
                '-',
                'Fired on every input change, and on clear.'
              ],
              [
                'onClear',
                '() => void',
                '-',
                "Fired only by the clear button, after onValueChange('') and onSearch(''). Focus returns to the input automatically."
              ]
            ]}
          />

          <PropsTable
            name="<AsyncAutocomplete> — input chrome"
            description="The text field itself. Rendered with the design system's Input, so it inherits its sizes and error styling."
            rows={[
              [
                'label',
                'string',
                '-',
                'Visible label, wired to the input with htmlFor. A combobox must have an accessible name and a placeholder is not one — pass this, or an aria-label via inputProps. Warns in development when neither is present.'
              ],
              [
                'mandatory',
                'boolean',
                'false',
                'Appends a decorative asterisk to the label and sets aria-required on the input, so screen readers announce "City, required" rather than "City star".'
              ],
              ['placeholder', 'string', '-', 'Input placeholder.'],
              [
                'leftIcon',
                'ReactNode',
                '-',
                'Decorative leading icon — <MapPin />, <Stethoscope />, …'
              ],
              [
                'size',
                '"sm" | "md" | "lg"',
                '"md"',
                'Fixed heights: 40px / 48px / 56px.'
              ],
              [
                'error',
                'boolean',
                'false',
                'Error colour scheme. Also sets aria-invalid.'
              ],
              [
                'disabled',
                'boolean',
                'false',
                'Disables the field and the panel.'
              ],
              [
                'inputRef',
                'Ref<HTMLInputElement>',
                '-',
                'Points at the <input>, for imperative focus (e.g. rAF focus on iOS).'
              ],
              [
                'inputProps',
                'AsyncAutocompleteInputProps',
                '-',
                'Escape hatch for name, enterKeyHint, inputMode, autoFocus, … onFocus / onKeyDown / onPointerDown are chained after the built-ins, not replaced.'
              ],
              [
                'clearIcon',
                'ReactNode',
                '<X />',
                'Replaces the clear button glyph.'
              ],
              [
                'clearLabel',
                'string',
                '"Clear"',
                'Accessible name for the clear button.'
              ]
            ]}
          />

          <PropsTable
            name="<AsyncAutocomplete> — panel content"
            description="What the results list renders. renderOption changes a row's structure; classNames changes its look."
            rows={[
              [
                'renderOption',
                '(option, state) => ReactNode',
                '-',
                'Replaces a row\'s contents. The wrapper, role="option", ids, highlight and click/keyboard wiring stay with the component.'
              ],
              [
                'optionIcon',
                'ReactNode',
                '-',
                'Default leading icon for rows without their own option.icon.'
              ],
              [
                'emptyMessage',
                'string',
                '"No results found"',
                'Shown when a query is present and options is empty. Ignored if emptyState is given.'
              ],
              [
                'emptyState',
                'ReactNode',
                '-',
                'Full replacement for the empty row — an illustration, a CTA, …'
              ],
              [
                'loadingMessage',
                'string',
                '"Searching…"',
                'Copy beside the loading spinner.'
              ]
            ]}
          />

          <PropsTable
            name="<AsyncAutocomplete> — presentation"
            description="Where the results appear, and how the panel is dismissed."
            rows={[
              [
                'mobileVariant',
                '"popover" | "sheet"',
                '"popover"',
                '"popover" always anchors a portaled panel under the field. "sheet" keeps that above 768px but becomes a full-screen takeover on phones, where the page behind is scroll-locked.'
              ],
              [
                'sheetTitle',
                'string',
                '"Search"',
                'Accessible name for the sheet (rendered sr-only).'
              ],
              [
                'sheetCloseIcon',
                'ReactNode',
                '<ArrowLeft />',
                "Replaces the sheet's back-arrow glyph."
              ],
              [
                'sheetCloseLabel',
                'string',
                '"Close search"',
                "Accessible name for the sheet's close button."
              ]
            ]}
          />

          <PropsTable
            name="<AsyncAutocomplete> — open state, ids, styling"
            rows={[
              [
                'open',
                'boolean',
                '-',
                'Controlled open state. Prefer defaultOpen unless you truly need it.'
              ],
              [
                'defaultOpen',
                'boolean',
                'false',
                'Start open — for a field mounted lazily on focus.'
              ],
              [
                'onOpenChange',
                '(open: boolean) => void',
                '-',
                'Open-state changes.'
              ],
              [
                'idPrefix',
                'string',
                'useId()',
                'Prefix for stable DOM ids so analytics autocapture keeps working: {prefix}-input, -clear, -listbox, -suggestion-{index}, and in sheet mode -sheet-input and -sheet-clear. The useId() fallback is fine for ARIA but not usable as a CSS selector.'
              ],
              ['className', 'string', '-', 'Merged onto the root wrapper.'],
              [
                'classNames',
                'AsyncAutocompleteClassNames',
                '-',
                'Per-slot class overrides. See the table below.'
              ]
            ]}
          />

          <PropsTable
            name="AsyncAutocompleteOption<TData>"
            description="One result. id doubles as the DOM id suffix, so prefer a real key like place_id."
            rows={[
              [
                'id',
                'string',
                'required',
                'Stable unique key, also used for the -suggestion-{index} row id.'
              ],
              ['label', 'string', 'required', 'Primary line.'],
              [
                'description',
                'string',
                '-',
                'Secondary line, rendered dimmed after the label.'
              ],
              [
                'icon',
                'ReactNode',
                '-',
                'Leading icon for this row. Falls back to optionIcon.'
              ],
              [
                'disabled',
                'boolean',
                'false',
                'Dimmed, and skipped by keyboard navigation and clicks.'
              ],
              [
                'className',
                'string',
                '-',
                'Merged onto this row only, after classNames.option — so one row can differ from its siblings.'
              ],
              [
                'data',
                'TData',
                '-',
                'Arbitrary payload handed straight back by onSelect. The design system never inspects it.'
              ]
            ]}
          />

          <PropsTable
            name="AsyncAutocompleteClassNames"
            description="Every slot is merged with cn, so a caller class replaces a conflicting default rather than stacking — { content: 'max-h-[420px]' } really does replace the built-in max-height."
            rows={[
              [
                'field',
                'string',
                '-',
                "Wrapper around the input — the popover's anchor."
              ],
              ['label', 'string', '-', 'The visible label element.'],
              ['input', 'string', '-', 'The text input itself.'],
              [
                'leftIcon',
                'string',
                '-',
                'Left icon wrapper inside the input.'
              ],
              ['clearButton', 'string', '-', 'The clear ("X") button.'],
              [
                'content',
                'string',
                '-',
                'The popover surface holding the results.'
              ],
              [
                'listbox',
                'string',
                '-',
                'The role="listbox" container, in both popover and sheet.'
              ],
              ['option', 'string', '-', 'Every option row.'],
              [
                'optionHighlighted',
                'string',
                '-',
                'Added to the highlighted row, on top of option.'
              ],
              [
                'optionDisabled',
                'string',
                '-',
                'Added to a disabled row, on top of option.'
              ],
              [
                'optionIcon',
                'string',
                '-',
                'Icon wrapper in a default row. Not applied when renderOption is used.'
              ],
              [
                'optionLabel',
                'string',
                '-',
                'Primary text span in a default row. Not applied when renderOption is used.'
              ],
              [
                'optionDescription',
                'string',
                '-',
                'Secondary text span in a default row. Not applied when renderOption is used.'
              ],
              ['loading', 'string', '-', 'The loading row.'],
              [
                'loadingSpinner',
                'string',
                '-',
                'The spinner inside the loading row.'
              ],
              [
                'empty',
                'string',
                '-',
                'The empty row. Not applied when emptyState is used.'
              ],
              ['sheetOverlay', 'string', '-', "The sheet's backdrop."],
              ['sheetContent', 'string', '-', 'The sheet panel.'],
              ['sheetHeader', 'string', '-', "The sheet's pinned header row."],
              [
                'sheetCloseButton',
                'string',
                '-',
                "The sheet's close/back button."
              ],
              ['sheetInput', 'string', '-', "The sheet's own text input."],
              [
                'sheetList',
                'string',
                '-',
                "The sheet's scrollable results area."
              ]
            ]}
          />

          <PropsTable
            name="renderOption(option, state)"
            description="The second argument, for match highlighting and custom highlight styling."
            rows={[
              [
                'state.index',
                'number',
                '-',
                'Position in options. Matches the -suggestion-{index} DOM id.'
              ],
              [
                'state.highlighted',
                'boolean',
                '-',
                'True when keyboard- or hover-highlighted (the aria-activedescendant row).'
              ],
              [
                'state.query',
                'string',
                '-',
                'Current input text, for bolding the matched substring.'
              ]
            ]}
          />

          <div>
            <h4 className="text-sm font-semibold mb-1 font-mono">
              Keyboard &amp; ARIA
            </h4>
            <p className="text-xs text-muted-foreground mb-2">
              Full ARIA combobox: the input carries{' '}
              <code className="font-mono">role=&quot;combobox&quot;</code>,{' '}
              <code className="font-mono">aria-expanded</code>,{' '}
              <code className="font-mono">aria-controls</code>,{' '}
              <code className="font-mono">
                aria-autocomplete=&quot;list&quot;
              </code>{' '}
              and <code className="font-mono">aria-activedescendant</code>; rows
              are <code className="font-mono">role=&quot;option&quot;</code>{' '}
              with <code className="font-mono">aria-selected</code> plus{' '}
              <code className="font-mono">data-highlighted</code> /{' '}
              <code className="font-mono">data-disabled</code> for styling.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 font-medium">Key</th>
                    <th className="text-left py-2 font-medium">Result</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    [
                      '↓ / ↑',
                      'Move the highlight, wrapping at both ends and skipping disabled rows. Opens the panel when closed.'
                    ],
                    [
                      'Enter',
                      'Select the highlighted row. Calls preventDefault, so it will not submit an enclosing form.'
                    ],
                    ['Esc', 'Close the panel and keep focus in the input.'],
                    ['Tab', 'Close the panel and move on.'],
                    [
                      'Scroll / swipe',
                      'Closes the panel immediately — but keeps your query and the keyboard. Scrolling inside the list does not close it.'
                    ]
                  ].map(([key, result], i, arr) => (
                    <tr
                      key={key}
                      className={i < arr.length - 1 ? 'border-b' : ''}
                    >
                      <td className="py-2 pr-4 font-mono text-xs whitespace-nowrap">
                        {key}
                      </td>
                      <td className="py-2">{result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spacer so there is something to scroll against. */}
      <div className="h-[70vh] rounded-xl border border-dashed border-slate-300 p-6 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
        Scroll room — open a list above, then scroll here to watch it dismiss.
      </div>
    </div>
  )
}
