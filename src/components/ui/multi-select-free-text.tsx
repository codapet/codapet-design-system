'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─── Types ────────────────────────────────────────────────── */

export interface MultiSelectFreeTextOption {
  value: string
  label: string
}

/* ─── Tag ──────────────────────────────────────────────────── */

interface TagProps {
  label: string
  onRemove: () => void
}

function Tag({ label, onRemove }: TagProps) {
  return (
    <span
      data-slot="multi-select-tag"
      className="inline-flex items-center gap-[8px] h-[32px] px-[12px] py-[8px] rounded-[8px] bg-primary-surface-subtle font-sans font-medium text-[14px] leading-[20px] text-primary-stroke-default shrink-0"
    >
      {label}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onRemove()
        }}
        className="flex items-center justify-center size-[20px] text-primary-stroke-default hover:text-primary-surface-default transition-colors cursor-pointer"
        aria-label={`Remove ${label}`}
      >
        <X className="size-[16px]" />
      </button>
    </span>
  )
}

/* ─── Main Component ───────────────────────────────────────── */

export interface MultiSelectFreeTextProps {
  /** Current tag values */
  values?: string[]
  /** Default tag values (uncontrolled) */
  defaultValues?: string[]
  /** Callback when tags change */
  onValuesChange?: (values: string[]) => void
  /** Suggestion options shown in dropdown */
  options?: MultiSelectFreeTextOption[]
  /** Placeholder when no tags and no input text */
  placeholder?: string
  /** Left icon */
  icon?: React.ReactNode
  /** Label text */
  label?: string
  /** Show mandatory asterisk on label */
  mandatory?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Additional className */
  className?: string
}

