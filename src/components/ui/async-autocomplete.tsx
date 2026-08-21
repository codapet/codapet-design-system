import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { ArrowLeft, Loader2, X } from 'lucide-react'
import * as React from 'react'

import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { Input } from './input'

/* ─── Scroll dismissal ─────────────────────────────────────── */

/**
 * Chrome's touch slop is 8px and iOS's is ~10px. Small enough that a real
 * drag feels instant, large enough to ignore the 1-3px of jitter a plain tap
 * produces.
 */
const TOUCH_SLOP_PX = 8

/**
 * Dismisses an open floating layer when the user *intentionally* scrolls.
 *
 * Deliberately listens for `touchmove`/`wheel` rather than `scroll`: focusing
 * an input on mobile opens the on-screen keyboard, and the browser then
 * scrolls the focused field into view. That fires `scroll` (and, on Android,
 * `resize`), so a `scroll` listener would close the panel on the very
 * interaction that opened it. Gestures only exist because a human moved
 * something, which removes the need for grace periods or delta heuristics.
 *
 * Firing at the *start* of the gesture also makes iOS momentum scrolling a
 * non-problem: we are already closed before `touchend`, so the long tail of
 * post-gesture `scroll` events has nothing left to act on.
 */
function useDismissOnScroll(
  enabled: boolean,
  onDismiss: () => void,
  ignore: React.RefObject<HTMLElement | null>[]
) {
  // Latest-value ref: callers pass an inline arrow and a fresh array every
  // render, and re-binding document listeners for that would reset the
  // per-gesture state below. No dependency array — gestures happen after
  // paint, so this is always fresh before the user can produce one.
  const latest = React.useRef({ onDismiss, ignore })
  React.useEffect(() => {
    latest.current = { onDismiss, ignore }
  })

  React.useEffect(() => {
    if (!enabled) return

    let dismissed = false
    let hasOrigin = false
    let originX = 0
    let originY = 0
    let originIgnored = false

    const isIgnored = (target: EventTarget | null) =>
      target instanceof Node &&
      latest.current.ignore.some(ref => !!ref.current?.contains(target))

    const dismiss = () => {
      // Latch: more touchmoves arrive between here and the re-render that
      // flips `enabled` off. Fire exactly once per open cycle.
      if (dismissed) return
      dismissed = true
      latest.current.onDismiss()
    }

    const setOrigin = (target: EventTarget | null, x: number, y: number) => {
      hasOrigin = true
      originX = x
      originY = y
      // A touchmove is always dispatched to the element the touch *started*
      // on, even after the finger leaves it — so "did this gesture start
      // inside the list?" only has to be answered once, here.
      originIgnored = isIgnored(target)
    }

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (touch) setOrigin(event.target, touch.clientX, touch.clientY)
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (dismissed) return
      const touch = event.touches[0]
      if (!touch) return
      // The panel usually opens *during* a touch (tap field -> focus ->
      // open), so these listeners are often bound after touchstart already
      // fired. Without this branch we would measure against a bogus (0,0)
      // origin and dismiss on the first micro-move of the opening tap.
      if (!hasOrigin) {
        setOrigin(event.target, touch.clientX, touch.clientY)
        return
      }
      if (originIgnored) return
      const dx = touch.clientX - originX
      const dy = touch.clientY - originY
      if (dx * dx + dy * dy < TOUCH_SLOP_PX * TOUCH_SLOP_PX) return
      dismiss()
    }

    const handleTouchEnd = () => {
      hasOrigin = false
    }

    const handleWheel = (event: WheelEvent) => {
      // `wheel` targets the element under the pointer, so unlike touch this
      // genuinely needs a per-event containment check.
      if (dismissed || isIgnored(event.target)) return
      dismiss()
    }

    // capture: an ancestor carousel / drawer / map may stopPropagation on
    // touchmove, and capture also runs before React's root listeners.
    // passive: we never preventDefault, and a non-passive document-level
    // touchmove listener forces the compositor off the fast scrolling path.
    const options: AddEventListenerOptions = { passive: true, capture: true }
    document.addEventListener('touchstart', handleTouchStart, options)
    document.addEventListener('touchmove', handleTouchMove, options)
    document.addEventListener('touchend', handleTouchEnd, options)
    document.addEventListener('touchcancel', handleTouchEnd, options)
    document.addEventListener('wheel', handleWheel, options)

    return () => {
      // removeEventListener matches on (type, listener, capture) — `passive`
      // is not part of a listener's identity, but `capture` is, so the third
      // argument here is mandatory.
      document.removeEventListener('touchstart', handleTouchStart, true)
      document.removeEventListener('touchmove', handleTouchMove, true)
      document.removeEventListener('touchend', handleTouchEnd, true)
      document.removeEventListener('touchcancel', handleTouchEnd, true)
      document.removeEventListener('wheel', handleWheel, true)
    }
  }, [enabled])
}

