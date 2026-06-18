import { DateRangeInput, Label } from '@codapet/design-system'

// Vet availability window the patient can choose a visit within.
export const AvailabilityWindow = () => (
  <div className="w-80 space-y-2">
    <Label htmlFor="availability-window">Available visit window</Label>
    <DateRangeInput
      className="w-full"
      dateRange={{ from: new Date(2026, 5, 22), to: new Date(2026, 5, 27) }}
      setDateRange={() => {}}
      placeholder="Select a date range"
    />
  </div>
)
