import { cn } from '@/lib/utils'
import { type VariantProps } from 'class-variance-authority'
import {
  format as dateFnsFormat,
  parse as dateFnsParse,
  isValid
} from 'date-fns'
import { CalendarDays } from 'lucide-react'
import * as React from 'react'
import type { DateRange } from 'react-day-picker'
import { Button } from './button'
import { Calendar } from './calendar'
import type { DateFormat } from './date-input'
import { Input, inputVariants } from './input'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

export type { DateRange }

const DATE_FORMAT_TOKENS: Record<DateFormat, string> = {
  'MM/DD/YYYY': 'MM/dd/yyyy',
  'DD/MM/YYYY': 'dd/MM/yyyy',
  'YYYY-MM-DD': 'yyyy-MM-dd',
  'DD-MM-YYYY': 'dd-MM-yyyy',
  'MM-DD-YYYY': 'MM-dd-yyyy',
  'DD.MM.YYYY': 'dd.MM.yyyy',
  'MMMM D, YYYY': 'MMMM d, yyyy',
  'D MMMM YYYY': 'd MMMM yyyy'
}

const DATE_FORMAT_PLACEHOLDER: Record<DateFormat, string> = {
  'MM/DD/YYYY': 'mm/dd/yyyy',
  'DD/MM/YYYY': 'dd/mm/yyyy',
  'YYYY-MM-DD': 'yyyy-mm-dd',
  'DD-MM-YYYY': 'dd-mm-yyyy',
  'MM-DD-YYYY': 'mm-dd-yyyy',
  'DD.MM.YYYY': 'dd.mm.yyyy',
  'MMMM D, YYYY': 'Month d, yyyy',
  'D MMMM YYYY': 'd Month yyyy'
}

type NativeInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'min' | 'max' | 'size' | 'disabled' | 'onSelect'
>

type FlattenedCalendarProps = Omit<
  React.ComponentProps<typeof Calendar>,
  | keyof React.InputHTMLAttributes<HTMLInputElement>
  | 'className'
  | 'mode'
  | 'selected'
  | 'onSelect'
  | 'month'
  | 'onMonthChange'
  | 'disabled'
  | 'captionLayout'
  | 'showOutsideDays'
  | 'classNames'
>

const INPUT_PROP_KEYS = new Set([
  'accept',
  'alt',
  'autoComplete',
  'autoFocus',
  'capture',
  'checked',
  'dirName',
  'form',
  'formAction',
  'formEncType',
  'formMethod',
  'formNoValidate',
  'formTarget',
  'height',
  'list',
  'maxLength',
  'minLength',
  'multiple',
  'name',
  'pattern',
  'readOnly',
  'required',
  'size',
  'src',
  'step',
  'type',
  'width',
  'id',
  'inputMode',
  'lang',
  'tabIndex',
  'title',
  'role',
  'style',
  'onFocus',
  'onFocusCapture',
  'onBlurCapture',
  'onInput',
  'onInvalid',
  'onKeyDownCapture',
  'onKeyPress',
  'onKeyPressCapture',
  'onKeyUp',
  'onKeyUpCapture',
  'onPaste',
  'onPasteCapture',
  'onPointerDown',
  'onPointerDownCapture',
  'onPointerUp',
  'onPointerUpCapture',
  'onMouseDown',
  'onMouseDownCapture',
  'onMouseUp',
  'onMouseUpCapture',
  'onCompositionEnd',
  'onCompositionStart',
  'onCompositionUpdate'
])

function formatDate(
  date: Date | null | undefined,
  dateFormat: DateFormat = 'MM/DD/YYYY'
) {
  if (!date || !isValid(date)) {
    return ''
  }
  return dateFnsFormat(date, DATE_FORMAT_TOKENS[dateFormat])
}

function formatRange(
  range: DateRange | undefined,
  dateFormat: DateFormat = 'MM/DD/YYYY'
) {
  if (!range) return ''
  const from = formatDate(range.from, dateFormat)
  const to = formatDate(range.to, dateFormat)
  if (from && to) return from === to ? from : `${from} \u2013 ${to}`
  if (from) return from
  return ''
}

