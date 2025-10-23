import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { Button } from './button'

const inputVariants = cva(
  [
    // Base styles
    'file:text-zinc-800 placeholder:text-gray-subtle selection:bg-primary selection:text-primary-foreground',
    'flex w-full min-w-0 rounded-md border bg-transparent text-base  transition-all duration-400',
    'outline-none font-sans',
    // File input styles
    'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
    // Disabled styles
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    // Responsive text size
    'md:text-sm',
    // Default state
    'border-zinc-300 bg-background',
    // Hover state
    'hover:border-primary-stroke-default',
    // Focus state
    'focus:border-blue-500',
    'active:border-brand-normal'
  ],
  {
    variants: {
      size: {
        sm: 'h-9 px-3 py-1 text-base',
        md: 'h-10 px-3 py-2 text-base',
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
  rightIconOnClick?: () => void
  rightIconButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
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
      rightIconOnClick,
      rightIconButtonProps,
      error,
      ...props
    },
    ref
  ) => {
    // Error state styles applied conditionally
    const errorStyles = error
      ? [
          'border-destructive bg-red-subtle',
          'focus:border-destructive focus:ring-destructive/20',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
        ]
      : []

    if (leftIcon || rightIcon) {
      return (
        <div className="relative">
          <input
            type={type}
            data-slot="input"
            className={cn(
              inputVariants({ size }),
              errorStyles,
              'peer',
              leftIcon && 'pl-8',
              rightIcon && 'pr-10',
              className
            )}
            ref={ref}
            aria-invalid={error}
            {...props}
          />
          {leftIcon && (
            <div
              className={cn(
                'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center',
                'transition-colors stroke-[1.5px]',
                error
                  ? 'text-destructive peer-hover:text-destructive peer-focus:text-destructive peer-active:text-destructive'
                  : 'text-muted-foreground peer-hover:text-brand-normal peer-focus:text-blue-500 peer-active:text-brand-normal',
                leftIconClassName
              )}
            >
              {React.isValidElement(leftIcon)
                ? (() => {
                    const iconEl = leftIcon as React.ReactElement<{
                      className?: string
                    }>
                    return React.cloneElement(iconEl, {
                      className: cn('h-4 w-4', iconEl.props.className)
                    })
                  })()
                : leftIcon}
            </div>
          )}
          {rightIcon && (
            <Button
              onClick={rightIconOnClick}
              variant="ghost"
              size="icon"
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center',
                'h-6 w-6 rounded-sm transition-colors',
                error
                  ? 'text-destructive hover:text-destructive focus:text-destructive'
                  : 'text-muted-foreground hover:text-brand-normal focus:text-blue-500',
                rightIconClassName
              )}
              aria-label="Input action"
              {...rightIconButtonProps}
            >
              {React.isValidElement(rightIcon)
                ? (() => {
                    const iconEl = rightIcon as React.ReactElement<{
                      className?: string
                    }>
                    return React.cloneElement(iconEl, {
                      className: cn('h-4 w-4', iconEl.props.className)
                    })
                  })()
                : rightIcon}
            </Button>
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
