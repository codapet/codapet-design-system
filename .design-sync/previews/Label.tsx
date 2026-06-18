import { Input, Label } from '@codapet/design-system'

export const WithField = () => (
  <div className="flex w-72 flex-col gap-1.5">
    <Label htmlFor="pet-name">Pet name</Label>
    <Input id="pet-name" placeholder="e.g. Bella" defaultValue="Bella" />
  </div>
)

export const Sizes = () => (
  <div className="flex flex-col gap-3">
    <Label size="lg">Schedule a home visit</Label>
    <Label size="md">Preferred veterinarian</Label>
    <Label size="sm">Appointment window</Label>
    <Label size="xs">Pet microchip ID</Label>
  </div>
)

export const Required = () => (
  <div className="flex w-72 flex-col gap-1.5">
    <Label htmlFor="owner-email">
      Owner email
      <span className="ml-0.5 text-error-surface-default">*</span>
    </Label>
    <Input id="owner-email" type="email" placeholder="you@codapet.com" />
  </div>
)
