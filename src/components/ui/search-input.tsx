'use client'

import * as React from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─── Suggestion Item ──────────────────────────────────────── */

export interface SearchSuggestion {
  icon?: React.ReactNode
  label: string
}

/* ─── Props ────────────────────────────────────────────────── */

export interface SearchInputProps {
  /** 'icon' renders a 36×36 search icon button; 'button' renders a "Search" text button */
  variant?: 'icon' | 'button'
  /** Controlled value */
  value?: string
  /** Uncontrolled default value */
  defaultValue?: string
  /** Called on every input change */
  onValueChange?: (value: string) => void
  /** Called on Enter key or search button click */
  onSearch?: (value: string) => void
  /** Called when the clear (X) button is clicked */
  onClear?: () => void
  placeholder?: string
  /** Label text above the input */
  label?: string
  /** Helper text below the input */
  helperText?: string
  /** Optional left icon */
  icon?: React.ReactNode
  /** Error state */
  error?: boolean
  /** Error helper text (overrides helperText when error=true) */
  errorMessage?: string
  /** Disabled state */
  disabled?: boolean
  /** Suggestion items shown in dropdown when typing */
  suggestions?: SearchSuggestion[]
  /** Called when a suggestion is clicked */
  onSuggestionClick?: (label: string) => void
  className?: string
}

