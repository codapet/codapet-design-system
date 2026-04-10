'use client'

import {
  Tooltip,
  TooltipTrigger,
  RichTooltipContent
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Info } from 'lucide-react'
import { CodeBlock } from '../buttons/CodeBlock'

export default function TooltipsPage() {

  return (
    <div className="flex flex-col gap-8 w-screen md:w-full px-4">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3 md:mb-4">
          Tooltips
        </h2>
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
          Rich tooltips with icon, heading, and dismissible options
        </p>
      </div>

      {/* ──── With Icon & Heading ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            With Icon &amp; Heading
          </CardTitle>
          <CardDescription>
            Full tooltip with icon, heading, and body text. Hover to see.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <RichTooltipContent
                icon={<Info />}
                heading="Heading for the banner"
              >
                If Vet becomes available, the estimated price for this
                appointment will be from $412 - $314. Plus optional cremation
                cost. Would you like to proceed with requesting this
                appointment?
              </RichTooltipContent>
            </Tooltip>
          </div>

          <CodeBlock
            code={`import { Tooltip, TooltipTrigger, RichTooltipContent } from '@codapet/design-system'
import { Button } from '@codapet/design-system'
import { Info } from 'lucide-react'

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Hover me</Button>
  </TooltipTrigger>
  <RichTooltipContent
    icon={<Info />}
    heading="Heading for the banner"
  >
    Body text goes here...
  </RichTooltipContent>
</Tooltip>`}
          />
        </CardContent>
      </Card>

      {/* ──── Without Heading ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Without Heading
          </CardTitle>
          <CardDescription>
            Tooltip with icon and body text only (no heading).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <RichTooltipContent icon={<Info />}>
                If Vet becomes available, the estimated price for this
                appointment will be from $412 - $314. Plus optional cremation
                cost. Would you like to proceed with requesting this
                appointment?
              </RichTooltipContent>
            </Tooltip>
          </div>

          <CodeBlock
            code={`{/* No heading - just omit the heading prop */}
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Hover me</Button>
  </TooltipTrigger>
  <RichTooltipContent icon={<Info />}>
    Body text goes here...
  </RichTooltipContent>
</Tooltip>`}
          />
        </CardContent>
      </Card>

      {/* ──── Without Icon ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            Without Icon
          </CardTitle>
          <CardDescription>
            Tooltip with heading and body but no icon.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <RichTooltipContent heading="Heading for the banner">
                If Vet becomes available, the estimated price for this
                appointment will be from $412 - $314. Plus optional cremation
                cost. Would you like to proceed with requesting this
                appointment?
              </RichTooltipContent>
            </Tooltip>
          </div>

          <CodeBlock
            code={`{/* No icon - just omit the icon prop */}
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Hover me</Button>
  </TooltipTrigger>
  <RichTooltipContent heading="Heading for the banner">
    Body text goes here...
  </RichTooltipContent>
</Tooltip>`}
          />
        </CardContent>
      </Card>

      {/* ──── Body Only ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Body Only (No Icon, No Heading)
          </CardTitle>
          <CardDescription>
            Minimal tooltip with body text only.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <RichTooltipContent>
                If Vet becomes available, the estimated price for this
                appointment will be from $412 - $314. Plus optional cremation
                cost. Would you like to proceed with requesting this
                appointment?
              </RichTooltipContent>
            </Tooltip>
          </div>

          <CodeBlock
            code={`{/* Body only */}
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Hover me</Button>
  </TooltipTrigger>
  <RichTooltipContent>
    Body text goes here...
  </RichTooltipContent>
</Tooltip>`}
          />
        </CardContent>
      </Card>

      {/* ──── Dismissible ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            Dismissible
          </CardTitle>
          <CardDescription>
            Tooltip with a close button. Click the trigger to open, then click X
            to dismiss.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Tooltip persistent>
              <TooltipTrigger asChild>
                <Button variant="outline">With Icon &amp; Heading</Button>
              </TooltipTrigger>
              <RichTooltipContent
                icon={<Info />}
                heading="Heading for the banner"
                dismissible
              >
                If Vet becomes available, the estimated price for this
                appointment will be from $412 - $314. Plus optional cremation
                cost. Would you like to proceed with requesting this
                appointment?
              </RichTooltipContent>
            </Tooltip>

            <Tooltip persistent>
              <TooltipTrigger asChild>
                <Button variant="outline">Without Heading</Button>
              </TooltipTrigger>
              <RichTooltipContent
                icon={<Info />}
                dismissible
              >
                Dismissible tooltip without heading. Click the X to dismiss.
              </RichTooltipContent>
            </Tooltip>

            <Tooltip persistent>
              <TooltipTrigger asChild>
                <Button variant="outline">Without Icon</Button>
              </TooltipTrigger>
              <RichTooltipContent
                heading="Heading for the banner"
                dismissible
              >
                Dismissible tooltip without icon. Click the X to dismiss.
              </RichTooltipContent>
            </Tooltip>
          </div>

          <CodeBlock
            code={`import { Tooltip, TooltipTrigger, RichTooltipContent } from '@codapet/design-system'
import { Info } from 'lucide-react'

<Tooltip persistent>
  <TooltipTrigger asChild>
    <Button variant="outline">Hover me</Button>
  </TooltipTrigger>
  <RichTooltipContent
    icon={<Info />}
    heading="Heading for the banner"
    dismissible
  >
    Body text goes here...
  </RichTooltipContent>
</Tooltip>`}
          />
        </CardContent>
      </Card>

      {/* ──── Placement ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            Placement
          </CardTitle>
          <CardDescription>
            Tooltip can be positioned on different sides of the trigger.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4 justify-center py-8">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Top</Button>
              </TooltipTrigger>
              <RichTooltipContent side="top" icon={<Info />}>
                Tooltip on top
              </RichTooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Bottom</Button>
              </TooltipTrigger>
              <RichTooltipContent side="bottom" icon={<Info />}>
                Tooltip on bottom
              </RichTooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Left</Button>
              </TooltipTrigger>
              <RichTooltipContent side="left" icon={<Info />}>
                Tooltip on left
              </RichTooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Right</Button>
              </TooltipTrigger>
              <RichTooltipContent side="right" icon={<Info />}>
                Tooltip on right
              </RichTooltipContent>
            </Tooltip>
          </div>

          <CodeBlock
            code={`{/* side="top" (default) */}
<RichTooltipContent side="top">...</RichTooltipContent>

{/* side="bottom" */}
<RichTooltipContent side="bottom">...</RichTooltipContent>

{/* side="left" */}
<RichTooltipContent side="left">...</RichTooltipContent>

{/* side="right" */}
<RichTooltipContent side="right">...</RichTooltipContent>`}
          />
        </CardContent>
      </Card>
    </div>
  )
}
