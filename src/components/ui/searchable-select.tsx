"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDown, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

// ─── Types ───────────────────────────────────────────────────────────

export type SearchableSelectOption = {
  value: string
  label: string
  disabled?: boolean
  group?: string
}

// ─── Context ─────────────────────────────────────────────────────────

interface SearchableSelectContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  mode: "single" | "multiple"
  value: string
  setValue: (value: string) => void
  values: string[]
  setValues: (values: string[]) => void
  searchable: boolean
  searchPlaceholder: string
  placeholder: string
  disabled: boolean
  maxCount: number
  options: SearchableSelectOption[]
  optionMap: Map<string, string>
}

const SearchableSelectContext =
  React.createContext<SearchableSelectContextValue | null>(null)

function useSearchableSelect() {
  const ctx = React.useContext(SearchableSelectContext)
  if (!ctx) {
    throw new Error(
      "SearchableSelect compound components must be used within <SearchableSelect>"
    )
  }
  return ctx
}

// ─── Root ────────────────────────────────────────────────────────────

interface SearchableSelectProps {
  mode?: "single" | "multiple"
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  values?: string[]
  defaultValues?: string[]
  onValuesChange?: (values: string[]) => void
  searchable?: boolean
  searchPlaceholder?: string
  placeholder?: string
  disabled?: boolean
  maxCount?: number
  options?: SearchableSelectOption[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

function SearchableSelect({
  mode = "single",
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  values: controlledValues,
  defaultValues = [],
  onValuesChange,
  searchable = true,
  searchPlaceholder = "Search...",
  placeholder = "Select...",
  disabled = false,
  maxCount = Infinity,
  options = [],
  open: controlledOpen,
  onOpenChange,
  children,
}: SearchableSelectProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [internalValues, setInternalValues] =
    React.useState<string[]>(defaultValues)

  const open = controlledOpen ?? internalOpen
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (controlledOpen !== undefined) {
        onOpenChange?.(next)
      } else {
        setInternalOpen(next)
        onOpenChange?.(next)
      }
    },
    [controlledOpen, onOpenChange]
  )

  const value = controlledValue ?? internalValue
  const setValue = React.useCallback(
    (next: string) => {
      if (controlledValue === undefined) {
        setInternalValue(next)
      }
      onValueChange?.(next)
    },
    [controlledValue, onValueChange]
  )

  const values = controlledValues ?? internalValues
  const setValues = React.useCallback(
    (next: string[]) => {
      if (controlledValues === undefined) {
        setInternalValues(next)
      }
      onValuesChange?.(next)
    },
    [controlledValues, onValuesChange]
  )

  const optionMap = React.useMemo(() => {
    const map = new Map<string, string>()
    for (const opt of options) {
      map.set(opt.value, opt.label)
    }
    return map
  }, [options])

  const ctx = React.useMemo<SearchableSelectContextValue>(
    () => ({
      open,
      setOpen,
      mode,
      value,
      setValue,
      values,
      setValues,
      searchable,
      searchPlaceholder,
      placeholder,
      disabled,
      maxCount,
      options,
      optionMap,
    }),
    [
      open,
      setOpen,
      mode,
      value,
      setValue,
      values,
      setValues,
      searchable,
      searchPlaceholder,
      placeholder,
      disabled,
      maxCount,
      options,
      optionMap,
    ]
  )

  return (
    <SearchableSelectContext.Provider value={ctx}>
      <Popover open={open} onOpenChange={setOpen}>
        {children}
      </Popover>
    </SearchableSelectContext.Provider>
  )
}

// ─── Trigger ─────────────────────────────────────────────────────────

function SearchableSelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof PopoverTrigger> & {
  size?: "sm" | "default"
}) {
  const ctx = useSearchableSelect()

  const renderContent = () => {
    if (children) return children

    if (ctx.mode === "single") {
      const label = ctx.optionMap.get(ctx.value)
      return (
        <span
          data-slot="searchable-select-value"
          className={cn(
            "truncate",
            !label && "text-muted-foreground"
          )}
        >
          {label || ctx.placeholder}
        </span>
      )
    }

    // Multi mode
    if (ctx.values.length === 0) {
      return (
        <span
          data-slot="searchable-select-value"
          className="text-muted-foreground"
        >
          {ctx.placeholder}
        </span>
      )
    }

    const visible = ctx.values.slice(0, ctx.maxCount)
    const remaining = ctx.values.length - visible.length

    return (
      <span
        data-slot="searchable-select-value"
        className="flex flex-wrap items-center gap-1"
      >
        {visible.map((v) => (
          <Badge
            key={v}
            variant="secondary"
            className="gap-1 pr-1"
          >
            <span className="truncate max-w-[120px]">
              {ctx.optionMap.get(v) || v}
            </span>
            <span
              role="button"
              tabIndex={-1}
              aria-label={`Remove ${ctx.optionMap.get(v) || v}`}
              className="rounded-sm hover:bg-muted cursor-pointer"
              onPointerDown={(e) => e.preventDefault()}
              onClick={(e) => {
                e.stopPropagation()
                ctx.setValues(ctx.values.filter((val) => val !== v))
              }}
            >
              <XIcon className="size-3" />
            </span>
          </Badge>
        ))}
        {remaining > 0 && (
          <Badge variant="outline" className="text-muted-foreground">
            +{remaining} more
          </Badge>
        )}
      </span>
    )
  }

  return (
    <PopoverTrigger
      data-slot="searchable-select-trigger"
      data-size={size}
      disabled={ctx.disabled}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:min-h-9 data-[size=sm]:min-h-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        ctx.mode === "multiple" && "h-auto flex-wrap whitespace-normal",
        className
      )}
      {...props}
    >
      {renderContent()}
      <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
    </PopoverTrigger>
  )
}

