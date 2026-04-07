'use client'

import {
  DropdownSelect,
  DropdownSelectContent,
  DropdownSelectLabel,
  DropdownSelectOption,
  DropdownSelectTrigger
} from '@/components/ui/dropdown-select'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { CircleUser } from 'lucide-react'
import { useState } from 'react'
import { CodeBlock } from '../buttons/CodeBlock'

export default function DropdownPage() {
  const [basic, setBasic] = useState('')
  const [withIcon, setWithIcon] = useState('')
  const [errorVal, setErrorVal] = useState('')
  const [labelVal, setLabelVal] = useState('')
  const [scrollVal, setScrollVal] = useState('')

  return (
    <div className="flex flex-col gap-8 w-screen md:w-full px-4">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3 md:mb-4">
          Dropdown Select
        </h2>
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
          Custom dropdown select input with multiple states, icon support, and
          pixel-perfect styling
        </p>
      </div>

      {/* Basic */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Basic Dropdown
          </CardTitle>
          <CardDescription>
            Default dropdown select with placeholder and options.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-w-xs">
            <DropdownSelect
              value={basic}
              onValueChange={setBasic}
              placeholder="Select"
            >
              <DropdownSelectTrigger />
              <DropdownSelectContent>
                <DropdownSelectOption value="opt1" label="Option 1" />
                <DropdownSelectOption value="opt2" label="Option 2" />
                <DropdownSelectOption value="opt3" label="Option 3" />
                <DropdownSelectOption value="opt4" label="Option 4" />
                <DropdownSelectOption value="opt5" label="Option 5" />
              </DropdownSelectContent>
            </DropdownSelect>
          </div>
          {basic && (
            <p className="text-sm text-muted-foreground">
              Selected: {basic}
            </p>
          )}
          <CodeBlock
            code={`import {
  DropdownSelect,
  DropdownSelectTrigger,
  DropdownSelectContent,
  DropdownSelectOption,
} from '@codapet/design-system'

const [value, setValue] = useState('')

<DropdownSelect value={value} onValueChange={setValue} placeholder="Select">
  <DropdownSelectTrigger />
  <DropdownSelectContent>
    <DropdownSelectOption value="opt1" label="Option 1" />
    <DropdownSelectOption value="opt2" label="Option 2" />
    <DropdownSelectOption value="opt3" label="Option 3" />
    <DropdownSelectOption value="opt4" label="Option 4" />
    <DropdownSelectOption value="opt5" label="Option 5" />
  </DropdownSelectContent>
</DropdownSelect>`}
          />
        </CardContent>
      </Card>

      {/* With Icon */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            With Left Icon
          </CardTitle>
          <CardDescription>
            Dropdown with a leading icon in the trigger.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-w-xs">
            <DropdownSelect
              value={withIcon}
              onValueChange={setWithIcon}
              placeholder="Select"
              icon={<CircleUser />}
            >
              <DropdownSelectTrigger />
              <DropdownSelectContent>
                <DropdownSelectOption value="opt1" label="Option 1" />
                <DropdownSelectOption value="opt2" label="Option 2" />
                <DropdownSelectOption value="opt3" label="Option 3" />
                <DropdownSelectOption value="opt4" label="Option 4" />
                <DropdownSelectOption value="opt5" label="Option 5" />
              </DropdownSelectContent>
            </DropdownSelect>
          </div>
          <CodeBlock
            code={`import { CircleUser } from 'lucide-react'

<DropdownSelect
  value={value}
  onValueChange={setValue}
  placeholder="Select"
  icon={<CircleUser />}
>
  <DropdownSelectTrigger />
  <DropdownSelectContent>
    <DropdownSelectOption value="opt1" label="Option 1" />
    <DropdownSelectOption value="opt2" label="Option 2" />
  </DropdownSelectContent>
</DropdownSelect>`}
          />
        </CardContent>
      </Card>

      {/* With Label */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            With Label
          </CardTitle>
          <CardDescription>
            Dropdown with a label and optional mandatory indicator.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 max-w-xs">
              <DropdownSelectLabel>Label</DropdownSelectLabel>
              <DropdownSelect
                value={labelVal}
                onValueChange={setLabelVal}
                placeholder="Select"
                icon={<CircleUser />}
              >
                <DropdownSelectTrigger />
                <DropdownSelectContent>
                  <DropdownSelectOption value="opt1" label="Option 1" />
                  <DropdownSelectOption value="opt2" label="Option 2" />
                  <DropdownSelectOption value="opt3" label="Option 3" />
                </DropdownSelectContent>
              </DropdownSelect>
            </div>
            <div className="flex flex-col gap-2 max-w-xs">
              <DropdownSelectLabel mandatory>Label</DropdownSelectLabel>
              <DropdownSelect
                placeholder="Select"
                icon={<CircleUser />}
              >
                <DropdownSelectTrigger />
                <DropdownSelectContent>
                  <DropdownSelectOption value="opt1" label="Option 1" />
                  <DropdownSelectOption value="opt2" label="Option 2" />
                  <DropdownSelectOption value="opt3" label="Option 3" />
                </DropdownSelectContent>
              </DropdownSelect>
            </div>
          </div>
          <CodeBlock
            code={`import { DropdownSelectLabel } from '@codapet/design-system'

{/* With label */}
<div className="flex flex-col gap-2">
  <DropdownSelectLabel>Label</DropdownSelectLabel>
  <DropdownSelect placeholder="Select" icon={<CircleUser />}>
    <DropdownSelectTrigger />
    <DropdownSelectContent>
      <DropdownSelectOption value="opt1" label="Option 1" />
    </DropdownSelectContent>
  </DropdownSelect>
</div>

{/* With mandatory label */}
<div className="flex flex-col gap-2">
  <DropdownSelectLabel mandatory>Label</DropdownSelectLabel>
  <DropdownSelect placeholder="Select" icon={<CircleUser />}>
    <DropdownSelectTrigger />
    <DropdownSelectContent>...</DropdownSelectContent>
  </DropdownSelect>
</div>`}
          />
        </CardContent>
      </Card>

      {/* Error State */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            Error State
          </CardTitle>
          <CardDescription>
            Dropdown with error styling for validation feedback.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2 max-w-xs">
            <DropdownSelectLabel>Label</DropdownSelectLabel>
            <DropdownSelect
              value={errorVal}
              onValueChange={setErrorVal}
              placeholder="Select"
              icon={<CircleUser />}
              error
            >
              <DropdownSelectTrigger />
              <DropdownSelectContent>
                <DropdownSelectOption value="opt1" label="Option 1" />
                <DropdownSelectOption value="opt2" label="Option 2" />
                <DropdownSelectOption value="opt3" label="Option 3" />
              </DropdownSelectContent>
            </DropdownSelect>
          </div>
          <CodeBlock
            code={`<DropdownSelect
  placeholder="Select"
  icon={<CircleUser />}
  error
>
  <DropdownSelectTrigger />
  <DropdownSelectContent>
    <DropdownSelectOption value="opt1" label="Option 1" />
  </DropdownSelectContent>
</DropdownSelect>`}
          />
        </CardContent>
      </Card>

      {/* Disabled State */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            Disabled State
          </CardTitle>
          <CardDescription>
            Dropdown in disabled state with reduced opacity.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2 max-w-xs">
            <DropdownSelectLabel>Label</DropdownSelectLabel>
            <DropdownSelect
              placeholder="Select"
              icon={<CircleUser />}
              disabled
            >
              <DropdownSelectTrigger />
              <DropdownSelectContent>
                <DropdownSelectOption value="opt1" label="Option 1" />
              </DropdownSelectContent>
            </DropdownSelect>
          </div>
          <CodeBlock
            code={`<DropdownSelect
  placeholder="Select"
  icon={<CircleUser />}
  disabled
>
  <DropdownSelectTrigger />
  <DropdownSelectContent>
    <DropdownSelectOption value="opt1" label="Option 1" />
  </DropdownSelectContent>
</DropdownSelect>`}
          />
        </CardContent>
      </Card>

      {/* Scrollable (Many Options) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            Many Options (Scrollable)
          </CardTitle>
          <CardDescription>
            Dropdown with many options that activates a scrollable menu with
            custom scrollbar styling.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2 max-w-xs">
            <DropdownSelectLabel>Label</DropdownSelectLabel>
            <DropdownSelect
              value={scrollVal}
              onValueChange={setScrollVal}
              placeholder="Select"
              icon={<CircleUser />}
            >
              <DropdownSelectTrigger />
              <DropdownSelectContent>
                <DropdownSelectOption value="opt1" label="Option 1" />
                <DropdownSelectOption value="opt2" label="Option 2" />
                <DropdownSelectOption value="opt3" label="Option 3" />
                <DropdownSelectOption value="opt4" label="Option 4" />
                <DropdownSelectOption value="opt5" label="Option 5" />
                <DropdownSelectOption value="opt6" label="Option 6" />
                <DropdownSelectOption value="opt7" label="Option 7" />
                <DropdownSelectOption value="opt8" label="Option 8" />
              </DropdownSelectContent>
            </DropdownSelect>
          </div>
          {scrollVal && (
            <p className="text-sm text-muted-foreground">
              Selected: {scrollVal}
            </p>
          )}
          <CodeBlock
            code={`<DropdownSelect
  value={value}
  onValueChange={setValue}
  placeholder="Select"
  icon={<CircleUser />}
>
  <DropdownSelectTrigger />
  <DropdownSelectContent>
    <DropdownSelectOption value="opt1" label="Option 1" />
    <DropdownSelectOption value="opt2" label="Option 2" />
    <DropdownSelectOption value="opt3" label="Option 3" />
    <DropdownSelectOption value="opt4" label="Option 4" />
    <DropdownSelectOption value="opt5" label="Option 5" />
    <DropdownSelectOption value="opt6" label="Option 6" />
    <DropdownSelectOption value="opt7" label="Option 7" />
    <DropdownSelectOption value="opt8" label="Option 8" />
  </DropdownSelectContent>
</DropdownSelect>`}
          />
        </CardContent>
      </Card>
    </div>
  )
}
