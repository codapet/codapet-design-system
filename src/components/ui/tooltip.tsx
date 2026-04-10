"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

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
          onOpenChange={(isOpen) => {
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

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export interface RichTooltipContentProps
  extends Omit<React.ComponentProps<typeof TooltipPrimitive.Content>, 'children'> {
  icon?: React.ReactNode
  heading?: string
  dismissible?: boolean
  onDismiss?: () => void
  children: React.ReactNode
}

function RichTooltipContent({
  className,
  sideOffset = 4,
  icon,
  heading,
  dismissible = false,
  onDismiss,
  children,
  ...props
}: RichTooltipContentProps) {
  const close = React.useContext(TooltipCloseContext)

  const handleDismiss = () => {
    close?.()
    onDismiss?.()
  }

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="rich-tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-(--radix-tooltip-content-transform-origin)",
          className
        )}
        {...(dismissible && {
          onPointerDownOutside: handleDismiss,
        })}
        {...props}
      >
        <div className="flex items-start gap-3 bg-gray-surface-dark rounded-[12px] px-3 py-4 text-sm leading-5 max-w-sm">
          {icon && (
            <span className="flex items-center justify-center shrink-0 size-5 text-white [&_svg]:size-5">
              {icon}
            </span>
          )}
          <div className="flex flex-1 flex-col gap-2 min-w-0">
            {heading && (
              <p className="font-semibold text-sm leading-5 text-white">
                {heading}
              </p>
            )}
            <div className="font-normal text-sm leading-5 text-white">
              {children}
            </div>
          </div>
          {dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              className="flex items-center justify-center shrink-0 size-5 text-white/70 hover:text-white transition-colors cursor-pointer"
              aria-label="Dismiss"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
        <TooltipPrimitive.Arrow
          width={16}
          height={12}
          className="fill-gray-surface-dark"
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, RichTooltipContent }
