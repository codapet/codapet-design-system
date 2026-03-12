'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import type { DateRange } from '@/index'
import { CalendarDayButton, DateRangeInput } from '@/index'
import { useState } from 'react'
import { CodeBlock } from '../buttons/CodeBlock'

export function DateRangeInputDemo() {
  const [range1, setRange1] = useState<DateRange | undefined>(undefined)
  const [range2, setRange2] = useState<DateRange | undefined>(undefined)
  const [range3, setRange3] = useState<DateRange | undefined>(undefined)
  const [range4, setRange4] = useState<DateRange | undefined>(undefined)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            Date Range Input
          </CardTitle>
          <CardDescription>
            Pick a date range from a single input with a calendar popup.
            Selected range is highlighted with a background color. Navigate
            between months using the calendar arrows.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="mb-2 block text-sm font-medium">
                Basic Date Range
              </Label>
              <DateRangeInput
                dateRange={range1}
                setDateRange={setRange1}
              />
            </div>

            <div className="space-y-2">
              <Label className="mb-2 block text-sm font-medium">
                With Min & Max Dates
              </Label>
              <DateRangeInput
                dateRange={range2}
                setDateRange={setRange2}
                minDate={new Date(2024, 0, 1)}
                maxDate={new Date(2026, 11, 31)}
              />
              <p className="text-xs text-muted-foreground">
                Min: Jan 1, 2024, Max: Dec 31, 2026
              </p>
            </div>

            <div className="space-y-2">
              <Label className="mb-2 block text-sm font-medium">
                ISO Date Format
              </Label>
              <DateRangeInput
                dateRange={range3}
                setDateRange={setRange3}
                dateFormat="YYYY-MM-DD"
              />
            </div>

            <div className="space-y-2">
              <Label className="mb-2 block text-sm font-medium">
                Custom Calendar Components
              </Label>
              <DateRangeInput
                dateRange={range4}
                setDateRange={setRange4}
                components={{
                  DayButton: props => (
                    <CalendarDayButton {...props} className="rounded-full" />
                  )
                }}
              />
              <p className="text-xs text-muted-foreground">
                Custom DayButton with rounded-full style
              </p>
            </div>
          </div>

          <CodeBlock
            code={`import { DateRangeInput, type DateRange } from '@codapet/design-system'
import { useState } from 'react'

export function Example() {
  const [range, setRange] = useState<DateRange | undefined>(undefined)

  return (
    <>
      {/* Basic Range */}
      <DateRangeInput
        dateRange={range}
        setDateRange={setRange}
      />

      {/* With Min & Max Dates */}
      <DateRangeInput
        dateRange={range}
        setDateRange={setRange}
        minDate={new Date(2024, 0, 1)}
        maxDate={new Date(2026, 11, 31)}
      />

      {/* ISO Date Format */}
      <DateRangeInput
        dateRange={range}
        setDateRange={setRange}
        dateFormat="YYYY-MM-DD"
      />
    </>
  )
}`}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            Props & Types
          </CardTitle>
          <CardDescription>
            DateRangeInput props interface and related types
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <CodeBlock
            code={`// Re-exported from react-day-picker
type DateRange = {
  from: Date | undefined
  to?: Date | undefined
}

type DateFormat =
  | 'MM/DD/YYYY'
  | 'DD/MM/YYYY'
  | 'YYYY-MM-DD'
  | 'DD-MM-YYYY'
  | 'MM-DD-YYYY'
  | 'DD.MM.YYYY'
  | 'YYYY/MM/DD'
  | 'MMMM D, YYYY'
  | 'D MMMM YYYY'
  | 'MMM D, YYYY'
  | 'MMM DD, YYYY'
  | 'D MMM YYYY'
  | 'DD MMM YYYY'
  | 'ddd, MMM D, YYYY'
  | 'dddd, MMMM D, YYYY'

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

interface DateRangeInputProps extends FlattenedCalendarProps {
  // Core controlled state
  dateRange: DateRange | undefined
  setDateRange: (range: DateRange | undefined) => void

  // Date constraints
  maxDate?: Date | null
  minDate?: Date | null
  disableFuture?: boolean                // default: false

  // Input configuration
  inputDisabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  dateFormat?: DateFormat                 // default: 'MM/DD/YYYY'
  placeholder?: string                   // default: "mm/dd/yyyy – mm/dd/yyyy"

  // Styling
  className?: string                     // wrapper className
  inputClassName?: string                // applied to the trigger button
  calendarClassName?: string             // applied to Calendar
  popoverContentClassName?: string       // applied to PopoverContent
  popoverContentProps?: Omit<            // extra props for PopoverContent
    React.ComponentProps<typeof PopoverContent>,
    'children' | 'className'
  >

  // Calendar configuration (flattened overrides)
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
}`}
          />
        </CardContent>
      </Card>
    </>
  )
}
