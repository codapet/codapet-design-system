'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/index'
import { CodeBlock } from '../buttons/CodeBlock'

export default function TextareasPage() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Textarea Components
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Multi-line text input fields for longer content
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            Textarea States
          </CardTitle>
          <CardDescription>
            Different textarea states and validation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Default State
              </Label>
              <Textarea placeholder="Default textarea state" />
            </div>
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Error State
              </Label>
              <Textarea placeholder="Error textarea state" error={true} />
              <p className="text-sm text-destructive mt-1">
                This field is required
              </p>
            </div>
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Disabled State
              </Label>
              <Textarea placeholder="Disabled textarea" disabled />
            </div>
            <div>
              <Label className="mb-2 block text-sm font-medium">
                With Label
              </Label>
              <Textarea placeholder="Enter your message" />
            </div>
          </div>
          <CodeBlock
                code={`import { Textarea } from '@codapet/design-system'
import { Label } from '@codapet/design-system'

{/* Default State */}
<Label>Default State</Label>
<Textarea placeholder="Default textarea state" />

{/* Error State */}
<Label>Error State</Label>
<Textarea placeholder="Error textarea state" error={true} />
<p className="text-sm text-destructive mt-1">
  This field is required
</p>

{/* Disabled State */}
<Label>Disabled State</Label>
<Textarea placeholder="Disabled textarea" disabled />

{/* With Label */}
<Label>With Label</Label>
<Textarea placeholder="Enter your message" />`}
          />
        </CardContent>
      </Card>
    </div>
  )
}
