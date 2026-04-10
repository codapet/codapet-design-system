'use client'

import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CodeBlock } from '../buttons/CodeBlock'

export default function LabelsPage() {
  return (
    <div className="flex flex-col gap-8 w-screen md:w-full px-4">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3 md:mb-4">
          Labels
        </h2>
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
          Text labels for form controls in multiple sizes
        </p>
      </div>

      {/* ──── Sizes ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Sizes
          </CardTitle>
          <CardDescription>
            Labels come in four sizes: lg, md (default), sm, and xs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-baseline gap-6">
              <span className="text-xs text-muted-foreground w-8">lg</span>
              <Label size="lg">Large label</Label>
            </div>
            <div className="flex items-baseline gap-6">
              <span className="text-xs text-muted-foreground w-8">md</span>
              <Label size="md">Medium label (default)</Label>
            </div>
            <div className="flex items-baseline gap-6">
              <span className="text-xs text-muted-foreground w-8">sm</span>
              <Label size="sm">Small label</Label>
            </div>
            <div className="flex items-baseline gap-6">
              <span className="text-xs text-muted-foreground w-8">xs</span>
              <Label size="xs">Extra small label</Label>
            </div>
          </div>

          <CodeBlock
            code={`import { Label } from '@codapet/design-system'

<Label size="lg">Large label</Label>
<Label size="md">Medium label (default)</Label>
<Label size="sm">Small label</Label>
<Label size="xs">Extra small label</Label>`}
          />
        </CardContent>
      </Card>

      {/* ──── With Form Controls ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            With Form Controls
          </CardTitle>
          <CardDescription>
            Labels paired with input fields using htmlFor for accessibility.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-2 max-w-sm">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>

          <div className="flex flex-col gap-2 max-w-sm">
            <Label size="sm" htmlFor="name">
              Full name
            </Label>
            <Input id="name" placeholder="John Doe" />
          </div>

          <CodeBlock
            code={`import { Label } from '@codapet/design-system'
import { Input } from '@codapet/design-system'

<div className="flex flex-col gap-2">
  <Label htmlFor="email">Email address</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>`}
          />
        </CardContent>
      </Card>

      {/* ──── As Child ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            Polymorphic (asChild)
          </CardTitle>
          <CardDescription>
            Use asChild to render the label styling on a different element.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label asChild size="md">
            <span>Rendered as a span</span>
          </Label>

          <CodeBlock
            code={`<Label asChild size="md">
  <span>Rendered as a span</span>
</Label>`}
          />
        </CardContent>
      </Card>
    </div>
  )
}
