import { cn } from '@/lib/utils'
import { type VariantProps } from 'class-variance-authority'
import { CalendarDays } from 'lucide-react'
import * as React from 'react'
import { Calendar } from './calendar'
import { Input, inputVariants } from './input'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

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

export interface DateInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'min' | 'max' | 'size'
> {
  date: Date | null
  setDate: (date: Date | null) => void
  maxDate?: Date | null
  minDate?: Date | null
  disableFuture?: boolean
  size?: VariantProps<typeof inputVariants>['size']
  inputClassName?: string
  calendarClassName?: string
  calendarProps?: React.ComponentProps<typeof Calendar>
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
  calendarProps,
  placeholder = 'mm/dd/yyyy',
  disabled,
  onBlur,
  ...props
}: DateInputProps) {
  const [open, setOpen] = React.useState(false)
  const [month, setMonth] = React.useState<Date | null>(date ?? null)
  const [value, setValue] = React.useState(formatDate(date ?? null))

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
      setMonth(date)
    }
  }, [date])

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
        setMonth(parsedDate)
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
        <PopoverTrigger asChild disabled={disabled}>
          <div className="w-full relative">
            <Input
              id="date"
              value={value}
              placeholder={placeholder}
              className={cn('bg-background cursor-pointer', inputClassName)}
              onChange={handleInputChange}
              onBlur={handleBlur}
              disabled={disabled}
              onKeyDown={e => {
                if (e.key === 'ArrowDown' && !disabled) {
                  e.preventDefault()
                  setOpen(true)
                }
              }}
              rightIcon={
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              }
              rightIconOnClick={disabled ? undefined : () => setOpen(!open)}
              rightIconButtonProps={{ disabled }}
              {...props}
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
          <Calendar
            {...calendarProps}
            mode="single"
            selected={date ?? undefined}
            captionLayout="dropdown"
            month={month ?? undefined}
            onMonthChange={setMonth}
            showOutsideDays={false}
            className={cn(
              'md:w-auto w-[calc(100vw-50px)] mx-auto h-[350px] overflow-y-auto md:h-auto m-2',
              calendarClassName
            )}
            classNames={calendarProps?.classNames}
            onSelect={selectedDate => {
              if (selectedDate) {
                const dateObj = new Date(selectedDate)
                dateObj.setHours(0, 0, 0, 0)

                const isAfterMin =
                  !effectiveMinDate || dateObj >= effectiveMinDate
                const isBeforeMax =
                  !effectiveMaxDate || dateObj <= effectiveMaxDate

                if (isAfterMin && isBeforeMax) {
                  setDate(selectedDate)
                  setValue(formatDate(selectedDate))
                  setOpen(false)
                }
              }
            }}
            disabled={date => {
              const checkDate = new Date(date)
              checkDate.setHours(0, 0, 0, 0)

              const isBeforeMin =
                effectiveMinDate !== null && checkDate < effectiveMinDate
              const isAfterMax =
                effectiveMaxDate !== undefined && checkDate > effectiveMaxDate

              return isBeforeMin || isAfterMax
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