function MultiSelectFreeText({
  values: valuesProp,
  defaultValues = [],
  onValuesChange,
  options = [],
  placeholder = 'Placeholder text',
  icon,
  label,
  mandatory = false,
  disabled = false,
  className,
}: MultiSelectFreeTextProps) {
  const [internalValues, setInternalValues] = React.useState<string[]>(defaultValues)
  const [inputValue, setInputValue] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const triggerRef = React.useRef<HTMLDivElement>(null)

  const isControlled = valuesProp !== undefined
  const values = isControlled ? valuesProp : internalValues

  const updateValues = React.useCallback(
    (next: string[]) => {
      if (!isControlled) setInternalValues(next)
      onValuesChange?.(next)
    },
    [isControlled, onValuesChange]
  )

  const addTag = React.useCallback(
    (tag: string) => {
      const trimmed = tag.trim()
      if (!trimmed || values.includes(trimmed)) return
      updateValues([...values, trimmed])
      setInputValue('')
      setHighlightedIndex(-1)
    },
    [values, updateValues]
  )

  const removeTag = React.useCallback(
    (tag: string) => {
      updateValues(values.filter((v) => v !== tag))
    },
    [values, updateValues]
  )

  // Filter options based on input text and already-selected values
  const filteredOptions = React.useMemo(() => {
    const lower = inputValue.toLowerCase()
    return options.filter(
      (opt) =>
        !values.includes(opt.value) &&
        (lower === '' || opt.label.toLowerCase().includes(lower))
    )
  }, [options, inputValue, values])

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          addTag(filteredOptions[highlightedIndex].value)
        } else if (inputValue.trim()) {
          addTag(inputValue)
        }
      } else if (e.key === 'Backspace' && inputValue === '' && values.length > 0) {
        removeTag(values[values.length - 1])
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (!open) {
          setOpen(true)
          return
        }
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        )
      } else if (e.key === 'Escape') {
        setOpen(false)
        setHighlightedIndex(-1)
      }
    },
    [highlightedIndex, filteredOptions, inputValue, values, addTag, removeTag, open]
  )

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
      if (!open) setOpen(true)
      setHighlightedIndex(-1)
    },
    [open]
  )

  const handleOptionClick = React.useCallback(
    (optValue: string) => {
      addTag(optValue)
      inputRef.current?.focus()
    },
    [addTag]
  )

  const handleTriggerClick = React.useCallback(() => {
    if (disabled) return
    inputRef.current?.focus()
    if (!open) setOpen(true)
  }, [disabled, open])

  const isFocused = open

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={disabled ? undefined : setOpen}>
      <div
        data-slot="multi-select-free-text"
        className={cn('flex flex-col gap-[8px] items-start w-full', className)}
      >
        {/* Label */}
        {label && (
          <div className="flex items-center font-sans font-medium text-[14px] leading-[20px] text-vibrant-text-details">
            {label}
            {mandatory && (
              <span className="text-error-surface-default ml-0.5 text-[14px] leading-[20px]">
                *
              </span>
            )}
          </div>
        )}

        {/* Input field */}
        <PopoverPrimitive.Anchor asChild>
          <div
            ref={triggerRef}
            onClick={handleTriggerClick}
            className={cn(
              'flex flex-wrap items-center gap-[8px] w-full min-h-[48px] rounded-[8px] px-[12px] py-[8px] border bg-white dark:bg-background transition-colors cursor-text',
              isFocused && !disabled
                ? 'border-focus-ring'
                : 'border-gray-stroke-default',
              !disabled && !isFocused && 'hover:border-focus-ring',
              disabled && 'opacity-60 cursor-not-allowed'
            )}
          >
            {/* Left icon */}
            {icon && (
              <span className="flex items-center justify-center shrink-0 size-[20px] [&_svg]:size-[20px] text-muted-foreground">
                {icon}
              </span>
            )}

            {/* Tags + inline input */}
            <div className="flex flex-wrap items-center gap-[8px] flex-1 min-w-0">
              {values.map((tag) => (
                <Tag key={tag} label={tag} onRemove={() => removeTag(tag)} />
              ))}
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => { if (!open && !disabled) setOpen(true) }}
                disabled={disabled}
                placeholder={values.length === 0 ? placeholder : ''}
                className={cn(
                  'flex-1 min-w-[80px] bg-transparent outline-none font-sans font-medium text-[16px] leading-[24px] text-vibrant-text-heading placeholder:text-muted-foreground',
                  disabled && 'cursor-not-allowed'
                )}
              />
            </div>

            {/* Chevron */}
            <ChevronDown
              className={cn(
                'shrink-0 size-[20px] text-muted-foreground transition-transform',
                open && 'rotate-180'
              )}
            />
          </div>
        </PopoverPrimitive.Anchor>

        {/* Dropdown */}
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            data-slot="multi-select-free-text-content"
            sideOffset={8}
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
            className={cn(
              'z-50 w-[var(--radix-popover-trigger-width)] rounded-[8px] border border-gray-stroke-light bg-white dark:bg-card p-[12px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.05)]',
              'max-h-[300px] overflow-y-auto overflow-x-hidden',
              '[&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-track]:rounded-[3px] [&::-webkit-scrollbar-track]:bg-gray-surface-light [&::-webkit-scrollbar-thumb]:rounded-[3px] [&::-webkit-scrollbar-thumb]:bg-gray-surface-default',
              'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2'
            )}
          >
            <div role="listbox" className="flex flex-col">
              {/* Show typed text as "Free text" option if it doesn't match any option exactly */}
              {inputValue.trim() !== '' &&
                !options.some(
                  (o) => o.label.toLowerCase() === inputValue.toLowerCase()
                ) && (
                  <div
                    role="option"
                    aria-selected={false}
                    data-slot="multi-select-free-text-option"
                    onClick={() => addTag(inputValue.trim())}
                    onMouseEnter={() => setHighlightedIndex(-2)}
                    onMouseLeave={() => setHighlightedIndex(-1)}
                    className={cn(
                      'flex items-center h-[48px] px-[8px] rounded-[8px] font-sans font-medium text-[16px] leading-[24px] text-vibrant-text-heading cursor-pointer select-none transition-colors',
                      'hover:bg-gray-surface-light hover:font-semibold',
                      highlightedIndex === -2 &&
                        'bg-gray-surface-light font-semibold'
                    )}
                  >
                    {inputValue.trim()}
                  </div>
                )}
              {filteredOptions.map((opt, idx) => (
                <div
                  key={opt.value}
                  role="option"
                  aria-selected={values.includes(opt.value)}
                  data-slot="multi-select-free-text-option"
                  onClick={() => handleOptionClick(opt.value)}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  onMouseLeave={() => setHighlightedIndex(-1)}
                  className={cn(
                    'flex items-center h-[48px] px-[8px] rounded-[8px] font-sans font-medium text-[16px] leading-[24px] text-vibrant-text-heading cursor-pointer select-none transition-colors',
                    'hover:bg-gray-surface-light hover:font-semibold',
                    highlightedIndex === idx &&
                      'bg-gray-surface-light font-semibold'
                  )}
                >
                  {opt.label}
                </div>
              ))}
              {filteredOptions.length === 0 && inputValue.trim() === '' && (
                <div className="flex items-center h-[48px] px-[8px] font-sans font-medium text-[14px] leading-[20px] text-muted-foreground">
                  No options available
                </div>
              )}
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </div>
    </PopoverPrimitive.Root>
  )
}

export { MultiSelectFreeText }
