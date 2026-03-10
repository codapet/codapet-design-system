import { cn } from '@/lib/utils'
import { type VariantProps } from 'class-variance-authority'
import {
  format as dateFnsFormat,
  parse as dateFnsParse,
  isValid
} from 'date-fns'
import { CalendarDays } from 'lucide-react'
import * as React from 'react'
import { Calendar } from './calendar'
import { Input, inputVariants } from './input'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

export type DateFormat =
  | 'MM/DD/YYYY'
  | 'DD/MM/YYYY'
  | 'YYYY-MM-DD'
  | 'DD-MM-YYYY'
  | 'MM-DD-YYYY'
  | 'DD.MM.YYYY'
  | 'MMMM D, YYYY'
  | 'D MMMM YYYY'

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
  | 'components'
  | 'formatters'
  | 'buttonVariant'
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

function formatDate(date: Date | null, dateFormat: DateFormat = 'MM/DD/YYYY') {
  if (!date || !isValid(date)) {
    return ''
  }
  return dateFnsFormat(date, DATE_FORMAT_TOKENS[dateFormat])
}

function parseDate(
  value: string,
  dateFormat: DateFormat = 'MM/DD/YYYY'
): Date | null {
  if (!value) return null
  const parsed = dateFnsParse(value, DATE_FORMAT_TOKENS[dateFormat], new Date())
  return isValid(parsed) ? parsed : null
}

export interface DateInputProps
  extends NativeInputProps, FlattenedCalendarProps {
  date: Date | null
  setDate: (date: Date | null) => void
  maxDate?: Date | null
  minDate?: Date | null
  disableFuture?: boolean
  inputDisabled?: boolean
  size?: VariantProps<typeof inputVariants>['size']
  inputClassName?: string
  calendarClassName?: string
  dateFormat?: DateFormat
  mode?: React.ComponentProps<typeof Calendar>['mode']
  selected?: Date
  onSelect?: (selectedDate: Date | undefined) => void
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

export function DateInput({
  date,
  setDate,
  maxDate,
  minDate,
  disableFuture = true,
  className,
  inputClassName,
  calendarClassName,
  inputDisabled,
  dateFormat = 'MM/DD/YYYY',
  mode,
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
  onBlur,
  ...restProps
}: DateInputProps) {
  const resolvedPlaceholder = placeholder ?? DATE_FORMAT_PLACEHOLDER[dateFormat]
  const [open, setOpen] = React.useState(false)
  const [monthState, setMonthState] = React.useState<Date | null>(date ?? null)
  const [value, setValue] = React.useState(formatDate(date ?? null, dateFormat))
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

  // Calculate effective maxDate
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

  // Calculate effective minDate
  const effectiveMinDate = React.useMemo(() => {
    if (minDate) {
      const min = new Date(minDate)
      min.setHours(0, 0, 0, 0)
      return min
    }
    return null
  }, [minDate])

  React.useEffect(() => {
    if (date) {
      setValue(formatDate(date, dateFormat))
      setMonthState(date)
    }
  }, [date, dateFormat])

  const effectiveMonth = month ?? monthState ?? undefined
  const effectiveSelected = selected ?? date ?? undefined
  const isInputDisabled =
    inputDisabled ??
    (typeof calendarDisabled === 'boolean' ? calendarDisabled : false)
  const defaultCalendarOnSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const dateObj = new Date(selectedDate)
      dateObj.setHours(0, 0, 0, 0)

      const isAfterMin = !effectiveMinDate || dateObj >= effectiveMinDate
      const isBeforeMax = !effectiveMaxDate || dateObj <= effectiveMaxDate

      if (isAfterMin && isBeforeMax) {
        setDate(selectedDate)
        setValue(formatDate(selectedDate, dateFormat))
        setOpen(false)
      }
    }
  }
  const defaultCalendarDisabled = (date: Date) => {
    const checkDate = new Date(date)
    checkDate.setHours(0, 0, 0, 0)

    const isBeforeMin =
      effectiveMinDate !== null && checkDate < effectiveMinDate
    const isAfterMax =
      effectiveMaxDate !== undefined && checkDate > effectiveMaxDate

    return isBeforeMin || isAfterMax
  }
  const resolvedCalendarProps = {
    ...calendarProps,
    mode: mode ?? 'single',
    selected: effectiveSelected,
    captionLayout,
    month: effectiveMonth,
    onMonthChange: onMonthChange ?? setMonthState,
    showOutsideDays,
    className: cn(
      'w-auto  mx-auto h-[350px] overflow-y-auto md:h-auto m-2',
      calendarClassName
    ),
    classNames,
    components,
    formatters,
    buttonVariant,
    onSelect: onSelect ?? defaultCalendarOnSelect,
    disabled: calendarDisabled ?? defaultCalendarDisabled
  } as React.ComponentProps<typeof Calendar>

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setValue(inputValue)

    const parsedDate = parseDate(inputValue, dateFormat)

    if (parsedDate) {
      const selectedDate = new Date(parsedDate)
      selectedDate.setHours(0, 0, 0, 0)

      const isAfterMin = !effectiveMinDate || selectedDate >= effectiveMinDate
      const isBeforeMax = !effectiveMaxDate || selectedDate <= effectiveMaxDate

      if (isAfterMin && isBeforeMax) {
        setDate(parsedDate)
        setMonthState(parsedDate)
      }
    } else if (inputValue === '') {
      setDate(null)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e)
    }

    if (value === '') {
      if (date !== null) {
        setDate(null)
      }
      return
    }

    const parsedDate = parseDate(value, dateFormat)
    if (!parsedDate) {
      setValue(formatDate(date, dateFormat))
    } else {
      const selectedDate = new Date(parsedDate)
      selectedDate.setHours(0, 0, 0, 0)

      const isAfterMin = !effectiveMinDate || selectedDate >= effectiveMinDate
      const isBeforeMax = !effectiveMaxDate || selectedDate <= effectiveMaxDate

      if (!isAfterMin || !isBeforeMax) {
        setValue(formatDate(date, dateFormat))
      }
    }
  }

  return (
    <div className={cn('relative flex gap-2', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={isInputDisabled}>
          <div className="w-full relative">
            <Input
              id="date"
              value={value}
              placeholder={resolvedPlaceholder}
              className={cn('bg-background cursor-pointer', open && 'border-blue-500', inputClassName)}
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
        <PopoverContent className="p-2 flex flex-col overflow-y-auto h-[400px] md:h-auto md:w-[350px]  ">
          <Calendar {...resolvedCalendarProps} />
        </PopoverContent>
      </Popover>
    </div>
  )
}
