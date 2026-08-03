'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { X } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

const TooltipCloseContext = React.createContext<(() => void) | null>(null)

function Tooltip({
  persistent = false,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root> & {
  /** When true, tooltip stays open until dismissed via close button or click outside. */
  persistent?: boolean
}) {
  const [open, setOpen] = React.useState(props.defaultOpen ?? false)

  if (!persistent) {
    return (
      <TooltipProvider>
        <TooltipPrimitive.Root data-slot="tooltip" {...props} />
      </TooltipProvider>
    )
  }

  const close = () => {
    setOpen(false)
    props.onOpenChange?.(false)
  }

  return (
    <TooltipProvider>
      <TooltipCloseContext.Provider value={close}>
        <TooltipPrimitive.Root
          data-slot="tooltip"
          open={props.open ?? open}
          onOpenChange={isOpen => {
            if (isOpen) {
              setOpen(true)
              props.onOpenChange?.(true)
            }
            // When persistent, ignore close from hover-out
          }}
          {...props}
        />
      </TooltipCloseContext.Provider>
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

export interface TooltipContentProps extends React.ComponentProps<
  typeof TooltipPrimitive.Content
> {
  /** Omit the arrow entirely. Defaults to `false`. */
  hideArrow?: boolean
  /**
   * Classes merged (via `cn`) onto the arrow. Use to recolor it so it matches a
   * custom surface, e.g. `arrowClassName="bg-white fill-white"`.
   */
  arrowClassName?: string
}

function TooltipContent({
  className,
  sideOffset = 0,
  hideArrow = false,
  arrowClassName,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance ',
          className
        )}
        {...props}
      >
        {children}
        {!hideArrow && (
          <TooltipPrimitive.Arrow
            className={cn(
              'bg-primary fill-primary z-10 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]',
              arrowClassName
            )}
          />
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export type RichTooltipVariant = 'dark' | 'light'

/**
 * Per-variant surface, text, muted-text and arrow classes. Both variants render
 * a consistent look regardless of the app's light/dark theme (the base tokens
 * are theme-invariant), matching how the original dark tooltip always rendered.
 *
 * The `light` variant ships a soft shadow on the surface AND a matching
 * `drop-shadow` on the arrow (a `filter`, so the shadow follows the diamond
 * shape) — otherwise a white arrow is invisible against light backgrounds.
 */
const richTooltipVariants: Record<
  RichTooltipVariant,
  { surface: string; text: string; mutedText: string; arrow: string }
> = {
  dark: {
    surface: 'bg-gray-surface-dark',
    text: 'text-white',
    mutedText: 'text-white/70 hover:text-white',
    arrow: 'fill-gray-surface-dark'
  },
  light: {
    surface: 'bg-white shadow-md',
    text: 'text-gray-surface-dark',
    mutedText: 'text-gray-surface-dark/70 hover:text-gray-surface-dark',
    arrow: 'fill-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.12)]'
  }
}

export interface RichTooltipContentProps extends Omit<
  React.ComponentProps<typeof TooltipPrimitive.Content>,
  'children'
> {
  icon?: React.ReactNode
  heading?: string
  dismissible?: boolean
  onDismiss?: () => void
  children: React.ReactNode
  /**
   * Preset surface + text + arrow combo. `"dark"` (default) keeps the original
   * dark surface with white text; `"light"` renders a white surface with dark
   * text. Both look correct out of the box regardless of the app theme.
   */
  variant?: RichTooltipVariant
  /**
   * Classes merged (via `cn`) onto the inner surface `div`, so the background
   * (and text color) can be overridden, e.g. `surfaceClassName="bg-white text-foreground"`.
   * Wins over the `variant` defaults.
   */
  surfaceClassName?: string
  /**
   * Classes merged (via `cn`) onto the arrow so it matches a custom surface,
   * e.g. `arrowClassName="fill-white"`. Wins over the `variant` defaults.
   */
  arrowClassName?: string
  /** Omit the arrow entirely. Defaults to `false`. */
  hideArrow?: boolean
}

function RichTooltipContent({
  className,
  sideOffset = 4,
  icon,
  heading,
  dismissible = false,
  onDismiss,
  children,
  variant = 'dark',
  surfaceClassName,
  arrowClassName,
  hideArrow = false,
  ...props
}: RichTooltipContentProps) {
  const close = React.useContext(TooltipCloseContext)

  const handleDismiss = () => {
    close?.()
    onDismiss?.()
  }

  const styles = richTooltipVariants[variant] ?? richTooltipVariants.dark

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="rich-tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-(--radix-tooltip-content-transform-origin)',
          className
        )}
        {...(dismissible && {
          onPointerDownOutside: handleDismiss
        })}
        {...props}
      >
        <div
          className={cn(
            'flex items-start gap-3 rounded-[12px] px-3 py-4 text-sm leading-5 max-w-sm',
            styles.surface,
            styles.text,
            surfaceClassName
          )}
        >
          {icon && (
            <span className="flex items-center justify-center shrink-0 size-5 [&_svg]:size-5">
              {icon}
            </span>
          )}
          <div className="flex flex-1 flex-col gap-2 min-w-0">
            {heading && (
              <p className="font-semibold text-sm leading-5">{heading}</p>
            )}
            <div className="font-normal text-sm leading-5">{children}</div>
          </div>
          {dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              className={cn(
                'flex items-center justify-center shrink-0 size-5 transition-colors cursor-pointer',
                styles.mutedText
              )}
              aria-label="Dismiss"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
        {!hideArrow && (
          <TooltipPrimitive.Arrow
            width={16}
            height={12}
            className={cn(styles.arrow, arrowClassName)}
          />
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export {
  RichTooltipContent,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
}
