import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeNumberVariants = cva(
  'inline-flex items-center justify-center rounded-full font-semibold text-xs leading-[18px] text-center shrink-0 select-none',
  {
    variants: {
      size: {
        M: 'size-6',
        S: 'size-5'
      },
      state: {
        active: 'bg-primary text-primary-foreground',
        disabled: 'bg-gray-surface-light text-gray-subtle',
        resting:
          'bg-transparent border border-gray-stroke-light text-gray-subtle'
      }
    },
    defaultVariants: {
      size: 'M',
      state: 'active'
    }
  }
)

export interface BadgeNumberProps
  extends React.ComponentProps<'span'>,
    VariantProps<typeof badgeNumberVariants> {
  value: number
}

function BadgeNumber({
  className,
  size,
  state,
  value,
  ...props
}: BadgeNumberProps) {
  return (
    <span
      data-slot="badge-number"
      className={cn(badgeNumberVariants({ size, state }), className)}
      {...props}
    >
      {value}
    </span>
  )
}

export { BadgeNumber, badgeNumberVariants }
