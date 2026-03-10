import { cn } from '@/lib/utils'
import { type VariantProps } from 'class-variance-authority'
import { Clock } from 'lucide-react'
import * as React from 'react'
import { Button } from './button'
import { inputVariants } from './input'
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

function getDisplayHour(hours: number, timeFormat: TimeFormat): number {
  if (is24HourFormat(timeFormat)) return hours
  return hours % 12 || 12
}

function getPeriod(hours: number): 'AM' | 'PM' {
  return hours >= 12 ? 'PM' : 'AM'
}

export interface TimeInputProps {
  time: TimeValue | null
  setTime: (time: TimeValue | null) => void
  timeFormat?: TimeFormat
  minuteStep?: number
  inputDisabled?: boolean
  size?: VariantProps<typeof inputVariants>['size']
  className?: string
  inputClassName?: string
  placeholder?: string
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
  icon,
  formatDisplay
}: TimeInputProps) {
  const resolvedPlaceholder = placeholder ?? TIME_FORMAT_PLACEHOLDER[timeFormat]

  const displayValue = React.useMemo(() => {
    if (!time) return ''
    if (formatDisplay) return formatDisplay(time)
    return formatTime(time, timeFormat)
  }, [time, formatDisplay, timeFormat])

  const [open, setOpen] = React.useState(false)

  const hoursRef = React.useRef<HTMLDivElement>(null)
  const minutesRef = React.useRef<HTMLDivElement>(null)
  const periodRef = React.useRef<HTMLDivElement>(null)

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
          <Button
            type="button"
            variant="outline"
            className={cn(
              inputVariants({ size }),
              'bg-background cursor-pointer w-full text-left flex items-center justify-between gap-2 font-normal',
              'data-[state=open]:border-blue-500 data-[state=open]:hover:border-blue-500',
              inputDisabled &&
                'pointer-events-none cursor-not-allowed opacity-50',
              inputClassName
            )}
            disabled={inputDisabled}
          >
            {displayValue || resolvedPlaceholder}
            {icon !== undefined ? (
              icon
            ) : (
              <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
            )}
          </Button>
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
              <div ref={minutesRef} className={cn('flex flex-col p-1', minutesList.length <= 12 && 'h-full justify-center')}>
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
