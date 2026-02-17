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
    </>
  )
}`}
        />
      </CardContent>
    </Card>
  )
}
