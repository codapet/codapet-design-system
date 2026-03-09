import { cn } from '@/lib/utils'
import { type VariantProps } from 'class-variance-authority'
import { Clock } from 'lucide-react'
import * as React from 'react'
import { Button } from './button'
import { Input, inputVariants } from './input'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

export type TimeFormat = '12h' | '24h' | 'h:mm a' | 'h:mm A'

export interface TimeValue {
  hours: number
  minutes: number
}

const TIME_FORMAT_PLACEHOLDER: Record<TimeFormat, string> = {
  '12h': 'hh:mm AM/PM',
  '24h': 'HH:mm',
  'h:mm a': 'h:mm am/pm',
  'h:mm A': 'h:mm AM/PM'
}

function is24HourFormat(tf: TimeFormat): boolean {
  return tf === '24h'
}

function formatTime(
  time: TimeValue | null,
  timeFormat: TimeFormat = '12h'
): string {
  if (!time) return ''
  const { hours, minutes } = time
  const h24 = String(hours).padStart(2, '0')
  const m = String(minutes).padStart(2, '0')
  const h12 = hours % 12 || 12
  const h12p = String(h12).padStart(2, '0')
  const period = hours >= 12 ? 'PM' : 'AM'

  switch (timeFormat) {
    case '24h':
      return `${h24}:${m}`
    case 'h:mm a':
      return `${h12}:${m} ${period.toLowerCase()}`
    case 'h:mm A':
      return `${h12}:${m} ${period}`
    case '12h':
    default:
      return `${h12p}:${m} ${period}`
  }
}

function parseTime(
  value: string,
  timeFormat: TimeFormat = '12h'
): TimeValue | null {
  if (!value.trim()) return null
  const v = value.trim()

  if (is24HourFormat(timeFormat)) {
    const match = v.match(/^(\d{1,2}):(\d{2})$/)
    if (!match) return null
    const hours = parseInt(match[1], 10)
    const minutes = parseInt(match[2], 10)
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null
    return { hours, minutes }
  }

  const match = v.match(/^(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)$/i)
  if (!match) return null
  let hours = parseInt(match[1], 10)
  const minutes = parseInt(match[2], 10)
  const period = match[3].toUpperCase()

  if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) return null

  if (period === 'AM' && hours === 12) hours = 0
  else if (period === 'PM' && hours !== 12) hours += 12

  return { hours, minutes }
}

function getDisplayHour(hours: number, timeFormat: TimeFormat): number {
  if (is24HourFormat(timeFormat)) return hours
  return hours % 12 || 12
}

function getPeriod(hours: number): 'AM' | 'PM' {
  return hours >= 12 ? 'PM' : 'AM'
}

type BaseInputProps = Omit<
  React.ComponentProps<typeof Input>,
  | 'value'
  | 'onChange'
  | 'min'
  | 'max'
  | 'size'
  | 'disabled'
  | 'onSelect'
  | 'rightIcon'
  | 'ref'
>

export interface TimeInputProps extends BaseInputProps {
  time: TimeValue | null
  setTime: (time: TimeValue | null) => void
  timeFormat?: TimeFormat
  minuteStep?: number
  inputDisabled?: boolean
  size?: VariantProps<typeof inputVariants>['size']
  inputClassName?: string
  icon?: React.ReactNode
  formatDisplay?: (time: TimeValue) => string
}

