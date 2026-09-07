import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

type AccordionVariant = 'default' | 'outlined'

/** Offset between consecutive items when the root has `staggerReveal`. */
const ACCORDION_STAGGER_STEP_MS = 80

const AccordionContext = React.createContext<{
  variant: AccordionVariant
  staggerReveal: boolean
}>({
  variant: 'default',
  staggerReveal: false
})

export type AccordionProps = React.ComponentProps<
  typeof AccordionPrimitive.Root
> & {
  variant?: AccordionVariant
  /**
   * Fade-and-rise every item in on mount. Give each `AccordionItem` a
   * `revealIndex` so they land 80ms apart; without it they arrive together.
   * Skipped entirely under `prefers-reduced-motion`.
   */
  staggerReveal?: boolean
}

function Accordion({
  variant = 'default',
  staggerReveal = false,
  className,
  ...props
}: AccordionProps) {
  const context = React.useMemo(
    () => ({ variant, staggerReveal }),
    [variant, staggerReveal]
  )
  return (
    <AccordionContext.Provider value={context}>
      <AccordionPrimitive.Root
        data-slot="accordion"
        data-variant={variant}
        className={cn(
          variant === 'outlined' && 'flex flex-col gap-3',
          className
        )}
        {...props}
      />
    </AccordionContext.Provider>
  )
}

export type AccordionItemProps = React.ComponentProps<
  typeof AccordionPrimitive.Item
> & {
  /** Position in the list; sets this item's delay when the root has `staggerReveal`. */
  revealIndex?: number
}

function AccordionItem({
  className,
  style,
  revealIndex,
  ...props
}: AccordionItemProps) {
  const { variant, staggerReveal } = React.useContext(AccordionContext)
  const staggerStyle =
    staggerReveal && revealIndex
      ? { animationDelay: `${revealIndex * ACCORDION_STAGGER_STEP_MS}ms` }
      : undefined
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        variant === 'outlined'
          ? cn(
              'rounded-xl border border-border-default',
              // Border warms to the brand stroke on pointer hover only — a
              // touch device would otherwise keep the hover colour after a tap.
              'transition-[border-color] duration-300 ease-out motion-reduce:transition-none',
              '[@media(hover:hover)]:hover:border-primary-stroke-default/60'
            )
          : 'border-b last:border-b-0',
        staggerReveal && 'animate-accordion-item-in',
        className
      )}
      style={staggerStyle ? { ...staggerStyle, ...style } : style}
      {...props}
    />
  )
}

type AccordionTriggerIcon = 'chevron' | 'plus-minus'

export type AccordionTriggerProps = React.ComponentProps<
  typeof AccordionPrimitive.Trigger
> & {
  expandedIcon?: React.ReactNode
  collapsedIcon?: React.ReactNode
  /**
   * Built-in indicator, used when no custom icons are given. `chevron`
   * rotates; `plus-minus` morphs a + into a − as the item opens.
   */
  icon?: AccordionTriggerIcon
  /** Merged onto the built-in indicator to resize or recolour it. */
  iconClassName?: string
}

/** Two bars sharing one grid cell: the upright one rotates flat, so + becomes −. */
function PlusMinusIcon({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'text-gray-icon-default pointer-events-none relative grid size-6 shrink-0 place-items-center',
        className
      )}
    >
      <span className="col-start-1 row-start-1 h-[1.8px] w-3.5 rounded-full bg-current" />
      <span className="col-start-1 row-start-1 h-[1.8px] w-3.5 origin-center rotate-90 rounded-full bg-current transition-[rotate] duration-[280ms] ease-[cubic-bezier(0.33,1,0.68,1)] group-data-[state=open]:rotate-0 motion-reduce:transition-none" />
    </span>
  )
}

function AccordionTrigger({
  className,
  children,
  expandedIcon,
  collapsedIcon,
  icon = 'chevron',
  iconClassName,
  ...props
}: AccordionTriggerProps) {
  const { variant } = React.useContext(AccordionContext)
  const hasCustomIcon =
    expandedIcon !== undefined || collapsedIcon !== undefined
  const animatedIconSwap =
    variant === 'outlined' &&
    collapsedIcon !== undefined &&
    expandedIcon !== undefined
  const usesChevron = !hasCustomIcon && icon === 'chevron'
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'group focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50',
          variant === 'outlined' &&
            'min-h-16 items-center gap-8 px-5 py-4 text-base lg:px-6 lg:text-lg lg:leading-7 hover:no-underline',
          usesChevron && '[&[data-state=open]>svg]:rotate-180',
          className
        )}
        {...props}
      >
        {children}
        {hasCustomIcon ? (
          animatedIconSwap ? (
            <span className="pointer-events-none grid shrink-0 text-muted-foreground *:[grid-area:1/1] *:transition-[rotate,opacity] *:duration-300 *:ease-[cubic-bezier(0.33,1,0.68,1)]">
              <span className="group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0">
                {collapsedIcon}
              </span>
              <span className="-rotate-90 opacity-0 group-data-[state=open]:rotate-0 group-data-[state=open]:opacity-100">
                {expandedIcon}
              </span>
            </span>
          ) : (
            <>
              {collapsedIcon !== undefined && (
                <span className="group-data-[state=open]:hidden pointer-events-none shrink-0 text-muted-foreground">
                  {collapsedIcon}
                </span>
              )}
              {expandedIcon !== undefined && (
                <span className="group-data-[state=closed]:hidden pointer-events-none shrink-0 text-muted-foreground">
                  {expandedIcon}
                </span>
              )}
            </>
          )
        ) : icon === 'plus-minus' ? (
          <PlusMinusIcon className={iconClassName} />
        ) : (
          <ChevronDownIcon
            className={cn(
              'text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-400',
              iconClassName
            )}
          />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  const { variant } = React.useContext(AccordionContext)
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        'overflow-hidden text-sm',
        // Outlined cards fade while they grow; the stripe variant keeps the
        // shadcn height-only motion.
        variant === 'outlined'
          ? 'data-[state=closed]:animate-accordion-up-fade data-[state=open]:animate-accordion-down-fade'
          : 'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
      )}
      {...props}
    >
      <div
        className={cn(
          variant === 'outlined' ? 'px-5 pb-5 lg:px-6 lg:pb-6' : 'pt-0 pb-4',
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
