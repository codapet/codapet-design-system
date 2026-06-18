import { BadgeNumber } from '@codapet/design-system'

// Counts of pets / pending visits, across states and sizes.
export const Counts = () => (
  <div className="flex flex-wrap items-center gap-4">
    <BadgeNumber value={3} state="active" />
    <BadgeNumber value={12} state="resting" />
    <BadgeNumber value={0} state="disabled" />
    <BadgeNumber value={5} size="S" state="active" />
  </div>
)