/* ─── Types ────────────────────────────────────────────────── */

export interface AsyncAutocompleteOption<TData = unknown> {
  /** Stable unique key. Doubles as the DOM id suffix — a `place_id`, slug, … */
  id: string
  /** Primary line. */
  label: string
  /** Secondary line, rendered dimmed after the label. */
  description?: string
  /** Leading icon/avatar for this row. Falls back to `optionIcon`. */
  icon?: React.ReactNode
  /** Rendered dimmed, and skipped by keyboard navigation and clicks. */
  disabled?: boolean
  /**
   * Merged onto this row only, after `classNames.option` — so a single row can
   * be styled differently from its siblings (a "use my location" entry, a
   * promoted result).
   */
  className?: string
  /**
   * Arbitrary consumer payload handed straight back by `onSelect` — a raw
   * Google `AutocompletePrediction`, a REST row, a whole domain object. The
   * design system never inspects it.
   */
  data?: TData
}

/** Row state passed to `renderOption`. */
export interface AsyncAutocompleteOptionState {
  /** Position in `options`. Matches the `-suggestion-N` DOM id. */
  index: number
  /** True when keyboard- or hover-highlighted (`aria-activedescendant`). */
  highlighted: boolean
  /** Current input text, for match highlighting. */
  query: string
}

/**
 * Long-tail `<input>` props forwarded to the text field. The props
 * `AsyncAutocomplete` owns are excluded; `onFocus`, `onKeyDown` and
 * `onPointerDown` are chained after the component's own handlers rather than
 * replacing them.
 */
export type AsyncAutocompleteInputProps = Omit<
  React.ComponentPropsWithoutRef<'input'>,
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'size'
  | 'disabled'
  | 'placeholder'
  | 'id'
  | 'type'
  | 'role'
  | 'readOnly'
>

/**
 * Per-slot class overrides. Every entry is merged with `cn`, so
 * tailwind-merge lets a caller class replace a conflicting default rather than
 * fight it — `{ content: 'max-h-[420px]' }` really does replace the built-in
 * max-height.
 *
 * `DateInput`/`TimeInput` expose two or three flat `*ClassName` props;
 * `AsyncAutocomplete` has twenty-odd stylable slots, so they live in one
 * object here instead of twenty top-level props burying `onSearch`/`onSelect`.
 */
export interface AsyncAutocompleteClassNames {
  /** Wrapper around the input — also the popover's anchor. */
  field?: string
  /** The visible label element. */
  label?: string
  /** The text input itself. */
  input?: string
  /** Left icon wrapper inside the input. */
  leftIcon?: string
  /** The clear ("X") button. */
  clearButton?: string
  /** The popover surface holding the results. */
  content?: string
  /** The `role="listbox"` container, in both popover and sheet. */
  listbox?: string
  /** Every option row. */
  option?: string
  /** Added to the highlighted row, on top of `option`. */
  optionHighlighted?: string
  /** Added to a disabled row, on top of `option`. */
  optionDisabled?: string
  /** Icon wrapper inside a default row. Not applied when `renderOption` is used. */
  optionIcon?: string
  /** Primary text span in a default row. Not applied when `renderOption` is used. */
  optionLabel?: string
  /** Secondary text span in a default row. Not applied when `renderOption` is used. */
  optionDescription?: string
  /** The loading row. */
  loading?: string
  /** The spinner inside the loading row. */
  loadingSpinner?: string
  /** The empty ("no results") row. Not applied when `emptyState` is used. */
  empty?: string
  /** The sheet's backdrop. */
  sheetOverlay?: string
  /** The sheet panel. */
  sheetContent?: string
  /** The sheet's pinned header row. */
  sheetHeader?: string
  /** The sheet's close/back button. */
  sheetCloseButton?: string
  /** The sheet's own text input. */
  sheetInput?: string
  /** The sheet's scrollable results area. */
  sheetList?: string
}

export interface AsyncAutocompleteProps<TData = unknown> {
  /* ── Data (consumer-owned fetching) ── */

