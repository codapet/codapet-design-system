'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type AccordionVariant = 'default' | 'outlined'

const AccordionContext = React.createContext<{ variant: AccordionVariant }>({
  variant: 'default'
})

function Accordion({
  variant = 'default',
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root> & {
  variant?: AccordionVariant
}) {
  return (
    <AccordionContext.Provider value={{ variant }}>
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

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  const { variant } = React.useContext(AccordionContext)
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        variant === 'outlined'
          ? 'rounded-lg border'
          : 'border-b last:border-b-0',
        className
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  expandedIcon,
  collapsedIcon,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  expandedIcon?: React.ReactNode
  collapsedIcon?: React.ReactNode
}) {
  const { variant } = React.useContext(AccordionContext)
  const hasCustomIcon = expandedIcon !== undefined || collapsedIcon !== undefined
  const animatedIconSwap =
    variant === 'outlined' &&
    collapsedIcon !== undefined &&
    expandedIcon !== undefined
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'group focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50',
          variant === 'outlined' &&
            'min-h-16 items-center gap-8 px-5 py-4 text-base lg:px-6 lg:text-lg lg:leading-7 hover:no-underline',
          !hasCustomIcon && '[&[data-state=open]>svg]:rotate-180',
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
        ) : (
          <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-400" />
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
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
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

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
