import { cn } from '@/lib/utils'
import { type VariantProps } from 'class-variance-authority'
import { format as dateFnsFormat, isValid } from 'date-fns'
import { CalendarDays } from 'lucide-react'
import * as React from 'react'
import type { DateRange } from 'react-day-picker'
import { Button } from './button'
import { Calendar } from './calendar'
import type { DateFormat } from './date-input'
import { inputVariants } from './input'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

export type { DateRange }

const DATE_FORMAT_TOKENS: Record<DateFormat, string> = {
  'MM/DD/YYYY': 'MM/dd/yyyy',
  'DD/MM/YYYY': 'dd/MM/yyyy',
  'YYYY-MM-DD': 'yyyy-MM-dd',
  'DD-MM-YYYY': 'dd-MM-yyyy',
  'MM-DD-YYYY': 'MM-dd-yyyy',
  'DD.MM.YYYY': 'dd.MM.yyyy',
  'YYYY/MM/DD': 'yyyy/MM/dd',
  'MMMM D, YYYY': 'MMMM d, yyyy',
  'D MMMM YYYY': 'd MMMM yyyy',
  'MMM D, YYYY': 'MMM d, yyyy',
  'MMM DD, YYYY': 'MMM dd, yyyy',
  'D MMM YYYY': 'd MMM yyyy',
  'DD MMM YYYY': 'dd MMM yyyy',
  'ddd, MMM D, YYYY': 'EEE, MMM d, yyyy',
  'dddd, MMMM D, YYYY': 'EEEE, MMMM d, yyyy'
}

const DATE_FORMAT_PLACEHOLDER: Record<DateFormat, string> = {
  'MM/DD/YYYY': 'mm/dd/yyyy',
  'DD/MM/YYYY': 'dd/mm/yyyy',
  'YYYY-MM-DD': 'yyyy-mm-dd',
  'DD-MM-YYYY': 'dd-mm-yyyy',
  'MM-DD-YYYY': 'mm-dd-yyyy',
  'DD.MM.YYYY': 'dd.mm.yyyy',
  'YYYY/MM/DD': 'yyyy/mm/dd',
  'MMMM D, YYYY': 'Month d, yyyy',
  'D MMMM YYYY': 'd Month yyyy',
  'MMM D, YYYY': 'Mon d, yyyy',
  'MMM DD, YYYY': 'Mon dd, yyyy',
  'D MMM YYYY': 'd Mon yyyy',
  'DD MMM YYYY': 'dd Mon yyyy',
  'ddd, MMM D, YYYY': 'Day, Mon d, yyyy',
  'dddd, MMMM D, YYYY': 'Weekday, Month d, yyyy'
}

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
  | 'components'
  | 'formatters'
  | 'buttonVariant'
>

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

function rangePlaceholder(dateFormat: DateFormat) {
  const p = DATE_FORMAT_PLACEHOLDER[dateFormat]
  return `${p} \u2013 ${p}`
}

export interface DateRangeInputProps extends FlattenedCalendarProps {
  dateRange: DateRange | undefined
  setDateRange: (range: DateRange | undefined) => void
  maxDate?: Date | null
  minDate?: Date | null
  disableFuture?: boolean
  inputDisabled?: boolean
  size?: VariantProps<typeof inputVariants>['size']
  className?: string
  inputClassName?: string
  calendarClassName?: string
  popoverContentClassName?: string
  popoverContentProps?: Omit<
    React.ComponentProps<typeof PopoverContent>,
    'children' | 'className'
  >
  dateFormat?: DateFormat
  placeholder?: string
  selected?: DateRange
  onSelect?: (range: DateRange | undefined) => void
  month?: React.ComponentProps<typeof Calendar>['month']
  onMonthChange?: React.ComponentProps<typeof Calendar>['onMonthChange']
  disabled?: React.ComponentProps<typeof Calendar>['disabled']
  captionLayout?: React.ComponentProps<typeof Calendar>['captionLayout']
  showOutsideDays?: React.ComponentProps<typeof Calendar>['showOutsideDays']
  classNames?: React.ComponentProps<typeof Calendar>['classNames']
  components?: React.ComponentProps<typeof Calendar>['components']
  formatters?: React.ComponentProps<typeof Calendar>['formatters']
  buttonVariant?: React.ComponentProps<typeof Calendar>['buttonVariant']
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
  popoverContentClassName,
  popoverContentProps,
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
  components,
  formatters,
  buttonVariant,
  placeholder,
  size,
  ...restProps
}: DateRangeInputProps) {
  const resolvedPlaceholder = placeholder ?? rangePlaceholder(dateFormat)
  const [open, setOpen] = React.useState(false)
  const [monthState, setMonthState] = React.useState<Date | null>(
    dateRange?.from ?? null
  )

  const displayValue = formatRange(dateRange, dateFormat)

  React.useEffect(() => {
    if (dateRange?.from) {
      setMonthState(dateRange.from)
    }
  }, [dateRange])

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
    ...restProps,
    mode: 'range' as const,
    selected: effectiveSelected,
    captionLayout,
    month: effectiveMonth,
    onMonthChange: onMonthChange ?? setMonthState,
    showOutsideDays,
    className: cn('w-auto  shrink-0 h-auto mt-2', calendarClassName),
    classNames,
    components,
    formatters,
    buttonVariant,
    onSelect: handleCalendarSelect,
    disabled: calendarDisabled ?? defaultCalendarDisabled
  } as React.ComponentProps<typeof Calendar>

  return (
    <div className={cn('relative flex gap-2', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={isInputDisabled}>
          <Button
            type="button"
            variant="outline"
            className={cn(
              inputVariants({ size }),
              'bg-background cursor-pointer w-full text-left flex items-center justify-between gap-2 font-normal',
              'data-[state=open]:border-blue-500 data-[state=open]:hover:border-blue-500',
              isInputDisabled &&
                'pointer-events-none cursor-not-allowed opacity-50',
              inputClassName
            )}
            disabled={isInputDisabled}
          >
            {displayValue || resolvedPlaceholder}
            <CalendarDays className="h-4 w-4 text-muted-foreground shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            'p-0  w-[var(--radix-popper-anchor-width)] h-auto md:w-[350px]',
            popoverContentClassName
          )}
          {...popoverContentProps}
        >
          <div className="border border-blue-500 h-full w-full rounded-md flex flex-col overflow-y-auto justify-between">
            <Calendar {...resolvedCalendarProps} />
            <div className="flex flex-col gap-2 px-2 pb-1 shrink-0">
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
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