  /**
   * Current result set, rendered **verbatim**. `AsyncAutocomplete` never
   * filters, sorts or caches — map your API response to options yourself.
   */
  options: AsyncAutocompleteOption<TData>[]
  /**
   * Fired on every keystroke with the raw input text, plus `''` when the
   * clear button is pressed. **Not debounced** — debounce in your fetch layer
   * (`usePlacesService({ debounce: 300 })`, a `setTimeout` hook, …) so
   * request cancellation and out-of-order responses stay with the code that
   * owns them.
   */
  onSearch: (query: string) => void
  /**
   * Fired when an option is committed by click, tap or Enter. Closes the
   * panel. Deliberately does **not** write the label into the input: call
   * sites resolve their own display text (a `getDetails` lookup, a
   * `formatted_address`) or clear the field. Drive `value` yourself.
   */
  onSelect: (option: AsyncAutocompleteOption<TData>) => void
  /**
   * A request is in flight.
   *
   * The spinner row only replaces the list when there is nothing else to show.
   * If results are already on screen they stay put and the listbox is marked
   * `aria-busy` / `data-busy` instead — so typing another character does not
   * flash the panel back to "Searching…".
   */
  loading?: boolean

  /* ── Input text (controlled / uncontrolled) ── */

  /** Controlled input text. */
  value?: string
  /** Initial input text when uncontrolled. */
  defaultValue?: string
  /** Fired on every input change and on clear. */
  onValueChange?: (value: string) => void
  /**
   * Fired only when the clear (X) button is pressed, after
   * `onValueChange('')` and `onSearch('')`. Use it to drop the selected
   * entity. Focus is returned to the input automatically.
   */
  onClear?: () => void

  /* ── Input chrome ── */

  placeholder?: string
  /**
   * Visible label, rendered above the field and wired to it with `htmlFor`.
   *
   * A combobox **must** have an accessible name — the ARIA practices are
   * explicit that a placeholder is not one. Provide either this, or an
   * `aria-label`/`aria-labelledby` through `inputProps`. In development the
   * component warns when neither is present.
   */
  label?: string
  /** Appends a red asterisk to `label`. */
  mandatory?: boolean
  /** Decorative leading icon — `<MapPin />`, `<Stethoscope />`, … */
  leftIcon?: React.ReactNode
  /** Fixed height: `sm` 40px · `md` 48px (default) · `lg` 56px. */
  size?: 'sm' | 'md' | 'lg'
  /** Error color scheme on the input. Also sets `aria-invalid`. */
  error?: boolean
  disabled?: boolean
  /** Forwarded to the underlying `<input>` for imperative focus. */
  inputRef?: React.Ref<HTMLInputElement>
  /** Escape hatch for `name`, `enterKeyHint`, `inputMode`, `autoFocus`, … */
  inputProps?: AsyncAutocompleteInputProps

  /* ── Presentation ── */

  /**
   * `'popover'` (default) always anchors a portaled popover under the field
   * and dismisses it as soon as the user scrolls. `'sheet'` keeps that
   * behavior above 768px but turns the search into a full-screen takeover on
   * phones, where the page behind is scroll-locked.
   */
  mobileVariant?: 'popover' | 'sheet'
  /**
   * Replace a whole row. The default renders `label` plus a dimmed
   * `, description` on one truncated line with a leading icon. Reach for this
   * for stacked two-line rows, avatars, or bold match highlighting — the
   * wrapper, `role="option"`, ids, highlight background and click/keyboard
   * wiring stay with the component.
   *
   * Keep the content non-interactive: it renders inside `role="option"`, and a
   * nested button or link there is both invalid and unreachable by keyboard,
   * since the row is driven by `aria-activedescendant` rather than focus.
   */
  renderOption?: (
    option: AsyncAutocompleteOption<TData>,
    state: AsyncAutocompleteOptionState
  ) => React.ReactNode
  /** Default leading icon for rows without their own `option.icon`. */
  optionIcon?: React.ReactNode
  /** "No results" copy. Ignored when `emptyState` is provided. */
  emptyMessage?: string
  /** Full replacement for the empty row — an illustration, a CTA, … */
  emptyState?: React.ReactNode
  /** Copy beside the loading spinner. */
  loadingMessage?: string
  /** Replaces the clear button's `X` glyph. */
  clearIcon?: React.ReactNode
  /** Accessible name for the clear button. */
  clearLabel?: string
  /** Accessible name for the `mobileVariant="sheet"` takeover. */
  sheetTitle?: string
  /** Replaces the sheet's back-arrow glyph. */
  sheetCloseIcon?: React.ReactNode
  /** Accessible name for the sheet's close button. */
  sheetCloseLabel?: string

