'use client'

import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva, VariantProps } from 'class-variance-authority'
import * as React from 'react'

const labelTextVariants = cva('font-sans font-semibold ', {
  variants: {
    size: {
      lg: 'text-base md:text-lg md:leading-[1.625rem] leading-[1.5rem]',
      md: 'md:text-base text-sm  md:leading-[1.5rem] leading-[1.25rem] ',
      sm: 'md:text-sm text-xs  md:leading-[1.25rem] leading-[1.125rem] ',
      xs: 'text-xs leading-[1.125rem]'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

function Label({
  className,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'label'> &
  VariantProps<typeof labelTextVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'label'

  return (
    <Comp
      data-slot="label"
      className={cn(labelTextVariants({ size, className }))}
      {...props}
    />
  )
}

export { Label, labelTextVariants }