export function TimeInput({
  time,
  setTime,
  timeFormat = '12h',
  minuteStep = 1,
  inputDisabled,
  className,
  inputClassName,
  size,
  placeholder,
  onBlur,
  icon,
  formatDisplay,
  ...restProps
}: TimeInputProps) {
  const resolvedPlaceholder = placeholder ?? TIME_FORMAT_PLACEHOLDER[timeFormat]

  const displayFormat = React.useCallback(
    (t: TimeValue | null): string => {
      if (!t) return ''
      if (formatDisplay) return formatDisplay(t)
      return formatTime(t, timeFormat)
    },
    [formatDisplay, timeFormat]
  )

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(displayFormat(time))

  const hoursRef = React.useRef<HTMLDivElement>(null)
  const minutesRef = React.useRef<HTMLDivElement>(null)
  const periodRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setValue(displayFormat(time))
  }, [time, displayFormat])

  const scrollToSelected = React.useCallback(() => {
    requestAnimationFrame(() => {
      for (const ref of [hoursRef, minutesRef, periodRef]) {
        const container = ref.current
        if (!container) continue
        const selected = container.querySelector('[data-selected="true"]')
        if (selected) {
          selected.scrollIntoView({ block: 'center', behavior: 'instant' })
        }
      }
    })
  }, [])

  React.useEffect(() => {
    if (open) {
      scrollToSelected()
    }
  }, [open, scrollToSelected])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setValue(inputValue)

    if (inputValue === '') {
      setTime(null)
      return
    }

    const parsed = parseTime(inputValue, timeFormat)
    if (parsed) {
      setTime(parsed)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(e)

    if (value === '') {
      if (time !== null) setTime(null)
      return
    }

    const parsed = parseTime(value, timeFormat)
    if (!parsed) {
      setValue(displayFormat(time))
    }
  }

  const handleHourSelect = (hour: number) => {
    let h24: number
    if (is24HourFormat(timeFormat)) {
      h24 = hour
    } else {
      const currentPeriod = time ? getPeriod(time.hours) : 'AM'
      if (currentPeriod === 'AM') {
        h24 = hour === 12 ? 0 : hour
      } else {
        h24 = hour === 12 ? 12 : hour + 12
      }
    }
    setTime({ hours: h24, minutes: time?.minutes ?? 0 })
  }

  const handleMinuteSelect = (minute: number) => {
    setTime({ hours: time?.hours ?? 0, minutes: minute })
  }

  const handlePeriodSelect = (period: 'AM' | 'PM') => {
    const currentHours = time?.hours ?? 0
    const currentH12 = currentHours % 12
    const newHours = period === 'AM' ? currentH12 : currentH12 + 12
    setTime({ hours: newHours, minutes: time?.minutes ?? 0 })
  }

  const hoursList = is24HourFormat(timeFormat)
    ? Array.from({ length: 24 }, (_, i) => i)
    : Array.from({ length: 12 }, (_, i) => i + 1)

  const minutesList = Array.from(
    { length: Math.ceil(60 / minuteStep) },
    (_, i) => i * minuteStep
  )

  const selectedH12 = time ? getDisplayHour(time.hours, timeFormat) : null
  const selectedMinute = time?.minutes ?? null
  const selectedPeriod = time ? getPeriod(time.hours) : null

  return (
    <div className={cn('relative flex gap-2', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={inputDisabled}>
          <div className="w-full relative">
            <Input
              value={value}
              placeholder={resolvedPlaceholder}
              className={cn('bg-background cursor-pointer', inputClassName)}
              onChange={handleInputChange}
              onBlur={handleBlur}
              disabled={inputDisabled}
              size={size}
              onClick={() => {
                if (!inputDisabled) setOpen(true)
              }}
              onKeyDown={e => {
                if (e.key === 'ArrowDown' && !inputDisabled) {
                  e.preventDefault()
                  setOpen(true)
                }
              }}
              rightIcon={
                icon !== undefined ? (
                  icon
                ) : (
                  <Clock className="h-4 w-4 text-muted-foreground" />
                )
              }
              {...restProps}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 "
          onOpenAutoFocus={e => e.preventDefault()}
        >
          <div className="flex divide-x">
            {/* Hours */}
            <div className="h-56 w-16 overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch]">
              <div ref={hoursRef} className="flex flex-col p-1 ">
                {hoursList.map(h => (
                  <Button
                    key={h}
                    variant="ghost"
                    size="sm"
                    data-selected={selectedH12 === h}
                    className={cn(
                      'w-full justify-center font-mono text-sm',
                      selectedH12 === h &&
                        'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                    )}
                    onClick={() => handleHourSelect(h)}
                  >
                    {String(h).padStart(2, '0')}
                  </Button>
                ))}
              </div>
            </div>

            {/* Minutes */}
            <div className="h-56 w-16 overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch]">
              <div ref={minutesRef} className="flex flex-col p-1 ">
                {minutesList.map(m => (
                  <Button
                    key={m}
                    variant="ghost"
                    size="sm"
                    data-selected={selectedMinute === m}
                    className={cn(
                      'w-full justify-center font-mono text-sm',
                      selectedMinute === m &&
                        'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                    )}
                    onClick={() => handleMinuteSelect(m)}
                  >
                    {String(m).padStart(2, '0')}
                  </Button>
                ))}
              </div>
            </div>

            {/* AM/PM */}
            {!is24HourFormat(timeFormat) && (
              <div className="flex flex-col p-1 justify-center gap-1">
                {(['AM', 'PM'] as const).map(p => (
                  <Button
                    key={p}
                    variant="ghost"
                    size="sm"
                    data-selected={selectedPeriod === p}
                    className={cn(
                      'w-14 justify-center text-sm',
                      selectedPeriod === p &&
                        'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                    )}
                    onClick={() => handlePeriodSelect(p)}
                  >
                    {p}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
