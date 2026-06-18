import { Label, Textarea } from '@codapet/design-system'

export const VisitNotes = () => (
  <div className="flex w-80 flex-col gap-1.5">
    <Label htmlFor="notes">Notes for your vet</Label>
    <Textarea
      id="notes"
      placeholder="Tell us anything that will help us prepare for the home visit..."
      defaultValue="Bella gets nervous around new people. She's most relaxed in the backyard. Please call when you're 10 minutes away."
    />
  </div>
)

export const Empty = () => (
  <div className="flex w-80 flex-col gap-1.5">
    <Label htmlFor="reason">Reason for visit</Label>
    <Textarea
      id="reason"
      placeholder="Describe your pet's symptoms or the care you're seeking"
    />
  </div>
)

export const ErrorState = () => (
  <div className="flex w-80 flex-col gap-1.5">
    <Label htmlFor="consent">Care preferences</Label>
    <Textarea
      id="consent"
      error
      defaultValue="x"
    />
    <p className="text-sm text-error-surface-default">
      Please add at least 20 characters so we can prepare properly.
    </p>
  </div>
)
