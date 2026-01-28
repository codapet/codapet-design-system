import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { CodeBlock } from '../buttons/CodeBlock'

export default function FormsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Form Elements
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Checkboxes, radio buttons, switches, and other form controls
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Interactive Elements
            </CardTitle>
            <CardDescription>
              Switches, sliders, and progress indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">Airplane mode</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" disabled />
              <Label htmlFor="airplane-mode">disabled Airplane mode</Label>
            </div>
            <div className="space-y-2">
              <Label>Volume</Label>
              <Slider
                defaultValue={[33]}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label>Progress</Label>
              <Progress value={65} className="w-full" />
            </div>
            <CodeBlock
              code={`import { Switch, Label, Slider, Progress } from '@codapet/design-system'

{/* Switch */}
<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane mode</Label>
</div>

{/* Disabled Switch */}
<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" disabled />
  <Label htmlFor="airplane-mode">disabled Airplane mode</Label>
</div>

{/* Slider */}
<div className="space-y-2">
  <Label>Volume</Label>
  <Slider
    defaultValue={[33]}
    max={100}
    step={1}
    className="w-full"
  />
</div>

{/* Progress */}
<div className="space-y-2">
  <Label>Progress</Label>
  <Progress value={65} className="w-full" />
</div>`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              Selection Controls
            </CardTitle>
            <CardDescription>Radio buttons and checkboxes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="option-one"
                  id="option-one"
                  className="size-5"
                />
                <Label htmlFor="option-one">Option One</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="option-two"
                  id="option-two"
                  className="size-5"
                />
                <Label htmlFor="option-two">Option Two</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="option-three"
                  id="option-three"
                  disabled
                  className="size-5"
                />
                <Label htmlFor="option-three">disabled Option </Label>
              </div>
            </RadioGroup>
            <div className="flex items-center space-x-2">
              <Checkbox id="notifications" className="size-5" />
              <Label htmlFor="notifications">Enable notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="notifications" disabled className="size-5" />
              <Label htmlFor="notifications">disabled notifications</Label>
            </div>
            <CodeBlock
                code={`import { RadioGroup, RadioGroupItem, Checkbox, Label  } from '@codapet/design-system'

{/* Radio Group */}
<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem
      value="option-one"
      id="option-one"
      className="size-5"
    />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem
      value="option-two"
      id="option-two"
      className="size-5"
    />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem
      value="option-three"
      id="option-three"
      disabled
      className="size-5"
    />
    <Label htmlFor="option-three">disabled Option</Label>
  </div>
</RadioGroup>

{/* Checkbox */}
<div className="flex items-center space-x-2">
  <Checkbox id="notifications" className="size-5" />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>

{/* Disabled Checkbox */}
<div className="flex items-center space-x-2">
  <Checkbox id="notifications" disabled className="size-5" />
  <Label htmlFor="notifications">disabled notifications</Label>
</div>`}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
