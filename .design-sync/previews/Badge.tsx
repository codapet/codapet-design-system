import { Badge } from '@codapet/design-system'

// Appointment status badges across every variant.
export const Variants = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Badge variant="default">Confirmed</Badge>
    <Badge variant="secondary">Pending</Badge>
    <Badge variant="outline">Awaiting vet</Badge>
    <Badge variant="destructive">Cancelled</Badge>
  </div>
)