function SearchInput({
  variant = 'icon',
  value: valueProp,
  defaultValue = '',
  onValueChange,
  onSearch,
  onClear,
  placeholder = 'Placeholder',
  label,
  helperText,
  icon,
  error = false,
  errorMessage,
  disabled = false,
  suggestions = [],
  onSuggestionClick,
  className,
}: SearchInputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [isFocused, setIsFocused] = React.useState(false)
  const [showSuggestions, setShowSuggestions] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const isControlled = valueProp !== undefined
  const currentValue = isControlled ? valueProp : internalValue
  const hasValue = currentValue.trim().length > 0
  const isFilledEdit = hasValue && !isFocused && !error

  const updateValue = React.useCallback(
    (next: string) => {
      if (!isControlled) setInternalValue(next)
      onValueChange?.(next)
    },
    [isControlled, onValueChange]
  )

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateValue(e.target.value)
      if (e.target.value.trim().length > 0 && suggestions.length > 0) {
        setShowSuggestions(true)
      } else {
        setShowSuggestions(false)
      }
    },
    [updateValue, suggestions.length]
  )

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        onSearch?.(currentValue)
        setShowSuggestions(false)
      } else if (e.key === 'Escape') {
        setShowSuggestions(false)
        inputRef.current?.blur()
      }
    },
    [currentValue, onSearch]
  )

  const handleClear = React.useCallback(() => {
    updateValue('')
    onClear?.()
    inputRef.current?.focus()
  }, [updateValue, onClear])

  const handleSearchClick = React.useCallback(() => {
    onSearch?.(currentValue)
    setShowSuggestions(false)
  }, [currentValue, onSearch])

  const handleSuggestionClick = React.useCallback(
    (label: string) => {
      updateValue(label)
      onSuggestionClick?.(label)
      setShowSuggestions(false)
      inputRef.current?.focus()
    },
    [updateValue, onSuggestionClick]
  )

  const handleFocus = React.useCallback(() => {
    if (disabled) return
    setIsFocused(true)
    if (currentValue.trim().length > 0 && suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }, [disabled, currentValue, suggestions.length])

  const handleBlur = React.useCallback(
    (e: React.FocusEvent) => {
      // Don't blur if clicking inside the container (e.g., search button, suggestion)
      if (containerRef.current?.contains(e.relatedTarget as Node)) return
      setIsFocused(false)
      setShowSuggestions(false)
    },
    []
  )

  const displayHelperText = error && errorMessage ? errorMessage : helperText
  const showClearButton = (isFilledEdit || error) && hasValue

  return (
    <div
      ref={containerRef}
      data-slot="search-input"
      className={cn('flex flex-col gap-[8px] items-start w-full', className)}
      onBlur={handleBlur}
    >
      {/* Label */}
      {label && (
        <div className="flex items-center font-sans font-medium text-[14px] leading-[20px] text-vibrant-text-details">
          {label}
        </div>
      )}

      {/* Input container */}
      <div
        className={cn(
          'flex items-center w-full h-[48px] rounded-[8px] overflow-hidden transition-colors',
          // Border + background
          error
            ? 'border border-error-stroke-light bg-error-surface-light'
            : isFocused
              ? 'border-2 border-focus-ring bg-white dark:bg-background'
              : 'border border-gray-stroke-default bg-white dark:bg-background',
          // Hover (only when not focused, not error, not disabled)
          !isFocused && !error && !disabled && 'hover:border-focus-ring',
          // Padding - adjust for 2px border on focus to prevent layout shift
          error
            ? 'pl-[12px] pr-[12px] py-[8px]'
            : isFocused
              ? 'pl-[11px] pr-[7px] py-[7px]'
              : 'pl-[12px] pr-[8px] py-[8px]',
          // Gap
          'gap-[8px]',
          // Disabled
          disabled && 'opacity-60 cursor-not-allowed'
        )}
      >
        {/* Left icon */}
        {icon && (
          <span
            className={cn(
              'flex items-center justify-center shrink-0 size-[20px] [&_svg]:size-[20px]',
              error ? 'text-error-surface-default' : isFocused ? 'text-focus-ring' : 'text-muted-foreground'
            )}
          >
            {icon}
          </span>
        )}

        {/* Text input */}
        <input
          ref={inputRef}
          type="text"
          value={currentValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            'flex-1 min-w-0 bg-transparent outline-none font-sans font-medium text-[16px] leading-[24px] text-vibrant-text-heading placeholder:text-muted-foreground',
            disabled && 'cursor-not-allowed'
          )}
        />

        {/* Right action: Search button, icon, or clear */}
        {showClearButton ? (
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center justify-center shrink-0 size-[20px] text-muted-foreground hover:text-vibrant-text-heading transition-colors cursor-pointer"
            aria-label="Clear search"
            tabIndex={-1}
          >
            <X className="size-[16px]" />
          </button>
        ) : variant === 'button' ? (
          <button
            type="button"
            onClick={handleSearchClick}
            disabled={disabled}
            className="flex items-center justify-center shrink-0 h-[36px] min-w-[100px] px-[16px] py-[8px] rounded-[6px] bg-primary-surface-default font-sans font-semibold text-[16px] leading-[24px] text-white cursor-pointer disabled:cursor-not-allowed transition-colors"
            tabIndex={-1}
          >
            Search
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSearchClick}
            disabled={disabled}
            className="flex items-center justify-center shrink-0 size-[36px] rounded-[6px] bg-primary-surface-default cursor-pointer disabled:cursor-not-allowed transition-colors"
            aria-label="Search"
            tabIndex={-1}
          >
            <Search className="size-[20px] text-white" />
          </button>
        )}
      </div>

      {/* Helper text */}
      {displayHelperText && (
        <p
          className={cn(
            'font-sans font-normal text-[12px] leading-[16px] w-full',
            error ? 'text-error-surface-default' : 'text-vibrant-text-details'
          )}
        >
          {displayHelperText}
        </p>
      )}

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          data-slot="search-input-suggestions"
          className="w-full rounded-[8px] border border-gray-stroke-light bg-white dark:bg-card p-[12px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.05)] flex flex-col gap-[16px]"
        >
          {suggestions.map((suggestion, idx) => (
            <button
              key={`${suggestion.label}-${idx}`}
              type="button"
              onClick={() => handleSuggestionClick(suggestion.label)}
              onMouseDown={(e) => e.preventDefault()}
              className="flex items-center gap-[13px] h-[40px] pr-[12px] rounded-[8px] w-full text-left hover:bg-gray-surface-light transition-colors cursor-pointer"
            >
              {suggestion.icon && (
                <span className="flex items-center justify-center shrink-0 size-[40px] rounded-[8px] bg-gray-surface-light [&_svg]:size-[20px] text-muted-foreground">
                  {suggestion.icon}
                </span>
              )}
              <span className="flex-1 min-w-0 font-sans font-medium text-[16px] leading-[24px] text-vibrant-text-heading truncate">
                {suggestion.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export { SearchInput }
