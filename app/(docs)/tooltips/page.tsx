'use client'

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
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

type PropRow = {
  name: string
  type: string
  def: string
  desc: string
}

const tooltipContentProps: PropRow[] = [
  {
    name: 'hideArrow',
    type: 'boolean',
    def: 'false',
    desc: 'Omit the arrow entirely.'
  },
  {
    name: 'arrowClassName',
    type: 'string',
    def: '—',
    desc: 'Classes merged (via cn) onto the arrow. Recolor it to match a custom body, e.g. "bg-white fill-white".'
  },
  {
    name: 'className',
    type: 'string',
    def: '—',
    desc: 'Classes for the tooltip surface (this is the visible body for the plain tooltip).'
  }
]

const richTooltipContentProps: PropRow[] = [
  {
    name: 'variant',
    type: '"dark" | "light"',
    def: '"dark"',
    desc: 'Preset surface + text + arrow combo. "dark" is the original look; "light" is a white surface with dark text.'
  },
  {
    name: 'surfaceClassName',
    type: 'string',
    def: '—',
    desc: 'Classes merged onto the inner surface div. Overrides the background (and text, since text color lives here). Wins over variant.'
  },
  {
    name: 'arrowClassName',
    type: 'string',
    def: '—',
    desc: 'Classes merged onto the arrow so it matches a custom surface, e.g. "fill-white". Wins over variant.'
  },
  {
    name: 'hideArrow',
    type: 'boolean',
    def: 'false',
    desc: 'Omit the arrow entirely.'
  },
  {
    name: 'icon',
    type: 'ReactNode',
    def: '—',
    desc: 'Optional leading icon.'
  },
  {
    name: 'heading',
    type: 'string',
    def: '—',
    desc: 'Optional bold heading above the body.'
  },
  {
    name: 'dismissible',
    type: 'boolean',
    def: 'false',
    desc: 'Show a close (X) button. Pair with <Tooltip persistent>.'
  },
  {
    name: 'onDismiss',
    type: '() => void',
    def: '—',
    desc: 'Called when the tooltip is dismissed.'
  },
  {
    name: 'className',
    type: 'string',
    def: '—',
    desc: 'Classes for the OUTER (transparent) positioning wrapper — not the visible surface. Use surfaceClassName/variant for appearance.'
  }
]