  /* ── Open state ── */

  /** Controlled open state. Prefer `defaultOpen` unless you truly need this. */
  open?: boolean
  /** Start open — for fields mounted lazily on focus. */
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void

  /* ── Ids ── */

  /**
   * Prefix for stable DOM ids, so analytics autocapture keeps working:
   * `{idPrefix}-input`, `{idPrefix}-clear`, `{idPrefix}-listbox`,
   * `{idPrefix}-suggestion-{index}`, and in sheet mode also
   * `{idPrefix}-sheet-input` and `{idPrefix}-sheet-clear`. Falls back to a
   * `useId()` value, which is fine for ARIA wiring but not usable as a CSS
   * selector.
   */
  idPrefix?: string

  /* ── Styling ── */

  /** Merged onto the root wrapper. */
  className?: string
  /** Per-slot class overrides. See `AsyncAutocompleteClassNames`. */
  classNames?: AsyncAutocompleteClassNames
}

/* ─── Component ────────────────────────────────────────────── */

const rowClassName =
  'flex items-center gap-[12px] min-h-[48px] px-[8px] rounded-[8px] cursor-pointer select-none transition-colors hover:bg-gray-surface-light'

const messageClassName =
  'flex items-center gap-[8px] min-h-[48px] px-[8px] font-sans font-medium text-[14px] leading-[20px] text-vibrant-text-details'

