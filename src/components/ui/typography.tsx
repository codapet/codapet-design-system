import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const displayTextVariants = cva(
  'tracking-normal font-normal font-serif italic text-vibrant-text-display',
  {
    variants: {
      size: {
        lg: 'text-4xl md:text-[3.25rem] leading-[44px] md:leading-[64px]',
        md: 'text-[1.75rem] md:text-4xl leading-[36px] md:leading-[44px]',
        sm: 'text-lg md:text-xl leading-[26px] md:leading-[28px]'
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

const bodyTextVariants = cva('font-sans text-vibrant-text-body', {
  variants: {
    size: {
      lg: 'text-lg md:text-xl leading-[26px] md:leading-[28px]',
      md: 'text-base leading-[24px]',
      sm: 'text-sm leading-[20px]',
      xs: 'text-xs leading-[16px]'
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
}: React.ComponentProps<'p'> &
  VariantProps<typeof bodyTextVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'p'

  return (
    <Comp
      data-slot="p"
      className={cn(bodyTextVariants({ size, className }))}
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
        'text-2xl md:text-[2rem] leading-[32px] md:leading-[40px] font-semibold font-sans text-vibrant-text-heading',
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
        'text-[1.25rem] md:text-[1.5rem] leading-[28px] md:leading-[32px] font-semibold font-sans text-vibrant-text-heading',
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
        'text-[1.125rem] md:text-xl leading-[26px] md:leading-[28px] font-semibold font-sans text-vibrant-text-heading',
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
        'text-base leading-[24px] font-semibold font-sans text-vibrant-text-heading',
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
        'text-sm leading-[20px] font-semibold font-sans text-vibrant-text-heading',
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
      data-slot="h6"
      className={cn(
        'text-xs leading-[16px] font-medium font-sans text-vibrant-text-heading',
        className
      )}
      {...props}
    />
  )
}

/* Medium weight heading variants */

function HeadingXLMedium({
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
        'text-2xl md:text-[2rem] leading-[32px] md:leading-[40px] font-medium font-sans text-vibrant-text-heading',
        className
      )}
      {...props}
    />
  )
}

function HeadingLMedium({
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
        'text-[1.25rem] md:text-[1.5rem] leading-[28px] md:leading-[32px] font-medium font-sans text-vibrant-text-heading',
        className
      )}
      {...props}
    />
  )
}

function HeadingMMedium({
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
        'text-[1.125rem] md:text-xl leading-[26px] md:leading-[28px] font-medium font-sans text-vibrant-text-heading',
        className
      )}
      {...props}
    />
  )
}

function HeadingSMedium({
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
        'text-base leading-[24px] font-medium font-sans text-vibrant-text-heading',
        className
      )}
      {...props}
    />
  )
}

function HeadingXSMedium({
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
        'text-sm leading-[20px] font-medium font-sans text-vibrant-text-heading',
        className
      )}
      {...props}
    />
  )
}

function HeadingXXSMedium({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'h6'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'h6'

  return (
    <Comp
      data-slot="h6"
      className={cn(
        'text-xs leading-[16px] font-medium font-sans text-vibrant-text-heading',
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
  HeadingLMedium,
  HeadingM,
  HeadingMMedium,
  HeadingS,
  HeadingSMedium,
  HeadingXL,
  HeadingXLMedium,
  HeadingXS,
  HeadingXSMedium,
  HeadingXXS,
  HeadingXXSMedium
}
