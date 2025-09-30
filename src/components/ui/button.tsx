import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none relative select-none will-change-auto  focus-visible:before:absolute focus-visible:before:-inset-[3px] focus-visible:before:rounded-lg focus-visible:before:ring-2 focus-visible:before:ring-blue-500/80 focus-visible:before:pointer-events-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive duration-400",
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:bg-brand-dark active:bg-slate-800 ',
        secondary:
          'bg-brand-subtle text-brand-vibrant hover:bg-primary-surface-light border border-brand-light active:bg-icon-disabled hover:border-transparent active:border-transparent',
        tertiary:
          'bg-gray-surface-light text-zinc-700 hover:bg-gray-surface-default border border-gray-stroke-light active:bg-zinc-400',
        outline:
          'text-zinc-800 border border-gray-surface-default bg-background hover:bg-gray-surface-light hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 active:bg-gray-surface-default',
        ghost:
          'text-brand-vibrant hover:bg-primary-surface-subtle  dark:hover:bg-accent/50 active:bg-primary-surface-light',
        'ghost-secondary':
          'text-zinc-800 hover:bg-gray-surface-light hover:text-accent-foreground dark:hover:bg-accent/50 active:bg-gray-surface-default',
        'ghost-destructive':
          'bg-transparent  text-red-400  hover:bg-red-50 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 active:bg-red-100',
        link: 'text-zinc-800 underline-offset-4 underline hover:bg-none active:bg-none hover:text-brand-vibrant ',
        destructive:
          'bg-error-surface-default text-white hover:bg-red-800 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 active:bg-error-surface-dark',
        'destructive-secondary':
          'bg-error-surface-light  border border-error-stroke-light text-red-400 hover:border-error-surface-default focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 active:bg-red-100',
        'destructive-tertiary':
          'bg-transparent border border-error-stroke-light text-red-400  hover:bg-red-50 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 active:bg-red-100'
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
