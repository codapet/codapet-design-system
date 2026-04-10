'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { OptionCard } from '@/components/ui/option-card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useState } from 'react'
import { CodeBlock } from '../buttons/CodeBlock'

export default function SelectionControlsPage() {
  const [singleRight, setSingleRight] = useState<string | null>(null)
  const [multiRight, setMultiRight] = useState<Set<string>>(new Set())
  const [singleLeft, setSingleLeft] = useState<string | null>(null)
  const [multiLeft, setMultiLeft] = useState<Set<string>>(new Set())
  const [singleNoStroke, setSingleNoStroke] = useState<string | null>(null)
  const [multiNoStroke, setMultiNoStroke] = useState<Set<string>>(new Set())
  const [singleResizable, setSingleResizable] = useState<string | null>(null)
  const [multiResizable, setMultiResizable] = useState<Set<string>>(new Set())

  const toggleMulti = (
    set: Set<string>,
    setter: React.Dispatch<React.SetStateAction<Set<string>>>,
    value: string
  ) => {
    const next = new Set(set)
    if (next.has(value)) next.delete(value)
    else next.add(value)
    setter(next)
  }

  return (
    <div className="flex flex-col gap-8 w-screen md:w-full px-4">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3 md:mb-4">
          Selection Controls
        </h2>
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
          Checkboxes, radio buttons, and option cards for selection
        </p>
      </div>

      {/* ──── Standalone Checkboxes ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Checkboxes
          </CardTitle>
          <CardDescription>
            Checkbox states: default, checked, disabled, and disabled checked.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <Checkbox id="cb-default" />
              <Label htmlFor="cb-default" size="sm">Default</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="cb-checked" defaultChecked />
              <Label htmlFor="cb-checked" size="sm">Checked</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="cb-disabled" disabled />
              <Label htmlFor="cb-disabled" size="sm" className="opacity-40">Disabled</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="cb-disabled-checked" disabled defaultChecked />
              <Label htmlFor="cb-disabled-checked" size="sm" className="opacity-40">Disabled Checked</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ──── Standalone Radio Buttons ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Radio Buttons
          </CardTitle>
          <CardDescription>
            Radio button states: default, selected, disabled, and disabled selected.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-8">
            <RadioGroup defaultValue="selected">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="default" id="rb-default" />
                <Label htmlFor="rb-default" size="sm">Default</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="selected" id="rb-selected" />
                <Label htmlFor="rb-selected" size="sm">Selected</Label>
              </div>
            </RadioGroup>
            <RadioGroup defaultValue="dis-selected" disabled>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="dis-default" id="rb-dis-default" />
                <Label htmlFor="rb-dis-default" size="sm" className="opacity-40">Disabled</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="dis-selected" id="rb-dis-selected" />
                <Label htmlFor="rb-dis-selected" size="sm" className="opacity-40">Disabled Selected</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* ──── Option Cards — Selector on Right, With Stroke, Hug ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Option Cards — Selector Right, Hug Width
          </CardTitle>
          <CardDescription>
            Bordered option cards with the selector on the right. Auto-width (hug content).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground font-medium">Single Selection (Radio)</p>
            <div className="flex flex-wrap gap-3">
              <OptionCard selected={singleRight === 'a'} onClick={() => setSingleRight('a')}>Option</OptionCard>
              <OptionCard selected={singleRight === 'b'} onClick={() => setSingleRight('b')}>Option</OptionCard>
              <OptionCard selected disabled>Option</OptionCard>
              <OptionCard disabled>Option</OptionCard>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground font-medium">Multiple Selection (Checkbox)</p>
            <div className="flex flex-wrap gap-3">
              <OptionCard selectionType="multiple" selected={multiRight.has('a')} onClick={() => toggleMulti(multiRight, setMultiRight, 'a')}>Option</OptionCard>
              <OptionCard selectionType="multiple" selected={multiRight.has('b')} onClick={() => toggleMulti(multiRight, setMultiRight, 'b')}>Option</OptionCard>
              <OptionCard selectionType="multiple" selected disabled>Option</OptionCard>
              <OptionCard selectionType="multiple" disabled>Option</OptionCard>
            </div>
          </div>

          <CodeBlock
            code={`import { OptionCard } from '@codapet/design-system'

{/* Single selection (radio) */}
<OptionCard selected={selected === 'a'} onClick={() => setSelected('a')}>
  Option
</OptionCard>

{/* Multiple selection (checkbox) */}
<OptionCard selectionType="multiple" selected={checked} onClick={toggle}>
  Option
</OptionCard>

{/* Disabled */}
<OptionCard disabled>Option</OptionCard>
<OptionCard selected disabled>Option</OptionCard>`}
          />
        </CardContent>
      </Card>

      {/* ──── Option Cards — Selector on Right, Resizable ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            Option Cards — Selector Right, Resizable Width
          </CardTitle>
          <CardDescription>
            Full-width option cards with the selector on the right.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground font-medium">Single Selection (Radio)</p>
            <div className="flex flex-col gap-3 max-w-sm">
              <OptionCard weight="resizable" selected={singleResizable === 'a'} onClick={() => setSingleResizable('a')}>Option</OptionCard>
              <OptionCard weight="resizable" selected={singleResizable === 'b'} onClick={() => setSingleResizable('b')}>Option</OptionCard>
              <OptionCard weight="resizable" selected disabled>Option</OptionCard>
              <OptionCard weight="resizable" disabled>Option</OptionCard>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground font-medium">Multiple Selection (Checkbox)</p>
            <div className="flex flex-col gap-3 max-w-sm">
              <OptionCard selectionType="multiple" weight="resizable" selected={multiResizable.has('a')} onClick={() => toggleMulti(multiResizable, setMultiResizable, 'a')}>Option</OptionCard>
              <OptionCard selectionType="multiple" weight="resizable" selected={multiResizable.has('b')} onClick={() => toggleMulti(multiResizable, setMultiResizable, 'b')}>Option</OptionCard>
              <OptionCard selectionType="multiple" weight="resizable" selected disabled>Option</OptionCard>
              <OptionCard selectionType="multiple" weight="resizable" disabled>Option</OptionCard>
            </div>
          </div>

          <CodeBlock
            code={`{/* Full-width option cards */}
<OptionCard weight="resizable" selected={selected === 'a'} onClick={() => setSelected('a')}>
  Option
</OptionCard>

<OptionCard selectionType="multiple" weight="resizable" selected={checked} onClick={toggle}>
  Option
</OptionCard>`}
          />
        </CardContent>
      </Card>

      {/* ──── Option Cards — Selector on Left, With Stroke ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            Option Cards — Selector Left, With Stroke
          </CardTitle>
          <CardDescription>
            Bordered option cards with the selector on the left.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground font-medium">Single Selection — Hug</p>
            <div className="flex flex-wrap gap-3">
              <OptionCard selectorPosition="left" selected={singleLeft === 'a'} onClick={() => setSingleLeft('a')}>Option</OptionCard>
              <OptionCard selectorPosition="left" selected={singleLeft === 'b'} onClick={() => setSingleLeft('b')}>Option</OptionCard>
              <OptionCard selectorPosition="left" selected disabled>Option</OptionCard>
              <OptionCard selectorPosition="left" disabled>Option</OptionCard>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground font-medium">Multiple Selection — Hug</p>
            <div className="flex flex-wrap gap-3">
              <OptionCard selectorPosition="left" selectionType="multiple" selected={multiLeft.has('a')} onClick={() => toggleMulti(multiLeft, setMultiLeft, 'a')}>Option</OptionCard>
              <OptionCard selectorPosition="left" selectionType="multiple" selected={multiLeft.has('b')} onClick={() => toggleMulti(multiLeft, setMultiLeft, 'b')}>Option</OptionCard>
              <OptionCard selectorPosition="left" selectionType="multiple" selected disabled>Option</OptionCard>
              <OptionCard selectorPosition="left" selectionType="multiple" disabled>Option</OptionCard>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground font-medium">Single Selection — Resizable</p>
            <div className="flex flex-col gap-3 max-w-sm">
              <OptionCard selectorPosition="left" weight="resizable" selected>Option</OptionCard>
              <OptionCard selectorPosition="left" weight="resizable">Option</OptionCard>
            </div>
          </div>

          <CodeBlock
            code={`{/* Selector on the left */}
<OptionCard selectorPosition="left" selected={selected === 'a'} onClick={() => setSelected('a')}>
  Option
</OptionCard>

{/* Left + checkbox */}
<OptionCard selectorPosition="left" selectionType="multiple" selected={checked} onClick={toggle}>
  Option
</OptionCard>

{/* Left + resizable */}
<OptionCard selectorPosition="left" weight="resizable" selected>
  Option
</OptionCard>`}
          />
        </CardContent>
      </Card>

      {/* ──── Option Cards — No Stroke ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            Option Cards — No Stroke
          </CardTitle>
          <CardDescription>
            Borderless option cards with the selector on the left.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground font-medium">Single Selection (Radio)</p>
            <div className="flex flex-wrap gap-3">
              <OptionCard hasStroke={false} selectorPosition="left" selected={singleNoStroke === 'a'} onClick={() => setSingleNoStroke('a')}>Option</OptionCard>
              <OptionCard hasStroke={false} selectorPosition="left" selected={singleNoStroke === 'b'} onClick={() => setSingleNoStroke('b')}>Option</OptionCard>
              <OptionCard hasStroke={false} selectorPosition="left" selected disabled>Option</OptionCard>
              <OptionCard hasStroke={false} selectorPosition="left" disabled>Option</OptionCard>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground font-medium">Multiple Selection (Checkbox)</p>
            <div className="flex flex-wrap gap-3">
              <OptionCard hasStroke={false} selectorPosition="left" selectionType="multiple" selected={multiNoStroke.has('a')} onClick={() => toggleMulti(multiNoStroke, setMultiNoStroke, 'a')}>Option</OptionCard>
              <OptionCard hasStroke={false} selectorPosition="left" selectionType="multiple" selected={multiNoStroke.has('b')} onClick={() => toggleMulti(multiNoStroke, setMultiNoStroke, 'b')}>Option</OptionCard>
              <OptionCard hasStroke={false} selectorPosition="left" selectionType="multiple" selected disabled>Option</OptionCard>
              <OptionCard hasStroke={false} selectorPosition="left" selectionType="multiple" disabled>Option</OptionCard>
            </div>
          </div>

          <CodeBlock
            code={`{/* No stroke (borderless) */}
<OptionCard hasStroke={false} selectorPosition="left" selected>
  Option
</OptionCard>

<OptionCard hasStroke={false} selectorPosition="left" selectionType="multiple" selected>
  Option
</OptionCard>`}
          />
        </CardContent>
      </Card>
    </div>
  )
}
