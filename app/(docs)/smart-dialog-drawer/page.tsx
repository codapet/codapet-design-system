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
    console.log('Scheduled visit for:', petName)
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Smart Dialog Drawer
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          A responsive primitive that automatically switches between dialog and drawer based on
          screen size. It is a wrapper around the Dialog and Drawer components. It is a dialog on desktop and a drawer on mobile.
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
              Use the smart dialog for simple confirm flows that work on any device.
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
                    <SmartDialogTitle>Smart dialog on any device</SmartDialogTitle>
                    <SmartDialogDescription>
                      On desktop this renders as a dialog, on mobile it becomes a drawer
                      automatically.
                    </SmartDialogDescription>
                  </SmartDialogHeader>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    This component wraps the dialog and drawer APIs into a single, responsive
                    primitive.
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
              Combine the smart dialog with forms for richer, responsive workflows.
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
                      Collect information in a responsive dialog that becomes a drawer on mobile.
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
      </div>
    </div>
  )
}
