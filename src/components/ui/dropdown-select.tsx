'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─── Context ──────────────────────────────────────────────── */

interface DropdownSelectContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  value: string
  onValueChange: (value: string) => void
  disabled: boolean
  error: boolean
  placeholder: string
  icon?: React.ReactNode
  displayLabel: string
  options: { value: string; label: string }[]
  registerOption: (value: string, label: string) => void
  highlightedIndex: number
  setHighlightedIndex: (index: number) => void
}

const DropdownSelectContext = React.createContext<DropdownSelectContextValue | null>(null)

function useDropdownSelect() {
  const ctx = React.useContext(DropdownSelectContext)
  if (!ctx) throw new Error('DropdownSelect compound components must be used within <DropdownSelect>')
  return ctx
}

/* ─── Root ─────────────────────────────────────────────────── */

export interface DropdownSelectProps {
  children: React.ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  error?: boolean
  placeholder?: string
  icon?: React.ReactNode
}

function DropdownSelect({
  children,
  value: valueProp,
  defaultValue = '',
  onValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  error = false,
  placeholder = 'Select',
  icon,
}: DropdownSelectProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const [options, setOptions] = React.useState<{ value: string; label: string }[]>([])
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1)

  const isControlledValue = valueProp !== undefined
  const isControlledOpen = openProp !== undefined
  const value = isControlledValue ? valueProp : internalValue
  const open = isControlledOpen ? openProp : internalOpen

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlledOpen) setInternalOpen(next)
      onOpenChange?.(next)
    },
    [isControlledOpen, onOpenChange]
  )

  const handleValueChange = React.useCallback(
    (next: string) => {
      if (!isControlledValue) setInternalValue(next)
      onValueChange?.(next)
      setOpen(false)
    },
    [isControlledValue, onValueChange, setOpen]
  )

  const registerOption = React.useCallback((val: string, label: string) => {
    setOptions(prev => {
      if (prev.some(o => o.value === val)) return prev
      return [...prev, { value: val, label }]
    })
  }, [])

  const displayLabel = React.useMemo(() => {
    const match = options.find(o => o.value === value)
    return match?.label ?? ''
  }, [options, value])

  const ctx = React.useMemo<DropdownSelectContextValue>(
    () => ({
      open,
      setOpen,
      value,
      onValueChange: handleValueChange,
      disabled,
      error,
      placeholder,
      icon,
      displayLabel,
      options,
      registerOption,
      highlightedIndex,
      setHighlightedIndex,
    }),
    [open, setOpen, value, handleValueChange, disabled, error, placeholder, icon, displayLabel, options, registerOption, highlightedIndex, setHighlightedIndex]
  )

  return (
    <DropdownSelectContext.Provider value={ctx}>
      <PopoverPrimitive.Root open={open} onOpenChange={disabled ? undefined : setOpen}>
        {children}
      </PopoverPrimitive.Root>
    </DropdownSelectContext.Provider>
  )
}

/* ─── Label ────────────────────────────────────────────────── */

export interface DropdownSelectLabelProps extends React.ComponentProps<'div'> {
  mandatory?: boolean
}

function DropdownSelectLabel({
  className,
  children,
  mandatory = false,
  ...props
}: DropdownSelectLabelProps) {
  return (
    <div
      data-slot="dropdown-select-label"
      className={cn(
        'flex items-center font-sans font-medium text-[14px] leading-[20px] text-vibrant-text-details',
        className
      )}
      {...props}
    >
      {children}
      {mandatory && (
        <span className="text-error-surface-default ml-0.5 text-[14px] leading-[20px]">*</span>
      )}
    </div>
  )
}

/* ─── Trigger ──────────────────────────────────────────────── */

export interface DropdownSelectTriggerProps
  extends Omit<React.ComponentProps<typeof PopoverPrimitive.Trigger>, 'asChild'> {}

