import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const badgeActionableVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-[8px] cursor-pointer select-none transition-all font-medium whitespace-nowrap shrink-0 [&_svg]:pointer-events-none [&_svg]:shrink-0 outline-none focus-visible:before:absolute focus-visible:before:-inset-[3px] focus-visible:before:rounded-xl focus-visible:before:ring-2 focus-visible:before:ring-blue-500/80 focus-visible:before:pointer-events-none relative',
  {
    variants: {
      size: {
        M: 'h-10 px-3 py-2 text-base leading-6 [&_svg]:size-5',
        S: 'h-8 px-3 py-2 text-sm leading-5 [&_svg]:size-5'
      }
    },
    defaultVariants: {
      size: 'S'
    }
  }
)

export interface BadgeActionableProps
  extends
    Omit<React.ComponentProps<'button'>, 'children'>,
    VariantProps<typeof badgeActionableVariants> {
  icon?: React.ReactNode
  selected?: boolean
  onBackground?: boolean
  children: React.ReactNode
}

function BadgeActionable({
  className,
  size,
  icon,
  selected = false,
  onBackground = false,
  children,
  ...props
}: BadgeActionableProps) {
  return (
    <button
      data-slot="badge-actionable"
      data-selected={selected || undefined}
      className={cn(
        badgeActionableVariants({ size }),
        selected
          ? 'bg-primary-surface-subtle border border-primary-stroke-default text-primary-stroke-default'
          : onBackground
            ? 'bg-sand-light border border-secondary-stroke-default text-secondary-text-dark hover:bg-secondary-surface-default hover:border-transparent'
            : 'bg-sand-light border border-secondary-stroke-light text-secondary-text-dark hover:bg-secondary-surface-default hover:border-transparent',
        'disabled:pointer-events-none disabled:opacity-50 ',
        className
      )}
      {...props}
    >
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      <span>{children}</span>
    </button>
  )
}

export { BadgeActionable, badgeActionableVariants }
