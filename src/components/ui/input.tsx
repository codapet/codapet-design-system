import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const inputVariants = cva(
  [
    // Base styles
    'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
    'flex w-full min-w-0 rounded-md border bg-transparent text-base shadow-xs transition-all duration-200',
    'outline-none font-sans',
    // File input styles
    'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
    // Disabled styles
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    // Responsive text size
    'md:text-sm',
    // Default state
    'border-input bg-background',
    // Hover state
    'hover:border-input/80',
    // Focus state
    'focus:border-ring focus:ring-ring/20 focus:ring-1',
    // Focus visible for keyboard navigation
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-1'
  ],
  {
    variants: {
      size: {
        sm: 'h-9 px-3 py-1 text-sm',
        md: 'h-10 px-3 py-2 text-sm',
        lg: 'h-12 px-4 py-3 text-base'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
)

interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'size'>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  leftIconClassName?: string
  rightIconClassName?: string
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      size,
      leftIcon,
      rightIcon,
      leftIconClassName,
      rightIconClassName,
      error,
      ...props
    },
    ref
  ) => {
    // Error state styles applied conditionally
    const errorStyles = error
      ? [
          'border-destructive',
          'focus:border-destructive focus:ring-destructive/20',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
        ]
      : []

    if (leftIcon || rightIcon) {
      return (
        <div className="relative">
          {leftIcon && (
            <div
              className={cn(
                'absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none flex items-center justify-center',
                leftIconClassName
              )}
            >
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            data-slot="input"
            className={cn(
              inputVariants({ size }),
              errorStyles,
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            ref={ref}
            aria-invalid={error}
            {...props}
          />
          {rightIcon && (
            <div
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none flex items-center justify-center',
                rightIconClassName
              )}
            >
              {rightIcon}
            </div>
          )}
        </div>
      )
    }

    return (
      <input
        type={type}
        data-slot="input"
        className={cn(inputVariants({ size }), errorStyles, className)}
        ref={ref}
        aria-invalid={error}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input, inputVariants }
