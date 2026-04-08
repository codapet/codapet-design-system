import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

const alertBannerVariants = cva(
  'flex items-start gap-3 w-full rounded-[12px] border px-3 py-4 text-sm leading-5',
  {
    variants: {
      type: {
        informative:
          'bg-alert-bg-informative border-gray-stroke-light [&_svg]:text-[#52525c] dark:[&_svg]:text-[#a1a1aa]',
        error:
          'bg-alert-bg-error border-error-stroke-light [&_svg]:text-[#ff6467] dark:[&_svg]:text-[#ff8486]',
        success:
          'bg-success-surface-subtle border-success-stroke-light [&_svg]:text-[#00a63e] dark:[&_svg]:text-[#34d399]'
      }
    },
    defaultVariants: {
      type: 'informative'
    }
  }
)

export interface AlertBannerProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof alertBannerVariants> {
  icon?: React.ReactNode
  heading?: string
  dismissible?: boolean
  onDismiss?: () => void
}

function AlertBanner({
  className,
  type,
  icon,
  heading,
  dismissible = false,
  onDismiss,
  children,
  ...props
}: AlertBannerProps) {
  return (
    <div
      data-slot="alert-banner"
      role="alert"
      className={cn(alertBannerVariants({ type }), className)}
      {...props}
    >
      {icon && (
        <span className="flex items-center justify-center shrink-0 size-5 [&_svg]:size-5">
          {icon}
        </span>
      )}
      <div className="flex flex-1 flex-col gap-2 min-w-0">
        {heading && (
          <p className="font-semibold text-sm leading-5 text-vibrant-text-heading">
            {heading}
          </p>
        )}
        <div className="font-normal text-sm leading-5 text-vibrant-text-body">
          {children}
        </div>
      </div>
      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          className="flex items-center justify-center shrink-0 size-5 text-vibrant-text-body hover:text-vibrant-text-heading transition-colors cursor-pointer"
          aria-label="Dismiss"
        >
          <X className="size-2.5" />
        </button>
      )}
    </div>
  )
}

export { AlertBanner, alertBannerVariants }
