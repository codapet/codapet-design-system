import * as React from 'react'

import { cn } from '@/lib/utils'

// Base styles as a constant to avoid recreation
const textareaBaseStyles = [
  // Base styles aligned with Input
  'placeholder:text-gray-subtle selection:bg-primary selection:text-primary-foreground',
  'flex w-full min-w-0 rounded-lg border bg-transparent text-base font-medium transition-all duration-400',
  'outline-none font-sans',
  // Disabled
  'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40',
  // Default state
  'border-gray-stroke-default bg-background',
  // Hover/Focus/Active states
  'hover:border-focus-ring',
  'focus:border-2 focus:border-focus-ring',
  'active:border-focus-ring',
  // Textarea specific
  'field-sizing-content min-h-16 resize-y px-3 py-2'
].join(' ')

// Error styles as a constant to avoid recreation
const errorStyles = [
  'border-error-stroke-default bg-white',
  'hover:border-error-stroke-default',
  'focus:border-2 focus:border-error-stroke-default',
  'active:border-error-stroke-default'
].join(' ')

export interface TextareaProps extends Omit<React.ComponentProps<'textarea'>, 'size'> {
  error?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        data-slot="textarea"
        className={cn(textareaBaseStyles, error && errorStyles, className)}
        aria-invalid={error}
        ref={ref}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
