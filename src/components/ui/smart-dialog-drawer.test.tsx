import { render, screen } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Dialog, DialogContent, DialogOverlay, DialogPortal } from './dialog'
import { Drawer, DrawerContent } from './drawer'
import {
  SmartDialog,
  SmartDialogContent,
  SmartDialogDescription,
  SmartDialogHeader,
  SmartDialogTitle,
  SmartDialogTrigger
} from './smart-dialog-drawer'

/** Force the viewport answer that `useMediaQuery` sees. */
function setViewportMatches(matches: boolean) {
  window.matchMedia = ((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  })) as unknown as typeof window.matchMedia
}

const tree = (
  <SmartDialog defaultOpen>
    <SmartDialogTrigger>Open</SmartDialogTrigger>
    <SmartDialogContent>
      <SmartDialogHeader>
        <SmartDialogTitle>Title</SmartDialogTitle>
        <SmartDialogDescription>Body</SmartDialogDescription>
      </SmartDialogHeader>
    </SmartDialogContent>
  </SmartDialog>
)

afterEach(() => {
  setViewportMatches(false)
})

describe('SmartDialog', () => {
  /**
   * The regression that matters: the server has no viewport, so server output
   * must be the Dialog variant no matter what matchMedia reports. When this
   * broke, mobile page loads shipped `data-slot="dialog-trigger"` HTML that
   * React then hydrated as a Drawer — a mismatch React explicitly does not
   * patch up, leaving the DOM and React disagreeing.
   */
  it('renders the dialog variant on the server even at a mobile viewport', () => {
    setViewportMatches(true)
    const html = renderToString(tree)
    expect(html).toContain('data-slot="dialog-trigger"')
    expect(html).not.toContain('data-slot="drawer-trigger"')
  })

  it('renders the dialog variant on the server at a desktop viewport too', () => {
    setViewportMatches(false)
    const html = renderToString(tree)
    expect(html).toContain('data-slot="dialog-trigger"')
  })

  it('settles on the drawer variant on the client below 600px', () => {
    setViewportMatches(true)
    render(tree)
    expect(
      document.querySelector('[data-slot="drawer-trigger"]')
    ).not.toBeNull()
    expect(document.querySelector('[data-slot="dialog-trigger"]')).toBeNull()
  })

  it('settles on the dialog variant on the client above 600px', () => {
    setViewportMatches(false)
    render(tree)
    expect(
      document.querySelector('[data-slot="dialog-trigger"]')
    ).not.toBeNull()
    expect(document.querySelector('[data-slot="drawer-trigger"]')).toBeNull()
  })

  it('keeps every sub-component on the same side of the breakpoint', () => {
    setViewportMatches(true)
    render(tree)
    // A split decision is the failure mode that throws Radix context errors:
    // a Drawer root with Dialog children, or the reverse.
    const dialogParts = document.querySelectorAll('[data-slot^="dialog-"]')
    const drawerParts = document.querySelectorAll('[data-slot^="drawer-"]')
    expect(drawerParts.length).toBeGreaterThan(0)
    expect(dialogParts).toHaveLength(0)
  })

  it('renders title and description content in both variants', () => {
    setViewportMatches(true)
    const { unmount } = render(tree)
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
    unmount()

    setViewportMatches(false)
    render(tree)
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
  })
})

/**
 * These pin the behaviours AGENTS.md documents as traps. If one starts failing,
 * the guide is now lying to consuming agents — fix both together.
 */
describe('dialog-family composition (documented traps)', () => {
  it('DialogContent renders its own overlay — exactly one', () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>body</DialogContent>
      </Dialog>
    )
    expect(
      document.querySelectorAll('[data-slot="dialog-overlay"]')
    ).toHaveLength(1)
  })

  it('hand-wrapping in Portal + Overlay double-stacks the backdrop', () => {
    // The shape stock shadcn examples use. Documented as the thing not to copy.
    render(
      <Dialog defaultOpen>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent>body</DialogContent>
        </DialogPortal>
      </Dialog>
    )
    expect(
      document.querySelectorAll('[data-slot="dialog-overlay"]')
    ).toHaveLength(2)
  })

  it('withCloseButton controls the drag handle, not the X', () => {
    setViewportMatches(true)
    render(
      <Drawer defaultOpen>
        <DrawerContent withCloseButton={false}>body</DrawerContent>
      </Drawer>
    )
    const content = document.querySelector('[data-slot="drawer-content"]')!
    expect(content.querySelector('.bg-muted.mx-auto')).toBeNull()
    // The X survives — this is the misleading part of the name.
    expect(
      content.querySelector('[data-slot="drawer-close-button"]')
    ).not.toBeNull()
  })

  it('showCloseButton is what removes the X', () => {
    setViewportMatches(true)
    render(
      <Drawer defaultOpen>
        <DrawerContent showCloseButton={false}>body</DrawerContent>
      </Drawer>
    )
    const content = document.querySelector('[data-slot="drawer-content"]')!
    expect(
      content.querySelector('[data-slot="drawer-close-button"]')
    ).toBeNull()
  })
})
