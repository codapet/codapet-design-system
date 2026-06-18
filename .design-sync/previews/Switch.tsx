import { Switch, Label } from '@codapet/design-system'

export const NotificationSettings = () => (
  <div className="flex w-80 flex-col gap-5">
    <div className="flex items-center justify-between">
      <div className="grid gap-0.5">
        <Label htmlFor="notify-sms">Text reminders</Label>
        <p className="text-sm text-muted-foreground">
          Visit confirmations and arrival updates.
        </p>
      </div>
      <Switch id="notify-sms" defaultChecked />
    </div>
    <div className="flex items-center justify-between">
      <div className="grid gap-0.5">
        <Label htmlFor="notify-email">Email summaries</Label>
        <p className="text-sm text-muted-foreground">
          After-visit care notes from your vet.
        </p>
      </div>
      <Switch id="notify-email" defaultChecked />
    </div>
    <div className="flex items-center justify-between">
      <div className="grid gap-0.5">
        <Label htmlFor="notify-marketing">Wellness tips</Label>
        <p className="text-sm text-muted-foreground">
          Occasional pet health newsletters.
        </p>
      </div>
      <Switch id="notify-marketing" />
    </div>
  </div>
)

export const StatesRow = () => (
  <div className="flex items-center gap-6">
    <div className="flex items-center gap-2">
      <Switch id="sw-on" defaultChecked />
      <Label htmlFor="sw-on">On</Label>
    </div>
    <div className="flex items-center gap-2">
      <Switch id="sw-off" />
      <Label htmlFor="sw-off">Off</Label>
    </div>
  </div>
)
