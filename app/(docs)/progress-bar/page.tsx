'use client'

import { ProgressBar } from '@/components/ui/progress-bar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useState } from 'react'
import { CodeBlock } from '../buttons/CodeBlock'

export default function ProgressBarPage() {
  const [step, setStep] = useState(1)

  return (
    <div className="flex flex-col gap-8 w-screen md:w-full px-4">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3 md:mb-4">
          Progress Bar
        </h2>
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
          Step-based progress bar for desktop and mobile layouts
        </p>
      </div>

      {/* Desktop - All Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Desktop — All Steps
          </CardTitle>
          <CardDescription>
            Desktop progress bar (360px wide) showing steps 1 through 7.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 5, 6, 7].map((s) => (
              <div key={s} className="flex items-center gap-4">
                <span className="text-xs font-medium text-muted-foreground w-16">
                  Step {s}/7
                </span>
                <ProgressBar currentStep={s} totalSteps={7} device="desktop" />
              </div>
            ))}
          </div>
          <CodeBlock
            code={`import { ProgressBar } from '@codapet/design-system'

{/* Step 1 of 7 */}
<ProgressBar currentStep={1} totalSteps={7} device="desktop" />

{/* Step 4 of 7 */}
<ProgressBar currentStep={4} totalSteps={7} device="desktop" />

{/* Step 7 of 7 (complete) */}
<ProgressBar currentStep={7} totalSteps={7} device="desktop" />`}
          />
        </CardContent>
      </Card>

      {/* Mobile - All Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Mobile — All Steps
          </CardTitle>
          <CardDescription>
            Mobile progress bar (342px wide) showing steps 1 through 7.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 5, 6, 7].map((s) => (
              <div key={s} className="flex items-center gap-4">
                <span className="text-xs font-medium text-muted-foreground w-16">
                  Step {s}/7
                </span>
                <ProgressBar currentStep={s} totalSteps={7} device="mobile" />
              </div>
            ))}
          </div>
          <CodeBlock
            code={`{/* Mobile variant */}
<ProgressBar currentStep={1} totalSteps={7} device="mobile" />

<ProgressBar currentStep={4} totalSteps={7} device="mobile" />`}
          />
        </CardContent>
      </Card>

      {/* Interactive */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Interactive
          </CardTitle>
          <CardDescription>
            Click the buttons to step through the progress bar. The fill
            animates smoothly between steps.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4">
            <ProgressBar currentStep={step} totalSteps={7} device="desktop" />
            <div className="flex items-center gap-3">
              <button
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step <= 1}
                className="px-3 py-1.5 text-sm font-medium rounded-[8px] border border-gray-stroke-default text-vibrant-text-heading disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-surface-light transition-colors cursor-pointer"
              >
                Previous
              </button>
              <span className="text-sm font-medium text-muted-foreground">
                Step {step} of 7
              </span>
              <button
                onClick={() => setStep((s) => Math.min(7, s + 1))}
                disabled={step >= 7}
                className="px-3 py-1.5 text-sm font-medium rounded-[8px] border border-gray-stroke-default text-vibrant-text-heading disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-surface-light transition-colors cursor-pointer"
              >
                Next
              </button>
              <button
                onClick={() => setStep(1)}
                className="px-3 py-1.5 text-sm font-medium rounded-[8px] border border-gray-stroke-default text-vibrant-text-heading hover:bg-gray-surface-light transition-colors cursor-pointer ml-auto"
              >
                Reset
              </button>
            </div>
          </div>
          <CodeBlock
            code={`const [step, setStep] = useState(1)

<ProgressBar currentStep={step} totalSteps={7} device="desktop" />

<button onClick={() => setStep(s => Math.min(7, s + 1))}>Next</button>
<button onClick={() => setStep(s => Math.max(1, s - 1))}>Previous</button>`}
          />
        </CardContent>
      </Card>

      {/* Percentage Value */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            Percentage Value
          </CardTitle>
          <CardDescription>
            Use the <code>value</code> prop for direct percentage control
            instead of steps.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3">
            {[0, 25, 50, 75, 100].map((v) => (
              <div key={v} className="flex items-center gap-4">
                <span className="text-xs font-medium text-muted-foreground w-10">
                  {v}%
                </span>
                <ProgressBar value={v} device="desktop" />
              </div>
            ))}
          </div>
          <CodeBlock
            code={`{/* Direct percentage control */}
<ProgressBar value={0} />
<ProgressBar value={25} />
<ProgressBar value={50} />
<ProgressBar value={75} />
<ProgressBar value={100} />`}
          />
        </CardContent>
      </Card>

      {/* Custom Width */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            Full Width
          </CardTitle>
          <CardDescription>
            Override the default width with a custom className to make it
            full-width or any other size.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ProgressBar
            currentStep={4}
            totalSteps={7}
            className="w-full"
          />
          <CodeBlock
            code={`{/* Full width - override with className */}
<ProgressBar currentStep={4} totalSteps={7} className="w-full" />`}
          />
        </CardContent>
      </Card>
    </div>
  )
}
