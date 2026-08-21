import { act, fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, it, vi } from 'vitest'

import {
  AsyncAutocomplete,
  type AsyncAutocompleteOption
} from './async-autocomplete'

/* ─── Helpers ──────────────────────────────────────────────── */

const OPTIONS: AsyncAutocompleteOption<{ tag: string }>[] = [
  { id: 'a', label: 'Alpha', description: 'CA', data: { tag: 'a' } },
  { id: 'b', label: 'Bravo', disabled: true, data: { tag: 'b' } },
  { id: 'c', label: 'Charlie', data: { tag: 'c' } }
]

function setup(
  props: Partial<React.ComponentProps<typeof AsyncAutocomplete>> = {}
) {
  const onSearch = vi.fn()
  const onSelect = vi.fn()
  const onOpenChange = vi.fn()
  const utils = render(
    <AsyncAutocomplete
      idPrefix="ac"
      options={OPTIONS}
      onSearch={onSearch}
      onSelect={onSelect}
      onOpenChange={onOpenChange}
      defaultOpen
      {...props}
    />
  )
  return { ...utils, onSearch, onSelect, onOpenChange }
}

const combobox = () => screen.getByRole('combobox')

/**
 * jsdom does not implement `Touch`/`TouchEvent` constructors, so synthesize
 * the two fields the hook actually reads.
 */
function touch(type: string, target: Element | Document, x: number, y: number) {
  const event = new Event(type, { bubbles: true, cancelable: true })
  Object.defineProperty(event, 'touches', {
    value: [{ clientX: x, clientY: y }]
  })
  // Raw dispatchEvent bypasses the act() wrapper fireEvent applies, so state
  // updates from the hook would not be flushed before the assertions.
  act(() => {
    target.dispatchEvent(event)
  })
}

/* ─── Rendering ────────────────────────────────────────────── */

