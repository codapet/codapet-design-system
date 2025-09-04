import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

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

function HeadingXL({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'h1'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'h1'

  return (
    <Comp
      data-slot="h1"
      className={cn(
        'text-2xl md:text-[2rem] md:leading-[2.5rem] leading-[2rem] font-semibold font-sans',
        className
      )}
      {...props}
    />
  )
}

function HeadingL({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'h2'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'h2'

  return (
    <Comp
      data-slot="h2"
      className={cn(
        'md:text-[1.5rem] text-[1.25rem] md:leading-[2rem] leading-[1.75rem] font-semibold font-sans',
        className
      )}
      {...props}
    />
  )
}

function HeadingM({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'h3'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'h3'

  return (
    <Comp
      data-slot="h3"
      className={cn(
        'text-[1.125rem] md:text-xl md:leading-[1.75rem] leading-[1.625rem] font-semibold font-sans',
        className
      )}
      {...props}
    />
  )
}

function HeadingS({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'h4'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'h4'

  return (
    <Comp
      data-slot="h4"
      className={cn(
        'text-base leading-[1.5rem] font-semibold font-sans',
        className
      )}
      {...props}
    />
  )
}

function HeadingXS({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'h5'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'h5'

  return (
    <Comp
      data-slot="h5"
      className={cn(
        'text-sm  leading-[1.25rem] font-semibold font-sans',
        className
      )}
      {...props}
    />
  )
}

function HeadingXXS({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'h6'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'h6'

  return (
    <Comp
      data-slot="h5"
      className={cn(
        'text-xs leading-[1rem]  font-semibold font-sans',
        className
      )}
      {...props}
    />
  )
}

export {
  Body,
  bodyTextVariants,
  DisplayHeading,
  displayTextVariants,
  HeadingL,
  HeadingM,
  HeadingS,
  HeadingXL,
  HeadingXS,
  HeadingXXS,
  Label,
  labelTextVariants
}
