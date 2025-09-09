import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const textareaVariants = cva(
  [
    // Base styles aligned with Input
    'placeholder:text-gray-subtle selection:bg-primary selection:text-primary-foreground',
    'flex w-full min-w-0 rounded-md border bg-transparent text-base shadow-xs transition-all duration-200',
    'outline-none font-sans',
    // Disabled
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    // Responsive text size
    'md:text-sm',
    // Default state
    'border-zinc-300 bg-background',
    // Hover/Focus/Active states
    'hover:border-brand-normal',
    'focus:border-blue-500',
    'active:border-brand-normal',
    // Textarea specific
    'field-sizing-content min-h-16 resize-y'
  ],
  {
    variants: {
      size: {
        sm: 'px-3 py-1 text-sm',
        md: 'px-3 py-2 text-sm',
        lg: 'px-4 py-3 text-base'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
)

interface TextareaProps
  extends Omit<React.ComponentProps<'textarea'>, 'size'>,
    VariantProps<typeof textareaVariants> {
  error?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, error, ...props }, ref) => {
    const errorStyles = error
      ? [
          'border-destructive bg-red-subtle',
          'focus:border-destructive focus:ring-destructive/20',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
        ]
      : []

    return (
      <textarea
        data-slot="textarea"
        className={cn(textareaVariants({ size }), errorStyles, className)}
        aria-invalid={error}
        ref={ref}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea, textareaVariants }
