import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { CodeBlock } from '../buttons/CodeBlock'

export default function InteractivePage() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Interactive Components
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Sliders, progress bars, and interactive controls
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Interactive Controls
          </CardTitle>
          <CardDescription>
            Sliders, switches, and progress indicators
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Airplane mode</Label>
          </div>
          <div className="space-y-2">
            <Label>Volume</Label>
            <Slider defaultValue={[33]} max={100} step={1} className="w-full" />
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

{/* Slider */}
<div className="space-y-2">
  <Label>Volume</Label>
  <Slider defaultValue={[33]} max={100} step={1} className="w-full" />
</div>

{/* Progress */}
<div className="space-y-2">
  <Label>Progress</Label>
  <Progress value={65} className="w-full" />
</div>`}
          />
        </CardContent>
      </Card>
    </div>
  )
}
