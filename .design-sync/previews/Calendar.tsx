import { Calendar } from '@codapet/design-system'

// In-home pet vet booking: a single month with a selected visit date.
export const VisitDate = () => (
  <div className="inline-block rounded-lg border border-sand-stroke-soft p-2">
    <Calendar
      mode="single"
      selected={new Date(2026, 5, 24)}
      defaultMonth={new Date(2026, 5, 24)}
      onSelect={() => {}}
      today={new Date(2026, 5, 18)}
    />
  </div>
)

// Booking window: a range of available in-home visit days highlighted.
export const AvailabilityWindow = () => (
  <div className="inline-block rounded-lg border border-sand-stroke-soft p-2">
    <Calendar
      mode="range"
      selected={{ from: new Date(2026, 5, 22), to: new Date(2026, 5, 27) }}
      defaultMonth={new Date(2026, 5, 22)}
      onSelect={() => {}}
      today={new Date(2026, 5, 18)}
    />
  </div>
)
