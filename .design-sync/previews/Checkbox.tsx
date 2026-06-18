import { Checkbox, Label } from '@codapet/design-system'

export const AppointmentConsents = () => (
  <div className="flex w-80 flex-col gap-4">
    <div className="flex items-start gap-3">
      <Checkbox id="consent-records" defaultChecked />
      <div className="grid gap-1">
        <Label htmlFor="consent-records">Share medical records</Label>
        <p className="text-sm text-muted-foreground">
          Allow your vet to review prior visit history before the home visit.
        </p>
      </div>
    </div>
    <div className="flex items-start gap-3">
      <Checkbox id="consent-reminders" />
      <div className="grid gap-1">
        <Label htmlFor="consent-reminders">Appointment reminders</Label>
        <p className="text-sm text-muted-foreground">
          Get an SMS the morning of your scheduled visit.
        </p>
      </div>
    </div>
    <div className="flex items-start gap-3">
      <Checkbox id="consent-locked" defaultChecked disabled />
      <div className="grid gap-1">
        <Label htmlFor="consent-locked">Service agreement</Label>
        <p className="text-sm text-muted-foreground">
          Required to book in-home euthanasia care.
        </p>
      </div>
    </div>
  </div>
)

export const StatesRow = () => (
  <div className="flex items-center gap-6">
    <div className="flex items-center gap-2">
      <Checkbox id="cb-on" defaultChecked />
      <Label htmlFor="cb-on">Checked</Label>
    </div>
    <div className="flex items-center gap-2">
      <Checkbox id="cb-off" />
      <Label htmlFor="cb-off">Unchecked</Label>
    </div>
    <div className="flex items-center gap-2">
      <Checkbox id="cb-disabled" disabled />
      <Label htmlFor="cb-disabled">Disabled</Label>
    </div>
  </div>
)
