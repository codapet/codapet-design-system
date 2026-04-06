'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'text-muted-foreground flex items-center overflow-x-auto',
        className
      )}
      {...props}
    />
  )
}

const tabsTriggerVariants = cva(
  'cursor-pointer inline-flex shrink-0 items-center justify-center font-sans font-medium whitespace-nowrap transition-[color,box-shadow] text-vibrant-text-details border-b border-b-gray-stroke-default data-[state=active]:font-semibold data-[state=active]:text-vibrant-text-heading data-[state=active]:border-b-2 data-[state=active]:border-b-primary-stroke-default disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4 pb-1 px-2',
  {
    variants: {
      size: {
        md: 'min-w-[72px] text-sm leading-5',
        lg: 'min-w-[88px] text-base leading-6'
      }
    },
    defaultVariants: {
      size: 'md'
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
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ size }), className)}
      {...props}
    >
      <span className="inline-flex items-center justify-center gap-1.5 rounded-[6px] px-2 py-1.5 hover:bg-gray-surface-light">
        {children}
      </span>
    </TabsPrimitive.Trigger>
  )
}

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
