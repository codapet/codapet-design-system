/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  SmartDialog,
  SmartDialogClose,
  SmartDialogContent,
  SmartDialogDescription,
  SmartDialogFooter,
  SmartDialogHeader,
  SmartDialogTitle,
  SmartDialogTrigger
} from '@/components/ui/smart-dialog-drawer'

import { CodeBlock } from '../buttons/CodeBlock'

const basicUsageCode = `import {
  SmartDialog,
  SmartDialogTrigger,
  SmartDialogContent,
  SmartDialogHeader,
  SmartDialogTitle,
  SmartDialogDescription,
  SmartDialogFooter,
  SmartDialogClose,
  Button
} from '@codapet/design-system'

export function BasicSmartDialogExample() {
  return (
    <SmartDialog>
      <SmartDialogTrigger asChild>
        <Button>Open smart dialog</Button>
      </SmartDialogTrigger>
      <SmartDialogContent>
        <SmartDialogHeader>
          <SmartDialogTitle>Smart dialog on any device</SmartDialogTitle>
          <SmartDialogDescription>
            On desktop this renders as a dialog, on mobile it becomes a drawer automatically.
          </SmartDialogDescription>
        </SmartDialogHeader>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          This component wraps the dialog and drawer APIs into a single, responsive primitive.
        </p>
        <SmartDialogFooter className="flex gap-2 justify-end">
          <SmartDialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </SmartDialogClose>
          <SmartDialogClose asChild>
            <Button>Confirm</Button>
          </SmartDialogClose>
        </SmartDialogFooter>
      </SmartDialogContent>
    </SmartDialog>
  )
}`

const advancedUsageCode = `import { useState } from 'react'

import {
  SmartDialog,
  SmartDialogTrigger,
  SmartDialogContent,
  SmartDialogHeader,
  SmartDialogTitle,
  SmartDialogDescription,
  SmartDialogFooter,
  SmartDialogClose,
  Button,
  Input,
  Label
} from '@codapet/design-system'

export function SmartDialogFormExample() {
  const [petName, setPetName] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // submit to your API here
    console.log('Scheduled visit for:', petName)
  }

  return (
    <SmartDialog>
      <SmartDialogTrigger asChild>
        <Button>Schedule visit</Button>
      </SmartDialogTrigger>
      <SmartDialogContent>
        <SmartDialogHeader>
          <SmartDialogTitle>Schedule a visit</SmartDialogTitle>
          <SmartDialogDescription>
            Collect information in a responsive dialog that becomes a drawer on mobile.
          </SmartDialogDescription>
        </SmartDialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pet-name">Pet name</Label>
            <Input
              id="pet-name"
              value={petName}
              onChange={event => setPetName(event.target.value)}
              placeholder="Enter your pet's name"
              required
            />
          </div>
          <SmartDialogFooter className="flex gap-2 justify-end">
            <SmartDialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </SmartDialogClose>
            <Button type="submit" disabled={!petName}>
              Save
            </Button>
          </SmartDialogFooter>
        </form>
      </SmartDialogContent>
    </SmartDialog>
  )
}`