function DropdownSelectTrigger({ className, ...props }: DropdownSelectTriggerProps) {
  const { value, displayLabel, placeholder, icon, disabled, error, open, options, setOpen, onValueChange, highlightedIndex, setHighlightedIndex } = useDropdownSelect()

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        if (!open) {
          setOpen(true)
          return
        }
        const len = options.length
        if (len === 0) return
        if (e.key === 'ArrowDown') {
          setHighlightedIndex(highlightedIndex < len - 1 ? highlightedIndex + 1 : 0)
        } else {
          setHighlightedIndex(highlightedIndex > 0 ? highlightedIndex - 1 : len - 1)
        }
      } else if (e.key === 'Enter' && open && highlightedIndex >= 0) {
        e.preventDefault()
        const opt = options[highlightedIndex]
        if (opt) onValueChange(opt.value)
      } else if (e.key === 'Escape' && open) {
        e.preventDefault()
        setOpen(false)
      }
    },
    [disabled, open, setOpen, options, highlightedIndex, setHighlightedIndex, onValueChange]
  )

  const hasValue = value !== '' && displayLabel !== ''

  return (
    <PopoverPrimitive.Trigger asChild>
      <button
        type="button"
        data-slot="dropdown-select-trigger"
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
        onKeyDown={handleKeyDown}
        className={cn(
          // Base
          'flex w-full items-center gap-2 h-[48px] rounded-[8px] px-[12px] py-[8px] font-sans font-medium text-[16px] leading-[24px] outline-none transition-colors cursor-pointer',
          // Default state
          'border border-gray-stroke-default bg-white dark:bg-background',
          // Placeholder vs selected text
          hasValue
            ? 'text-vibrant-text-heading'
            : 'text-muted-foreground',
          // Hover
          !disabled && !error && 'hover:border-focus-ring',
          // Focus
          !disabled && !error && 'focus-visible:border-focus-ring focus-visible:border-2 focus-visible:px-[11px] focus-visible:py-[7px]',
          // Open/Active
          open && !error && 'border-focus-ring',
          // Error
          error && 'border-error-stroke-light bg-error-surface-light',
          // Disabled
          disabled && 'opacity-60 cursor-not-allowed',
          className
        )}
        {...props}
      >
        {icon && (
          <span className="flex items-center justify-center shrink-0 size-[20px] [&_svg]:size-[20px] text-muted-foreground">
            {icon}
          </span>
        )}
        <span className="flex-1 text-left truncate">
          {hasValue ? displayLabel : placeholder}
        </span>
        <ChevronDown
          className={cn(
            'shrink-0 size-[20px] text-muted-foreground transition-transform',
            open && 'rotate-180'
          )}
        />
      </button>
    </PopoverPrimitive.Trigger>
  )
}

/* ─── Content ──────────────────────────────────────────────── */

export interface DropdownSelectContentProps
  extends Omit<React.ComponentProps<typeof PopoverPrimitive.Content>, 'asChild'> {}

function DropdownSelectContent({
  className,
  children,
  ...props
}: DropdownSelectContentProps) {
  const { setHighlightedIndex } = useDropdownSelect()

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="dropdown-select-content"
        sideOffset={8}
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        onPointerDownOutside={() => setHighlightedIndex(-1)}
        className={cn(
          'z-50 w-[var(--radix-popover-trigger-width)] rounded-[8px] border border-gray-stroke-light bg-white dark:bg-card p-[12px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.05)]',
          'max-h-[300px] overflow-y-auto overflow-x-hidden',
          // Custom scrollbar
          '[&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-track]:rounded-[3px] [&::-webkit-scrollbar-track]:bg-gray-surface-light [&::-webkit-scrollbar-thumb]:rounded-[3px] [&::-webkit-scrollbar-thumb]:bg-gray-surface-default',
          // Animations
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      >
        <div role="listbox" className="flex flex-col">
          {children}
        </div>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
}

/* ─── Option ───────────────────────────────────────────────── */

export interface DropdownSelectOptionProps extends React.ComponentProps<'div'> {
  value: string
  label?: string
  disabled?: boolean
}

function DropdownSelectOption({
  className,
  value: optionValue,
  label,
  disabled: optionDisabled = false,
  children,
  ...props
}: DropdownSelectOptionProps) {
  const { value, onValueChange, registerOption, options, highlightedIndex, setHighlightedIndex } = useDropdownSelect()

  const displayText = label ?? (typeof children === 'string' ? children : '')

  React.useEffect(() => {
    if (displayText) {
      registerOption(optionValue, displayText)
    }
  }, [optionValue, displayText, registerOption])

  const isSelected = value === optionValue
  const index = options.findIndex(o => o.value === optionValue)
  const isHighlighted = highlightedIndex === index

  return (
    <div
      role="option"
      aria-selected={isSelected}
      aria-disabled={optionDisabled}
      data-slot="dropdown-select-option"
      data-highlighted={isHighlighted || undefined}
      data-selected={isSelected || undefined}
      onClick={() => {
        if (!optionDisabled) onValueChange(optionValue)
      }}
      onMouseEnter={() => setHighlightedIndex(index)}
      onMouseLeave={() => setHighlightedIndex(-1)}
      className={cn(
        'flex items-center h-[48px] px-[8px] rounded-[8px] font-sans font-medium text-[16px] leading-[24px] text-vibrant-text-heading cursor-pointer select-none transition-colors',
        // Hover/highlighted
        'hover:bg-gray-surface-light hover:font-semibold',
        isHighlighted && 'bg-gray-surface-light font-semibold',
        // Selected
        isSelected && 'font-semibold',
        // Disabled
        optionDisabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {children ?? displayText}
    </div>
  )
}

/* ─── Exports ──────────────────────────────────────────────── */

export {
  DropdownSelect,
  DropdownSelectLabel,
  DropdownSelectTrigger,
  DropdownSelectContent,
  DropdownSelectOption,
}
