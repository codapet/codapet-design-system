'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { DateInput } from '@/index'
import { useState } from 'react'
import { CodeBlock } from '../buttons/CodeBlock'

export function DateInputDemo() {
  const [date1, setDate1] = useState<Date | null>(null)
  const [date2, setDate2] = useState<Date | null>(null)
  const [date3, setDate3] = useState<Date | null>(null)
  const [date4, setDate4] = useState<Date | null>(null)
  const [date5, setDate5] = useState<Date | null>(null)
  const [date6, setDate6] = useState<Date | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          Date Input
        </CardTitle>
        <CardDescription>
          Date picker with input field and validation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="mb-2 block text-sm font-medium">
              Basic Date Input
            </Label>
            <DateInput date={date1} setDate={setDate1} />
          </div>

          <div className="space-y-2">
            <Label className="mb-2 block text-sm font-medium">
              Disable Future Dates (Default)
            </Label>
            <DateInput date={date2} setDate={setDate2} disableFuture={true} />
            <p className="text-xs text-muted-foreground">
              Cannot select future dates
            </p>
          </div>

          <div className="space-y-2">
            <Label className="mb-2 block text-sm font-medium">
              Min & Max Date
            </Label>
            <DateInput
              date={date3}
              setDate={setDate3}
              minDate={new Date(2023, 0, 1)}
              maxDate={new Date(2025, 11, 31)}
              disableFuture={false}
            />
            <p className="text-xs text-muted-foreground">
              Min: Jan 1, 2023, Max: Dec 31, 2025
            </p>
          </div>

          <div className="space-y-2">
            <Label className="mb-2 block text-sm font-medium">
              Custom Placeholder
            </Label>
            <DateInput
              date={date4}
              setDate={setDate4}
              placeholder="Select a date..."
            />
          </div>

          <div className="space-y-2">
            <Label className="mb-2 block text-sm font-medium">
              Custom ClassName
            </Label>
            <DateInput
              date={date5}
              setDate={setDate5}
              className="border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="mb-2 block text-sm font-medium">
              Consumer Controlled Calendar Props
            </Label>
            <DateInput
              date={date6}
              setDate={setDate6}
              captionLayout="label"
              showOutsideDays
              numberOfMonths={2}
              disabled={date => date.getDay() === 0}
            />
            <p className="text-xs text-muted-foreground">
              Sundays are disabled using flattened Calendar props
            </p>
          </div>
        </div>

        <CodeBlock
          code={`import { DateInput } from '@codapet/design-system'
import { useState } from 'react'

export function DateInputDemo() {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <>
      {/* Basic Usage */}
      <DateInput date={date} setDate={setDate} />

      {/* Disable Future Dates */}
      <DateInput date={date} setDate={setDate} disableFuture={true} />

      {/* Min & Max Date */}
      <DateInput
        date={date}
        setDate={setDate}
        minDate={new Date(2023, 0, 1)}
        maxDate={new Date(2025, 11, 31)}
        disableFuture={false}
      />

      {/* Custom Placeholder */}
      <DateInput date={date} setDate={setDate} placeholder="Select a date..." />

      {/* Custom ClassName */}
      <DateInput date={date} setDate={setDate} className="border-blue-500" />

      {/* Consumer Controlled Calendar Props */}
      <DateInput
        date={date}
        setDate={setDate}
        captionLayout="label"
        showOutsideDays
        numberOfMonths={2}
        disabled={date => date.getDay() === 0}
      />
    </>
  )
}`}
        />

        <div className="space-y-2">
          <Label className="mb-2 block text-sm font-medium">Props API</Label>
          <p className="text-xs text-muted-foreground">
            DateInput accepts its own controlled/input props and flattened
            Calendar props for consumer control.
          </p>
          <p className="text-xs text-muted-foreground">
            Precedence: design-system defaults {'<'} deprecated{' '}
            <code>calendarProps</code> {'<'} flattened props on{' '}
            <code>DateInput</code>.
          </p>
          <p className="text-xs text-muted-foreground">
            <code>calendarProps</code> is temporarily supported for backward
            compatibility and is deprecated.
          </p>
          <CodeBlock
            code={`type NativeInputProps = Omit<
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

interface DateInputProps extends NativeInputProps, FlattenedCalendarProps {
  // DateInput controlled props
  date: Date | null
  setDate: (date: Date | null) => void
  minDate?: Date | null
  maxDate?: Date | null
  disableFuture?: boolean
  inputDisabled?: boolean
  inputClassName?: string
  calendarClassName?: string

  // Temporary compatibility path (deprecated)
  /** @deprecated Use flattened Calendar props directly on DateInput */
  calendarProps?: React.ComponentProps<typeof Calendar>

  // Explicit flattened overrides commonly used
  mode?: React.ComponentProps<typeof Calendar>['mode']
  selected?: Date
  onSelect?: (selectedDate: Date | undefined) => void
  month?: React.ComponentProps<typeof Calendar>['month']
  onMonthChange?: React.ComponentProps<typeof Calendar>['onMonthChange']
  disabled?: React.ComponentProps<typeof Calendar>['disabled']
  captionLayout?: React.ComponentProps<typeof Calendar>['captionLayout']
  showOutsideDays?: React.ComponentProps<typeof Calendar>['showOutsideDays']
  classNames?: React.ComponentProps<typeof Calendar>['classNames']
}`}
          />
        </div>
      </CardContent>
    </Card>
  )
}
