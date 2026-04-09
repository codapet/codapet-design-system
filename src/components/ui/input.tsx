import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { Button } from './button'

const inputVariants = cva(
  [
    // Base styles
    'file:text-foreground-secondary placeholder:text-gray-subtle selection:bg-primary selection:text-primary-foreground',
    'flex w-full min-w-0 rounded-lg border bg-transparent text-base font-medium transition-all duration-400',
    'outline-none font-sans',
    // File input styles
    'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
    // Disabled styles
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60'
  ],
  {
    variants: {
      size: {
        sm: 'h-10 px-3 py-2 text-base',
        md: 'h-12 px-3 py-2 text-base',
        lg: 'h-14 px-4 py-3 text-base'
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
    // Border/bg styles applied conditionally based on error state
    const stateStyles = error
      ? [
          'border-error-stroke-default bg-error-surface-subtle',
          'hover:border-error-stroke-default',
          'focus:border-2 focus:border-error-stroke-default',
          'active:border-error-stroke-default'
        ]
      : [
          'border-gray-stroke-default bg-background',
          'hover:border-focus-ring',
          'focus:border-2 focus:border-focus-ring',
          'active:border-focus-ring'
        ]

    if (leftIcon || rightIcon) {
      return (
        <div className="relative">
          <input
            type={type}
            data-slot="input"
            className={cn(
              inputVariants({ size }),
              stateStyles,
              'peer',
              leftIcon && 'pl-10',
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
                  ? 'text-error-stroke-default peer-hover:text-error-stroke-default peer-focus:text-error-stroke-default peer-active:text-error-stroke-default'
                  : 'text-muted-foreground peer-hover:text-focus-ring peer-focus:text-focus-ring peer-active:text-focus-ring',
                leftIconClassName
              )}
            >
              {React.isValidElement(leftIcon)
                ? (() => {
                    const iconEl = leftIcon as React.ReactElement<{
                      className?: string
                    }>
                    return React.cloneElement(iconEl, {
                      className: cn('h-5 w-5', iconEl.props.className)
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
                  ? 'text-error-stroke-default hover:text-error-stroke-default focus:text-error-stroke-default'
                  : 'text-muted-foreground hover:text-focus-ring focus:text-focus-ring',
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
                      className: cn('h-5 w-5', iconEl.props.className)
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
        className={cn(inputVariants({ size }), stateStyles, className)}
        ref={ref}
        aria-invalid={error}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input, inputVariants }