export default function SmartDialogDrawerPage() {
  const [petName, setPetName] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // submit to your API here
    // console.log('Scheduled visit for:', petName)
  }

  return (
    <div className="flex flex-col gap-8 w-screen md:w-full px-4 ">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3 md:mb-4">
          Smart Dialog Drawer
        </h2>
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
          A responsive primitive that automatically switches between dialog and
          drawer based on screen size. It is a wrapper around the Dialog and
          Drawer components. It is a dialog on desktop and a drawer on mobile.
        </p>
      </div>

      <div className="grid grid-cols-1  gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              Basic usage
            </CardTitle>
            <CardDescription>
              Use the smart dialog for simple confirm flows that work on any
              device.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <SmartDialog>
                <SmartDialogTrigger asChild>
                  <Button>Open smart dialog</Button>
                </SmartDialogTrigger>
                <SmartDialogContent>
                  <SmartDialogHeader>
                    <SmartDialogTitle>
                      Smart dialog on any device
                    </SmartDialogTitle>
                    <SmartDialogDescription>
                      On desktop this renders as a dialog, on mobile it becomes
                      a drawer automatically.
                    </SmartDialogDescription>
                  </SmartDialogHeader>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    This component wraps the dialog and drawer APIs into a
                    single, responsive primitive.
                  </p>
                  <SmartDialogFooter className="flex gap-2 justify-end">
                    <SmartDialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </SmartDialogClose>
                    <SmartDialogClose asChild>
                      <Button>Confirm</Button>
                    </SmartDialogClose>
                  </SmartDialogFooter>
                </SmartDialogContent>
              </SmartDialog>
            </div>
            <CodeBlock code={basicUsageCode} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sky-500 rounded-full" />
              Advanced usage
            </CardTitle>
            <CardDescription>
              Combine the smart dialog with forms for richer, responsive
              workflows.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <SmartDialog>
                <SmartDialogTrigger asChild>
                  <Button>Schedule visit</Button>
                </SmartDialogTrigger>
                <SmartDialogContent>
                  <SmartDialogHeader>
                    <SmartDialogTitle>Schedule a visit</SmartDialogTitle>
                    <SmartDialogDescription>
                      Collect information in a responsive dialog that becomes a
                      drawer on mobile.
                    </SmartDialogDescription>
                  </SmartDialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pet-name-live">Pet name</Label>
                      <Input
                        id="pet-name-live"
                        value={petName}
                        onChange={event => setPetName(event.target.value)}
                        placeholder="Enter your pet's name"
                        required
                      />
                    </div>
                    <SmartDialogFooter className="flex gap-2 justify-end">
                      <SmartDialogClose asChild>
                        <Button type="button" variant="outline">
                          Cancel
                        </Button>
                      </SmartDialogClose>
                      <Button type="submit" disabled={!petName}>
                        Save
                      </Button>
                    </SmartDialogFooter>
                  </form>
                </SmartDialogContent>
              </SmartDialog>
            </div>
            <CodeBlock code={advancedUsageCode} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-slate-500 rounded-full" />
              Props Reference
            </CardTitle>
            <CardDescription>
              Complete list of available props for each sub-component.
              <span className="block mt-1">
                <code className="font-mono text-xs">SmartDialog*</code> renders
                a <code className="font-mono text-xs">Drawer</code> on screens
                ≤ 600px and a{' '}
                <code className="font-mono text-xs">Dialog</code> above. Each
                table notes which underlying component a prop applies to.
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <PropsTable
              name="<SmartDialog> / <Drawer> / <Dialog>"
              description="Root container. Forwards to vaul / Radix Dialog Root."
              rows={[
                ['open', 'boolean', '-', 'Controlled open state.'],
                [
                  'onOpenChange',
                  '(open: boolean) => void',
                  '-',
                  'Called when the open state changes (trigger click, escape, overlay click, swipe).'
                ],
                [
                  'defaultOpen',
                  'boolean',
                  'false',
                  'Uncontrolled initial open state.'
                ],
                [
                  'modal',
                  'boolean',
                  'true',
                  'When false, focus/scroll outside the dialog stays interactive.'
                ],
                [
                  'direction',
                  '"top" | "bottom" | "left" | "right"',
                  '"bottom"',
                  'Drawer only. Edge the drawer slides in from. Pass the same value to <DrawerContent> for correct rounding.'
                ],
                [
                  'dismissible',
                  'boolean',
                  'true',
                  'Drawer only. Allow closing via swipe / overlay click.'
                ],
                ['children', 'ReactNode', '-', 'Trigger, Content, etc.']
              ]}
            />

            <PropsTable
              name="<SmartDialogContent> / <DrawerContent> / <DialogContent>"
              description="The sheet / dialog surface. Applies the marketing skin defaults (rounded-3xl, bg-background, border-border-default, bg-black/40 overlay)."
              rows={[
                [
                  'className',
                  'string',
                  '-',
                  'Override or extend the surface classes. Wins over defaults via tailwind-merge.'
                ],
                [
                  'overlayClassName',
                  'string',
                  '-',
                  'Override the backdrop classes (default bg-black/40).'
                ],
                [
                  'showCloseButton',
                  'boolean',
                  'true',
                  'Render the built-in pill-style ✕ close button (top-right).'
                ],
                [
                  'withCloseButton',
                  'boolean',
                  'true',
                  'Drawer only. Show the drag handle on bottom drawers.'
                ],
                [
                  'direction',
                  '"top" | "bottom" | "left" | "right"',
                  '"bottom"',
                  'Drawer only. Must match <Drawer direction>. Drives rounding / position defaults.'
                ],
                [
                  'children',
                  'ReactNode',
                  '-',
                  'Header, body, Footer, custom close, etc.'
                ]
              ]}
            />

            <PropsTable
              name="<SmartDialogTrigger> / <DrawerTrigger> / <DialogTrigger>"
              description="The element that toggles the dialog open."
              rows={[
                [
                  'asChild',
                  'boolean',
                  'false',
                  'Merge props onto the child element instead of rendering an extra <button>.'
                ],
                [
                  'children',
                  'ReactNode',
                  '-',
                  'Usually a <Button>, often paired with asChild.'
                ]
              ]}
            />

            <PropsTable
              name="<SmartDialogClose> / <DrawerClose> / <DialogClose>"
              description="Imperative close button. Use inside SmartDialogContent for cancel/confirm actions."
              rows={[
                [
                  'asChild',
                  'boolean',
                  'false',
                  'Render the child as the close trigger (e.g. <Button variant="outline">).'
                ],
                [
                  'children',
                  'ReactNode',
                  '-',
                  'The element that, when clicked, closes the dialog.'
                ]
              ]}
            />

            <PropsTable
              name="<SmartDialogHeader> / <DrawerHeader> / <DialogHeader>"
              description="Title + description wrapper. Adds default padding and centers text on top/bottom drawers."
              rows={[
                [
                  'className',
                  'string',
                  '-',
                  'Override layout, padding, alignment.'
                ],
                [
                  'children',
                  'ReactNode',
                  '-',
                  'Typically <SmartDialogTitle> and <SmartDialogDescription>.'
                ]
              ]}
            />

            <PropsTable
              name="<SmartDialogFooter> / <DrawerFooter> / <DialogFooter>"
              description="Sticky-bottom action area. Drawer adds border-top + safe-area bottom padding."
              rows={[
                [
                  'className',
                  'string',
                  '-',
                  'Override layout (e.g. flex direction, gap, justification).'
                ],
                [
                  'children',
                  'ReactNode',
                  '-',
                  'Action buttons (often <SmartDialogClose asChild><Button/></SmartDialogClose>).'
                ]
              ]}
            />

            <PropsTable
              name="<SmartDialogTitle> / <DrawerTitle> / <DialogTitle>"
              description="Accessible title (announced by screen readers). Use sr-only when you don't want a visible title."
              rows={[
                ['className', 'string', '-', 'Override typography.'],
                ['children', 'ReactNode', '-', 'The visible (or sr-only) title.']
              ]}
            />

            <PropsTable
              name="<SmartDialogDescription> / <DrawerDescription> / <DialogDescription>"
              description="Accessible supporting text. Optional, but improves screen-reader UX."
              rows={[
                ['className', 'string', '-', 'Override typography.'],
                ['children', 'ReactNode', '-', 'Short description text.']
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function PropsTable({
  name,
  description,
  rows
}: {
  name: string
  description?: string
  rows: Array<[string, string, string, string]>
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold mb-1 font-mono">{name}</h4>
      {description && (
        <p className="text-xs text-muted-foreground mb-2">{description}</p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 pr-4 font-medium">Prop</th>
              <th className="text-left py-2 pr-4 font-medium">Type</th>
              <th className="text-left py-2 pr-4 font-medium">Default</th>
              <th className="text-left py-2 font-medium">Description</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            {rows.map(([prop, type, def, desc], i) => (
              <tr key={prop} className={i < rows.length - 1 ? 'border-b' : ''}>
                <td className="py-2 pr-4 font-mono text-xs">{prop}</td>
                <td className="py-2 pr-4 font-mono text-xs">{type}</td>
                <td className="py-2 pr-4 font-mono text-xs">{def}</td>
                <td className="py-2">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
