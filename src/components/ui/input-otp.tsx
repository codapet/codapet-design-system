"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const InputOTPErrorContext = React.createContext(false)

function InputOTP({
  className,
  containerClassName,
  error,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
  error?: boolean
}) {
  return (
    <InputOTPErrorContext.Provider value={error ?? false}>
      <OTPInput
        data-slot="input-otp"
        containerClassName={cn(
          "flex items-center gap-2 has-disabled:opacity-40",
          containerClassName
        )}
        className={cn("disabled:cursor-not-allowed", className)}
        {...props}
      />
    </InputOTPErrorContext.Provider>
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}
  const isHovering = inputOTPContext?.isHovering ?? false
  const error = React.useContext(InputOTPErrorContext)

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        // Base layout & typography
        "relative flex size-10 items-center justify-center",
        "border-y border-r first:border-l text-sm font-medium leading-5",
        "transition-all outline-none",
        "first:rounded-l-[4px] last:rounded-r-[4px]",
        "text-foreground",
        // Default state (no error)
        !error && "border-gray-stroke-default bg-background",
        // Hover: all slots turn blue (non-error, non-active)
        !error && isHovering && !isActive && "border-focus-ring",
        // Active slot (non-error): 2px blue border
        !error && isActive && "z-10 border-2 border-focus-ring",
        // Error (non-active)
        error && !isActive && "border-error-stroke-default bg-error-surface-subtle",
        // Error + active
        error && isActive && "z-10 border-2 border-error-stroke-default bg-error-surface-subtle",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-focus-ring h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
