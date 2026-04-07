import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const progressBarVariants = cva('relative overflow-hidden rounded-[8px]', {
  variants: {
    device: {
      desktop: 'w-[360px] h-[4px]',
      mobile: 'w-[342px] h-[4px]'
    }
  },
  defaultVariants: {
    device: 'desktop'
  }
})

export interface ProgressBarProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof progressBarVariants> {
  /** Current step (1-based). Must be between 1 and totalSteps. */
  currentStep?: number
  /** Total number of steps. Defaults to 7. */
  totalSteps?: number
  /** Direct percentage value (0-100). Overrides step-based calculation when provided. */
  value?: number
}

function ProgressBar({
  className,
  device,
  currentStep = 1,
  totalSteps = 7,
  value,
  ...props
}: ProgressBarProps) {
  const percentage =
    value !== undefined
      ? Math.min(100, Math.max(0, value))
      : Math.min(100, Math.max(0, (currentStep / totalSteps) * 100))

  return (
    <div
      data-slot="progress-bar"
      className={cn(progressBarVariants({ device }), className)}
      role="progressbar"
      aria-valuenow={Math.round(percentage)}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      {/* Background track */}
      <div className="absolute inset-0 rounded-[8px] bg-primary-surface-light" />
      {/* Fill */}
      <div
        data-slot="progress-bar-fill"
        className="absolute inset-y-0 left-0 rounded-[8px] bg-primary-surface-default transition-[width] duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

export { ProgressBar, progressBarVariants }