// ─── Content ─────────────────────────────────────────────────────────

function SearchableSelectContent({
  className,
  children,
  emptyText = "No results found.",
  ...props
}: React.ComponentProps<typeof PopoverContent> & {
  emptyText?: string
}) {
  const ctx = useSearchableSelect()

  const groupedOptions = React.useMemo(() => {
    if (ctx.options.length === 0) return null
    const groups = new Map<string, SearchableSelectOption[]>()
    for (const opt of ctx.options) {
      const key = opt.group || ""
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key)!.push(opt)
    }
    return groups
  }, [ctx.options])

  const renderAutoItems = () => {
    if (!groupedOptions) return null
    const entries = Array.from(groupedOptions.entries())
    if (entries.length === 1 && entries[0][0] === "") {
      return entries[0][1].map((opt) => (
        <SearchableSelectItem
          key={opt.value}
          value={opt.value}
          disabled={opt.disabled}
        >
          {opt.label}
        </SearchableSelectItem>
      ))
    }
    return entries.map(([group, opts]) => (
      <SearchableSelectGroup key={group} heading={group || undefined}>
        {opts.map((opt) => (
          <SearchableSelectItem
            key={opt.value}
            value={opt.value}
            disabled={opt.disabled}
          >
            {opt.label}
          </SearchableSelectItem>
        ))}
      </SearchableSelectGroup>
    ))
  }

  return (
    <PopoverContent
      data-slot="searchable-select-content"
      className={cn("w-[var(--radix-popover-trigger-width)] p-0", className)}
      align="start"
      {...props}
    >
      <Command>
        {ctx.searchable && (
          <CommandInput placeholder={ctx.searchPlaceholder} />
        )}
        <CommandList>
          <CommandEmpty>{emptyText}</CommandEmpty>
          {children || renderAutoItems()}
        </CommandList>
      </Command>
    </PopoverContent>
  )
}

// ─── Item ────────────────────────────────────────────────────────────

function SearchableSelectItem({
  className,
  value,
  children,
  disabled,
  ...props
}: Omit<React.ComponentProps<typeof CommandItem>, "onSelect" | "value"> & {
  value: string
  disabled?: boolean
}) {
  const ctx = useSearchableSelect()

  const isSelected =
    ctx.mode === "single"
      ? ctx.value === value
      : ctx.values.includes(value)

  const handleSelect = () => {
    if (disabled) return
    if (ctx.mode === "single") {
      ctx.setValue(value === ctx.value ? "" : value)
      ctx.setOpen(false)
    } else {
      ctx.setValues(
        isSelected
          ? ctx.values.filter((v) => v !== value)
          : [...ctx.values, value]
      )
    }
  }

  return (
    <CommandItem
      data-slot="searchable-select-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none",
        ctx.mode === "multiple" && "pl-8",
        className
      )}
      onSelect={handleSelect}
      data-disabled={disabled || undefined}
      {...props}
    >
      {ctx.mode === "multiple" && (
        <span className="absolute left-2 flex size-4 items-center justify-center">
          <span
            className={cn(
              "size-4 rounded-sm border border-primary transition-colors",
              isSelected
                ? "bg-primary text-primary-foreground"
                : "bg-transparent"
            )}
          >
            {isSelected && <CheckIcon className="size-4 p-0.5" />}
          </span>
        </span>
      )}
      <span className="flex-1 truncate">{children}</span>
      {ctx.mode === "single" && isSelected && (
        <span className="absolute right-2 flex size-4 items-center justify-center">
          <CheckIcon className="size-4" />
        </span>
      )}
    </CommandItem>
  )
}

// ─── Group ───────────────────────────────────────────────────────────

function SearchableSelectGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandGroup>) {
  return (
    <CommandGroup
      data-slot="searchable-select-group"
      className={cn(className)}
      {...props}
    />
  )
}

// ─── Empty ───────────────────────────────────────────────────────────

function SearchableSelectEmpty({
  className,
  children = "No results found.",
  ...props
}: React.ComponentProps<typeof CommandEmpty>) {
  return (
    <CommandEmpty
      data-slot="searchable-select-empty"
      className={cn(className)}
      {...props}
    >
      {children}
    </CommandEmpty>
  )
}

// ─── Exports ─────────────────────────────────────────────────────────

export {
  SearchableSelect,
  SearchableSelectTrigger,
  SearchableSelectContent,
  SearchableSelectItem,
  SearchableSelectGroup,
  SearchableSelectEmpty,
}

export type { SearchableSelectProps }
