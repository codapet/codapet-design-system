'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { AutoResizeTextarea, Label } from '@/index'
import { CodeBlock } from '../buttons/CodeBlock'
import { useState } from 'react'

export default function AutoResizeTextareaPage() {
  const [controlled, setControlled] = useState('')

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Auto-resize Textarea
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Textarea that grows with content, with optional max height and scroll
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            Default
          </CardTitle>
          <CardDescription>
            Minimum height 120px, grows with content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="mb-2 block text-sm font-medium">
              Auto-resize (minHeight 120px)
            </Label>
            <AutoResizeTextarea
              placeholder="Type to see it grow..."
              minHeight={120}
            />
          </div>
          <CodeBlock
            code={`import { AutoResizeTextarea, Label } from '@codapet/design-system'

<Label>Auto-resize (minHeight 120px)</Label>
<AutoResizeTextarea
  placeholder="Type to see it grow..."
  minHeight={120}
/>`}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            With maxHeight
          </CardTitle>
          <CardDescription>
            Stops growing at 200px, then scrolls
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="mb-2 block text-sm font-medium">
              Capped height (maxHeight 200px)
            </Label>
            <AutoResizeTextarea
              placeholder="Keep typing to hit the cap..."
              minHeight={120}
              maxHeight={200}
            />
          </div>
          <CodeBlock
            code={`import { AutoResizeTextarea, Label } from '@codapet/design-system'

<Label>Capped height (maxHeight 200px)</Label>
<AutoResizeTextarea
  placeholder="Keep typing to hit the cap..."
  minHeight={120}
  maxHeight={200}
/>`}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            Controlled
          </CardTitle>
          <CardDescription>
            Resizes when value updates externally
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="mb-2 block text-sm font-medium">
              Controlled value
            </Label>
            <AutoResizeTextarea
              placeholder="Controlled example"
              minHeight={120}
              maxHeight={240}
              value={controlled}
              onChange={e => setControlled(e.target.value)}
            />
          </div>
          <CodeBlock
            code={`import { AutoResizeTextarea, Label } from '@codapet/design-system'
import { useState } from 'react'

const [value, setValue] = useState('')

<Label>Controlled value</Label>
<AutoResizeTextarea
  placeholder="Controlled example"
  minHeight={120}
  maxHeight={240}
  value={value}
  onChange={e => setValue(e.target.value)}
/>`}
          />
        </CardContent>
      </Card>
    </div>
  )
}
