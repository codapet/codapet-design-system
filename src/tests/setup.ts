import '@testing-library/jest-dom'
import { vi } from 'vitest'

/* ─── jsdom gaps ───────────────────────────────────────────── */

// `useIsMobile` (and therefore Sidebar, AsyncAutocomplete, SmartDialog*) calls
// window.matchMedia on mount. jsdom does not implement it.
if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  })) as unknown as typeof window.matchMedia
}

// Radix Popper/Popover positions with ResizeObserver.
if (!('ResizeObserver' in globalThis)) {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
}

// Not implemented in jsdom; components that keep a highlighted row in view
// call it directly.
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = vi.fn()
}
