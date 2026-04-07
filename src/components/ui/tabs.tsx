'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

/* ─── Internal Context ─────────────────────────────────────── */

type TabsContextValue = {
  orientation: 'horizontal' | 'vertical'
}

const TabsContext = React.createContext<TabsContextValue>({
  orientation: 'horizontal'
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

      if (orientation === 'horizontal') {
        setStyle({
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          width: activeEl.offsetWidth,
          transform: `translateX(${activeEl.offsetLeft}px)`,
          transition: noTransition
            ? 'none'
            : 'transform 300ms ease-in-out, width 300ms ease-in-out',
          background: 'var(--primary-stroke-default)',
          opacity: 1
        })
      } else {
        setStyle({
          position: 'absolute',
          left: 0,
          top: 0,
          width: '2px',
          height: activeEl.offsetHeight,
          transform: `translateY(${activeEl.offsetTop}px)`,
          transition: noTransition
            ? 'none'
            : 'transform 300ms ease-in-out, height 300ms ease-in-out',
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

    return () => {
      mutationObserver.disconnect()
      resizeObserver.disconnect()
    }
  }, [listRef, measure])

  return { style }
}

/* ─── Tabs (Root) ──────────────────────────────────────────── */

function Tabs({
  className,
  orientation = 'horizontal',
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  const ctx = React.useMemo(
    () => ({ orientation: orientation ?? 'horizontal' }),
    [orientation]
  ) as TabsContextValue

  return (
    <TabsContext.Provider value={ctx}>
      <TabsPrimitive.Root
        data-slot="tabs"
        orientation={orientation}
        className={cn(
          orientation === 'vertical' ? 'flex flex-row gap-4' : 'flex flex-col gap-2',
          className
        )}
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
        orientation === 'vertical'
          ? 'flex flex-col border-l border-l-gray-stroke-default'
          : 'flex w-fit items-center overflow-x-auto border-b border-b-gray-stroke-default',
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
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsContent, TabsList, TabsTrigger, tabsTriggerVariants }
