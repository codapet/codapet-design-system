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

  const [dateFmt1, setDateFmt1] = useState<Date | null>(null)
  const [dateFmt2, setDateFmt2] = useState<Date | null>(null)
  const [dateFmt3, setDateFmt3] = useState<Date | null>(null)
  const [dateFmt4, setDateFmt4] = useState<Date | null>(null)
  const [dateFmt5, setDateFmt5] = useState<Date | null>(null)
  const [dateFmt6, setDateFmt6] = useState<Date | null>(null)
  const [dateFmt7, setDateFmt7] = useState<Date | null>(null)
  const [dateFmt8, setDateFmt8] = useState<Date | null>(null)

  return (
    <>
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
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full" />
            Date Format Variants
          </CardTitle>
          <CardDescription>
            Use the <code>dateFormat</code> prop to control how the selected
            date is displayed in the input
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="block text-sm font-medium">
                MM/DD/YYYY — US (default)
              </Label>
              <DateInput
                date={dateFmt1}
                setDate={setDateFmt1}
                dateFormat="MM/DD/YYYY"
                disableFuture={false}
              />
              <p className="text-xs text-muted-foreground">
                Placeholder: mm/dd/yyyy
              </p>
            </div>

            <div className="space-y-2">
              <Label className="block text-sm font-medium">
                DD/MM/YYYY — European
              </Label>
              <DateInput
                date={dateFmt2}
                setDate={setDateFmt2}
                dateFormat="DD/MM/YYYY"
                disableFuture={false}
              />
              <p className="text-xs text-muted-foreground">
                Placeholder: dd/mm/yyyy
              </p>
            </div>

            <div className="space-y-2">
              <Label className="block text-sm font-medium">
                YYYY-MM-DD — ISO 8601
              </Label>
              <DateInput
                date={dateFmt3}
                setDate={setDateFmt3}
                dateFormat="YYYY-MM-DD"
                disableFuture={false}
              />
              <p className="text-xs text-muted-foreground">
                Placeholder: yyyy-mm-dd
              </p>
            </div>

            <div className="space-y-2">
              <Label className="block text-sm font-medium">DD-MM-YYYY</Label>
              <DateInput
                date={dateFmt4}
                setDate={setDateFmt4}
                dateFormat="DD-MM-YYYY"
                disableFuture={false}
              />
              <p className="text-xs text-muted-foreground">
                Placeholder: dd-mm-yyyy
              </p>
            </div>

            <div className="space-y-2">
              <Label className="block text-sm font-medium">MM-DD-YYYY</Label>
              <DateInput
                date={dateFmt5}
                setDate={setDateFmt5}
                dateFormat="MM-DD-YYYY"
                disableFuture={false}
              />
              <p className="text-xs text-muted-foreground">
                Placeholder: mm-dd-yyyy
              </p>
            </div>

            <div className="space-y-2">
              <Label className="block text-sm font-medium">
                DD.MM.YYYY — Dot-separated
              </Label>
              <DateInput
                date={dateFmt6}
                setDate={setDateFmt6}
                dateFormat="DD.MM.YYYY"
                disableFuture={false}
              />
              <p className="text-xs text-muted-foreground">
                Placeholder: dd.mm.yyyy
              </p>
            </div>

            <div className="space-y-2">
              <Label className="block text-sm font-medium">
                MMMM D, YYYY — Long month
              </Label>
              <DateInput
                date={dateFmt7}
                setDate={setDateFmt7}
                dateFormat="MMMM D, YYYY"
                disableFuture={false}
              />
              <p className="text-xs text-muted-foreground">
                e.g. January 1, 2025
              </p>
            </div>

            <div className="space-y-2">
              <Label className="block text-sm font-medium">
                D MMMM YYYY — Day-first long
              </Label>
              <DateInput
                date={dateFmt8}
                setDate={setDateFmt8}
                dateFormat="D MMMM YYYY"
                disableFuture={false}
              />
              <p className="text-xs text-muted-foreground">
                e.g. 1 January 2025
              </p>
            </div>
          </div>

          <CodeBlock
            code={`import { DateInput } from '@codapet/design-system'
import { useState } from 'react'

export function Example() {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <>
      {/* US format (default) */}
      <DateInput date={date} setDate={setDate} dateFormat="MM/DD/YYYY" />

      {/* European format */}
      <DateInput date={date} setDate={setDate} dateFormat="DD/MM/YYYY" />

      {/* ISO 8601 */}
      <DateInput date={date} setDate={setDate} dateFormat="YYYY-MM-DD" />

      {/* Dash-separated */}
      <DateInput date={date} setDate={setDate} dateFormat="DD-MM-YYYY" />
      <DateInput date={date} setDate={setDate} dateFormat="MM-DD-YYYY" />

      {/* Dot-separated */}
      <DateInput date={date} setDate={setDate} dateFormat="DD.MM.YYYY" />

      {/* Long month name */}
      <DateInput date={date} setDate={setDate} dateFormat="MMMM D, YYYY" />
      <DateInput date={date} setDate={setDate} dateFormat="D MMMM YYYY" />
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
            Props API
          </CardTitle>
          <CardDescription>
            DateInput accepts its own controlled/input props and flattened
            Calendar props for consumer control.
            <br />
            Precedence: design-system defaults {'<'} deprecated{' '}
            <code>calendarProps</code> {'<'} flattened props on{' '}
            <code>DateInput</code>.
            <br />
            <code>calendarProps</code> is temporarily supported for backward
            compatibility and is deprecated.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
  dateFormat?: DateFormat

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
        </CardContent>
      </Card>
    </>
  )
}