function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-stroke-light">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-surface-light text-foreground">
          <tr>
            <th className="px-3 py-2 font-semibold">Prop</th>
            <th className="px-3 py-2 font-semibold">Type</th>
            <th className="px-3 py-2 font-semibold">Default</th>
            <th className="px-3 py-2 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr
              key={row.name}
              className="border-t border-gray-stroke-light align-top"
            >
              <td className="px-3 py-2 font-mono text-xs whitespace-nowrap text-foreground">
                {row.name}
              </td>
              <td className="px-3 py-2 font-mono text-xs whitespace-nowrap text-foreground-secondary">
                {row.type}
              </td>
              <td className="px-3 py-2 font-mono text-xs whitespace-nowrap text-foreground-secondary">
                {row.def}
              </td>
              <td className="px-3 py-2 text-foreground-secondary">{row.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

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

      {/* ──── Variant: dark vs light ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            Variant (Dark / Light)
          </CardTitle>
          <CardDescription>
            The <code>variant</code> prop on <code>RichTooltipContent</code> sets
            the surface, text and arrow together. <code>&quot;dark&quot;</code>{' '}
            (default) keeps the original dark look; <code>&quot;light&quot;</code>{' '}
            is a white surface with dark text. Both stay correct in light and dark
            app themes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">variant=&quot;dark&quot;</Button>
              </TooltipTrigger>
              <RichTooltipContent
                variant="dark"
                icon={<Info />}
                heading="Dark variant (default)"
              >
                Dark surface with white text — identical to the default
                RichTooltip.
              </RichTooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">variant=&quot;light&quot;</Button>
              </TooltipTrigger>
              <RichTooltipContent
                variant="light"
                icon={<Info />}
                heading="Light variant"
              >
                White surface with dark text — surface, text and arrow (with a
                matching shadow) all built in.
              </RichTooltipContent>
            </Tooltip>

            {/* Light variant is also dismissible-aware */}
            <Tooltip persistent>
              <TooltipTrigger asChild>
                <Button variant="outline">Light + dismissible</Button>
              </TooltipTrigger>
              <RichTooltipContent
                variant="light"
                icon={<Info />}
                heading="Light &amp; dismissible"
                dismissible
              >
                The dismiss button inherits the variant&apos;s text color too.
              </RichTooltipContent>
            </Tooltip>
          </div>

          <CodeBlock
            code={`{/* Default — no variant needed */}
<RichTooltipContent icon={<Info />} heading="Dark variant (default)">
  Body text...
</RichTooltipContent>

{/* Explicit dark (same as default) */}
<RichTooltipContent variant="dark" icon={<Info />} heading="Dark">
  Body text...
</RichTooltipContent>

{/* Light preset — white surface, dark text, white arrow */}
<RichTooltipContent variant="light" icon={<Info />} heading="Light variant">
  Body text...
</RichTooltipContent>

{/* Works with dismissible + persistent too */}
<Tooltip persistent>
  <TooltipTrigger asChild>
    <Button variant="outline">Open</Button>
  </TooltipTrigger>
  <RichTooltipContent variant="light" heading="Light & dismissible" dismissible>
    Body text...
  </RichTooltipContent>
</Tooltip>`}
          />
        </CardContent>
      </Card>

      {/* ──── Custom surface & arrow (theming) ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            Custom Surface &amp; Arrow
          </CardTitle>
          <CardDescription>
            Restyle the surface, text and arrow. The arrow follows the body
            instead of staying brand blue.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            {/* Plain tooltip recolored to white — body + arrow together */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">White text tooltip</Button>
              </TooltipTrigger>
              <TooltipContent
                className="bg-white text-foreground shadow-md"
                arrowClassName="bg-white fill-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.12)]"
              >
                A white tooltip — the arrow matches the body, shadow and all.
              </TooltipContent>
            </Tooltip>

            {/* Plain tooltip with no arrow */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">No arrow</Button>
              </TooltipTrigger>
              <TooltipContent hideArrow>Tooltip without an arrow</TooltipContent>
            </Tooltip>

            {/* Rich tooltip, light variant */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Rich (light)</Button>
              </TooltipTrigger>
              <RichTooltipContent
                variant="light"
                icon={<Info />}
                heading="Light variant"
              >
                A light-surfaced rich tooltip with dark text — surface, text and
                arrow all match (shadow built in).
              </RichTooltipContent>
            </Tooltip>

            {/* Rich tooltip, custom surface override */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Rich (custom surface)</Button>
              </TooltipTrigger>
              <RichTooltipContent
                icon={<Info />}
                heading="Custom surface"
                surfaceClassName="bg-white text-foreground shadow-md"
                arrowClassName="fill-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.12)]"
              >
                Override the surface via surfaceClassName — pair a shadowed body
                with a drop-shadow on the arrow.
              </RichTooltipContent>
            </Tooltip>
          </div>

          <CodeBlock
            code={`{/* Plain tooltip — recolor body AND arrow together */}
<TooltipContent className="bg-white text-foreground" arrowClassName="bg-white fill-white">
  A white tooltip
</TooltipContent>

{/* Drop the arrow */}
<TooltipContent hideArrow>No arrow</TooltipContent>

{/* Rich tooltip — light preset (surface + text + arrow) */}
<RichTooltipContent variant="light" icon={<Info />} heading="Light variant">
  Body text...
</RichTooltipContent>

{/* Rich tooltip — override surface + arrow yourself */}
<RichTooltipContent
  surfaceClassName="bg-white text-foreground"
  arrowClassName="fill-white"
>
  Body text...
</RichTooltipContent>`}
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

      {/* ──── Props reference ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
            Props Reference
          </CardTitle>
          <CardDescription>
            Styling props for both tooltip surfaces. All are optional and
            defaults are unchanged, so existing usages render identically.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">
              TooltipContent
            </h3>
            <p className="text-sm text-foreground-secondary">
              The plain text tooltip. Also accepts every{' '}
              <code>@radix-ui/react-tooltip</code> Content prop (
              <code>side</code>, <code>sideOffset</code>, <code>align</code>,
              …).
            </p>
            <PropsTable rows={tooltipContentProps} />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">
              RichTooltipContent
            </h3>
            <p className="text-sm text-foreground-secondary">
              Icon + heading + body surface. Also accepts every Radix Content
              prop.
            </p>
            <PropsTable rows={richTooltipContentProps} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
