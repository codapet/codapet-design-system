'use client'

import { MultiSelectFreeText } from '@/components/ui/multi-select-free-text'
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

const defaultOptions = [
  { value: 'Free text', label: 'Free text' },
  { value: 'Option 2', label: 'Option 2' },
  { value: 'Option 3', label: 'Option 3' },
  { value: 'Option 4', label: 'Option 4' },
  { value: 'Option 5', label: 'Option 5' },
  { value: 'Option 6', label: 'Option 6' },
  { value: 'Option 7', label: 'Option 7' },
  { value: 'Option 8', label: 'Option 8' }
]

export default function MultiSelectFreeTextPage() {
  const [basicValues, setBasicValues] = useState<string[]>([])
  const [iconValues, setIconValues] = useState<string[]>([])
  const [prefilledValues, setPrefilledValues] = useState<string[]>([
    'Tag 1',
    'Tag 2',
    'Tag 3'
  ])
  const [freeTextValues, setFreeTextValues] = useState<string[]>([])
  const [noOptionsValues, setNoOptionsValues] = useState<string[]>([])

  return (
    <div className="flex flex-col gap-8 w-screen md:w-full px-4">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3 md:mb-4">
          Multi Select Free Text
        </h2>
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
          A free-text multi-select input with removable tags, dropdown
          suggestions, and keyboard navigation
        </p>
      </div>

      {/* Basic with Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Basic with Suggestions
          </CardTitle>
          <CardDescription>
            Click or type to add tags. Suggestions appear from a predefined
            list. Press Enter to add free text or select a suggestion.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-w-lg">
            <MultiSelectFreeText
              label="Label"
              icon={<CircleUser />}
              options={defaultOptions}
              values={basicValues}
              onValuesChange={setBasicValues}
            />
          </div>
          {basicValues.length > 0 && (
            <p className="text-sm text-muted-foreground">
              Tags: {basicValues.join(', ')}
            </p>
          )}
          <CodeBlock
            code={`import { MultiSelectFreeText } from '@codapet/design-system'
import { CircleUser } from 'lucide-react'

const options = [
  { value: 'Free text', label: 'Free text' },
  { value: 'Option 2', label: 'Option 2' },
  { value: 'Option 3', label: 'Option 3' },
]

const [values, setValues] = useState<string[]>([])

<MultiSelectFreeText
  label="Label"
  icon={<CircleUser />}
  options={options}
  values={values}
  onValuesChange={setValues}
/>`}
          />
        </CardContent>
      </Card>

      {/* With Icon and Label */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            With Mandatory Label
          </CardTitle>
          <CardDescription>
            Label with a mandatory asterisk indicator and left icon.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-w-lg">
            <MultiSelectFreeText
              label="Label"
              mandatory
              icon={<CircleUser />}
              options={defaultOptions}
              values={iconValues}
              onValuesChange={setIconValues}
            />
          </div>
          <CodeBlock
            code={`<MultiSelectFreeText
  label="Label"
  mandatory
  icon={<CircleUser />}
  options={options}
  values={values}
  onValuesChange={setValues}
/>`}
          />
        </CardContent>
      </Card>

      {/* Pre-filled Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Pre-filled Tags
          </CardTitle>
          <CardDescription>
            Start with existing tags. Click X on any tag to remove it.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-w-lg">
            <MultiSelectFreeText
              label="Label"
              icon={<CircleUser />}
              options={defaultOptions}
              values={prefilledValues}
              onValuesChange={setPrefilledValues}
            />
          </div>
          {prefilledValues.length > 0 && (
            <p className="text-sm text-muted-foreground">
              Tags: {prefilledValues.join(', ')}
            </p>
          )}
          <CodeBlock
            code={`const [values, setValues] = useState(['Tag 1', 'Tag 2', 'Tag 3'])

<MultiSelectFreeText
  label="Label"
  icon={<CircleUser />}
  options={options}
  values={values}
  onValuesChange={setValues}
/>`}
          />
        </CardContent>
      </Card>

      {/* Free Text Only (no suggestions) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            Free Text Only
          </CardTitle>
          <CardDescription>
            No predefined options. Type anything and press Enter to create tags.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-w-lg">
            <MultiSelectFreeText
              label="Label"
              icon={<CircleUser />}
              placeholder="Type and press Enter..."
              values={freeTextValues}
              onValuesChange={setFreeTextValues}
            />
          </div>
          {freeTextValues.length > 0 && (
            <p className="text-sm text-muted-foreground">
              Tags: {freeTextValues.join(', ')}
            </p>
          )}
          <CodeBlock
            code={`{/* No options prop - pure free text */}
<MultiSelectFreeText
  label="Label"
  icon={<CircleUser />}
  placeholder="Type and press Enter..."
  values={values}
  onValuesChange={setValues}
/>`}
          />
        </CardContent>
      </Card>

      {/* Disabled */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            Disabled State
          </CardTitle>
          <CardDescription>
            Disabled multi-select with pre-filled tags that cannot be modified.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-w-lg">
            <MultiSelectFreeText
              label="Label"
              icon={<CircleUser />}
              defaultValues={['Tag 1', 'Tag 2']}
              disabled
            />
          </div>
          <CodeBlock
            code={`<MultiSelectFreeText
  label="Label"
  icon={<CircleUser />}
  defaultValues={['Tag 1', 'Tag 2']}
  disabled
/>`}
          />
        </CardContent>
      </Card>

      {/* Without Icon */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            Without Icon
          </CardTitle>
          <CardDescription>
            Multi-select without a left icon.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-w-lg">
            <MultiSelectFreeText
              label="Label"
              options={defaultOptions}
              values={noOptionsValues}
              onValuesChange={setNoOptionsValues}
              placeholder="Add tags..."
            />
          </div>
          <CodeBlock
            code={`{/* Omit the icon prop */}
<MultiSelectFreeText
  label="Label"
  options={options}
  values={values}
  onValuesChange={setValues}
  placeholder="Add tags..."
/>`}
          />
        </CardContent>
      </Card>
    </div>
  )
}
