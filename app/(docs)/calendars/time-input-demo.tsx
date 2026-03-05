'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { TimeInput } from '@/index'
import type { TimeValue } from '@/index'
import { useState } from 'react'
import { CodeBlock } from '../buttons/CodeBlock'

export function TimeInputDemo() {
  const [time1, setTime1] = useState<TimeValue | null>(null)
  const [time2, setTime2] = useState<TimeValue | null>(null)
  const [time3, setTime3] = useState<TimeValue | null>(null)
  const [time4, setTime4] = useState<TimeValue | null>({ hours: 14, minutes: 30 })

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-teal-500 rounded-full" />
            Time Input
          </CardTitle>
          <CardDescription>
            Time picker with scrollable hour, minute, and AM/PM columns. Click
            the input to open the picker, or type directly. Supports 12-hour and
            24-hour formats.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="mb-2 block text-sm font-medium">
                12-Hour Format (default)
              </Label>
              <TimeInput time={time1} setTime={setTime1} />
            </div>

            <div className="space-y-2">
              <Label className="mb-2 block text-sm font-medium">
                24-Hour Format
              </Label>
              <TimeInput
                time={time2}
                setTime={setTime2}
                timeFormat="24h"
              />
            </div>

            <div className="space-y-2">
              <Label className="mb-2 block text-sm font-medium">
                Minute Step of 15
              </Label>
              <TimeInput
                time={time3}
                setTime={setTime3}
                minuteStep={15}
              />
              <p className="text-xs text-muted-foreground">
                Minutes: 00, 15, 30, 45
              </p>
            </div>

            <div className="space-y-2">
              <Label className="mb-2 block text-sm font-medium">
                Pre-filled Value
              </Label>
              <TimeInput time={time4} setTime={setTime4} />
              <p className="text-xs text-muted-foreground">
                Initial value: 2:30 PM
              </p>
            </div>
          </div>

          <CodeBlock
            code={`import { TimeInput, type TimeValue } from '@codapet/design-system'
import { useState } from 'react'

export function Example() {
  const [time, setTime] = useState<TimeValue | null>(null)

  return (
    <>
      {/* 12-hour format (default) */}
      <TimeInput time={time} setTime={setTime} />

      {/* 24-hour format */}
      <TimeInput time={time} setTime={setTime} timeFormat="24h" />

      {/* Minute step of 15 */}
      <TimeInput time={time} setTime={setTime} minuteStep={15} />

      {/* Pre-filled value */}
      <TimeInput
        time={{ hours: 14, minutes: 30 }}
        setTime={setTime}
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
            TimeInput props interface and related types
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <CodeBlock
            code={`type TimeFormat = '12h' | '24h'

interface TimeValue {
  hours: number   // 0-23 (always stored in 24h internally)
  minutes: number // 0-59
}

interface TimeInputProps {
  // Core controlled state
  time: TimeValue | null
  setTime: (time: TimeValue | null) => void

  // Format
  timeFormat?: TimeFormat       // default: '12h'
  minuteStep?: number           // default: 1 (e.g. 5, 10, 15, 30)

  // Input configuration
  inputDisabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  placeholder?: string          // default: 'hh:mm AM/PM' or 'HH:mm'

  // Styling
  className?: string            // wrapper className
  inputClassName?: string       // applied to the input

  // Native input props (aria-*, data-*, event handlers)
  // are forwarded to the input
}`}
          />
        </CardContent>
      </Card>
    </>
  )
}
