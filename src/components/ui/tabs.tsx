'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

/* ─── Internal Context ─────────────────────────────────────── */

type TabsContextValue = {
  orientation: 'horizontal' | 'vertical'
  /** False until the active tab first changes, so initial content never animates in. */
  hasSwitched: boolean
}

const TabsContext = React.createContext<TabsContextValue>({
  orientation: 'horizontal',
  hasSwitched: false
})

/* ─── useTabIndicator hook ─────────────────────────────────── */

function useTabIndicator(
  listRef: React.RefObject<HTMLElement | null>,
  orientation: 'horizontal' | 'vertical'
) {
  const [style, setStyle] = React.useState<React.CSSProperties>({
    position: 'absolute',
    opacity: 0
  })
  const isFirstMeasurement = React.useRef(true)

  const measure = React.useCallback(() => {
    const list = listRef.current
    if (!list) return

    requestAnimationFrame(() => {
      const activeEl = list.querySelector<HTMLElement>(
        '[data-state="active"]'
      )
      if (!activeEl) return

      const noTransition = isFirstMeasurement.current

      // Measure with client rects, not offsetLeft/offsetWidth: those round to
      // whole pixels while triggers are usually fractional (text width, page
      // zoom, OS display scaling), so the indicator could end up to 1px past
      // the list's edge and make the horizontal list scroll for nothing.
      const listRect = list.getBoundingClientRect()
      const activeRect = activeEl.getBoundingClientRect()
      // Client rects include ancestor transforms (e.g. Dialog's open scale)
      // while the indicator lives in untransformed space. Under 1px apart is
      // just offsetWidth rounding, not a transform.
      const scale =
        Math.abs(listRect.width - list.offsetWidth) < 1 || !list.offsetWidth
          ? 1
          : listRect.width / list.offsetWidth

      if (orientation === 'horizontal') {
        const left =
          (activeRect.left - listRect.left) / scale -
          list.clientLeft +
          list.scrollLeft
        setStyle({
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 1,
          height: '2px',
          width: activeRect.width / scale,
          transform: `translateX(${left}px)`,
          transition: noTransition
            ? 'none'
            : 'transform 300ms var(--ease-emphasized), width 300ms var(--ease-emphasized)',
          background: 'var(--primary-stroke-default)',
          opacity: 1
        })
      } else {
        const top =
          (activeRect.top - listRect.top) / scale -
          list.clientTop +
          list.scrollTop
        setStyle({
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 1,
          width: '2px',
          height: activeRect.height / scale,
          transform: `translateY(${top}px)`,
          transition: noTransition
            ? 'none'
            : 'transform 300ms var(--ease-emphasized), height 300ms var(--ease-emphasized)',
          background: 'var(--primary-stroke-default)',
          opacity: 1
        })
      }

      if (noTransition) {
        isFirstMeasurement.current = false
      }
    })
  }, [listRef, orientation])

  React.useEffect(() => {
    const list = listRef.current
    if (!list) return

    // Initial measurement
    measure()

    // Observe data-state changes on triggers
    const mutationObserver = new MutationObserver(() => {
      measure()
    })
    mutationObserver.observe(list, {
      subtree: true,
      attributes: true,
      attributeFilter: ['data-state'],
      childList: true
    })

    // Observe resize
    const resizeObserver = new ResizeObserver(() => {
      measure()
    })
    resizeObserver.observe(list)

    // A list measured mid-animation inside a scaling ancestor (Dialog open)
    // is only approximately right; re-measure once that animation settles.
    const onAncestorAnimationEnd = (event: Event) => {
      if (event.target instanceof Node && event.target.contains(list)) {
        measure()
      }
    }
    document.addEventListener('animationend', onAncestorAnimationEnd, true)
    document.addEventListener('transitionend', onAncestorAnimationEnd, true)

    return () => {
      mutationObserver.disconnect()
      resizeObserver.disconnect()
      document.removeEventListener('animationend', onAncestorAnimationEnd, true)
      document.removeEventListener(
        'transitionend',
        onAncestorAnimationEnd,
        true
      )
    }
  }, [listRef, measure])

  return { style }
}

