import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const displayTextVariants = cva(
  'tracking-normal font-normal leading-none text-brand-dark font-serif italic',
  {
    variants: {
      size: {
        md: 'text-[1.75rem] md:text-4xl leading-[2.75rem] md:leading-[4rem]',
        sm: 'text-lg md:text-xl leading-[2.5rem] md:leading-[3rem]',
        lg: 'text-4xl md:text-[3.25rem] leading-[4rem] md:leading-[5rem]'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
)

function DisplayHeading({
  className,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'h1'> &
  VariantProps<typeof displayTextVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'h1'

  return (
    <Comp
      data-slot="h1"
      className={cn(displayTextVariants({ size, className }))}
      {...props}
    />
  )
}

export { DisplayHeading, displayTextVariants }
