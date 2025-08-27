import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "cursor-pointer active:opacity-70 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-colors transition-opacity disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none relative select-none will-change-auto focus-visible:before:absolute focus-visible:before:-inset-[3px] focus-visible:before:rounded-lg focus-visible:before:ring-2 focus-visible:before:ring-blue-500/80 focus-visible:before:pointer-events-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-brand-dark',
        secondary:
          'bg-brand-subtle text-brand-vibrant hover:bg-brand-light border border-brand-light',
        tertiary:
          'bg-zinc-100 text-zinc-700 hover:bg-zinc-300 hover:border-zinc-300 border border-zinc-200',
        outline:
          'text-zinc-800 border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',

        ghost:
          'text-zinc-800 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        destructive:
          'bg-red-400 text-white hover:bg-red-900 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        'destructive-secondary':
          'bg-red-50 border border-red-200 text-red-400 hover:border-red-400 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        'destructive-tertiary':
          'bg-transparent border border-red-200 text-red-400 hover:border-red-200 hover:bg-red-50 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60'
      },
      size: {
        md: 'h-10 px-4 py-2 has-[>svg]:px-3 text-lg',
        sm: 'h-9 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-base',
        lg: 'h-12 rounded-md px-6 has-[>svg]:px-4 text-lg',
        icon: 'size-8'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg'
    }
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
