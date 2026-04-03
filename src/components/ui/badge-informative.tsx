import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const badgeInformativeVariants = cva(
  'inline-flex items-center justify-center font-medium whitespace-nowrap shrink-0 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      size: {
        M: 'h-8 px-2 py-1.5 gap-2 rounded-[8px] text-sm leading-5 [&_svg]:size-4',
        S: 'h-6 px-2 py-1.5 gap-1 rounded-[8px] text-xs leading-4 [&_svg]:size-4'
      },
      colorScheme: {
        gray: 'bg-gray-surface-light text-vibrant-text-body',
        blue: 'bg-primary-surface-subtle text-primary-stroke-default',
        yellow:
          'bg-warning-surface-subtle border border-warning-stroke-default text-warning-stroke-dark'
      }
    },
    defaultVariants: {
      size: 'M',
      colorScheme: 'gray'
    }
  }
)

export interface BadgeInformativeProps
  extends
    React.ComponentProps<'div'>,
    VariantProps<typeof badgeInformativeVariants> {
  icon?: React.ReactNode
  linkText?: string
  linkHref?: string
}

function BadgeInformative({
  className,
  size,
  colorScheme,
  icon,
  linkText,
  linkHref,
  children,
  ...props
}: BadgeInformativeProps) {
  return (
    <div
      data-slot="badge-informative"
      className={cn(badgeInformativeVariants({ size, colorScheme }), className)}
      {...props}
    >
      {icon && (
        <span className="flex items-center justify-center shrink-0">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {linkText && (
        <a
          href={linkHref || '#'}
          className={cn(
            'inline-flex items-center gap-1 font-semibold text-base leading-6 shrink-0',
            colorScheme === 'blue'
              ? 'text-primary-stroke-default'
              : 'text-primary-stroke-default'
          )}
        >
          {linkText}
          <svg
            className="size-4"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.667 11.333L11.333 4.667M11.333 4.667H5.333M11.333 4.667V10.667"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      )}
    </div>
  )
}

/**
 * Container for multiple BadgeInformative items displayed side-by-side.
 */
function BadgeInformativeGroup({
  className,
  size = 'M',
  colorScheme = 'gray',
  children,
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof badgeInformativeVariants>) {
  return (
    <div
      data-slot="badge-informative-group"
      className={cn(
        'inline-flex items-center gap-3',
        size === 'M'
          ? 'h-8 px-2 py-1.5 rounded-[8px]'
          : 'h-6 px-2 py-1.5 rounded-[8px]',
        colorScheme === 'gray' && 'bg-gray-surface-light',
        colorScheme === 'blue' && 'bg-primary-surface-subtle',
        colorScheme === 'yellow' &&
          'bg-warning-surface-subtle border border-warning-stroke-default',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * A single item within a BadgeInformativeGroup. Use for multi-content badges.
 */
function BadgeInformativeItem({
  className,
  size = 'M',
  colorScheme = 'gray',
  icon,
  linkText,
  linkHref,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  size?: 'M' | 'S'
  colorScheme?: 'gray' | 'blue' | 'yellow'
  icon?: React.ReactNode
  linkText?: string
  linkHref?: string
}) {
  return (
    <div
      data-slot="badge-informative-item"
      className={cn(
        'inline-flex items-center font-medium whitespace-nowrap shrink-0 [&_svg]:pointer-events-none [&_svg]:shrink-0',
        size === 'M'
          ? 'gap-1 text-sm leading-5 [&_svg]:size-4'
          : 'gap-1 text-xs leading-4 [&_svg]:size-4',
        colorScheme === 'gray' && 'text-vibrant-text-body',
        colorScheme === 'blue' && 'text-primary-stroke-default',
        colorScheme === 'yellow' && 'text-warning-stroke-dark',
        className
      )}
      {...props}
    >
      {icon && (
        <span className="flex items-center justify-center shrink-0">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {linkText && (
        <a
          href={linkHref || '#'}
          className="inline-flex items-center gap-1 font-semibold text-base leading-6 text-primary-stroke-default shrink-0"
        >
          {linkText}
          <svg
            className="size-4"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.667 11.333L11.333 4.667M11.333 4.667H5.333M11.333 4.667V10.667"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      )}
    </div>
  )
}

export {
  BadgeInformative,
  BadgeInformativeGroup,
  BadgeInformativeItem,
  badgeInformativeVariants
}