function AsyncAutocomplete<TData = unknown>({
  options,
  onSearch,
  onSelect,
  loading = false,
  value: valueProp,
  defaultValue = '',
  onValueChange,
  onClear,
  placeholder,
  label,
  mandatory = false,
  leftIcon,
  size = 'md',
  error = false,
  disabled = false,
  inputRef,
  inputProps,
  mobileVariant = 'popover',
  renderOption,
  optionIcon,
  emptyMessage = 'No results found',
  emptyState,
  loadingMessage = 'Searching…',
  clearIcon,
  clearLabel = 'Clear',
  sheetTitle = 'Search',
  sheetCloseIcon,
  sheetCloseLabel = 'Close search',
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  idPrefix,
  className,
  classNames
}: AsyncAutocompleteProps<TData>) {
  const reactId = React.useId()
  const prefix = idPrefix ?? `async-autocomplete-${reactId}`
  const listboxId = `${prefix}-listbox`
  const optionDomId = (index: number) => `${prefix}-suggestion-${index}`

  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1)
  // Which presentation this open cycle committed to. A rotated iPhone 14 is
  // 844px wide — no longer "mobile" — and letting that swap presentation
  // mid-search would drop focus, the keyboard and the scroll lock.
  const [pinnedSheet, setPinnedSheet] = React.useState<boolean | null>(null)

  const fieldRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const pageInputRef = React.useRef<HTMLInputElement | null>(null)
  const sheetInputRef = React.useRef<HTMLInputElement | null>(null)
  const optionRefs = React.useRef<(HTMLDivElement | null)[]>([])

  const isMobile = useIsMobile()

  // A combobox with no accessible name is an accessibility defect, and the
  // failure is silent — so say so at the moment of misuse rather than leaving
  // it to an audit.
  const hasAccessibleName =
    !!label || !!inputProps?.['aria-label'] || !!inputProps?.['aria-labelledby']
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'production' || hasAccessibleName) return
    console.warn(
      '[AsyncAutocomplete] No accessible name. Pass `label`, or an ' +
        '`aria-label`/`aria-labelledby` via `inputProps`. A `placeholder` ' +
        'does not name a combobox.'
    )
  }, [hasAccessibleName])

  const isControlledValue = valueProp !== undefined
  const isControlledOpen = openProp !== undefined
  const query = isControlledValue ? valueProp : internalValue
  const isOpen = isControlledOpen ? openProp : internalOpen

  const wantsSheet = mobileVariant === 'sheet' && isMobile
  const useSheet = isOpen ? (pinnedSheet ?? wantsSheet) : wantsSheet

  const {
    onFocus: inputOnFocus,
    onKeyDown: inputOnKeyDown,
    onPointerDown: inputOnPointerDown,
    ...restInputProps
  } = inputProps ?? {}

  const setPageInputNode = React.useCallback(
    (node: HTMLInputElement | null) => {
      pageInputRef.current = node
      if (typeof inputRef === 'function') inputRef(node)
      else if (inputRef) {
        ;(inputRef as React.RefObject<HTMLInputElement | null>).current = node
      }
    },
    [inputRef]
  )

  const openPanel = React.useCallback(() => {
    if (disabled || isOpen) return
    setPinnedSheet(wantsSheet)
    if (!isControlledOpen) setInternalOpen(true)
    onOpenChange?.(true)
  }, [disabled, isOpen, wantsSheet, isControlledOpen, onOpenChange])

  const closePanel = React.useCallback(() => {
    if (!isOpen) return
    setPinnedSheet(null)
    setHighlightedIndex(-1)
    if (!isControlledOpen) setInternalOpen(false)
    onOpenChange?.(false)
  }, [isOpen, isControlledOpen, onOpenChange])

  const updateValue = React.useCallback(
    (next: string) => {
      if (!isControlledValue) setInternalValue(next)
      onValueChange?.(next)
    },
    [isControlledValue, onValueChange]
  )

  const handleQueryChange = React.useCallback(
    (next: string) => {
      updateValue(next)
      onSearch(next)
      setHighlightedIndex(-1)
      openPanel()
    },
    [updateValue, onSearch, openPanel]
  )

  const handleSelect = React.useCallback(
    (option: AsyncAutocompleteOption<TData>) => {
      if (option.disabled) return
      onSelect(option)
      closePanel()
    },
    [onSelect, closePanel]
  )

  // Keyed on the sheet actually being open, not on the variant: clearing from
  // the closed opener must focus the opener, not the unmounted sheet input.
  const sheetIsOpen = isOpen && useSheet

  const handleClear = React.useCallback(() => {
    updateValue('')
    onSearch('')
    onClear?.()
    setHighlightedIndex(-1)
    // Inside the sheet the user is still in search mode, so it stays open —
    // there is nothing meaningful to anchor a popover to for an empty query.
    if (!sheetIsOpen) closePanel()
    const node = sheetIsOpen ? sheetInputRef.current : pageInputRef.current
    node?.focus()
  }, [updateValue, onSearch, onClear, sheetIsOpen, closePanel])

  // Indexes that keyboard navigation is allowed to land on.
  const enabledIndexes = React.useMemo(
    () =>
      options.reduce<number[]>((acc, option, index) => {
        if (!option.disabled) acc.push(index)
        return acc
      }, []),
    [options]
  )

  const moveHighlight = React.useCallback(
    (delta: 1 | -1) => {
      if (enabledIndexes.length === 0) return
      const current = enabledIndexes.indexOf(highlightedIndex)
      const next =
        current === -1
          ? delta === 1
            ? 0
            : enabledIndexes.length - 1
          : (current + delta + enabledIndexes.length) % enabledIndexes.length
      setHighlightedIndex(enabledIndexes[next])
    },
    [enabledIndexes, highlightedIndex]
  )

  // Key on the ids, not on `options` itself: consumers map their options
  // inline, so the array identity is new on every parent render and keying on
  // it would reset the highlight constantly — arrow keys would never advance.
  const optionsKey = options.map(option => option.id).join('|')
  React.useEffect(() => {
    setHighlightedIndex(-1)
  }, [optionsKey])

  React.useEffect(() => {
    if (highlightedIndex < 0) return
    optionRefs.current[highlightedIndex]?.scrollIntoView({ block: 'nearest' })
  }, [highlightedIndex])

  const hasOptions = options.length > 0
  // The spinner only takes over the panel when there is nothing else to show.
  // Once results are visible, a follow-up keystroke must not throw them away —
  // that made the list flash back to "Searching…" on every character.
  const showLoadingRow = loading && !hasOptions
  const showEmpty = !loading && !hasOptions && query.trim() !== ''
  // Results on screen while the next request is in flight.
  const isRefreshing = loading && hasOptions
  const hasBody = showLoadingRow || hasOptions || showEmpty
  const popoverOpen = isOpen && !useSheet && hasBody

  const dismissIgnoreRefs = React.useMemo(() => [contentRef, fieldRef], [])
  useDismissOnScroll(popoverOpen, closePanel, dismissIgnoreRefs)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // In sheet mode the in-page field is a read-only opener, so keyboard
    // users need an explicit way in.
    if (
      useSheet &&
      !isOpen &&
      (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown')
    ) {
      event.preventDefault()
      openPanel()
      inputOnKeyDown?.(event)
      return
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!isOpen) openPanel()
      else moveHighlight(event.key === 'ArrowDown' ? 1 : -1)
    } else if (event.key === 'Enter') {
      const option =
        highlightedIndex >= 0 ? options[highlightedIndex] : undefined
      if (option) {
        // Also stops an enclosing <form> from submitting.
        event.preventDefault()
        handleSelect(option)
      }
    } else if (event.key === 'Escape') {
      if (isOpen) {
        event.preventDefault()
        closePanel()
      }
    } else if (event.key === 'Tab') {
      closePanel()
    }

    inputOnKeyDown?.(event)
  }

  // In sheet mode the opener and the sheet's own field are both mounted, so
  // each clear button needs its own id — one shared id would be a duplicate.
  const clearButtonProps = (id: string) =>
    query
      ? {
          // `Button` has no default `type`, so without this the clear button
          // submits any enclosing form. preventDefault on pointer-down keeps
          // the iOS keyboard up and stops focus leaving the field.
          type: 'button' as const,
          id,
          'aria-label': clearLabel,
          onMouseDown: (event: React.MouseEvent) => event.preventDefault()
        }
      : undefined

  const renderRow = (option: AsyncAutocompleteOption<TData>, index: number) => {
    const highlighted = highlightedIndex === index
    const icon = option.icon ?? optionIcon

    return (
      <div
        key={option.id}
        id={optionDomId(index)}
        ref={node => {
          optionRefs.current[index] = node
        }}
        role="option"
        aria-selected={highlighted}
        aria-disabled={option.disabled}
        data-slot="async-autocomplete-option"
        data-highlighted={highlighted || undefined}
        data-disabled={option.disabled || undefined}
        // Without this, pointer-down blurs the input, a blur-driven close
        // unmounts the portal, and the click never lands — the row silently
        // does nothing.
        onMouseDown={event => event.preventDefault()}
        onMouseEnter={() => {
          if (!option.disabled) setHighlightedIndex(index)
        }}
        onClick={() => handleSelect(option)}
        // Order is deliberate: base, then state, then the caller's slot
        // classes, then the row's own — most specific wins under tailwind-merge.
        className={cn(
          rowClassName,
          highlighted && 'bg-gray-surface-light',
          option.disabled && 'opacity-50 cursor-not-allowed',
          classNames?.option,
          highlighted && classNames?.optionHighlighted,
          option.disabled && classNames?.optionDisabled,
          option.className
        )}
      >
        {renderOption ? (
          renderOption(option, { index, highlighted, query })
        ) : (
          <>
            {icon && (
              <span
                className={cn(
                  'flex shrink-0 items-center justify-center size-[20px] [&_svg]:size-[20px] text-gray-icon-light',
                  classNames?.optionIcon
                )}
              >
                {icon}
              </span>
            )}
            <span
              className={cn(
                'min-w-0 flex-1 truncate font-sans font-medium text-[16px] leading-[24px] text-vibrant-text-heading',
                classNames?.optionLabel
              )}
            >
              {option.label}
              {option.description && (
                <span
                  className={cn(
                    'text-gray-subtle',
                    classNames?.optionDescription
                  )}
                >
                  {`, ${option.description}`}
                </span>
              )}
            </span>
          </>
        )}
      </div>
    )
  }

  const listbox = (
    <div
      role="listbox"
      id={listboxId}
      // `aria-busy` tells assistive tech the list is updating; `data-busy` is
      // only set while stale results are still shown, so callers can style the
      // refresh (e.g. `classNames.listbox="data-[busy=true]:opacity-60"`).
      aria-busy={loading || undefined}
      data-busy={isRefreshing || undefined}
      className={cn('flex flex-col', classNames?.listbox)}
    >
      {showLoadingRow ? (
        // `role="listbox"` may only own `option` and `group` children, so the
        // status rows are disabled options: still announced, never selectable,
        // and skipped by keyboard nav since they are not in `options`.
        <div
          role="option"
          aria-disabled="true"
          aria-selected="false"
          className={cn(messageClassName, classNames?.loading)}
        >
          <Loader2
            className={cn(
              'size-[16px] animate-spin text-gray-icon-light',
              classNames?.loadingSpinner
            )}
          />
          {loadingMessage}
        </div>
      ) : showEmpty ? (
        <div
          role="option"
          aria-disabled="true"
          aria-selected="false"
          className={cn(!emptyState && messageClassName, classNames?.empty)}
        >
          {emptyState ?? emptyMessage}
        </div>
      ) : (
        options.map(renderRow)
      )}
    </div>
  )

  const activeDescendant =
    highlightedIndex >= 0 ? optionDomId(highlightedIndex) : undefined

  const labelNode = label ? (
    <label
      htmlFor={`${prefix}-input`}
      data-slot="async-autocomplete-label"
      className={cn(
        'flex items-center font-sans font-medium text-[14px] leading-[20px] text-vibrant-text-details',
        classNames?.label
      )}
    >
      {label}
      {mandatory && (
        // Decorative: the requirement is conveyed by aria-required on the
        // input, so screen readers say "City, required" rather than "City star".
        <span
          aria-hidden="true"
          className="ml-0.5 text-[14px] leading-[20px] text-error-surface-default"
        >
          *
        </span>
      )}
    </label>
  ) : null

  const field = (
    <div ref={fieldRef} className={cn('relative w-full', classNames?.field)}>
      <Input
        {...restInputProps}
        ref={setPageInputNode}
        id={`${prefix}-input`}
        type="text"
        autoComplete="off"
        role="combobox"
        aria-haspopup={useSheet ? 'dialog' : 'listbox'}
        aria-expanded={useSheet ? sheetIsOpen : popoverOpen}
        aria-controls={popoverOpen ? listboxId : undefined}
        aria-autocomplete={useSheet ? undefined : 'list'}
        aria-required={mandatory || undefined}
        aria-activedescendant={popoverOpen ? activeDescendant : undefined}
        size={size}
        error={error}
        disabled={disabled}
        placeholder={placeholder}
        leftIcon={leftIcon}
        leftIconClassName={classNames?.leftIcon}
        rightIcon={query ? (clearIcon ?? <X />) : undefined}
        rightIconOnClick={query ? handleClear : undefined}
        rightIconButtonProps={clearButtonProps(`${prefix}-clear`)}
        rightIconClassName={classNames?.clearButton}
        className={cn(restInputProps.className, classNames?.input)}
        // In sheet mode this field is only an opener; all typing happens in
        // the takeover.
        readOnly={useSheet}
        value={query}
        onChange={event => handleQueryChange(event.target.value)}
        onFocus={event => {
          // Never open the sheet from `focus`: Radix Dialog restores focus to
          // its opener on close, so a focus-driven opener reopens forever.
          if (!useSheet) openPanel()
          inputOnFocus?.(event)
        }}
        onPointerDown={event => {
          // Because scroll-dismissal leaves focus in the field, a second tap
          // fires no `focus` event — without this the input goes dead.
          openPanel()
          inputOnPointerDown?.(event)
        }}
        onKeyDown={handleKeyDown}
      />
    </div>
  )

  return (
    <PopoverPrimitive.Root
      open={popoverOpen}
      onOpenChange={next => {
        if (!next) closePanel()
      }}
    >
      <div
        data-slot="async-autocomplete"
        className={cn(
          'flex w-full flex-col',
          labelNode && 'gap-[8px]',
          className
        )}
      >
        {labelNode}
        <PopoverPrimitive.Anchor asChild>{field}</PopoverPrimitive.Anchor>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            ref={contentRef}
            data-slot="async-autocomplete-content"
            sideOffset={8}
            align="start"
            collisionPadding={8}
            // Visual safety net for scrolls that produce no gesture (a hash
            // jump, a programmatic scrollIntoView). It only hides — never
            // rely on it for dismissal.
            hideWhenDetached
            // Focus must never leave the inline input: the keyboard stays up
            // and typing keeps working while the list is open.
            onOpenAutoFocus={event => event.preventDefault()}
            onCloseAutoFocus={event => event.preventDefault()}
            // `Anchor` is not a `Trigger`, so Radix's own "target is the
            // trigger" guard reads a `triggerRef` that is always null here
            // and is dead code. Without this, tapping our own input dismisses.
            onPointerDownOutside={event => {
              if (fieldRef.current?.contains(event.target as Node)) {
                event.preventDefault()
              }
            }}
            // focusin-driven, so it reads the *new* focus owner. A container
            // onBlur + relatedTarget check cannot work here: relatedTarget is
            // falsy across a portal boundary and null on iOS taps.
            onFocusOutside={event => {
              if (fieldRef.current?.contains(event.target as Node)) {
                event.preventDefault()
              }
            }}
            className={cn(
              'z-50 w-[var(--radix-popover-trigger-width)] rounded-[8px] border border-gray-stroke-light bg-white dark:bg-card p-[12px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.05)]',
              // Clamp to what floating-ui measured from the *visual* viewport
              // so the list cannot extend behind the on-screen keyboard, and
              // contain overscroll so a fling inside the list does not chain
              // to the page and drag the anchor with it.
              'max-h-[min(300px,var(--radix-popover-content-available-height))] overflow-y-auto overflow-x-hidden overscroll-contain',
              '[&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-track]:rounded-[3px] [&::-webkit-scrollbar-track]:bg-gray-surface-light [&::-webkit-scrollbar-thumb]:rounded-[3px] [&::-webkit-scrollbar-thumb]:bg-gray-surface-default',
              'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
              classNames?.content
            )}
          >
            {listbox}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </div>

      {mobileVariant === 'sheet' && (
        <DialogPrimitive.Root
          open={sheetIsOpen}
          onOpenChange={next => {
            if (!next) closePanel()
          }}
        >
          <DialogPrimitive.Portal>
            {/* Opaque, not a scrim — the sheet is full-bleed. The Overlay is
                still rendered because Radix hangs the scroll lock and the
                pointer-events blocking off it. */}
            <DialogPrimitive.Overlay
              className={cn(
                'fixed inset-0 z-50 bg-white dark:bg-background',
                classNames?.sheetOverlay
              )}
            />
            <DialogPrimitive.Content
              // No prose to describe; silences Radix's dev warning.
              aria-describedby={undefined}
              className={cn(
                'fixed inset-0 z-50 flex h-[100dvh] w-full flex-col bg-white outline-none dark:bg-background',
                classNames?.sheetContent
              )}
              onOpenAutoFocus={event => {
                // The trap would otherwise grab the close button. iOS only
                // raises the keyboard when .focus() runs inside the
                // activation window of the gesture that opened the sheet.
                event.preventDefault()
                requestAnimationFrame(() => sheetInputRef.current?.focus())
              }}
              // Do not hand focus back to the read-only opener — that is what
              // would make a focus-driven opener loop.
              onCloseAutoFocus={event => event.preventDefault()}
            >
              <DialogPrimitive.Title className="sr-only">
                {sheetTitle}
              </DialogPrimitive.Title>

              {/* Pinned header. The field is at the top for a structural
                  reason: iOS does not resize the layout viewport for the
                  keyboard, so anything anchored to the bottom of a
                  `fixed inset-0` sheet sits behind it. */}
              <div
                className={cn(
                  'flex shrink-0 items-center gap-[8px] p-[12px] pt-[max(12px,env(safe-area-inset-top))]',
                  classNames?.sheetHeader
                )}
              >
                <DialogPrimitive.Close
                  type="button"
                  aria-label={sheetCloseLabel}
                  className={cn(
                    'flex size-[40px] shrink-0 cursor-pointer items-center justify-center rounded-[8px] text-gray-icon-light transition-colors hover:bg-gray-surface-light [&_svg]:size-[20px]',
                    classNames?.sheetCloseButton
                  )}
                >
                  {sheetCloseIcon ?? <ArrowLeft />}
                </DialogPrimitive.Close>
                <div className="min-w-0 flex-1">
                  <Input
                    ref={sheetInputRef}
                    id={`${prefix}-sheet-input`}
                    type="text"
                    autoComplete="off"
                    role="combobox"
                    aria-expanded
                    aria-controls={listboxId}
                    aria-autocomplete="list"
                    aria-activedescendant={activeDescendant}
                    aria-label={label ?? sheetTitle}
                    size={size}
                    placeholder={placeholder}
                    leftIcon={leftIcon}
                    leftIconClassName={classNames?.leftIcon}
                    rightIcon={query ? (clearIcon ?? <X />) : undefined}
                    rightIconOnClick={query ? handleClear : undefined}
                    rightIconButtonProps={clearButtonProps(
                      `${prefix}-sheet-clear`
                    )}
                    rightIconClassName={classNames?.clearButton}
                    className={classNames?.sheetInput}
                    value={query}
                    onChange={event => handleQueryChange(event.target.value)}
                    onKeyDown={handleKeyDown}
                    // 16px minimum, or iOS zooms the page on focus.
                    style={{ fontSize: 16 }}
                  />
                </div>
              </div>

              <div
                className={cn(
                  'flex-1 overflow-y-auto overscroll-contain px-[12px] pb-[max(24px,env(safe-area-inset-bottom))]',
                  classNames?.sheetList
                )}
              >
                {hasBody && listbox}
              </div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      )}
    </PopoverPrimitive.Root>
  )
}

export { AsyncAutocomplete }