function parseRange(
  value: string,
  dateFormat: DateFormat = 'MM/DD/YYYY'
): DateRange | null {
  if (!value) return null
  const parts = value.split(/\s*[\u2013\-]\s*/)

  const fromStr = parts[0]?.trim()
  if (!fromStr) return null

  const fromParsed = dateFnsParse(
    fromStr,
    DATE_FORMAT_TOKENS[dateFormat],
    new Date()
  )
  if (!isValid(fromParsed)) return null

  const toStr = parts[1]?.trim()
  if (!toStr) return { from: fromParsed, to: undefined }

  const toParsed = dateFnsParse(
    toStr,
    DATE_FORMAT_TOKENS[dateFormat],
    new Date()
  )
  if (!isValid(toParsed)) return { from: fromParsed, to: undefined }

  return { from: fromParsed, to: toParsed }
}

function rangePlaceholder(dateFormat: DateFormat) {
  const p = DATE_FORMAT_PLACEHOLDER[dateFormat]
  return `${p} \u2013 ${p}`
}

export interface DateRangeInputProps
  extends NativeInputProps, FlattenedCalendarProps {
  dateRange: DateRange | undefined
  setDateRange: (range: DateRange | undefined) => void
  maxDate?: Date | null
  minDate?: Date | null
  disableFuture?: boolean
  inputDisabled?: boolean
  size?: VariantProps<typeof inputVariants>['size']
  inputClassName?: string
  calendarClassName?: string
  dateFormat?: DateFormat
  selected?: DateRange
  onSelect?: (range: DateRange | undefined) => void
  month?: React.ComponentProps<typeof Calendar>['month']
  onMonthChange?: React.ComponentProps<typeof Calendar>['onMonthChange']
  disabled?: React.ComponentProps<typeof Calendar>['disabled']
  captionLayout?: React.ComponentProps<typeof Calendar>['captionLayout']
  showOutsideDays?: React.ComponentProps<typeof Calendar>['showOutsideDays']
  classNames?: React.ComponentProps<typeof Calendar>['classNames']
}

