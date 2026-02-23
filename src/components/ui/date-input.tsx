import { cn } from '@/lib/utils'
import { type VariantProps } from 'class-variance-authority'
import { CalendarDays } from 'lucide-react'
import * as React from 'react'
import { Calendar } from './calendar'
import { Input, inputVariants } from './input'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

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

function formatDate(date: Date | null) {
  if (!date) {
    return ''
  }
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

function isValidDate(date: Date | null) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

export interface DateInputProps extends NativeInputProps, FlattenedCalendarProps {
  date: Date | null
  setDate: (date: Date | null) => void
  maxDate?: Date | null
  minDate?: Date | null
  disableFuture?: boolean
  inputDisabled?: boolean
  size?: VariantProps<typeof inputVariants>['size']
  inputClassName?: string
  calendarClassName?: string
  mode?: React.ComponentProps<typeof Calendar>['mode']
  selected?: Date
  onSelect?: (selectedDate: Date | undefined) => void
  month?: React.ComponentProps<typeof Calendar>['month']
  onMonthChange?: React.ComponentProps<typeof Calendar>['onMonthChange']
  disabled?: React.ComponentProps<typeof Calendar>['disabled']
  captionLayout?: React.ComponentProps<typeof Calendar>['captionLayout']
  showOutsideDays?: React.ComponentProps<typeof Calendar>['showOutsideDays']
  classNames?: React.ComponentProps<typeof Calendar>['classNames']
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
  mode,
  selected,
  onSelect,
  month,
  onMonthChange,
  disabled: calendarDisabled,
  captionLayout = 'dropdown',
  showOutsideDays = false,
  classNames,
  placeholder = 'mm/dd/yyyy',
  onBlur,
  ...restProps
}: DateInputProps) {
  const [open, setOpen] = React.useState(false)
  const [monthState, setMonthState] = React.useState<Date | null>(date ?? null)
  const [value, setValue] = React.useState(formatDate(date ?? null))
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
      setValue(formatDate(date))
      setMonthState(date)
    }
  }, [date])

  const effectiveMonth = month ?? monthState ?? undefined
  const effectiveSelected = selected ?? date ?? undefined
  const isInputDisabled =
    inputDisabled ?? (typeof calendarDisabled === 'boolean' ? calendarDisabled : false)
  const defaultCalendarOnSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const dateObj = new Date(selectedDate)
      dateObj.setHours(0, 0, 0, 0)

      const isAfterMin = !effectiveMinDate || dateObj >= effectiveMinDate
      const isBeforeMax = !effectiveMaxDate || dateObj <= effectiveMaxDate

      if (isAfterMin && isBeforeMax) {
        setDate(selectedDate)
        setValue(formatDate(selectedDate))
        setOpen(false)
      }
    }
  }
  const defaultCalendarDisabled = (date: Date) => {
    const checkDate = new Date(date)
    checkDate.setHours(0, 0, 0, 0)

    const isBeforeMin = effectiveMinDate !== null && checkDate < effectiveMinDate
    const isAfterMax = effectiveMaxDate !== undefined && checkDate > effectiveMaxDate

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
      'md:w-auto w-[calc(100vw-50px)] mx-auto h-[350px] overflow-y-auto md:h-auto m-2',
      calendarClassName
    ),
    classNames,
    onSelect: onSelect ?? defaultCalendarOnSelect,
    disabled: calendarDisabled ?? defaultCalendarDisabled
  } as React.ComponentProps<typeof Calendar>

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setValue(inputValue)

    const parsedDate = new Date(inputValue)

    if (isValidDate(parsedDate)) {
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

    const parsedDate = new Date(value)
    if (!isValidDate(parsedDate)) {
      // Reset to last valid date
      setValue(formatDate(date))
    } else {
      // Check if within range
      const selectedDate = new Date(parsedDate)
      selectedDate.setHours(0, 0, 0, 0)

      const isAfterMin = !effectiveMinDate || selectedDate >= effectiveMinDate
      const isBeforeMax = !effectiveMaxDate || selectedDate <= effectiveMaxDate

      if (!isAfterMin || !isBeforeMax) {
        // Reset to last valid date if out of range
        setValue(formatDate(date))
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
              placeholder={placeholder}
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
              rightIconOnClick={isInputDisabled ? undefined : () => setOpen(!open)}
              rightIconButtonProps={{ disabled: isInputDisabled }}
              {...(inputProps as Partial<React.ComponentProps<typeof Input>>)}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
          side="top"
        >
          <Calendar {...resolvedCalendarProps} />
        </PopoverContent>
      </Popover>
    </div>
  )
}
