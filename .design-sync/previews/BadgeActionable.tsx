import { BadgeActionable } from '@codapet/design-system'
import { Stethoscope, X } from 'lucide-react'

// Selectable filter chips for the appointment queue.
export const Filters = () => (
  <div className="flex flex-wrap items-center gap-3">
    <BadgeActionable icon={<Stethoscope className="size-3.5" />} selected>
      In-home visits
    </BadgeActionable>
    <BadgeActionable icon={<X className="size-3.5" />}>
      Same-day urgent
    </BadgeActionable>
    <BadgeActionable size="S">Senior pets</BadgeActionable>
  </div>
)
