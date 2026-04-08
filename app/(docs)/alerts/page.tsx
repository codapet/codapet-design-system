'use client'

import { AlertBanner } from '@/components/ui/alert-banner'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { AlertTriangle, CheckCircle2, CircleCheckBig, Info } from 'lucide-react'
import { useState } from 'react'
import { CodeBlock } from '../buttons/CodeBlock'

export default function AlertsPage() {
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({})

  const handleDismiss = (key: string) => {
    setDismissed(prev => ({ ...prev, [key]: true }))
  }

  const resetAll = () => setDismissed({})

  return (
    <div className="flex flex-col gap-8 w-screen md:w-full px-4">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3 md:mb-4">
          Alerts
        </h2>
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
          Informative, error, and success alert banners
        </p>
      </div>

      {/* ──── With Icon + Heading ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            With Icon &amp; Heading
          </CardTitle>
          <CardDescription>
            Full alert banners with icon, heading, and body text.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AlertBanner
            type="informative"
            icon={<Info />}
            heading="Heading for the banner"
          >
            If Vet becomes available, the estimated price for this appointment
            will be from $412 - $314. Plus optional cremation cost. Would you
            like to proceed with requesting this appointment?
          </AlertBanner>

          <AlertBanner
            type="error"
            icon={<AlertTriangle />}
            heading="Heading for the banner"
          >
            If Vet becomes available, the estimated price for this appointment
            will be from $412 - $314. Plus optional cremation cost. Would you
            like to proceed with requesting this appointment?
          </AlertBanner>

          <AlertBanner
            type="success"
            icon={<CircleCheckBig />}
            heading="Heading for the banner"
          >
            If Vet becomes available, the estimated price for this appointment
            will be from $412 - $314. Plus optional cremation cost. Would you
            like to proceed with requesting this appointment?
          </AlertBanner>

          <CodeBlock
            code={`import { AlertBanner } from '@codapet/design-system'
import { Info, AlertTriangle, CheckCircle2 } from 'lucide-react'

{/* Informative */}
<AlertBanner type="informative" icon={<Info />} heading="Heading for the banner">
  Body text goes here...
</AlertBanner>

{/* Error */}
<AlertBanner type="error" icon={<AlertTriangle />} heading="Heading for the banner">
  Body text goes here...
</AlertBanner>

{/* Success */}
<AlertBanner type="success" icon={<CheckCircle2 />} heading="Heading for the banner">
  Body text goes here...
</AlertBanner>`}
          />
        </CardContent>
      </Card>

      {/* ──── No Heading ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Without Heading
          </CardTitle>
          <CardDescription>
            Alert banners with icon and body text only (no heading).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AlertBanner type="informative" icon={<Info />}>
            If Vet becomes available, the estimated price for this appointment
            will be from $412 - $314. Plus optional cremation cost. Would you
            like to proceed with requesting this appointment?
          </AlertBanner>

          <AlertBanner type="error" icon={<AlertTriangle />}>
            If Vet becomes available, the estimated price for this appointment
            will be from $412 - $314. Plus optional cremation cost. Would you
            like to proceed with requesting this appointment?
          </AlertBanner>

          <AlertBanner type="success" icon={<CheckCircle2 />}>
            If Vet becomes available, the estimated price for this appointment
            will be from $412 - $314. Plus optional cremation cost. Would you
            like to proceed with requesting this appointment?
          </AlertBanner>

          <CodeBlock
            code={`{/* No heading - just omit the heading prop */}
<AlertBanner type="informative" icon={<Info />}>
  Body text goes here...
</AlertBanner>

<AlertBanner type="error" icon={<AlertTriangle />}>
  Body text goes here...
</AlertBanner>

<AlertBanner type="success" icon={<CheckCircle2 />}>
  Body text goes here...
</AlertBanner>`}
          />
        </CardContent>
      </Card>

      {/* ──── No Icon ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            Without Icon
          </CardTitle>
          <CardDescription>
            Alert banners with heading and body but no icon.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AlertBanner type="informative" heading="Heading for the banner">
            If Vet becomes available, the estimated price for this appointment
            will be from $412 - $314. Plus optional cremation cost. Would you
            like to proceed with requesting this appointment?
          </AlertBanner>

          <AlertBanner type="error" heading="Heading for the banner">
            If Vet becomes available, the estimated price for this appointment
            will be from $412 - $314. Plus optional cremation cost. Would you
            like to proceed with requesting this appointment?
          </AlertBanner>

          <AlertBanner type="success" heading="Heading for the banner">
            If Vet becomes available, the estimated price for this appointment
            will be from $412 - $314. Plus optional cremation cost. Would you
            like to proceed with requesting this appointment?
          </AlertBanner>

          <CodeBlock
            code={`{/* No icon - just omit the icon prop */}
<AlertBanner type="informative" heading="Heading for the banner">
  Body text goes here...
</AlertBanner>

<AlertBanner type="error" heading="Heading for the banner">
  Body text goes here...
</AlertBanner>

<AlertBanner type="success" heading="Heading for the banner">
  Body text goes here...
</AlertBanner>`}
          />
        </CardContent>
      </Card>

      {/* ──── No Icon, No Heading ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Body Only (No Icon, No Heading)
          </CardTitle>
          <CardDescription>
            Minimal alert banners with body text only.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AlertBanner type="informative">
            If Vet becomes available, the estimated price for this appointment
            will be from $412 - $314. Plus optional cremation cost. Would you
            like to proceed with requesting this appointment?
          </AlertBanner>

          <AlertBanner type="error">
            If Vet becomes available, the estimated price for this appointment
            will be from $412 - $314. Plus optional cremation cost. Would you
            like to proceed with requesting this appointment?
          </AlertBanner>

          <AlertBanner type="success">
            If Vet becomes available, the estimated price for this appointment
            will be from $412 - $314. Plus optional cremation cost. Would you
            like to proceed with requesting this appointment?
          </AlertBanner>

          <CodeBlock
            code={`{/* Body only */}
<AlertBanner type="informative">
  Body text goes here...
</AlertBanner>

<AlertBanner type="error">
  Body text goes here...
</AlertBanner>

<AlertBanner type="success">
  Body text goes here...
</AlertBanner>`}
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
            Alert banners with a close button. Click X to dismiss.{' '}
            <button
              onClick={resetAll}
              className="text-primary-stroke-default underline cursor-pointer"
            >
              Reset all
            </button>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!dismissed['d-info'] && (
            <AlertBanner
              type="informative"
              icon={<Info />}
              heading="Heading for the banner"
              dismissible
              onDismiss={() => handleDismiss('d-info')}
            >
              If Vet becomes available, the estimated price for this appointment
              will be from $412 - $314. Plus optional cremation cost. Would you
              like to proceed with requesting this appointment?
            </AlertBanner>
          )}

          {!dismissed['d-error'] && (
            <AlertBanner
              type="error"
              icon={<AlertTriangle />}
              heading="Heading for the banner"
              dismissible
              onDismiss={() => handleDismiss('d-error')}
            >
              If Vet becomes available, the estimated price for this appointment
              will be from $412 - $314. Plus optional cremation cost. Would you
              like to proceed with requesting this appointment?
            </AlertBanner>
          )}

          {!dismissed['d-success'] && (
            <AlertBanner
              type="success"
              icon={<CheckCircle2 />}
              heading="Heading for the banner"
              dismissible
              onDismiss={() => handleDismiss('d-success')}
            >
              If Vet becomes available, the estimated price for this appointment
              will be from $412 - $314. Plus optional cremation cost. Would you
              like to proceed with requesting this appointment?
            </AlertBanner>
          )}

          {!dismissed['d-no-heading'] && (
            <AlertBanner
              type="informative"
              icon={<Info />}
              dismissible
              onDismiss={() => handleDismiss('d-no-heading')}
            >
              Dismissible alert without heading. Click the X to dismiss.
            </AlertBanner>
          )}

          {!dismissed['d-no-icon'] && (
            <AlertBanner
              type="informative"
              heading="Heading for the banner"
              dismissible
              onDismiss={() => handleDismiss('d-no-icon')}
            >
              Dismissible alert without icon. Click the X to dismiss.
            </AlertBanner>
          )}

          <CodeBlock
            code={`import { AlertBanner } from '@codapet/design-system'
import { Info } from 'lucide-react'

const [show, setShow] = useState(true)

{show && (
  <AlertBanner
    type="informative"
    icon={<Info />}
    heading="Heading for the banner"
    dismissible
    onDismiss={() => setShow(false)}
  >
    Body text goes here...
  </AlertBanner>
)}`}
          />
        </CardContent>
      </Card>
    </div>
  )
}
