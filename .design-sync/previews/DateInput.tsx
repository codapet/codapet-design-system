import { DateInput, Label } from '@codapet/design-system'

// Scheduling the in-home visit date for a patient.
export const VisitDate = () => (
  <div className="w-72 space-y-2">
    <Label htmlFor="visit-date">Preferred visit date</Label>
    <DateInput
      id="visit-date"
      date={new Date(2026, 5, 24)}
      setDate={() => {}}
      minDate={new Date(2026, 5, 18)}
    />
  </div>
)