describe('AsyncAutocomplete', () => {
  it('renders every option verbatim, without filtering on the query', () => {
    setup({ defaultValue: 'zzzz' })
    // None of the labels match "zzzz" — an async source already filtered.
    expect(screen.getAllByRole('option')).toHaveLength(3)
  })

  it('shows the loading row instead of selectable options while loading', () => {
    // No options yet — otherwise the spinner correctly stays out of the way.
    setup({ options: [], loading: true, loadingMessage: 'Looking…' })
    expect(screen.getByText('Looking…')).toBeInTheDocument()
    // The status row is a disabled option so the listbox owns only valid
    // children; nothing selectable is offered.
    const selectable = screen
      .queryAllByRole('option')
      .filter(o => o.getAttribute('aria-disabled') !== 'true')
    expect(selectable).toHaveLength(0)
  })

  it('keeps every listbox child a valid option role', () => {
    // `role="listbox"` may only own `option`/`group`. Bare status divs inside
    // it are invalid, so loading and empty rows carry a disabled option role.
    const cases: Partial<React.ComponentProps<typeof AsyncAutocomplete>>[] = [
      { loading: true },
      { options: [], value: 'nothing' }
    ]
    for (const props of cases) {
      const { unmount } = setup(props)
      const listbox = screen.getByRole('listbox')
      const children = [...listbox.children]
      expect(children.length).toBeGreaterThan(0)
      children.forEach(child =>
        expect(['option', 'group']).toContain(child.getAttribute('role'))
      )
      unmount()
    }
  })

  it('shows the empty message only once a query has been typed', () => {
    const { rerender } = setup({ options: [], defaultValue: '' })
    expect(screen.queryByText('No results found')).not.toBeInTheDocument()

    rerender(
      <AsyncAutocomplete
        idPrefix="ac"
        options={[]}
        value="nothing"
        onSearch={vi.fn()}
        onSelect={vi.fn()}
        defaultOpen
      />
    )
    expect(screen.getByText('No results found')).toBeInTheDocument()
  })

  /* ─── Loading vs. visible results ────────────────────────── */

  describe('refreshing without discarding results', () => {
    /**
     * The reported bug: typing "san", waiting for results, then continuing to
     * type ("san francisco") made the whole panel revert to the loading row,
     * because `loading ? spinner : options` discarded results already on
     * screen. Fetch layers set `loading` on every keystroke, so the component
     * has to tolerate that.
     */
    it('keeps the previous options rendered while the next request runs', () => {
      const { rerender } = render(
        <AsyncAutocomplete
          idPrefix="ac"
          label="City"
          options={OPTIONS}
          value="san"
          onSearch={vi.fn()}
          onSelect={vi.fn()}
          defaultOpen
        />
      )
      expect(screen.getAllByRole('option')).toHaveLength(3)

      // Another character typed: loading true, results not yet replaced.
      rerender(
        <AsyncAutocomplete
          idPrefix="ac"
          label="City"
          options={OPTIONS}
          value="san francisco"
          loading
          onSearch={vi.fn()}
          onSelect={vi.fn()}
          defaultOpen
        />
      )

      expect(screen.getAllByRole('option')).toHaveLength(3)
      expect(screen.getByText('Alpha')).toBeInTheDocument()
      expect(screen.queryByText('Searching…')).not.toBeInTheDocument()

      const listbox = screen.getByRole('listbox')
      expect(listbox).toHaveAttribute('aria-busy', 'true')
      expect(listbox).toHaveAttribute('data-busy', 'true')
    })

    it('shows the spinner only when there is nothing else to show', () => {
      setup({ options: [], loading: true })
      expect(screen.getByText('Searching…')).toBeInTheDocument()
      const listbox = screen.getByRole('listbox')
      expect(listbox).toHaveAttribute('aria-busy', 'true')
      // Not a refresh — there are no stale results underneath.
      expect(listbox).not.toHaveAttribute('data-busy')
    })

    it('drops the busy flags once the request settles', () => {
      setup({ loading: false })
      const listbox = screen.getByRole('listbox')
      expect(listbox).not.toHaveAttribute('aria-busy')
      expect(listbox).not.toHaveAttribute('data-busy')
    })

    it('still swaps in new results when they arrive', () => {
      const { rerender } = render(
        <AsyncAutocomplete
          idPrefix="ac"
          label="City"
          options={OPTIONS}
          value="san francisco"
          loading
          onSearch={vi.fn()}
          onSelect={vi.fn()}
          defaultOpen
        />
      )
      rerender(
        <AsyncAutocomplete
          idPrefix="ac"
          label="City"
          options={[{ id: 'sf', label: 'San Francisco', description: 'CA' }]}
          value="san francisco"
          onSearch={vi.fn()}
          onSelect={vi.fn()}
          defaultOpen
        />
      )
      expect(screen.getAllByRole('option')).toHaveLength(1)
      expect(screen.getByText('San Francisco')).toBeInTheDocument()
      expect(screen.getByRole('listbox')).not.toHaveAttribute('data-busy')
    })
  })

  /* ─── Keyboard ───────────────────────────────────────────── */

  it('wraps arrow navigation and skips disabled options', () => {
    setup()
    const input = combobox()

    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(input).toHaveAttribute('aria-activedescendant', 'ac-suggestion-0')

    // Skips index 1 ("Bravo", disabled).
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(input).toHaveAttribute('aria-activedescendant', 'ac-suggestion-2')

    // Wraps back to the top.
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(input).toHaveAttribute('aria-activedescendant', 'ac-suggestion-0')

    // And backwards, skipping the disabled row again.
    fireEvent.keyDown(input, { key: 'ArrowUp' })
    expect(input).toHaveAttribute('aria-activedescendant', 'ac-suggestion-2')
  })

  it('marks the highlighted option as aria-selected', () => {
    setup()
    fireEvent.keyDown(combobox(), { key: 'ArrowDown' })
    expect(
      screen.getByText('Alpha').closest('[role="option"]')
    ).toHaveAttribute('aria-selected', 'true')
  })

  it('selects the highlighted option on Enter, with its payload', () => {
    const { onSelect } = setup()
    const input = combobox()

    fireEvent.keyDown(input, { key: 'ArrowDown' })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect.mock.calls[0][0]).toMatchObject({
      id: 'a',
      data: { tag: 'a' }
    })
    expect(screen.queryAllByRole('option')).toHaveLength(0)
  })

  it('does nothing on Enter when no option is highlighted', () => {
    const { onSelect } = setup()
    fireEvent.keyDown(combobox(), { key: 'Enter' })
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('closes on Escape and keeps focus in the input', () => {
    const { onOpenChange } = setup()
    const input = combobox()
    input.focus()

    fireEvent.keyDown(input, { key: 'Escape' })

    expect(screen.queryAllByRole('option')).toHaveLength(0)
    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(document.activeElement).toBe(input)
  })

  /* ─── Selection by pointer ───────────────────────────────── */

  it('selects on click and ignores clicks on disabled options', () => {
    const { onSelect } = setup()

    fireEvent.click(screen.getByText('Bravo'))
    expect(onSelect).not.toHaveBeenCalled()

    fireEvent.click(screen.getByText('Charlie'))
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect.mock.calls[0][0]).toMatchObject({ id: 'c' })
  })

  /* ─── Query + clear ──────────────────────────────────────── */

  it('reports every keystroke through onSearch and onValueChange', () => {
    const onValueChange = vi.fn()
    const { onSearch } = setup({ onValueChange })

    fireEvent.change(combobox(), { target: { value: 'den' } })

    expect(onSearch).toHaveBeenCalledWith('den')
    expect(onValueChange).toHaveBeenCalledWith('den')
  })

  it('clear resets the value, re-searches for empty, and fires onClear', () => {
    const onValueChange = vi.fn()
    const onClear = vi.fn()
    const { onSearch } = setup({
      defaultValue: 'Denver',
      onValueChange,
      onClear
    })

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }))

    expect(onValueChange).toHaveBeenCalledWith('')
    expect(onSearch).toHaveBeenCalledWith('')
    expect(onClear).toHaveBeenCalledTimes(1)
  })

  it('gives the clear button type=button so it cannot submit a form', () => {
    const onSubmit = vi.fn(event => event.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <AsyncAutocomplete
          idPrefix="form-ac"
          options={[]}
          defaultValue="x"
          onSearch={vi.fn()}
          onSelect={vi.fn()}
        />
      </form>
    )
    expect(screen.getByRole('button', { name: 'Clear' })).toHaveAttribute(
      'type',
      'button'
    )
  })

  it('exposes stable analytics ids derived from idPrefix', () => {
    setup()
    expect(combobox()).toHaveAttribute('id', 'ac-input')
    expect(screen.getByRole('listbox')).toHaveAttribute('id', 'ac-listbox')
    expect(screen.getAllByRole('option')[0]).toHaveAttribute(
      'id',
      'ac-suggestion-0'
    )
  })

  /* ─── Accessible name ────────────────────────────────────── */

  describe('accessible name', () => {
    it('associates a visible label with the combobox', () => {
      setup({ label: 'Search a city' })
      // getByLabelText only resolves through a real htmlFor/id association.
      const input = screen.getByLabelText('Search a city')
      expect(input).toBe(combobox())
      expect(input).toHaveAccessibleName('Search a city')
    })

    it('conveys mandatory via aria-required, not a spoken asterisk', () => {
      setup({ label: 'City', mandatory: true })
      // The asterisk is decorative, so the name stays clean.
      expect(combobox()).toHaveAccessibleName('City')
      expect(combobox()).toHaveAttribute('aria-required', 'true')
      expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true')
    })

    it('accepts aria-label through inputProps instead', () => {
      setup({ inputProps: { 'aria-label': 'Where do you live?' } })
      expect(combobox()).toHaveAccessibleName('Where do you live?')
    })

    it('warns in development when nothing names the combobox', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
      setup({ placeholder: 'Search a city' })
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('No accessible name')
      )
      warn.mockRestore()
    })

    it('does not warn once a label is supplied', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
      setup({ label: 'City' })
      expect(warn).not.toHaveBeenCalledWith(
        expect.stringContaining('No accessible name')
      )
      warn.mockRestore()
    })
  })

  /* ─── Styling hooks ──────────────────────────────────────── */

  describe('customisation', () => {
    it('applies every popover-side class slot', () => {
      setup({
        classNames: {
          field: 'slot-field',
          input: 'slot-input',
          clearButton: 'slot-clear',
          content: 'slot-content',
          listbox: 'slot-listbox',
          option: 'slot-option',
          optionHighlighted: 'slot-highlighted',
          optionDisabled: 'slot-disabled',
          optionLabel: 'slot-label'
        },
        defaultValue: 'san'
      })

      const input = combobox()
      expect(input).toHaveClass('slot-input')
      expect(input.closest('.slot-field')).not.toBeNull()
      expect(screen.getByRole('button', { name: 'Clear' })).toHaveClass(
        'slot-clear'
      )
      expect(screen.getByRole('listbox')).toHaveClass('slot-listbox')
      expect(
        screen.getByRole('listbox').closest('.slot-content')
      ).not.toBeNull()

      const rows = screen.getAllByRole('option')
      rows.forEach(row => expect(row).toHaveClass('slot-option'))
      // "Bravo" is the disabled fixture.
      expect(rows[1]).toHaveClass('slot-disabled')
      expect(rows[0]).not.toHaveClass('slot-disabled')
      expect(screen.getByText('Alpha')).toHaveClass('slot-label')

      fireEvent.keyDown(input, { key: 'ArrowDown' })
      expect(rows[0]).toHaveClass('slot-highlighted')
      expect(rows[2]).not.toHaveClass('slot-highlighted')
    })

    it('lets a caller class win over a conflicting default', () => {
      // tailwind-merge should drop the built-in max-height, not stack with it.
      setup({ classNames: { content: 'max-h-[420px]' } })
      const content = screen
        .getByRole('listbox')
        .closest('[data-slot="async-autocomplete-content"]')
      expect(content?.className).toContain('max-h-[420px]')
      expect(content?.className).not.toContain('max-h-[min(300px')
    })

    it('applies a per-option className on top of the shared slot', () => {
      setup({
        classNames: { option: 'shared-row' },
        options: [
          { id: 'x', label: 'Plain' },
          { id: 'y', label: 'Promoted', className: 'promoted-row' }
        ]
      })
      const rows = screen.getAllByRole('option')
      expect(rows[0]).toHaveClass('shared-row')
      expect(rows[0]).not.toHaveClass('promoted-row')
      expect(rows[1]).toHaveClass('shared-row', 'promoted-row')
    })

    it('styles the loading and empty rows', () => {
      const { unmount } = setup({
        options: [],
        loading: true,
        classNames: { loading: 'slot-loading', loadingSpinner: 'slot-spinner' }
      })
      expect(screen.getByText('Searching…')).toHaveClass('slot-loading')
      expect(
        screen.getByText('Searching…').querySelector('.slot-spinner')
      ).not.toBeNull()
      unmount()

      setup({
        options: [],
        value: 'nothing',
        classNames: { empty: 'slot-empty' }
      })
      expect(screen.getByText('No results found')).toHaveClass('slot-empty')
    })

    it('accepts a custom clear icon and label', () => {
      setup({
        defaultValue: 'x',
        clearLabel: 'Reset location',
        clearIcon: <span data-testid="custom-clear">reset</span>
      })
      const button = screen.getByRole('button', { name: 'Reset location' })
      expect(button).toBeInTheDocument()
      expect(screen.getByTestId('custom-clear')).toBeInTheDocument()
    })

    it('exposes data-highlighted and data-disabled for parent-level styling', () => {
      setup()
      const rows = screen.getAllByRole('option')
      expect(rows[1]).toHaveAttribute('data-disabled', 'true')
      expect(rows[0]).not.toHaveAttribute('data-disabled')

      fireEvent.keyDown(combobox(), { key: 'ArrowDown' })
      expect(rows[0]).toHaveAttribute('data-highlighted', 'true')
    })

    it('keeps renderOption in charge of row content but still applies row slots', () => {
      setup({
        classNames: { option: 'slot-option' },
        renderOption: option => <em data-testid="custom-row">{option.label}</em>
      })
      expect(screen.getAllByTestId('custom-row')).toHaveLength(3)
      // The default label/description spans are gone, the wrapper survives.
      expect(screen.getAllByRole('option')[0]).toHaveClass('slot-option')
    })
  })

  /* ─── Sheet variant ──────────────────────────────────────── */

  describe('mobileVariant="sheet"', () => {
    /** `useIsMobile` reads window.innerWidth on mount. */
    function atMobileWidth() {
      const original = window.innerWidth
      Object.defineProperty(window, 'innerWidth', {
        value: 375,
        configurable: true,
        writable: true
      })
      return () =>
        Object.defineProperty(window, 'innerWidth', {
          value: original,
          configurable: true,
          writable: true
        })
    }

    it('turns the in-page field into a read-only opener', () => {
      const restore = atMobileWidth()
      try {
        setup({ mobileVariant: 'sheet', defaultOpen: false })
        const opener = combobox()
        expect(opener).toHaveAttribute('readonly')
        expect(opener).toHaveAttribute('aria-haspopup', 'dialog')
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      } finally {
        restore()
      }
    })

    it('opens on pointerdown, not on focus', () => {
      const restore = atMobileWidth()
      try {
        setup({ mobileVariant: 'sheet', defaultOpen: false })
        const opener = combobox()

        // Focus alone must not open it — Radix Dialog restores focus to its
        // opener on close, so a focus-driven opener would reopen forever.
        fireEvent.focus(opener)
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

        fireEvent.pointerDown(opener)
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      } finally {
        restore()
      }
    })

    it('gives the opener and the sheet field distinct clear-button ids', () => {
      const restore = atMobileWidth()
      try {
        setup({
          mobileVariant: 'sheet',
          defaultOpen: false,
          defaultValue: 'Denver'
        })
        fireEvent.pointerDown(combobox())

        // Both fields are mounted at once, so a shared id would be a
        // duplicate. Query the DOM rather than the a11y tree: Radix
        // aria-hides everything behind the dialog, so a role query only ever
        // sees the sheet's own button.
        const ids = [
          ...document.querySelectorAll('button[aria-label="Clear"]')
        ].map(button => button.id)
        expect(ids).toHaveLength(2)
        expect(new Set(ids).size).toBe(2)
        expect(ids).toContain('ac-clear')
        expect(ids).toContain('ac-sheet-clear')

        // And the background really is hidden from assistive tech.
        expect(screen.getAllByRole('button', { name: 'Clear' })).toHaveLength(1)
      } finally {
        restore()
      }
    })

    it('applies the sheet class slots and a custom close label', () => {
      const restore = atMobileWidth()
      try {
        setup({
          mobileVariant: 'sheet',
          defaultOpen: false,
          sheetTitle: 'Find a city',
          sheetCloseLabel: 'Back to form',
          classNames: {
            sheetContent: 'slot-sheet',
            sheetHeader: 'slot-sheet-header',
            sheetCloseButton: 'slot-sheet-close',
            sheetList: 'slot-sheet-list'
          }
        })
        fireEvent.pointerDown(combobox())

        const dialog = screen.getByRole('dialog')
        expect(dialog).toHaveClass('slot-sheet')
        expect(dialog.querySelector('.slot-sheet-header')).not.toBeNull()
        expect(dialog.querySelector('.slot-sheet-list')).not.toBeNull()

        const close = screen.getByRole('button', { name: 'Back to form' })
        expect(close).toHaveClass('slot-sheet-close')
        expect(screen.getByText('Find a city')).toBeInTheDocument()
      } finally {
        restore()
      }
    })

    it('renders results inside the sheet and no popover alongside it', () => {
      const restore = atMobileWidth()
      try {
        setup({ mobileVariant: 'sheet', defaultOpen: false })
        fireEvent.pointerDown(combobox())

        const listbox = screen.getByRole('listbox')
        expect(listbox.closest('[role="dialog"]')).not.toBeNull()
        expect(
          document.querySelectorAll('[data-slot="async-autocomplete-content"]')
        ).toHaveLength(0)
      } finally {
        restore()
      }
    })
  })

  /* ─── Scroll dismissal ───────────────────────────────────── */

  describe('dismiss on scroll', () => {
    it('ignores movement below the touch slop', () => {
      const { onOpenChange } = setup()

      touch('touchstart', document.body, 100, 100)
      touch('touchmove', document.body, 102, 103)

      expect(screen.getAllByRole('option')).toHaveLength(3)
      expect(onOpenChange).not.toHaveBeenCalled()
    })

    it('dismisses once the gesture passes the touch slop', () => {
      const { onOpenChange } = setup()

      touch('touchstart', document.body, 100, 100)
      touch('touchmove', document.body, 100, 120)

      expect(onOpenChange).toHaveBeenCalledWith(false)
      expect(screen.queryAllByRole('option')).toHaveLength(0)
    })

    it('dismisses exactly once per open cycle', () => {
      const { onOpenChange } = setup()

      touch('touchstart', document.body, 100, 100)
      touch('touchmove', document.body, 100, 120)
      touch('touchmove', document.body, 100, 200)
      touch('touchmove', document.body, 100, 400)

      expect(onOpenChange).toHaveBeenCalledTimes(1)
    })

    it('does not dismiss when the gesture starts inside the result list', () => {
      const { onOpenChange } = setup()
      const row = screen.getAllByRole('option')[0]

      // touchmove is always retargeted to where the touch began, which is why
      // the origin decides this and not the per-move target.
      touch('touchstart', row, 100, 100)
      touch('touchmove', row, 100, 400)

      expect(screen.getAllByRole('option')).toHaveLength(3)
      expect(onOpenChange).not.toHaveBeenCalled()
    })

    it('does not dismiss when the gesture starts inside the field', () => {
      const { onOpenChange } = setup()

      // e.g. long-press then drag the text caret.
      touch('touchstart', combobox(), 100, 100)
      touch('touchmove', combobox(), 140, 100)

      expect(onOpenChange).not.toHaveBeenCalled()
    })

    it('dismisses on a wheel outside the list but not inside it', () => {
      const { onOpenChange } = setup()

      fireEvent.wheel(screen.getByRole('listbox'), { deltaY: 120 })
      expect(onOpenChange).not.toHaveBeenCalled()

      fireEvent.wheel(document.body, { deltaY: 120 })
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it('unbinds its listeners on unmount', () => {
      const { onOpenChange, unmount } = setup()
      unmount()

      touch('touchstart', document.body, 100, 100)
      touch('touchmove', document.body, 100, 400)
      fireEvent.wheel(document.body, { deltaY: 120 })

      expect(onOpenChange).not.toHaveBeenCalled()
    })

    it('does not bind while the panel is closed', () => {
      const { onOpenChange } = setup({ defaultOpen: false })

      touch('touchstart', document.body, 100, 100)
      touch('touchmove', document.body, 100, 400)

      expect(onOpenChange).not.toHaveBeenCalled()
    })
  })
})
