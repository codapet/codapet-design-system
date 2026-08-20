import * as React from 'react'

/**
 * SSR-safe media query subscription.
 *
 * Built on `useSyncExternalStore` so that **hydration renders the server value**
 * and only then switches to the real match. The previous implementation read
 * `window.matchMedia(query).matches` inside `useState`'s initialiser, which made
 * the first client render disagree with the server HTML. React reports that as a
 * hydration mismatch and explicitly does not patch it up: on a phone,
 * `SmartDialog` shipped server-rendered `data-slot="dialog-trigger"` markup that
 * stayed in the DOM while React believed it had rendered a Drawer.
 *
 * The consequence for consumers: `matches` is `false` for the first client
 * render regardless of viewport, then settles. Anything that must not flash
 * should render neutral markup while it is `false`.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      const list = window.matchMedia(query)
      // Safari < 14 exposes only the deprecated listener API.
      if (list.addEventListener) {
        list.addEventListener('change', onStoreChange)
        return () => list.removeEventListener('change', onStoreChange)
      }
      list.addListener(onStoreChange)
      return () => list.removeListener(onStoreChange)
    },
    [query]
  )

  const getSnapshot = React.useCallback(
    () => window.matchMedia(query).matches,
    [query]
  )

  // Server snapshot is always false — the server has no viewport to measure.
  const getServerSnapshot = React.useCallback(() => false, [])

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
