'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { Check, Circle } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

const optionCardVariants = cva(
  'group flex items-center gap-2 h-12 p-2 cursor-pointer transition-all duration-200 font-medium text-base leading-6 outline-none select-none',
  {
    variants: {
      hasStroke: {
        true: 'border rounded-lg',
        false: 'rounded-lg'
      },
      selected: {
        true: '',
        false: ''
      },
      weight: {
        hug: 'w-fit',
        resizable: 'w-full'
      },
      disabled: {
        true: 'opacity-40 cursor-not-allowed pointer-events-none',
        false: ''
      }
    },
    compoundVariants: [
      // Stroke + not selected
      {
        hasStroke: true,
        selected: false,
        disabled: false,
        className:
          'border-gray-stroke-default text-vibrant-text-heading hover:border-primary-stroke-default'
      },
      // Stroke + selected
      {
        hasStroke: true,
        selected: true,
        disabled: false,
        className:
          'border-primary-stroke-default bg-primary-surface-subtle text-primary-stroke-default'
      },
      // Stroke + disabled + not selected
      {
        hasStroke: true,
        selected: false,
        disabled: true,
        className: 'border-gray-stroke-default text-vibrant-text-heading'
      },
      // Stroke + disabled + selected
      {
        hasStroke: true,
        selected: true,
        disabled: true,
        className:
          'border-gray-stroke-default text-vibrant-text-heading'
      },
      // No stroke + not selected
      {
        hasStroke: false,
        selected: false,
        disabled: false,
        className: 'text-vibrant-text-heading'
      },
      // No stroke + selected
      {
        hasStroke: false,
        selected: true,
        disabled: false,
        className:
          'bg-primary-surface-subtle text-primary-stroke-default'
      },
      // No stroke + disabled
      {
        hasStroke: false,
        disabled: true,
        className: 'text-vibrant-text-heading'
      }
    ],
    defaultVariants: {
      hasStroke: true,
      selected: false,
      weight: 'hug',
      disabled: false
    }
  }
)

// Visual-only radio indicator (not a Radix primitive)
function RadioIndicator({ selected }: { selected?: boolean }) {
  return (
    <span
      className={cn(
        'flex items-center justify-center shrink-0 size-5 rounded-full border-2 transition-colors duration-200',
        selected
          ? 'bg-primary-stroke-default border-primary-stroke-default'
          : 'border-gray-stroke-default bg-transparent group-hover:border-primary-stroke-default'
      )}
    >
      {selected && <Circle className="size-2 fill-white text-white" />}
    </span>
  )
}

// Visual-only checkbox indicator (not a Radix primitive)
function CheckboxIndicator({ selected }: { selected?: boolean }) {
  return (
    <span
      className={cn(
        'flex items-center justify-center shrink-0 size-5 rounded-[4px] border-2 transition-colors duration-200',
        selected
          ? 'bg-primary-stroke-default border-primary-stroke-default'
          : 'border-gray-stroke-default bg-transparent group-hover:border-primary-stroke-default'
      )}
    >
      {selected && <Check className="size-4 text-white" />}
    </span>
  )
}

export interface OptionCardProps
  extends Omit<React.ComponentProps<'button'>, 'disabled'>,
    Omit<VariantProps<typeof optionCardVariants>, 'selected' | 'disabled'> {
  /** Whether this option is selected */
  selected?: boolean
  /** Whether this option is disabled */
  disabled?: boolean
  /** Position of the selector control */
  selectorPosition?: 'left' | 'right'
  /** Type of selector: radio (single) or checkbox (multiple) */
  selectionType?: 'single' | 'multiple'
  /** Optional leading icon */
  icon?: React.ReactNode
}

function OptionCard({
  className,
  children,
  selected = false,
  disabled = false,
  hasStroke = true,
  weight = 'hug',
  selectorPosition = 'right',
  selectionType = 'single',
  icon,
  ...props
}: OptionCardProps) {
  const Indicator =
    selectionType === 'single' ? RadioIndicator : CheckboxIndicator

  const indicator = <Indicator selected={selected} />

  return (
    <button
      type="button"
      data-slot="option-card"
      data-state={selected ? 'selected' : 'unselected'}
      disabled={disabled}
      className={cn(
        optionCardVariants({
          hasStroke,
          selected,
          weight,
          disabled
        }),
        className
      )}
      {...props}
    >
      {selectorPosition === 'left' && indicator}
      <span className="flex items-center gap-2 flex-1 min-w-0">
        {icon && (
          <span className="flex items-center justify-center shrink-0 size-5 [&_svg]:size-5">
            {icon}
          </span>
        )}
        <span className="truncate">{children}</span>
      </span>
      {selectorPosition === 'right' && indicator}
    </button>
  )
}

export { OptionCard, optionCardVariants }