export function DateRangeInput({
  dateRange,
  setDateRange,
  maxDate,
  minDate,
  disableFuture = true,
  className,
  inputClassName,
  calendarClassName,
  inputDisabled,
  dateFormat = 'MM/DD/YYYY',
  selected,
  onSelect,
  month,
  onMonthChange,
  disabled: calendarDisabled,
  captionLayout = 'dropdown',
  showOutsideDays = false,
  classNames,
  placeholder,
  onBlur,
  ...restProps
}: DateRangeInputProps) {
  const resolvedPlaceholder = placeholder ?? rangePlaceholder(dateFormat)
  const [open, setOpen] = React.useState(false)
  const [monthState, setMonthState] = React.useState<Date | null>(
    dateRange?.from ?? null
  )
  const [value, setValue] = React.useState(formatRange(dateRange, dateFormat))

  const [inputProps, calendarProps] = React.useMemo(() => {
    const nextInputProps: Record<string, unknown> = {}
    const nextCalendarProps: Record<string, unknown> = {}

    for (const [key, val] of Object.entries(restProps)) {
      const isInputProp =
        INPUT_PROP_KEYS.has(key) ||
        key.startsWith('aria-') ||
        key.startsWith('data-')

      if (isInputProp) {
        nextInputProps[key] = val
      } else {
        nextCalendarProps[key] = val
      }
    }

    return [
      nextInputProps as Partial<React.ComponentProps<typeof Input>>,
      nextCalendarProps as Omit<
        React.ComponentProps<typeof Calendar>,
        | 'mode'
        | 'selected'
        | 'onSelect'
        | 'month'
        | 'onMonthChange'
        | 'disabled'
        | 'captionLayout'
        | 'showOutsideDays'
        | 'classNames'
      >
    ]
  }, [restProps])

  const today = React.useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const effectiveMaxDate = React.useMemo(() => {
    if (disableFuture) {
      if (maxDate) {
        const max = new Date(maxDate)
        max.setHours(0, 0, 0, 0)
        return max < today ? max : today
      }
      return today
    }
    if (maxDate) {
      const max = new Date(maxDate)
      max.setHours(0, 0, 0, 0)
      return max
    }
    return undefined
  }, [maxDate, disableFuture, today])

  const effectiveMinDate = React.useMemo(() => {
    if (minDate) {
      const min = new Date(minDate)
      min.setHours(0, 0, 0, 0)
      return min
    }
    return null
  }, [minDate])

  React.useEffect(() => {
    setValue(formatRange(dateRange, dateFormat))
    if (dateRange?.from) {
      setMonthState(dateRange.from)
    }
  }, [dateRange, dateFormat])

  const effectiveMonth = month ?? monthState ?? undefined
  const effectiveSelected = selected ?? dateRange
  const isInputDisabled =
    inputDisabled ??
    (typeof calendarDisabled === 'boolean' ? calendarDisabled : false)

  const isWithinBounds = (d: Date) => {
    const isAfterMin = !effectiveMinDate || d >= effectiveMinDate
    const isBeforeMax = !effectiveMaxDate || d <= effectiveMaxDate
    return isAfterMin && isBeforeMax
  }

  const defaultCalendarDisabled = (date: Date) => {
    const checkDate = new Date(date)
    checkDate.setHours(0, 0, 0, 0)
    return !isWithinBounds(checkDate)
  }

  const handleCalendarSelect = (range: DateRange | undefined) => {
    if (onSelect) {
      onSelect(range)
      return
    }
    setDateRange(range)
  }

  const handleClear = () => {
    setDateRange(undefined)
  }

  const handleAdd = () => {
    setOpen(false)
  }

  const resolvedCalendarProps = {
    ...calendarProps,
    mode: 'range' as const,
    selected: effectiveSelected,
    captionLayout,
    month: effectiveMonth,
    onMonthChange: onMonthChange ?? setMonthState,
    showOutsideDays,
    className: cn(
      'md:w-auto w-[calc(100vw-50px)] mx-auto h-[350px] overflow-y-auto md:h-auto m-2',
      calendarClassName
    ),
    classNames,
    onSelect: handleCalendarSelect,
    disabled: calendarDisabled ?? defaultCalendarDisabled
  } as React.ComponentProps<typeof Calendar>

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setValue(inputValue)

    if (inputValue === '') {
      setDateRange(undefined)
      return
    }

    const parsed = parseRange(inputValue, dateFormat)
    if (!parsed || !parsed.from) return

    const from = new Date(parsed.from)
    from.setHours(0, 0, 0, 0)
    if (!isWithinBounds(from)) return

    if (parsed.to) {
      const to = new Date(parsed.to)
      to.setHours(0, 0, 0, 0)
      if (isWithinBounds(to) && from <= to) {
        setDateRange(parsed)
        setMonthState(from)
      }
    } else {
      setDateRange({ from: parsed.from, to: undefined })
      setMonthState(from)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(e)

    if (value === '') {
      if (dateRange !== undefined) {
        setDateRange(undefined)
      }
      return
    }

    const parsed = parseRange(value, dateFormat)
    if (!parsed || !parsed.from) {
      setValue(formatRange(dateRange, dateFormat))
      return
    }

    const from = new Date(parsed.from)
    from.setHours(0, 0, 0, 0)
    if (!isWithinBounds(from)) {
      setValue(formatRange(dateRange, dateFormat))
      return
    }

    if (parsed.to) {
      const to = new Date(parsed.to)
      to.setHours(0, 0, 0, 0)
      if (!isWithinBounds(to) || from > to) {
        setValue(formatRange(dateRange, dateFormat))
      }
    }
  }

  return (
    <div className={cn('relative flex gap-2', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={isInputDisabled}>
          <div className="w-full relative">
            <Input
              value={value}
              placeholder={resolvedPlaceholder}
              className={cn('bg-background cursor-pointer', inputClassName)}
              onChange={handleInputChange}
              onBlur={handleBlur}
              disabled={isInputDisabled}
              onKeyDown={e => {
                if (e.key === 'ArrowDown' && !isInputDisabled) {
                  e.preventDefault()
                  setOpen(true)
                }
              }}
              rightIcon={
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              }
              rightIconOnClick={
                isInputDisabled ? undefined : () => setOpen(!open)
              }
              rightIconButtonProps={{ disabled: isInputDisabled }}
              {...(inputProps as Partial<React.ComponentProps<typeof Input>>)}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 flex flex-col overflow-y-auto max-h-[min(90dvh,520px)]"
          align="end"
          alignOffset={-8}
          sideOffset={10}
          side="top"
        >
          <Calendar {...resolvedCalendarProps} />
          <div className="flex  flex-col gap-2 px-2 py-2">
            <Button
              variant="ghost-secondary"
              size="sm"
              onClick={handleClear}
              type="button"
            >
              Clear
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleAdd}
              type="button"
            >
              Add
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