/* ─── Tabs (Root) ──────────────────────────────────────────── */

function Tabs({
  className,
  orientation = 'horizontal',
  onValueChange,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  const [hasSwitched, setHasSwitched] = React.useState(false)
  const ctx = React.useMemo(
    () => ({ orientation: orientation ?? 'horizontal', hasSwitched }),
    [orientation, hasSwitched]
  ) as TabsContextValue

  const handleValueChange = React.useCallback(
    (value: string) => {
      setHasSwitched(true)
      onValueChange?.(value)
    },
    [onValueChange]
  )

  return (
    <TabsContext.Provider value={ctx}>
      <TabsPrimitive.Root
        data-slot="tabs"
        orientation={orientation}
        className={cn(
          orientation === 'vertical' ? 'flex flex-row gap-4' : 'flex flex-col gap-2',
          className
        )}
        onValueChange={handleValueChange}
        {...props}
      />
    </TabsContext.Provider>
  )
}

/* ─── TabsList ─────────────────────────────────────────────── */

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const listRef = React.useRef<HTMLDivElement>(null)
  const { orientation } = React.useContext(TabsContext)
  const { style: indicatorStyle } = useTabIndicator(listRef, orientation)

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      className={cn(
        'text-muted-foreground relative',
        // The gray track is an inset shadow rather than a border so it lives
        // inside the padding box, letting the active indicator paint over it.
        orientation === 'vertical'
          ? 'flex flex-col shadow-[inset_1px_0_0_0_var(--gray-stroke-default)]'
          : // Still scrolls sideways when it truly can't fit (phones), but
            // without a visible bar. overflow-y must be set explicitly, or
            // overflow-x:auto turns it into auto too.
            'flex w-fit items-center overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden shadow-[inset_0_-1px_0_0_var(--gray-stroke-default)]',
        className
      )}
      {...props}
    >
      {props.children}
      <span data-slot="tabs-indicator" style={indicatorStyle} />
    </TabsPrimitive.List>
  )
}

/* ─── TabsTrigger ──────────────────────────────────────────── */

const tabsTriggerVariants = cva(
  'cursor-pointer inline-flex shrink-0 items-center justify-center font-sans font-medium whitespace-nowrap transition-[color,box-shadow] text-vibrant-text-details data-[state=active]:font-semibold data-[state=active]:text-vibrant-text-heading disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
  {
    variants: {
      size: {
        md: 'text-sm leading-5',
        lg: 'text-base leading-6'
      },
      orientation: {
        horizontal: 'pb-1 px-2',
        vertical: 'py-1.5 px-3 justify-start text-left w-full'
      }
    },
    compoundVariants: [
      { orientation: 'horizontal', size: 'md', class: 'min-w-[72px]' },
      { orientation: 'horizontal', size: 'lg', class: 'min-w-[88px]' }
    ],
    defaultVariants: {
      size: 'md',
      orientation: 'horizontal'
    }
  }
)

export interface TabsTriggerProps
  extends React.ComponentProps<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

function TabsTrigger({
  className,
  size,
  children,
  ...props
}: TabsTriggerProps) {
  const { orientation } = React.useContext(TabsContext)

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ size, orientation }), className)}
      {...props}
    >
      <span
        className={cn(
          'inline-flex items-center justify-center gap-1.5 rounded-[6px] hover:bg-gray-surface-light',
          orientation === 'vertical'
            ? 'px-2 py-1.5 w-full'
            : 'px-2 py-1.5'
        )}
      >
        {children}
      </span>
    </TabsPrimitive.Trigger>
  )
}

/* ─── TabsContent ──────────────────────────────────────────── */

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  const { hasSwitched } = React.useContext(TabsContext)

  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        'flex-1 outline-none',
        // Radix mounts the newly active panel, so an enter-only fade reads as
        // a crossfade without holding the old panel in the DOM.
        hasSwitched &&
          'data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-2 duration-300 ease-emphasized motion-reduce:animate-none',
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsContent, TabsList, TabsTrigger, tabsTriggerVariants }
