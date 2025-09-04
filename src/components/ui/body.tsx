import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const bodyTextVariants = cva('font-sans ', {
  variants: {
    size: {
      lg: 'text-lg md:text-xl leading-[1.625rem] md:leading-[1.75rem]',
      md: 'text-base  leading-[1.5rem] ',
      sm: 'text-sm  leading-[1.25rem] ',
      xs: 'text-xs leading-[1rem]'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

function Body({
  className,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'h1'> &
  VariantProps<typeof bodyTextVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'p'

  return (
    <Comp
      data-slot="h1"
      className={cn(bodyTextVariants({ size, className }))}
      {...props}
    />
  )
}

export { Body, bodyTextVariants }
